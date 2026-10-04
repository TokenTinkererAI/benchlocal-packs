#!/usr/bin/env python3
"""
MBPP+-378 build-time oracle: expected outputs for ONE problem.

Runs the problem's canonical solution over its base_input and plus_input exactly
the way EvalPlus builds its ground truth (evalplus/evaluate.py:get_groundtruth ->
evalplus/gen/util/trusted_exec): exec(prompt + canonical_solution), look up
entry_point, call it once per input, record per-call wall time, and (for the
MBPP_OUTPUT_NOT_NONE_TASKS) collapse outputs to `is not None` booleans.

Inputs are the raw JSON values from the official MbppPlus.jsonl release; they go
through EvalPlus's own mbpp_deserialize_inputs (copied verbatim) so the vendored
values carry the exact Python types EvalPlus would hand to a submission
(tuples, sets, complex numbers, ...).

Output: one JSON file holding the deserialized inputs, the expected outputs
(encoded losslessly by the __mbpp_t codec below), per-phase reference times and
problem metadata.

Usage: python compute-expected.py --record <raw-record.json> --out <out.json>
"""

import argparse
import base64
import collections
import importlib.util
import json
import os
import pickle
import sys
import time
from copy import deepcopy

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(HERE)
HARNESS_PATH = os.path.join(REPO_ROOT, "harness", "run_problem.py")

# ---------------------------------------------------------------------------
# EvalPlus data rules (copied verbatim from evalplus/data/mbpp.py, Apache-2.0)
# ---------------------------------------------------------------------------

MBPP_OUTPUT_NOT_NONE_TASKS = ["check_str", "text_match_three", "text_starta_endb"]


def mbpp_deserialize_inputs(task_id: str, inputs: list) -> list:
    task_id = int(task_id.split("/")[-1])
    if task_id in [
        2,
        116,
        132,
        143,
        222,
        261,
        273,
        394,
        399,
        421,
        424,
        429,
        470,
        560,
        579,
        596,
        616,
        630,
        726,
        740,
        744,
        809,
    ]:
        modified_inputs = [[tuple(lst) for lst in inp] for inp in inputs]

    elif task_id in [
        63,
        64,
        70,
        94,
        120,
        237,
        272,
        299,
        400,
        409,
        417,
        438,
        473,
        614,
        780,
    ]:
        modified_inputs = [
            [[tuple(lst) for lst in lst_lst] for lst_lst in inp] for inp in inputs
        ]

    elif task_id in [75, 413, 444, 753]:
        modified_inputs = [
            [[tuple(lst) for lst in inp[0]]] + [inp[1]] for inp in inputs
        ]

    elif task_id == 106 or task_id == 750:
        modified_inputs = [[inp[0]] + [tuple(inp[1])] for inp in inputs]

    elif task_id == 115:
        modified_inputs = [
            [
                [
                    set(item) if isinstance(item, list) and len(item) else {}
                    for item in inp[0]
                ]
            ]
            for inp in inputs
        ]

    elif task_id == 124:
        modified_inputs = [(float(inp[0]), complex(inp[1])) for inp in inputs]

    elif task_id in [250, 405, 446, 617, 720, 763, 808]:
        modified_inputs = [[tuple(inp[0])] + [inp[1]] for inp in inputs]

    elif task_id in [259, 401, 445]:
        modified_inputs = [
            [[tuple(lst) for lst in lst_lst] for lst_lst in inp] for inp in inputs
        ]
        modified_inputs = [[tuple(lst) for lst in inp] for inp in modified_inputs]

    elif task_id == 278:
        modified_inputs = [
            [[tuple(item) if isinstance(item, list) else item for item in inp[0]]]
            for inp in inputs
        ]
        modified_inputs = [[tuple(lst) for lst in inp] for inp in modified_inputs]

    elif task_id == 307:
        modified_inputs = [[tuple(inp[0])] + [inp[1], inp[2]] for inp in inputs]

    elif task_id == 722:
        modified_inputs = [
            [{key: tuple(value) for key, value in inp[0].items()}] + inp[1:]
            for inp in inputs
        ]

    elif task_id == 252:
        modified_inputs = [[complex(inp[0])] for inp in inputs]

    elif task_id in [580, 615, 791]:

        def turn_all_list_into_tuple(inp):
            if isinstance(inp, list):
                return tuple([turn_all_list_into_tuple(item) for item in inp])
            return inp

        modified_inputs = [turn_all_list_into_tuple(inp) for inp in inputs]

    else:
        modified_inputs = inputs

    return modified_inputs


# ---------------------------------------------------------------------------
# Lossless value codec ({"__t": ...} tagged JSON). The inverse lives in
# harness/run_problem.py; compute-expected verifies the round-trip with the
# harness decoder before writing anything.
# ---------------------------------------------------------------------------


def encode_float(value):
    """JSON-legal encoding of a float.

    Python's json writes bare Infinity/-Infinity/NaN, which JSON.parse (the pack's
    TypeScript side) rejects; Mbpp/404's plus_input contains one. Non-finite floats
    travel as a tagged value instead.
    """
    if value != value:
        return {"__t": "float", "v": "nan"}
    if value == float("inf"):
        return {"__t": "float", "v": "inf"}
    if value == float("-inf"):
        return {"__t": "float", "v": "-inf"}
    return value


def encode_value(value):
    t = type(value)
    if value is None or t is bool or t is int or t is str:
        return value
    if t is float:
        return encode_float(value)
    if t is list:
        return [encode_value(item) for item in value]
    if t is tuple:
        return {"__t": "tuple", "items": [encode_value(item) for item in value]}
    if t is set:
        return {"__t": "set", "items": [encode_value(item) for item in value]}
    if t is frozenset:
        return {"__t": "frozenset", "items": [encode_value(item) for item in value]}
    if t is dict:
        return {
            "__t": "dict",
            "items": [[encode_value(key), encode_value(item)] for key, item in value.items()],
        }
    if t is complex:
        return {"__t": "complex", "re": encode_float(float(value.real)), "im": encode_float(float(value.imag))}
    if t is collections.Counter:
        # Mbpp/88's canonical solution returns a Counter; keep the exact type so
        # `type(out) == type(exp)` behaves as it does upstream.
        return {
            "__t": "counter",
            "items": [[encode_value(key), encode_value(item)] for key, item in value.items()],
        }
    # Anything else (an exotic container from a canonical solution) travels as a
    # protocol-4 pickle; decode_value unpickles it. The build fails loudly if the
    # value cannot be pickled or does not survive the round-trip. Not untrusted
    # data: this runs at build time on the benchmark's own canonical solutions.
    return {
        "__t": "pickle",
        "b64": base64.b64encode(pickle.dumps(value, protocol=4)).decode("ascii"),
    }


def strict_equal(a, b) -> bool:
    """Type-exact recursive equality (proves the codec, not just `==`)."""
    if type(a) is not type(b):
        return False
    if type(a) is float:
        return a == b or (a != a and b != b)  # NaN == NaN for this check
    if isinstance(a, list):
        return len(a) == len(b) and all(strict_equal(x, y) for x, y in zip(a, b))
    if isinstance(a, (tuple, set, frozenset)):
        if len(a) != len(b):
            return False
        if isinstance(a, set):
            return a == b
        return all(strict_equal(x, y) for x, y in zip(a, b))
    if isinstance(a, dict):
        if len(a) != len(b):
            return False
        return all(
            strict_equal(k, k2) and strict_equal(v, v2)
            for (k, v), (k2, v2) in zip(a.items(), b.items())
        )
    return a == b


def load_harness():
    spec = importlib.util.spec_from_file_location("mbpp_harness", HARNESS_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def describe(prompt: str, entry_point: str) -> str:
    """First description line of the task text, for the scenario card."""
    text = prompt
    if text.lstrip().startswith('"""'):
        text = text.lstrip()[3:]
        text = text.split('"""', 1)[0]
    for line in text.splitlines():
        line = line.strip()
        if line and not line.startswith("assert "):
            return line[:160]
    return f"Write the function {entry_point}."


def run_phase(fn, inputs, entry_point):
    outputs = []
    times = []
    for inp in inputs:
        inp = deepcopy(inp)
        started = time.perf_counter()
        out = fn(*inp)
        times.append(time.perf_counter() - started)
        if entry_point in MBPP_OUTPUT_NOT_NONE_TASKS:
            out = out is not None
        outputs.append(out)
    return outputs, times


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--record", required=True, help="file holding ONE raw jsonl line from MbppPlus.jsonl")
    parser.add_argument("--out", required=True, help="problem record to write for the pack")
    parser.add_argument("--summary", required=True, help="light metadata for data/manifest.json")
    parser.add_argument("--source-file", default="")
    parser.add_argument("--source-release", default="")
    parser.add_argument("--source-sha", default="")
    parser.add_argument("--record-sha", default="")
    parser.add_argument(
        "--max-vendored-mb",
        type=float,
        default=2.0,
        help="above this encoded size per phase, expected outputs are recomputed at run time (EvalPlus's own behaviour) instead of vendored",
    )
    args = parser.parse_args()

    # The raw line is parsed by Python (not re-serialized by the build driver):
    # MbppPlus.jsonl uses Python's non-standard Infinity/NaN literals, which
    # JavaScript's JSON.parse rejects and JSON.stringify would turn into null.
    with open(args.record, "r", encoding="utf-8") as handle:
        record = json.loads(handle.read())

    task_id = record["task_id"]
    entry_point = record["entry_point"]
    base_input = mbpp_deserialize_inputs(task_id, record["base_input"])
    plus_input = mbpp_deserialize_inputs(task_id, record["plus_input"])

    code = record["prompt"] + record["canonical_solution"]
    globals_dict = {}
    exec(code, globals_dict)  # noqa: S102 - trusted canonical solution, build time only
    fn = globals_dict[entry_point]

    base_expected, base_times = run_phase(fn, base_input, entry_point)
    plus_expected, plus_times = run_phase(fn, plus_input, entry_point)

    base_expected_enc = encode_value(base_expected)
    plus_expected_enc = encode_value(plus_expected)
    base_expected_bytes = len(json.dumps(base_expected_enc, ensure_ascii=False))
    plus_expected_bytes = len(json.dumps(plus_expected_enc, ensure_ascii=False))
    limit_bytes = args.max_vendored_mb * 1024 * 1024
    # Mbpp/255 (combinations_with_replacement with n=77) produces a ~1.7M-element
    # expected output: serializing that would cost gigabytes of JSON. EvalPlus
    # computes ground truth at evaluation time, so oversized problems do the same
    # here instead of vendoring it (see METHODOLOGY.md).
    expected_mode = "vendored"
    if base_expected_bytes > limit_bytes or plus_expected_bytes > limit_bytes:
        expected_mode = "runtime"

    payload = {
        "schema": "mbpp-plus-378/problem@1",
        "id": task_id,
        "task_id": task_id,
        "entry_point": entry_point,
        "atol": record["atol"],
        "prompt": record["prompt"],
        "canonical_solution": record["canonical_solution"],
        "contract": record.get("contract", ""),
        "assertion": record.get("assertion", ""),
        "n_base": len(base_input),
        "n_plus": len(plus_input),
        "expected_mode": expected_mode,
        "max_ref_base_s": max(base_times) if base_times else 0.0,
        "max_ref_plus_s": max(plus_times) if plus_times else 0.0,
        "sum_ref_base_s": sum(base_times),
        "sum_ref_plus_s": sum(plus_times),
        "base_input": encode_value(base_input),
        "plus_input": encode_value(plus_input),
        "expected_bytes": {"base": base_expected_bytes, "plus": plus_expected_bytes},
        "source": {
            "dataset": "evalplus/mbppplus",
            "release": args.source_release,
            "file": args.source_file,
            "sha256": args.source_sha,
            "record_sha256": args.record_sha,
        },
    }
    if expected_mode == "vendored":
        payload["base_expected"] = base_expected_enc
        payload["plus_expected"] = plus_expected_enc

    # Cross-check the codec with the harness' own decoder before shipping the
    # file: every encoded payload must decode back to a type-identical value.
    harness = load_harness()
    if expected_mode == "vendored":
        for field, original in (
            ("base_input", base_input),
            ("plus_input", plus_input),
            ("base_expected", base_expected),
            ("plus_expected", plus_expected),
        ):
            if not strict_equal(harness.decode_value(payload[field]), original):
                raise SystemExit(f"codec round-trip failed for {task_id}.{field}")
    else:
        for field, original in (("base_input", base_input), ("plus_input", plus_input)):
            if not strict_equal(harness.decode_value(payload[field]), original):
                raise SystemExit(f"codec round-trip failed for {task_id}.{field}")

    # Data files are serialized here (Python) and never re-serialized by the
    # build driver: json.dump keeps Infinity/NaN round-trippable, JSON.stringify
    # would turn them into null.
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False)

    summary = {
        "id": task_id,
        "entry_point": entry_point,
        "title": describe(record["prompt"], entry_point),
        "atol": record["atol"],
        "n_base": payload["n_base"],
        "n_plus": payload["n_plus"],
        "expected_mode": expected_mode,
        "expected_bytes": payload["expected_bytes"],
        "max_ref_base_s": payload["max_ref_base_s"],
        "max_ref_plus_s": payload["max_ref_plus_s"],
        "bytes": os.path.getsize(args.out),
    }
    with open(args.summary, "w", encoding="utf-8") as handle:
        json.dump(summary, handle, ensure_ascii=False)
    return 0


if __name__ == "__main__":
    sys.exit(main())
