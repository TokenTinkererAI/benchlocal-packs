#!/usr/bin/env node
/**
 * Acceptance selftest for the HumanEval+-164 execution engine.
 *
 * Phase 1 runs EVERY problem's canonical solution through the shipped pipeline
 * (lib/executor.ts -> harness/run_problem.py -> base+plus suites), so a green
 * run proves the vendored expectations, the type-tagged encoding, the guard,
 * the watchdog and EvalPlus's comparison semantics all agree with the reference
 * implementations.
 *
 * Phase 2 runs the negative controls on HumanEval/0:
 *   - a wrong solution must fail cleanly (a graded wrong answer, no harness error)
 *   - an infinite loop must be stopped by the per-test watchdog (timeout)
 *
 * Usage:
 *   node dist-cli/cli/selftest.js [--limit N] [--python PATH] [--ids a,b]
 */
import { loadCanonicalSolutions, getProblemMeta, getScenarioMetas, harnessPath, problemFilePath } from "../lib/dataset";
import { EXEC_TIMEOUT_MS_DEFAULT, executeCompletion } from "../lib/executor";
import { resolvePython } from "../lib/python";
import type { ExecutionOutcome, ProblemMeta, PythonInterpreter } from "../lib/types";

type CliOptions = {
  limit?: number;
  pythonOverride?: string;
  ids?: string[];
};

type Control = {
  name: string;
  completion: string;
  expected: "failed" | "timed_out";
  /** the harness verdict detail kind that must be reported */
  expectKind: string;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--limit") {
      const parsed = Number.parseInt(value ?? "", 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        options.limit = parsed;
      }
      index += 1;
    } else if (flag === "--python") {
      if (value !== undefined && value !== "") {
        options.pythonOverride = value;
      }
      index += 1;
    } else if (flag === "--ids") {
      options.ids = (value ?? "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
        .map((id) => (id.startsWith("HumanEval/") ? id : `HumanEval/${id}`));
      index += 1;
    } else {
      console.error(`Unknown argument: ${flag}`);
      console.error("Usage: node dist-cli/cli/selftest.js [--limit N] [--python PATH] [--ids a,b]");
      process.exit(2);
    }
  }
  return options;
}

function summarizeOutcome(outcome: ExecutionOutcome): string {
  if (outcome.kind === "passed" || outcome.kind === "failed") {
    const detail = outcome.harness.detail;
    return `status=${outcome.harness.verdict} base=${outcome.harness.base_status} plus=${outcome.harness.plus_status} kind=${detail?.kind ?? "?"} (${outcome.durationMs}ms)`;
  }
  if (outcome.kind === "timed_out") {
    return `status=timed_out cap=${outcome.timeoutMs}ms (${outcome.durationMs}ms)`;
  }
  return `status=${outcome.kind}: ${outcome.message} (${outcome.durationMs}ms)`;
}

function indent(text: string): string {
  return text
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
}

const CONTROLS: Control[] = [
  {
    name: "wrong-solution",
    completion: "\n    return -999999",
    expected: "failed",
    expectKind: "wrong_answer"
  },
  {
    name: "infinite-loop",
    completion: "\n    while True:\n        pass",
    expected: "timed_out",
    expectKind: "timeout"
  }
];

function detailKind(outcome: ExecutionOutcome): string | undefined {
  return outcome.kind === "passed" || outcome.kind === "failed" ? outcome.harness.detail?.kind : undefined;
}

function controlPassed(outcome: ExecutionOutcome, control: Control): boolean {
  if (control.expected === "timed_out") {
    // The watchdog reports the verdict as a fail with a per-test timeout, or the
    // node-side cap stops the process outright. Both prove the loop was killed.
    if (outcome.kind === "timed_out") {
      return true;
    }
    return outcome.kind === "failed" && detailKind(outcome) === control.expectKind;
  }
  if (outcome.kind !== "failed") {
    return false;
  }
  if (detailKind(outcome) !== control.expectKind) {
    return false;
  }
  // A clean failure: the harness reported a graded verdict rather than an error.
  return outcome.harness.base_status !== "error" && outcome.harness.plus_status !== "error";
}

async function main(): Promise<number> {
  const options = parseArgs(process.argv.slice(2));

  const python: PythonInterpreter = options.pythonOverride
    ? { command: options.pythonOverride, args: [], version: null, display: options.pythonOverride }
    : await resolvePython();

  console.log(`python: ${python.display} (${python.version ? python.version.join(".") : "?"})`);

  const canonical = loadCanonicalSolutions();
  let problems: ProblemMeta[] = getScenarioMetas();
  if (options.ids && options.ids.length > 0) {
    const wanted = new Set(options.ids);
    problems = problems.filter((problem) => wanted.has(problem.id));
  }
  const limitUsed = options.limit !== undefined;
  if (limitUsed) {
    problems = problems.slice(0, options.limit);
  }

  const harnessScriptPath = harnessPath();
  console.log(
    `problems: ${problems.length}${limitUsed || options.ids ? "" : " canonical + 2 controls"} | wall-clock cap ${EXEC_TIMEOUT_MS_DEFAULT}ms | harness ${harnessScriptPath}`
  );
  console.log("-".repeat(70));

  let passed = 0;
  const failures: string[] = [];

  for (const [index, problem] of problems.entries()) {
    const completion = canonical[problem.id];
    if (typeof completion !== "string") {
      failures.push(`${problem.id}: missing canonical solution`);
      console.error(`FAIL ${problem.id}: missing canonical solution`);
    } else {
      const outcome = await executeCompletion({
        python,
        harnessScriptPath,
        problemFile: problemFilePath(problem.id),
        completion
      });
      if (outcome.kind === "passed") {
        passed += 1;
      } else {
        const summary = summarizeOutcome(outcome);
        failures.push(`${problem.id}: ${summary}`);
        console.error(`FAIL ${problem.id}: ${summary}`);
        if (outcome.kind === "failed" && outcome.harness.detail) {
          console.error(indent(JSON.stringify(outcome.harness.detail, null, 2)));
        }
      }
    }
    const done = index + 1;
    if (done % 20 === 0 && done < problems.length) {
      console.log(`  ... ${done}/${problems.length} done (passed=${passed})`);
    }
  }

  console.log("-".repeat(70));
  console.log(`canonical: ${passed}/${problems.length} passed, ${problems.length - passed} failed`);

  if (limitUsed || options.ids) {
    if (failures.length > 0) {
      console.log("SELFTEST FAIL");
      return 1;
    }
    console.log(`SELFTEST PASS: ${passed}/${problems.length} canonical`);
    return 0;
  }

  const controlProblem = getProblemMeta("HumanEval/0");
  if (!controlProblem) {
    console.error("CONTROL FAIL: HumanEval/0 not found in dataset");
    console.log("SELFTEST FAIL");
    return 1;
  }

  let controlsPassed = 0;
  for (const [controlIndex, control] of CONTROLS.entries()) {
    const outcome = await executeCompletion({
      python,
      harnessScriptPath,
      problemFile: problemFilePath(controlProblem.id),
      completion: control.completion
    });
    const ok = controlPassed(outcome, control);
    if (ok) {
      controlsPassed += 1;
    } else {
      failures.push(`control ${controlIndex + 1} (${control.name})`);
      console.error(
        `CONTROL FAIL ${controlIndex + 1}/${CONTROLS.length} ${control.name}: ${summarizeOutcome(outcome)} expected=${control.expected}/${control.expectKind}`
      );
    }
    console.log(
      `control ${controlIndex + 1}/${CONTROLS.length} ${control.name}: ${ok ? "OK" : "FAILED"} - ${summarizeOutcome(outcome)}`
    );
  }

  if (failures.length > 0 || controlsPassed !== CONTROLS.length) {
    console.log("SELFTEST FAIL");
    return 1;
  }

  console.log(`SELFTEST PASS: ${passed}/${problems.length} canonical`);
  return 0;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exitCode = 1;
  });
