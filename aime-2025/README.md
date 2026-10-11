# AIME-2025

A BenchLocal bench pack for the **2025 American Invitational Mathematics Examination**: all 30 problems of 2025 AIME I and AIME II, scored by exact integer answer match.

Zero-shot, single-sample competition-math evaluation — one chat completion per problem, no tools, no code execution, no Docker verifier. The pack is a plain Node module; the only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## What the pack contains

| | |
|---|---|
| Problems | 30 (`AIME/0` … `AIME/29`): 2025 AIME I problems 1-15, then 2025 AIME II problems 1-15 |
| Answers | Official integers in 0-999 (all 30 distinct; min 16, max 907) |
| Task | Solve the problem, end with a final line `Answer: <integer>` |
| Scoring | Exact match, 1 point per problem, aggregate = rounded percentage out of 100 |
| Category | `AIME 2025 (accuracy)` |
| Sampling defaults | temperature 0, max_tokens 65536, request_timeout_seconds 3600 |

Problem text is vendored byte-for-byte from the MathArena `aime_2025` question set used for the MathArena leaderboard (LaTeX source; the 5 figure-bearing problems carry their TikZ/Asymptote source, as the upstream leaderboard does). All 30 gold answers were cross-checked against two further public mirrors — `opencompass/AIME2025` and `yentinglin/aime_2025` — and are identical in all three. See [NOTICE](NOTICE) and [METHODOLOGY.md](METHODOLOGY.md).

## Requirements

- BenchLocal 0.2.0+ (host feature `inferenceEndpoints`)
- Node 20+ to build the repo
- Any OpenAI-compatible chat endpoint at run time (llama.cpp, LM Studio, ollama, a hosted API)

No Docker, no Python, no verifier container.

## Install

```sh
npm install
npm run build                 # compiles the pack (dist/) and the CLI (dist-cli/)
```

Register this folder as a **local source** in BenchLocal — it is not part of the official registry; see [INSTALL.md](INSTALL.md) for the exact `config.toml` block.


**Prebuilt archive:** [`aime-2025-1.0.2.tar.gz`](https://github.com/TokenTinkererAI/benchlocal-packs/releases/download/aime-2025-v1.0.2/aime-2025-1.0.2.tar.gz) — ready to load directly in BenchLocal's *Bench Pack URL* box; no build step required.

## Usage

### In BenchLocal

Select **AIME-2025**, pick a model, run. 30 scenarios, one chat completion each; the results card shows a single accuracy percentage converted to points out of 100.

### CLI runner

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model --limit 8
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model --ids 3,AIME/7 --out results/run.json
```

Every problem prints one line and the run ends with the pack score:

```
[1/30] AIME/0 PASS (31ms) - correct (answered 70)
...
Summary: accuracy 30/30 (100%)
Pack score: 100 points | accuracy: 30/30 (100.0%) - 100 points.
Categories: AIME 2025 (accuracy) = 100 (weight 30)
```

### Mock server

`scripts/mock-server.mjs` serves canned replies in five rotating formats (plain `Answer: N`, `\boxed{N}`, bold answer line, bare final line, prose answer) so the whole pipeline can be exercised without a model:

```sh
node scripts/mock-server.mjs --port 8122             # answers every problem correctly -> 100 points
node scripts/mock-server.mjs --port 8122 --wrong     # answers gold+1 mod 1000 -> 0 points
node scripts/mock-server.mjs --port 8122 --empty     # prose with no integer -> unparseable summaries
```

### Self-checks

```sh
npm run check:extraction      # -> PASS (48 checks)
npm run probe                 # pack probe (needs npm run build:benchlocal)
```

## Scoring

- One point per problem: the extracted integer must equal the gold answer exactly.
- `totalScore` = `round(100 * passed / 30)` — integer points out of 100 (each problem is worth 3.33 points; the total is rounded).
- Summary: `accuracy: 27/30 (90.0%) - 90 points.`
- One category, `AIME 2025 (accuracy)`, weighted by the number of problems run.
- Provider failures score 0 and are flagged retryable; an unusable reply fails with an explicit `unparseable answer` summary (never a guess).

## Repository layout

```
benchlocal.pack.json      pack manifest (entry: ./dist/benchlocal/index.js)
benchlocal/index.ts       thin host adapter (listScenarios / prepare / scoreModelResults)
lib/                      extract.ts, prompts.ts, model-client.ts, orchestrator.ts, benchmark.ts
lib/generated/problems.ts generated from data/ (do not edit)
data/aime_2025.jsonl      vendored problems + gold integers (sha256-pinned)
data/LICENSE-aime         upstream data licence, terms and provenance
cli/run.ts                local CLI runner
scripts/                  generate-dataset, check-extraction, mock-server, pack-artifact
_reference/probe-pack.mjs loads dist/ the way the host does and sanity-checks scoring
METHODOLOGY.md            provenance, prompt, extraction rules, deviations
INSTALL.md                build + install walkthrough
```

## Development

```sh
npm run build:dataset     # regenerate lib/generated/problems.ts from data/ (verifies sha256 + 30 records)
npm run build             # tsc -> dist/ and dist-cli/
npm run typecheck
```

The vendored data file is hash-pinned: changing a single byte fails the dataset build instead of silently changing the benchmark.

## Verified locally

- `npm run build` and `npm run typecheck` — green (TypeScript via `Node16` for the pack, `NodeNext` for the CLI).
- `npm run check:extraction` — `PASS (48 checks)` (extraction layers, normalization, range guard, prompt, dataset integrity).
- Mock E2E (port 8122): 30/30 → `Pack score: 100 points`; `--wrong` → `0 points` with `wrong: answered X, expected Y`; `--empty` → `0 points` with `unparseable answer - no integer in 0-999 found`.
- Pack probe: 30 scenarios, `2/3 → 67`, `30/30 → 100`, `0/30 → 0`.

## License and attribution

Code: MIT © 2026 TokenTinkerer — see [LICENSE](LICENSE).

Data: the 2025 AIME problems and answers originate from the MAA / AMC contests and are included here as republished by public evaluation mirrors — primary source `MathArena/aime_2025` (CC BY-NC-SA 4.0), cross-checked against `opencompass/AIME2025` (MIT) and `yentinglin/aime_2025`. The data is **not** MIT: see [data/LICENSE-aime](data/LICENSE-aime) and [NOTICE](NOTICE) for terms (attribution, non-commercial, share-alike).
