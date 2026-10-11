# Methodology

This document describes how API-Bank evaluates models in this pack: the benchmark provenance, exactly which scenarios are included and excluded, the dataset transform, how APIs are declared to the model, the tool-calling loop and its turn cap, the in-process mock API layer, the transport, **the exact grading rules**, the scoring, how results are reproduced, and the deliberate deviations from the upstream evaluation setup.

## Benchmark provenance

API-Bank ("API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs", Minghao Li et al., EMNLP 2023; arXiv:2304.08244) evaluates a model's ability to plan, retrieve and call APIs across three escalating levels:

1. **Level 1 — API calling.** A dialogue and a small set of API descriptions are given; the model must produce the correct API call with correct arguments. One call per record.
2. **Level 2 — API retrieval + calling.** The model is given only a search tool; it must retrieve the right API from the library (`ToolSearcher`) and then call it (a dialogue may also require a credential-retrieval call first).
3. **Level 3 — planning with multiple calls.** A single-sentence requirement plus an API box; the model must plan and execute a whole sequence of calls (search → call → search → call …).

The data is vendored from the HuggingFace distribution [`liminghao1630/API-Bank`](https://huggingface.co/datasets/liminghao1630/API-Bank) at the pinned revision `12e8158b7628c168f07e8f31fbbe3445e99f44cf`, under the **MIT** license (© 2022 Alibaba Research; upstream project [AlibabaResearch/DAMO-ConvAI — api-bank](https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/api-bank)). A copy of the license text is kept at `data/LICENSE-apibank`.

Vendored files and their SHA-256 (verified by `scripts/generate-dataset.mjs` on every build and recorded in the generated header of `lib/generated/scenarios.ts`):

```
data/level-1-api.json   0d3155c5495399836b5b1f1cc4eb6d5d50efa16b2734af50a016a158e9dd79bb
data/level-2-api.json   c61966448d9d5cf98334f39b44c0db1fe5a9c6c84a1f53e652f4aacdbbfc5da0
data/level-3.json       29542493a302915303d5d67f868282ddda46fa15ba059a4bcf38c6687be29d55
```

## Included and excluded scenarios

The pack ships **498 scenarios** — every API-call record in the three vendored files:

| Level | Source file | Scenarios | What each scenario contains |
| --- | --- | --- | --- |
| 1 — single call | `data/level-1-api.json` | 399 | The dialogue + the API descriptions listed for that record; exactly **1** expected call. |
| 2 — retrieve then call | `data/level-2-api.json` | 49 | One scenario per upstream dialogue file: the full dialogue transcript; the expected sequence is the file's step sequence — `ToolSearcher` retrieval, an optional credential call, then the task call (**1–3** calls). |
| 3 — multi-call planning | `data/level-3.json` | 50 | The requirement sentence; the expected sequence is the record's whole plan including its `ToolSearcher` retrieval steps (**4–8** calls). |

Expected-call totals: 399 (level 1) + 119 (level 2) + 245 (level 3) = 763 calls.

**What is deliberately excluded, and why:**

- `test-data/level-1-response.json`, `test-data/level-2-response.json` and `test-data/level-3-batch-inf-response.json` are the *response-generation* halves of the benchmark: upstream scores them with ROUGE-L against a reference natural-language answer. They contain no API-call ground truth, so a call-sequence pack cannot grade them deterministically. Excluded.
- `test-data/level-3-batch-inf.json` and `test-data/level-3-batch-inf-icl.json` are the same 50 level-3 samples **flattened into 245 per-step inference rows each** (one row per call, carrying only that step's context), plus a batched prompt/instruction and, for the `-icl` variant, an injected few-shot example. Grading them as separate scenarios would count the same calls twice and grade per-step prompts rather than a plan; the pack instead grades the complete plan from `level-3.json`. Excluded.
- The `-icl` variant additionally changes the prompting protocol (few-shot exemplar inside the instruction). Rather than adopt a few-shot prompt for one third of level 3, the pack uses a single consistent zero-shot tool-calling protocol for every level. Excluded.

Nothing else in `test-data/` is skipped: all 399 level-1 call records and all 49 level-2 dialogue files are evaluated.

## Dataset transform

`npm run build:dataset` verifies each vendored file's SHA-256 and emits `lib/generated/scenarios.ts`. The transform is deterministic — identical input produces a byte-identical file — and performs:

- **API-definition extraction.** Level-1 and level-2 records embed API cards as JSON in the instruction (`API descriptions:` block); level-2 and level-3 records also carry cards inside recorded `ToolSearcher` results. All cards are normalized to `{ name, description, parameters, outputs }` and merged into a single `API_DEFS` table keyed by API name. Where a name appears with different definitions across records, the definition with the most declared parameters is kept (15 API names hit this case); APIs that appear only as a call target get a minimal `{ name }` definition (none do — every expected API has a declared card).
- **Level-2 step reconstruction.** The level-2 file is a flat list of per-step rows; rows are grouped by upstream `file` (one dialogue each), ordered by how many `API-Request:` steps precede them, and de-duplicated by step index. This turns the flat rows back into the dialogue's ordered call sequence. The scenario's context is the longest row's transcript with all `API-Request: …` and `Generate API Request:` segments stripped — so the model never sees the answer keys or the tool results it is supposed to obtain by calling.
- **Mock-result harvesting.** Every `[Name(args)]->RESULT` continuation in the file's rows is parsed (a tolerant single-quoted Python-literal reader; the dataset is not pure JSON) into a `{ name, args, output }` record. Level 3 takes its recorded results directly from each record's `apis[].output.output`. These records seed the mock API layer.
- **Catalog construction.** Each scenario's `toolNames` is the set of APIs declared or revealed in it (plus `ToolSearcher` for levels 2 and 3).

The generated module header records the three source SHA-256 values, so the evaluated set can be re-derived from the vendored files and checked.

## Declaring APIs as tools

Each scenario's APIs are converted to OpenAI function-tool schemas (`lib/prompts.ts`): the API name becomes the function name, the API description the function description, and the declared `input_parameters` become an object schema with one property per parameter (types mapped from the dataset's `str`/`list(str)`/`float`/… declarations).

Which tools are visible changes as the scenario proceeds — this is the retrieval mechanic:

- **Level 1:** the record's API cards are all declared from the first turn (the API is "in hand", as upstream intends).
- **Levels 2 and 3:** only `ToolSearcher` is declared initially. When the model calls it, the APIs in the returned cards are added to the tool list for subsequent turns. A model that never searches cannot call the task API — exactly the level-2/3 skill the benchmark measures.

The system prompt explains this workflow ("if the API you need is not in your tool list yet, call ToolSearcher first; its result reveals the matching API"). It also carries a short marker line `Scenario: <id>.` so the offline mock server can identify the scenario; the marker carries no information about the expected calls.

## Tool-calling loop and turn cap

`lib/orchestrator.ts` runs the loop: build `[system, user]`, then repeatedly request a completion with the currently visible tools; append the assistant's `tool_calls` message and one `tool` message per call carrying that call's mock result; reveal any APIs a `ToolSearcher` result points at; repeat. The loop ends when the model answers without tool calls, or when **`MAX_TURNS = 16`** assistant turns have been used. The cap is documented here because it is part of the measurement: level 3's longest expected plan is 8 calls, so 16 turns is slack for a couple of re-searches, and a model that loops without converging is cut off and graded on what it produced. A capped run is labelled `(turn cap reached)` in the raw log.

Every executed call is recorded with its parsed arguments, whether or not the arguments were valid JSON; a call whose arguments fail to parse is recorded as unparsed and cannot match.

## Mock API layer

Grading never needs network access and the pack never contacts a live API. `lib/mock-api.ts` is a deterministic in-process layer over the dataset:

1. **Recorded result.** If the dataset records a result for the requested `(api, arguments)` pair (arguments compared with the same normalization grading uses), that result is returned verbatim — e.g. a `GetUserToken` call returns the token the dataset recorded, so a later call can use it.
2. **`ToolSearcher`.** Served by a deterministic keyword search over the scenario's own catalog: the query and each API's name/description are split into lowercase alphanumeric tokens (CamelCase-aware), APIs are scored by shared tokens, and the top matches are returned as API cards. If nothing matches, the whole catalog is returned so a browsing model is never stuck.
3. **Placeholder.** Any other call returns a deterministic type-shaped placeholder derived from the API's declared outputs.

Same call in, same result out: no clock, no randomness, no network. Because every graded scenario draws its catalog and results from the dataset, a full run is reproducible bit-for-bit.

## Transport

Requests go to `<baseUrl>/chat/completions` with `stream: true`, the `tools` array, and `tool_choice: "auto"`; a bearer token is sent only when an API key is configured. The SSE response is accumulated client-side. This is deliberate: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming servers do not send headers until generation finishes, so long reasoning would otherwise fail with `fetch failed` regardless of `request_timeout_seconds`. With streaming, headers arrive immediately and only the pack's own timeout (default 3600 s) and the caller's abort signal remain.

Tool calls are reassembled from **streamed `tool_calls` deltas**: fragments are keyed by their OpenAI `index`, the function name is merged (whole-name or streamed fragments both work), and argument fragments are concatenated, so several parallel calls in one turn reassemble independently. A server that ignores `stream` (or a proxy that buffers the stream) is still supported: a non-SSE `application/json` body is accepted as a fallback and `message.tool_calls` is read from it. Both paths are exercised offline — the mock server streams `tool_call` deltas by default and `--json-only` switches it to single-body JSON replies.

## Grading rules

A scenario passes when the **executed call sequence matches the dataset's expected sequence**. The comparison is per call, in order:

1. **Length.** The model must have made exactly as many calls as the expected sequence. Too few or too many fails, and the summary names both counts (and how many leading calls matched).
2. **Tool name.** Exact, case-sensitive equality with the expected API name.
3. **Argument keys.** The set of argument keys must be exactly the expected set — no missing keys, no extra keys.
4. **Argument values.** Each expected argument must satisfy the value rule below.

An executed call whose argument string was not valid JSON never matches.

### Value normalization

- **Text scalars** compare equal when equal after: Unicode NFC normalization → trimming → collapsing internal whitespace runs to one space → lowercasing. So `"Dr. Lee"` matches `"dr. lee"`, and stray double spaces do not fail an otherwise correct answer.
- **Numbers** compare numerically, and a numeric string equals its number: `"10"` matches `10`, `10` matches `10.0`.
- **Booleans** compare case-insensitively.
- **Lists** compare as multisets of normalized elements — same length, same elements, order-insensitive (`["Mary", "Peter"]` matches `["Peter", "Mary"]`). This covers `attendees`, `preferences` and similar list parameters.
- **`ToolSearcher.keywords`** uses a retrieval-tolerant rule. Both sides are reduced to lowercase `[a-z0-9]` only (so `Query Meeting`, `QueryMeeting` and `query-meeting` collapse to the same string); they match when equal or when one contains the other. So `history October 6th` matches `history October 6`, and `Query Stock` matches `QueryStock`. This reflects that the search is judged on whether it finds the right API, not on the exact wording.
- **Free-text parameters** are compared for **presence only**: a string argument is treated as free text when it is four or more whitespace-separated tokens long and is not a date (`YYYY-MM-DD[ HH:MM:SS]`), a time, an e-mail address or a URL. `EmailReminder.content` (`"Meeting with the client will be held at Room 1. Please be there on time."`) is the parameter this actually affects: any non-empty body counts, because scoring the model's prose is not what the benchmark measures. `keywords` is explicitly excluded from this rule and always graded with the retrieval-tolerant rule above.

Everything else — dates, times, tokens, names, IDs, currencies, formulas, addresses — is graded strictly (after the text normalization above). A scenario with no executed call fails with `no tool call was produced`; a sequence of the wrong length fails with `called N API(s), expected M`; a wrong call fails with the position, the offending tool name or argument, and the expected value.

A scenario is binary: `pass` (full sequence match, score 1) or `fail` (score 0). There is no partial credit — the benchmark's unit is "did the model complete this task's call sequence".

### Deviation from upstream grading

Upstream API-Bank executes the predicted call against a live tool runtime and compares the *returned result* with the recorded one (its `check_api_call_correctness`); it also uses ROUGE-L for the response-generation steps. This pack cannot ship that runtime, so it grades the **call sequence and arguments** instead, using the normalization above to absorb surface differences. The practical differences: a call that would return the right result via a differently-spelled-but-equivalent argument still passes here (the normalization covers case/whitespace/order), while a call with the right API name but wrong argument *values* fails here even if upstream's runtime might have tolerated it — this pack is, if anything, stricter on arguments and more lenient on wording. The response-generation halves of the benchmark are out of scope (see Included/excluded above), so ROUGE-L plays no part.

## Scoring

- Each scenario produces a binary result: score 1 on a full sequence match, score 0 otherwise.
- accuracy = passed / 498; the run score is that percentage **rounded to the nearest integer — points out of 100**. The summary reads `tool-call accuracy: <passed>/<total> (<x>%) - <points> points.`
- The results card breaks the accuracy down per level (`level-1` / `level-2` / `level-3`) with scenario counts as weights. The headline score is the overall accuracy.
- Each scenario's `points` value is 1, so the detail view reads `1 / 1` for a passing scenario.
- Model-call failures (endpoint unreachable, non-OK HTTP status, malformed response) are recorded per scenario as `provider_error` with the retryable flag set, and score 0. They are reported, not silently skipped; a run containing provider errors is not a valid accuracy measurement for that model.
- Sampling defaults, declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 65536, request timeout 3600 s. Long reasoning models can spend the budget before emitting a call; when a reply is cut off by the token cap the summary appends `(response truncated - raise max_tokens)` and the log records `finish_reason: length`.

## Reproducibility

- `npm run build:dataset` is deterministic (verified: two consecutive runs produce a byte-identical `lib/generated/scenarios.ts`) and re-checks the three source SHA-256 values; a fresh download of the pinned revision re-derives the vendored files byte-for-byte.
- `npm run check:extraction` builds the CLI and runs 96 deterministic fixture checks covering: the dataset syntax parsers, grading normalization and every value rule, tool-call delta accumulation and the JSON fallback, the mock API layer (recorded results, live search, harmless unknown calls), prompt/tool-schema shaping, dataset integrity (498 scenarios, level counts, every expected API defined and in its catalog, retrieval scenarios starting with `ToolSearcher`, recorded results present where the plan needs them) and score aggregation (100 / 0 / 67 points, summary format). A passing run ends with `PASS (96 checks)`.
- `node _reference/verify-e2e.mjs` is the offline end-to-end proof, run against the pack's own tools-aware mock server on `http://127.0.0.1:8223/v1` (not shipped in the artifact). It runs the full CLI four times and requires each mode to land exactly:
  - `correct` → **498/498 (100%) — 100 points**;
  - `correct --json-only` → **498/498** (non-SSE tool-call fallback);
  - `--wrong` (the mock calls a bogus API) → **0/498**, every failure `tool NotATool != <expected>`;
  - `--empty` (the mock never calls a tool) → **0/498**, every failure `no tool call was produced`.
  The script prints `E2E-DONE` only when all four modes match.
- The generated dataset header pins the source SHA-256 values, so the evaluated scenario set can be re-derived from the vendored files and independently checked.

## Trust model

The pack executes **no model-generated code**. Model output is parsed as tool calls, arguments are parsed as JSON, and the calls are dispatched to an in-process mock layer that reads only the dataset — there is no subprocess, no shell, no filesystem write, and no network access other than the configured OpenAI-compatible inference endpoint. The only data the pack ships is the vendored API-Bank subsets (MIT, attribution in [NOTICE](NOTICE)) and the code in this repository.

## Deviations from upstream evaluation setups

1. **Native tool calling instead of text API requests.** Upstream prompts the model to print `[ApiName(...)]` text and parses it with a regular expression. This pack declares the APIs through the chat API's `tools` parameter and reads `tool_calls` from the answer — the interface modern endpoints actually expose — which removes regex parsing as a failure source and makes argument values arrive as typed JSON.
2. **Retrieval as dynamic tool exposure.** Upstream returns the retrieved API as text appended to the context. Here a `ToolSearcher` result adds the retrieved APIs to the tool list; the retrieval step is graded as a call in the expected sequence.
3. **Argument-sequence grading, not result grading.** See the deviation note under Grading rules.
4. **Response-generation steps excluded.** The ROUGE-L halves of the benchmark are not evaluated (see Included/excluded).
5. **Zero-shot, single-sample.** One run per scenario at a fixed setting; no few-shot exemplars (including the level-3 `-icl` variant's exemplar), no averaging over k samples.
6. **`MAX_TURNS = 16` cap.** Upstream dialogues are finite by construction; a looping model here is bounded and graded on the calls it produced.

## Why this pack has no Docker verifier

BenchLocal can run pack checks inside container-based verifiers for packs that need a real Linux environment. API-Bank needs none of that here: the APIs are served by an in-process, dataset-backed mock layer and grading is a call-sequence comparison inside the pack runtime. There is no subprocess and nothing a container would isolate, so the manifest declares `"verification": false` and no Docker installation is required.
