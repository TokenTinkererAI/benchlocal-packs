#!/usr/bin/env python3
# coding=utf-8
"""IFEval grading library for the ifeval-541 BenchLocal pack.

Grades a (prompt, response, instruction_id_list, kwargs) tuple with the
vendored, unmodified upstream IFEval checker code and reports both the strict
and the loose verdicts exactly as upstream's `evaluation_lib` defines them:

  * strict: response as returned by the model;
  * loose:  the response plus seven stripped/simplified variants (first line
            removed, last line removed, both removed, and the same four again
            with `*` characters removed).  An instruction counts as followed if
            ANY variant satisfies it.

Both functions are imported verbatim from
`instruction_following_eval.evaluation_lib`; this module only wires up the
vendored import paths and the input objects.

Python 3.9+ compatible (no 3.10+ syntax); runs with the standard library plus
the vendored pure-Python packages under `ifeval/vendor/`.  No pip installs, no
runtime downloads.
"""

import json
import os
import sys

HARNESS_DIR = os.path.dirname(os.path.abspath(__file__))
IFEVAL_DIR = os.path.join(HARNESS_DIR, "ifeval")
VENDOR_DIR = os.path.join(IFEVAL_DIR, "vendor")

_paths_ready = False


def ensure_vendored_paths():
    """Put the vendored shims/packages first on sys.path (idempotent)."""
    global _paths_ready
    if _paths_ready:
        return
    # `instruction_following_eval` (upstream package) lives in IFEVAL_DIR;
    # the `absl` / `nltk` / `langdetect` / `immutabledict` providers live in
    # VENDOR_DIR.  Insert VENDOR_DIR last so it ends up first: the vendored
    # providers must win over anything installed in the host environment so
    # grading is byte-deterministic.
    for path in (IFEVAL_DIR, VENDOR_DIR):
        if path not in sys.path:
            sys.path.insert(0, path)
    _paths_ready = True


def load_grading_modules():
    """Import the vendored upstream grading modules."""
    ensure_vendored_paths()
    from instruction_following_eval import evaluation_lib, instructions_registry

    return evaluation_lib, instructions_registry


def registered_instruction_ids():
    """The 25 instruction ids the vendored upstream registry knows about."""
    _, instructions_registry = load_grading_modules()
    return sorted(instructions_registry.INSTRUCTION_DICT.keys())


def grade_case(prompt, response, instruction_id_list, kwargs, key=0):
    """Grade one response.

    Args:
      prompt: the IFEval prompt text (used verbatim by the few instructions
        that need the prompt, e.g. combination:repeat_prompt).
      response: the raw model response text (not stripped, not extracted).
      instruction_id_list: list of instruction ids for this problem.
      kwargs: list of kwargs dicts, one per instruction id.
      key: the dataset key (informational).

    Returns:
      dict with strict/loose verdicts and per-instruction flags.
    """
    evaluation_lib, _ = load_grading_modules()

    if not isinstance(instruction_id_list, (list, tuple)):
        raise TypeError("instruction_id_list must be a list")
    if not isinstance(kwargs, (list, tuple)) or len(kwargs) != len(instruction_id_list):
        raise ValueError(
            "kwargs must be a list with one entry per instruction id "
            "(got %r entries for %r instructions)" % (len(kwargs) if isinstance(kwargs, (list, tuple)) else kwargs, len(instruction_id_list))
        )

    inp = evaluation_lib.InputExample(
        key=key,
        instruction_id_list=list(instruction_id_list),
        prompt=prompt,
        kwargs=[dict(entry) for entry in kwargs],
    )
    prompt_to_response = {prompt: response}

    strict = evaluation_lib.test_instruction_following_strict(inp, prompt_to_response)
    loose = evaluation_lib.test_instruction_following_loose(inp, prompt_to_response)

    strict_flags = [bool(flag) for flag in strict.follow_instruction_list]
    loose_flags = [bool(flag) for flag in loose.follow_instruction_list]

    return {
        "strict": bool(strict.follow_all_instructions),
        "loose": bool(loose.follow_all_instructions),
        "total": len(strict_flags),
        "instruction_ids": list(instruction_id_list),
        "strict_instruction_flags": strict_flags,
        "loose_instruction_flags": loose_flags,
        "strict_failed": [iid for iid, flag in zip(instruction_id_list, strict_flags) if not flag],
        "loose_failed": [iid for iid, flag in zip(instruction_id_list, loose_flags) if not flag],
    }


def main(argv):
    """`python grader.py spec.json` — prints the harness result line."""
    if len(argv) != 2:
        sys.stderr.write("usage: python grader.py <spec.json>\n")
        return 2
    with open(argv[1], "r", encoding="utf-8") as spec_file:
        spec = json.load(spec_file)
    result = grade_case(
        prompt=spec["prompt"],
        response=spec["response"],
        instruction_id_list=spec["instruction_id_list"],
        kwargs=spec["kwargs"],
        key=spec.get("key", 0),
    )
    sys.stdout.write("###RESULT###" + json.dumps(result, ensure_ascii=True) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
