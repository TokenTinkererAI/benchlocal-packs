# HMMT-Feb-2026

A BenchLocal bench pack for the **HMMT February 2026** tournament (Harvard-MIT Mathematics Tournament, February 14, 2026 sitting): all 33 short-answer problems, scored by boxed-answer extraction with textual LaTeX normalization against the official gold answer.

Zero-shot, single-sample competition-math evaluation — one chat completion per problem, no tools, no code execution, no Docker verifier. The pack is a plain Node module; the only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## What the pack contains

| | |
|---|---|
| Problems | 33 (`HMMT/0` … `HMMT/32`) |
| Rounds covered | Algebra & Number Theory 1-10, Combinatorics 1-10, Geometry 1-10, Team 2/3/5 |
| Answers | Official final answers (LaTeX strings: integers, fractions, radicals, a degree, a power) |
| Task | Solve the problem, end with a final line `\boxed{answer}` |
| Scoring | Exact match after textual normalization, 1 point per problem, aggregate = rounded percentage out of 100 |
| Category | `HMMT Feb 2026 (accuracy)` |
| Sampling defaults | temperature 0, max_tokens 65536, request_timeout_seconds 3600 |

Problem text is vendored byte-for-byte from the MathArena `hmmt_feb_2026` question set used for the MathArena leaderboard (LaTeX source; figure-bearing problems carry their Asymptote/TikZ source, as the upstream leaderboard does). All 33 gold answers were cross-checked against the **official HMMT February 2026 published solutions** — all 33 agree. See [NOTICE](NOTICE) and [METHODOLOGY.md](METHODOLOGY.md).

## Requirements

- BenchLocal 0.2.0+ (host feature `inferenceEndpoints`)
- Node 20+ to build the repo
- Any OpenAI-compatible chat endpoint at run time (llama.cpp, LM Studio, ollama, a hosted API)

No Docker, no Python, no verifier container. (Building the vendored dataset from the upstream parquet — never needed to build or run the pack — additionally uses Python with pandas + pyarrow.)

## Install

```sh
npm install
npm run build                 # compiles the pack (dist/) and the CLI (dist-cli/)
node scripts/pack-artifact.mjs
```

That writes `results/hmmt-feb-2026-1.0.0.tar.gz` — manifest, `dist/` and docs at the archive root, `node_modules` excluded (the host hydrates dependencies itself). Install it through BenchLocal's third-party pack flow; see [INSTALL.md](INSTALL.md).

**Prebuilt archive:** [`hmmt-feb-2026-1.0.0.tar.gz`](https://github.com/TokenTinkererAI/benchlocal-packs/releases/download/hmmt-feb-2026-v1.0.0/hmmt-feb-2026-1.0.0.tar.gz) — ready to load directly in BenchLocal's *Bench Pack URL* box; no build step required.

## Usage

### In BenchLocal

Select **HMMT-Feb-2026**, pick a model, run. 33 scenarios, one chat completion each; the results card shows a single accuracy percentage converted to points out of 100.

### CLI runner

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model --limit 8
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model local-model --ids 3,HMMT/7 --out results/run.json
```

Every problem prints one line and the run ends with the pack score:

```
[1/33] HMMT/0 PASS (55ms) - correct (answered -\frac{1}{21})
...
Summary: accuracy 33/33 (100%)
Score: accuracy: 33/33 (100.0%) - 100 points.
Categories: HMMT Feb 2026 (accuracy) = 100 (weight 33)
```

### Mock server

`scripts/mock-server.mjs` serves canned replies in three rotating formats (reasoning + `\boxed{...}`, prose `The answer is …`, bare final line) so the whole pipeline can be exercised without a model:

```sh
node scripts/mock-server.mjs --port 8221           # answers every problem correctly -> 100 points
node scripts/mock-server.mjs --port 8221 --wrong   # a value that stays wrong after normalization -> 0 points
node scripts/mock-server.mjs --port 8221 --empty   # candidate-free prose -> unparseable summaries
```

### Self-checks

```sh
npm run check:extraction      # -> PASS (74 checks)
npm run probe                 # pack probe (needs npm run build:benchlocal)
```

## Scoring

- One point per problem: the extracted candidate must normalize to the same string as the gold answer.
- `totalScore` = `round(100 * passed / 33)` — integer points out of 100 (each problem is worth ~3.03 points; the total is rounded).
- Summary: `accuracy: 27/33 (81.8%) - 82 points.`
- One category, `HMMT Feb 2026 (accuracy)`, weighted by the number of problems run.
- Provider failures score 0 and are flagged retryable; an unusable reply fails with an explicit `unparseable answer` summary (never a guess).

## Repository layout

```
benchlocal.pack.json      pack manifest (entry: ./dist/benchlocal/index.js)
benchlocal/index.ts       thin host adapter (listScenarios / prepare / scoreModelResults)
lib/                      extract.ts, normalize.ts, prompts.ts, model-client.ts, orchestrator.ts, benchmark.ts
lib/generated/problems.ts generated from data/ (do not edit)
data/hmmt_feb_2026.jsonl  vendored problems + gold answers (sha256-pinned)
data/LICENSE-hmmt         upstream data licence, terms and provenance
cli/run.ts                local CLI runner
scripts/                  generate-dataset, check-extraction, mock-server, pack-artifact, derive-dataset.py
_reference/probe-pack.mjs loads dist/ the way the host does and sanity-checks scoring
METHODOLOGY.md            provenance, prompt, extraction, normalization rules, deviations
INSTALL.md                build + install walkthrough
```

## Development

```sh
npm run build:dataset     # regenerate lib/generated/problems.ts from data/ (verifies sha256 + 33 records)
npm run build             # tsc -> dist/ and dist-cli/
npm run typecheck
```

The vendored data file is hash-pinned: changing a single byte fails the dataset build instead of silently changing the benchmark. `scripts/derive-dataset.py` regenerates it from the pinned upstream parquet (requires pandas + pyarrow), so the parquet → jsonl provenance chain can be re-checked.

## Verified

- `npm run build` and `npm run typecheck` — green (TypeScript via `Node16` for the pack, `NodeNext` for the CLI).
- `npm run check:extraction` — `PASS (74 checks)` (extraction layers, normalization, prompt, dataset integrity).
- Mock E2E (port 8221): 33/33 → `100 points`; `--wrong` → `0 points` with `wrong: answered X, expected Y`; `--empty` → `0 points` with `unparseable answer - no boxed, phrase or final-line candidate found in response`.
- Pack probe: 33 scenarios, `2/3 → 67`, `33/33 → 100`, `0/33 → 0`.

## License and attribution

Code: MIT © 2026 TokenTinkerer — see [LICENSE](LICENSE).

Data: the HMMT February 2026 problems and answers originate from the Harvard-MIT Mathematics Tournament and are included here as republished by the MathArena evaluation mirror — primary source `MathArena/hmmt_feb_2026` (CC BY-NC-SA 4.0), cross-checked against the official HMMT February 2026 published solutions. The data is **not** MIT: see [data/LICENSE-hmmt](data/LICENSE-hmmt) and [NOTICE](NOTICE) for terms (attribution, non-commercial, share-alike).
