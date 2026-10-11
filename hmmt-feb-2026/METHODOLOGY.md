# Methodology

This document is the contract for the HMMT-Feb-2026 pack: where the data comes from, how it is transformed, the exact prompt, extraction and normalization rules, how scoring works, the answer-key cross-check, and where this pack deviates from other HMMT evaluation setups.

## Benchmark provenance

**The benchmark.** The **HMMT February 2026** tournament is the harder of the two annual sittings of the Harvard-MIT Mathematics Tournament, a student-run competition organised by students of Harvard University and the Massachusetts Institute of Technology. The February 14, 2026 sitting has individual subject rounds — Algebra & Number Theory, Combinatorics and Geometry — plus a Team round and a Guts round. This pack covers the **33 short-answer problems** for which a single closed-form answer exists: the 10 Algebra & Number Theory problems, the 10 Combinatorics problems, the 10 Geometry problems, and three short-answer Team-round problems (numbers 2, 3 and 5).

**Vendored source.** [MathArena/hmmt_feb_2026](https://huggingface.co/datasets/MathArena/hmmt_feb_2026) (Hugging Face dataset), revision `02fba4f74d8e68e73e66a02d540fd979c05c274c`, file `data/train-00000-of-00001.parquet` (33 rows, SHA-256 `e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916`). It is the question set used for the MathArena leaderboard (ETH Zurich, `github.com/eth-sri/matharena`). Licence **CC BY-NC-SA 4.0**; terms and full provenance are reproduced in [`data/LICENSE-hmmt`](data/LICENSE-hmmt).

**Source schema** (four columns, one row per problem):

| column | type | meaning |
|---|---|---|
| `problem_idx` | int64 | problem index in the published set, 1..33 (sequential) |
| `problem` | string | problem statement, LaTeX source verbatim |
| `answer` | string | official final answer, verbatim (`"-\frac{1}{21}"`, `"420261"`, `"5\sqrt{5}"`, `"74^\circ"`, `"3^{2025}"`, …) |
| `problem_type` | list[string] | category labels, one or more of Algebra, Number Theory, Combinatorics, Geometry |

## Answer-key cross-check (authoritative)

Every gold answer was verified against the **official HMMT February 2026 published solutions**, fetched from the HMMT archive (`hmmt.org/www/archive/292` → `hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/…`):

| round | official PDF | SHA-256 |
|---|---|---|
| Algebra & Number Theory | `algnt/solutions.pdf` | `f90d8c81724646e8f7167dd1326e4f6f406b4c2af850ad1d2b239eb9e470d814` |
| Combinatorics | `comb/solutions.pdf` | `a298ab37630c16a047d29d4f43139cbc32136fa1830b9d7ded4b968314894627` |
| Geometry | `geo/solutions.pdf` | `1dc246db1ae8507b8e83c7acf55e755b0225a95e60f46187801f019817e7f124` |
| Team | `team/solutions.pdf` | `0da24d26719f51e9c5df3e315c6cfa7391088e65543f5ab496677190d9b2fc3c` |

The pairing of the 33 vendored rows to the official source is by problem statement; per-problem the rows map as **HMMT/0–HMMT/9 = Algebra & Number Theory 1–10, HMMT/10–HMMT/19 = Combinatorics 1–10, HMMT/20–HMMT/29 = Geometry 1–10, HMMT/30–HMMT/32 = Team 2, 3, 5**.

**Result: all 33 gold answers agree with the official published solutions** (compared as exact published values, e.g. `2 − \frac{\pi}{2}` for Combinatorics 6, `√1740⁄3` for Geometry 10, `3^{2025}` for Team 2). No disagreement was found; nothing was silently adjusted.

## Dataset transform

`scripts/derive-dataset.py` downloads the pinned parquet, verifies its SHA-256, and projects it into the vendored `data/hmmt_feb_2026.jsonl` — 33 records, one per line, UTF-8, LF endings, SHA-256 `fbcd8e4f4325f98ec90c9064119c3f4f8b423de81b548643f43e0d725e5a71d4`. One record:

```json
{"problem_idx":1,"problem":"A line intersects the graph of \\( y = x^2 + \\frac{2}{x} \\) at three distinct points. ...","answer":"-\\frac{1}{21}","problem_type":["Algebra"]}
```

- `problem` and `answer` are **verbatim** — no rewriting, no LaTeX normalization, no figure stripping. Statements carry their math delimiters as upstream publishes them (some use `$…$`, some `\(…\)`); figure-bearing problems include their Asymptote/TikZ source.
- `problem_type` values have **surrounding whitespace stripped** — the upstream list carries a leading space on every entry after the first (`["Combinatorics", " Geometry"]`), which is a serialization artifact. This is the only value-level transform applied.
- The transform is deterministic, so re-running `derive-dataset.py` against the same pinned revision reproduces the vendored file byte-for-byte (verified: identical SHA-256 before and after).

`scripts/generate-dataset.mjs` (run via `npm run build:dataset`) then verifies the vendored SHA-256, the record count (33), sequential `problem_idx` 1..33, non-empty `problem` and `answer`, a non-empty `problem_type` whose labels are all in the known set — and emits `lib/generated/problems.ts` with `HMMT/0` … `HMMT/32` (upstream row order), each carrying `problem`, `answer`, `number` and `types`. The generated header records the source revision, the parquet SHA-256 and the vendored SHA-256. A drifted data file fails the build; it cannot silently change the benchmark.

**Distribution (multi-label).** Problem-type labels counted per problem: Algebra 5, Number Theory 8, Combinatorics 12, Geometry 12 (some problems carry two labels). Problems: 33, all gold answers pairwise distinct after normalization.

## Prompting protocol

One chat completion per problem, temperature 0, `max_tokens` 65536, `request_timeout_seconds` 3600, no tools, no few-shot examples, no self-consistency. Two messages:

**System:**

```
You are an expert competition mathematician. Work through the problem carefully, then give your final answer in the required format.
```

**User** (the problem statement is appended verbatim after `Problem:`):

```
Solve the problem step by step, showing your full reasoning. End your response with a final line of the form:

\boxed{answer}

where answer is your final answer written as a LaTeX expression (for example \boxed{\frac{3}{4}} or \boxed{42}). Write nothing after that final line.

Problem:
<problem statement, verbatim>
```

`scripts/check-extraction.mjs` asserts the presence of the instruction strings (`\boxed{answer}`, the closing sentence), that the answer instruction precedes the problem block and that the problem text is carried through unchanged, so prompt drift is caught by the fixture suite.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — reasoning answers needing more than ~5 minutes of generation would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 3600 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Answer extraction

Deterministic, layered, and it never guesses. It reads only the final assistant message; every layer produces a raw candidate string that goes through the normalizer before comparison. Layers 2 and 3 additionally refuse a candidate that reads like an English sentence (`looksLikeSentence`: two or more consecutive alphabetic words of ≥3 letters after removing LaTeX commands, or a line longer than 120 characters) — an explanatory final sentence is not an answer.

1. **`\boxed{...}`** — the content of the **last balanced** `\boxed{…}` group. The braces are matched by depth counting (backslash-escaped characters skipped), so nested groups such as `\boxed{\frac{1}{21}}` or `\boxed{5\sqrt{5}}` are captured whole and never greedily merged with later text. If the last `\boxed{` is unbalanced, the search continues with the previous one; a balanced but empty box (`\boxed{}`) is noted and does not stop the search.
2. **Answer phrase** — the last usable match of `\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)[ \t]{0,8}` (case-insensitive); the candidate is the **remainder of that line**, cut at the first sentence boundary (`. ` — decimal points are unaffected). Only spaces may follow the connective, so a leading `\` or `(` belongs to the answer (`The answer is \frac{875}{128}.` → `\frac{875}{128}`). When several phrases match, the **last** one wins.
3. **Fallback** — the **last non-empty line**, stripped of surrounding `$`/markdown emphasis and trailing punctuation (`. , ; : ! ?`), but otherwise kept **raw** so normalization decides. This is what makes a bare `\sqrt{17} - 1` or `2 - \frac{\pi}{2}` final line usable.

Candidates get one more light trim (unwrapping a whole-spanning `\boxed{}`, `$`, `*`/`_`, trailing punctuation) before normalization.

**Failure.** With no acceptable candidate the scenario fails (score 0) with the explicit summary

```
unparseable answer - no boxed, phrase or final-line candidate found in response
```

optionally carrying ` (response truncated - raise max_tokens)` when `finish_reason` is `length`/`max_tokens`. An empty response is a failure (`empty response` note), never a skipped item. The full response, the gold answer and the extraction notes are stored in each scenario's `rawLog`.

## Normalization — TEXTUAL, and a deliberate limitation

Both the prediction and the gold answer go through the same `stripString` pipeline (Minerva / LightEval `strip_string` tradition, in `lib/normalize.ts`) and the two results are compared with `===`. **Nothing is evaluated**: no sympy, no `math_verify`, no numeric parsing, no code execution. This is a deliberate design choice (no execution surface, no Python, no Docker) and a deliberate **limitation**: two mathematically equal answers written differently are graded as different whenever the canonical forms differ.

Rules, in order:

1. line breaks normalized, then `\!` (LaTeX negative thin space) removed — `10,\!080` → `10,080`;
2. `\\` row separators collapsed to `\`;
3. `\left` / `\right` removed;
4. `\dfrac` / `\tfrac` → `\frac`;
5. `\text{…}` / `\mbox{…}` handled brace-matched (nested-safe): a group whose content starts with a space is a **unit annotation** and is dropped (`42\text{ cm}` → `42`); any other group is **unwrapped** to its content (`\text{east}` → `east`);
6. `$` and `\$`, `\%` and `%` removed (percent handling is identical on both sides: `50\%` == `50`);
7. degree annotations removed: `^{\circ}`, `^\circ` and the `°` sign — `74^\circ` == `74`;
8. ` .` → ` 0.`, `{.` → `{0.`, and a leading `.` gets a `0` — `.5` == `0.5`;
9. all whitespace removed — `a + b` == `a+b`;
10. a short leading assignment is dropped: exactly one `=`, left side ≤ 2 characters — `x = 5` == `5`;
11. `\sqrt3` → `\sqrt{3}` (a maximal digit run is braced; already-braced roots untouched);
12. `\frac12` → `\frac{1}{2}` (already-braced fractions untouched);
13. thousands separators removed — a comma between digits followed by exactly three digits: `1,024` == `1024`; commas in tuples and lists are left alone, consistently on both sides;
14. a trailing `.` is stripped, then a trailing `.0` — `42.` == `42`, `18.0` == `18`.

Where this differs from common practice, and the consequences (documented so results are read correctly):

- **No symbolic equivalence.** `0.5` ≠ `\frac{1}{2}`, `\frac{14}{3}` ≠ `14/3`, `\sqrt{2}` ≠ `1.4142...`, `1/2` is not converted to `\frac{1}{2}` unless written that way. A mathematically correct reply written in a different form can score 0. HMMT answers include fractions, radicals and a power (`3^{2025}`), so this matters: a model that answers Geometry 3 as `11.1803...` instead of `5\sqrt{5}` is scored wrong.
- **Word answers are only matched textually.** `\text{east}` == `east`, but prose equivalents are not translated (`one half` ≠ `\frac{1}{2}`); such replies are reported wrong (or unparseable when they read as sentences), never guessed.
- **Units are dropped from both sides**, so `42\text{ cm}` == `42`, but also `42\text{ cm}` == `42\text{ m}`.
- **Subscripts, intervals and set notation are compared as written** (after the rules above); no structural math parsing is attempted.
- The trailing-`.` / trailing-`.0` handling follows the intent of the reference pipeline; the reference code's literal `.` → `0` replacement (which would turn `42.` into `420`) is deliberately not reproduced, because it corrupts values.
- `\mathrm{…}`, `\operatorname{…}`, `\mathbf{…}` and other wrapper commands are **not** unwrapped.

## Scoring

- Per problem: `points: 1`, `score: 1` when the extracted candidate normalizes to the same string as the gold answer, else `0` (including unparseable and provider-error outcomes).
- `totalScore = round(100 × passed / total)` — integer points out of 100. With all 33 problems run, each problem is worth ~3.03 points and the total is rounded.
- Summary (house style): `accuracy: ${passed}/${total} (${one-decimal pct}%) - ${points} points.` — e.g. `accuracy: 27/33 (81.8%) - 82 points.`
- One category, `HMMT Feb 2026 (accuracy)`, weighted by the number of problems run.
- No partial credit: an answer is right or wrong, and an unparseable reply is a failure, not a skip.
- Provider errors (`provider_error`, retryable) score 0; a retry is the normal remedy.

## Reproducibility

```
npm run build:dataset     # verifies data sha256 + 33 records, regenerates lib/generated/problems.ts
npm run build             # tsc -> dist/ (pack) and dist-cli/ (CLI)
npm run typecheck
npm run check:extraction  # -> PASS (74 checks)
npm run probe             # pack probe: 33 scenarios, 2/3 -> 67, 33/33 -> 100, 0/33 -> 0
node _reference/verify-e2e.mjs   # mock E2E on port 8221: correct -> 100, wrong -> 0, empty -> 0
```

The data file hash is pinned in the generator; the fixtures re-hash it, so the extracted answers can always be traced back to the exact bytes benchmarked.

## Deviations from upstream evaluation setups

- **Zero-shot single-sample chat.** MathArena and most public leaderboards evaluate with their own harnesses and their own answer extractors and graders. This pack is deliberately **one deterministic sample per problem at temperature 0**, with the prompt above; its scores are not directly comparable to the MathArena HMMT leaderboard or to a `math_verify`-style grader.
- **Textual answer comparison, not symbolic.** The pack compares normalized strings (see above) instead of evaluating mathematical equivalence. Expect it to be **stricter** than a sympy/`math_verify` grader on equivalent-but-differently-written answers (`0.5` vs `\frac{1}{2}`) and effectively identical where the answer is a plain integer.
- **Own prompt, own extractor.** HMMT ships no canonical chat prompt; the wording above is fixed and versioned with the pack. Extraction is mechanical (the three layers plus the sentence guard); a harness that grades `\boxed{}` only, or that normalizes differently, will produce different numbers on the same completions.
- **LaTeX/markup is sent as-is.** Statements are raw LaTeX; figure-bearing problems include their Asymptote/TikZ source rather than rendered images. A model that cannot read markup is disadvantaged relative to a human reading the rendered problem.
- **Pooled rounds.** The 33 problems pool four rounds with very different difficulty; the aggregate percentage mixes them. The Team-round problems are proof-style with a short numerical final answer.
- **No tools, no code execution** — a pure text benchmark, even though the problems are computational and some answers (radicals, a large power) are unwieldy to reproduce exactly.
- **Truncation is a failure mode.** Chain-of-thought can exhaust `max_tokens` (the 65536 default follows the house escalation history); truncated replies are labelled in the summary so a budget problem is not misread as a maths failure.
- **Provider errors are scored 0** and marked retryable rather than retried automatically inside the pack.

## Why this pack has no Docker verifier

Nothing is executed: the model returns an answer string, the pack normalizes it and compares it to a published string. There is no sandbox to build, no test program to run, and therefore no verifier container and no `verifiers[]` entry in the manifest — the whole evaluation is one HTTP request plus a deterministic string pipeline per problem.
