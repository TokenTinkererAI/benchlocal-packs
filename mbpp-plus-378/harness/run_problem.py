#!/usr/bin/env python3
"""
MBPP+-378 grading harness (BenchLocal bench pack).

Grades ONE model submission against ONE MBPP+ problem by executing it locally
and comparing outputs with EvalPlus's own semantics — no Docker, no verifier.
The comparison rules are mirrored from evalplus (Apache-2.0, the EvalPlus
authors):

  evalplus/eval/__init__.py   -> unsafe_execute / untrusted_check (the grading
                                path: exec(code), fn = globals[entry_point],
                                out = fn(*inp); exact `==` first, MBPP special
                                oracles, the `atol == 0 and is_floats(exp)`
                                escalation to 1e-6, then
                                np.allclose(out, exp, rtol=1e-07, atol=atol)
                                with `type(out) == type(exp)` and list-length
                                asserts; a per-input exception marks only that
                                input failed; a phase passes only when every
                                input passed);
  evalplus/gen/util/__init__.py -> trusted_exec (the build-time ground-truth
                                path, reimplemented in scripts/compute-expected.py);
  evalplus/eval/utils.py      -> reliability_guard and swallow_io;
  evalplus/config.py          -> DEFAULT_MIN_TIME_LIMIT = 4.0 s,
                                DEFAULT_GT_TIME_LIMIT_FACTOR = 4.0;
  evalplus/eval/_special_oracle.py -> MBPP special oracles.

Documented Windows adaptations (see METHODOLOGY.md):
  - per-input timeouts use a watchdog thread + PyThreadState_SetAsyncExc,
    because signal.setitimer/SIGALRM do not exist on Windows;
  - the reliability guard only disables attributes the platform actually has
    (upstream assigns os.fork = None unconditionally, which breaks
    `import random` on Windows);
  - numpy is replaced by a pure-Python allclose mirror (no third-party runtime
    dependency); the np.ndarray branch of is_floats is dropped because MBPP+
    expected values are plain Python objects.

Expected outputs and inputs are NOT recomputed here: they are vendored at build
time (scripts/compute-expected.py) and decoded by decode_value().

Usage: python run_problem.py <spec.json>
Spec:  {"problem_file": "...", "code": "...", "min_time_limit_s": 4.0,
        "gt_time_limit_factor": 4.0, "timeout_per_task_s": 60}

Prints a single line: ###RESULT###{"verdict": ..., ...}
"""

import argparse
import base64
import collections
import ctypes
import faulthandler
import io
import json
import math
import os
import pickle
import sys
import threading
import time
from copy import deepcopy

RESULT_MARKER = "###RESULT###"

# EvalPlus injects nothing around a submission: `exec(code, exec_globals)` starts
# from empty builtins-only globals (evalplus/eval/__init__.py). Unlike the
# LiveCodeBench harness we therefore do NOT splice an `import_string` preamble
# into submissions - that would hand out imports upstream does not provide.
CODE_PREAMBLE = ""

# evalplus/config.py
MIN_TIME_LIMIT_S = 4.0
GT_TIME_LIMIT_FACTOR = 4.0
DEFAULT_TIMEOUT_PER_TASK_S = 60.0

# ---------------------------------------------------------------------------
# Special oracles (copied from evalplus/eval/_special_oracle.py, Apache-2.0)
# ---------------------------------------------------------------------------

# For tasks whose output are not serializable, we only check the output is not None.
MBPP_OUTPUT_NOT_NONE_TASKS = ["check_str", "text_match_three", "text_starta_endb"]

# Tasks that needs to perform set comparison over two lists
MBPP_OUTPUT_SET_EQ_TASKS = [
    "similar_elements",  # Mbpp/2
    "find_char_long",  # Mbpp/7
    "common_in_nested_lists",  # Mbpp/111
    "extract_singly",  # Mbpp/140
    "larg_nnum",  # Mbpp/232
    "intersection_array",  # Mbpp/249
    "find_dissimilar",  # Mbpp/579
    "Diff",  # Mbpp/769
]


def _surface_Area(base_edge, height):
    """Oracle for Mbpp/581."""
    slant_height = math.sqrt((base_edge / 2) ** 2 + height**2)
    base_area = base_edge**2
    lateral_area = 4 * (base_edge * slant_height) / 2
    total_surface_area = base_area + lateral_area
    return round(total_surface_area)


def _digit_distance_nums(num1, num2):
    """Oracle for Mbpp/558."""
    str_num1, str_num2 = str(num1), str(num2)
    max_length = max(len(str_num1), len(str_num2))
    str_num1, str_num2 = str_num1.zfill(max_length), str_num2.zfill(max_length)
    total_difference = 0
    for digit1, digit2 in zip(str_num1, str_num2):
        difference = abs(int(digit1) - int(digit2))
        total_difference += difference
    return total_difference


# ---------------------------------------------------------------------------
# Value codec: inverse of scripts/compute-expected.py:encode_value
# ---------------------------------------------------------------------------


def decode_value(value):
    if isinstance(value, dict):
        tag = value.get("__t")
        if tag is None:
            return {key: decode_value(item) for key, item in value.items()}
        if tag == "tuple":
            return tuple(decode_value(item) for item in value["items"])
        if tag == "set":
            return set(decode_value(item) for item in value["items"])
        if tag == "frozenset":
            return frozenset(decode_value(item) for item in value["items"])
        if tag == "dict":
            return {
                decode_value(key): decode_value(item) for key, item in value["items"]
            }
        if tag == "counter":
            return collections.Counter(
                {decode_value(key): decode_value(item) for key, item in value["items"]}
            )
        if tag == "float":
            return {"nan": float("nan"), "inf": float("inf"), "-inf": float("-inf")}[value["v"]]
        if tag == "complex":
            return complex(decode_value(value["re"]), decode_value(value["im"]))
        if tag == "pickle":
            # Not untrusted input: these blobs are produced at pack build time by
            # scripts/compute-expected.py from the canonical solutions of the
            # official MbppPlus release and ship inside the pack's own data files
            # (the harness never unpickles anything a model returned).
            return pickle.loads(base64.b64decode(value["b64"]))
        raise ValueError(f"unknown value tag {tag!r}")
    if isinstance(value, list):
        return [decode_value(item) for item in value]
    return value


# ---------------------------------------------------------------------------
# Comparison helpers (numpy-free mirrors of the EvalPlus path)
# ---------------------------------------------------------------------------


def is_floats(x) -> bool:
    """evalplus/eval/__init__.py:is_floats, minus the np.ndarray branch.

    EvalPlus expected values for MBPP+ are plain Python objects (numpy outputs
    are float64 scalars/arrays only if a submission uses numpy), so the ndarray
    branch is unreachable for the vendored ground truth.
    """
    if isinstance(x, float):
        return True
    if isinstance(x, (list, tuple)) and x:
        return all(isinstance(item, float) for item in x)
    return False


def allclose(actual, expected, rtol: float = 1e-07, atol: float = 0.0) -> bool:
    """Pure-Python mirror of `np.allclose(actual, expected, rtol=1e-07, atol=atol)`.

    numpy's rule is `abs(actual - expected) <= atol + rtol * abs(expected)`,
    applied element-wise over the (possibly nested) sequences that occur here.
    Mirrors numpy's result for tuples/lists of scalars; unlike numpy it does not
    broadcast mismatched shapes (a shape mismatch means "not close").
    """

    if isinstance(actual, (list, tuple)) or isinstance(expected, (list, tuple)):
        if not (
            isinstance(actual, (list, tuple))
            and isinstance(expected, (list, tuple))
            and len(actual) == len(expected)
        ):
            return False
        return all(
            allclose(a, e, rtol=rtol, atol=atol)
            for a, e in zip(actual, expected)
        )
    return abs(actual - expected) <= atol + rtol * abs(expected)


class TimeoutException(Exception):
    pass


class Watchdog:
    """Per-input timeout: daemon thread + PyThreadState_SetAsyncExc.

    signal.setitimer/SIGALRM (used by evalplus) is not available on Windows.
    The async exception is delivered at a bytecode boundary; the node-side
    process-tree kill is the backstop for hangs inside a single C call.
    """

    def __init__(self, seconds):
        self.seconds = seconds
        self.fired = False
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._run, daemon=True)

    def start(self):
        self._thread.start()
        return self

    def _run(self):
        if self._stop.wait(self.seconds):
            return
        self.fired = True
        # ctypes must already be imported at module import time: the reliability
        # guard sets os.getcwd/os.chdir to None, and a lazy `import ctypes` inside
        # this thread would import sysconfig -> ntpath.realpath -> os.getcwd and
        # die with "TypeError: 'NoneType' object is not callable".
        main_id = threading.main_thread().ident
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(
            ctypes.c_long(main_id), ctypes.py_object(TimeoutException)
        )
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(main_id), None)

    def cancel(self):
        self._stop.set()
        self._thread.join(0.2)


class Sink(io.TextIOBase):
    """Bounded, write-only sink (evalplus swallow_io spirit)."""

    def __init__(self, limit=64 * 1024):
        self.limit = limit
        self.total = 0

    def write(self, text):
        if isinstance(text, bytes):
            text = text.decode("utf-8", "replace")
        self.total += len(text)
        return len(text)

    def flush(self):
        return None

    def readable(self):
        return False

    def writable(self):
        return True

    def read(self, *args, **kwargs):
        raise IOError("sink is write-only")

    def readline(self, *args, **kwargs):
        raise IOError("sink is write-only")

    def readlines(self, *args, **kwargs):
        raise IOError("sink is write-only")


class swallow_io:
    """Redirect stdout/stderr/stdin to a bounded sink while running model code."""

    def __init__(self):
        self._sink = Sink()

    def __enter__(self):
        self._stdout = sys.stdout
        self._stderr = sys.stderr
        self._stdin = sys.stdin
        sys.stdout = self._sink
        sys.stderr = self._sink
        sys.stdin = self._sink
        return self

    def __exit__(self, *exc_info):
        sys.stdout = self._stdout
        sys.stderr = self._stderr
        sys.stdin = self._stdin
        return False


# ---------------------------------------------------------------------------
# Reliability guard (from evalplus/eval/utils.py with the Windows hasattr fix)
# ---------------------------------------------------------------------------


def reliability_guard(maximum_memory_bytes=None):
    """Disables destructive functions; NOT a security sandbox.

    evalplus assigns e.g. `os.fork = None` unconditionally. On Windows that
    CREATES the attribute, so stdlib guards (`if hasattr(_os, "fork")`) misfire
    and `import random` crashes - hence the hasattr gate. Memory limits
    (resource.setrlimit) do not exist on Windows and are skipped.
    """

    faulthandler.disable()

    import builtins

    builtins.exit = None
    builtins.quit = None
    builtins.help = None

    import os

    os.environ["OMP_NUM_THREADS"] = "1"

    def disable(module, name):
        if hasattr(module, name):
            setattr(module, name, None)

    for name in [
        "kill",
        "system",
        "putenv",
        "remove",
        "removedirs",
        "rmdir",
        "fchdir",
        "setuid",
        "fork",
        "forkpty",
        "killpg",
        "rename",
        "renames",
        "truncate",
        "replace",
        "unlink",
        "fchmod",
        "fchown",
        "chmod",
        "chown",
        "chroot",
        "lchflags",
        "lchmod",
        "lchown",
        "getcwd",
        "chdir",
    ]:
        disable(os, name)

    builtins.open = None

    import shutil

    shutil.rmtree = None
    shutil.move = None
    shutil.chown = None

    import subprocess

    subprocess.Popen = None

    for module_name in ["ipdb", "joblib", "resource", "psutil", "tkinter"]:
        sys.modules[module_name] = None


# ---------------------------------------------------------------------------
# Grading (structure of evalplus unsafe_execute; watchdog instead of SIGALRM)
# ---------------------------------------------------------------------------

MAX_FAILURE_DETAILS = 5
MAX_ERROR_CHARS = 200


def compute_expected(fn, inputs, entry_point):
    """Expected outputs for problems graded without vendored values.

    Mirrors evalplus/gen/util/trusted_exec (the ground-truth path): a deepcopy per
    input, per-call wall time recorded, and the `is not None` collapse for
    MBPP_OUTPUT_NOT_NONE_TASKS. EvalPlus itself computes ground truth at
    evaluation time; only the handful of problems whose encoded expected outputs
    would run into the gigabytes take this path (see METHODOLOGY.md).
    """
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


def clip(text, limit=MAX_ERROR_CHARS):
    text = str(text)
    return text if len(text) <= limit else text[:limit] + "...(truncated)"


def grade_phase(fn, inputs, expected, atol, entry_point, time_limits, deadline):
    """Mirrors evalplus unsafe_execute for one phase (base or plus)."""
    details = []
    failures = []
    timed_out = False

    for index, inp in enumerate(inputs):
        if time.time() > deadline:
            timed_out = True
            break
        watchdog = Watchdog(time_limits[index]).start()
        try:
            out = fn(*inp)
            exp = expected[index]
            exact_match = out == exp

            # ============== special oracles (evalplus, mbpp) ==============
            if "are_equivalent" == entry_point:  # Mbpp/164
                exact_match = exact_match or True
            elif "sum_div" == entry_point:  # Mbpp/295
                exact_match = exact_match or out == 0
            elif "surface_Area" == entry_point:  # Mbpp/581
                exact_match = exact_match or abs(out - _surface_Area(*inp)) <= atol
            elif "digit_distance_nums" == entry_point:  # Mbpp/558
                exact_match = exact_match or out == _digit_distance_nums(*inp)
            elif entry_point in MBPP_OUTPUT_SET_EQ_TASKS:
                exact_match = set(out) == set(exp)
            elif entry_point in MBPP_OUTPUT_NOT_NONE_TASKS:
                # exp is True if not None, False if None
                if isinstance(out, bool):
                    exact_match = out == exp
                else:
                    exact_match = exp == (out is not None)
            # ==============================================================

            if atol == 0 and is_floats(exp):
                atol = 1e-6  # enforce atol for float comparison
            if not exact_match and atol != 0:
                # explicitly set rtol=1e-07 to match np.testing.assert_allclose
                assert type(out) == type(exp)
                if isinstance(exp, (list, tuple)):
                    assert len(out) == len(exp)
                assert allclose(out, exp, rtol=1e-07, atol=atol)
            else:
                assert exact_match
        except TimeoutException:
            details.append(False)
            if len(failures) < MAX_FAILURE_DETAILS:
                failures.append({"index": index, "error": "timeout"})
            continue
        except BaseException as exc:  # noqa: BLE001 - mirrors EvalPlus
            details.append(False)
            if len(failures) < MAX_FAILURE_DETAILS:
                failures.append({"index": index, "error": clip(f"{type(exc).__name__}: {exc}")})
            continue
        finally:
            watchdog.cancel()

        details.append(True)

    passed = sum(1 for detail in details if detail)
    if timed_out:
        status = "timeout" if passed != len(inputs) else "pass"
    else:
        status = "pass" if (len(details) == len(inputs) and all(details)) else "fail"
    # evalplus untrusted_check: a "pass" process whose details are short/incomplete is a fail.
    if status == "pass" and (len(details) != len(inputs) or not all(details)):
        status = "fail"

    return {
        "status": status,
        "passed": passed,
        "total": len(inputs),
        "evaluated": len(details),
        "failures": failures,
    }


def run_problem(problem_file, code, min_time_limit_s, gt_time_limit_factor, timeout_per_task_s):
    started = time.time()
    with open(problem_file, "r", encoding="utf-8") as handle:
        record = json.load(handle)

    entry_point = record["entry_point"]
    atol = record["atol"]
    base_input = decode_value(record["base_input"])
    plus_input = decode_value(record["plus_input"])

    if record.get("expected_mode") == "runtime":
        # Oversized expected outputs (Mbpp/255: ~1.7M-element lists) are
        # recomputed here from the shipped canonical solution, exactly as EvalPlus
        # computes ground truth at evaluation time. Runs before the reliability
        # guard, like upstream's parent-process ground-truth pass.
        canonical_globals = {}
        with swallow_io():
            exec(record["prompt"] + record["canonical_solution"], canonical_globals)  # noqa: S102 - trusted
        canonical_fn = canonical_globals[entry_point]
        base_expected, base_times = compute_expected(canonical_fn, base_input, entry_point)
        plus_expected, plus_times = compute_expected(canonical_fn, plus_input, entry_point)
    else:
        base_expected = decode_value(record["base_expected"])
        plus_expected = decode_value(record["plus_expected"])
        base_times = None
        plus_times = None

    # evalplus time budget: per-input limit = max(min_time_limit, factor * ref_time)
    base_ref = max(base_times) if base_times else float(record.get("max_ref_base_s", 0.0))
    plus_ref = max(plus_times) if plus_times else float(record.get("max_ref_plus_s", 0.0))
    base_ref = max(base_ref, 0.0)
    plus_ref = max(plus_ref, 0.0)
    base_limits = [max(min_time_limit_s, gt_time_limit_factor * base_ref)] * len(base_input)
    plus_limits = [max(min_time_limit_s, gt_time_limit_factor * plus_ref)] * len(plus_input)

    reliability_guard()
    if hasattr(sys, "set_int_max_str_digits"):
        sys.set_int_max_str_digits(50000)
    sys.setrecursionlimit(5000)

    exec_globals = {}
    try:
        with swallow_io():
            exec(CODE_PREAMBLE + code, exec_globals)  # noqa: S102 - untrusted model code
            fn = exec_globals[entry_point]
    except BaseException as exc:  # noqa: BLE001 - mirrors EvalPlus (`stat = _FAILED`)
        message = clip(f"{type(exc).__name__}: {exc}")
        empty_base = {"status": "fail", "passed": 0, "total": len(base_input), "evaluated": 0, "failures": []}
        empty_plus = {"status": "fail", "passed": 0, "total": len(plus_input), "evaluated": 0, "failures": []}
        return {
            "verdict": "fail",
            "total": len(base_input) + len(plus_input),
            "passed_count": 0,
            "results": [False] * (len(base_input) + len(plus_input)),
            "base": empty_base,
            "plus": empty_plus,
            "detail": {"error_message": "submission did not load", "error": message},
            "elapsed_s": round(time.time() - started, 2),
        }

    total_limits = base_limits + plus_limits
    phase_cap = min(float(timeout_per_task_s), sum(total_limits)) + 2

    base_result = grade_phase(
        fn, base_input, base_expected, atol, entry_point, base_limits, time.time() + phase_cap
    )
    plus_result = grade_phase(
        fn, plus_input, plus_expected, atol, entry_point, plus_limits, time.time() + phase_cap
    )

    passed_count = base_result["passed"] + plus_result["passed"]
    total = base_result["total"] + plus_result["total"]
    verdict = "pass" if (base_result["status"] == "pass" and plus_result["status"] == "pass") else "fail"

    results = [True] * base_result["passed"] + [False] * (base_result["total"] - base_result["passed"])
    results += [True] * plus_result["passed"] + [False] * (plus_result["total"] - plus_result["passed"])

    detail = {
        "task_id": record["task_id"],
        "entry_point": entry_point,
        "base": {
            "status": base_result["status"],
            "passed": base_result["passed"],
            "total": base_result["total"],
            "failures": base_result["failures"],
        },
        "plus": {
            "status": plus_result["status"],
            "passed": plus_result["passed"],
            "total": plus_result["total"],
            "failures": plus_result["failures"],
        },
        "atol": atol,
    }

    return {
        "verdict": verdict,
        "total": total,
        "passed_count": passed_count,
        "results": results,
        "base": base_result,
        "plus": plus_result,
        "detail": detail,
        "elapsed_s": round(time.time() - started, 2),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("spec")
    args = parser.parse_args()

    started = time.time()
    try:
        with open(args.spec, "r", encoding="utf-8") as handle:
            spec = json.load(handle)
        result = run_problem(
            spec["problem_file"],
            spec["code"],
            float(spec.get("min_time_limit_s", MIN_TIME_LIMIT_S)),
            float(spec.get("gt_time_limit_factor", GT_TIME_LIMIT_FACTOR)),
            float(spec.get("timeout_per_task_s", DEFAULT_TIMEOUT_PER_TASK_S)),
        )
    except BaseException as exc:  # noqa: BLE001 - harness must always answer
        result = {"verdict": "error", "error": clip(f"harness setup failed: {type(exc).__name__}: {exc}")}
    result["elapsed_s"] = round(time.time() - started, 2)
    sys.stdout.write(RESULT_MARKER + json.dumps(result, default=str) + "\n")
    sys.stdout.flush()
    return 0


if __name__ == "__main__":
    sys.exit(main())
