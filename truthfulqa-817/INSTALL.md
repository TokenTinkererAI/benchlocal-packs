# Installing TruthfulQA-817

TruthfulQA-817 is a custom (third-party) BenchLocal bench pack. It is installed as a **local source**: the app loads the pack repository directly from disk. This is the only install path supported by this repository — the pack is not part of the official BenchLocal registry.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Get the pack source

Clone or copy this repository to a directory on your machine, then build it:

```sh
cd <absolute path of this pack directory>
npm install
npm run build          # compiles the pack (dist/) + CLI (dist-cli/)
```

Local sources are used in place (the host does not hydrate dependencies for them), so the working tree must keep both its `node_modules/` and a fresh `dist/` build.

## 2. Register the pack as a local source

Add a block to `~/.benchlocal/config.toml`:

```toml
[benchpacks.truthfulqa-817]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Keep the block's `version` in sync with `benchlocal.pack.json` (or omit the line).
- The pack id is `truthfulqa-817`.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 65536 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 817 scenarios, one chat completion each; results aggregate to points out of 100 with a breakdown by the number of answer choices per question.

## Troubleshooting

- **The pack does not appear.** The app reads `config.toml` only at startup — restart it. Confirm the file is `~/.benchlocal/config.toml` and that `path` is the absolute path of the pack directory (the directory containing `benchlocal.pack.json`).
- **The pack fails to load.** Re-run `npm install && npm run build` in the pack directory; the local source needs `node_modules/` and a built `dist/`.
- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (MC1 only, zero-shot chat prompting, deterministic option shuffle, single sample, strict extraction).
- **`unparseable answer` results.** The model didn't produce a recognizable `Answer: <LETTER>` line. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable and excluded from nothing — they score 0 and mark the run as not-clean for that model.
