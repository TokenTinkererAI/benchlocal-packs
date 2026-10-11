# Methodology

This document is the contract for the AIME-2026 pack: where the data comes from, how it is transformed, the exact prompt and extraction rules, how scoring works, and where this pack deviates from other AIME evaluation setups.

## Benchmark provenance

**The benchmark.** The 2026 American Invitational Mathematics Examination — AIME I and AIME II, administered in February 2026, 15 problems each, run by the MAA / AMC program. By contest rule every answer is an integer from 000 to 999; the pack scores those integers by exact match.

**Vendored source.** `MathArena/aime_2026` (Hugging Face dataset, revision `d2de22f3c656b4f56cf8981212186377d1e23bc3`), the combined question set behind the MathArena leaderboard. It is a 30-row table with `problem_idx` (int64), `problem` (LaTeX source) and `answer` (int64); it is licensed CC BY-NC-SA 4.0. Source file `data/train-00000-of-00001.parquet` (10,065 bytes, SHA-256 `d91db799651b4cc1f0734f52792a695c9cc60dac342524b3d8e5b2ff31c3e957`). Card terms and the vendored-file hashes are reproduced in [`data/LICENSE-aime`](data/LICENSE-aime).

## Contest partition (AIME I vs AIME II)

The combined `aime_2026` table carries only `problem_idx` 1-30, no explicit contest label. The partition was resolved against the MathArena organisation's own split dataset:

- **`MathArena/aime_2026_I`** (revision `37806d403fa0c9ae914ee7d7da215cf2a3c7a94d`, file `data/train-00000-of-00001.parquet`, SHA-256 `224257fa2c4ceb0796205047b25f124c610bb72277cd558f68a9ee15d875c688`) is a 15-row table. Its `problem` text and `answer` values are **byte-identical** to rows 1-15 of the combined table (verified problem-for-problem and answer-for-answer).
- **`MathArena/aime_2026_II`** is **not published** — the Hub API returns no such dataset (empty `siblings`, no `sha`). A separate 2026 AIME II split could therefore not be fetched.

Because the combined set has exactly 30 = 15 + 15 rows and its first 15 are byte-identical to the AIME-I split, **rows 1-15 are AIME 2026 I problems 1-15 and rows 16-30 are AIME 2026 II problems 1-15**. This is a deduction from the I split, not a second independent confirmation of II; the order (I first, then II) also matches the layout MathArena uses for its AIME sets. If a `MathArena/aime_2026_II` split is later published, this partition should be re-checked against it.

## Cross-check sources (answers verified, not vendored)

Every gold answer was compared position-for-position against independent public mirrors downloaded at pinned revisions:

| Source | Revision | Rows | Scope | Agreement |
|---|---|---|---|---|
| `MathArena/aime_2026` (vendored) | `d2de22f3…` | 30 | I + II | — |
| `MathArena/aime_2026_I` | `37806d40…` | 15 | I | 15/15 identical |
| `zhenghaoxu/aime-2026` | `252cd051…` | 30 | I + II | 30/30 identical |
| `lingjie23/aime_2026` | `69131f7e…` | 30 | I + II | 30/30 identical |
| `qyi-iquest/AIME_2026` | `c57439ed…` | 15 | I | 15/15 identical |
| `baysonfox/AIME2026-I` | `39f5e2b0…` | 15 | I | 15/15 identical |
| `thulthula/AIME2026` | `46d04e6e…` | 30 | I + II | 28/30 — see below |

Per-file hashes and licences are recorded in [`data/LICENSE-aime`](data/LICENSE-aime).

**Result.** All 30 gold answers were compared against every mirror above and against the official contest answer keys (2026 AIME I and II); 28 of 30 agree everywhere, and the two exceptions are resolved below in favour of the official keys.

**Corrections to the upstream table.** Two positions required a decision beyond mirror agreement:

- **AIME II Problem 10** (combined `problem_idx` 25): the upstream table lists `850`, but the **official answer keys give `340`** (Art of Problem Solving, *2026 AIME II Answer Key*; *LIVE by Po-Shen Loh*, 2026 AIME II answer key), and the mirror `thulthula/AIME2026` agrees with the official key. The vendored data uses the official `340`. The raw upstream export is kept verbatim; the fix lives in the `CORRECTIONS` block of `scripts/generate-dataset.mjs` as an asserted correction — a future upstream fix makes the build fail loudly instead of double-correcting.
- **AIME II Problem 1** (combined `problem_idx` 16): the mirror `thulthula/AIME2026` carries `196`, the official key gives `178`, and the mirror's statement differs (it asks for the sum of the 11th terms instead of the 10th). The vendored `178` is correct and unchanged.

## Dataset transform

The vendored data is a deterministic projection of the source table:

```
data/aime_2026.raw.json   (pinned source export)          ->  data/aime_2026.jsonl
```

- `data/aime_2026.raw.json` — 30 records, one per element, a JSON array of `{"problem_idx", "answer", "problem"}` taken verbatim from the `MathArena/aime_2026` parquet. SHA-256 `7975041d4ce0c646944ab923ca7fc361f7711677d0ab06128da539a62a9b59ed`.
- `data/aime_2026.jsonl` — 30 records, one per line, UTF-8, LF endings, SHA-256 `af993e0891a821c9afcfae1493713dc004b79fbd433f6c77e570f8670ba56f8a`:

```json
{"problem_idx":1,"contest":"AIME 2026 I","number":1,"problem":"Patrick started walking at a constant rate along a straight road from school to the park. …","answer":277}
```

- `problem_idx` 1-15 are **AIME 2026 I** problems 1-15; 16-30 are **AIME 2026 II** problems 1-15. `contest` and `number` are the only fields derived from `problem_idx`.
- `problem` is the vendored statement verbatim with surrounding whitespace stripped and line endings normalised to LF — no rewriting, no LaTeX normalisation, no figure stripping.
- `answer` is the published integer (with the documented official-key correction for AIME 2026 II Problem 10 applied — see the corrections section above); anything that is not an integer in 0-999 is rejected at build time.

`scripts/generate-dataset.mjs` (run via `npm run build:dataset`) verifies the raw export SHA-256, then **re-derives** `data/aime_2026.jsonl` from it and checks the derived SHA-256, the record count (30), the `problem_idx`/`contest`/`number` mapping, non-empty statements, integer answers in range, and 30 distinct answers — then emits `lib/generated/problems.ts` with `AIME/0` … `AIME/29`. The derivation is deterministic: re-running the script reproduces both data files byte-for-byte, and a drifted file fails the build instead of silently changing the benchmark.

## Prompting protocol

One chat completion per problem, temperature 0, `max_tokens` 65536, `request_timeout_seconds` 3600, no tools, no few-shot examples, no self-consistency. Two messages:

**System:**

```
You are an expert competition mathematician. Work through the problem carefully, then give your final answer in the required format.
```

**User** (the problem statement is appended verbatim after `Problem:`):

```
Solve the problem step by step. The answer is an integer from 0 to 999. End your response with a final line of the form:

Answer: 123

where 123 is your final answer as an integer.

Problem:
<problem statement, verbatim>
```

`scripts/check-extraction.mjs` asserts the presence of the instruction strings (`Answer: 123`, `The answer is an integer from 0 to 999`) and that the problem text is carried through unchanged, so prompt drift is caught by the fixture suite.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — reasoning answers needing more than ~5 minutes of generation would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 3600 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Answer extraction

Deterministic, layered, and it never guesses. Every layer takes the **last** match in the response, so intermediate reasoning numbers are not misread. The harness reads only the final assistant message.

1. **`\boxed{...}`** — the last `\boxed{…}` group in the response; inside it, the last integer token matching `(\d[\d,]*)(?!\d)(?!\.\d)`.
2. **Answer phrase** — the last match of `\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)` followed by an integer token, case-insensitive (covers `Answer: 70`, `**Answer: 70**`, `the answer is 70.`). The connector may be followed by up to eight formatting characters (`* _ $ ( { } \` and spaces) before the digits.
3. **Fallback** — the last *standalone* integer in the response: `(?<![\d.,])(\d[\d,]*)(?!\d)(?!\.\d)`.

**Normalization** (applied to every captured token):

- thousands commas stripped (`1,234` → 1234) and leading zeros dropped (`023` → 23, `000` → 0); the remainder must be all digits;
- **only values 0-999 are accepted** — anything else is rejected as out of range and the search continues with the next layer;
- `0` is a valid answer and is never conflated with “not found” (the extractor returns `undefined`, not a falsy sentinel);
- a leading minus sign is not part of a captured token (AIME answers are never negative), and a decimal such as `12.5` yields no integer — a fraction of a decimal number is never read as an answer;
- the layer order, not position, decides.

**Failure.** With no acceptable integer the scenario fails (score 0) with the explicit summary

```
unparseable answer - no integer in 0-999 found
```

optionally carrying the rejected-candidate detail (e.g. `\boxed{} candidate rejected: "1,234" -> 1234 is outside 0-999`) and, when `finish_reason` is `length`/`max_tokens`, the hint `(response truncated - raise max_tokens)`. The full response and the extraction notes are stored in each scenario's `rawLog`. An empty response is a failure (`empty response` note), never a skipped item.

## Scoring

- Per problem: `points: 1`, `score: 1` when the extracted integer equals the gold answer, else `0` (including unparseable and provider-error outcomes).
- `totalScore = round(100 × passed / total)` — integer points out of 100. With all 30 problems run, each is worth 3.33 points and the total is rounded (e.g. 27/30 → 90).
- Summary (house style): `accuracy: ${passed}/${total} (${one-decimal pct}%) - ${points} points.` — e.g. `accuracy: 27/30 (90.0%) - 90 points.`
- One category: **`AIME 2026 (accuracy)`** — the same percentage, weighted by the number of problems run.
- No partial credit, no per-contest split: AIME I and AIME II problems are pooled into one 30-problem accuracy figure.
- Provider errors (`provider_error`, retryable) score 0; a retry is the normal remedy.

## Reproducibility

```
npm run build:dataset     # re-derives data/aime_2026.jsonl from the raw export, regenerates lib/generated/problems.ts
npm run build             # tsc -> dist/ (pack) and dist-cli/ (CLI)
npm run typecheck
npm run check:extraction  # -> PASS (48 checks)
npm run probe             # pack probe: 30 scenarios, 2/3 -> 67, 30/30 -> 100, 0/30 -> 0
```

Reproducible checks:

- `npm run build` / `npm run typecheck` — green (TypeScript via `Node16` for the pack, `NodeNext` for the CLI).
- `npm run check:extraction` → `PASS (48 checks)`.
- Mock E2E on port 8214 against `scripts/mock-server.mjs` (five rotating answer formats):
  - default: `Summary: accuracy 30/30 (100%)` / `Pack score: 100 points | accuracy: 30/30 (100.0%) - 100 points.` / `Categories: AIME 2026 (accuracy) = 100 (weight 30)`
  - `--wrong` (gold + 1 mod 1000): 30 × `wrong: answered 71, expected 70` style summaries → `Pack score: 0 points | accuracy: 0/30 (0.0%) - 0 points.`
  - `--empty` (digit-free prose): 30 × `unparseable answer - no integer in 0-999 found` → `Pack score: 0 points`.

The data-file hashes are pinned in the generator; the fixtures re-hash the derived file, so the extracted answers can always be traced back to the exact bytes benchmarked.

## Deviations from upstream evaluation setups

- **Zero-shot single-sample chat.** Public AIME leaderboards (MathArena and others) evaluate with their own harnesses — often multi-sample with majority voting, their own prompt templates, and their own extractors. This pack is deliberately one deterministic sample per problem at temperature 0, with the prompt above; scores are not directly comparable to those leaderboards.
- **Pooled contests, single percentage.** AIME I and AIME II are separate contests; here they are one 30-problem run and one accuracy figure.
- **Own prompt, own extractor.** The mirrors ship no canonical prompt; the wording above is fixed and versioned with the pack. Extraction is mechanical (the three layers); a harness that grades `\boxed{}` only, or that normalises differently, will produce different numbers on the same completions.
- **LaTeX/markup is sent as-is.** Statements are raw LaTeX; figure-bearing problems include figure source rather than rendered images. A model that cannot read markup is disadvantaged relative to a human reading the rendered contest paper.
- **No tools, no code execution** — a pure text benchmark, even though the problems are computational.
- **Truncation is a failure mode.** Chain-of-thought can exhaust `max_tokens` (the 65536 default follows the house escalation history); truncated replies are labelled in the summary so a budget problem is not misread as a maths failure.
- **Provider errors are scored 0** and marked retryable rather than retried automatically inside the pack.
- **Contest label is derived, not published.** The combined source table ships no contest field; the AIME I / AIME II split is deduced from the MathArena AIME-I split (see “Contest partition” above).

## Why this pack has no Docker verifier

Nothing is executed: the model returns an integer, the pack compares it to a published integer. There is no sandbox to build, no test program to run, and therefore no verifier container and no `verifiers[]` entry in the manifest — the whole evaluation is one HTTP request and a deterministic string-to-integer extraction per problem.
