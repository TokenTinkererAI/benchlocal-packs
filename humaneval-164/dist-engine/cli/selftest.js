#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Acceptance selftest for the HumanEval-164 execution engine.
 *
 * Phase 1 runs every selected problem against its canonical solution.
 * Phase 2 runs three negative controls on HumanEval/0 (skipped with --limit).
 *
 * Usage:
 *   node dist-engine/cli/selftest.js [--limit N] [--python PATH]
 */
const canonical_1 = require("../lib/generated/canonical");
const problems_1 = require("../lib/generated/problems");
const executor_1 = require("../lib/executor");
const python_1 = require("../lib/python");
function parseArgs(argv) {
    const options = {};
    for (let index = 0; index < argv.length; index += 1) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (flag === "--limit") {
            const parsed = Number.parseInt(value ?? "", 10);
            if (Number.isFinite(parsed) && parsed > 0) {
                options.limit = parsed;
            }
            index += 1;
        }
        else if (flag === "--python") {
            if (value !== undefined && value !== "") {
                options.pythonOverride = value;
            }
            index += 1;
        }
        else {
            console.error(`Unknown argument: ${flag}`);
            console.error("Usage: node dist-engine/cli/selftest.js [--limit N] [--python PATH]");
            process.exit(2);
        }
    }
    return options;
}
function summarizeOutcome(outcome) {
    return `status=${outcome.status} exit=${outcome.exitCode ?? "null"} (${outcome.durationMs}ms)`;
}
function indent(text) {
    return text
        .split("\n")
        .map((line) => `    ${line}`)
        .join("\n");
}
const CONTROLS = [
    { name: "bad-solution", completion: "\n    return False", expected: "failed" },
    { name: "infinite-loop", completion: "\n    while True:\n        pass", expected: "timed_out", timeoutMs: 2000 },
    {
        name: "guard-os-system",
        completion: "\n    import os\n    return os.system('echo guard-check')\n",
        expected: "failed",
        expectNoneType: true
    }
];
async function main() {
    const options = parseArgs(process.argv.slice(2));
    const python = options.pythonOverride
        ? { command: options.pythonOverride, args: [], version: null, display: options.pythonOverride }
        : await (0, python_1.resolvePython)();
    console.log(`python: ${python.display} (${python.version ? python.version.join(".") : "?"})`);
    const limitUsed = options.limit !== undefined;
    const problems = limitUsed ? problems_1.PROBLEMS.slice(0, options.limit) : [...problems_1.PROBLEMS];
    console.log(`problems: ${problems.length}${limitUsed ? "" : " canonical + 3 controls"} | exec timeout ${executor_1.EXEC_TIMEOUT_MS_DEFAULT}ms`);
    console.log("-".repeat(70));
    let passed = 0;
    const failures = [];
    for (let index = 0; index < problems.length; index += 1) {
        const problem = problems[index];
        const completion = canonical_1.CANONICAL_SOLUTIONS[problem.id];
        if (typeof completion !== "string") {
            failures.push(`${problem.id}: missing canonical solution`);
            console.error(`FAIL ${problem.id}: missing canonical solution`);
        }
        else {
            const outcome = await (0, executor_1.runCheck)(python, problem, completion);
            if (outcome.status === "passed") {
                passed += 1;
            }
            else {
                const summary = summarizeOutcome(outcome);
                failures.push(`${problem.id}: ${summary}`);
                console.error(`FAIL ${problem.id}: ${summary}`);
                if (outcome.stderrTail.trim() !== "") {
                    console.error(indent(outcome.stderrTail.trimEnd()));
                }
            }
        }
        const done = index + 1;
        if (done % 25 === 0 && done < problems.length) {
            console.log(`  ... ${done}/${problems.length} done (passed=${passed})`);
        }
    }
    console.log("-".repeat(70));
    console.log(`canonical: ${passed}/${problems.length} passed, ${problems.length - passed} failed`);
    if (limitUsed) {
        if (failures.length > 0) {
            console.log("SELFTEST FAIL");
            return 1;
        }
        console.log(`SELFTEST PASS: ${passed}/${problems.length} canonical`);
        return 0;
    }
    const controlProblem = problems_1.PROBLEMS.find((problem) => problem.id === "HumanEval/0");
    if (!controlProblem) {
        console.error("CONTROL FAIL: HumanEval/0 not found in dataset");
        console.log("SELFTEST FAIL");
        return 1;
    }
    let controlsPassed = 0;
    for (const [controlIndex, control] of CONTROLS.entries()) {
        const outcome = await (0, executor_1.runCheck)(python, controlProblem, control.completion, control.timeoutMs !== undefined ? { timeoutMs: control.timeoutMs } : undefined);
        const statusOk = outcome.status === control.expected;
        const noneTypeOk = !control.expectNoneType || outcome.stderrTail.includes("NoneType");
        if (statusOk && noneTypeOk) {
            controlsPassed += 1;
        }
        else {
            failures.push(`control ${controlIndex + 1} (${control.name})`);
            const extra = control.expectNoneType ? ", stderr must mention NoneType" : "";
            console.error(`CONTROL FAIL ${controlIndex + 1}/${CONTROLS.length} ${control.name}: ${summarizeOutcome(outcome)} expected=${control.expected}${extra}`);
            if (outcome.stderrTail.trim() !== "") {
                console.error(indent(outcome.stderrTail.trimEnd()));
            }
        }
        console.log(`control ${controlIndex + 1}/${CONTROLS.length} ${control.name}: ${outcome.status} (expected ${control.expected})`);
    }
    if (failures.length > 0 || controlsPassed !== CONTROLS.length) {
        console.log("SELFTEST FAIL");
        return 1;
    }
    console.log(`SELFTEST PASS: ${passed}/${problems.length} canonical, ${controlsPassed}/${CONTROLS.length} controls`);
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
