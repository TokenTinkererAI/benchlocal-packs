#!/usr/bin/env python3
# coding=utf-8
"""Checker unit test for IFEval-541 (in-process, no subprocess).

Runs every fixture in _reference/fixtures/checkers.json through the vendored
upstream grading code and asserts the strict and loose verdicts, then asserts
that the fixtures cover every instruction id in the vendored registry.

Run directly (`py -3 scripts/check_checkers.py`) or via
`npm run check:checkers` (which resolves the interpreter the pack will use).

Exit code 0 = all checks passed; 1 = at least one failure.
"""

import json
import os
import sys

sys.dont_write_bytecode = True  # keep the pack tree free of __pycache__

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURES = os.path.join(REPO_ROOT, "_reference", "fixtures", "checkers.json")

sys.path.insert(0, os.path.join(REPO_ROOT, "harness"))

import grader  # noqa: E402


def main():
    with open(FIXTURES, "r", encoding="utf-8") as fixture_file:
        cases = json.load(fixture_file)["cases"]

    failures = []
    covered = set()
    loose_only = 0

    for case in cases:
        name = case["name"]
        try:
            result = grader.grade_case(
                prompt=case["prompt"],
                response=case["response"],
                instruction_id_list=case["instruction_id_list"],
                kwargs=case["kwargs"],
            )
        except Exception as exc:  # noqa: BLE001
            failures.append("%s: raised %s: %s" % (name, type(exc).__name__, exc))
            continue

        covered.update(case["instruction_id_list"])
        if case["expect"]["loose"] and not case["expect"]["strict"]:
            loose_only += 1

        if result["strict"] != case["expect"]["strict"] or result["loose"] != case["expect"]["loose"]:
            failures.append(
                "%s: got strict=%s loose=%s, expected strict=%s loose=%s"
                % (
                    name,
                    result["strict"],
                    result["loose"],
                    case["expect"]["strict"],
                    case["expect"]["loose"],
                )
            )
        else:
            print(
                "[ok ] %-78s strict=%-5s loose=%s"
                % (name, result["strict"], result["loose"])
            )

    registered = set(grader.registered_instruction_ids())
    missing = sorted(registered - covered)
    if missing:
        failures.append("instruction ids never exercised: %s" % ", ".join(missing))
    extra = sorted(covered - registered)
    if extra:
        failures.append("fixtures reference unknown instruction ids: %s" % ", ".join(extra))

    if len(cases) < 12:
        failures.append("expected at least 12 fixture cases, found %d" % len(cases))
    if loose_only < 2:
        failures.append("expected at least 2 strict-fail/loose-pass cases, found %d" % loose_only)

    print("")
    print(
        "coverage: %d/%d instruction ids | %d fixture cases | %d strict-fail/loose-pass"
        % (len(covered), len(registered), len(cases), loose_only)
    )
    if failures:
        print("CHECKERS FAILED: %d problem(s)" % len(failures))
        for failure in failures:
            print("  - %s" % failure)
        return 1
    print(
        "CHECKERS PASS: %d/%d cases (strict+loose verdicts) | %d/%d instruction ids covered"
        % (len(cases), len(cases), len(covered), len(registered))
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
