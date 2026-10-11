# Installing GSM8K-1319

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
[benchpacks.gsm8k-1319]
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

Models answer with step-by-step reasoning before the final line; the default `max_tokens` is 65536 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 1319 scenarios, one chat completion each; results aggregate to points out of 100 under the single category `GSM8K (accuracy)`.

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot chat prompting vs the 8-shot completion setup, single sample, strict extraction, inherited dataset noise).
- **`unparseable answer` results.** The model didn't produce a recognizable final number (marker, `Answer: <number>` line, or any number at all). Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable — they score 0 and mark the run as not-clean for that model.
