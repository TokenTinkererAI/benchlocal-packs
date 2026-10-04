# Methodology

What this pack measures, where the data comes from, how a question becomes a score, and where it deliberately differs from the upstream evaluation setups.

## Benchmark provenance

| Field | Value |
| --- | --- |
| Benchmark | MMLU-Pro |
| Paper | *MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark* — Yubo Wang et al., 2024, arXiv:2406.01574 (NeurIPS 2024) |
| Dataset | `TIGER-Lab/MMLU-Pro` (HuggingFace), revision `b189ec765aa7ed75c8acfea42df31fdae71f97be`, `data/test-00000-of-00001.parquet` |
| Dataset license | MIT (per the dataset card, `license: mit`); the upstream *code* repo ships Apache-2.0 for its scripts |
| Vendored file | `data/mmlu_pro.jsonl` — 12,032 rows, 9,535,676 bytes |
| Vendored sha256 | `9dccf55b5718bffbf705bc19b8757274267e07d16af6a56c831cf5e8fb00069e` |
| Source parquet sha256 | `0e24a191921c2f453518a537a8b2117bd137e7714d4ef1565e9ba06c1ecb9ad8` |
| Shuffle salt | `mmlu-pro-shuffle-v1` |

MMLU-Pro builds on MMLU by holding the questions to a higher difficulty bar and raising the choice count from four to ten. The evaluation split ships 12,032 questions across 14 disciplines; the 70-question `validation` split (used upstream for few-shot exemplars) is not vendored or scored. Questions come from four sub-corpora, recorded per row in `src`:

| `src` prefix | Rows | Meaning |
| --- | --- | --- |
| `ori_mmlu-*` | 6,810 | retained (non-trivial, unambiguous) original MMLU questions |
| `stemez-*` | 4,083 | hand-picked STEM website problems |
| `theoremQA-*` | 598 | TheoremQA questions |
| `scibench-*` | 541 | SciBench college-exam questions |

### Dataset notes (verified against the pinned revision)

- **Option counts vary.** The original release carried ten option slots with `"N/A"` placeholders for reduced questions; by the pinned revision upstream had already removed those placeholders (the `[2026.01.18]` note in the dataset card records the trailing fix; the `N/A` strings are absent from the parquet entirely). The vendored rows therefore carry 3–10 real options: `{10: 9981, 9: 801, 4: 606, 8: 320, 7: 158, 6: 93, 5: 52, 3: 21}`. All are kept as-is; the pack labels them `A.` … with the natural letters and the gold letter is the shuffled position of the upstream `answer_index`.
- **`cot_content` is empty in this revision.** Every test row's `cot_content` field is an empty string. It is vendored verbatim (field kept, value empty) but unused: the pack is zero-shot and does not use upstream CoT exemplars.
- **`answer` / `answer_index` agree on every row**, `question_id` is unique, no question or option text is empty, and 231 question *texts* recur (with different option sets) — none of the rows share an identical (question, options) pair, so every prompt string in a run is distinct.
- **License note.** The dataset card declares MIT for the data (copy at `data/LICENSE-mmlu-pro`). The GitHub evaluation-code repo's `LICENSE` is Apache-2.0; that license covers code, not the dataset file vendored here. The question text itself is compiled by TIGER-Lab from MMLU (MIT), STEM websites, TheoremQA and SciBench — see [NOTICE](../NOTICE).

## Dataset transform

`scripts/vendor-dataset.py` (Python 3 + pyarrow) reads the test parquet from the pinned HF snapshot, verifies the pinned revision directory name and the parquet SHA-256, asserts 12,032 rows, 14 categories, 3–10 options per row, a non-empty question/option/`src`/`category` per row, an in-range `answer_index` matching the `answer` letter, and writes `data/mmlu_pro.jsonl` with the upstream fields verbatim in upstream column order: `question_id, question, options, answer, answer_index, cot_content, category, src`.

`scripts/generate-dataset.mjs` (dependency-free Node) then reads that JSONL, verifies its SHA-256 and row count, and emits `lib/generated/problems.ts`:

- **Option shuffle.** For every question the option *indices* are permuted with Fisher–Yates driven by mulberry32, seeded by `sha256("mmlu-pro-shuffle-v1:<questionId>:<question>")`. The permutation is stored as the final option order and the gold letter is `"ABCDEFGHIJ"[permutation.indexOf(answer_index)]`. Tracking the gold option by index (not by text) is what makes the placement exact even when a question has fewer than ten options. The shuffle is deterministic: rebuilding from the same JSONL reproduces the file byte-for-byte.
- **Why shuffle at all.** Upstream MMLU-Pro positions are not balanced — the vendored key distribution is A 1,403 / B 1,352 / C 1,314 / D 1,336 / E 1,149 / F 1,128 / G 1,182 / H 1,115 / I 1,108 / J 945 — so an unshuffled run would reward (or punish) position bias. After the shuffle the distribution is A 1,354 / B 1,398 / C 1,332 / D 1,294 / E 1,182 / F 1,098 / G 1,114 / H 1,123 / I 1,103 / J 1,034 (each within 20% of 12,032 / 10; asserted in the fixture suite). Tail letters sit structurally below the mean because a question with *k* options can only reach letter `A+k-1` — e.g. only 9,981 questions can produce a `J`. The spread is recorded in the generated header.
- **Ids and categories.** Questions are emitted in upstream row order as `MMLU-Pro/0` … `MMLU-Pro/12031`, each carrying the upstream `question_id`, `category`, `src`, the shuffled `options`, `answerIndex`/`answerLetter`, and the pre-shuffle `upstreamAnswerIndex`. The category list is the 14 official disciplines in their first-appearance order in the data (`business, law, psychology, biology, chemistry, history, other, health, economics, math, physics, computer science, philosophy, engineering`), used verbatim as result-card categories with question counts as weights.

## Prompting protocol

Zero-shot chat, single sample, one user turn per question. The prompt is built by `lib/prompts.ts`; verbatim for the first question:

```
[system]
You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.

[user]
Answer the following multiple choice question. Think step by step and then finish your answer with "The answer is (X)" where X is the correct letter choice.

Question: Typical advertising regulatory bodies suggest, for example that adverts must not: encourage _________, cause unnecessary ________ or _____, and must not cause _______ offence.

Options:
A. Unsafe practices, Wants, Fear, Trivial
B. Safe practices, Wants, Fear, Serious
...
I. Safe practices, Fear, Jealousy, Trivial

Answer:
```

(The option list above is elided for space; the real prompt carries every option of the question, labeled `A.` … `I.` in this example's case, `A.` … `J.` for ten-option questions.)

The instruction replicates the core of the official MMLU-Pro evaluation prompt. The upstream repo's `cot_prompt_lib/initial_prompt.txt` reads, verbatim:

```
The following are multiple choice questions (with answers) about {$}. Think step by step and then finish your answer with "the answer is (X)" where X is the correct letter choice.
```

and the API evaluators (`evaluate_from_api.py`, `evaluate_from_apiX.py`) use the per-category variant, verbatim:

```
The following are multiple choice questions (with answers) about {category}. Think step by step and then output the answer in the format of "The answer is (X)" at the end.
```

followed by five CoT exemplars from the `validation` split and a final `Answer: ` continuation cue. This pack keeps the core requirement (`Think step by step` → finish with `The answer is (X)`) but is **zero-shot**: the 5-shot CoT exemplars are dropped, the category header is not used (a question's discipline is not leaked into its prompt), the question is presented as `Question:` + an `Options:` list with `A.`–`J.` labels, and the message ends with the upstream `Answer:` cue. The placeholder is `(X)`, not a concrete letter, so no answer is leaked.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — generations needing more than ~5 minutes would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 900 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Answer extraction

`lib/extract.ts`, layered and deterministic; the first layer that yields a letter decides, and a reply with no letter in any layer is `unparseable` — never guessed:

1. **`\boxed{X}` / `\fbox{X}`** — the last boxed content in the reply, tolerating one level of nested braces (`\boxed{\text{B}}`) and light decoration (parentheses, quotes, markdown emphasis, trailing punctuation).
2. **"Answer: B"-style phrase** — the *last* match of `answer|option|choice` followed (within ≤24 characters) by `is/:/=/–/-/was/were/would be/must be/should be/will be/has to be` and then a letter A–J, case-insensitive, tolerating decoration around the letter. The official MMLU-Pro format `The answer is (X)` is a first-class case of this layer — the parentheses around the letter are decoration, and `(J)` is extracted like any other letter. Last-match-wins keeps distractors named mid-reasoning (`B is wrong and D is wrong too`) from being misread.
3. **Standalone final line** — the final non-empty line (fence-only lines filtered, emphasis/brackets/quotes/punctuation stripped) is exactly one letter A–J, covering bare-letter and bracketed `(C)` replies.

The official evaluators extract differently — first `re.search(r"answer is \(?([A-J])\)?", text)`, then `re.search(r'.*[aA]nswer:\s*([A-J])', text)`, then a last-standalone-letter regex — and silently fall back to a *random guess* when all three fail (`update_result` in `evaluate_from_api.py`). This pack deliberately deviates on two points: the phrase layer takes the **last** match (not the first, which can catch a distractor mentioned mid-reasoning), and an extraction failure is reported as `unparseable` with a note rather than being randomized into a score.

Plural/echo guards: `The answers are B and D`, `The answer choices are A, B, C and D` and `The correct answer is among the options B and C.` deliberately extract nothing (they are statements *about* options, not answers). The fixture suite (`npm run check:extraction`) exercises every layer, the official `(X)` form, lowercase letters, the highest letter `J`, boxed variants, last-occurrence-wins, the guards, the unparseable cases and the empty reply; a passing run ends with `PASS (68 checks)`.

## Scoring

- Per question: binary, `points: 1`. `correct`, `wrong`, `unparseable` and `provider_error` all count 0 toward the score unless correct.
- Overall: `totalScore = round(questions correct / 12,032 × 100)` — integer points out of 100; the summary reads `accuracy: <passed>/<total> (<x>%) - <points> points.`
- Categories: the 14 disciplines in data order, each with `score = round(passed / category_total × 100)` and `weight = category_total` (789 / 1,101 / 798 / 717 / 1,132 / 381 / 924 / 818 / 844 / 1,351 / 1,299 / 410 / 499 / 969). The headline score is the overall accuracy — the category entries are a breakdown, not a weighted average.
- `provider_error` results are marked retryable and score 0. A run containing them is not a clean measurement for that model.

## Reproducibility

```sh
# 1. fetch the pinned dataset revision into the local HF cache (network)
hf download TIGER-Lab/MMLU-Pro --repo-type dataset

# 2. rebuild the vendored test split (py -3 + pyarrow) — prints the sha256
npm run vendor:dataset

# 3. rebuild the pack's dataset module (asserts the sha256 + count)
npm run build:dataset

# 4. build, typecheck, fixtures
npm run build && npm run typecheck && npm run check:extraction
```

The generator refuses to run if `data/mmlu_pro.jsonl` does not hash to the pinned digest, so a drifted or re-downloaded dataset cannot silently change the benchmark. Regenerating `lib/generated/problems.ts` from the pinned JSONL is byte-identical (deterministic shuffle).

Offline end-to-end proof without a model: `node scripts/mock-server.mjs` (port 8125) answers questions in rotating formats — a full CLI run against it ends at `accuracy: 12032/12032 (100%) - 100 points.`; `--wrong` ends at `0/12032 (0%) - 0 points.` with `wrong: answered X, expected Y` summaries; `--empty` ends at `0/12032 (0%) - 0 points.` with `unparseable answer - no A-J letter found` summaries. All three full runs are part of the release checks. Mock replies are streamed as SSE chunks by default (mirroring llama.cpp's `data: {...}` / `data: [DONE]` stream); `--json-only` switches the mock to single-body JSON replies so the client's non-SSE fallback is exercised too.

## Deviations from upstream evaluation setups

1. **Zero-shot, single sample, chat interface.** The MMLU-Pro paper and leaderboard evaluate with 5-shot CoT prompting (per-category exemplars from the validation split) and the official letter extraction; some leaderboard entries use 0-shot. This pack uses a zero-shot chat completion at `temperature` 0 with a strict answer format and no exemplars. Absolute scores are therefore not comparable with published MMLU-Pro numbers; the pack measures whether a *chat* model can pick the right option from a single, clearly-formatted prompt.
2. **No 5-shot CoT exemplars.** The upstream `initial_prompt.txt` / API prompts are followed by five worked CoT examples per category. Those examples are not used (and the 70-row validation split is therefore not vendored).
3. **Deterministic option shuffle.** Upstream keeps the original option order; this pack shuffles it with a fixed salt. The shuffled order is fixed in the compiled dataset, so a run is reproducible, but a model's score may differ slightly from a run on the original order (position bias, and answers that quote option letters). The `Answer:` cue and the instruction are unchanged by the shuffle.
4. **Text-letter matching instead of likelihood normalization / verifier protocols.** The pack reads a letter out of free-form text (three layers, see above). A model that knows the answer but never emits a recognizable letter is scored `unparseable` (a miss, with an explanatory summary) rather than credited via continuation likelihoods, and unlike the upstream API evaluator it is never replaced by a random guess.
5. **All 12,032 questions, equal weight.** Upstream reports micro-averaged accuracy and per-category breakdowns; this pack reports one overall accuracy plus the 14 discipline breakdowns, weighting every question equally.
6. **Chain-of-thought is allowed but not required.** The prompt asks only for a final `The answer is (X)` line, so reasoning models are not penalized for thinking before answering — but reasoning consumes the `max_tokens` budget, and truncated replies surface as `unparseable answer … (response truncated - raise max_tokens)`.

## Trust model

The pack extracts a letter from model output and compares strings. It never executes model output, spawns no subprocess, and needs no container or verifier — the only external interaction is the configured inference endpoint, which the host manages. Data integrity (pinned SHA-256, pinned revisions, deterministic shuffle) is enforced at build time and re-checked by the fixture suite, so the shipped artifact's dataset cannot drift from the vendored file without failing the build.
