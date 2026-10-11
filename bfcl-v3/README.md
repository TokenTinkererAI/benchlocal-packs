# BFCL-v3

A BenchLocal bench pack for the **Berkeley Function Calling Leaderboard (BFCL) v3**, phase 1: the single-turn, non-live categories graded by **AST match** — the model's emitted tool calls are compared against the dataset's ground-truth calls. No function is ever executed, and no Docker or verifier container is required.

The pack declares each scenario's function documents as OpenAI-compatible `tools` (with `tool_choice: auto`), parses the tool calls out of the streamed response, and grades them with a faithful port of BFCL's own AST checker.

## Categories

**Included** (single-turn, non-live, graded by AST match against `possible_answer/`):

| Category | Scenarios | Grading rule |
| --- | --- | --- |
| `simple` | 400 | one emitted call, exact function + argument match |
| `multiple` | 200 | one emitted call chosen from 2–4 functions |
| `parallel` | 200 | all expected calls, order-insensitive, call count exact |
| `parallel_multiple` | 200 | parallel + multiple combined |
| `sql` | 91 | one `sql.execute` call, structured arguments |
| `irrelevance` | 240 | **no** tool call may be emitted |

**Total: 1331 scenarios.**

**Excluded**, with reasons documented in [METHODOLOGY.md](METHODOLOGY.md):

- all `live_*` (relevance/irrelevance/simple/multiple/parallel/parallel_multiple) and all `exec_*` categories — live/execution-based, not part of phase 1;
- all `multi_turn_*` (base, miss_func, miss_param, long_context, composite) — multi-turn;
- `chatable` — chat-ability, no function call expected and not graded by AST match;
- `java` and `javascript` — the same AST principle, but upstream normalises those arguments through a language-specific literal parser (`java_type_converter` / `js_type_converter`), i.e. a *different* grading rule from the plain structural match used by the categories above;
- `rest` — has no `possible_answer` file; upstream grades it only by executing HTTP requests;
- 9 `sql` entries — their ground truth is unsatisfiable under BFCL's own checker (listed individually in [METHODOLOGY.md](METHODOLOGY.md)).

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an OpenAI-compatible inference endpoint configured. The pack uses the `inferenceEndpoints` host feature and the `tools` capability.
- **No Python, no Docker.** Nothing is executed; grading compares the emitted calls with the stored ground truth.
- **Node.js** only for the CLI runner and source builds.

**Prebuilt archive:** [`bfcl-v3-1.0.0.tar.gz`](https://github.com/TokenTinkererAI/benchlocal-packs/releases/download/bfcl-v3-v1.0.0/bfcl-v3-1.0.0.tar.gz) — ready to load directly in BenchLocal's *Bench Pack URL* box; no build step required.

## Usage

### In BenchLocal

1. Install the pack (see [INSTALL.md](INSTALL.md)).
2. Configure an OpenAI-compatible inference endpoint (base URL, model name, and an API key if the endpoint requires one) that supports tool calling.
3. Run the pack. It exposes 1331 scenarios. For each one the pack sends the user request plus the scenario's function documents as tools, then grades the emitted tool calls.
4. Read the results: per-scenario pass/fail with the matched or mismatching call, aggregated to points out of 100 with a per-category breakdown.

Default sampling is declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 65536, request timeout 3600 s. Requests are made with `stream: true` and the SSE response is accumulated client-side, so long generations are not cut off by Node's ~300 s non-streaming response-headers wall — see the Transport section of [METHODOLOGY.md](METHODOLOGY.md).

### CLI runner

The CLI runner executes the same pipeline as the pack (same prompts, tool schemas, decoding and grading) against any OpenAI-compatible endpoint.

Build it once with `npm run build:cli` (output in `dist-cli/`), then:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name>
```

More examples:

```sh
# First 8 scenarios
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 8

# One category only
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --category parallel

# Specific scenarios, with JSON results written to results/run.json
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --ids simple_0,parallel_3 --out results/run.json

# Endpoint that requires a bearer token
node dist-cli/cli/run.js --base-url https://api.example.invalid/v1 --model <name> --api-key <key>
```

Options: `--limit N`, `--ids a,b,c`, `--category NAME`, `--out PATH`, `--temperature F`, `--top-p F`, `--max-tokens N`, `--timeout-ms N`, `--api-key KEY`. Run with `--help` for the full list.

The runner prints one line per scenario, a final `Summary: accuracy <passed>/<total> (<x>%)` line, and a per-category breakdown.

### Mock server

For end-to-end checks without a model endpoint, `scripts/mock-server.mjs` is a minimal OpenAI-compatible chat server that answers every request with a canned tool call, streaming it the way llama.cpp does (`delta.tool_calls` fragments, a final `finish_reason` chunk, then `data: [DONE]`):

```sh
npm run build:cli                  # the CLI must be built first
node scripts/mock-server.mjs       # serves on http://127.0.0.1:8224
node dist-cli/cli/run.js --base-url http://127.0.0.1:8224/v1 --model mock
```

Modes: default answers with the scenario's ground-truth call(s) — a full run scores **1331/1331**; `--wrong` emits a bogus call for every scenario (**0/1331**, irrelevance included); `--empty` emits no tool call at all, so only the irrelevance category passes (**240/1331**). `--json-only` makes the mock ignore `stream` and answer with a single JSON body, exercising the client's non-SSE fallback. `_reference/verify-e2e.mjs` runs all three modes and asserts the expected counts.

## Scoring

- accuracy = scenarios passed / 1331. The run score is this value as **points out of 100** (the percentage rounded to the nearest integer), and the summary reads `accuracy: <passed>/<total> (<x>%) - <points> points.`
- Each scenario is binary: the emitted call set passes or fails the AST checker. `points` is 1 per scenario, so the detail view reads `1 / 1`.
- The results card breaks the accuracy down per category (`Simple`, `Multiple`, `Parallel`, `Parallel Multiple`, `SQL`, `Irrelevance`) with scenario counts as weights. The headline score is the overall accuracy.
- Model-call failures (endpoint unreachable, non-OK HTTP status, malformed response) are recorded per scenario as `provider_error` with the retryable flag and score 0; they are reported, not silently skipped.
- Scores are not directly comparable with numbers reported elsewhere: this pack is zero-shot, single-sample, native tool calling rather than BFCL's text-based function-call format. The deviations are listed in [METHODOLOGY.md](METHODOLOGY.md).

## Repository layout

| Path | Contents |
| --- | --- |
| `benchlocal/index.ts` | Pack entry point (`defineBenchPack`): scenario listing, per-scenario run, score aggregation. |
| `lib/` | Core pipeline: types, prompting, tool-schema conversion, model client, AST grading, orchestration, scoring. |
| `lib/grading.ts` | The BFCL AST checker port (function/argument/value comparison). |
| `cli/` | `run.ts` (CLI runner). |
| `scripts/` | `generate-dataset.mjs`, `gold-calls.mjs` (test oracle), `mock-server.mjs`, `pack-artifact.mjs`, `check-extraction.mjs` (grading fixtures + dataset integrity). |
| `data/raw/` | Vendored upstream files (byte-identical, provenance only — not shipped). |
| `data/manifest.json`, `data/scenarios/` | Generated runtime dataset (shipped in the artifact). |
| `dist/` | Pack build output for BenchLocal (`tsconfig.benchlocal.json`). |
| `dist-cli/` | CLI build output (`tsconfig.cli.json`). |
| `results/` | Run outputs and the packaged archive; git-ignored. |
| `_reference/` | Development reference material; not shipped in the pack archive. |
| root | `benchlocal.pack.json` (manifest), `package.json`, `tsconfig*.json`, `INSTALL.md`, `README.md`, `METHODOLOGY.md`, `LICENSE`, `NOTICE`. |

## Development

```sh
npm install

npm run build:dataset     # regenerate data/manifest.json + data/scenarios/ from data/raw/ (deterministic)
npm run build:benchlocal  # compile the pack to dist/ (tsconfig.benchlocal.json)
npm run build:cli         # compile the CLI runner to dist-cli/ (tsconfig.cli.json)
npm run build             # both builds
npm run typecheck         # tsc --noEmit across the repo
npm run check:extraction  # build the CLI, then run grading fixtures + dataset integrity checks
```

`npm run check:extraction` covers the AST grading rules (name, argument, value, type, parallel/multiple dispatch, irrelevance), tool-call decoding, wire-schema conversion and dataset integrity; a passing run ends with `PASS (52 checks)`.

## License and attribution

MIT license — see [LICENSE](LICENSE). Copyright © 2026 TokenTinkerer.

The BFCL data is vendored from [gorilla-llm/Berkeley-Function-Calling-Leaderboard](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard) and licensed **Apache-2.0** (a copy of the upstream license is kept at `data/raw/LICENSE`). The pinned revision and the SHA-256 of every vendored file are recorded in [NOTICE](NOTICE) and `data/raw/REVISION`.
