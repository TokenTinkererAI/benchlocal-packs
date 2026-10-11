# MBPP+-378 — methodology

This document describes exactly how the pack grades a submission, what it
vendors, how it differs from running EvalPlus itself, and what its shipped
checks cover.

## 1. What this pack measures

MBPP+ is the EvalPlus extension of Google Research's **Mostly Basic Python
Problems** (MBPP): 378 of the sanitized MBPP tasks, each with the original
3-7 example inputs (*base*) plus a large set of automatically generated inputs
(*plus*) that probe the same contract from other angles. A model is measured on
**pass@1 over the base + plus suites**: one chat completion per problem, the
submission must satisfy **every base input and every plus input** of that
problem, and the score is the fraction of problems solved (0-100 points).

The full dataset used here has **1,174 base inputs and 39,841 plus inputs**
(41,015 graded calls in total).

## 2. Dataset provenance and shape

| | |
| --- | --- |
| Dataset | `MbppPlus.jsonl.gz`, release **v0.2.0** |
| Source | `https://github.com/evalplus/mbppplus_release/releases/download/v0.2.0/MbppPlus.jsonl.gz` (the file `evalplus.data.get_mbpp_plus()` downloads and the one its harness consumes) |
| SHA-256 | pinned in `data/manifest.json` and in every problem record (`source.sha256`) |
| Records | 378 (`task_id` = `Mbpp/<n>`) |
| License | Apache-2.0 (EvalPlus and the MBPP dataset) — see [NOTICE](NOTICE) |

Each raw record carries `task_id`, `prompt` (the MBPP task text: docstring +
sample assertions, **no function signature**), `canonical_solution` (a full
`def` + body), `entry_point`, `base_input`, `plus_input`, `atol`, `contract`,
`assertion`. `scripts/build-dataset.mjs` copies that record verbatim into
`data/problems/<task_id>.json` (one file per problem, `Mbpp/2` ->
`Mbpp_2.json`), adding the vendored inputs/expected outputs described below.

**Input decoding.** EvalPlus does not feed the raw JSON inputs to a submission:
`evalplus.data.mbpp.mbpp_deserialize_inputs()` rewrites them per task
(list arguments become tuples, task 124 gets `float`/`complex`, task 252
`complex`, task 115 `set`s, task 722 dicts with tuple values, ...). The pack
applies **that exact function** (copied verbatim from
`evalplus/data/mbpp.py`) at build time, so a submission receives the same Python
types EvalPlus would hand it.

**Value codec.** Inputs and expected outputs are vendored in a lossless tagged
JSON form (`{"__t": "tuple"|"set"|"frozenset"|"dict"|"counter"|"complex"|"pickle",
...}`); the inverse decoder lives in `harness/run_problem.py`. Primitives,
lists, ints/floats/bools/None/str travel as plain JSON. `scripts/compute-expected.py`
verifies, before writing anything, that every encoded payload decodes back (with
the harness' own decoder) to a **type-identical** value (`strict_equal`), so a
codec regression fails the build rather than silently changing a grade.

## 3. Expected outputs (build time)

EvalPlus computes its ground truth with `trusted_exec(prompt +
canonical_solution, inputs, entry_point)` — execute the canonical solution once
per input, record the value and the call time, and collapse `MBPP_OUTPUT_NOT_NONE_TASKS`
outputs to `is not None` booleans. `scripts/compute-expected.py` reproduces that
path per problem, in a fresh Python process:

- `exec(prompt + canonical_solution)`; entry point looked up in the exec globals;
- one call per base input and per plus input, `deepcopy` of the input per call
  (exactly as upstream's `trusted_exec`), per-call wall time recorded;
- `output_not_none` collapse for `check_str`, `text_match_three`, `text_starta_endb`;
- per-phase maximum call time stored in the problem record (`max_ref_*_s`) and
  aggregated into `data/manifest.json`.

All 378 problems compute cleanly (no exceptions, no oracle failures); the
largest single canonical call time is **1.13 s**
(Mbpp/599), so the derived per-input limit is the 4 s floor for every phase
except that one problem (4.54 s).

**Oversized expected outputs (two problems).** Mbpp/255
(`combinations_colors`) generates combinations with repetition for a plus input
with `n = 77`, so one of its 109 expected values is a 1.66M-element list; encoded
as JSON that single phase would be **~1.35 GB** (Mbpp/630: ~11 MB). For those two
problems the expected outputs are **not vendored**: the record carries
`expected_mode: "runtime"`, and the harness recomputes them from the shipped
canonical solution (the `trusted_exec` path above) before grading. This is
exactly what EvalPlus does — it computes ground truth at evaluation time — and it
keeps the vendored dataset at ~6.6 MB instead of >1.4 GB. The other 376 problems
grade from vendored values, and the build still executes every canonical
solution over every input for both modes, so the source data is equally verified
either way.

## 4. Execution model

One **Python subprocess per problem** (no Docker, no verifier container), started
by `lib/executor.ts` with a generated spec file:

1. The harness loads the problem record and decodes inputs/expected outputs.
2. `reliability_guard()` — EvalPlus's guard (`evalplus/eval/utils.py`), with the
   Windows fix described below — disables destructive `os`/`shutil`/`subprocess`
   entry points and hides `ipdb`, `joblib`, `resource`, `psutil`, `tkinter`.
3. The submission is executed with **empty globals** (`exec(CODE_PREAMBLE + code,
   exec_globals)`, `CODE_PREAMBLE = ""`), mirroring EvalPlus; no import prelude
   is spliced in, because upstream provides none. `sys.setrecursionlimit(5000)`
   and (when available) `sys.set_int_max_str_digits(50000)` are set first.
4. `fn = exec_globals[entry_point]`; a missing entry point or a submission that
   raises while loading fails both phases (`submission did not load`), exactly
   like upstream's `stat = _FAILED`.
5. stdout/stderr/stdin are redirected to a bounded sink while model code runs, so
   a chatty submission cannot corrupt the harness' `###RESULT###` line.
6. A single `###RESULT###{...}` JSON line on stdout carries the verdict, the
   per-phase counts, the first failing inputs and the elapsed time.

**Windows fixes (documented adaptations).**

- The guard only disables attributes the platform actually has. Upstream assigns
  e.g. `os.fork = None` unconditionally; on Windows that *creates* the attribute,
  so stdlib `hasattr` guards misfire and `import random` crashes.
- `ctypes` (used by the watchdog) is imported at module load, before the guard
  disables `os.getcwd` — otherwise the watchdog thread's lazy `import ctypes`
  would pull in `sysconfig` and die on `os.getcwd()` being `None`.

## 5. Comparison semantics (mirrored from EvalPlus)

`harness/run_problem.py` reproduces `evalplus/eval/__init__.py:unsafe_execute`
test by test:

```text
out = fn(*inp)
exact_match = out == exp
# MBPP special oracles, in upstream order:
#   are_equivalent            -> always True        (Mbpp/164)
#   sum_div                   -> or out == 0        (Mbpp/295)
#   surface_Area              -> or |out - oracle(*inp)| <= atol   (Mbpp/581)
#   digit_distance_nums       -> or out == oracle(*inp)            (Mbpp/558)
#   MBPP_OUTPUT_SET_EQ_TASKS  -> set(out) == set(exp)
#   MBPP_OUTPUT_NOT_NONE_TASKS-> bool output compared directly, else exp == (out is not None)
if atol == 0 and is_floats(exp):
    atol = 1e-6                     # note: upstream mutates the loop variable
if not exact_match and atol != 0:
    assert type(out) == type(exp)
    if isinstance(exp, (list, tuple)): assert len(out) == len(exp)
    assert allclose(out, exp, rtol=1e-07, atol=atol)
else:
    assert exact_match
```

- An exception (or a timeout) on one input marks **only that input** failed and
  grading continues — upstream's `fast_check=False` behaviour.
- A phase passes only if every input was evaluated and passed
  (`len(details) == len(inputs) and all(details)`); a problem passes only if
  **both** the base and the plus phase pass. This is EvalPlus's `mbpp+` metric.
- Failure details recorded per problem: the failing input index and the
  exception (`AssertionError`, `TypeError`, `TimeoutException`, ...), clipped.

**Numpy-free `allclose`.** Upstream compares floats with
`np.allclose(out, exp, rtol=1e-07, atol=atol)`. The harness mirrors the formula
`abs(a - b) <= atol + rtol * abs(b)` recursively over (possibly nested)
lists/tuples instead of importing numpy, so the pack has **no third-party Python
dependency** and cannot behave differently depending on whether numpy is
installed. The `np.ndarray` branch of `is_floats` is dropped for the same
reason (all vendored expected values are plain Python objects; a submission that
returns numpy arrays still compares correctly through `==` and the mirrored
`allclose`). 13 tasks carry a non-zero `atol` (1e-4); everything else gets
`atol = 1e-6` only when the expected value is a float.

## 6. Timeouts and caps

| Layer | Limit | Notes |
| --- | --- | --- |
| Per input | `max(min_time_limit, 4.0 x ref_time)` = **4 s** (default) | EvalPlus's `min_time_limit` / `gt_time_limit_factor`; ref times are the build-time canonical measurements (or the run-time measurement for the two runtime-mode problems), so the 4 s floor binds on every input except Mbpp/599's 4.54 s. Enforced by a watchdog thread + `PyThreadState_SetAsyncExc` (Windows has no `SIGALRM`). |
| Per phase (base and plus separately) | `min(60 s, sum(per-input limits)) + 2 s` | Mirrors `untrusted_check`'s outer join timeout (`EVALPLUS_TIMEOUT_PER_TASK`). Exceeding it ends the phase with status `timeout`. |
| Per problem (outer) | **300 s** wall clock (CLI `--exec-timeout-ms`) | Enforced by the executor; on timeout the whole process tree is killed (`taskkill /T /F` on Windows), then the run records `execution exceeded the ... wall-clock cap`. The only backstop for a hang inside a single C call, where neither signals nor async exceptions are delivered. |
| Model request | **3600 s** | `samplingDefaults.request_timeout_seconds`; requests are streamed (see Transport), so this timer is the binding limit. |

The Windows watchdog is covered by the shipped self-test: `while True: pass` inside a
submission is interrupted after the per-input limit, and a 101-input phase stops
at the phase budget (see the self-test's TLE control).

## Transport

Requests are made with `stream: true` and the SSE response is accumulated
client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s
response-headers timeout that pack code cannot raise, and non-streaming
OpenAI-compatible servers do not send headers until generation finishes — a
generation needing more than ~5 minutes (long hidden reasoning, or a long reply
before the code block) would otherwise fail with `fetch failed` regardless of
the configured `request_timeout_seconds`. With streaming, headers arrive
immediately and the pack's own timeout (default 3600 s) plus the caller's abort
signal are the only limits. A non-SSE `application/json` response is still
accepted as a fallback for servers or proxies that buffer the stream; the mock
server exercises both behaviours (`--json-only` switches it to the
non-streaming reply).

## 7. Prompting and extraction

Chat, zero-shot, one sample per problem at temperature 0:

- **System:** "You are an expert Python programmer. You will be given a
  programming task and must write a complete, correct Python solution."
- **User:** the MBPP+ task text verbatim plus "Please provide a self-contained
  Python script that solves the following problem in a markdown code block:" and
  a line naming the function to define.

Extraction (copied from the HumanEval-164 pack, `lib/extract.ts`): CRLF
normalization; if a fenced block exists, the **first** block's content is taken;
`trimEnd()` only — leading indentation is semantic; the body is cut at the first
column-0 line matching `/^(if |print\s*\()/` after line 0 (executed statements
could change the verdict; trailing `def`/`import`s are inert and kept). An empty
extraction fails immediately with an explanatory summary and **never** reaches
execution.

**Deviation from EvalPlus:** upstream `evalplus.codegen` prompts for a
self-contained script and then post-processes submissions with tree-sitter
(`evalplus/sanitize.py`: syntactically-longest region plus the definitions
reachable from the entry point). The pack instead relies on the fenced-block
contract in the prompt and the human-eval-style extractor above. Consequences:
a submission that defines the entry point but also prints at module level is
truncated at that print (upstream would drop it); a submission whose function
does not parse has no structural fallback. This is the main place where a score
from this pack could differ from `evalplus.evaluate` for the same model output
(CLI `run.ts` persists each extracted completion in the results file, so every
graded string is inspectable).

## 8. Scoring

- pass@1 = problems passed / problems run (both suites passed).
- The headline score is that percentage rounded to the nearest integer, **out of
  100 points**; the summary reads
  `pass@1: <passed>/<total> (<x>%) - <points> points.`
- Every scenario carries `points: 1`, so the per-scenario card reads `1 / 1`.
- One category is reported: `MBPP+ (pass@1)`.

## 9. Determinism and reproducibility

- All expected outputs are **precomputed and vendored**; grading executes only
  the submission. A run is reproducible from `data/` + `harness/` alone.
- Absolute numbers depend on the model endpoint (sampling, quantisation), not on
  the grader; the vendored ground truth is pinned to the source file's SHA-256
  and each record's SHA-256.
- `scripts/build-dataset.mjs` is deterministic given the source jsonl (each
  problem runs in a fresh interpreter; ref-time fields are the only timing-dependent
  values, and they only ever widen a limit that is already at its 4 s floor).

## 10. Deviations from the official EvalPlus harness

1. **Chat prompt** (system + user, fenced block) instead of EvalPlus's
   self-contained-script instruction; see §7.
2. **Extraction** is fence-based rather than tree-sitter `sanitize()`; see §7.
3. **Single sample** per problem at temperature 0 (EvalPlus reports pass@1 with
   n samples; n = 1 here, so absolute numbers are not comparable to
   multi-sample leaderboard numbers).
4. **Precomputed expected outputs**: EvalPlus computes them at evaluation time
   and caches a pickle; this pack computes the identical values once, at build
   time, and vendors them (plus its own decode/type assertion). The comparison
   logic is a faithful mirror; the values are byte-identical in the sense of the
   codec round-trip check. Two problems whose encoded expected outputs exceed
   2 MB per phase (Mbpp/255, Mbpp/630) instead take EvalPlus's own route and
   recompute their expected values at run time (§3).
5. **No numpy** (mirrored `allclose`), **no multiprocessing per phase** (one
   subprocess per problem, node-side tree-kill as the outer cap), and
   `sys.setrecursionlimit(5000)` instead of the default.
6. **Timeout defaults**: EvalPlus's own defaults (`min_time_limit = 4.0`,
   `gt_time_limit_factor = 4.0`, 60 s per task) are kept; the outer per-problem
   cap of 300 s is this pack's addition.
7. `builtins.open` is disabled by the guard (as upstream does) — a submission
   that reads a file fails, matching upstream.
8. **Memory limits are not enforced** on Windows (`resource.setrlimit` is
   POSIX-only); upstream skips them on Windows too, with the same warning.
9. **Unknown expected types travel as protocol-4 pickles** inside the problem
   record (used by none of the 378 MBPP+ tasks today — `Counter` and `complex`
   have explicit tags, and the build fails loudly if a value cannot be
   round-tripped).

## 11. Trust model

The subprocess executes untrusted, model-generated Python behind a reliability
guard, per-input watchdog and a wall-clock cap with process-tree kill. **This is
not a security sandbox.** A determined hostile model can still escape the guard;
upstream's own guard carries the same warning. Run untrusted models in a
disposable environment/VM, and remember that a model's code runs with the
privileges of the BenchLocal process.

## 12. Test suite

- Build: 378/378 problems computed by the build-time oracle (no failures); the
  source file SHA-256 is pinned.
- `npm run selftest`: all 378 canonical solutions execute through the shipped
  executor + harness and pass, plus negative controls (wrong solution fails
  cleanly, an infinite loop is stopped by the watchdog with no harness error).
- Mock E2E (`scripts/mock-server.mjs` on port 8105): a full 378-problem run
  against a mock that serves the canonical solutions ends at **100 points**; the
  `--wrong` variant produces clean grading failures (no harness errors).
- Exact console lines are quoted in [README.md](README.md#verification); the
  packaged artifact's SHA-256 is printed by `npm run pack` and written to
  `results/mbpp-plus-378-1.0.1.sha256.txt`.
