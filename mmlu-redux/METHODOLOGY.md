# Methodology

What this pack measures, where the data comes from, how a question becomes a score, and where it deliberately differs from the upstream evaluation setups.

## Benchmark provenance

| Field | Value |
| --- | --- |
| Benchmark | MMLU-Redux (verified subset of MMLU) |
| Paper | *Are We Done with MMLU?* — Aryo Pradipta Gema et al., 2024, arXiv:2406.04127 (NAACL 2025) |
| Dataset | `edinburgh-dawg/mmlu-redux-2.0` (HuggingFace), revision `372ea425445d51e1ba1188c56e5e893f8138621f` |
| Underlying questions | `cais/mmlu` (Hendrycks et al., 2021 — arXiv:2009.03300) |
| Dataset license | CC BY 4.0 (per the dataset card); the underlying `cais/mmlu` questions are MIT |
| Vendored file | `data/mmlu_redux.jsonl` — 5,330 rows, 3,371,018 bytes |
| Vendored sha256 | `618b47dc38f607abf2fde62efd17c1a1474c9c03730a77f58d8803fd232a8ffa` |
| Shuffle salt | `mmlu-redux-shuffle-v1` |

MMLU-Redux re-annotated 100 randomly sampled questions from each of the 57 MMLU subjects (5,700 total) against a published error taxonomy. Each row carries the original MMLU fields plus an `error_type` annotation:

| `error_type` | Meaning | Rows |
| --- | --- | --- |
| `ok` | question presentable, original label verified correct | **5,330 (kept)** |
| `bad_question_clarity` | question unclear, malformed, or missing information | 132 |
| `wrong_groundtruth` | the correct answer differs from the MMLU label | 106 |
| `multiple_correct_answers` | more than one option is defensible | 39 |
| `no_correct_answer` | none of the options answers the question | 36 |
| `expert` | annotators could not decide without deeper expertise | 32 |
| `bad_options_clarity` | options unclear, duplicated, or mis-parsed | 25 |

The per-subject defect rate is uneven and matches the published analysis: Virology keeps only 43 of its 100 questions (57 defective), vs. 100/100 for `college_physics`, `high_school_computer_science`, `high_school_geography`, `high_school_government_and_politics`, `high_school_mathematics`, `high_school_us_history`, `medical_genetics`, and `prehistory`.

### The verified subset

This pack scores **only** `error_type = "ok"` rows: 5,330 questions. The 370 rows whose label or presentation the annotators determined to be defective are not scored, because a correct model answer to such a question would be marked wrong (or a wrong one right) by the published label — the MMLU-Redux paper's whole point. The exclusion is the canonical MMLU-Redux evaluation subset: the questions that survived verification.

The vendored JSONL keeps the seven original upstream columns verbatim (`question`, `choices`, `answer`, `error_type`, `source`, `correct_answer`, `potential_reason`; `null`s preserved) and adds three provenance columns: `subject` (the upstream HF config the row came from), `recordId` (`<subject>#<n>`, 1-based within the subject), and `sourceRowIndex` (row index inside the upstream Arrow file).

### Upstream quirks kept as-is

Six verified-correct questions carry a duplicated option text: `business_ethics#18`, `electrical_engineering#74`, `high_school_physics#53`, `international_law#24`, `public_relations#32`, `sociology#12`. In two of them (`international_law#24`, `sociology#12`) the duplicated text is the gold option itself. All six are kept — they are upstream rows, not pack artifacts — and the gold letter is defined as the shuffled position of the upstream `answer` index (a model that answers with the equal-text duplicate at another position is scored wrong; that is 2 questions out of 5,330). The generated dataset header records all six record IDs, and `scripts/check-extraction.mjs` asserts that the gold option still holds the upstream answer text.

## Dataset transform

`scripts/vendor-dataset.py` (Python 3 + pyarrow) reads the 57 per-subject Arrow files from the pinned HF revision, keeps `error_type == "ok"` rows, and writes `data/mmlu_redux.jsonl`. It asserts the pinned revision, 57 subjects, 100 reviewed rows per subject, 5,700 reviewed rows, 4 choices per kept row, an in-range answer index, and the final count of 5,330.

`scripts/generate-dataset.mjs` (dependency-free Node) then reads that JSONL, verifies its SHA-256 and row count, and emits `lib/generated/problems.ts`:

- **Option shuffle.** For every question the four option *indices* are permuted with Fisher–Yates driven by mulberry32, seeded by `sha256("mmlu-redux-shuffle-v1:<recordId>:<question>")`. The permutation is stored as the final option order and the gold letter is `"ABCD"[permutation.indexOf(answer)]`. Tracking the gold option by index (not by text) is what makes duplicate option texts harmless. The shuffle is deterministic: rebuilding from the same JSONL reproduces the file byte-for-byte.
- **Why shuffle at all.** Upstream MMLU positions are not balanced — the vendored key distribution is A 1,200 / B 1,296 / C 1,365 / D 1,469 — so an unshuffled run would reward (or punish) position bias. After the shuffle the distribution is A 1,258 / B 1,337 / C 1,376 / D 1,359 (each within 10% of 5,330 / 4; asserted in the fixture suite) and the letter spread is recorded in the generated header.
- **Ids and groups.** Questions are emitted in subject-sorted order as `MMLU-Redux/0` … `MMLU-Redux/5329`, each carrying `subject`, `group`, the shuffled `options`, `answerIndex`/`answerLetter`, and the pre-shuffle `upstreamAnswerIndex`.
- **Group mapping.** `scripts/mmlu-subjects.mjs` transcribes the standard MMLU mapping from the upstream MMLU repository's `categories.py` (subject → MMLU subcategory → one of the four canonical groups). The generator asserts that every subject present in the data maps exactly once and that no mapping entry is unused; the fixture suite re-checks it against the generated data.

| Group | Subjects | Questions |
| --- | --- | --- |
| STEM | 18 | 1,714 |
| Humanities | 13 | 1,208 |
| Social sciences | 12 | 1,147 |
| Other | 14 | 1,261 |

## Prompting protocol

Zero-shot chat, single sample, one user turn per question. The prompt is built by `lib/prompts.ts`; verbatim for the first question:

```
[system]
You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.

[user]
The following are multiple choice questions (with answers) about abstract algebra.

Determine whether the polynomial in Z[x] satisfies an Eisenstein criterion for irreducibility over Q. x^2 - 12

A. Yes, with p=5.
B. Yes, with p=3.
C. No.
D. Yes, with p=2.

Answer with a single letter (A, B, C or D). End your response with a final line of the form:

Answer: <LETTER>

where <LETTER> is one of A, B, C or D.
```

- The subject header is the canonical MMLU prompt prefix (`The following are multiple choice questions (with answers) about {subject}.`) with the subject's underscores rendered as spaces (`high_school_european_history` → `high school european history`).
- The question block and the `A.` / `B.` / `C.` / `D.` option labels follow the canonical MMLU format (dot labels, question first, options below).
- The closing instruction asks for a single letter and a final `Answer: <LETTER>` line; the pack's extraction is layered precisely because it must not depend on the model obeying that format. The example placeholder is `<LETTER>`, not a concrete letter, so no answer is leaked by the prompt.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — generations needing more than ~5 minutes would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 3600 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Answer extraction

`lib/extract.ts`, layered and deterministic; the first layer that yields a letter decides, and a reply with no letter in any layer is `unparseable` — never guessed:

1. **`\boxed{X}`** — the last boxed content in the reply, tolerating one level of nested braces (`\boxed{\text{B}}`) and light decoration (parentheses, quotes, markdown emphasis, trailing punctuation).
2. **"Answer: B"-style phrase** — the *last* match of `answer|option|choice` followed (within ≤24 characters) by `is/:/=/–/-/was/were/would be/must be/should be/will be/has to be` and then a letter, case-insensitive, tolerating decoration around the letter. Last-match-wins keeps distractors named mid-reasoning (`B is wrong and D is wrong too`) from being misread.
3. **Standalone final line** — the final non-empty line (fence-only lines filtered, emphasis/brackets/quotes/punctuation stripped) is exactly one letter A–D, covering bare-letter and bracketed `(C)` replies.

Plural/echo guards: `The answers are B and D` and `The answer choices are A, B, C and D` deliberately extract nothing (they are statements *about* options, not answers). The fixture suite (`npm run check:extraction`) exercises every layer, lowercase letters, `(C)` forms, formatting variants, the guards, the unparseable cases and the empty reply; a passing run ends with `PASS (60 checks)`.

## Scoring

- Per question: binary, `points: 1`. `correct`, `wrong`, `unparseable` and `provider_error` all count 0 toward the score unless correct.
- Overall: `totalScore = round(questions correct / 5,330 × 100)` — integer points out of 100; the summary reads `accuracy: <passed>/<total> (<x>%) - <points> points.`
- Categories: the four canonical MMLU groups in fixed order (STEM, Humanities, Social sciences, Other), each with `score = round(passed / group_total × 100)` and `weight = group_total` (1,714 / 1,208 / 1,147 / 1,261). The headline score is the overall accuracy — the group entries are a breakdown, not a weighted average.
- `provider_error` results are marked retryable and score 0. A run containing them is not a clean measurement for that model.

## Reproducibility

```sh
# 1. fetch the pinned dataset revision into the local HF cache (network)
hf download edinburgh-dawg/mmlu-redux-2.0 --repo-type dataset

# 2. rebuild the vendored verified subset (py -3 + pyarrow) — prints the sha256
npm run vendor:dataset

# 3. rebuild the pack's dataset module (asserts the sha256 + count)
npm run build:dataset

# 4. build, typecheck, fixtures
npm run build && npm run typecheck && npm run check:extraction
```

The generator refuses to run if `data/mmlu_redux.jsonl` does not hash to the pinned digest, so a drifted or re-downloaded dataset cannot silently change the benchmark. Regenerating `lib/generated/problems.ts` from the pinned JSONL is byte-identical (deterministic shuffle).

Offline end-to-end proof without a model: `node scripts/mock-server.mjs` (port 8124) answers all 5,330 questions in rotating formats — a full CLI run against it ends at `accuracy: 5330/5330 (100%) - 100 points.`; `--wrong` ends at `0/5330 (0%) - 0 points.` with `wrong: answered X, expected Y` summaries; `--empty` ends at `0/5330 (0%) - 0 points.` with `unparseable answer - no A-D letter found` summaries. Mock replies are streamed as SSE chunks by default (mirroring llama.cpp's `data: {...}` / `data: [DONE]` stream); `--json-only` switches the mock to single-body JSON replies so the client's non-SSE fallback is exercised too.

## Deviations from upstream evaluation setups

1. **Zero-shot, single sample, chat interface.** The canonical MMLU setup (Hendrycks et al.) and the MMLU-Redux paper's own analysis use 5-shot prompting with raw log-likelihood scoring over the four letter continuations, under HELM v1.3.0. This pack uses a zero-shot chat completion at `temperature` 0 and a strict answer format. Absolute scores are therefore not comparable with published MMLU-Redux numbers; the pack measures whether a *chat* model can pick the right option from a short, clearly-formatted prompt.
2. **Deterministic option shuffle.** Upstream keeps the original option order; this pack shuffles it with a fixed salt. The shuffled order is fixed in the compiled dataset, so a run is reproducible, but a model's score may differ slightly from a run on the original order (position bias, and answers that quote option letters).
3. **Text-letter matching instead of likelihood normalization.** The pack reads a letter out of free-form text (three layers, see above). A model that knows the answer but never emits a recognizable letter is scored `unparseable` (a miss, with an explanatory summary) rather than credited via continuation likelihoods.
4. **Chain-of-thought is allowed but not required.** The prompt asks only for a final `Answer: <LETTER>` line, so reasoning models are not penalized for thinking before answering — but reasoning consumes the `max_tokens` budget, and truncated replies surface as `unparseable answer … (response truncated - raise max_tokens)`.
5. **All 5,330 questions, equal weight.** The MMLU-Redux paper reports per-subject and per-error-type analyses over its 5,700 re-annotated questions; this pack reports one overall accuracy plus the four canonical MMLU groups, weighting every kept question equally.

## Trust model

The pack extracts a letter from model output and compares strings. It never executes model output, spawns no subprocess, and needs no container or verifier — the only external interaction is the configured inference endpoint, which the host manages. Data integrity (pinned SHA-256, pinned subject mapping, deterministic shuffle) is enforced at build time and re-checked by the fixture suite, so the shipped artifact's dataset cannot drift from the vendored file without failing the build.
