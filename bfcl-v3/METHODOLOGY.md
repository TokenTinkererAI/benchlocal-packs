# Methodology

This document describes how BFCL-v3 evaluates models: the benchmark provenance, which categories are in scope and under which grading rules, the dataset transform, the prompting and transport, the scoring, how results are reproduced, and the deliberate deviations from upstream.

## Benchmark provenance

BFCL is the **Berkeley Function Calling Leaderboard** (Fanjia Yan, Huanzhi Mao, Charlie Cheng-Jie Ji, Tianjun Zhang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez; UC Berkeley). It evaluates a model's ability to emit correct function (tool) calls across single-turn, multi-turn and live categories, and in several programming languages.

The dataset is vendored from the HuggingFace dataset [`gorilla-llm/Berkeley-Function-Calling-Leaderboard`](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard) at the pinned revision

```
61fc0608cfd831fcfbbaa676ebdfef0ed963eeda
```

and is licensed **Apache-2.0** (a copy of the upstream license is kept at `data/raw/LICENSE`). Each vendored file is byte-identical to the pinned revision; its SHA-256 is recorded below and in `data/raw/REVISION`. The generator refuses to run if any file's hash drifts.

| Vendored file | SHA-256 |
| --- | --- |
| `BFCL_v3_simple.json` | `fbc37b2ad252bf9af985582e0e07b456173fe627d957491472ea9cef5fb83158` |
| `BFCL_v3_multiple.json` | `aef168155ebd74b7ac2401198b201343bc7d16d7a3d7e0d4e6d8ee82c6969b2a` |
| `BFCL_v3_parallel.json` | `fad375d68295776efb63e5aa331dd884f8635e7bb50e05908113c74f14281c3c` |
| `BFCL_v3_parallel_multiple.json` | `8863ea8433239f55c5f016154cf0830853c89f693c6ea270396a2fa121960579` |
| `BFCL_v3_irrelevance.json` | `975f51c51f688649fd190078efd87081241e0a326f9114a2ea3c1ca2440d8690` |
| `BFCL_v3_sql.json` | `2cf021e2e4f81f1097aab31763423b785b3aaa73df8203a4f4ae3900822b0d53` |
| `possible_answer/BFCL_v3_simple.json` | `2911a2bc00df82c4f999ffa64fedb0164cb88e96212ffa5972087eb91fd496ee` |
| `possible_answer/BFCL_v3_multiple.json` | `244e00ce9395df948bcafc7bee64e8f9c87ef70887587d83cae45b13699f3047` |
| `possible_answer/BFCL_v3_parallel.json` | `3af54bf04e5b7640b03a9b6a82440f52474feb24b398f94435fd2b155c7727de` |
| `possible_answer/BFCL_v3_parallel_multiple.json` | `df4d2c16238c1465dc04697c273cf3ab4a450075fcd274e3dc86ad5bf0049b75` |
| `possible_answer/BFCL_v3_sql.json` | `066ee73429e1d16e0a28ee7f9a7877f313892e94f6b68fb200b14253c8d7c154` |

The scenario set is vendored unmodified: the generated dataset's records and ground truth come directly from these files. The only transform is a function-name normalisation (below) and the exclusion of nine unsatisfiable SQL entries (also below).

## Categories in scope

This pack implements phase 1: single-turn, non-live categories whose grading compares the emitted tool calls with a stored ground-truth call set, and which therefore need **no function execution**.

| Category | Scenarios | Upstream grading rule (ported here) |
| --- | --- | --- |
| `simple` | 400 | exactly one emitted call; function name and every argument compared |
| `multiple` | 200 | exactly one emitted call, chosen from 2–4 provided functions |
| `parallel` | 200 | every expected call, in any order; the emitted call count must equal the expected count |
| `parallel_multiple` | 200 | parallel + multiple: several functions, each called zero or more times |
| `sql` | 91 | exactly one `sql.execute` call; structured `sql_keyword` / `table_name` / `columns` / … arguments |
| `irrelevance` | 240 | **no** tool call may be emitted |
| **total** | **1331** | |

## Categories out of scope, and why

- **`live_relevance`, `live_irrelevance`, `live_simple`, `live_multiple`, `live_parallel`, `live_parallel_multiple`** — the BFCL v2 live split. Out of scope for phase 1.
- **`exec_simple`, `exec_multiple`, `exec_parallel`, `exec_parallel_multiple`** — the counterpart of the AST categories that actually executes the generated Python. Out of scope for phase 1 (no function execution).
- **`multi_turn_base`, `multi_turn_miss_func`, `multi_turn_miss_param`, `multi_turn_long_context`, `multi_turn_composite`** — multi-turn agentic scenarios with an executable backend. Out of scope.
- **`chatable`** — the chat-ability category: no function is expected and upstream does not grade it with the AST checker. Out of scope.
- **`java` (100) and `javascript` (50)** — these follow the same *shape* of rule but not the same rule: upstream normalises the emitted argument strings through a language-specific literal parser (`java_type_converter` / `js_type_converter`) that understands Java and JavaScript collection constructors, and decodes the reply with a language-specific return format. That is a materially different grading rule from the plain structural match used by the categories above, so they are excluded rather than approximated.
- **`rest` (70)** — no `possible_answer` file exists for it: upstream deliberately performs no AST evaluation on REST (the number of acceptable answers is unbounded) and grades it only by executing the HTTP request. Out of scope.

### Nine excluded `sql` entries

Nine upstream `sql` entries are **unsatisfiable under BFCL's own checker** and are excluded from the graded set. Their ground-truth `insert_values` is a list of rows that each mix integer and float literals, e.g.

```
"insert_values": [[10, 1.43, 1], [20, 2.01, 2]]
```

Under upstream's rules the emitted array must (a) pass the nested type check — which compares every element against the type of the *first ground-truth element*, so a row containing a float fails against an integer-typed ground truth — and (b) equal one of the listed alternatives as a whole. No emitted value clears both, so the scenario can never pass. BFCL itself excludes the SQL category from its leaderboard calculation for this class of reason ("the multiplicity of methods to construct SQL function calls achieving identical outcomes"). The excluded ids are:

```
sql_18, sql_19, sql_28, sql_29, sql_38, sql_39, sql_49, sql_68, sql_69
```

They are recorded in `data/manifest.json` under `excludedScenarios` with the reason, and the generator asserts the graded SQL count is 91. The remaining 91 SQL entries grade exactly like the other structural categories. No other category contains an unsatisfiable entry: every one of the 1331 graded scenarios passes from its own ground truth (checked by `npm run check:extraction`).

## Dataset transform

`npm run build:dataset` reads the vendored files in `data/raw/`, verifies every SHA-256, and emits:

- `data/manifest.json` — a light index (categories, per-scenario id / category / function names / user text, plus the excluded entries);
- `data/scenarios/<category>.json` — the full scenarios (user message, function documents, ground-truth calls).

The transform is deterministic: the same input produces byte-identical output. It applies exactly one normalisation and enforces a set of invariants:

- **Function names are written with `_` in place of `.`** (e.g. `triangle_properties.get` → `triangle_properties_get`). The OpenAI-style function-name alphabet does not admit `.`, and BFCL itself rewrites dots to underscores before sending a request to an OpenAI-compatible endpoint. The dataset is normalised once at build time so a returned name equals its ground-truth key directly; names that would collide after normalisation abort the build.
- Exactly one single-turn user message per scenario (the dataset nests turns differently across files).
- Every function document carries a `parameters` block with a `required` list.
- Every graded scenario has a ground-truth call set; `irrelevance` scenarios have an empty one.
- The `(user text, function names)` signature is unique across the whole dataset — this is what the mock server keys on.
- Per-category counts: 400 / 200 / 200 / 200 / 91 / 240.

## Prompting protocol

Each scenario is a single chat completion with **native tool calling**.

System message (verbatim):

```
You are a function-calling assistant. You are given one or more functions. When the user's request requires a function, invoke the appropriate function or functions, each with correctly typed arguments. If none of the available functions is relevant to the request, do not call any function; answer the user in plain text instead.
```

User message: the scenario's request text, verbatim.

The scenario's function documents are sent in the request's `tools` field, converted to JSON Schema from the dataset's own type vocabulary (upstream's `GORILLA_TO_OPENAPI` mapping: `dict` → `object`, `float` → `number`, `any` → `string`, `tuple` → `array`, …). `tool_choice` is `"auto"`. Grading always uses the dataset's original types, never the converted ones.

Sampling defaults, declared in `benchlocal.pack.json`: `temperature` 0, `max_tokens` 65536, request timeout 3600 s. A bearer token is sent only when an API key is configured.

## Transport

Requests use `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers do not send headers until generation finishes — long generations would otherwise fail with `fetch failed` regardless of the configured timeout. With streaming, headers arrive immediately and the pack's own timeout plus the caller's abort signal are the only limits.

Tool calls arrive as `delta.tool_calls` fragments and are reassembled by their `index` (the function name and the JSON argument string are concatenated in arrival order). A non-SSE `application/json` response is accepted as a fallback for servers that buffer the stream, in which case `message.tool_calls` is read instead. The mock server exercises both paths (`--json-only` switches it to the non-streaming reply).

## Grading rules

The grader is a port of BFCL's AST checker (`bfcl_eval/eval_checker/ast_eval/ast_checker.py`), restricted to the Python-language path used by every category in scope. The emitted tool calls are first decoded into BFCL's model-output shape — a list of `{ function_name: { parameter: value } }` dictionaries, with the argument string parsed as JSON (an absent or empty argument string means "no parameters"). A call whose arguments are not a JSON object fails the scenario with an explicit `decode error` summary, mirroring upstream's decoder-failure path.

**Dispatch by category**

- `parallel` and `parallel_multiple` → order-insensitive matching. The emitted call count must equal the expected call count, and each expected call consumes one *distinct* emitted call. Extra or missing calls fail.
- `multiple` → exactly one emitted call, then the single-call rule below.
- `simple` and `sql` → exactly one emitted call, then the single-call rule below.
- `irrelevance` → the scenario passes **iff** no tool call was emitted at all (upstream's relevance handler: a reply that decodes to a function call, or to a non-empty call set, fails).

**Single-call rule** (used directly and inside the parallel/multiple matchers)

1. The expected function's name must be present in the emitted call.
2. Every parameter the schema marks required must be present.
3. Every emitted parameter must be both declared by the schema and constrained by the ground truth; otherwise the call fails as an unexpected parameter.
4. Every ground-truth parameter without an optional (`""`) marker must be present.
5. Each value is compared by type and value:
   - **type check** — the value must match the schema's declared type. Python's int/float distinction is preserved. An integer-valued number satisfies a `float` parameter (upstream's int → float promotion).
   - **strings** — compared after upstream's standardisation: spaces and `, . / - _ * ^` removed, lowercased, and `'` unified to `"`. So `April 1, 2024` and `APRIL 1,2024` match.
   - **arrays / tuples** — compared element-wise after the same string standardisation; order is significant.
   - **dictionaries** — compared key by key: an unknown key fails, and a ground-truth key is required unless it is optional.
   - **lists of dictionaries** — order and count must match.
   - **numbers and booleans** — compared by value.
   - **variable placeholders** — when the ground truth's value type differs from the schema's declared type, the value is compared as a literal. This is how upstream accepts a symbolic argument (e.g. `data['sales']` for an array parameter) or an omitted-by-optionality value.
6. An extra emitted call (in the single-call categories) or an extra parameter fails.

The port was cross-checked against a verbatim transcription of the upstream Python checker over all scenarios: the two agree on every verdict (`_reference/reference-checker.py`, development-only).

## Scoring

- Each scenario is binary: pass (score 1) when the emitted call set clears the checker, fail (score 0) otherwise — a wrong call, a missing or extra call, a value mismatch, or a decode failure all count as failures.
- accuracy = passed / 1331; the run score is that percentage rounded to the nearest integer — **points out of 100**. The summary reads `accuracy: <passed>/<total> (<x>%) - <points> points.`
- Each scenario's `points` value is 1, so the detail view reads `1 / 1`.
- The results card breaks the accuracy down per category with scenario counts as weights; the headline score is the overall accuracy.
- Model-call failures (endpoint unreachable, non-OK HTTP status, malformed response) are recorded per scenario as `provider_error` with the retryable flag set and score 0. They are reported, not silently skipped; a run containing provider errors is not a clean measurement for that model.

## Reproducibility

- `npm run build:dataset` is deterministic and pins the source hashes; re-running it reproduces byte-identical output (verified by hashing `data/manifest.json` and every `data/scenarios/*.json` before and after a re-run).
- `npm run check:extraction` builds the CLI and runs 52 checks: the AST grading rules (function-name mismatch, missing/extra parameters, wrong values, type mismatches, string standardisation, array order, dictionary keys, variable placeholders, parallel order-insensitivity and count exactness, multiple single-call enforcement, irrelevance), tool-call decoding, wire-schema conversion, and dataset integrity (counts, excluded set, uniqueness of prompt signatures, ground-truth availability, and the passability of all 1331 scenarios from their own ground truth). A passing run ends with `PASS (52 checks)`.
- The mock server provides end-to-end proof without a model (`node scripts/mock-server.mjs`, SSE tool-call deltas): a full CLI run scores **1331/1331 (100%)**; `--wrong` emits a bogus call for every scenario and scores **0/1331**; `--empty` emits no tool call and scores **240/1331** (only `irrelevance` passes). `_reference/verify-e2e.mjs` runs all three modes and asserts those counts plus the per-category breakdown. `_reference/verify-json-fallback.mjs` spot-checks the non-streaming JSON path (`--json-only`) across one scenario from each category.

## Deviations from upstream evaluation

Scores from this pack are not expected to match numbers reported elsewhere exactly. The deliberate differences:

1. **Native tool calling.** The pack declares the function documents through the request's `tools` field with `tool_choice: "auto"` and grades the API's own `tool_calls` output. Upstream drives models through each provider's chat format with its own text-based function-call prompt and parses the reply text with `decode_ast`. The comparison rules applied afterwards are the same; only the request/response format differs.
2. **Function-name normalisation.** Tool names are written with `_` instead of `.` on the wire, mirroring BFCL's handling for OpenAI-compatible endpoints. The dataset is normalised identically, so names match exactly.
3. **Zero-shot, single sample.** One completion per scenario at temperature 0; no few-shot examples, no averaging over k samples.
4. **Nine SQL entries excluded.** Listed above; they are unsatisfiable under upstream's own checker.
5. **Integer/float literal representation.** The generated dataset stores numbers as JSON, so a whole-number float literal in the original ground truth (e.g. `6.0`) is stored as `6`. The checker reconstructs Python's int/float distinction from the value (integer-valued numbers are treated as `int`), which matches Python's `json.loads` for all values that survive the round trip. The cross-check against the upstream checker over every scenario shows no verdict differs.
6. **No execution, no live, no multi-turn categories.** Phase 1 only.

## Why this pack has no Docker verifier

BenchLocal can run pack checks inside container-based verifiers for packs that need them (the official CLI-40 and BugFind-15 execution packs use that path because their checks exercise Linux shell behaviour). This pack needs none of it: grading compares the emitted tool calls against stored ground truth, entirely inside the pack runtime. Nothing is executed — not the model's output, and not the dataset's functions. The manifest declares `"verification": false` and no Docker installation is needed.

The trust model is correspondingly simple: the pack executes nothing and touches nothing outside the configured inference endpoint and its own results. The only data it ships is the vendored BFCL dataset (Apache-2.0, attribution in [NOTICE](NOTICE)).
