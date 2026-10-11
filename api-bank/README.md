# API-Bank

A BenchLocal bench pack for API-Bank: tool/API calling in three escalating levels — a single API call, retrieval-then-call, and multi-call planning — graded by matching the model's executed call sequence against the dataset's expected calls. No code execution and no Docker or verifier container is required.

API-Bank is "API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs" (Minghao Li et al., EMNLP 2023 — arXiv:2304.08244). This pack declares the benchmark's APIs as chat-completion **tools**, lets the model call them against a deterministic in-process mock API layer built from the dataset (no network), feeds each result back, and continues the loop under a documented turn cap.

Companion documents:

- [METHODOLOGY.md](METHODOLOGY.md) — provenance, included/excluded scenarios, the transform, the tool loop, the mock layer, the transport, the exact grading rules, scoring, deviations, trust model.
- [INSTALL.md](INSTALL.md) — installation instructions.
- [NOTICE](NOTICE) — upstream attribution and the pinned data revision.

## What the pack contains

- **498 scenarios** from the vendored API-Bank test data, in three levels:
  - **Level 1 — single call** (399 scenarios): a dialogue plus the record's API descriptions; one expected call.
  - **Level 2 — retrieve then call** (49 scenarios): one per upstream dialogue; the model must search (`ToolSearcher`), optionally fetch a credential, then call the task API (1–3 expected calls).
  - **Level 3 — multi-call planning** (50 scenarios): a single-sentence requirement and a full expected plan of 4–8 calls, each API revealed by a preceding search.
- **763 expected calls** in total, graded as sequences (see Scoring).
- A **deterministic in-process mock API layer**: recorded dataset results are replayed for matching calls, `ToolSearcher` runs a keyword search over the scenario's own catalog, and anything else returns a type-shaped placeholder. Same call in, same result out — fully offline.
- A standalone CLI runner and an offline tools-aware mock server for exercising the pipeline without BenchLocal.

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an OpenAI-compatible inference endpoint that supports the `tools` / `tool_calls` chat extension. The pack uses the `inferenceEndpoints` host feature and declares `capabilities.tools`.
- **No Python, no Docker.** The pack never executes model output and never reaches the network beyond your configured endpoint.
- **Node.js** only for the CLI runner and source builds.

### No Docker required

API-Bank's APIs are served here by an in-process, dataset-backed mock layer, and grading is a call-sequence comparison inside the pack runtime. There is no subprocess and nothing a container would isolate, so the pack declares `"verification": false` and requests no container.

## Install

BenchLocal installs third-party packs from a packaged archive through the app's pack installation flow. This repository produces that archive with `scripts/pack-artifact.mjs` (output: `results/api-bank-1.0.0.tar.gz`, all members at the archive root). See [INSTALL.md](INSTALL.md) for the exact steps.

**Prebuilt archive:** [`api-bank-1.0.0.tar.gz`](https://github.com/TokenTinkererAI/benchlocal-packs/releases/download/api-bank-v1.0.0/api-bank-1.0.0.tar.gz) — ready to load directly in BenchLocal's *Bench Pack URL* box; no build step required.

## Usage

### In BenchLocal

1. Install the pack (see [INSTALL.md](INSTALL.md)).
2. Configure an OpenAI-compatible inference endpoint (base URL, model name, and an API key if the endpoint requires one). The endpoint must support function calling.
3. Run the pack. It exposes 498 scenarios. For each one the pack declares the APIs as tools and drives a tool-calling loop: the model calls an API, the pack answers with the mock layer's result, and so on until the model stops or the turn cap is reached.
4. Read the results: per scenario, the executed call sequence against the expected one, aggregated as tool-call accuracy (see Scoring below).

Default sampling, declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 65536, request timeout 3600 s. Model replies are requested with `stream: true`, and `tool_calls` are reassembled from the streamed deltas (a non-streaming JSON body is accepted as a fallback). If a reply is cut off by the token cap, the summary says `(response truncated - raise max_tokens)` — raise `max_tokens` in the run tab.

### CLI runner

The CLI runner executes the same pipeline as the pack (same prompts, tool loop, mock layer and grading) against any OpenAI-compatible endpoint.

Build it once with `npm run build:cli` (output in `dist-cli/`), then:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name>
```

More examples:

```sh
# First 8 scenarios
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 8

# Only level 3
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --level 3

# Specific scenarios, with JSON results written to results/run.json
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --ids L1/0,L2/0,L3/0 --out results/run.json

# Endpoint that requires a bearer token
node dist-cli/cli/run.js --base-url https://api.example.invalid/v1 --model <name> --api-key <key>
```

Options: `--limit N`, `--ids a,b,c` (scenario ids such as `L3/7`), `--level N` (1–3), `--out PATH`, `--temperature F`, `--top-p F`, `--max-tokens N`, `--timeout-ms N`, `--api-key KEY`. Run with `--help` for the full list.

The runner prints one line per scenario and a final `Summary: tool-call accuracy <passed>/<total> (<x>%)` line.

### Mock server

For end-to-end checks without a model endpoint, `scripts/mock-server.mjs` is a minimal OpenAI-compatible chat server that is aware of the pack's tools: it identifies the scenario from the request and answers with the next expected tool call (or a deliberately wrong call with `--wrong`, or a plain text reply with no call with `--empty`), streaming `tool_call` deltas by default:

```sh
npm run build:cli                  # the mock reads the compiled scenario modules
node scripts/mock-server.mjs       # serves on http://127.0.0.1:8223
node dist-cli/cli/run.js --base-url http://127.0.0.1:8223/v1 --model mock
```

A full run against the default mode must end at `498/498`; `--wrong` and `--empty` must end at `0/498`. Use `--port N`, `--json-only` (single JSON body instead of SSE, exercising the non-streaming `tool_calls` fallback), `--delay-ms N` and `--chunk-delay-ms N` to change behaviour.

## Scoring

- A scenario passes only when the executed call sequence matches the dataset's expected sequence — same number of calls, same tool names, same argument keys, and matching argument values under the documented normalization (see [METHODOLOGY.md](METHODOLOGY.md)).
- accuracy = scenarios passed / 498. The run score is this value as **points out of 100** (the percentage rounded to the nearest integer), and the summary reads `tool-call accuracy: <passed>/<total> (<x>%) - <points> points.`
- Each scenario ends `pass` (score 1) or `fail` (score 0); failures carry a specific reason (`no tool call was produced`, `called N API(s), expected M`, `tool X != Y`, `argument k=… does not match the expected value`).
- `provider_error` results (endpoint unreachable, HTTP error, malformed response) score 0 and mark the run as not-clean for that model.
- The results card breaks the accuracy down per level (Level 1 / Level 2 / Level 3) with scenario counts as weights. The headline score is the overall accuracy.
- Scores are not directly comparable with upstream API-Bank numbers: this pack grades call sequences rather than executed results, uses native tool calling rather than `[ApiName(...)]` text parsing, and evaluates zero-shot with a 16-turn cap. The deviations are listed in [METHODOLOGY.md](METHODOLOGY.md).

## Repository layout

| Path | Contents |
| --- | --- |
| `benchlocal/index.ts` | Pack entry point (`defineBenchPack`): scenario listing, per-scenario run, score aggregation. |
| `lib/` | Core pipeline: types, prompting/tool schemas, tool-call extraction, the mock API layer, call-sequence grading, model client, orchestration, scoring. |
| `lib/generated/` | Generated scenario module (`scenarios.ts`); header records the three source SHA-256 values. |
| `cli/` | `run.ts` (CLI runner). |
| `scripts/` | `apicall.mjs` (dependency-free dataset parsers), `generate-dataset.mjs`, `mock-server.mjs`, `pack-artifact.mjs`, `check-extraction.mjs` (fixtures + dataset integrity). |
| `data/` | The three vendored API-Bank test files and `LICENSE-apibank` (upstream MIT copy). |
| `dist/` | Pack build output for BenchLocal (`tsconfig.benchlocal.json`). |
| `dist-cli/` | CLI build output (`tsconfig.cli.json`). |
| `results/` | Run outputs and the packaged archive; git-ignored. |
| `_reference/` | Development reference material (offline E2E verifier); not shipped in the pack archive. |
| root | `benchlocal.pack.json` (manifest), `package.json`, `tsconfig*.json`, `INSTALL.md`, `README.md`, `METHODOLOGY.md`, `LICENSE`, `NOTICE`. |

## Development

```sh
npm install

npm run build:dataset     # regenerate lib/generated/scenarios.ts from data/*.json (deterministic)
npm run build:benchlocal  # compile the pack to dist/ (tsconfig.benchlocal.json)
npm run build:cli         # compile the CLI runner to dist-cli/ (tsconfig.cli.json)
npm run build             # both builds
npm run typecheck         # tsc --noEmit across the repo
npm run check:extraction  # build the CLI, then run the fixture and dataset-integrity checks
```

`npm run check:extraction` covers the dataset parsers, every grading rule, tool-call delta accumulation and the JSON fallback, the mock API layer, prompt/tool-schema shaping, dataset integrity and score aggregation; a passing run ends with `PASS (96 checks)`.

## License and attribution

MIT license — see [LICENSE](LICENSE). Copyright © 2026 TokenTinkerer.

The API-Bank data is vendored from the HuggingFace dataset `liminghao1630/API-Bank` at revision `12e8158b7628c168f07e8f31fbbe3445e99f44cf` and is licensed **MIT**, © 2022 Alibaba Research. See [NOTICE](NOTICE).
