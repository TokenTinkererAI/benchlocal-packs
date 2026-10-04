#!/usr/bin/env node
/**
 * Acceptance self-test for MBPP+-378.
 *
 * Runs ALL 378 canonical solutions through the exact execution path the pack
 * uses (executor -> harness/run_problem.py -> vendored inputs + expected
 * outputs), then a set of negative controls:
 *
 *   - wrong solution      -> fail (base/plus mismatch), no harness error
 *   - arithmetic-only fix -> still fails on the plus suite
 *   - infinite loop       -> timeout, killed cleanly
 *
 * Expected: SELFTEST PASS: 378/378 canonical, 3/3 controls
 *
 * The canonical code is `prompt + canonical_solution` - byte-for-byte the code
 * evalplus' get_groundtruth executes to build the expected outputs, so the run
 * also proves the vendor codec + comparison path end to end.
 */
import path from "node:path";

import { loadManifest, loadProblemRecord, problemFilePath } from "../lib/dataset";
import { executeCode } from "../lib/executor";
import { harnessPath } from "../lib/dataset";
import { resolvePython } from "../lib/python";
import type { ExecutionOutcome, PythonInterpreter } from "../lib/types";

const EXEC_TIMEOUT_MS = 120_000;

type ControlCase = {
  name: string;
  problemId: string;
  code: string;
  expect: "passed" | "failed";
  /** Assert on the per-phase status the harness reported. */
  expectPhaseStatus?: { phase: "base" | "plus"; status: "pass" | "fail" | "timeout" };
  minTimeLimitS?: number;
  timeoutPerTaskS?: number;
};

function canonicalCode(problemId: string): string {
  const record = loadProblemRecord(problemId);
  return record.prompt + record.canonical_solution;
}

function describe(outcome: ExecutionOutcome): string {
  if (outcome.kind === "passed" || outcome.kind === "failed") {
    const harness = outcome.harness;
    const base = harness.base ? `${harness.base.passed}/${harness.base.total}${harness.base.status !== "pass" ? `:${harness.base.status}` : ""}` : "?";
    const plus = harness.plus ? `${harness.plus.passed}/${harness.plus.total}${harness.plus.status !== "pass" ? `:${harness.plus.status}` : ""}` : "?";
    return `${outcome.kind} (base ${base}, plus ${plus}, ${harness.elapsed_s ?? "?"}s)`;
  }
  return outcome.kind;
}

async function runCase(
  python: PythonInterpreter,
  problemId: string,
  code: string,
  minTimeLimitS?: number,
  timeoutPerTaskS?: number
): Promise<ExecutionOutcome> {
  return executeCode({
    python,
    harnessScriptPath: harnessPath(),
    problemFile: problemFilePath(problemId),
    code,
    minTimeLimitS,
    timeoutPerTaskS,
    execTimeoutMs: EXEC_TIMEOUT_MS
  });
}

async function main(): Promise<void> {
  const python = await resolvePython();
  const manifest = loadManifest();
  console.log(`python: ${python.display} (${python.version.join(".")})`);
  console.log(`harness: ${harnessPath()}`);
  console.log(`problems: ${manifest.count}`);
  console.log("");

  // -------------------------------------------------------------------------
  // 1. All 378 canonical solutions
  // -------------------------------------------------------------------------
  let canonicalPassed = 0;
  const failures: string[] = [];
  const startedAt = Date.now();

  for (const [index, problem] of manifest.problems.entries()) {
    const outcome = await runCase(python, problem.id, canonicalCode(problem.id));
    const ok = outcome.kind === "passed";
    if (ok) {
      canonicalPassed += 1;
    } else {
      failures.push(`${problem.id} -> ${describe(outcome)}`);
      console.log(`[FAIL] ${problem.id} -> ${describe(outcome)}`);
    }
    if ((index + 1) % 50 === 0 || index + 1 === manifest.problems.length) {
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
      console.log(`  [${index + 1}/${manifest.problems.length}] canonical ok=${canonicalPassed} (${elapsed}s)`);
    }
  }

  console.log("");
  for (const failure of failures.slice(0, 20)) {
    console.log(`  canonical failure: ${failure}`);
  }

  // -------------------------------------------------------------------------
  // 2. Negative controls
  // -------------------------------------------------------------------------
  const controls: ControlCase[] = [
    {
      // Mbpp/2 is a set-equality task (MBPP_OUTPUT_SET_EQ_TASKS): any permutation
      // of the right elements passes, a wrong SET must fail.
      name: "wrong solution (similar_elements returns the union, not the intersection)",
      problemId: "Mbpp/2",
      code: "def similar_elements(test_tup1, test_tup2):\n    return tuple(set(test_tup1) | set(test_tup2))\n",
      expect: "failed",
      expectPhaseStatus: { phase: "plus", status: "fail" }
    },
    {
      name: "wrong solution (is_not_prime always returns True)",
      problemId: "Mbpp/3",
      code: "def is_not_prime(n):\n    return True\n",
      expect: "failed",
      expectPhaseStatus: { phase: "base", status: "fail" }
    },
    {
      name: "infinite loop (TLE control: watchdog + phase budget)",
      problemId: "Mbpp/4",
      code: "def heap_queue_largest(nums, n):\n    while True:\n        pass\n",
      expect: "failed",
      expectPhaseStatus: { phase: "plus", status: "timeout" },
      minTimeLimitS: 1.0,
      timeoutPerTaskS: 3.0
    }
  ];

  let controlsPassed = 0;
  for (const control of controls) {
    const outcome = await runCase(
      python,
      control.problemId,
      control.code,
      control.minTimeLimitS,
      control.timeoutPerTaskS
    );
    const noHarnessError = outcome.kind !== "harness_error" && outcome.kind !== "spawn_error";
    let ok = outcome.kind === control.expect && noHarnessError;
    if (ok && control.expectPhaseStatus && (outcome.kind === "failed" || outcome.kind === "passed")) {
      const phase = control.expectPhaseStatus.phase === "base" ? outcome.harness.base : outcome.harness.plus;
      ok = phase?.status === control.expectPhaseStatus.status;
    }
    if (ok) {
      controlsPassed += 1;
    }
    console.log(`[${ok ? "ok " : "FAIL"}] ${control.name} -> ${describe(outcome)}`);
  }

  console.log("");
  if (canonicalPassed === manifest.problems.length && controlsPassed === controls.length) {
    console.log(
      `SELFTEST PASS: ${canonicalPassed}/${manifest.problems.length} canonical, ${controlsPassed}/${controls.length} controls`
    );
  } else {
    console.log(
      `SELFTEST FAILED: ${canonicalPassed}/${manifest.problems.length} canonical, ${controlsPassed}/${controls.length} controls`
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
