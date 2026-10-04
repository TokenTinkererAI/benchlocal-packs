#!/usr/bin/env python3
"""
LiveCodeBench-v6 grading harness.

Grades ONE model submission against ONE problem's complete test set (public +
decrypted private), replicating lcb_runner's code-generation evaluation
semantics (MIT - LiveCodeBench):

  - decryption of private tests: json.loads -> zlib+base64 pickle fallback
    (copied from lcb_runner/benchmarks/code_generation.py);
  - reliability guard with the Windows hasattr fix (upstream sets os.fork=None
    unconditionally, which breaks `import random` on Windows);
  - clean_if_name / make_function wrapping and the sys.stdin/stdout patching
    (copied from lcb_runner/evaluation/testing_util.py);
  - exact comparison rules: stripped lines, exact match then Decimal fallback
    for floats; strictly-all-tests-pass verdicts;
  - ONE adaptation: per-test timeouts use a watchdog thread +
    PyThreadState_SetAsyncExc instead of signal.alarm, which does not exist on
    Windows. A soft global deadline mirrors upstream's outer process kill.

Usage: python run_problem.py <spec.json>
Spec:  {"problem_file": "...", "code": "...", "per_test_timeout_ms": 6000}

Prints a single line: ###RESULT###{"verdict": ..., ...}
"""

import ast
import base64
import ctypes
import faulthandler
import json
import math
import pickle
import sys
import threading
import time
import zlib
from decimal import Decimal
from io import StringIO
from types import ModuleType
from unittest.mock import patch, mock_open

if hasattr(sys, "set_int_max_str_digits"):
    sys.set_int_max_str_digits(50000)

RESULT_MARKER = "###RESULT###"


# ---------------------------------------------------------------------------
# Decryption (copied from lcb_runner/benchmarks/code_generation.py)
# ---------------------------------------------------------------------------


def decrypt_private(blob):
    # Upstream's private test cases are a zlib+base64-wrapped pickled JSON
    # string; this mirrors their exact decryption. The payload only ever
    # contains JSON test data and the blobs come from the official
    # LiveCodeBench dataset.
    try:
        return json.loads(blob)
    except Exception:
        return json.loads(
            pickle.loads(zlib.decompress(base64.b64decode(blob.encode("utf-8"))))
        )


# ---------------------------------------------------------------------------
# import_string (copied from testing_util.py)
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
# Per-test timeout: watchdog thread + async exception injection
# (replaces signal.alarm / SIGALRM, unavailable on Windows)
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
# stdout capture / stdin mocking (copied from testing_util.py)
# ---------------------------------------------------------------------------


class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = StringIO()
        self._stringio.close = lambda x: 1
        return self

    def __exit__(self, *args):
        self.append(self._stringio.getvalue())
        del self._stringio
        sys.stdout = self._stdout


class MockStdinWithBuffer:
    def __init__(self, inputs):
        self.inputs = inputs
        self._stringio = StringIO(inputs)
        self.buffer = MockBuffer(inputs)

    def read(self, *args):
        return self.inputs

    def readline(self, *args):
        return self._stringio.readline(*args)

    def readlines(self, *args):
        return self.inputs.split("\n")

    def __getattr__(self, name):
        return getattr(self._stringio, name)


class MockBuffer:
    def __init__(self, inputs):
        self.inputs = inputs.encode("utf-8")

    def read(self, *args):
        return self.inputs

    def readline(self, *args):
        return self.inputs.split(b"\n")[0] + b"\n"


# ---------------------------------------------------------------------------
# Code transformation (copied from testing_util.py)
# ---------------------------------------------------------------------------


def clean_if_name(code):
    try:
        astree = ast.parse(code)
        last_block = astree.body[-1]
        if isinstance(last_block, ast.If):
            condition = last_block.test
            if ast.unparse(condition).strip() == "__name__ == '__main__'":
                code = ast.unparse(astree.body[:-1]) + "\n" + ast.unparse(last_block.body)
    except Exception:
        pass
    return code


def make_function(code):
    try:
        import_stmts = []
        all_other_stmts = []
        astree = ast.parse(code)
        for stmt in astree.body:
            if isinstance(stmt, (ast.Import, ast.ImportFrom)):
                import_stmts.append(stmt)
            else:
                all_other_stmts.append(stmt)

        function_ast = ast.FunctionDef(
            name="wrapped_function",
            args=ast.arguments(
                posonlyargs=[], args=[], kwonlyargs=[], kw_defaults=[], defaults=[]
            ),
            body=all_other_stmts,
            decorator_list=[],
            lineno=-1,
        )
        main_code = (
            import_string + "\n" + ast.unparse(import_stmts) + "\n" + ast.unparse(function_ast)
        )
        return main_code
    except Exception:
        return code


def call_method(method, inputs):
    if isinstance(inputs, list):
        inputs = "\n".join(inputs)

    inputs_line_iterator = iter(inputs.split("\n"))
    mock_stdin = MockStdinWithBuffer(inputs)

    @patch("builtins.open", mock_open(read_data=inputs))
    @patch("sys.stdin", mock_stdin)
    @patch("sys.stdin.readline", lambda *args: next(inputs_line_iterator))
    @patch("sys.stdin.readlines", lambda *args: inputs.split("\n"))
    @patch("sys.stdin.read", lambda *args: inputs)
    def _inner_call_method(_method):
        try:
            return _method()
        except SystemExit:
            pass
        finally:
            pass

    return _inner_call_method(method)


def get_function(compiled_sol, fn_name):
    try:
        assert hasattr(compiled_sol, fn_name)
        return getattr(compiled_sol, fn_name)
    except Exception:
        return None


def compile_code(code, timeout):
    watchdog = Watchdog(timeout).start()
    try:
        tmp_sol = ModuleType("tmp_sol", "")
        exec(code, tmp_sol.__dict__)
        if "class Solution" in code:
            compiled_sol = tmp_sol.Solution()
        else:
            compiled_sol = tmp_sol
        assert compiled_sol is not None
    except TimeoutException:
        return None
    finally:
        watchdog.cancel()
    return compiled_sol


# ---------------------------------------------------------------------------
# Comparison helpers (copied from testing_util.py)
# ---------------------------------------------------------------------------


def truncatefn(s, length=300):
    if not isinstance(s, str):
        s = str(s)
    if len(s) <= length:
        return s
    return s[: length // 2] + "...(truncated) ..." + s[-length // 2 :]


def convert_line_to_decimals(line):
    try:
        decimal_line = [Decimal(elem) for elem in line.split()]
    except Exception:
        return False, []
    return True, decimal_line


def get_stripped_lines(val):
    val = val.strip()
    return [val_line.strip() for val_line in val.split("\n")]


# ---------------------------------------------------------------------------
# Reliability guard (copied from testing_util.py, with the Windows hasattr fix)
# ---------------------------------------------------------------------------


def reliability_guard():
    faulthandler.disable()
    import builtins

    builtins.quit = None
    builtins.help = None

    import os

    os.environ["OMP_NUM_THREADS"] = "1"

    def disable(module, name):
        if hasattr(module, name):
            setattr(module, name, None)

    for name in [
        "kill", "system", "putenv", "remove", "removedirs", "rmdir", "fchdir",
        "setuid", "fork", "forkpty", "killpg", "rename", "renames", "truncate",
        "replace", "unlink", "fchmod", "fchown", "chmod", "chown", "chroot",
        "lchflags", "lchmod", "lchown", "getcwd", "chdir",
    ]:
        disable(os, name)

    import shutil

    shutil.rmtree = None
    shutil.move = None
    shutil.chown = None

    import subprocess

    subprocess.Popen = None

    sys.modules["ipdb"] = None
    sys.modules["joblib"] = None
    sys.modules["resource"] = None
    sys.modules["psutil"] = None
    sys.modules["tkinter"] = None


# ---------------------------------------------------------------------------
# Grading (structure copied from testing_util.py; signal.alarm -> Watchdog)
# ---------------------------------------------------------------------------


def grade_call_based(code, all_inputs, all_outputs, fn_name, timeout, deadline):
    code = import_string + "\n\n" + code
    compiled_sol = compile_code(code, timeout)
    if compiled_sol is None:
        return None, {"error_message": "compile/instantiation failed"}
    method = get_function(compiled_sol, fn_name)
    if method is None:
        return None, {"error_message": f"function {fn_name} not found"}

    all_inputs = [[json.loads(line) for line in inputs.split("\n")] for inputs in all_inputs]
    all_outputs = [json.loads(output) for output in all_outputs]

    all_results = []
    for idx, (gt_inp, gt_out) in enumerate(zip(all_inputs, all_outputs)):
        if time.time() > deadline:
            all_results.append(-1)
            return all_results, {"error_code": -1, "error_message": "global timeout"}
        watchdog = Watchdog(timeout).start()
        try:
            prediction = method(*gt_inp)
            if isinstance(prediction, tuple):
                prediction = list(prediction)
            tmp_result = prediction == gt_out
            all_results.append(tmp_result)
            if not tmp_result:
                return all_results, {
                    "output": truncatefn(prediction),
                    "inputs": truncatefn(gt_inp),
                    "expected": truncatefn(gt_out),
                    "error_code": -2,
                    "error_message": f"Wrong Answer on test {idx + 1}",
                }
        except TimeoutException:
            all_results.append(-3)
            return all_results, {
                "error_code": -3,
                "error_message": f"Time Limit Exceeded on test {idx + 1}",
            }
        except Exception as e:
            all_results.append(-4)
            return all_results, {
                "error": truncatefn(repr(e)),
                "error_code": -4,
                "error_message": f"Runtime Error on test {idx + 1}",
            }
        finally:
            watchdog.cancel()
    return all_results, {"execution time": 0}


def grade_stdio(code, all_inputs, all_outputs, timeout, deadline):
    code = clean_if_name(code)
    code = make_function(code)
    compiled_sol = compile_code(code, timeout)
    if compiled_sol is None:
        return None, {"error_message": "compile failed"}
    method = get_function(compiled_sol, "wrapped_function")
    if method is None:
        return None, {"error_message": "wrapped_function not found"}

    all_results = []
    for idx, (gt_inp, gt_out) in enumerate(zip(all_inputs, all_outputs)):
        if time.time() > deadline:
            all_results.append(-1)
            return all_results, {"error_code": -1, "error_message": "global timeout"}
        watchdog = Watchdog(timeout).start()
        try:
            with Capturing() as captured_output:
                call_method(method, gt_inp)
        except TimeoutException:
            all_results.append(-3)
            return all_results, {
                "error_code": -3,
                "error_message": f"Time Limit Exceeded on test {idx + 1}",
            }
        except Exception as e:
            all_results.append(-4)
            return all_results, {
                "error": truncatefn(repr(e)),
                "error_code": -4,
                "error_message": f"Runtime Error on test {idx + 1}",
            }
        finally:
            watchdog.cancel()

        prediction = captured_output[0]
        stripped_prediction_lines = get_stripped_lines(prediction)
        stripped_gt_out_lines = get_stripped_lines(gt_out)

        if len(stripped_prediction_lines) != len(stripped_gt_out_lines):
            all_results.append(-2)
            return all_results, {
                "output": truncatefn(prediction),
                "inputs": truncatefn(gt_inp),
                "expected": truncatefn(gt_out),
                "error_code": -2,
                "error_message": f"Wrong Answer on test {idx + 1}: mismatched output length",
            }

        for output_line_idx, (pred_line, gt_line) in enumerate(
            zip(stripped_prediction_lines, stripped_gt_out_lines)
        ):
            if pred_line == gt_line:
                continue
            ok1, dec_pred = convert_line_to_decimals(pred_line)
            ok2, dec_gt = convert_line_to_decimals(gt_line)
            if ok1 and ok2 and dec_pred == dec_gt:
                continue
            all_results.append(-2)
            return all_results, {
                "output": truncatefn(prediction),
                "inputs": truncatefn(gt_inp),
                "expected": truncatefn(gt_out),
                "error_code": -2,
                "error_message": f"Wrong Answer on test {idx + 1}: line {output_line_idx}",
            }
        all_results.append(True)
    return all_results, {"execution time": 0}


def run_problem(problem_file, code, per_test_timeout_s):
    with open(problem_file, "r", encoding="utf-8") as f:
        record = json.load(f)

    public = json.loads(record["public_test_cases"])
    private = decrypt_private(record["private_test_cases"])
    tests = public + private
    try:
        metadata = json.loads(record.get("metadata") or "{}")
    except Exception:
        metadata = {}
    fn_name = metadata.get("func_name", None)

    inputs = [t["input"] for t in tests]
    outputs = [t["output"] for t in tests]
    if not inputs:
        return {"verdict": "error", "error": "problem has no test cases"}

    deadline = time.time() + (per_test_timeout_s + 1) * len(inputs) + 5

    reliability_guard()

    try:
        if fn_name is None:
            results, detail = grade_stdio(code, inputs, outputs, per_test_timeout_s, deadline)
        else:
            results, detail = grade_call_based(code, inputs, outputs, fn_name, per_test_timeout_s, deadline)
    except TimeoutException:
        results, detail = [-1], {"error_code": -1, "error_message": "global timeout"}
    except Exception as e:
        results, detail = [-4], {"error_code": -4, "error_message": f"harness exception: {e}"}

    if results is None:
        results = []
    passed = sum(1 for r in results if r is True)
    verdict = "pass" if results and all(r is True for r in results) else "fail"
    return {
        "verdict": verdict,
        "total": len(inputs),
        "results": [bool(r) if isinstance(r, bool) else r for r in results],
        "passed_count": passed,
        "detail": detail,
    }


def main():
    spec_path = sys.argv[1]
    started = time.time()
    try:
        with open(spec_path, "r", encoding="utf-8") as f:
            spec = json.load(f)
        result = run_problem(
            spec["problem_file"],
            spec["code"],
            spec.get("per_test_timeout_ms", 6000) / 1000.0,
        )
    except Exception as e:
        result = {"verdict": "error", "error": f"harness setup failed: {e}"}
    result["elapsed_s"] = round(time.time() - started, 2)
    sys.stdout.write(RESULT_MARKER + json.dumps(result, default=str) + "\n")
    sys.stdout.flush()


if __name__ == "__main__":
    main()
