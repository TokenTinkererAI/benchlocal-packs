# Installing ARC-Easy-2376

This is a custom BenchLocal bench pack installed as a **local source**: the app loads the pack's working tree directly from disk, so no archive, upload or registry step is involved. The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build the pack

From this pack directory:

```sh
npm install
npm run build          # compiles the pack (dist/) and the CLI runner (dist-cli/)
```

`npm install` is required before the app can load the pack: local sources are used in place, with no dependency hydration, so the working tree must carry its own `node_modules`. `npm run build` compiles `lib/` + `benchlocal/` into `dist/`, which the manifest entry (`./dist/benchlocal/index.js`) points at.

## 2. Register the pack as a local source

Add a block to `~/.benchlocal/config.toml`:

```toml
[benchpacks.arc-easy-2376]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- `path` must be the absolute path of the directory containing this repository (the one holding `benchlocal.pack.json`).
- Keep the block's `version` in sync with `benchlocal.pack.json` (or omit it).
- Because local sources are loaded in place, re-run `npm run build:benchlocal` after changing `lib/` or `benchlocal/` so `dist/` matches the source.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 65536 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 2,376 scenarios, one chat completion each; results aggregate to points out of 100.

## Local development loop

```sh
npm run build:dataset     # regenerate lib/generated/questions.ts from the vendored data (deterministic)
npm run build             # rebuild dist/ (pack) and dist-cli/ (CLI)
npm run typecheck         # tsc --noEmit
npm run check:extraction  # fixture + dataset integrity checks
```

To exercise the pipeline without a model endpoint, run the offline mock server and point the CLI runner at it (see the README's *Mock server* section).

## Troubleshooting

- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot chat prompting, deterministic option shuffle, single sample, strict extraction).
- **`unparseable answer` results.** The model didn't produce a recognizable `Answer: <LETTER>` line. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable, score 0, and mark the run as not-clean for that model.
- **Pack does not appear after editing `config.toml`.** Restart the app — the file is read at startup; also confirm `path` is absolute and `node_modules` + `dist/` exist in the working tree.
