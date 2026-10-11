# Installing API-Bank

This is a third-party BenchLocal bench pack: a pack repository that produces an installable archive. Unlike registry packs, it is installed through the app's custom package-install flow from a locally-served archive.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app, and that endpoint must support function calling (`tools` / `tool_calls`).

## 1. Build the archive

```sh
npm install
npm run build          # compiles the pack + CLI
node scripts/pack-artifact.mjs
```

Output: `results/api-bank-1.0.0.tar.gz` (manifest + `dist/` + docs at the archive root, `node_modules` excluded — the host hydrates dependencies itself).

## 2. Serve and install it locally

BenchLocal's custom install flow accepts an `http://` or `https://` URL to a pack archive. `file://` URLs are not accepted, so serve the archive locally:

```sh
py -3 -m http.server 8223 --directory results
```

Then use the app's custom pack installation with:

```
http://127.0.0.1:8223/api-bank-1.0.0.tar.gz
```

Installed packs land under `~/.benchlocal/benchpacks/api-bank/`.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint that supports function calling works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

The pack drives a tool-calling loop; sampling defaults are `temperature` 0, `max_tokens` 65536 and a 3600 s request timeout. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 498 scenarios; each one declares the benchmark's APIs as tools and loops until the model stops calling (capped at 16 turns). Results aggregate to points out of 100 with a per-level breakdown.

## Local development loop (optional)

To iterate on the pack source without repacking, the app can load the working tree directly. Add to `~/.benchlocal/config.toml`:

```toml
[benchpacks.api-bank]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Local sources are used in place (no dependency hydration): keep `node_modules` plus a fresh `npm run build:benchlocal` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.
- When you're done iterating, the release artifact from step 1 remains the canonical install.

## Troubleshooting

- **The model never calls a tool.** The endpoint may not support function calling, or may be ignoring the `tools` parameter. Check the raw log (it lists every turn and the executed calls); failures read `no tool call was produced`. Try a model/endpoint whose function-calling support is documented.
- **`argument … does not match the expected value`.** The call was the right API but an argument differs; the raw log shows the executed sequence beside the expected one, and [METHODOLOGY.md](METHODOLOGY.md) documents the normalization that has already been applied.
- **`called N API(s), expected M`.** The model made a different number of calls than the plan requires — commonly a repeated search or a skipped step.
- **`(response truncated - raise max_tokens)`.** The reply hit the token cap before the call was emitted; raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable and score 0, marking the run as not-clean for that model.
- **Scores don't match upstream API-Bank numbers.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (native tool calling, call-sequence grading, level-1/2 call records only, zero-shot, 16-turn cap).
