#!/usr/bin/env python3
# coding=utf-8
"""One-scenario IFEval grading harness for the ifeval-541 BenchLocal pack.

The pack executor spawns exactly one of these per scenario:

    <python> harness/run_problem.py <spec.json>

Spec (JSON, written by lib/executor.ts into a scratch directory):

    {
      "problem_id": "IFEval/12",              # informational
      "prompt": "<the dataset prompt>",       # verbatim
      "instruction_id_list": ["punctuation:no_comma", ...],
      "kwargs": [{...}, ...],                 # one entry per instruction id
      "response": "<raw model response>"      # graded as-is, no extraction
    }

Output: a single stdout line

    ###RESULT###{"verdict": "pass" | "fail" | "error", ...}

with the strict verdict driving `verdict`, plus the loose verdict and the
per-instruction flags.  Grading uses the vendored upstream IFEval checker code
(see ifeval/instruction_following_eval/ + ifeval/vendor/), so it needs no pip
installs and performs no network access.
"""

import json
import os
import sys
import time

RESULT_MARKER = "###RESULT###"

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import grader  # noqa: E402  (path set up above; harness-relative import)


def emit(payload):
    sys.stdout.write(RESULT_MARKER + json.dumps(payload, ensure_ascii=True) + "\n")
    sys.stdout.flush()


def main(argv):
    if len(argv) != 2:
        emit({"verdict": "error", "error": "usage: python run_problem.py <spec.json>"})
        return 2

    started = time.time()
    try:
        with open(argv[1], "r", encoding="utf-8") as spec_file:
            spec = json.load(spec_file)
        result = grader.grade_case(
            prompt=spec["prompt"],
            response=spec["response"],
            instruction_id_list=spec["instruction_id_list"],
            kwargs=spec["kwargs"],
            key=spec.get("key", 0),
        )
    except Exception as exc:  # noqa: BLE001 - report any failure as a harness error
        emit(
            {
                "verdict": "error",
                "error": "%s: %s" % (type(exc).__name__, exc),
                "elapsed_s": round(time.time() - started, 3),
            }
        )
        return 1

    payload = {"verdict": "pass" if result["strict"] else "fail"}
    payload.update(result)
    payload["elapsed_s"] = round(time.time() - started, 3)
    emit(payload)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
