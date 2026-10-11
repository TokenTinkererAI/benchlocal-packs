# METHODOLOGY — IFEval-541 (BenchLocal bench pack)

## 1. What this pack measures

Instruction-following accuracy on **IFEval** (Instruction-Following Evaluation
for Large Language Models). Every one of the 541 prompts carries one to three
verifiable constraints ("use at least 3 highlighted sections", "do not use any
commas", "your entire response must be in all capital letters", …). A response
is graded by **programmatic checks only** — no LLM judge, no human review.

Two headline numbers are reported, exactly as upstream defines them:

- **strict** instruction-level accuracy — the primary metric and the pack's score;
- **loose** instruction-level accuracy — an upper bound computed on simplified
  response variants (see §6).

## 2. Benchmark and paper

- Paper: Zhou, Lu, Mishra, Brahma, Basu, Luan, Zhou, Hou,
  *Instruction-Following Evaluation for Large Language Models*, 2023 —
  <https://arxiv.org/abs/2311.07911>
- Reference code: <https://github.com/google-research/google-research/tree/master/instruction_following_eval>
- Dataset: <https://huggingface.co/datasets/google/IFEval> (also shipped inside the reference repo)
- Licenses: dataset and reference code are **Apache-2.0** (see `NOTICE` and `data/LICENSE-ifeval`).

## 3. Dataset

| item | value |
| --- | --- |
| vendored file | `data/ifeval.jsonl` |
| source | `google/IFEval` on HuggingFace, file `ifeval_input_data.jsonl` (downloaded with `hf download google/IFEval --repo-type dataset`) |
| sha256 | `6a85310ca8ce15eff755aa08a3a4ff931c7e273e7515ebb3c492ea85fd8288f2` |
| records | 541 (`key`, `prompt`, `instruction_id_list`, `kwargs`) |
| scenario ids | `IFEval/0` … `IFEval/540`, dataset file order |
| instruction ids | 25 distinct; 236 prompts carry more than one instruction |
| kwargs values | `string`, `number` or array of strings — all JSON-safe |

`scripts/build-dataset.mjs` re-reads the vendored file, enforces the record
count and the pinned sha256 (it refuses to build if either changes), validates
the id ↔ kwargs invariant, and compiles `lib/generated/problems.ts` (prompt
verbatim, instruction ids, kwargs). The pack runtime only reads the generated
module; `data/ifeval.jsonl` ships for provenance, and
`scripts/pack-artifact.mjs` re-verifies its sha256 against the pin recorded in
the generated module before creating a release artifact.

**Note on dataset copies.** The HuggingFace copy and the copy inside the
reference repository differ in exactly one record: `IFEval/339` (key `2785`)
reads *"at least one placeholder"* in the HuggingFace copy and *"at least 3
placeholders"* in the repository copy (both carry
`{"num_placeholders": 3}`, so grading is identical), plus a trailing newline.
This pack vendors the **HuggingFace** copy, which is the copy used by public
leaderboards.

## 4. Prompting

- A single **user** message containing the dataset `prompt` field **verbatim**.
- **No system message**, no chat template, no answer-format scaffolding, no
  few-shot examples.
- The model's reply is graded **raw**: no extraction, no trimming of leading
  whitespace, no markdown-stripping before grading (only trailing whitespace
  from the transport is removed).

Rationale: the `prompt` field is the canonical zero-shot instruction text of
the benchmark, and upstream's own evaluation harness (`evaluation_main.py`)
grades plain `{"prompt", "response"}` pairs the same way. The paper's reference
results for some model families used few-shot templates; this pack does not
(see §11 Deviations).

## 5. Generation

| setting | value |
| --- | --- |
| temperature | 0 |
| max_tokens | 65536 |
| request timeout | 3600 s |
| samples per prompt | 1 (single sample; no pass@k) |

These are the pack's `samplingDefaults`; the BenchLocal host or CLI may override
them. Responses that hit the token budget (`finish_reason: "length"`) are still
graded, and their per-scenario summary is annotated
`(response truncated - raise max_tokens)`. An empty response is reported as
`empty response (0/N instructions)` and never counted as a pass.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated
client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s
response-headers timeout that pack code cannot raise, and non-streaming
OpenAI-compatible servers do not send headers until generation finishes —
generations needing more than ~5 minutes would otherwise fail with `fetch
failed` regardless of the configured `request_timeout_seconds`. With streaming,
headers arrive immediately and the pack's own timeout (default 3600 s) plus the
caller's abort signal are the only limits. A non-SSE `application/json` response
is still accepted as a fallback for servers or proxies that buffer the stream;
the mock server exercises both behaviours (`--json-only` switches it to the
non-streaming reply).

## 6. Grading — vendored upstream checker code

Grading runs the **unmodified** upstream checker code, vendored into this repo:

```
harness/ifeval/instruction_following_eval/
  instructions.py             # the 25 checkers          (verbatim)
  instructions_registry.py    # instruction id -> class  (verbatim)
  instructions_util.py        # helpers                  (verbatim)
  evaluation_lib.py           # strict/loose drivers     (verbatim)
  LICENSE                     # Apache-2.0 (upstream)
  UPSTREAM.md                 # provenance + byte-identity table
harness/ifeval/vendor/
  langdetect/                 # langdetect 1.0.9  (Apache-2.0, vendored)
  immutabledict/              # immutabledict 4.3.1 (MIT, vendored)
  nltk/                       # stdlib-backed shim (substitutions, see §7)
  absl/logging.py             # shim over stdlib logging (substitution)
harness/grader.py             # wires the paths, grades one case
harness/run_problem.py        # per-scenario entry point (###RESULT### line)
```

Provenance: `google-research/google-research` at commit
`e49bbfe381c9c0e564b937f1c4e163a2273c65cc`, directory
`instruction_following_eval/`. Each vendored module is **byte-identical** to
upstream — `git hash-object` of the vendored file equals the upstream git blob
id (table in `harness/ifeval/instruction_following_eval/UPSTREAM.md`). No
upstream line was edited.

**Strict** (`evaluation_lib.test_instruction_following_strict`): for each
instruction of the prompt, rebuild the checker with that instruction's kwargs
and call `check_following(response)`. A non-empty response follows the
instruction iff the checker returns `True`; the prompt passes iff all
instructions pass.

**Loose** (`evaluation_lib.test_instruction_following_loose`): the same check is
run against the response *and* seven simplified variants — first line removed,
last line removed, both removed, and those three plus the unmodified response
with every `*` character removed. An instruction counts as followed if **any**
variant satisfies it; the prompt passes iff all instructions pass. This mirrors
upstream's "upper bound on following instructions" heuristic exactly.

Both verdicts are reported per scenario and aggregated; the pack's score uses
**strict**.

### Checker families exercised

All 25 instruction ids shipped by the upstream registry are implemented and
covered by the fixture suite:

`keywords:existence`, `keywords:frequency`, `keywords:forbidden_words`,
`keywords:letter_frequency`, `language:response_language`,
`length_constraints:number_sentences`, `length_constraints:number_paragraphs`,
`length_constraints:number_words`, `length_constraints:nth_paragraph_first_word`,
`detectable_content:number_placeholders`, `detectable_content:postscript`,
`detectable_format:number_bullet_lists`, `detectable_format:constrained_response`,
`detectable_format:number_highlighted_sections`, `detectable_format:multiple_sections`,
`detectable_format:json_format`, `detectable_format:title`,
`combination:two_responses`, `combination:repeat_prompt`, `startend:end_checker`,
`change_case:capital_word_frequency`, `change_case:english_capital`,
`change_case:english_lowercase`, `punctuation:no_comma`, `startend:quotation`.

## 7. Substitutions (third-party dependencies)

Upstream requires `absl-py`, `langdetect`, `nltk` (including the Punkt sentence
model, normally downloaded at runtime) and `immutabledict`. This pack performs
**no pip installs and no runtime downloads**. Two upstream dependencies are
vendored as real packages, and the rest are replaced by documented stand-ins:

| # | upstream behaviour | this pack | fidelity |
| --- | --- | --- | --- |
| 1 | `immutabledict.immutabledict({...})` for the language-code table | vendored **immutabledict 4.3.1** (MIT) | identical |
| 2 | `langdetect.detect(text)` in `ResponseLanguageChecker`, `CapitalLettersEnglishChecker`, `LowercaseLettersEnglishChecker` (`LangDetectException` ⇒ instruction counts as followed) | vendored **langdetect 1.0.9** (Apache-2.0), unseeded exactly like upstream | identical (same library, same version, same call) |
| 3 | `from absl import logging` + `logging.error("... %s ... %s", value, e)` in the two `LangDetectException` paths | `vendor/absl/logging.py`, a thin forwarder to the stdlib `logging` module (same call shape, same %-formatting, errors still reach stderr) | identical for the call sites used |
| 4 | `nltk.tokenize.RegexpTokenizer(r"\w+")` in `count_words` | `re.findall(r"\w+", text)` — exactly what `RegexpTokenizer.tokenize` does | identical |
| 5 | `nltk.data.load("nltk:tokenizers/punkt/english.pickle")` in `count_sentences` (Punkt statistical sentence tokenizer + downloaded model) | delegates to upstream's own `instructions_util.split_into_sentences` — the regex sentence splitter that ships in the same upstream file and that upstream itself uses for `keywords:key_sentences` | **approximate** — see below |
| 6 | `nltk.word_tokenize(value)` in `CapitalWordFrequencyChecker` (Treebank tokenizer, itself dependent on Punkt) | whitespace-delimited tokens | **approximate** — see below |

Impact of substitutions 5 and 6:

- *Sentence counting* (substitution 5) affects `length_constraints:number_sentences`
  (52 prompts). The regex splitter handles the common cases (`. ? !` with
  abbreviation, decimal, acronym, ellipsis and quote handling); it can differ
  from Punkt on unusual punctuation and on sentences without terminal
  punctuation. Sentence counts of ordinary prose are unchanged; counts for edge
  cases may differ by ±1 sentence, which matters only when the count sits
  exactly on the threshold.
- *Capital-word counting* (substitution 6) affects
  `change_case:capital_word_frequency` (25 prompts) only through tokens that mix
  case with apostrophes or punctuation (e.g. `DON'T` counts once here vs twice
  with the Treebank tokenizer). Plain `WORD`/`Word` tokens are treated
  identically.
- Everything else (all other 23 instruction families, including both
  `change_case:english_*` checks and `language:response_language`, and the whole
  strict/loose driver) is upstream code running unchanged.

Determinism: the vendored `langdetect` is called without setting
`DetectorFactory.seed`, exactly like upstream; for the texts this benchmark
produces the detector is deterministic in practice (a 30×-repeated probe over
the fixture texts returned a single result each time), but a fixed seed was
deliberately *not* introduced, since that would deviate from upstream's
behaviour on ambiguous short texts.

## 8. Scoring

- Per scenario: `points: 1`, `score: 1` when the **strict** verdict holds, else `0`.
- Total: `totalScore = round(strict_prompt_accuracy_in_percent)` — an integer
  0…100 (e.g. `round(68.8) = 69`).
- One category (`instruction-following`, weight = number of scenarios scored)
  so the results card shows a single bar.
- Summary string:

  ```
  strict: 372/541 (68.8%) - 69 points. | loose: 401/541 (74.1%)
  ```

  (strict counts drive the points; the loose counts are the same set of
  scenarios graded with the loose variant rule.)

Per-scenario summaries read e.g.
`strict: pass (3/3) | loose: pass (3/3)` or
`strict: fail (1/3; missed punctuation:no_comma) | loose: pass (3/3)`.

## 9. Execution model

- One Python subprocess per scenario (`harness/run_problem.py <spec.json>`),
  printing a single `###RESULT###{json}` line that the Node executor parses.
- Wall-clock cap per scenario (default 120 s, CLI `--exec-timeout-ms`);
  on expiry the process tree is killed (`taskkill /T /F` on Windows).
- Python 3.9+ is required and auto-detected (`py -3`, `python`, `python3`;
  override with `IFEVAL541_PYTHON`).
- Grading performs no network access and installs nothing.
- **No sandbox.** The subprocess boundary exists for crash isolation, timeouts
  and output bounding. Grading runs only vendored checker code (never
  model-generated code), so the trust model is simple — but it is not an
  isolation boundary and should not be described as one.

## 10. Verification performed on this tree

| step | command | result |
| --- | --- | --- |
| build | `npm run build` | green (pack → `dist/`, CLI → `dist-cli/`) |
| typecheck | `npm run typecheck` | green |
| dataset | `npm run build:dataset` | 541 records, sha256 pinned, 25 instruction ids |
| checker unit test | `npm run check:checkers` | `CHECKERS PASS: 37/37 cases (strict+loose verdicts) \| 25/25 instruction ids covered` |
| executor self-test | `npm run selftest` | `SELFTEST PASS: 37/37 cases (executor + vendored IFEval checker, strict+loose verified)` |
| pack probe | `npm run probe` | 541 scenarios; 2/3 → 67; 541/541 → 100; 0/541 → 0 |

Fixture suite (`_reference/fixtures/checkers.json`, 37 cases): crafted
(prompt, response) pairs with known strict and loose outcomes, including
pass/pass, fail/fail and strict-fail/loose-pass cases (the loose-only cases pin
the follow-up semantics for `keywords:forbidden_words`,
`length_constraints:number_sentences`, `startend:end_checker` and
`detectable_format:number_bullet_lists`). The same fixture file is run twice:
in-process by `scripts/check_checkers.py` and through the real Python
subprocess + executor by `cli/selftest.ts`.

## 11. Mock end-to-end runs

`_reference/fixtures/mock-answers.json` holds **verified** answers: 24 mapped
scenarios with a compliant answer (strict+loose pass, checked when the fixture
is generated) and a deliberately non-compliant answer (strict fail). The mock
server (`scripts/mock-server.mjs`, port 8121) serves them; unmapped prompts get
one fixed non-compliant fallback text. Mock replies are streamed as SSE chunks
by default (mirroring llama.cpp's `data: {...}` / `data: [DONE]` stream);
`--json-only` switches the mock to single-body JSON replies so the client's
non-SSE fallback is exercised too.

| run | command | summary |
| --- | --- | --- |
| compliant, 24 mapped | `node _reference/mock-e2e.mjs --mode compliant --ids <24>` | `strict: 24/24 (100.0%) - 100 points. \| loose: 24/24 (100.0%)` |
| garbage, 24 mapped | `node _reference/mock-e2e.mjs --mode garbage --ids <24>` | `strict: 0/24 (0.0%) - 0 points. \| loose: 0/24 (0.0%)` |
| compliant, all 541 | `node _reference/mock-e2e.mjs --mode compliant` | `strict: 31/541 (5.7%) - 6 points. \| loose: 31/541 (5.7%)` |
| garbage, all 541 | `node _reference/mock-e2e.mjs --mode garbage` | `strict: 7/541 (1.3%) - 1 points. \| loose: 7/541 (1.3%)` |
| empty (blank), all 541 | `node _reference/mock-e2e.mjs --mode empty` | `strict: 0/541 (0.0%) - 0 points. \| loose: 0/541 (0.0%)` |

The compliant full run cannot reach 100 points: only the 24 mapped scenarios
have hand-authored compliant answers, and the remaining 517 prompts receive the
fixed fallback text. The 100-point target is demonstrated by the 24-scenario
compliant run; the full run exists to prove that all 541 scenarios complete
through the real CLI pipeline and that the aggregates are computed correctly.
The 7 accidental passes of the fallback text in `--garbage` mode are stale
constraints that a single fixed text satisfies by construction (e.g. "fewer
than 300 words" or "fewer than 4 words in all caps" on a text that is short or
has no capitals); several dataset constraints are mutually exclusive for one
fixed answer ("the letter q fewer than 5 times" vs "at least 4 times"), so a
fixed non-compliant answer cannot fail every prompt. The exact accidental ids
are recorded in `genericGarbageAccidentalPasses` in the fixture file.

## 12. Deviations from the paper / upstream defaults

1. **Zero-shot prompting.** A single user message with the prompt verbatim; no
   few-shot templates and no system message (§4).
2. **One sample per prompt** (no averaged runs).
3. **Substitutions 5 and 6** in §7 (Punkt sentence splitter and Treebank word
   tokenizer replaced by regex/whitespace equivalents; both were dependency-
   driven and are documented above).
4. **No official grading script invocation.** Upstream's
   `evaluation_main.py` (absl command-line app) is not used; this pack calls the
   same `evaluation_lib` functions directly from `harness/run_problem.py`,
   which is what makes per-scenario grading possible. The strict/loose logic
   itself is upstream's, unmodified.
5. **Runtime requirements**: Python 3.9+ with no third-party packages, instead
   of `pip install -r requirements.txt`.

## 13. Limitations

- Instruction-level accuracy is sensitive to formatting conventions; models that
  are verbose or that add preamble text lose points even when the content is
  correct. That is the benchmark's design, not a harness artifact.
- The loose metric is an upper bound computed by upstream's own line/asterisk
  simplification; it is reported for comparability with published numbers.
- Sentence counting and capital-word counting are the two approximate
  substitutions (§7). Scores for the 52 `number_sentences` prompts and the 25
  `capital_word_frequency` prompts can differ from a Punkt/Treebank-based run on
  edge cases.
