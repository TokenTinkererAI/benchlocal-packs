#!/usr/bin/env python3
"""
HumanEval+-164 grading harness.

Grades ONE model submission against ONE problem's EvalPlus test suite
(base_input + plus_input) and reports a single JSON line on stdout.

The check semantics are ported from EvalPlus `evalplus/eval/__init__.py`
(MIT -- Copyright (c) OpenAI; EvalPlus is Apache-2.0 with its `eval/` subtree
additionally MIT), which itself builds on OpenAI's HumanEval harness:

  - `unsafe_execute`'s per-test loop: `out = fn(*inp)`, then
    `exact_match = out == exp`; the `find_zero` special oracle
    (`abs(_poly(*inp, out)) <= atol`, skipping the stored expectation);
    float tolerance (`atol == 0 and is_floats(exp)` promotes atol to 1e-6,
    and the relaxed branch is `np.allclose(out, exp, rtol=1e-07, atol=atol)`
    guarded by `type(out) == type(exp)` and, for list/tuple, an equal length);
  - `atol` is carried across the per-test loop exactly like upstream, so the
    promotion to 1e-6 persists for the remaining tests of that problem;
  - per-test time limits `max(min_time_limit, gt_time_limit_factor * ref_time)`
    with upstream's defaults (4.0s floor, 4.0x factor) and the global cap
    `min(60s, sum(time_limits)) + 1s` (fast_check mode);
  - the reliability guard, including `builtins.open = None` and the module
    bans, with the Windows `hasattr` gate (upstream assigns `os.fork = None`
    etc. unconditionally, which *creates* those attributes on Windows and
    breaks `import random`).

Windows adaptations (documented deviations):
  - `signal.setitimer`/SIGALRM does not exist on Windows: the per-test limit
    is a watchdog thread that injects `TimeoutException` into the main thread
    with `PyThreadState_SetAsyncExc` (same technique as this repo's
    LiveCodeBench sibling). A wall-clock deadline checked between tests
    mirrors upstream's outer `multiprocessing` kill.
  - `numpy` is used for `np.allclose` when importable (upstream hard-requires
    it); a pure-Python equivalent is used otherwise.

Usage:  python run_problem.py <spec.json>
Spec:   {"problem_file": "...", "completion": "...", "fast_check": true, ...}

Prints exactly one line:  ###RESULT###{"verdict": ...}
"""

import contextlib
import ctypes
import faulthandler
import io
import json
import math
import os
import sys
import threading
import time

if hasattr(sys, "set_int_max_str_digits"):
    # HumanEval/83 expectations are multi-million-bit integers and the
    # vendored records embed them as decimal literals.
    sys.set_int_max_str_digits(0)

RESULT_MARKER = "###RESULT###"

# Upstream defaults (evalplus/config.py).
DEFAULT_MIN_TIME_LIMIT = 4.0
DEFAULT_GT_TIME_LIMIT_FACTOR = 4.0
EVALPLUS_TIMEOUT_PER_TASK = 60.0

try:  # upstream hard-requires numpy; the fallback keeps the pack runnable without it
    import numpy as np
except Exception:  # pragma: no cover
    np = None


# ---------------------------------------------------------------------------
# Import preamble (the LiveCodeBench sibling's testing_util preamble, verbatim)
# ---------------------------------------------------------------------------

import_string = (
    "from string import *\nfrom re import *\nfrom datetime import *\nfrom collections import *\n"
    "from heapq import *\nfrom bisect import *\nfrom copy import *\nfrom math import *\n"
    "from random import *\nfrom statistics import *\nfrom itertools import *\nfrom functools import *\n"
    "from operator import *\nfrom io import *\nfrom sys import *\nfrom json import *\n"
    "from builtins import *\nfrom typing import *\nimport string\nimport re\nimport datetime\n"
    "import collections\nimport heapq\nimport bisect\nimport copy\nimport math\nimport random\n"
    "import statistics\nimport itertools\nimport functools\nimport operator\nimport io\nimport sys\n"
    "import json\nsys.setrecursionlimit(50000)\n"
)


# ---------------------------------------------------------------------------
# Reliability guard (evalplus/eval/utils.py reliability_guard, hasattr-gated)
# ---------------------------------------------------------------------------

_GUARD_APPLIED = False


def reliability_guard():
    """Disable destructive/blocking functions. NOT a security sandbox."""
    global _GUARD_APPLIED
    if _GUARD_APPLIED:  # one-shot: re-running would crash on a disabled os module
        return
    _GUARD_APPLIED = True

    if hasattr(faulthandler, "disable"):
        faulthandler.disable()

    import builtins

    for _name in ("exit", "quit", "help"):
        if hasattr(builtins, _name):
            setattr(builtins, _name, None)
    if hasattr(builtins, "open"):
        builtins.open = None

    import os as _os

    _os.environ["OMP_NUM_THREADS"] = "1"

    for _name in (
        "kill", "system", "putenv", "remove", "removedirs", "rmdir", "fchdir",
        "setuid", "fork", "forkpty", "killpg", "rename", "renames", "truncate",
        "replace", "unlink", "fchmod", "fchown", "chmod", "chown", "chroot",
        "lchflags", "lchmod", "lchown", "getcwd", "chdir",
    ):
        if hasattr(_os, _name):
            setattr(_os, _name, None)

    import shutil

    for _name in ("rmtree", "move", "chown"):
        if hasattr(shutil, _name):
            setattr(shutil, _name, None)

    import subprocess

    if hasattr(subprocess, "Popen"):
        subprocess.Popen = None

    for _mod in ("ipdb", "joblib", "resource", "psutil", "tkinter"):
        sys.modules[_mod] = None


# ---------------------------------------------------------------------------
# Per-test timeout: watchdog thread + async exception injection
# (replaces signal.setitimer/SIGALRM, which Windows does not provide)
# ---------------------------------------------------------------------------


class TimeoutException(Exception):
    pass


class Watchdog:
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
        main_id = threading.main_thread().ident
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(
            ctypes.c_long(main_id), ctypes.py_object(TimeoutException)
        )
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(main_id), None)

    def cancel(self):
        self._stop.set()
        self._thread.join(0.2)


# ---------------------------------------------------------------------------
# I/O swallowing (evalplus/eval/utils.py swallow_io, verbatim behaviour)
# ---------------------------------------------------------------------------


class WriteOnlyStringIO(io.StringIO):
    """StringIO that throws an exception when it's read from"""

    def read(self, *args, **kwargs):
        raise IOError

    def readline(self, *args, **kwargs):
        raise IOError

    def readlines(self, *args, **kwargs):
        raise IOError

    def readable(self, *args, **kwargs):
        return False


class redirect_stdin(contextlib._RedirectStream):  # type: ignore
    _stream = "stdin"


@contextlib.contextmanager
def swallow_io():
    stream = WriteOnlyStringIO()
    with contextlib.redirect_stdout(stream):
        with contextlib.redirect_stderr(stream):
            with redirect_stdin(stream):
                yield


# ---------------------------------------------------------------------------
# Special oracle + comparison (evalplus/eval/__init__.py + _special_oracle.py)
# ---------------------------------------------------------------------------


def _poly(xs, x):
    """Evaluates polynomial with coefficients xs at point x (EvalPlus HumaneEval/032)."""
    return sum([coeff * math.pow(x, i) for i, coeff in enumerate(xs)])


def is_floats(x):
    """evalplus.eval.is_floats, verbatim (float, List[float], Tuple[float], float ndarray)."""
    if isinstance(x, float):
        return True
    if isinstance(x, (list, tuple)) and x:
        return all(isinstance(i, float) for i in x)
    if np is not None and isinstance(x, np.ndarray):
        return x.dtype == np.float64 or x.dtype == np.float32
    return False


def _allclose(out, exp, rtol, atol):
    """np.allclose(out, exp, rtol, atol); pure-Python fallback when numpy is absent."""
    if np is not None:
        return bool(np.allclose(out, exp, rtol=rtol, atol=atol))
    tolerance = atol + rtol * abs(exp)

    def close(a, b):
        if isinstance(b, (list, tuple)):
            return len(a) == len(b) and all(close(x, y) for x, y in zip(a, b))
        return abs(a - b) <= tolerance

    return bool(close(out, exp))


def decode(value):
    """Decode the build-time type-tagged encoding (tuples / non-string-keyed dicts)."""
    if isinstance(value, dict) and value.get("__py_tag__") == "tuple":
        return tuple(decode(item) for item in value["items"])
    if isinstance(value, dict) and value.get("__py_tag__") == "dict":
        return {decode(k): decode(v) for k, v in value["items"]}
    if isinstance(value, dict) and value.get("__py_tag__") == "set":
        return set(decode(item) for item in value["items"])
    if isinstance(value, dict) and value.get("__py_tag__") == "frozenset":
        return frozenset(decode(item) for item in value["items"])
    if isinstance(value, dict) and value.get("__py_tag__") == "float":
        return float(value["repr"])
    if isinstance(value, dict):
        return {key: decode(item) for key, item in value.items()}
    if isinstance(value, list):
        return [decode(item) for item in value]
    return value


def excerpt(value, limit=300):
    """Bounded, crash-proof rendering of a value for the failure detail."""
    try:
        if isinstance(value, int) and not isinstance(value, bool):
            kind = "int"
            if value.bit_length() > 4096:
                return f"<{kind} with {value.bit_length()} bits>"
        elif isinstance(value, str):
            kind = "str"
            if len(value) > limit:
                return f"<{kind} of length {len(value)}: {value[:limit]!r}...>"
        elif isinstance(value, (list, tuple, dict, set, frozenset)):
            kind = type(value).__name__
            if len(value) > 64:
                return f"<{kind} of length {len(value)}>"
        text = repr(value)
    except Exception as exc:  # repr itself can raise (e.g. digit limits)
        return f"<unrenderable {type(value).__name__}: {exc}>"
    if len(text) > limit:
        return text[:limit] + "...<truncated>"
    return text


class WrongAnswer(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


def compare(out, exp, atol, entry_point, inp, dataset="humaneval"):
    """
    evalplus.eval.unsafe_execute's comparison block, ported line by line.

    Returns the (possibly promoted) `atol`, mirroring upstream's loop-local
    mutation. Raises `WrongAnswer` where upstream's assertions would fail.

    Upstream's `find_zero` branch is checked first, asserts the polynomial is
    ~zero at the returned point, and `continue`s -- the stored expectation is
    never consulted for that problem.
    """
    exact_match = out == exp

    # ============== special oracles (dataset == "humaneval") ==============
    if dataset == "humaneval" and entry_point == "find_zero":
        if not abs(_poly(*inp, out)) <= atol:
            raise WrongAnswer(
                "find_zero oracle: |poly(xs)(out)| %s > atol %s (got %s)"
                % (excerpt(abs(_poly(*inp, out))), excerpt(atol), excerpt(out))
            )
        return atol
    # =====================================================================

    if atol == 0 and is_floats(exp):
        atol = 1e-6  # enforce atol for float comparison

    if not exact_match and atol != 0:
        # explicitly set rtol=1e-07 to match `np.testing.assert_allclose`'s defaults
        if type(out) != type(exp):
            raise WrongAnswer("type mismatch under float tolerance: %s != %s" % (type(out).__name__, type(exp).__name__))
        if isinstance(exp, (list, tuple)) and len(out) != len(exp):
            raise WrongAnswer("length mismatch under float tolerance: %d != %d" % (len(out), len(exp)))
        if not _allclose(out, exp, rtol=1e-07, atol=atol):
            raise WrongAnswer(
                "not close within rtol=1e-07, atol=%s: got %s, expected %s"
                % (excerpt(atol), excerpt(out), excerpt(exp))
            )
    elif not exact_match:
        raise WrongAnswer("output differs: got %s, expected %s" % (excerpt(out), excerpt(exp)))

    return atol


# ---------------------------------------------------------------------------
# Grading
# ---------------------------------------------------------------------------


def _failure(kind, index, suite=None, **extra):
    detail = {"kind": kind, "test_index": index}
    if suite is not None:
        detail["suite"] = suite
    detail.update(extra)
    return detail


def grade_suite(fn, inputs, expected, entry_point, atol, time_limits, deadline, dataset, label):
    """
    One suite (base or plus) of evalplus's per-test loop.

    Returns (status, detail) with status in {"pass", "fail", "timeout"}.
    `fast_check` is upstream's default (True): the loop stops at the first
    failing test, which is what upstream's `raise` does.
    """
    for index, inp in enumerate(inputs):
        if time.time() > deadline:
            return "timeout", _failure(
                "global_timeout",
                index,
                suite=label,
                message="global %ds deadline exceeded" % int(EVALPLUS_TIMEOUT_PER_TASK + 1),
            )

        watchdog = Watchdog(time_limits[index]).start()
        try:
            with swallow_io():
                out = fn(*inp)
        except TimeoutException:
            return "timeout", _failure(
                "timeout",
                index,
                suite=label,
                limit_seconds=round(time_limits[index], 3),
                input=excerpt(inp),
                message="per-test time limit %.3fs exceeded" % time_limits[index],
            )
        except BaseException as exc:  # noqa: BLE001 - upstream catches BaseException
            return "fail", _failure(
                "runtime_error",
                index,
                suite=label,
                input=excerpt(inp),
                error="%s: %s" % (type(exc).__name__, exc),
            )
        finally:
            watchdog.cancel()

        try:
            atol = compare(out, expected[index], atol, entry_point, inp, dataset=dataset)
        except WrongAnswer as exc:
            return "fail", _failure(
                "wrong_answer",
                index,
                suite=label,
                input=excerpt(inp),
                expected=excerpt(expected[index]),
                got=excerpt(out),
                message=exc.message,
            )
        except BaseException as exc:  # noqa: BLE001 - upstream's asserts fail the test
            return "fail", _failure(
                "comparison_error",
                index,
                suite=label,
                input=excerpt(inp),
                error="%s: %s" % (type(exc).__name__, exc),
            )

    return "pass", {"kind": "pass", "tests": len(inputs), "suite": label}


def run_problem(problem_file, completion, min_time_limit, gt_time_limit_factor):
    with open(problem_file, "r", encoding="utf-8") as handle:  # before the guard
        record = json.load(handle)

    entry_point = record["entry_point"]
    prompt = record["prompt"]
    atol = record.get("atol", 0) or 0

    code = import_string + "\n\n" + prompt + completion

    base_input = record["base_input"]
    plus_input = record["plus_input"]
    base_expected = [decode(v) for v in record["base_expected"]]
    plus_expected = [decode(v) for v in record["plus_expected"]]
    base_time = record["base_time"]
    plus_time = record["plus_time"]

    base_limits = [max(min_time_limit, gt_time_limit_factor * t) for t in base_time]
    plus_limits = [max(min_time_limit, gt_time_limit_factor * t) for t in plus_time]

    def global_deadline(limits):
        return time.time() + min(EVALPLUS_TIMEOUT_PER_TASK, sum(limits)) + 1  # fast_check

    reliability_guard()

    # The import preamble binds a handful of names that collide with HumanEval
    # entry points (`median`, `add`, `search`, `digits`). The submission's own
    # definition always wins because the prompt is executed after the preamble,
    # but a submission that never defines the entry point must not inherit the
    # preamble's binding -- upstream has no preamble and would raise KeyError.
    preamble_globals = {}
    exec(import_string, preamble_globals)

    exec_globals = {}
    try:
        with swallow_io():
            exec(code, exec_globals)
            fn = exec_globals[entry_point]
    except BaseException as exc:  # noqa: BLE001 - upstream: stat = _FAILED
        kind = "syntax_error" if isinstance(exc, SyntaxError) else "submission_error"
        return {
            "verdict": "fail",
            "base_status": "fail",
            "plus_status": "skipped",
            "detail": _failure(kind, -1, error="%s: %s" % (type(exc).__name__, exc)),
        }, record

    if not callable(fn) or fn is preamble_globals.get(entry_point, object()):
        return {
            "verdict": "fail",
            "base_status": "fail",
            "plus_status": "skipped",
            "detail": _failure(
                "entry_point_missing",
                -1,
                error="the submission did not define %r (resolved object: %r)"
                % (entry_point, type(fn).__name__),
            ),
        }, record

    base_status, base_detail = grade_suite(
        fn, base_input, base_expected, entry_point, atol, base_limits, global_deadline(base_limits), "humaneval", "base"
    )
    if base_status != "pass":
        # The combined verdict cannot change once the base suite fails; upstream
        # would still execute the plus suite. Documented deviation (skipped).
        return {
            "verdict": "fail",
            "base_status": base_status,
            "plus_status": "skipped",
            "base_tests": len(base_input),
            "plus_tests": len(plus_input),
            "detail": base_detail,
        }, record

    plus_status, plus_detail = grade_suite(
        fn, plus_input, plus_expected, entry_point, atol, plus_limits, global_deadline(plus_limits), "humaneval", "plus"
    )

    return {
        "verdict": "pass" if plus_status == "pass" else "fail",
        "base_status": base_status,
        "plus_status": plus_status,
        "base_tests": len(base_input),
        "plus_tests": len(plus_input),
        "detail": plus_detail if plus_status != "pass" else base_detail,
    }, record


def main():
    started = time.time()
    spec_path = sys.argv[1]
    record = None
    try:
        with open(spec_path, "r", encoding="utf-8") as handle:
            spec = json.load(handle)
        result, record = run_problem(
            spec["problem_file"],
            spec["completion"],
            float(spec.get("min_time_limit", DEFAULT_MIN_TIME_LIMIT)),
            float(spec.get("gt_time_limit_factor", DEFAULT_GT_TIME_LIMIT_FACTOR)),
        )
    except Exception as exc:  # harness setup failure -- surfaced, never silent
        result = {
            "verdict": "error",
            "base_status": "error",
            "plus_status": "error",
            "error": "harness setup failed: %s: %s" % (type(exc).__name__, exc),
        }
    if record is not None:
        result["task_id"] = record.get("task_id")
    result["elapsed_s"] = round(time.time() - started, 3)
    sys.stdout.write(RESULT_MARKER + json.dumps(result, default=str) + "\n")
    sys.stdout.flush()


if __name__ == "__main__":
    main()
