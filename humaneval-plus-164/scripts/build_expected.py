#!/usr/bin/env python3
"""
Build-time dataset generator for the HumanEval+-164 pack.

Reads the vendored EvalPlus release asset `data/source/HumanEvalPlus.jsonl.gz`
and writes, for each of the 164 problems:

    data/problems/HumanEval_<n>.json   base/plus inputs, atol, the canonical
                                       solution, and the EXPECTED OUTPUTS
                                       computed here by executing the canonical
                                       solution (EvalPlus's `trusted_exec`
                                       semantics: `deepcopy` per input, no
                                       guard, no timeout, wall-clock recorded
                                       per call);
    data/manifest.json                 light per-problem metadata + source pins
                                       (read by the pack for scenario cards);
    data/canonical.json                id -> canonical_solution (self-test and
                                       mock fixtures only).

Expected values are encoded with a small type tag (`__py_tag__`) because JSON
cannot represent tuples or non-string-keyed dicts, and `assert type(out) ==
type(exp)` in EvalPlus's comparison is type-exact. Every encoded value is
verified by round-tripping it through the SHIPPED decoder in
`harness/run_problem.py`, so the pack never grades against a lossy expectation.

Run through `npm run build:dataset` (scripts/build-dataset.mjs), which pins
PYTHONHASHSEED=0 so the ground truth is reproducible.
"""

import gzip
import hashlib
import importlib.util
import json
import math
import os
import sys
import time
from copy import deepcopy

sys.set_int_max_str_digits(0)  # HumanEval/83 expectations are multi-million-bit ints

TAG = "__py_tag__"
PROBLEM_FILE_PATTERN = "data/problems/HumanEval_<number>.json"


# ---------------------------------------------------------------------------
# EvalPlus `trusted_exec` (evalplus/gen/util/__init__.py), verbatim semantics
# ---------------------------------------------------------------------------


def trusted_exec(code, inputs, entry_point, record_time=False, output_not_none=False):
    """Execute trusted (canonical) code in place -- EvalPlus's ground-truth path."""
    exec_globals = {}
    exec(code, exec_globals)
    fn = exec_globals[entry_point]

    rtime = []
    ret = []
    for inp in inputs:
        inp = deepcopy(inp)
        if record_time:
            start = time.time()
            ret.append(fn(*inp))
            rtime.append(time.time() - start)
        else:
            ret.append(fn(*inp))

    if output_not_none:
        ret = [i is not None for i in ret]

    if record_time:
        return ret, rtime
    return ret


# ---------------------------------------------------------------------------
# JSON encoding (lossless for the value kinds the suites actually contain)
# ---------------------------------------------------------------------------


def encode(value):
    if isinstance(value, tuple):
        return {TAG: "tuple", "items": [encode(item) for item in value]}
    if isinstance(value, list):
        return [encode(item) for item in value]
    if isinstance(value, dict):
        if all(isinstance(key, str) for key in value) and TAG not in value:
            return {key: encode(item) for key, item in value.items()}
        return {TAG: "dict", "items": [[encode(k), encode(v)] for k, v in value.items()]}
    if isinstance(value, (set, frozenset)):
        return {TAG: type(value).__name__, "items": [encode(item) for item in value]}
    if isinstance(value, float) and not math.isfinite(value):
        return {TAG: "float", "repr": repr(value)}
    if isinstance(value, (bytes, bytearray)):
        raise TypeError("bytes values are not supported by the pack encoding")
    return value


# ---------------------------------------------------------------------------
# Packing helpers
# ---------------------------------------------------------------------------


def load_shipped_decoder(repo_root):
    """Import `decode` from the shipped harness so the build proves the runtime decoder."""
    harness_path = os.path.join(repo_root, "harness", "run_problem.py")
    spec = importlib.util.spec_from_file_location("he_plus_harness", harness_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def contract_violated(contract_code, entry_point, inp):
    """
    EvalPlus's own input-validity predicate.

    At dataset construction every generated input is admitted only if
    `prompt + contract + canonical_solution` executes `entry_point(*inp)`
    without raising (`evalplus/gen/type_mut.py`: `trusted_check_exec`,
    `cwd_code` built by `evalplus/inputgen.py`). Reproduce that here.
    """
    scope = {}
    try:
        exec(contract_code, scope)
        scope[entry_point](*inp)
        return False
    except BaseException:
        return True


def reference_unsatisfiable(harness, reference_fn, entry_point, atol, inputs, expected):
    """
    Indices where the REFERENCE solution fails the graded predicate, evaluated
    with the shipped comparison code (`harness.compare`).

    Every graded input must be one the reference passes; an input that the
    reference cannot satisfy is defective data, not a grading case (see
    METHODOLOGY: HumanEval/32's find_zero oracle).
    """
    unsatisfiable = []
    for index, (inp, exp) in enumerate(zip(inputs, expected)):
        try:
            out = reference_fn(*deepcopy(inp))
            harness.compare(out, exp, atol, entry_point, inp)
        except BaseException as exc:  # noqa: BLE001 - any raise means "reference cannot pass"
            unsatisfiable.append((index, "%s: %s" % (type(exc).__name__, exc)))
    return unsatisfiable


def describe(prompt, entry_point):
    marker = '"""'
    if marker in prompt:
        body = prompt.split(marker, 2)[1]
        for line in body.split("\n"):
            line = line.strip()
            if line:
                return "%s: %s" % (entry_point, line)
    return "Complete %s." % entry_point


def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source = sys.argv[1] if len(sys.argv) > 1 else os.path.join(repo_root, "data", "source", "HumanEvalPlus.jsonl.gz")

    harness = load_shipped_decoder(repo_root)
    decode = harness.decode

    with open(source, "rb") as handle:
        raw = handle.read()
    source_sha256 = hashlib.sha256(raw).hexdigest()

    problems = []
    with gzip.open(source, "rt", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if line:
                problems.append(json.loads(line))

    if len(problems) != 164:
        raise SystemExit("expected 164 problems in %s, got %d" % (source, len(problems)))

    required = ("task_id", "prompt", "canonical_solution", "entry_point", "base_input", "plus_input", "atol")
    for index, problem in enumerate(problems):
        for field in required:
            if field not in problem:
                raise SystemExit("problem %d: missing field %r" % (index, field))
        if problem["task_id"] != "HumanEval/%d" % index:
            raise SystemExit("problem %d: unexpected task_id %r" % (index, problem["task_id"]))

    problems_dir = os.path.join(repo_root, "data", "problems")
    os.makedirs(problems_dir, exist_ok=True)

    manifest_problems = []
    canonical = {}
    all_exclusions = []
    started = time.time()
    max_load = 0.0
    slowest = []

    for index, problem in enumerate(problems):
        task_id = problem["task_id"]
        entry_point = problem["entry_point"]
        code = problem["prompt"] + problem["canonical_solution"]

        task_started = time.time()
        base_expected, base_time = trusted_exec(code, problem["base_input"], entry_point, record_time=True)
        plus_expected, plus_time = trusted_exec(code, problem["plus_input"], entry_point, record_time=True)
        task_elapsed = time.time() - task_started
        slowest.append((round(task_elapsed, 3), task_id))
        max_load = max(max_load, time.time() - task_started)

        encoded_base = [encode(value) for value in base_expected]
        encoded_plus = [encode(value) for value in plus_expected]

        # Proof: the shipped runtime decoder must reproduce every expectation
        # exactly, types included (EvalPlus compares with `type(out) == type(exp)`).
        for label, expected, encoded in (
            ("base", base_expected, encoded_base),
            ("plus", plus_expected, encoded_plus),
        ):
            if len(encoded) != len(expected):
                raise SystemExit("%s %s: encoded length mismatch" % (task_id, label))
            for position, (original, packed) in enumerate(zip(expected, encoded)):
                restored = decode(packed)
                if type(restored) is not type(original) or restored != original:
                    raise SystemExit(
                        "%s %s[%d]: round-trip mismatch (%s vs %s)"
                        % (task_id, label, position, type(restored).__name__, type(original).__name__)
                    )

        # Reference-satisfiability gate: every graded input must be one the
        # reference solution passes under the shipped comparison code. Inputs it
        # cannot pass are excluded ONLY if EvalPlus's own contract for the
        # problem also rejects them (defective data, not a grading case);
        # otherwise the build fails loudly rather than hiding a harness bug.
        canonical_scope = {}
        exec(code, canonical_scope)
        reference_fn = canonical_scope[entry_point]
        contract_code = problem["prompt"] + problem["contract"] + problem["canonical_solution"]
        exclusions = []
        for suite, inputs, expected in (
            ("base", problem["base_input"], base_expected),
            ("plus", problem["plus_input"], plus_expected),
        ):
            unsatisfiable = reference_unsatisfiable(harness, reference_fn, entry_point, problem["atol"], inputs, expected)
            for position, reason in unsatisfiable:
                inp = inputs[position]
                if not contract_violated(contract_code, entry_point, inp):
                    raise SystemExit(
                        "%s %s[%d]: the reference solution fails the graded predicate but the "
                        "problem contract accepts the input -- refusing to exclude it (%s)"
                        % (task_id, suite, position, reason)
                    )
                exclusions.append(
                    {
                        "suite": suite,
                        "index": position,
                        "reason": reason,
                        "contract": "rejected by the problem's own contract (invalid input)",
                    }
                )
            if unsatisfiable:
                keep = [i for i in range(len(inputs)) if i not in {p for p, _ in unsatisfiable}]
                if suite == "base":
                    problem["base_input"] = [inputs[i] for i in keep]
                    base_expected = [expected[i] for i in keep]
                    base_time = [base_time[i] for i in keep]
                    encoded_base = [encoded_base[i] for i in keep]
                else:
                    problem["plus_input"] = [inputs[i] for i in keep]
                    plus_expected = [expected[i] for i in keep]
                    plus_time = [plus_time[i] for i in keep]
                    encoded_plus = [encoded_plus[i] for i in keep]

        if exclusions:
            print(
                "  %s: excluded %d input(s): %s"
                % (task_id, len(exclusions), ", ".join("%s[%d]" % (e["suite"], e["index"]) for e in exclusions))
            )
            all_exclusions.append({"task_id": task_id, "excluded": exclusions})

        record = {
            "task_id": task_id,
            "number": index,
            "entry_point": entry_point,
            "atol": problem["atol"],
            "prompt": problem["prompt"],
            "canonical_solution": problem["canonical_solution"],
            "test": problem["test"],
            "base_input": problem["base_input"],
            "plus_input": problem["plus_input"],
            "base_expected": encoded_base,
            "plus_expected": encoded_plus,
            "base_time": [round(value, 6) for value in base_time],
            "plus_time": [round(value, 6) for value in plus_time],
            "excluded_inputs": [
                {"suite": e["suite"], "index": e["index"], "reason": e["reason"]} for e in exclusions
            ],
        }

        file_name = "HumanEval_%d.json" % index
        with open(os.path.join(problems_dir, file_name), "w", encoding="utf-8") as handle:
            json.dump(record, handle, ensure_ascii=False, separators=(",", ":"), allow_nan=False)

        manifest_problems.append(
            {
                "id": task_id,
                "number": index,
                "entryPoint": entry_point,
                "file": file_name,
                "title": "%s - %s" % (task_id, entry_point),
                "description": describe(problem["prompt"], entry_point),
                "prompt": problem["prompt"],
                "atol": problem["atol"],
                "baseTests": len(problem["base_input"]),
                "plusTests": len(problem["plus_input"]),
                "excludedInputs": len(exclusions),
            }
        )
        canonical[task_id] = problem["canonical_solution"]

    manifest = {
        "schemaVersion": 1,
        "pack": "humaneval-plus-164",
        "version": "1.0.0",
        "dataset": "EvalPlus HumanEval+",
        "problems": manifest_problems,
        "counts": {
            "problems": len(manifest_problems),
            "baseTests": sum(item["baseTests"] for item in manifest_problems),
            "plusTests": sum(item["plusTests"] for item in manifest_problems),
        },
        "problemFilePattern": PROBLEM_FILE_PATTERN,
        "source": {
            "name": "HumanEvalPlus.jsonl.gz",
            "release": "evalplus/humanevalplus_release v0.1.10 (HUMANEVAL_PLUS_VERSION)",
            "url": "https://github.com/evalplus/humanevalplus_release/releases/download/v0.1.10/HumanEvalPlus.jsonl.gz",
            "sha256": source_sha256,
            "upstreamLoader": "evalplus.data.humaneval.get_human_eval_plus",
            "note": (
                "The HuggingFace mirror evalplus/humanevalplus (apache-2.0) carries only the original "
                "HumanEval fields (task_id, prompt, canonical_solution, entry_point, test); the base/plus "
                "test suites and atol live in the release asset vendored here."
            ),
        },
        "expectedOutputs": {
            "generatedBy": "scripts/build_expected.py (EvalPlus trusted_exec semantics, py -3)",
            "encoding": "JSON with a %s tag for tuples/dicts/floats that JSON cannot carry" % TAG,
            "pythonhashseed": "0",
        },
        "exclusions": {
            "count": sum(len(item["excluded"]) for item in all_exclusions),
            "problems": all_exclusions,
            "policy": (
                "input excluded only when the reference solution fails the graded predicate AND the "
                "problem's own contract (prompt + contract + canonical_solution) rejects the input; "
                "the build fails otherwise"
            ),
        },
    }

    with open(os.path.join(repo_root, "data", "manifest.json"), "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, ensure_ascii=False, indent=2, allow_nan=False)
        handle.write("\n")

    with open(os.path.join(repo_root, "data", "canonical.json"), "w", encoding="utf-8") as handle:
        json.dump(
            {"source": {"file": "HumanEvalPlus.jsonl.gz", "sha256": source_sha256, "release": "v0.1.10"},
             "roles": "self-test and mock fixtures only; never used for grading",
             "canonical": canonical},
            handle,
            ensure_ascii=False,
            separators=(",", ":"),
            allow_nan=False,
        )
        handle.write("\n")

    total_bytes = 0
    for item in manifest_problems:
        total_bytes += os.path.getsize(os.path.join(problems_dir, item["file"]))

    print("built %d problem files in %.1fs" % (len(manifest_problems), time.time() - started))
    print("  base tests: %d | plus tests: %d" % (manifest["counts"]["baseTests"], manifest["counts"]["plusTests"]))
    print("  excluded inputs: %d" % manifest["exclusions"]["count"])
    for item in all_exclusions:
        print("    %s -> %s" % (item["task_id"], ", ".join("%s[%d]" % (e["suite"], e["index"]) for e in item["excluded"])))
    print("  data/problems: %.1f MiB" % (total_bytes / 1024 / 1024))
    print("  slowest canonical ground-truth computations:")
    for elapsed, task_id in sorted(slowest, reverse=True)[:5]:
        print("    %s  %.3fs" % (task_id, elapsed))
    print("  source sha256: %s" % source_sha256)


if __name__ == "__main__":
    main()
