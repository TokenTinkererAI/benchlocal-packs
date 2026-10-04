# IFEval-541

A BenchLocal bench pack for **IFEval** (Instruction-Following Evaluation for
Large Language Models — Zhou et al., 2023, [arXiv:2311.07911](https://arxiv.org/abs/2311.07911)):
541 prompts, each carrying one to three verifiable constraints ("do not use any
commas", "highlight at least 3 sections in markdown", "your entire response must
be in all capital letters", …), graded by the benchmark's **programmatic
constraint checks** — no LLM judge, no human review, no Docker, no verifier
container.

Each scenario sends the prompt verbatim as a single user message to an
OpenAI-compatible chat endpoint and grades the raw reply with the vendored,
unmodified upstream checker code (`instruction_following_eval`, Apache-2.0).
Results aggregate to **strict** instruction-level accuracy in points out of 100,
with the **loose** upper bound reported alongside.

Default sampling for the pack is declared in `benchlocal.pack.json`:
`temperature` 0, `max_tokens` 16384, request timeout 900 s. Model replies are
requested with `stream: true` and the SSE response is accumulated client-side,
so long generations are not cut off by Node's ~300 s non-streaming
response-headers wall — see the Transport section of
[METHODOLOGY.md](METHODOLOGY.md).

Companion documents:

- [METHODOLOGY.md](METHODOLOGY.md) — dataset provenance, prompting, checker
  strategy and substitutions, strict/loose definitions, scoring, deviations,
  trust model, verification results.
- [INSTALL.md](INSTALL.md) — build and installation instructions.
- [NOTICE](NOTICE) — upstream attribution and licenses.

## What the pack contains

- The complete IFEval prompt set: **541 scenarios** (`IFEval/0` … `IFEval/540`,
  dataset file order), 25 distinct instruction ids, 236 prompts with more than
  one instruction.
- Single-turn, no tools: each scenario is one chat completion, graded raw.
- Vendored checker code (byte-identical to upstream, verified by git blob hash)
  plus vendored pure-Python dependencies — grading needs **no pip installs and
  no runtime downloads**.
- A Python grading harness (`harness/`), a CLI runner, a 37-case checker
  fixture suite, and a mock server for exercising the whole pipeline offline.

## Requirements

- **BenchLocal 0.2.0 or newer** (declared in `benchlocal.pack.json`), with an
  OpenAI-compatible inference endpoint configured. The pack uses the
  `inferenceEndpoints` host feature.
- **Python 3.9+** on the machine running BenchLocal — the grading harness is
  Python. It is auto-detected (`py -3`, `python`, `python3`); set
  `IFEVAL541_PYTHON` to pin a specific interpreter. No packages need to be
  installed.
- **No Docker.**
- **Node.js** only for the CLI runner and source builds.

## Install

Register this folder as a **local source** in BenchLocal — see
[INSTALL.md](INSTALL.md). The short version:

```sh
npm ci                 # or: npm install
npm run build          # dist/ (pack) + dist-cli/ (CLI)
```

## Score

- Per scenario: `points: 1`, `score: 1` when **every** instruction of the prompt
  is followed strictly, else `0`.
- `totalScore = round(strict accuracy %)` — integer points out of 100.
- Summary string, e.g.:

  ```
  strict: 372/541 (68.8%) - 69 points. | loose: 401/541 (74.1%)
  ```

## Command-line runner

Runs the same pipeline the app uses, against any OpenAI-compatible endpoint:

```sh
node dist-cli/cli/run.js \
  --base-url http://127.0.0.1:1234/v1 --model my-model \
  --limit 20 --out results/run.json
```

Useful flags: `--ids IFEval/0,IFEval/12`, `--temperature`, `--max-tokens`,
`--timeout-ms`, `--exec-timeout-ms`.

## Development checks

```sh
npm run build:dataset    # verify + compile data/ifeval.jsonl -> lib/generated/problems.ts
npm run build            # compile the pack and the CLI
npm run typecheck        # strict TypeScript check
npm run check:checkers   # 37 fixture cases, in-process, all 25 instruction ids
npm run selftest         # the same fixtures through the real Python executor
npm run probe            # load the built pack like the host and check scoring
npm run mock             # mock server on port 8121 (--compliant | --garbage | --empty)
```

Mock end-to-end runs (server is started and stopped by the script):

```sh
node _reference/mock-e2e.mjs --mode compliant --ids IFEval/1,IFEval/4
node _reference/mock-e2e.mjs --mode garbage
node _reference/mock-e2e.mjs --mode empty
```

## License

Pack code: MIT — see [LICENSE](LICENSE), Copyright © 2026 TokenTinkerer.
The IFEval dataset, the vendored checker code (`langdetect` excepted as noted in
[NOTICE](NOTICE)) are Apache-2.0, © The Google Research Authors; `langdetect`
is Apache-2.0, `immutabledict` is MIT. See [NOTICE](NOTICE) for details.
