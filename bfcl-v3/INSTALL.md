# Installing BFCL-v3

This is a third-party BenchLocal bench pack: a pack repository loaded by the app as a **local source**. Unlike registry packs (CLI-40, BugFind-15, …), it is developed and installed from a working tree on disk.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Prepare the working tree

Copy the repository to a directory of your choice, then:

```sh
npm install                # installs the build toolchain (@benchlocal/sdk, typescript)
npm run build:dataset      # regenerates data/manifest.json + data/scenarios/ from data/raw/
npm run build:benchlocal   # compiles the pack to dist/
```

`npm run build:dataset` is deterministic and verifies the SHA-256 of every vendored file in `data/raw/`, so a drifted or edited copy of the dataset fails loudly instead of silently changing the benchmark.

## 2. Register the pack as a local source

BenchLocal reads its configuration at startup from `~/.benchlocal/config.toml`. Add a block for this pack:

```toml
[benchpacks.bfcl-v3]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- **Local sources are used in place — no dependency hydration.** The directory must therefore contain `node_modules/` and a fresh `dist/` (steps 1 above). Re-run `npm run build:benchlocal` after changing any source file.
- Keep the block's `version` in sync with `version` in `benchlocal.pack.json` (or omit the `version` key entirely).
- The app reads `config.toml` at startup only: **restart it after editing**. A settings-save before that restart can overwrite a hand edit — restart first, then confirm the block is still present.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint that supports tool calling works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

The pack sends each scenario's function documents in the request's `tools` field with `tool_choice: auto`, so the endpoint must support tool calling and return `tool_calls`. Sampling defaults are temperature 0 and `max_tokens` 65536. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. There are 1331 scenarios, one chat completion each; results aggregate to points out of 100 with a per-category breakdown.

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot native tool calling, dot-to-underscore function-name normalisation, single sample).
- **`model call failed` results.** The endpoint refused or failed the request, or does not support the `tools` parameter. Failures are flagged retryable and score 0.
- **`decode error` results.** The model emitted a tool call whose arguments were not a valid JSON object; those scenarios fail with an explicit summary.
- **Irrelevance scenarios failing.** The model called a function where none was relevant. The system instruction asks it not to; a model that always calls something will fail the whole `irrelevance` category.
