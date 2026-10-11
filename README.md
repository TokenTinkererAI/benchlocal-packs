# BenchLocal Bench Packs

A collection of 20 [BenchLocal](https://github.com/stevibe/BenchLocal) **Bench Packs** — installable benchmark definitions for local-first LLM evaluation. Each pack turns a recognized benchmark into a self-contained evaluation suite that runs against any OpenAI-compatible endpoint (llama.cpp, LM Studio, vLLM, hosted APIs), with deterministic grading and a single integer score out of 100.

Maintained by **TokenTinkerer**.

> **No Docker required.** Every pack here is *verifier-less*: grading happens inside the pack runtime itself, or in a local Python subprocess for the execution benchmarks. The whole suite runs on a plain Windows / macOS / Linux machine with no containers.

## The suite

| Pack | Benchmark | Shape | Scenarios | Version |
|---|---|---|---|---|
| [`humaneval-164`](humaneval-164/) | OpenAI HumanEval | code execution | 164 | 1.0.3 |
| [`gpqa-diamond-198`](gpqa-diamond-198/) | GPQA Diamond | text, letter (A–D) | 198 | 1.0.2 |
| [`gpqa-main-448`](gpqa-main-448/) | GPQA Main | text, letter | 448 | 1.0.2 |
| [`gpqa-extended-546`](gpqa-extended-546/) | GPQA Extended | text, letter | 546 | 1.0.2 |
| [`livecodebench-v6`](livecodebench-v6/) | LiveCodeBench (release_v6) | code execution, official harness | 1,055 | 1.0.2 |
| [`gsm8k-1319`](gsm8k-1319/) | GSM8K (test set) | text, numeric | 1,319 | 1.0.2 |
| [`mbpp-plus-378`](mbpp-plus-378/) | EvalPlus MBPP+ | code execution, EvalPlus semantics | 378 | 1.0.2 |
| [`humaneval-plus-164`](humaneval-plus-164/) | EvalPlus HumanEval+ | code execution, expanded suites | 164 | 1.0.2 |
| [`ifeval-541`](ifeval-541/) | Google IFEval | programmatic constraint checker | 541 | 1.0.2 |
| [`aime-2025`](aime-2025/) | AIME 2025 (I + II) | text, integer (0–999) | 30 | 1.0.2 |
| [`math-500`](math-500/) | MATH-500 | text, boxed answer (normalized match) | 500 | 1.0.2 |
| [`mmlu-redux`](mmlu-redux/) | MMLU-Redux-2.0 (verified subset) | text, letter (A–D) | 5,330 | 1.0.2 |
| [`mmlu-pro`](mmlu-pro/) | TIGER-Lab MMLU-Pro | text, letter (A–J), chain-of-thought | 12,032 | 1.0.2 |
| [`arc-challenge-1172`](arc-challenge-1172/) | AI2 ARC Challenge | text, letter (A–E) | 1,172 | 1.0.0 |
| [`arc-easy-2376`](arc-easy-2376/) | AI2 ARC Easy | text, letter (A–E) | 2,376 | 1.0.0 |
| [`truthfulqa-817`](truthfulqa-817/) | TruthfulQA (MC1) | text, letter (A–M) | 817 | 1.0.0 |
| [`aime-2026`](aime-2026/) | AIME 2026 (I + II) | text, integer (0–999) | 30 | 1.0.0 |
| [`hmmt-feb-2026`](hmmt-feb-2026/) | HMMT February 2026 | text, normalized answer | 33 | 1.0.0 |
| [`bfcl-v3`](bfcl-v3/) | Berkeley Function Calling Leaderboard v3 (phase 1, AST-match categories) | tool calls, call-vs-gold | 1,331 | 1.0.0 |
| [`api-bank`](api-bank/) | API-Bank | tool calls, three levels | 498 | 1.0.0 |

Every pack directory is a standalone pack repository: its own `benchlocal.pack.json` manifest, `lib/` runtime, `cli/` runner, `scripts/` (fixtures, extraction checks, mock server, packer), docs (`README.md`, `METHODOLOGY.md`, `INSTALL.md`, `NOTICE`), and vendored benchmark data with pinned source hashes.

Each pack also ships its own test suite (`npm run selftest`, `npm run check:extraction`, mock end-to-end runs against a bundled mock server) so the grading pipeline is reproducible without a model.

## What to expect from the scores

Scoring is points out of 100 (rounded accuracy), one sample per item, temperature 0, `max_tokens` 65536, 3600 s request timeout. That is a deliberately plain setup — lower than leaderboard numbers that use few-shot prompting, self-consistency, or answer verification. Each pack's `METHODOLOGY.md` states its exact protocol and its known deviations (e.g. deterministic option shuffling for the multiple-choice packs; textual normalization for MATH-500; zero-shot chat instead of 5-shot for MMLU-family packs).

Requests are streamed (`stream: true`, SSE) so that very long reasoning generations complete normally against local servers — there is no fixed 5-minute response cap.

## Using a pack

1. Install [BenchLocal](https://github.com/stevibe/BenchLocal) and start an OpenAI-compatible endpoint.
2. Register a pack as a local source in `~/.benchlocal/config.toml`:

```toml
[benchpacks.gpqa-diamond-198]
enabled = true
source = "local"
path = "/path/to/benchlocal-packs/gpqa-diamond-198"
version = "1.0.1"
```

…then restart the app (config is read at startup). Prebuilt `dist/` is committed, so a fresh clone works without a build step.

To rebuild or re-run the local test suite inside any pack: `npm install && npm run build`, then `npm test`-style scripts per its README (`npm run selftest`, `npm run check:extraction`, `npm run probe`, or the mock E2E runner).

### A note on execution packs

`humaneval-164`, `livecodebench-v6`, `mbpp-plus-378` and `humaneval-plus-164` execute model-generated code in a local Python subprocess, with a restricted-builtins guard, per-test timeouts and process-tree kills. That guard is an anti-accident measure, **not a security sandbox**. Run them against models you trust, on a machine that can afford to misbehave. Each execution pack documents its exact harness and Windows/macOS adaptations in `METHODOLOGY.md`.

### A note on tool-calling packs

`bfcl-v3` and `api-bank` declare tools to the model and grade the calls it emits; neither needs Docker, a function sandbox or network access. BFCL v3 (phase 1) compares `tool_calls` against the gold calls for the AST-match categories — the nine SQL rows whose golds are unsatisfiable under BFCL's own checker are excluded and listed in the pack, as are the live/execution/multi-turn categories. API-Bank executes each scenario's APIs against a deterministic in-process mock built from the dataset and grades the resulting call sequence. Both run against any OpenAI-compatible endpoint that supports the `tools`/`tool_calls` fields.

## Prebuilt archives

Prebuilt BenchLocal archives for every pack **except** `livecodebench-v6` (its ~3.1 GiB dataset exceeds GitHub’s 2 GiB release-asset limit) are attached to [Releases](https://github.com/TokenTinkererAI/benchlocal-packs/releases) — paste an archive’s URL into BenchLocal’s *Bench Pack URL* box to install without building.

## Repository notes

- `node_modules/` and `results/` are intentionally not committed. Build output `dist/` IS committed, so cloned packs load directly in BenchLocal and the bundled mock servers work as-is; the CLI builds locally with `npm run build:cli` (`dist-cli/` is not committed).
- `livecodebench-v6/data/` (~4.2 GB of per-problem test files) is not included. Regenerate it with that pack's `scripts/build-dataset.mjs` (see its README; it fetches `livecodebench/code_generation_lite`, release_v6).
- Two expanded test-case files in `humaneval-plus-164/data/problems/` exceed GitHub's 100 MB per-file limit (`HumanEval_15.json` ≈ 147 MB, `HumanEval_130.json` ≈ 114 MB) and are omitted. The pack's `scripts/build-dataset.mjs` + `scripts/build_expected.py` regenerate them; the other 162 problems are complete.
- This repository grows over time: new packs land as new top-level directories with the same layout.

## Provenance and licenses

All **code** in this repository is MIT © TokenTinkerer — see [LICENSE](LICENSE). Benchmark **data** is vendored from upstream sources under their own terms; the full attribution (with source revisions and hashes) lives in each pack's `NOTICE` and `data/` license copies:

| Pack | Data source | Data license |
|---|---|---|
| `humaneval-164` | openai/human-eval | MIT |
| `gpqa-*` | idavidrein/gpqa | CC BY 4.0 |
| `livecodebench-v6` | LiveCodeBench `code_generation_lite` | MIT |
| `gsm8k-1319` | openai/gsm8k | MIT |
| `mbpp-plus-378` | MBPP + EvalPlus | Apache-2.0 |
| `humaneval-plus-164` | HumanEval + EvalPlus | MIT + Apache-2.0 |
| `ifeval-541` | google/IFEval + Google Research checker code | Apache-2.0 |
| `aime-2025` | MathArena/aime_2025 | **CC BY-NC-SA 4.0 — non-commercial** |
| `math-500` | Hendrycks MATH via OpenAI prm800k | MIT |
| `mmlu-redux` | edinburgh-dawg/mmlu-redux-2.0 (over caismmlu, MIT) | CC BY 4.0 |
| `mmlu-pro` | TIGER-Lab/MMLU-Pro (dataset) | MIT |

Note the **non-commercial, share-alike** terms of the AIME 2025 data (attribution in `aime-2025/NOTICE` + `data/LICENSE-aime`); do not relicense or bulk-load that directory into training corpora.

## Credits

Benchmark designs belong to their original authors (cited per pack). Pack implementation, harnesses, tooling and documentation: **TokenTinkerer**. Licenses: MIT for code, upstream terms for data.
