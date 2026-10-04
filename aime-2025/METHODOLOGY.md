# Methodology

This document is the contract for the AIME-2025 pack: where the data comes from, how it is transformed, the exact prompt and extraction rules, how scoring works, and where this pack deviates from other AIME evaluation setups.

## Benchmark provenance

**The benchmark.** The 2025 American Invitational Mathematics Examination — AIME I (administered 2025-02-05) and AIME II (administered 2025-02-12), 15 problems each, run by the MAA / AMC program. By contest rule every answer is an integer from 000 to 999; the pack scores those integers by exact match.

**Vendored source.** `MathArena/aime_2025` (Hugging Face dataset, revision `c94da77eb22bbd6439e62a323bec18493a421302`), the question set behind the MathArena leaderboard. It is a 30-row table with `problem_idx`, `problem` (LaTeX source), `answer` (int64) and `problem_type`; it is licensed CC BY-NC-SA 4.0. File hash and card terms are reproduced in [`data/LICENSE-aime`](data/LICENSE-aime).

**Cross-check.** Two further independent public mirrors were downloaded and compared problem-for-problem:

| Source | Revision | Answer for all 30 |
|---|---|---|
| `MathArena/aime_2025` (vendored) | `c94da77e…` | integers, `problem_idx` 1-30 |
| `opencompass/AIME2025` (`aime2025-I.jsonl` + `aime2025-II.jsonl`) | `a6ad95f6…` | identical, as strings (one entry is `336^\circ` → 336) |
| `yentinglin/aime_2025` (`data` split, 15 + 15) | `6f71d77b…` | identical |

**All 30 gold answers are identical in the three mirrors** (per-index comparison; zero mismatches). Problem statements were compared textually as well: they agree in mathematical content, differing only typographically — math-mode spacing (`$b>9$` vs `$ b>9 $`), brace style (`$17_b$` vs `$17_{b}$`), hyphenation, and equivalent LaTeX commands (`\le`/`\leq`, `\dots`/`\cdots`, `\emph`/`\textit`, `\widehat`/`\wideparen`). Two content-level notes, both handled:

- The `opencompass` mirror's answer for 2025 AIME II Problem 5 is the string `336^\circ` (the integer 336 with a degrees annotation). Both other mirrors carry the integer `336`; the annotation was stripped for the comparison and is not part of the vendored data.
- The vendored MathArena text includes TikZ/Asymptote source for the 5 figure-bearing problems (indices 1, 10, 17, 19, 20) and keeps the sentence referring to the figure (`One example is shown below …`), matching what the MathArena leaderboard feeds to models. The `opencompass` mirror omits figure environments; no mathematical content is lost between the two.

No statement differs in any numeric value or condition between the mirrors (checked after removing figure environments and normalising digit grouping).

## Dataset transform

`data/aime_2025.jsonl` — 30 records, one per line, UTF-8, LF endings, SHA-256 `90f729b5500adc6c1c6b69182a97d205cf8f57da7e8a8fbf02c6fafc693ab68e`:

```json
{"problem_idx":1,"contest":"AIME 2025 I","number":1,"problem":"Find the sum of all integer bases $b>9$ for which $17_b$ is a divisor of $97_b$.","answer":70}
```

- `problem_idx` 1-15 are **AIME 2025 I** problems 1-15; 16-30 are **AIME 2025 II** problems 1-15 (`contest`/`number` are the only fields derived from `problem_idx`; they are re-verified at build time).
- `problem` is the vendored statement **verbatim** — no rewriting, no LaTeX normalisation, no figure stripping.
- `answer` is the published integer; the generator rejects anything that is not an integer in 0-999.

`scripts/generate-dataset.mjs` (run via `npm run build:dataset`) verifies the source SHA-256, the record count (30), the `problem_idx`/`contest`/`number` mapping, non-empty statements, integer answers in range, and 30 distinct answers — then emits `lib/generated/problems.ts` with `AIME/0` … `AIME/29`. A drifted data file fails the build; it cannot silently change the benchmark.

## Prompting protocol

One chat completion per problem, temperature 0, `max_tokens` 16384, `request_timeout_seconds` 900, no tools, no few-shot examples, no self-consistency. Two messages:

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

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — reasoning answers needing more than ~5 minutes of generation would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 900 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

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
- a captcha of leading text is irrelevant: the layer rules, not position, decide.

**Failure.** With no acceptable integer the scenario fails (score 0) with the explicit summary

```
unparseable answer - no integer in 0-999 found
```

optionally carrying the rejected-candidate detail (e.g. `\boxed{} candidate rejected: "1,234" -> 1234 is outside 0-999`) and, when `finish_reason` is `length`/`max_tokens`, the hint `(response truncated - raise max_tokens)`. The full response and the extraction notes are stored in each scenario's `rawLog`. An empty response is a failure (`empty response` note), never a skipped item.

## Scoring

- Per problem: `points: 1`, `score: 1` when the extracted integer equals the gold answer, else `0` (including unparseable and provider-error outcomes).
- `totalScore = round(100 × passed / total)` — integer points out of 100. With all 30 problems run, each is worth 3.33 points and the total is rounded (e.g. 27/30 → 90).
- Summary (house style): `accuracy: ${passed}/${total} (${one-decimal pct}%) - ${points} points.` — e.g. `accuracy: 27/30 (90.0%) - 90 points.`
- One category: **`AIME 2025 (accuracy)`** — the same percentage, weighted by the number of problems run.
- No partial credit, no per-contest split: AIME I and AIME II problems are pooled into one 30-problem accuracy figure.
- Provider errors (`provider_error`, retryable) score 0; a retry is the normal remedy.

## Reproducibility

```
npm run build:dataset     # verifies data sha256 + 30 records, regenerates lib/generated/problems.ts
npm run build             # tsc -> dist/ (pack) and dist-cli/ (CLI)
npm run typecheck
npm run check:extraction  # -> PASS (48 checks)
npm run probe             # pack probe: 30 scenarios, 2/3 -> 67, 30/30 -> 100, 0/30 -> 0
```

The shipped checks and their expected results:

- `npm run build` / `npm run typecheck` — green.
- `npm run check:extraction` → `PASS (48 checks)`.
- Mock E2E on port 8122 against `scripts/mock-server.mjs` (five rotating answer formats):
  - default: `[... 30/30] Summary: accuracy 30/30 (100%)` / `Pack score: 100 points | accuracy: 30/30 (100.0%) - 100 points.` / `Categories: AIME 2025 (accuracy) = 100 (weight 30)`
  - `--wrong` (gold + 1 mod 1000): 30 × `wrong: answered 71, expected 70` style summaries → `Pack score: 0 points | accuracy: 0/30 (0.0%) - 0 points.`
  - `--empty` (digit-free prose): 30 × `unparseable answer - no integer in 0-999 found` → `Pack score: 0 points`.

The data file hash is pinned in the generator; the fixtures re-hash it, so the extracted answers can always be traced back to the exact bytes benchmarked.

## Deviations from upstream evaluation setups

- **Zero-shot single-sample chat.** Public AIME leaderboards (MathArena and others) evaluate with their own harnesses — often multi-sample with majority voting, their own prompt templates, and their own extractors. This pack is deliberately one deterministic sample per problem at temperature 0, with the prompt above; scores are not directly comparable to those leaderboards.
- **Pooled contests, single percentage.** AIME I and AIME II are separate contests; here they are one 30-problem run and one accuracy figure.
- **Own prompt, own extractor.** The mirrors ship no canonical prompt; the wording above is fixed and versioned with the pack. Extraction is mechanical (the three layers); a harness that grades `\boxed{}` only, or that normalises differently, will produce different numbers on the same completions.
- **LaTeX/markup is sent as-is.** Statements are raw LaTeX; the 5 figure-bearing problems include figure source rather than rendered images. A model that cannot read markup is disadvantaged relative to a human reading the rendered contest paper.
- **No tools, no code execution** — a pure text benchmark, even though the problems are computational.
- **Truncation is a failure mode.** Chain-of-thought can exhaust `max_tokens` (the 16384 default follows the house escalation history); truncated replies are labelled in the summary so a budget problem is not misread as a maths failure.
- **Provider errors are scored 0** and marked retryable rather than retried automatically inside the pack.

## Why this pack has no Docker verifier

Nothing is executed: the model returns an integer, the pack compares it to a published integer. There is no sandbox to build, no test program to run, and therefore no verifier container and no `verifiers[]` entry in the manifest — the whole evaluation is one HTTP request and a deterministic string-to-integer extraction per problem.
