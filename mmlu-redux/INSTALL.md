# Installing MMLU-Redux

This is a custom BenchLocal bench pack — a plain repository installed by registering it as a **local source** in the app (no archive, no URL install, no registry).

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build

```sh
npm install
npm run build          # compiles the pack + CLI
```

## 2. Install (local source)

This pack is custom — it is not distributed through the official registry. Point BenchLocal at this folder directly by adding to `~/.benchlocal/config.toml`:

```toml
[benchpacks.mmlu-redux]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.2"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Local sources are used in place (no dependency hydration): keep `node_modules` + a fresh `npm run build` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.
- This pack ships **without** a config entry — nothing is registered for you.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

The run is one chat completion per question, 5,330 of them, with `temperature` 0, `max_tokens` 65536 and a 3600 s request timeout by default. Models that reason before answering spend tokens on the reasoning; if results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 5,330 scenarios, one chat completion each; results aggregate to points out of 100 with a per-group breakdown (STEM / Humanities / Social sciences / Other). A full run against a local server takes a while — the CLI runner is the faster way to sanity-check a model before committing to a full in-app run:

```sh
node dist-cli/cli/run.js --base-url http://127.0.0.1:1234/v1 --model <name> --limit 50
```

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot chat prompting, deterministic option shuffle, single sample, text-letter extraction instead of likelihood normalization).
- **`unparseable answer` results.** The model didn't produce a recognizable A–D letter in any of the three extraction layers. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable, score 0, and mark the run as not-clean for that model.
- **`lib/generated/problems.ts` is missing.** It is a generated file: run `npm run build:dataset` (and `npm run vendor:dataset` first if `data/mmlu_redux.jsonl` is absent).
