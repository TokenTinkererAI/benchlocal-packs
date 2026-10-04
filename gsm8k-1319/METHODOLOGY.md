# Methodology

This document describes how GSM8K-1319 evaluates models: the benchmark provenance, the dataset pipeline, the prompting and extraction rules, the scoring, how results are reproduced, and the deliberate deviations from the upstream evaluation setups.

## Benchmark provenance

GSM8K ("Training Verifiers to Solve Math Word Problems", Karl Cobbe et al., 2021; arXiv:2110.14168) is a dataset of grade-school math word problems requiring multi-step arithmetic reasoning. The official split ships 7473 training problems and 1319 test problems; each problem has a natural-language reference solution that ends with a `#### ` marker followed by the final numeric answer.

The dataset is vendored from the Hugging Face repository [openai/gsm8k](https://huggingface.co/datasets/openai/gsm8k) — the `main` configuration's `test` split (1319 rows) — and is licensed MIT (© 2021 OpenAI; the upstream repository [openai/grade-school-math](https://github.com/openai/grade-school-math) carries the license text, a copy of which is kept at `data/LICENSE-gsm8k`).

The Hugging Face repository distributes the split as Parquet (`main/test-00000-of-00001.parquet`). The vendored file `data/gsm8k_test.jsonl` was produced once by reading that Parquet file and re-serializing each row as one JSON object per line (`{"question": ..., "answer": ...}`, row order preserved, UTF-8). No row content was modified; only the container format changed:

```
source:     main/test-00000-of-00001.parquet (openai/gsm8k, 1319 rows)
vendored:   data/gsm8k_test.jsonl
sha256:     752adc99f23132275139f1f7be57126b08735a55daf0c56859ee6df70abafbac
```

The vendored file's SHA-256 is pinned in the generator and recorded in the generated dataset module header:

```
752adc99f23132275139f1f7be57126b08735a55daf0c56859ee6df70abafbac
```

### Dataset facts

- 1319 problems. Gold values are the number after the `#### ` marker of the reference answer, normalized (commas stripped; integral values become integers). Every reference answer carries exactly one marker; every gold value is an integer.
- 14 gold values are comma-formatted upstream (e.g. `#### 2,125`, `#### 1,450,000`); 2 are negative (`#### -10`, `#### -3`).
- The dataset's known minor noise is inherited unchanged — see Deviations.

## Dataset transform

`npm run build:dataset` reads the vendored JSONL and emits `lib/generated/problems.ts`. The transform is deterministic — the same input file produces byte-identical output — and enforces:

- the source file matches the pinned SHA-256 above;
- exactly 1319 rows, each a JSON object with non-empty string `question` and `answer` fields;
- every reference answer contains a parseable `#### ` marker (the last one wins, defensively);
- the marker number parses under the same normalization rules the runtime extraction uses.

Each emitted problem carries `id` (`GSM8K/0` … `GSM8K/1318`, upstream row order), `question` (verbatim), and `finalNumber` (the parsed gold value as a number).

## Prompting protocol

The pack uses chat-completions prompting with a zero-shot chain-of-thought instruction and a strict final answer line. Everything is deterministic: one request per problem, `stream: true` with the SSE response accumulated client-side (see Transport).

System message (verbatim):

```
You are a careful math tutor solving grade-school math word problems. Show your step-by-step reasoning, then give the final answer in the required format.
```

User message (template; the problem text is inserted after the first line, and the final-answer instruction is the last thing in the message):

```
Solve the following grade-school math word problem.

<problem>

Think step by step and show your work. End your response with a final line of exactly the form:

Answer: <number>

where <number> is the final numeric answer written as a plain number (no units and no currency symbols; use a minus sign for a negative answer). Write nothing after that final line.
```

Requests go to `<baseUrl>/chat/completions` with `stream: true` and the SSE response accumulated client-side (see Transport); a bearer token is sent only when an API key is configured. Sampling defaults, declared in `benchlocal.pack.json`, are `temperature` 0 and `max_tokens` 16384, with a 900-second request timeout. The request body contains only these fields, plus `top_p` when one is configured. Models that spend the whole budget on hidden reasoning can truncate before the final line; the failure summary says so and points at `max_tokens`.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — reasoning answers needing more than ~5 minutes of generation would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 900 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Answer extraction

The assistant's reply is converted to a number by a deterministic, layered sequence. Earlier layers win, and within every layer the **last** match wins so reasoning that mentions intermediate numbers is not misread:

1. **The `#### ` marker** (the GSM8K reference-answer format). The last occurrence of the marker followed by a number: `####\s*(?:\$\s*)?(-?\d[\d,]*(?:\.\d+)?|-?\.\d+)`.
2. **An answer phrase.** The last match of `answer` followed (within a short same-line gap) by `is / : / = / was / would be / must be / …` and a number, tolerating markdown emphasis and an optional `\boxed{`: `\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)\s*(?:\\boxed\{)?\s*<number>`. The plural guard is built in — `answers` never matches because of the word boundary.
3. **Fallback: the last number anywhere in the response.** The same number pattern, applied to the whole reply.

The number pattern accepts an optional `$`, an optional minus sign (both ASCII `-` and U+2212 are normalized), digits with optional thousands commas, and an optional decimal part:

```
(?:\$\s*)?(-?\d[\d,]*(?:\.\d+)?|-?\.\d+)
```

**Normalization.** The captured text has `$` and commas stripped, then must parse as a plain number (`^-?(?:\d+(?:\.\d+)?|\.\d+)$`), and becomes a JavaScript number — integral values are integers, everything else floats. Comparison is exact numeric equality, so `42`, `42.0` and `1,234` all match their gold `42` / `42` / `1234`.

**No number found** is reported as **unparseable** — a failure with an explicit summary (`unparseable answer - no number found in response`), never a guess. Word numerals ("seven") are not numbers under these rules and do not match. Extraction notes (which layer fired, or why none did, including a last-line excerpt) and the raw reply are kept in the per-problem log.

## Scoring

- Each problem produces a binary result: score 1 when the extracted number equals the gold number, score 0 otherwise (wrong number, unparseable, provider error).
- accuracy = correct / 1319; the run score is that percentage rounded to the nearest integer — **points out of 100**. The summary reads `accuracy: <passed>/<total> (<x.x>%) - <points> points.`
- The results card carries a single category, `GSM8K (accuracy)`.
- Each problem's `points` value is 1, so the detail view reads `1 / 1` for a correct answer.
- Model-call failures (endpoint unreachable, non-OK HTTP status, malformed response) are recorded per problem as `provider_error` with the retryable flag set, and score 0. They are reported, not silently skipped; a run containing provider errors is not a valid accuracy measurement for that model.

## Reproducibility

- `npm run check:extraction` builds the CLI and runs deterministic fixture checks: 19 extraction fixtures (each layer, last-match precedence, comma/negative/decimal normalization, the documented marker-over-answer-phrase layer order, unparseable and empty replies), prompt formatting, and dataset integrity (pinned source SHA-256, 1319 rows, sequential ids, gold spot checks). A passing run ends with `PASS (37 checks)`.
- `node _reference/probe-pack.mjs` loads the compiled pack the way the host does and checks the scoring function: 2/3 → 67, 1319/1319 → 100, 0/1319 → 0, category `GSM8K (accuracy)`.
- The mock server provides end-to-end proof without a model. `node scripts/mock-server.mjs --port 8103` answers all 1319 problems correctly in four rotating formats; a full CLI run against it ends at `accuracy: 1319/1319 (100.0%) - 100 points.` with the extraction layers exercised as marker 330 / answer-phrase 660 / fallback 329. `--wrong` (gold + 1) answers everything wrongly: `accuracy: 0/1319 (0.0%) - 0 points.`, all 1319 summaries reading `wrong: answered X, expected Y`, zero unparseable. `--empty` (prose without any number) yields 1319 `unparseable answer - no number found in response` summaries and `0 points`. The `--out` JSON artifacts are kept under `results/` during development (not shipped in the pack); `node _reference/verify-run.mjs <results.json>` re-derives the status counts and layer usage from one.
- The dataset transform is deterministic and the source SHA-256 is recorded in the generated header, so the evaluated problem set can be re-derived from `data/gsm8k_test.jsonl` and checked.

## Deviations from upstream evaluation setups

Scores from this pack are not expected to match numbers reported by other harnesses exactly. The deliberate differences:

1. **Zero-shot chain-of-thought chat prompting.** The pack targets OpenAI-compatible chat endpoints, so the instruction is a system message and the problem a user message. The GSM8K paper's canonical setup is an 8-shot chain-of-thought completion prompt (eight worked examples followed by the problem); this pack is zero-shot with an explicit step-by-step instruction and a strict final line — the common modern chat setup, and the one that keeps every run single-request and deterministic.
2. **Single sample per problem.** One completion per problem at a fixed setting; no averaging over k samples, no majority vote, no verifier re-ranking.
3. **Strict extraction, in both directions.** A reply whose final number cannot be found fails as `unparseable` instead of being retried, coerced, or repaired; conversely, exact numeric equality is required — no tolerance for roundings. The summary makes the distinction from a wrong answer visible.
4. **Truncation is reported.** When the model hits the output-token cap before producing the final line, the summary appends `(response truncated - raise max_tokens)` so truncated runs are not misread as reasoning failures.
5. **The dataset's known minor noise is inherited.** GSM8K's published test set contains a small number of noisy items (misspelled text, ambiguous or inconsistently stated problems, and a few reference answers whose computation is questionable). The pack vendors the split exactly as published and compares against each reference answer's stated final number — it neither filters nor repairs upstream rows, so those items behave exactly as the published dataset dictates.

## Why this pack has no Docker verifier

BenchLocal can run pack checks inside container-based verifiers for packs that need them (the official CLI-40 and BugFind-15 execution packs use that path because their checks exercise Linux shell behavior). GSM8K needs none of that: the check is extract-a-number-and-compare, pure string handling inside the pack runtime. There is no subprocess, no executed model output, and nothing a container would isolate — the manifest declares `"verification": false` and no Docker installation is needed.

The trust model is correspondingly simple: the pack executes nothing and touches nothing outside the configured inference endpoint and its own results. The only data the pack ships is the vendored test split (MIT, attribution in [NOTICE](NOTICE)).
