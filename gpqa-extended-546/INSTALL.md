# Installing GPQA-Extended-546

This is a third-party BenchLocal bench pack: a pack repository that produces an installable archive. Unlike registry packs (CLI-40, BugFind-15, …), it is installed through the app's package-install flow from a URL.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build the archive

```sh
npm install
npm run build          # compiles the pack + CLI
node scripts/pack-artifact.mjs
```

Output: `results/gpqa-extended-546-1.0.1.tar.gz` (manifest + `dist/` + docs at the archive root, `node_modules` excluded — the host hydrates dependencies itself).

## 2. Install in BenchLocal

BenchLocal's install flow accepts an `http://` or `https://` URL to a pack archive. `file://` URLs are not accepted, so serve the archive locally:

```sh
py -3 -m http.server 8091 --directory results
```

Then use the app's third-party pack installation with:

```
http://127.0.0.1:8091/gpqa-extended-546-1.0.1.tar.gz
```

Installed packs land under `~/.benchlocal/benchpacks/gpqa-extended-546/`.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 16384 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 546 scenarios, one chat completion each; results aggregate to points out of 100 with a per-domain breakdown.

## Local development loop (optional)

To iterate on the pack source without repacking, the app can load the working tree directly. Add to `~/.benchlocal/config.toml`:

```toml
[benchpacks.gpqa-extended-546]
enabled = true
source = "local"
path = "C:/Users/<you>/gpqa-extended-546"
version = "1.0.1"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Local sources are used in place (no dependency hydration): keep `node_modules` + a fresh `npm run build:benchlocal` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.
- When you're done iterating, the release artifact from step 1 remains the canonical install.

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot chat prompting, deterministic option shuffle, single sample, strict extraction).
- **`unparseable answer` results.** The model didn't produce a recognizable `Answer: <LETTER>` line. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable and excluded from nothing — they score 0 and mark the run as not-clean for that model.
