# HumanEval-164

A BenchLocal bench pack for OpenAI HumanEval: 164 hand-written Python problems, scored by real execution (pass@1). Runs with a local Python interpreter — no Docker or verifier container required.

HumanEval-164 sends each of the 164 HumanEval problems (Chen et al., 2021 — arXiv:2107.03374) to an OpenAI-compatible chat endpoint, executes the returned Python against the problem's own tests with a local Python 3.8+ interpreter, and reports pass@1 = problems passed / 164. The problem set is compiled into the pack from a vendored copy of the openai/human-eval dataset (MIT license).

Companion documents:

- [METHODOLOGY.md](METHODOLOGY.md) — execution model, prompting and extraction rules, scoring, deviations from the canonical harness, trust model.
- [INSTALL.md](INSTALL.md) — installation instructions.
- [NOTICE](NOTICE) — upstream attribution.

## What the pack contains

- The complete HumanEval problem set: 164 scenarios (one per problem), grouped in the `HumanEval (pass@1)` category.
- Real execution: every submission runs as a local Python subprocess against the problem's `check()` tests; results are pass/fail per problem.
- pass@1 scoring per model, with per-problem failure excerpts.
- A standalone CLI runner and an offline mock server for exercising the pipeline without BenchLocal.

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an OpenAI-compatible inference endpoint configured. The pack uses the `inferenceEndpoints` host feature.
- **Python 3.8 or newer.** The pack resolves an interpreter in this order: `HUMANEVAL164_PYTHON` (explicit override, if set), `py -3` (the Windows launcher), `python`, `python3`. Candidates are validated by running them; the Microsoft Store placeholder is rejected. If no suitable interpreter is found, the pack reports: `Python 3.8+ not found. Install Python or set HUMANEVAL164_PYTHON to its path.`
- **Node.js** only for the CLI runner and source builds.

### No Docker required

The benchmark runs entirely on the host. Each submission is written to a per-problem temporary directory and executed as a local Python subprocess with a wall-clock cap; no container or verifier image is involved.

Container-based verifiers exist in BenchLocal for packs whose checks need a Linux environment. The official CLI-40 and BugFind-15 execution packs, for example, exercise Linux shell behavior and therefore run their checks in Linux containers. HumanEval's checks are pure Python, so a container would add a Linux dependency without changing how the benchmark is evaluated.

The execution reliability guard (adapted from openai/human-eval) is not a security sandbox and not a security boundary of any kind; see [METHODOLOGY.md](METHODOLOGY.md) for the exact mechanism and the trust model.

## Install

BenchLocal installs third-party packs from a packaged archive through the app's pack installation flow. This repository produces that archive with `scripts/pack-artifact.mjs` (output: `results/humaneval-164-1.0.2.tar.gz`). See [INSTALL.md](INSTALL.md) for the exact steps supported by the current BenchLocal release.

## Usage

### In BenchLocal

1. Install the pack (see [INSTALL.md](INSTALL.md)).
2. Configure an OpenAI-compatible inference endpoint (base URL, model name, and an API key if the endpoint requires one).
3. Run the pack. It exposes 164 scenarios — one per problem. For each scenario the pack requests one chat completion, extracts the code, executes it with the resolved Python interpreter, and records the result.
4. Read the results: pass/fail per problem with a failure excerpt, aggregated as pass@1 (see Scoring below).

Default sampling for the pack is declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 16384, request timeout 900 s. Model requests use `stream: true` with client-side SSE accumulation — a plain JSON response is still accepted as a fallback for servers that buffer the stream (see [METHODOLOGY.md](METHODOLOGY.md)). Heavy reasoners can still exhaust the budget — raise `max_tokens` in the run tab when results say `empty completion` or `completion truncated`.

### CLI runner

The CLI runner executes the same pipeline as the pack (same prompts, extraction, execution and scoring) against any OpenAI-compatible endpoint.

Build it once with `npm run build:cli` (output in `dist-cli/`), then:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name>
```

More examples:

```sh
# First 8 problems
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 8

# Specific problems, with JSON results written to results/run.json
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --ids 0,1,2 --out results/run.json

# Endpoint that requires a bearer token
node dist-cli/cli/run.js --base-url https://api.example.invalid/v1 --model <name> --api-key <key>
```

Options: `--limit N`, `--ids a,b,c` (indices or `HumanEval/N`), `--python PATH`, `--out PATH`, `--exec-timeout-ms N`, `--temperature F`, `--top-p F`, `--max-tokens N`, `--timeout-ms N`, `--api-key KEY`. Run with `--help` for the full list.

The runner prints one line per problem and a final `Summary: pass@1 <passed>/<total> (<x>%)` line.

### Mock server

For end-to-end checks without a model endpoint, `scripts/mock-server.mjs` is a minimal OpenAI-compatible chat server that replays the canonical solutions in several formatting variants (bare body, fenced block, prose plus fenced block, full function redefinition):

```sh
npm run build:cli                  # the mock reads the compiled dataset modules
node scripts/mock-server.mjs       # serves on http://127.0.0.1:8099
node dist-cli/cli/run.js --base-url http://127.0.0.1:8099/v1 --model mock
```

Use `--port N`, `--delay-ms N` and `--chunk-delay-ms N` to change the port or add latency between streamed chunks; `--wrong` and `--empty` answer with wrong or empty completions, and `--json-only` answers stream requests with a single JSON body (exercising the non-SSE fallback). A full run exercises the complete request → extraction → execution → scoring path.

## Scoring

- pass@1 = problems passed / 164. The run score is this value as **points out of 100** (the percentage rounded to the nearest integer). A problem passes when its check program exits with status 0 — that is, the problem's `check()` tests completed without an assertion failure.
- One completion per problem is evaluated per run.
- Each problem ends in one of four execution states:
  - `passed` — exit code 0;
  - `failed` — non-zero exit (assertion error, exception, syntax error, ...);
  - `timed_out` — the execution cap (default 5000 ms, spawn to close) was exceeded; the process tree is killed;
  - `spawn_error` — Python could not be spawned or the execution harness could not start.

  `timed_out` and `spawn_error` count as failures.
- Failures include an excerpt: the last meaningful line of the program's stderr appears in the result summary, and up to the last 4000 characters of stderr plus the extracted completion are kept in the raw per-problem log.
- Model-call errors (endpoint unreachable, HTTP error, malformed response) are recorded per problem as provider errors flagged retryable, and score 0. They are reported, not silently skipped; a run that produced provider errors is not a clean pass@1 measurement for that model.
- The aggregate is reported as `pass@1: <passed>/<total> (<x>%)`.

Because prompting and the execution cap differ from the canonical harness, scores from this pack are not directly comparable to raw-completion numbers reported elsewhere for HumanEval. The deviations are listed in [METHODOLOGY.md](METHODOLOGY.md).

## Repository layout

| Path | Contents |
| --- | --- |
| `benchlocal/index.ts` | Pack entry point (`defineBenchPack`): scenario listing, per-scenario run, score aggregation. |
| `lib/` | Core pipeline: types, Python resolution, execution, prompting, extraction, model client, orchestration, scoring. |
| `lib/generated/` | Generated dataset modules (`problems.ts`, `canonical.ts`); headers record the dataset SHA-256. |
| `cli/` | `run.ts` (CLI runner) and `selftest.ts` (acceptance self-test). |
| `scripts/` | `generate-dataset.mjs`, `mock-server.mjs`, `pack-artifact.mjs` (pack archive), `check-model-layer.mjs` (prompt/extraction fixtures). |
| `data/` | `HumanEval.jsonl.gz` (vendored) and `LICENSE-human-eval` (upstream MIT copy). |
| `dist/` | Pack build output for BenchLocal (`tsconfig.benchlocal.json`). |
| `dist-cli/` | CLI build output (`tsconfig.cli.json`). |
| `dist-engine/` | Execution-pipeline build output used by the self-test loop (`tsconfig.engine.json`). |
| `results/` | Build artifacts (e.g. the packaged archive); git-ignored. |
| `_reference/` | Development reference material; not shipped in the pack archive. |
| root | `benchlocal.pack.json` (manifest), `package.json`, `tsconfig*.json`, `INSTALL.md`, `README.md`, `METHODOLOGY.md`, `LICENSE`, `NOTICE`. |

## Development

```sh
npm install

npm run build:dataset     # regenerate lib/generated/* from data/HumanEval.jsonl.gz (deterministic)
npm run build:benchlocal  # compile the pack to dist/ (tsconfig.benchlocal.json)
npm run build:cli         # compile the CLI runner to dist-cli/ (tsconfig.cli.json)
npm run build             # both builds
npm run typecheck         # tsc --noEmit across the repo
npm run selftest          # build the CLI, then run the acceptance self-test
npm run probe             # load dist/ the way the host does; sanity-check scenarios + scoring
```

`npm run selftest` runs all 164 canonical solutions through the same executor the pack uses, then 3 negative controls; a passing run ends with `SELFTEST PASS: 164/164 canonical, 3/3 controls`. What each control checks is documented in [METHODOLOGY.md](METHODOLOGY.md).

For a smaller build containing only the execution pipeline and the self-test, compile `tsconfig.engine.json` (output: `dist-engine/`).

## License and attribution

MIT license — see [LICENSE](LICENSE). Copyright © 2026 TokenTinkerer.

HumanEval data and the execution reliability guard are derived from [openai/human-eval](https://github.com/openai/human-eval) (MIT, Copyright (c) OpenAI); see [NOTICE](NOTICE) and the bundled upstream license copy at `data/LICENSE-human-eval`.
