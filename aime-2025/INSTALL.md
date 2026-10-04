# Installing AIME-2025

This is a third-party BenchLocal bench pack: a pack repository that produces an installable archive. Unlike registry packs, it is installed through the app's package-install flow from a URL.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build the archive

```sh
npm install
npm run build          # compiles the pack + CLI
node scripts/pack-artifact.mjs
```

Output: `results/aime-2025-1.0.1.tar.gz` (manifest + `dist/` + docs at the archive root, `node_modules` excluded — the host hydrates dependencies itself). The packer verifies every member and prints the archive SHA-256; keep that line with the file.

## 2. Install in BenchLocal

BenchLocal's install flow accepts an `http://` or `https://` URL to a pack archive. `file://` URLs are not accepted, so serve the archive locally:

```sh
py -3 -m http.server 8123 --directory results
```

Then use the app's third-party pack installation with:

```
http://127.0.0.1:8123/aime-2025-1.0.1.tar.gz
```

Installed packs land under `~/.benchlocal/benchpacks/aime-2025/`.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 16384 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 30 scenarios, one chat completion each; results aggregate to a single accuracy percentage converted to points out of 100.

## Local development loop (optional)

To iterate on the pack source without repacking, the app can load the working tree directly. Add to `~/.benchlocal/config.toml`:

```toml
[benchpacks.aime-2025]
enabled = true
source = "local"
path = "C:/Users/<you>/aime-2025"
version = "1.0.1"
```

Notes:

- This pack ships **without** a config entry — nothing is registered for you.
- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Local sources are used in place (no dependency hydration): keep `node_modules` + a fresh `npm run build:benchlocal` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.
- When you're done iterating, the release artifact from step 1 remains the canonical install.

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot single-sample chat, own prompt, strict layered extraction, pooled AIME I + II).
- **`unparseable answer` results.** The model produced no integer in 0-999 that any of the three extraction layers accepts. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Off-by-one style wrong answers.** That is a genuine miss — the extractor returns exactly one integer and compares it to the gold value; the summary prints both.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable, score 0.
