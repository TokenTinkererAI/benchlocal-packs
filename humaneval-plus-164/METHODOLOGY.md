# METHODOLOGY — HumanEval+-164

What this pack grades, how the grading mirrors EvalPlus, where it deviates
deliberately, and what the shipped test suite covers.

- Pack: `humaneval-plus-164` 1.0.1 · 164 scenarios · 1 point each · 100 points total
- Dataset: EvalPlus HumanEval+ `v0.1.10` (`HUMANEVAL_PLUS_VERSION` in
  `evalplus/data/humaneval.py`), vendored as `data/source/HumanEvalPlus.jsonl.gz`
- Harness: `harness/run_problem.py` (Python 3.9+), one subprocess per problem

---

## 1. Relationship to the HumanEval-164 pack

This pack and `humaneval-164` share the **same 164 problems and the same prompt
wrapper**. They differ in what counts as correct:

| | HumanEval-164 | HumanEval+-164 |
| --- | --- | --- |
| correct answer is judged by | the problem's own `check()` assertions (7–20 hand-written asserts) | the base suite **and** the plus suite, compared against outputs computed from the reference solution |
| graded tests per problem | 7–20 | base 1,570 total (3–100 per problem) + plus 122,675 total (2–1,000 per problem) |
| expected values | asserted literals inside `check()` | the reference implementation's own return values on generated inputs |
| typical pass@1 on a mid-size local model | high (the original suite is small and easy) | markedly lower — the plus suite is designed to kill solutions that are only correct on the obvious cases |

Scores are therefore **not comparable between the two packs**, and HumanEval+
must not be read as "HumanEval-164 rerun". The chat prompt, extraction rules and
per-scenario scoring are identical on purpose, so a score difference reflects
the test suite and nothing else. Both packs can be installed side by side.

An important consequence of the EvalPlus design: because expectations are the
reference implementation's outputs *on the same interpreter*, a submission must
match the reference **behaviour**, including float rounding to the dataset's
`atol` and the exact return types (`tuple` vs `list`, `dict` vs `list`).

---

## 2. Data sourcing (what was verified, not assumed)

Upstream loads HumanEval+ from a release asset, not from a package data file:
`evalplus/data/humaneval.py` builds the URL
`…/evalplus/humanevalplus_release/releases/download/v0.1.10/HumanEvalPlus.jsonl.gz`
and caches it under `user_cache_dir("evalplus")`.

Verified against upstream:

- The HuggingFace mirror `evalplus/humanevalplus` (`--repo-type dataset`) downloads
  164 rows whose fields are **only** `task_id`, `prompt`, `canonical_solution`,
  `entry_point`, `test` — i.e. the original HumanEval content. It does **not**
  carry `base_input` / `plus_input` / `atol` / `contract`, so it cannot be used
  as the test-suite source. (Its card is kept at `data/source/HF-DATASET-CARD.md`
  as evidence.)
- The release asset does carry them. The file used here has sha256
  `272720b90ac375502c8ed23cd791c2a93dfb22a911641a494da74a426c09f101` and 164
  records with fields `task_id, prompt, entry_point, canonical_solution, test,
  contract, base_input, plus_input, atol`.
- `atol` is 0 for 161 problems, 1e-6 for `HumanEval/2` and `HumanEval/4`, and
  1e-4 for `HumanEval/32`.
- Totals: 1,570 base inputs and 122,683 plus inputs (122,675 after the exclusion
  in §5), median 748 plus inputs per problem, maximum 1,000.

`npm run build:dataset` re-derives everything from that file and fails the build
if any invariant breaks (count, `task_id` sequence, decoder round-trip for every
expected value).

---

## 3. Execution model

One problem = one scenario = one subprocess. The harness targets **Python 3.9+**:
it parses under the 3.9 grammar (`ast` `feature_version=(3,9)`) and uses no
post-3.9 API, and the post-3.11
`sys.set_int_max_str_digits` call is `hasattr`-guarded.

One problem maps to one scenario and runs in one subprocess:

```
model reply ──► lib/extract.ts ──► spec.json ──► py -3 harness/run_problem.py spec.json
                                                     │
                    prompt + completion ── exec(code, globals)
                                                     │
                    base suite ──► plus suite ──► ###RESULT###{json} on stdout
```

- The harness rebuilds the submitted program the way upstream does
  (`problems[task_id]["prompt"] + completion`) and executes it once.
- It then runs the base suite and, if that passes, the plus suite, comparing each
  return value against the vendored expectation for that input.
- A problem passes only when **both suites pass in full**; this is EvalPlus's own
  `base_status == plus_status == PASS` condition (see `evalplus/evaluate.py`,
  which computes the "plus" pass@1 exactly that way).
- Time limits (upstream defaults, `evalplus/config.py`):
  `per_test[i] = max(4.0s, 4.0 × reference_time[i])`, and a global deadline of
  `min(60s, Σ per_test) + 1s`. A correct-but-slow submission therefore gets the
  same headroom upstream gives it.
- Node-side there is a wall-clock cap per problem (`--exec-timeout-ms`, default
  90,000 ms) that kills the process tree — the backstop for a hang inside a
  single C call, where an injected exception cannot be delivered.
- Reliability guard: the EvalPlus guard (destructive `os` functions, `shutil`,
  `subprocess.Popen`, `builtins.exit/quit/help/open`, and `ipdb/joblib/resource/
  psutil/tkinter` removed from `sys.modules`), applied **once** per process with
  the `hasattr` gate. The gate matters on Windows: upstream assigns
  `os.fork = None` unconditionally, which *creates* the attribute and then makes
  `import random` fail — HumanEval/32, /38, /50 and /53 import `random` in their
  test paths.
- Each graded call runs inside `swallow_io()` (EvalPlus's write-only stdout/stderr
  redirection), so a submission that prints cannot pollute the result channel.
- The submitted program is executed as
  `import_string + "\n\n" + prompt + completion`, where `import_string` is the
  same standard-library import preamble the LiveCodeBench sibling uses (it ends
  with `sys.setrecursionlimit(50000)`). Upstream executes `prompt + completion`
  with no preamble. Two consequences are handled explicitly:
  - the preamble binds five names that **collide with HumanEval entry points** —
    `median` (HumanEval/47), `add` (/53 and /85), `search` (/69) and `digits`
    (/131). The submission's own definition always wins, because the prompt is
    executed after the preamble; and if a submission never defines the entry
    point, the harness detects that the resolved object *is* the preamble's
    binding and reports `entry_point_missing` instead of grading the wrong
    object. (Upstream, having no preamble, raises `KeyError` there — this is the
    same FAIL, with a clearer reason.)
  - the preamble re-exports `open` from `io`, so the guard's
    `builtins.open = None` is not absolute.

**The guard is an anti-accident measure, not a security sandbox.** Model code
runs as an ordinary local process with a guard, a watchdog and a timeout. A
hostile submission would need a container or VM, which this pack deliberately
does not use.

---

## 4. Comparison semantics (ported line by line from EvalPlus)

Source of truth: `evalplus/eval/__init__.py` (`unsafe_execute`),
`evalplus/eval/_special_oracle.py`, `evalplus/eval/utils.py`,
`evalplus/gen/util/__init__.py` (`trusted_exec`). The port keeps upstream's
order of operations, including its quirks.

Per graded test, with `out = fn(*inp)` and `exp` the vendored expectation:

1. `exact_match = out == exp`
2. **`find_zero` special oracle** (`HumanEval/32` only, `dataset == "humaneval"`):
   `assert abs(_poly(*inp, out)) <= atol`, where `_poly` is EvalPlus's polynomial
   helper; the test passes and the stored expectation is never consulted.
3. If `atol == 0` and `is_floats(exp)`, promote `atol` to `1e-6`
   (`is_floats` = `float`, non-empty `list`/`tuple` of floats, or a float
   `np.ndarray`). Upstream's `atol` lives in the per-test loop, so the promotion
   **persists for the remaining tests of that problem** — preserved here, and it
   restarts per suite because base and plus are separate upstream calls.
4. If `not exact_match and atol != 0`:
   `assert type(out) == type(exp)`; for `list`/`tuple`, `assert len(out) == len(exp)`;
   then `np.allclose(out, exp, rtol=1e-07, atol=atol)`
   (upstream's comment: rtol matches `np.testing.assert_allclose`).
   Otherwise: `assert exact_match`.
5. Any raise → that test fails; upstream's `fast_check` default (`True`) stops at
   the first failure, which the harness reproduces.

Verdicts are `pass` / `fail` / `timeout` (per-test limit, global deadline) and
the failure detail names the suite, the 1-based test number, and 300-character
excerpts of the input, the expectation and the produced value. Excerpts are
truncated deliberately: upstream stores whole failing inputs in its results file,
which for this dataset can be hundreds of kilobytes per failure.

`numpy` is used for `np.allclose` when importable (upstream hard-requires it); a
pure-Python equivalent of the same formula is used otherwise.

---

## 5. Vendored expectations, and the 8 excluded inputs in HumanEval/32

**Expectations are computed at build time** by executing each problem's
`canonical_solution` exactly as EvalPlus's `trusted_exec` does — `deepcopy` of
each input, no guard, no timeout, per-call wall clock recorded — and are stored
in `data/problems/HumanEval_<n>.json` together with those timings (they set the
per-test limits). That is a deviation from upstream, which computes ground truth
on first use and caches a pickle (§7). It makes the pack self-contained and
removes any run-time dependency on the reference solution.

JSON cannot carry everything the suites contain, so expectations use one small
type tag (`__py_tag__`) for tuples, non-string-keyed dicts, sets and non-finite
floats. This matters: the comparison is type-exact, so a `tuple` expectation
decoded as a `list` would fail a correct submission. The build **proves** the
encoding by decoding every stored expectation with the shipped decoder and
requiring both value equality and identical types — a mismatch fails the build.

**Reference-satisfiability gate.** Every graded input must be one the reference
solution passes under the shipped comparison code. An input the reference cannot
satisfy is excluded **only if the problem's own contract also rejects it**
(`prompt + contract + canonical_solution` executed with that input — EvalPlus's
own validity predicate, `evalplus/gen/type_mut.py` → `trusted_check_exec`);
otherwise the build fails loudly rather than hiding a harness bug.

In EvalPlus v0.1.10 exactly one problem trips this gate:

```
HumanEval/32: excluded 8 input(s): plus[119], plus[163], plus[177], plus[185],
              plus[399], plus[650], plus[694], plus[780]
```

Why they are defective: the plus inputs for `find_zero` include polynomials whose
coefficients are ~1e9 (e.g. `[-1663750000, 10, 10, -1663750001, ...]`). There,
`|poly(xs, x)|` is ~1e20 near the root and changes by ~1e13 per unit change in
`x`, so the oracle's absolute tolerance of `1e-4` is unattainable in `float64`
for *any* `x` (the ulp of the polynomial value near the root is ~1e3). The
dataset's own contract for the problem rejects these inputs — it asserts
`abs(poly(xs, x)) < 1e-5` after its Newton iteration — so they are defective data
rather than a grading case.

Independently confirmed two ways, on the unmodified v0.1.10 file:

- upstream's own comparison code, executed verbatim (with the POSIX-only
  per-test `SIGALRM` timer replaced by a no-op, which cannot change any
  comparison), reports **fail** for the reference solution on HumanEval/32's plus
  suite with exactly the failing indices `[119, 163, 177, 185, 399, 650, 694, 780]`
  — while HumanEval/0, /8, /15, /83 and /111 come back `pass` with no failures;
- evaluating the problem's contract directly marks the same 8 inputs invalid
  (`contract violations ⊇ oracle failures`), and no oracle failure is contract-valid.

Consequence: this pack grades 780 of HumanEval/32's 788 plus inputs, and the
reference baseline is self-consistent (see §8). Without the exclusion every
submission — including the reference — would fail HumanEval/32, which would make
the pack's own selftest impossible by construction. The exclusion is recorded per
problem (`excluded_inputs` in the record, `excludedInputs` in the manifest) and
totals **8 of 122,683 inputs (0.007%)**.

---

## 6. Deviations from upstream, in one list

Kept identical by design (for comparability with the HumanEval-164 pack):

1. **Chat prompt instead of raw completion.** Same system/user wrapper as
   `humaneval-164`; upstream requests a raw completion of the prompt. The model
   sees no test suite, no `plus_input`, and no reference solution.
2. **One sample per problem (pass@1 only).** No pass@10/pass@100 estimator, no
   repeated sampling.
3. **Extraction** strips a markdown fence (first block) and truncates at the
   first column-0 executed statement, exactly as `humaneval-164` does. Upstream's
   optional tree-sitter `sanitize` step is **not** applied.

Different from upstream, with reasons:

4. **Precomputed expectations** vendored at build time (§5) instead of computed
   on first use and pickled into a cache directory.
5. **Two suites, sequential:** the plus suite is skipped when the base suite
   already failed, since the combined verdict cannot change. Upstream executes
   both suites regardless.
6. **`PYTHONHASHSEED=0`** is pinned in the harness environment so that iteration
   order (e.g. `list(set(...))` in a submission) is reproducible between the
   build-time expectations and grading. Upstream does not pin it.
7. **Windows adaptations:** per-test timeouts use a watchdog thread injecting
   `TimeoutException` via `PyThreadState_SetAsyncExc` (there is no
   `signal.setitimer`/`SIGALRM` on Windows); the outer kill is a Node-side
   wall-clock cap on the process tree instead of `multiprocessing` + `terminate`;
   no memory cap is possible (`resource` is POSIX-only, and upstream's
   `RLIMIT_AS` path is a no-op on Windows too).
8. **Bounded failure detail** (300-character excerpts) instead of storing the
   full failing input in the result.
9. **A 90-second per-problem wall-clock cap** as a backstop above the harness's
   own ~61-second global deadline (upstream's outer timeout is derived from the
   per-test limits).
10. **The 8-input exclusion in HumanEval/32** (§5).
11. **`numpy` fallback** for `np.allclose` when the interpreter lacks numpy.

Known limitations:

- The failing-input excerpts are truncated, so a submission that fails on a huge
  input cannot be replayed from the log alone; the raw log keeps the completion
  and the verdict, not the whole test case.
- The pack ships ~282 MiB of test data (mostly expectations for problems whose
  reference return values are megabytes long — `HumanEval/15`'s record alone is
  140.6 MiB and `HumanEval/139`'s is 4.2 MiB, against a 0.1 MiB median). A single
  problem's record is read per scenario; the two largest cost ~0.3 s to load and
  a few hundred MB of peak RSS while the harness holds the expectation, which is
  inherent to grading those problems faithfully.
- Grading is `pass@1` on one sample per problem; sampling variance between runs
  is not measured.

---

## Transport

Requests are made with `stream: true` (sampling defaults, declared in
`benchlocal.pack.json`: `temperature` 0, `max_tokens` 65536, a 3600-second
request timeout) and the Server-Sent Events reply is accumulated client-side.
Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s
response-headers timeout that pack code cannot raise, and non-streaming
OpenAI-compatible servers (llama.cpp among them) do not send headers until
generation finishes — generations needing more than ~5 minutes would otherwise
fail with `fetch failed` regardless of the configured `request_timeout_seconds`.
With streaming, headers arrive immediately and the pack's own timeout (default
900 s) plus the caller's abort signal are the only limits. A non-SSE
`application/json` response is still accepted as a fallback for servers or
proxies that buffer the stream; the mock server exercises both behaviours
(`--json-only` switches it to the non-streaming reply).

---

## 7. Self-consistency checks that run in the build

`npm run build:dataset` fails unless all of the following hold:

- 164 records, `task_id == "HumanEval/<index>"`, all required fields present;
- the vendored source's sha256 is recorded in `data/manifest.json`;
- **decoder round-trip:** every stored expectation decodes (with the shipped
  decoder) to the same value *and the same type* as the reference produced;
- **reference-satisfiability:** the reference solution passes the graded
  predicate on every graded input, and any input it cannot pass is also rejected
  by the problem's own contract;
- the manifest's problem file list, counts and exclusion bookkeeping match the
  files on disk (also re-checked by `scripts/pack-artifact.mjs`).

---

## 8. Verification ladder (what was run, and what it printed)

1. **Build.** `npm run build` and `npm run typecheck` — both clean.
   `build:dataset`: `built 164 problem files in 42.1s`, `base tests: 1570 |
   plus tests: 122675`, `excluded inputs: 8`, `data/problems: 282.1 MiB`.

2. **Selftest — every reference solution through the shipped pipeline**
   (`npm run selftest`, which compiles and runs `cli/selftest.ts`):

   ```
   canonical: 164/164 passed, 0 failed
   control 1/2 wrong-solution: OK - status=fail base=fail plus=skipped kind=wrong_answer (150ms)
   control 2/2 infinite-loop: OK - status=fail base=timeout plus=skipped kind=timeout (4168ms)
   SELFTEST PASS: 164/164 canonical
   ```

   (Total wall clock 68.9 s for 164 reference solutions through the full
   pipeline, i.e. ~0.4 s per problem including the Python interpreter spawn.)

   The infinite-loop control is stopped by the per-test watchdog (4 s floor), the
   wrong-solution control fails as a *graded* wrong answer with no harness error.

3. **Model-layer fixtures** (`node scripts/check-model-layer.mjs`): 8 extraction
   fixtures (bare continuation, fenced block, prose + fence, prompt echo,
   top-level-statement truncation ×2, inert trailing `def`, empty) plus the
   prompt-wrapper assertion (`buildMessages`) — `MODEL LAYER PASS (8 fixtures)`.

4. **End-to-end with a mock endpoint** (`scripts/mock-server.mjs` on port 8107,
   serving the reference solutions with four different reply formats — bare body,
   fenced block, prose + fenced block, full function echo):

   ```
   Summary: pass@1 164/164 (100%)
   Score: pass@1: 164/164 (100.0%) - 100 points.
   Harness errors: 0
   ```

   66 s wall clock, 164 model requests served (each request is made with
   `stream: true` and answered as an SSE stream), 0 transport or harness
   failures. This exercises prompt building, extraction, execution and scoring
   exactly as the app does. A `--json-only` spot run over the four reply
   variants (`--ids 0,1,2,3`) covers the non-SSE fallback path and prints
   `pass@1: 4/4 (100.0%) - 100 points.`

5. **Negative end-to-end** (same mock in `--wrong` mode): `pass@1: 0/164 (0.0%) -
   0 points.`, all 164 failures classified as wrong answers, 0 harness errors and
   no tracebacks or temp paths in any result.

6. **Pack probe** (`npm run check:pack`, 20 checks, all green) — loads the
   shipped `dist/benchlocal/index.js` adapter and exercises what the host calls:
   manifest present and free of a `repository` URL, `listScenarios()` returning
   164 well-formed cards, `scoreModelResults()` producing the exact house line,
   the data files resolving relative to the compiled lib, the largest records
   parsing, the graded totals matching the manifest, and the two entry-point
   hazards above (`median/add/search/digits` collisions, body-less submission).

7. **Per-problem spot checks** on the awkward cases: `HumanEval/15` (expectations
   ~141 MiB of strings), `HumanEval/83` (multi-million-bit integers),
   `HumanEval/8` (tuple expectations), `HumanEval/111` (dict expectations),
   `HumanEval/2`, `/4`, `/32` (non-zero `atol`), `/38`, `/50`, `/53` (tests that
   import `random`, the Windows guard's regression case), `/130`, `/136`, `/139`.

8. **Upstream comparison.** EvalPlus's `unsafe_execute` executed verbatim on this
   data agrees with the shipped harness on the problems above, including the
   shortfall in `HumanEval/32` (§5).

---

## 9. Reproducing

```bash
npm install
npm run build:dataset      # recomputes expectations from data/source/ (needs py -3)
npm run build
npm run check:pack
node scripts/check-model-layer.mjs   # prompt/extraction fixtures (after build:cli)
npm run selftest
npm run mock               # terminal 1: mock endpoint on 127.0.0.1:8107
node dist-cli/cli/run.js --base-url http://127.0.0.1:8107/v1 --model mock
npm run pack               # results/humaneval-plus-164-1.0.1.tar.gz + sha256
```

The dataset build prints the source sha256 it consumed and the exclusions it
applied, so a rebuild on another machine is directly comparable.
