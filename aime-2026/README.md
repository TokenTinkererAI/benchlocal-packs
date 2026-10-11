# AIME-2026

A BenchLocal bench pack for the **2026 American Invitational Mathematics Examination**: all 30 problems of 2026 AIME I and AIME II, scored by exact integer answer match.

Zero-shot, single-sample competition-math evaluation — one chat completion per problem, no tools, no code execution, no Docker verifier. The pack is a plain Node module; the only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## What the pack contains

| | |
|---|---|
| Problems | 30 (`AIME/0` … `AIME/29`): 2026 AIME I problems 1-15, then 2026 AIME II problems 1-15 |
| Answers | Official integers in 0-999 (all 30 distinct; min 29, max 896) |
| Task | Solve the problem, end with a final line `Answer: <integer>` |
| Scoring | Exact match, 1 point per problem, aggregate = rounded percentage out of 100 |
| Category | `AIME 2026 (accuracy)` |
| Sampling defaults | temperature 0, max_tokens 65536, request_timeout_seconds 3600 |

Problem text is vendored from the MathArena `aime_2026` question set behind the MathArena leaderboard (LaTeX source; figure-bearing problems carry their figure source, as the upstream leaderboard does). All 30 gold answers were cross-checked against independent public mirrors — `zhenghaoxu/aime-2026`, `lingjie23/aime_2026`, the split `MathArena/aime_2026_I` (problems 1-15), and the AIME-I mirrors `qyi-iquest/AIME_2026` and `baysonfox/AIME2026-I`. One further mirror (`thulthula/AIME2026`) disagrees on two answers; the discrepancy is recorded, not silently fixed. See [NOTICE](NOTICE) and [METHODOLOGY.md](METHODOLOGY.md).

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

The pack is loaded by the app as a **custom local source** registered in `~/.benchlocal/config.toml`; nothing is registered for you. See [INSTALL.md](INSTALL.md).

**Prebuilt archive:** [`aime-2026-1.0.0.tar.gz`](https://github.com/TokenTinkererAI/benchlocal-packs/releases/download/aime-2026-v1.0.0/aime-2026-1.0.0.tar.gz) — ready to load directly in BenchLocal's *Bench Pack URL* box; no build step required.

## Usage

### In BenchLocal

Select **AIME-2026**, pick a model, run. 30 scenarios, one chat completion each; the results card shows a single accuracy percentage converted to points out of 100.

### CLI runner

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:8214/v1 --model local-model
node dist-cli/cli/run.js --base-url http://127.0.0.1:8214/v1 --model local-model --limit 8
node dist-cli/cli/run.js --base-url http://127.0.0.1:8214/v1 --model local-model --ids 3,AIME/7 --out results/run.json
```

Every problem prints one line and the run ends with the pack score:

```
[1/30] AIME/0 PASS (31ms) - correct (answered 277)
...
Summary: accuracy 30/30 (100%)
Pack score: 100 points | accuracy: 30/30 (100.0%) - 100 points.
Categories: AIME 2026 (accuracy) = 100 (weight 30)
```

### Mock server

`scripts/mock-server.mjs` serves canned replies in five rotating formats (plain `Answer: N`, `\boxed{N}`, bold answer line, bare final line, prose answer) so the whole pipeline can be exercised without a model:

```sh
node scripts/mock-server.mjs --port 8214             # answers every problem correctly -> 100 points
node scripts/mock-server.mjs --port 8214 --wrong     # answers gold+1 mod 1000 -> 0 points
node scripts/mock-server.mjs --port 8214 --empty     # prose with no integer -> unparseable summaries
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
- One category, `AIME 2026 (accuracy)`, weighted by the number of problems run.
- Provider failures score 0 and are flagged retryable; an unusable reply fails with an explicit `unparseable answer` summary (never a guess).

## Repository layout

```
benchlocal.pack.json       pack manifest (entry: ./dist/benchlocal/index.js)
benchlocal/index.ts        thin host adapter (listScenarios / prepare / scoreModelResults)
lib/                       extract.ts, prompts.ts, model-client.ts, orchestrator.ts, benchmark.ts
lib/generated/problems.ts  generated from data/ (do not edit)
data/aime_2026.raw.json    vendored source export (verbatim problem + integer answer, sha256-pinned)
data/aime_2026.jsonl       derived problem + gold integer rows (sha256-pinned)
data/LICENSE-aime          upstream data licence, terms and provenance
cli/run.ts                 local CLI runner
scripts/                   generate-dataset, check-extraction, mock-server, pack-artifact
_reference/probe-pack.mjs  loads dist/ the way the host does and sanity-checks scoring
METHODOLOGY.md             provenance, prompt, extraction rules, deviations
INSTALL.md                 build + local-source install walkthrough
```

## Development

```sh
npm run build:dataset     # re-derives data/aime_2026.jsonl from the raw export, regenerates lib/generated/problems.ts
npm run build             # tsc -> dist/ and dist-cli/
npm run typecheck
```

Both vendored data files are hash-pinned and the derivation is deterministic: re-running `build:dataset` reproduces `data/aime_2026.jsonl` byte-for-byte, and a drifted file fails the build instead of silently changing the benchmark.

## Check outputs

The commands below are the reproducible evidence for this pack; the exact printed numbers are what a correct local build produces.

- `npm run typecheck` — clean.
- `npm run build` — clean (`dist/` for the pack, `dist-cli/` for the CLI).
- `npm run check:extraction` — `PASS (48 checks)` (extraction layers, normalization, range guard, prompt, dataset integrity).
- `node _reference/verify-e2e.mjs` (mock port 8214): `correct` → `Pack score: 100 points | accuracy: 30/30 (100.0%) - 100 points.`; `wrong` → `0 points` with `wrong: answered X, expected Y`; `empty` → `0 points` with `unparseable answer - no integer in 0-999 found`.
- `npm run probe` — 30 scenarios, `2/3 → 67`, `30/30 → 100`, `0/30 → 0`.

## License and attribution

Code: MIT © 2026 TokenTinkerer — see [LICENSE](LICENSE).

Data: the 2026 AIME problems and answers originate from the MAA / AMC contests and are included here as republished by public evaluation mirrors — primary source `MathArena/aime_2026` (CC BY-NC-SA 4.0), cross-checked against `zhenghaoxu/aime-2026`, `lingjie23/aime_2026`, `MathArena/aime_2026_I`, `qyi-iquest/AIME_2026` and `baysonfox/AIME2026-I`. The data is **not** MIT: see [data/LICENSE-aime](data/LICENSE-aime) and [NOTICE](NOTICE) for terms (attribution, non-commercial, share-alike).
