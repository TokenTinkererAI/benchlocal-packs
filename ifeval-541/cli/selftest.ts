#!/usr/bin/env node
/**
 * Acceptance self-test for IFEval-541: runs the fixture (prompt, response)
 * pairs through the exact execution path the pack uses (harness + executor)
 * and checks the strict and loose verdicts against the expected values.
 *
 * Fixtures: _reference/fixtures/checkers.json (same file used by
 * `npm run check:checkers`, which additionally covers every instruction id).
 *
 * Coverage note: checkers.json covers all 25 IFEval instruction ids; this
 * self-test runs every case through a real Python subprocess per case.
 */
import fs from "node:fs";
import path from "node:path";

import { executeGrading } from "../lib/executor";
import { harnessPath } from "../lib/dataset";
import { resolvePython } from "../lib/python";
import type { HarnessSpec, IfevalKwargs } from "../lib/types";

const FIXTURES = path.resolve(__dirname, "..", "..", "_reference", "fixtures", "checkers.json");

type FixtureCase = {
  name: string;
  prompt: string;
  instruction_id_list: string[];
  kwargs: IfevalKwargs[];
  response: string;
  expect: { strict: boolean; loose: boolean };
};

async function main(): Promise<void> {
  const fixtures = JSON.parse(fs.readFileSync(FIXTURES, "utf8")) as { cases: FixtureCase[] };
  const python = await resolvePython();
  console.log(`python: ${python.display} (${python.version.join(".")})`);
  console.log(`harness: ${harnessPath()}`);
  console.log(`fixtures: ${FIXTURES} (${fixtures.cases.length} cases)`);
  console.log("");

  let failures = 0;
  for (const testCase of fixtures.cases) {
    const started = Date.now();
    const spec: HarnessSpec = {
      problem_id: `fixture:${testCase.name}`,
      key: 0,
      prompt: testCase.prompt,
      instruction_id_list: testCase.instruction_id_list,
      kwargs: testCase.kwargs,
      response: testCase.response
    };
    const outcome = await executeGrading({
      python,
      harnessScriptPath: harnessPath(),
      spec,
      execTimeoutMs: 120_000
    });
    const elapsed = Date.now() - started;

    let ok = outcome.kind === "graded";
    let detail: string = outcome.kind;
    if (outcome.kind === "graded") {
      const harness = outcome.harness;
      ok =
        harness.strict === testCase.expect.strict &&
        harness.loose === testCase.expect.loose &&
        harness.verdict === (testCase.expect.strict ? "pass" : "fail");
      detail = `strict=${harness.strict ? "pass" : "fail"} loose=${harness.loose ? "pass" : "fail"} ` +
        `(expected strict=${testCase.expect.strict ? "pass" : "fail"} loose=${testCase.expect.loose ? "pass" : "fail"})`;
    } else if (outcome.kind === "harness_error") {
      detail = `harness_error: ${outcome.message}`;
    }
    if (!ok) {
      failures += 1;
    }
    console.log(`[${ok ? "ok " : "FAIL"}] ${testCase.name} -> ${detail} (${elapsed}ms)`);
  }

  console.log("");
  if (failures === 0) {
    console.log(
      `SELFTEST PASS: ${fixtures.cases.length}/${fixtures.cases.length} cases ` +
        "(executor + vendored IFEval checker, strict+loose verified)"
    );
  } else {
    console.log(`SELFTEST FAILED: ${failures}/${fixtures.cases.length} cases`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
