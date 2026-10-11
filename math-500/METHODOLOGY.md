# Methodology

This document is the contract for the MATH-500 pack: where the data comes from, how it is transformed, the exact prompt, extraction and normalization rules, how scoring works, and where this pack deviates from other MATH evaluation setups.

## Benchmark provenance

**The benchmark.** MATH-500 is the 500-problem test subset of **MATH**, the competition-mathematics dataset introduced in *"Measuring Mathematical Problem Solving With the MATH Dataset"* (Hendrycks, Burns, Kadavath, Arora, Basart, Tang, Song, Steinhardt — 2021, arXiv:2103.03874). The subset was assembled by OpenAI for *"Let's Verify Step by Step"* (Lightman, Kosaraju, Burda, Edwards, Baker, Lee, Leike, Schulman, Sutskever, Cobbe — 2023, arXiv:2305.20050) and published with the PRM800K data. It spans seven MATH subject areas — Algebra, Counting & Probability, Geometry, Intermediate Algebra, Number Theory, Prealgebra, Precalculus — and MATH difficulty levels 1-5; every problem has a short, closed-form answer (a number, expression, interval, tuple or word), which is what makes a text-answer benchmark out of it.

**Vendored source.** [HuggingFaceH4/MATH-500](https://huggingface.co/datasets/HuggingFaceH4/MATH-500) (Hugging Face dataset), revision `6e4ed1a2a79af7d8630a6b768ec859cb5af4d3be`, file `test.jsonl`: 500 rows with `problem`, `solution`, `answer`, `subject`, `level`, `unique_id`. The vendored `data/math_500.jsonl` is a **byte-identical** copy of that file — SHA-256 `35dc41080a3680858b27fa7e0533d2d547825316fc5dafe5d316f4ccc5a06132` on both sides (verified during vendoring by hashing the upstream blob and the copy). Licenses and full provenance are reproduced in [`data/LICENSE-math`](data/LICENSE-math).

**License.** MATH is **MIT**, Copyright © 2021 Dan Hendrycks (`hendrycks/math`). The MATH-500 subset was published by OpenAI under the MIT-licensed `openai/prm800k` repository, Copyright © 2023 OpenAI. Both upstream license texts are stored in `data/LICENSE-math`.

**Provenance cross-check.** The MATH-500 card describes the set as "a subset of 500 problems from the MATH benchmark that OpenAI created in their *Let's Verify Step by Step* paper", pointing at `openai/prm800k#math-splits`; the vendored file's `unique_id` field (`test/<subject-slug>/<n>.json`) confirms each row's MATH origin. The generator asserts the hash, the row count, the field set, the seven subject names, levels 1-5 and uniqueness of `unique_id`, so a drifted or substituted file fails the build.

## Dataset transform

`data/math_500.jsonl` — 500 records, one per line, UTF-8, LF endings, SHA-256 `35dc41080a3680858b27fa7e0533d2d547825316fc5dafe5d316f4ccc5a06132`. One record (first line, abridged in the `solution` field):

```json
{"problem":"Convert the point $(0,3)$ in rectangular coordinates to polar coordinates.  Enter your answer in the form $(r,\\theta),$ where $r > 0$ and $0 \\le \\theta < 2 \\pi.$","solution":"We have that $r = \\sqrt{0^2 + 3^2} = 3.$ ...","answer":"\\left( 3, \\frac{\\pi}{2} \\right)","subject":"Precalculus","level":2,"unique_id":"test/precalculus/807.json"}
```

- `problem` is the statement **verbatim** — no rewriting, no LaTeX normalization, no figure stripping. Figure-bearing problems include their Asymptote/TikZ source, exactly as upstream publishes it.
- `answer` is the published gold answer string, **verbatim**. It is a short LaTeX expression: numbers (`42`, `-50`, `10,\!080`), fractions (`\frac{14}{3}`), radicals (`3\sqrt{13}`), intervals (`(2,\infty)`), tuples (`(6,31,-1)`), units/annotations (`90^\circ`), matrices and words (`\text{east}`). The pack never "repairs" these strings.
- `subject`, `level`, `unique_id` are kept for integrity checks, the per-scenario card labels and the per-subject score breakdown.
- `solution` (the worked solution) stays in the vendored file for traceability but is **never** sent to the model or used as a reference during a run.

`scripts/generate-dataset.mjs` (run via `npm run build:dataset`) verifies the source SHA-256, the record count (500), the presence of all six fields, non-empty `problem` and `answer`, the seven known subjects, integer levels 1-5, and 500 distinct `unique_id` values — then emits `lib/generated/problems.ts` with `MATH/0` … `MATH/499` (upstream row order), each carrying `problem`, `answer`, `subject`, `level`. A drifted data file fails the build; it cannot silently change the benchmark. The generated header records the source SHA-256 and the Hugging Face revision.

**Distribution in the vendored order:** Algebra 124, Counting & Probability 38, Geometry 41, Intermediate Algebra 97, Number Theory 62, Prealgebra 82, Precalculus 56 (500 total); levels: 1 → 43, 2 → 90, 3 → 105, 4 → 128, 5 → 134.

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

1. **`\boxed{...}`** — the content of the **last balanced** `\boxed{…}` group. The braces are matched by depth counting (backslash-escaped characters skipped), so nested groups such as `\boxed{\frac{1}{2}}` or `\boxed{3\sqrt{13}}` are captured whole and never greedily merged with later text. If the last `\boxed{` is unbalanced, the search continues with the previous one; a balanced but empty box (`\boxed{}`) is noted and does not stop the search.
2. **Answer phrase** — the last usable match of `\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)[ \t]{0,8}` (case-insensitive); the candidate is the **remainder of that line**, cut at the first sentence boundary (`. ` — decimal points are unaffected). Only spaces may follow the connective, so a leading `\` or `(` belongs to the answer (`The answer is \frac{11}{2}.` → `\frac{11}{2}`). When several phrases match, the **last** one wins, so `Answer: 12, but on reflection the answer is 70` yields `70`.
3. **Fallback** — the **last non-empty line**, stripped of surrounding `$`/markdown emphasis and trailing punctuation (`. , ; : ! ?`), but otherwise kept **raw** so normalization decides. This is what makes a bare `\left( 3, \frac{\pi}{2} \right)` or `east` final line usable.

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
7. degree annotations removed: `^{\circ}`, `^\circ` and the `°` sign — `90^\circ` == `90`;
8. ` .` → ` 0.`, `{.` → `{0.`, and a leading `.` gets a `0` — `.5` == `0.5`;
9. all whitespace removed — `a + b` == `a+b`;
10. a short leading assignment is dropped: exactly one `=`, left side ≤ 2 characters — `x = 5` == `5`;
11. `\sqrt3` → `\sqrt{3}` (a maximal digit run is braced; already-braced roots untouched);
12. `\frac12` → `\frac{1}{2}` (already-braced fractions untouched);
13. thousands separators removed — a comma between digits followed by exactly three digits: `1,024` == `1024`, `11,\! 111,\! 111,\! 100` == `11111111100`; commas in tuples and lists are left alone (`(6,31,-1)` and `1,-2` keep their commas, consistently on both sides);
14. a trailing `.` is stripped, then a trailing `.0` — `42.` == `42`, `18.0` == `18`.

Where this differs from common practice, and the consequences (documented so results are read correctly):

- **No symbolic equivalence.** `0.5` ≠ `\frac{1}{2}`, `\frac{14}{3}` ≠ `14/3`, `\sqrt{2}` ≠ `1.4142...`, `1/2` is not converted to `\frac{1}{2}` unless written that way. A mathematically correct reply written in a different form can score 0.
- **Word answers are only matched textually.** `\text{east}` == `east`, but "half"-style or prose equivalents are not translated (`one half` ≠ `\frac{1}{2}`); such replies are reported wrong (or unparseable when they read as sentences), never guessed.
- **Units are dropped from both sides**, so `42\text{ cm}` == `42`, but also `42\text{ cm}` == `42\text{ m}`.
- **Subscripts, matrices, intervals and set notation are compared as written** (after the rules above); no structural math parsing is attempted.
- The trailing-`.` / trailing-`.0` handling follows the intent of the reference pipeline; the reference code's literal `.` → `0` replacement (which would turn `42.` into `420`) is deliberately not reproduced, because it corrupts values.
- `\mathrm{…}`, `\operatorname{…}`, `\mathbf{…}` and other wrapper commands are **not** unwrapped.

## Scoring

- Per problem: `points: 1`, `score: 1` when the extracted candidate normalizes to the same string as the gold answer, else `0` (including unparseable and provider-error outcomes).
- `totalScore = round(100 × passed / total)` — integer points out of 100. With all 500 problems run, each problem is worth 0.2 points and the total is rounded.
- Summary (house style): `accuracy: ${passed}/${total} (${one-decimal pct}%) - ${points} points.` — e.g. `accuracy: 412/500 (82.4%) - 82 points.`
- Categories: one per MATH subject, in the fixed order **Algebra, Counting & Probability, Geometry, Intermediate Algebra, Number Theory, Prealgebra, Precalculus**; each category scores that subject's accuracy (rounded) with `weight` = number of problems run in it. Subjects with no results are omitted.
- No partial credit: an answer is right or wrong, and an unparseable reply is a failure, not a skip.
- Provider errors (`provider_error`, retryable) score 0; a retry is the normal remedy.

## Reproducibility

```
npm run build:dataset     # verifies data sha256 + 500 records, regenerates lib/generated/problems.ts
npm run build             # tsc -> dist/ (pack) and dist-cli/ (CLI)
npm run typecheck
npm run check:extraction  # -> PASS (66 checks)
npm run probe             # pack probe: 500 scenarios, 2/3 -> 67, 500/500 -> 100, 0/500 -> 0
```

The shipped checks and their expected results:

- `npm run build` / `npm run typecheck` — green.
- `npm run check:extraction` → `PASS (66 checks)` (20 extraction fixtures, 21 normalization match/differ fixtures, prompt and dataset integrity checks).
- Mock E2E on port 8123 against `scripts/mock-server.mjs` (three rotating answer formats: `\boxed{}`, `The answer is …`, bare final line):
  - default: `Summary: accuracy 500/500 (100%)` / `Score: accuracy: 500/500 (100.0%) - 100 points.` / all seven subject categories at 100;
  - `--wrong` (a different value that stays wrong after normalization): 500 × `wrong: answered …, expected …` summaries → `Score: accuracy: 0/500 (0.0%) - 0 points.`;
  - `--empty` (candidate-free prose): 500 × `unparseable answer - no boxed, phrase or final-line candidate found in response` → `Score: accuracy: 0/500 (0.0%) - 0 points.`
- Probe (`_reference/probe-pack.mjs`, loads `dist/` the way the host does): 500 scenarios; `score 2/3: 67`; `score 500/500: 100`; `score 0/500: 0`; subject categories present with their weights.

The data file hash is pinned in the generator; the fixtures re-hash it, so the extracted answers can always be traced back to the exact bytes benchmarked.

## Deviations from upstream evaluation setups

- **Zero-shot single-sample chat.** The MATH paper and most public leaderboards evaluate with their own harnesses — frequently few-shot prompts, sometimes multiple samples with majority voting, and their own answer extractors and graders (often sympy-based). This pack is deliberately **one deterministic sample per problem at temperature 0**, with the prompt above; scores are not directly comparable to those leaderboards or to the `math_verify`-style numbers derived from the same completions.
- **Textual answer comparison, not symbolic.** The pack compares normalized strings (see above) instead of evaluating mathematical equivalence. Expect it to be **stricter** than a sympy/`math_verify` grader on equivalent-but-differently-written answers (`0.5` vs `\frac{1}{2}`) and effectively identical where the answer is a plain number.
- **Own prompt, own extractor.** MATH-500 ships no canonical prompt; the wording above is fixed and versioned with the pack. Extraction is mechanical (the three layers plus the sentence guard); a harness that grades `\boxed{}` only, or that normalizes differently, will produce different numbers on the same completions.
- **LaTeX/markup is sent as-is.** Statements are raw LaTeX; figure-bearing problems include their Asymptote/TikZ source rather than rendered images. A model that cannot read markup is disadvantaged relative to a human reading the rendered problem.
- **No tools, no code execution** — a pure text benchmark, even though the problems are computational and some answers (radicals, intervals, matrices) are unwieldy to reproduce exactly.
- **Truncation is a failure mode.** Chain-of-thought can exhaust `max_tokens` (the 65536 default follows the house escalation history); truncated replies are labelled in the summary so a budget problem is not misread as a maths failure.
- **Provider errors are scored 0** and marked retryable rather than retried automatically inside the pack.

## Why this pack has no Docker verifier

Nothing is executed: the model returns an answer string, the pack normalizes it and compares it to a published string. There is no sandbox to build, no test program to run, and therefore no verifier container and no `verifiers[]` entry in the manifest — the whole evaluation is one HTTP request plus a deterministic string pipeline per problem.
