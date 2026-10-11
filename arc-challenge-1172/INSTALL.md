# Installing ARC-Challenge-1172

This is a third-party BenchLocal bench pack: a pack repository that is registered with the app as a **local source** — the pack directory on disk is used in place, with no archive and no registry involved.

The pack is a plain Node module — **no Docker, no Python, no verifier container**. The only external dependency at run time is the OpenAI-compatible inference endpoint you configure in the app.

## 1. Build the pack

Local sources are used in place (the host does not hydrate dependencies for them), so the working tree needs its dependencies installed and both builds present:

```sh
npm install
npm run build          # compiles the pack (dist/) and the CLI runner (dist-cli/)
```

The artifact the app loads is `dist/benchlocal/index.js`, referenced from `benchlocal.pack.json`.

## 2. Register the pack as a local source

Add a block to `~/.benchlocal/config.toml`:

```toml
[benchpacks.arc-challenge-1172]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.0"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- The `path` value is the absolute location of this pack directory (the directory containing `benchlocal.pack.json`).
- `version` is optional; when present, keep it in sync with `benchlocal.pack.json`.
- After the restart the pack appears in the app's pack list and can be selected like any other table pack.

## 3. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp, LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model name; an API key if required).

Graders answer with chain-of-thought before the final line; the default `max_tokens` is 65536 and temperature 0. If results say `(response truncated - raise max_tokens)`, raise the budget for that run.

## 4. Run

Select the pack, pick a model, run. 1,172 scenarios, one chat completion each; results aggregate to points out of 100.

## Troubleshooting

- **The pack does not appear after a restart.** Confirm the `config.toml` block survived the restart and that `path` points at the directory containing `benchlocal.pack.json`; the app reads the file at startup only.
- **The pack loads but every scenario fails with a module error.** Rebuild the pack (`npm run build`) — a local source is used in place, so `dist/` and `node_modules` must both be present in the working tree.
- **Scores don't match another harness.** Expected — see the deviations section of [METHODOLOGY.md](METHODOLOGY.md) (zero-shot chat prompting, deterministic option shuffle, single sample, strict extraction).
- **`unparseable answer` results.** The model didn't produce a recognizable `Answer: <LETTER>` line. Check the raw log; if responses are truncated, raise `max_tokens`.
- **Provider errors.** The endpoint refused or failed the request; failures are flagged retryable and score 0, marking the run as not-clean for that model.
