# LiveCodeBench-v6

A BenchLocal bench pack for LiveCodeBench v6: 1055 contamination-checked code-generation problems (AtCoder 602 / LeetCode 444 / Codeforces 9), graded by running each submission against the problem's complete test set — public and hidden test cases, with the canonical LiveCodeBench test semantics. Execution happens through a local Python interpreter; no Docker or verifier container is required.

LiveCodeBench-v6 sends each problem to an OpenAI-compatible chat endpoint with the official prompt template, extracts the last fenced code block (the official extraction rule), and grades the submission with a Python harness that mirrors `lcb_runner`'s evaluation exactly — decryption of private tests, code wrapping, stdin/stdout patching, and the precise comparison rules — with one documented adaptation: per-test timeouts use a watchdog thread instead of `signal.alarm`, which does not exist on Windows.

Companion documents:

- [METHODOLOGY.md](METHODOLOGY.md) — dataset provenance, grading semantics, prompting and extraction rules, scoring, deviations, trust model.
- [INSTALL.md](INSTALL.md) — installation instructions.
- [NOTICE](NOTICE) — upstream attribution (LiveCodeBench, MIT).

## What the pack contains

- All 1055 release_v6 problems: one scenario each, grouped by platform (atcoder / codeforces / leetcode).
- Two grading paths, exactly as upstream: stdin/stdout problems (611) and LeetCode-style call-based problems (444, `Solution.<fn_name>`).
- Full test sets: every problem runs its public plus decrypted private test cases; a problem passes only when all tests pass.
- pass@1 scoring per model, with per-problem failure detail (wrong answer / time limit exceeded / runtime error / compile failure).
- A standalone CLI runner, an offline mock server, and a rebuildable self-test for the grading semantics.

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an OpenAI-compatible inference endpoint configured. The pack uses the `inferenceEndpoints` host feature.
- **Python 3.9 or newer.** Resolution order: `LCBV6_PYTHON` (explicit override, if set), `py -3` (the Windows launcher), `python`, `python3` — validated by running each candidate.
- **Node.js** only for the CLI runner and source builds.
- Disk: the dataset is ~4.2 GB (166 problems have multi-MB test sets; the largest is 88 MB).

### No Docker required

The canonical LiveCodeBench harness itself evaluates submissions by executing them in a guarded local Python process — its container images exist only to package Python + the dataset, not because containers are part of the evaluation semantics. This pack keeps the same trust model as the canonical harness and as [HumanEval-164](../humaneval-164): model code runs as an ordinary local subprocess under a reliability guard and per-test/timeout limits, **not in a security sandbox**. Evaluate untrusted models only in a disposable environment.

## Install

This repository is a custom BenchLocal bench pack — it needs no Docker and is not part of the official registry. Install it by registering this folder as a **local source** in the app; see [INSTALL.md](INSTALL.md) for the exact `config.toml` block.


**No prebuilt archive:** the ~3.1 GiB dataset exceeds GitHub's 2 GiB release-asset limit — build from source as described above.

## Usage

### In BenchLocal

1. Install the pack (see [INSTALL.md](INSTALL.md)).
2. Configure an OpenAI-compatible inference endpoint.
3. Run the pack. It exposes 1055 scenarios — one per problem. For each, the pack requests one chat completion, extracts the code, and grades it locally against the full test set.
4. Read the results: pass/fail per problem with failure detail, aggregated as pass@1 with a per-platform breakdown.

Default sampling is declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 16384, request timeout 900 s. Per-problem grading caps: 6 s per test case (watchdog), 300 s wall-clock per problem; both configurable in the CLI.

**Plan for the runtime.** A full 1055-problem run is a multi-hour job even for fast models (each problem = one generation + a full test-set grading; some problems carry very large test sets). Start with `--ids`/`--limit` subsets.

### CLI runner

Build once with `npm run build:cli` (output in `dist-cli/`), then:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name>
```

Examples:

```sh
# Four specific problems, results to JSON
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --ids abc387_b,3704,1873_A,2785 --out results/run.json

# First 20 problems in manifest order
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 20

# Slower machine / heavier problems
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --per-test-timeout-ms 12000 --exec-timeout-ms 600000

# Endpoint that requires a bearer token
node dist-cli/cli/run.js --base-url https://api.example.invalid/v1 --model <name> --api-key <key>
```

Options: `--ids a,b,c`, `--limit N`, `--out PATH`, `--temperature F`, `--top-p F`, `--max-tokens N`, `--timeout-ms N`, `--per-test-timeout-ms N`, `--exec-timeout-ms N`, `--api-key KEY`. Run with `--help` for the full list.

### Mock server

For end-to-end checks without a model, `scripts/mock-server.mjs` answers known problems correctly (`abc387_b`, `3704`), everything else with a valid-but-wrong block:

```sh
npm run build:cli
node scripts/mock-server.mjs                 # serves on http://127.0.0.1:8098
node dist-cli/cli/run.js --base-url http://127.0.0.1:8098/v1 --model mock --ids abc387_b,3704
```

`--wrong` answers everything wrongly, `--empty` answers with prose and no fenced block (extraction-failure path). Like llama.cpp, the mock answers `stream: true` requests as an SSE stream; `--json-only` makes it ignore `stream` and reply with a single JSON body instead (the client's fallback path), and `--chunk-delay-ms N` paces the SSE chunks for transport tests.

### Self-test

`npm run selftest` runs six cases through the exact execution path the pack uses — correct and wrong solutions plus an infinite loop on one stdin problem (`abc387_b`) and one call-based problem (`3704`); a passing run ends with `SELFTEST PASS: 6/6 cases (grading semantics verified)`.

## Scoring

- pass@1 = problems passed / problems run. The run score is this value as **points out of 100** (the percentage rounded to the nearest integer); the summary reads `pass@1: <passed>/<total> (<x>%) - <points> points.`
- A problem passes only when **all** of its test cases pass, using upstream's comparison rules (stripped lines, exact match with a Decimal fallback for float lines; LeetCode-style outputs compared as parsed JSON values).
- Failure detail per problem: `Wrong Answer on test N`, `Time Limit Exceeded on test N`, `Runtime Error on test N: <repr>`, compile/function-not-found failures, and `global timeout` when the cumulative wall-clock deadline trips.
- The results card breaks pass@1 down per platform (atcoder / codeforces / leetcode) with problem counts as weights. The headline score is the overall pass@1.
- Scores are from **one sample per problem at temperature 0** — the official leaderboard uses multiple samples; single-sample pass@1 is the same metric with n=1 but expect different absolute numbers from multi-sample leaderboard runs. Deviations are listed in [METHODOLOGY.md](METHODOLOGY.md).

## Repository layout

| Path | Contents |
| --- | --- |
| `benchlocal/index.ts` | Pack entry point (`defineBenchPack`): scenario listing, per-scenario run, score aggregation. |
| `lib/` | Core pipeline: types, dataset access, Python resolution, execution, prompting, extraction, model client, orchestration, scoring. |
| `harness/run_problem.py` | Python grading harness (upstream-mirrored semantics, Windows adaptations). |
| `cli/` | `run.ts` (CLI runner), `selftest.ts` (grading-semantics self-test). |
| `scripts/` | `build-dataset.mjs` (splitter), `mock-server.mjs`, `pack-artifact.mjs`, `check-extraction.mjs` (fixtures). |
| `data/` | `manifest.json`, `problems/<id>.json` (1055 records, vendored), `LICENSE-livecodebench`. |
| `dist/` | Pack build output for BenchLocal. |
| `dist-cli/` | CLI build output. |
| `results/` | Run outputs and the packaged archive; git-ignored. |
| `_reference/` | Development material (proof harness, fixtures); not shipped. |

## Development

```sh
npm install

# fetch the official dataset files first (e.g.):
#   hf download livecodebench/code_generation_lite --repo-type dataset --local-dir <dir>
npm run build:dataset -- --src <dir>   # split into data/problems/ + manifest (deterministic)
npm run build                          # compile pack + CLI
npm run typecheck
npm run selftest                       # 6/6 grading-semantics cases
npm run check:extraction               # fixture + prompt + manifest checks
```

## License and attribution

MIT license — see [LICENSE](LICENSE). Copyright © 2026 TokenTinkerer.

LiveCodeBench and its evaluation code are MIT-licensed work of the LiveCodeBench authors; the grading semantics in `harness/run_problem.py` are adapted from `lcb_runner` (with documented Windows adaptations), and the vendored dataset comes from `livecodebench/code_generation_lite` (release_v6). See [NOTICE](NOTICE).
