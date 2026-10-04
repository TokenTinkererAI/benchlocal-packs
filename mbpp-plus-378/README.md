# MBPP+-378

A BenchLocal bench pack for **EvalPlus MBPP+**: 378 Python programming problems (Google Research's sanitized MBPP, extended by EvalPlus) graded by **executing** each submission against the problem's full **base + plus input suites** — 1,174 base inputs and 39,841 generated plus inputs (41,015 graded calls) — using EvalPlus's own output-comparison semantics. Execution happens through a local Python interpreter; **no Docker or verifier container is required**.

The pack sends each problem to an OpenAI-compatible chat endpoint (MBPP task text, zero-shot, fenced-code answer), extracts the code, and grades it with a Python harness that mirrors `evalplus/eval/__init__.py` test by test: `exec` the submission, call the entry point once per input, compare with exact `==` first, apply EvalPlus's MBPP special oracles (`MBPP_OUTPUT_SET_EQ_TASKS`, `MBPP_OUTPUT_NOT_NONE_TASKS`, `surface_Area`, `digit_distance_nums`, ...), escalate `atol` to 1e-6 for float outputs, and fall back to an `np.allclose`-equivalent comparison with `rtol=1e-07`. A problem counts only when **every** base and plus input passes.

Companion documents:

- [METHODOLOGY.md](METHODOLOGY.md) — dataset provenance, execution model, grading semantics, prompting/extraction, timeouts, scoring, deviations, trust model.
- [INSTALL.md](INSTALL.md) — installation instructions.
- [NOTICE](NOTICE) — upstream attribution (MBPP / Google Research, EvalPlus; both Apache-2.0).

## What the pack contains

- All 378 MBPP+ problems (`Mbpp/2` … `Mbpp/809`), one scenario each.
- Both input suites per problem, with the **expected outputs vendored at build time** by running each canonical solution exactly the way EvalPlus builds its ground truth (see METHODOLOGY.md §3).
- EvalPlus's comparison semantics, including the MBPP special oracles and the float-tolerance escalation.
- Per-problem failure detail (first failing input + the exception: wrong answer, runtime error, timeout).
- A standalone CLI runner, an offline mock server, an extraction fixture suite, a scoring check, and a self-test that runs **all 378 canonical solutions** through the shipped pipeline.

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an OpenAI-compatible inference endpoint configured. The pack uses the `inferenceEndpoints` host feature.
- **Python 3.9 or newer.** Resolution order: `MBPP378_PYTHON` (explicit override, if set), `py -3` (the Windows launcher), `python`, `python3` — each candidate is validated by running it.
- **No third-party Python packages** (the harness is stdlib-only, including a pure-Python `allclose` mirror).
- **Node.js** only for the CLI runner and source builds.
- Disk: the vendored dataset is ~7 MB.

### No Docker required

The canonical EvalPlus harness evaluates submissions by executing them in a guarded local Python process; its container images exist to package Python + the dataset, not because containers are part of the evaluation semantics. This pack keeps the same trust model as the canonical harness: model code runs as an ordinary local subprocess under a reliability guard plus per-input and wall-clock limits — **not in a security sandbox**. Evaluate untrusted models only in a disposable environment.

## Install

This repository is a custom BenchLocal bench pack — it needs no Docker and is not part of the official registry. Install it by registering this folder as a **local source** in the app; see [INSTALL.md](INSTALL.md) for the exact `config.toml` block.

## Usage

### In BenchLocal

1. Install the pack (see [INSTALL.md](INSTALL.md)).
2. Configure an OpenAI-compatible inference endpoint.
3. Run the pack. It exposes 378 scenarios — one per problem. For each, the pack requests one chat completion at temperature 0, extracts the code block, and grades it locally against the base + plus suites.
4. Read the results: pass/fail per problem with the first failing input, aggregated as pass@1 in points out of 100.

Default sampling is declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 16384, request timeout 900 s (model requests are streamed — see [METHODOLOGY.md](METHODOLOGY.md) §Transport). Per-problem grading caps: 4 s per input (watchdog, EvalPlus's `min_time_limit`), ~60 s per suite, **300 s wall clock per problem**; the CLI can lower the outer cap with `--exec-timeout-ms`.

### CLI runner

Build once with `npm run build:cli` (output in `dist-cli/`), then:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name>
```

Examples:

```sh
# Four specific problems, results to JSON
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --ids Mbpp/2,Mbpp/3,Mbpp/255 --out results/run.json

# First 20 problems in manifest order
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 20

# Endpoint that requires a bearer token
node dist-cli/cli/run.js --base-url https://api.example.invalid/v1 --model <name> --api-key <key>
```

Options: `--ids Mbpp/2,Mbpp/3`, `--limit N`, `--out PATH`, `--temperature F`, `--top-p F`, `--max-tokens N`, `--timeout-ms N`, `--exec-timeout-ms N`, `--api-key KEY`. Run with `--help` for the full list. Every per-problem record in the results file keeps the extracted submission, so a graded string can always be re-inspected.

### Mock server

For end-to-end checks without a model, `scripts/mock-server.mjs` answers every problem with its canonical solution inside a fenced code block (so a full run must score 100 points):

```sh
npm run build:cli
node scripts/mock-server.mjs                      # serves on http://127.0.0.1:8105
node dist-cli/cli/run.js --base-url http://127.0.0.1:8105/v1 --model mock
```

`--wrong` answers every problem with `def <entry>(*args, **kwargs): return None` (clean grading failures), `--empty` answers with prose and no fenced block (extraction-failure path), and `--limit N` maps only the first N problems. Requests with `stream: true` are answered as `text/event-stream` (the reply is split into chunks with a final `finish_reason` chunk and `data: [DONE]`, like a real streaming server); `--json-only` ignores `stream` and replies with a single JSON body (the client's fallback path), and `--chunk-delay-ms N` inserts a delay before each SSE chunk.

### Self-test

`npm run selftest` runs **all 378 canonical solutions** through the exact execution path the pack uses (`dist-cli/lib/executor` → `harness/run_problem.py` → vendored inputs and expected outputs), then three controls. A passing run ends with:

```
SELFTEST PASS: 378/378 canonical, 3/3 controls
```

## Scoring

- pass@1 = problems passed / problems run (a problem passes only when both the base and the plus suite pass).
- The headline score is that percentage as **points out of 100** (rounded to the nearest integer); the summary reads `pass@1: <passed>/<total> (<x.y>%) - <points> points.`
- Every scenario carries `points: 1`, so a per-scenario card reads `1 / 1`.
- One category is reported: `MBPP+ (pass@1)`.
- Scores are from **one sample per problem at temperature 0**; EvalPlus leaderboard numbers use multiple samples, so absolute values are not directly comparable (single-sample pass@1 is the same metric with n = 1). Deviations are listed in [METHODOLOGY.md](METHODOLOGY.md) §10.

## Verification

The shipped checks and their expected results:

| Check | Command | Result |
| --- | --- | --- |
| Canonical solutions through the shipped pipeline | `npm run selftest` | `SELFTEST PASS: 378/378 canonical, 3/3 controls` |
| Full mock run (mock serves all 378 canonical solutions) | `node scripts/mock-server.mjs` + `node dist-cli/cli/run.js --base-url http://127.0.0.1:8105/v1 --model mock --out results/mock-run.json` | `Summary: pass@1 378/378 (100%)` → scored `pass@1: 378/378 (100.0%) - 100 points.` |
| `--wrong` mock variant (clean failures, no harness errors) | `node scripts/mock-server.mjs --wrong` + `... --limit 12 --out results/mock-wrong.json` | `Summary: pass@1 0/12 (0%)`, every line a graded failure (e.g. `base 0/3 (fail), plus 0/108 (fail) - failed on input #0 - AssertionError:`) |
| `--empty` mock variant (no fenced block) | `node scripts/mock-server.mjs --empty` + `... --limit 3` | `Summary: pass@1 0/3 (0%)` with `submission did not load (SyntaxError: ...) - the response contained no fenced code block (the prompt requires one)` |
| Extraction fixtures | `npm run check:extraction` | `EXTRACTION OK: 9/9 cases` |
| Scoring function | `npm run check:score -- results/mock-run.json` | `SCORE OK`, `[ok ] results/mock-run.json: 100 points \| pass@1: 378/378 (100.0%) - 100 points.` |
| Dataset build | `npm run build:dataset` | `total: 378 problems`, `tests: 1174 base + 39841 plus = 41015 inputs`, no oracle failures |
| Build + types | `npm run build`, `npm run typecheck` | clean |

Selected self-test control lines:

```
[ok ] wrong solution (similar_elements returns the union, not the intersection) -> failed (base 0/3:fail, plus 30/108:fail, 0.02s)
[ok ] wrong solution (is_not_prime always returns True) -> failed (base 3/5:fail, plus 88/103:fail, 0.02s)
[ok ] infinite loop (TLE control: watchdog + phase budget) -> failed (base 0/3:fail, plus 0/106:timeout, 8.05s)
```

The packaged artifact is `results/mbpp-plus-378-1.0.1.tar.gz` (398 members at the archive root — manifest, docs, `dist/`, `harness/`, `data/`); `npm run pack` prints its SHA-256 and verifies the layout, and the release loop writes the hash to `results/mbpp-plus-378-1.0.1.sha256.txt`.

## Repository layout

| Path | Contents |
| --- | --- |
| `benchlocal/index.ts` | Pack entry point (`defineBenchPack`): scenario listing, per-scenario run, score aggregation. |
| `lib/` | Core pipeline: types, dataset access, Python resolution, execution, prompting, extraction, model client, orchestration, scoring. |
| `harness/run_problem.py` | Python grading harness (EvalPlus semantics, Windows adaptations, expected-output codec). |
| `cli/` | `run.ts` (CLI runner), `selftest.ts` (378-problem + controls acceptance self-test). |
| `scripts/` | `build-dataset.mjs` (splitter + oracle driver), `compute-expected.py` (build-time ground truth), `mock-server.mjs`, `pack-artifact.mjs`, `check-extraction.mjs`, `check-score.mjs`. |
| `data/` | `manifest.json`, `problems/<task_id>.json` (378 records + `MbppPlus.jsonl.gz` source), vendored. |
| `dist/` | Pack build output for BenchLocal. |
| `dist-cli/` | CLI build output. |
| `results/` | Run outputs and the packaged archive; git-ignored. |
| `_reference/` | Development material (pack probe); not shipped. |

## Development

```sh
npm install

# fetch the official dataset first (it is also vendored under data/):
#   curl -sSL -o data/MbppPlus.jsonl.gz \
#     https://github.com/evalplus/mbppplus_release/releases/download/v0.2.0/MbppPlus.jsonl.gz
npm run build:dataset     # per-problem records + vendored expected outputs (deterministic)
npm run build             # compile pack + CLI
npm run typecheck
npm run selftest          # 378/378 canonical + 3 controls
npm run check:extraction  # extraction fixtures
npm run check:score       # scoring function
npm run pack              # results/mbpp-plus-378-1.0.1.tar.gz
```

## License and attribution

MIT license — see [LICENSE](LICENSE). Copyright © 2026 TokenTinkerer.

MBPP (Google Research) and EvalPlus are Apache-2.0 licensed works of their respective authors; the grading semantics in `harness/run_problem.py` are adapted from `evalplus/eval` (with documented Windows adaptations), the build-time oracle mirrors `evalplus/gen/util/trusted_exec` and `evalplus/data/mbpp.py`, and the vendored dataset is the official `MbppPlus.jsonl.gz` v0.2.0 release. See [NOTICE](NOTICE).
