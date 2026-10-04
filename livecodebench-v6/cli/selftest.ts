#!/usr/bin/env node
/**
 * Acceptance self-test for LiveCodeBench-v6: runs fixture problems through the
 * exact execution path the pack uses (harness + executor), covering both
 * grading paths and the failure modes.
 *
 * Fixtures: _reference/fixtures/{abc387_b,3704}.json (full records, encrypted
 * private tests included). Expected: 6/6.
 */
import path from "node:path";

import { executeCode } from "../lib/executor";
import { harnessPath } from "../lib/dataset";
import { resolvePython } from "../lib/python";
import type { ExecutionOutcome } from "../lib/types";

const FIXTURES = path.resolve(__dirname, "..", "..", "_reference", "fixtures");

const ABC_CORRECT = `x = int(input())
count = 0
for i in range(1, 10):
    for j in range(1, 10):
        if i * j == x:
            count += 1
print(2025 - x * count)
`;

const ABC_WRONG = "print(0)\n";
const ABC_TLE = "while True:\n    pass\n";

const LC_CORRECT = `class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        total = sum(nums)
        prefix = 0
        count = 0
        for i in range(len(nums) - 1):
            prefix += nums[i]
            if (2 * prefix - total) % 2 == 0:
                count += 1
        return count
`;

const LC_WRONG = `class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        return 0
`;

const LC_TLE = `class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        while True:
            pass
`;

type Case = {
  name: string;
  fixture: string;
  code: string;
  expectKind: "passed" | "failed";
  expectErrorCode?: number;
  perTestTimeoutMs?: number;
};

const CASES: Case[] = [
  { name: "abc387_b correct (stdio)", fixture: "abc387_b.json", code: ABC_CORRECT, expectKind: "passed" },
  { name: "abc387_b wrong (WA)", fixture: "abc387_b.json", code: ABC_WRONG, expectKind: "failed", expectErrorCode: -2 },
  { name: "abc387_b infinite loop (TLE)", fixture: "abc387_b.json", code: ABC_TLE, expectKind: "failed", expectErrorCode: -3, perTestTimeoutMs: 3000 },
  { name: "3704 correct (call-based)", fixture: "3704.json", code: LC_CORRECT, expectKind: "passed" },
  { name: "3704 wrong (WA)", fixture: "3704.json", code: LC_WRONG, expectKind: "failed", expectErrorCode: -2 },
  { name: "3704 infinite loop (TLE)", fixture: "3704.json", code: LC_TLE, expectKind: "failed", expectErrorCode: -3, perTestTimeoutMs: 3000 }
];

function describe(outcome: ExecutionOutcome): string {
  if (outcome.kind === "passed" || outcome.kind === "failed") {
    const detail = outcome.harness.detail ?? {};
    const code = typeof detail.error_code === "number" ? ` error_code=${detail.error_code}` : "";
    const passed = `${outcome.harness.passed_count}/${outcome.harness.total}`;
    return `${outcome.kind} (${passed} tests, ${outcome.harness.elapsed_s ?? "?"}s${code})`;
  }
  return outcome.kind;
}

async function main(): Promise<void> {
  const python = await resolvePython();
  console.log(`python: ${python.display} (${python.version.join(".")})`);
  console.log(`harness: ${harnessPath()}`);
  console.log("");

  let failures = 0;
  for (const testCase of CASES) {
    const started = Date.now();
    const outcome = await executeCode({
      python,
      harnessScriptPath: harnessPath(),
      problemFile: path.join(FIXTURES, testCase.fixture),
      code: testCase.code,
      perTestTimeoutMs: testCase.perTestTimeoutMs ?? 6000,
      execTimeoutMs: 120_000
    });
    const elapsed = Date.now() - started;

    let ok = outcome.kind === testCase.expectKind;
    if (ok && testCase.expectErrorCode !== undefined && outcome.kind === "failed") {
      ok = outcome.harness.detail?.error_code === testCase.expectErrorCode;
    }
    if (!ok) {
      failures += 1;
    }
    console.log(`[${ok ? "ok " : "FAIL"}] ${testCase.name} -> ${describe(outcome)} (${elapsed}ms)`);
  }

  console.log("");
  if (failures === 0) {
    console.log(`SELFTEST PASS: ${CASES.length}/${CASES.length} cases (grading semantics verified)`);
  } else {
    console.log(`SELFTEST FAILED: ${failures}/${CASES.length} cases`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
