# Methodology

This document describes how LiveCodeBench-v6 evaluates models: the benchmark provenance, the dataset transform, the grading semantics (including the Windows adaptations), prompting and extraction rules, the scoring, reproducibility, and the trust model.

## Benchmark provenance

LiveCodeBench (Naman Jain et al., "LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code", arXiv:2403.07974) is a continuously maintained code-generation benchmark whose problems are collected from live programming-contest sites with release-date windows, which is what makes it contamination-resistant.

This pack evaluates **release_v6**: the six official data files `test.jsonl` … `test6.jsonl` from the `livecodebench/code_generation_lite` dataset — 1055 code-generation problems in total (per file: 400 / 111 / 101 / 101 / 167 / 175):

- platforms: AtCoder 602, LeetCode 444, Codeforces 9;
- formats: 611 stdin/stdout problems, 444 LeetCode-style call-based problems (`Solution.<fn_name>`);
- each problem ships public test cases (plaintext) and private test cases (zlib+base64-wrapped pickle of a JSON string — the official "encrypted" form, kept exactly as published).

The vendored files live under `data/problems/<question_id>.json` (record fields verbatim; the private test blob untouched). `data/manifest.json` records per-source-file SHA-256, line counts, and per-problem metadata (platform, difficulty, contest date, `fn_name`, public-test count, record size). A copy of the upstream MIT license is kept at `data/LICENSE-livecodebench`.

`npm run build:dataset -- --src <dir>` performs the split from a local copy of the official files (fetch with `hf download livecodebench/code_generation_lite --repo-type dataset --local-dir <dir>`). The transform is deterministic and validates: 1055 records exactly, unique well-formed ids, JSON-parseable records. The heavy fields are never duplicated or transformed — the split is a verbatim re-serialization per record.

## Grading semantics

Grading mirrors `lcb_runner`'s code-generation evaluation (`lcb_runner/evaluation/testing_util.py` and `lcb_runner/benchmarks/code_generation.py` — MIT, LiveCodeBench). One Python subprocess per problem (`harness/run_problem.py`):

1. **Test assembly.** The problem's public tests are parsed; the private blob is decrypted exactly like upstream (`json.loads`, falling back to `pickle.loads(zlib.decompress(base64.b64decode(blob)))`); the two lists are concatenated (public first) into `inputs`/`outputs`. The function name comes from `metadata.func_name`; its absence selects the stdin path.
2. **stdin/stdout path.** The code passes through `clean_if_name` (unwrap `if __name__ == "__main__":` blocks) and `make_function` (hoist imports, wrap all remaining statements in `wrapped_function()`), then executes. Each test runs under a mocked stdin (with `.buffer` support), mocked `open()`, and captured stdout. Comparison: both outputs are stripped by line; line counts must match; each line must match exactly, or — both lines entirely parseable as whitespace-separated `Decimal`s — numerically. Otherwise `Wrong Answer`.
3. **call-based path.** The code (preceded by upstream's `import_string` preamble and `sys.setrecursionlimit(50000)`) is executed; if it contains `class Solution`, the instance is used, otherwise the module itself; the `fn_name` attribute is looked up. Each test's input string is split into lines and each line `json.loads`-parsed into call arguments; the return value (tuples converted to lists) is compared with `==` against the parsed expected output. There is deliberately no numeric tolerance on this path — upstream behavior.
4. **Verdicts.** Per test: `True`, or `-2` wrong answer, `-3` time limit exceeded, `-4` runtime error, `-1` global timeout. A problem **passes only when every test passes**. Failures stop at the first failing test; the problem then records how many tests had passed and the failure detail (statement excerpt, expected vs got, error repr — truncated to 300 chars like upstream).
5. **Limits.** Each test runs under a per-test watchdog (default 6 s, upstream's `timeout=6`). A soft global deadline `(per_test + 1) × n_tests + 5 s` mirrors upstream's outer process-join formula; tripping it records `-1 global timeout` for the remaining tests. The pack additionally enforces a wall-clock cap on the whole subprocess (default 300 s, CLI-configurable) and kills the process tree on expiry.
6. **Reliability guard.** Adapted from upstream: `builtins.quit`/`help` disabled; destructive `os` functions (kill/system/putenv, the remove/rmdir family, fork/forkpty/killpg, rename family, chmod/chown family, chroot, getcwd/chdir) disabled; `shutil.rmtree/move/chown` and `subprocess.Popen` disabled; `ipdb`, `joblib`, `resource`, `psutil`, `tkinter` blocked; `faulthandler` disabled; `OMP_NUM_THREADS=1`. It is a reliability measure, not a sandbox.

### Windows adaptations (documented deviations)

The canonical harness is Linux-oriented. Two adaptations are required on Windows; both preserve verdict semantics:

1. **Per-test timeouts without `signal.alarm`** (SIGALRM does not exist on Windows). The harness starts a watchdog thread per test that injects a `TimeoutException` into the main thread via `ctypes.pythonapi.PyThreadState_SetAsyncExc` after the timeout. Like SIGALRM, the exception is delivered at the next bytecode boundary — an infinite loop is stopped at the limit; a hang inside a single long-running C call is delivered once control returns. A C-level hang that never returns is bounded by the wall-clock cap above (which the canonical runner also has, in the form of its process join). Both proof runners (3.13 / 3.14) show `while True: pass` stopped at exactly 6.0 s and recorded as TLE.
2. **The reliability guard's `hasattr` fix.** Upstream disables names by unconditional assignment (`os.fork = None`). On Windows, `os.fork` does not exist, so the assignment creates the attribute; CPython's `random` module then calls the likewise non-existent `os.register_at_fork` and `import random` fails — problems whose tests or preamble import `random` would fail spuriously. The guard disables a name only if the platform actually has it (same fix as HumanEval-164).

**No memory cap is applied** (upstream applies POSIX `resource` limits only in some paths; Windows has no equivalent), and the subprocess is not a sandbox: model code runs as the current user with the same filesystem/network access, bounded by the guards and timeouts above.

## Prompting protocol

The pack replicates the official OpenAI-chat prompt template verbatim (`lcb_runner/prompts/code_generation.py`):

System message:

```
You are an expert Python programmer. You will be given a question (problem specification) and will generate a correct Python program that matches the specification and passes all tests.
```

User message (starter-code problems):

```
### Question:
<question content>

### Format: You will use the following starter code to write the solution to the problem and enclose your code within delimiters.
```python
<starter code>
```

### Answer: (use the provided format with backticks)

```

For stdin problems the Format line reads "Read the inputs from stdin solve the problem and write the answer to stdout (do not directly test on the sample inputs). Enclose your code within delimiters as follows. Ensure that when the python program runs, it reads the inputs, runs the algorithm and writes output to STDOUT." and the block contains `# YOUR CODE HERE`.

Requests go to `<baseUrl>/chat/completions` over the streaming transport (see below); bearer token only when configured. Defaults: `temperature` 0 (single sample per problem), `max_tokens` 16384, request timeout 900 s. When the response is truncated (`finish_reason: "length"`), failure summaries say so and point at `max_tokens`.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — reasoning answers needing more than ~5 minutes of generation would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 900 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply, and `--chunk-delay-ms N` paces the SSE chunks for transport testing).

## Code extraction

Exactly the official chat-model rule (`extract_code` in `lcb_runner/utils/extraction_utils.py`): every line containing ``` is a fence line; fewer than two fence lines means **no code** (the problem scores 0 with the explicit summary "no code block found in response"); otherwise the content between the **last two** fence lines is the submission. There is no fence-less fallback and no trimming beyond what the rule produces. Extraction notes and the raw response are kept in the per-problem log.

## Scoring

- pass@1 = problems passed / problems run (one sample per problem). The run score is this percentage rounded to the nearest integer — **points out of 100**. Summary: `pass@1: <passed>/<total> (<x>%) - <points> points.`
- The results card additionally breaks pass@1 down per platform (atcoder / codeforces / leetcode) with problem counts as weights; the headline remains the overall pass@1.
- Each problem's `points` value is 1 (`1 / 1` in the detail view when passed).
- Provider errors (endpoint unreachable/non-OK/malformed) are recorded per problem with the retryable flag and score 0; a run containing them is not a clean measurement. Harness/spawn problems are recorded as execution errors, likewise retryable.

## Reproducibility

- `npm run check:extraction` — 28 deterministic checks: 12 extraction fixtures (official last-fence rule, no-fence and empty-block cases, CRLF normalisation, fence-in-code-string edge), prompt template assertions (system text, both format branches, block contents, answer suffix), and manifest integrity (1055 problems, unique ids, source sha256s, platform and call-based counts).
- `npm run selftest` — six cases through the exact execution path the pack uses, on two fixture problems (`abc387_b` stdin, `3704` call-based, full records with encrypted private tests): correct solution → pass; wrong solution → wrong-answer failure; infinite loop → TLE at the per-test limit. Passing output: `SELFTEST PASS: 6/6 cases (grading semantics verified)`.
- Mock end-to-end: `scripts/mock-server.mjs` answers the two fixture problems correctly — a CLI run over them must end `2/2 (100%)` — and `--wrong` / `--empty` produce clean wrong-answer and no-fence failures (no harness errors). All mock modes run through the server's SSE streaming path; `--json-only` additionally covers the client's non-SSE JSON fallback. An end-to-end run over the largest vendored record (`abc367_f`, 88.5 MB, 27 tests including multi-MB inputs) completes through decrypt → grading in under two seconds on the development machine.
- Real-model sample: a 4-problem run (2785, abc387_b, 3704, 1873_A) against a local 35B-class reasoning model (llama.cpp, temperature 0, 8192-token budget) scored pass@1 3/4 — the three that fit the budget passed with all their tests (15/15, 43/43, 34/34); the single miss was a mid-reasoning budget truncation, correctly reported as such by the failure summary. Re-running that problem with `--max-tokens 16384` (now the pack default) passed all 5 of its tests (4/4 across the two runs at adequate budget). Per-problem wall time (generation + grading) was 45–237 s.

## Deviations from the official leaderboard setup

1. **Single sample at temperature 0** (leaderboard: multiple samples at elevated temperature, majority/pass@k aggregates). Same metric, n = 1 — absolute numbers are not expected to match multi-sample leaderboard runs.
2. **Windows timeouts via the watchdog** (see above) — verdicts are equivalent; delivery timing differs only for hangs inside single long C calls.
3. **Wall-clock cap per problem** added as a safety net; the canonical runner's closest equivalent is its outer process-join timeout.
4. **Prompt and extraction are the official ones** — unlike the HumanEval-164 pack, no chat-format interpretation is needed beyond upstream's own chat template.

## Why this pack has no Docker verifier

The official LiveCodeBench harness evaluates submissions by executing them in a guarded local Python process; its containers exist to package Python and the dataset, not because containerization is part of the grading semantics. This pack mirrors the official execution model directly — a local Python subprocess per problem with the guard, per-test watchdogs, and wall-clock caps — so it declares `"verification": false` and needs no Docker.

The trade-off is the same one documented for HumanEval-164: without a container there is no isolation boundary around executed code. The reliability guard reduces the chance that ordinary code interferes with the harness; it does not constrain deliberately malicious code. Evaluate untrusted models in a disposable environment.
