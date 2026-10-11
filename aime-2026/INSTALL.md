# Installing AIME-2026

This is a third-party BenchLocal bench pack: a pack repository that is loaded by the app as a **custom local source**. It ships **without** a config entry — nothing is registered for you.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build the pack

```sh
npm install
npm run build          # compiles the pack (dist/) and the CLI (dist-cli/)
```

Optionally produce the release archive as well (manifest + `dist/` + docs at the archive root, `node_modules` excluded):

```sh
node scripts/pack-artifact.mjs   # -> results/aime-2026-1.0.0.tar.gz
```

## 2. Register the working tree as a local source

Local sources are used in place (no dependency hydration), so the working tree needs `node_modules` plus a fresh `dist/` build. Add a block to `~/.benchlocal/config.toml`:

```toml
[benchpacks.aime-2026]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Keep the block's `version` in sync with `benchlocal.pack.json`.
- Re-run `npm run build` whenever the pack source changes, so the loaded code matches the working tree.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 65536 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 30 scenarios, one chat completion each; results aggregate to a single accuracy percentage converted to points out of 100.

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot single-sample chat, own prompt, strict layered extraction, pooled AIME I + II).
- **`unparseable answer` results.** The model produced no integer in 0-999 that any of the three extraction layers accepts. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Off-by-one style wrong answers.** That is a genuine miss — the extractor returns exactly one integer and compares it to the gold value; the summary prints both.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable, score 0.
- **Config block not loaded.** Confirm the edit survived a restart and that `path` is the absolute path of the pack directory; a local source is used in place and needs a built `dist/`.
