# HumanEval+-164

A BenchLocal bench pack for **EvalPlus HumanEval+** — OpenAI's 164 hand-written
Python problems graded against the *expanded* test suites EvalPlus generated for
them (1,570 original tests + 122,675 generated tests), by executing the model's
submission on the host with a local Python. No Docker, no verifier container.

- **Pack id:** `humaneval-plus-164`
- **Version:** 1.0.1
- **Scenarios:** 164 (one per problem, `HumanEval/0` … `HumanEval/163`)
- **Scoring:** integer points out of 100, one point per problem
- **Needs:** a local Python 3.9+ (`py -3`, `python` or `python3`) on the host
- **Dataset:** `HumanEvalPlus.jsonl.gz` v0.1.10 from the EvalPlus release
  (`evalplus/humanevalplus_release`), vendored unmodified, sha256
  `272720b90ac375502c8ed23cd791c2a93dfb22a911641a494da74a426c09f101`

## What it measures

Each scenario asks the model to complete one canonical HumanEval function
(imports + signature + docstring) as a chat completion. The reply is extracted
and then **executed** against both suites that EvalPlus ships for that problem:

| suite | what it is | tests |
| --- | --- | --- |
| `base` | the original HumanEval inputs | 1,570 total |
| `plus` | EvalPlus's generated inputs (extreme values, boundary cases, type mutations) | 122,675 total |

A problem counts as passed only when **every graded test in both suites passes**,
so the score is `pass@1` over the 164 problems:

```
pass@1: 157/164 (95.7%) - 96 points.
```

HumanEval+ is strictly harder than plain HumanEval: the same 164 problems, up to
~1,000 tests each instead of a handful, with the comparison semantics of
EvalPlus's own evaluator (exact equality, float tolerance where the dataset sets
it, plus a special oracle for `find_zero`).

## Install

See [INSTALL.md](INSTALL.md) — the pack is installed by registering this
folder as a **local source** in the app.

## Using it from the CLI

```bash
npm install                 # once
npm run build               # compiles dist/ (pack) and dist-cli/ (runner)
npm run selftest            # 164 canonical solutions + negative controls
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> \
  --out results/run.json
```

Useful flags: `--limit N`, `--ids 0,32,139`, `--max-tokens N`,
`--exec-timeout-ms N`, `--python PATH`, `--out PATH`.
The interpreter can also be pinned with `HUMANEVALPLUS164_PYTHON`.

Default sampling for the pack is declared in `benchlocal.pack.json`:
`temperature` 0, `max_tokens` 16384, request timeout 900 s. Model requests use
`stream: true` with client-side SSE accumulation — a plain JSON response is
still accepted as a fallback for servers that buffer the stream (see
[METHODOLOGY.md](METHODOLOGY.md)). Heavy reasoners can still exhaust the budget:
raise `max_tokens` in the run tab when results say `empty completion` or
`completion truncated`.

## Scoring

- Every scenario is worth **1 point**; `totalScore` is the rounded percentage of
  passed problems (0–100).
- The detail string keeps the exact ratio, e.g.
  `pass@1: 164/164 (100.0%) - 100 points.`
- A scenario whose model call fails (endpoint error, timeout, empty completion)
  scores 0 and is reported as a provider problem rather than a wrong answer.

## Layout

```
benchlocal.pack.json        pack manifest (entry: ./dist/benchlocal/index.js)
benchlocal/index.ts         thin adapter: listScenarios / runScenario / scoreModelResults
lib/                        dataset access, python resolution, prompt, extraction,
                            model client, executor, orchestrator, scoring
harness/run_problem.py      the grading harness (EvalPlus semantics, one problem)
cli/run.ts                  local runner against any OpenAI-compatible endpoint
cli/selftest.ts             canonical + negative-control acceptance test
scripts/build_expected.py   ground-truth generator (executes the reference solutions)
scripts/build-dataset.mjs   dataset build + verification entry point
scripts/mock-server.mjs     mock endpoint for end-to-end testing (port 8107;
                            SSE replies by default, --json-only for the fallback path)
scripts/pack-artifact.mjs   builds results/humaneval-plus-164-<version>.tar.gz
scripts/check-model-layer.mjs  prompt/extraction fixture check (8 fixtures)
data/manifest.json          light per-problem metadata + prompts (read by the pack)
data/problems/*.json        one graded record per problem: inputs, expected outputs,
                            reference timings, canonical solution
data/canonical.json         reference solutions (self-test and mock fixtures only)
data/source/                the vendored EvalPlus release asset
```

## Verification performed on this tree

| check | result |
| --- | --- |
| `npm run build` (`tsc -p tsconfig.benchlocal.json` + `tsc -p tsconfig.cli.json`) | clean |
| `npm run typecheck` | clean |
| `npm run check:pack` (loads the shipped `dist/` adapter, 20 checks) | `check-pack OK (20/20 checks passed)` |
| `npm run selftest` (all 164 reference solutions through the shipped pipeline) | `SELFTEST PASS: 164/164 canonical` |
| selftest negative controls (wrong solution, infinite loop) | both behave as specified |
| `node scripts/check-model-layer.mjs` (8 extraction/prompt fixtures) | `MODEL LAYER PASS (8 fixtures)` |
| mock endpoint end-to-end, 164 problems, replies streamed as SSE | `pass@1: 164/164 (100.0%) - 100 points.` |
| mock endpoint, wrong-solution mode (SSE) | `pass@1: 0/164 (0.0%) - 0 points.`, all failures graded wrong answers, 0 harness errors |
| mock endpoint, `--json-only` spot (non-SSE fallback, 4 reply variants) | `pass@1: 4/4 (100.0%)` |

Details, semantics and the exact deviations from upstream are in
[METHODOLOGY.md](METHODOLOGY.md).

## Credits and license

MIT — Copyright (c) 2026 TokenTinkerer. The benchmark data is redistributed from
OpenAI HumanEval (MIT) and EvalPlus (Apache-2.0, with the `evalplus/eval/` subtree
additionally MIT); see [NOTICE](NOTICE) and `data/LICENSE-human-eval` /
`data/LICENSE-evalplus`. This is an independent third-party package, not
affiliated with or endorsed by OpenAI or the EvalPlus authors.
