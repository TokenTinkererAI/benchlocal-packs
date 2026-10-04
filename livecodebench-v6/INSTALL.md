# Installing LiveCodeBench-v6

This is a third-party BenchLocal bench pack. It is a plain Node module plus a Python grading harness and a vendored dataset — **no Docker and no verifier container**. At run time it needs an OpenAI-compatible inference endpoint (configured in the app) and a local Python 3.9+ interpreter.

The dataset is ~4.2 GB on disk; the packaged archive is ≈3.0 GiB (the encrypted test blobs compress). Two install paths:

## Option A — local source (recommended while iterating)

The app can load the working tree directly. Add to `~/.benchlocal/config.toml`:

```toml
[benchpacks.livecodebench-v6]
enabled = true
source = "local"
path = "C:/Users/<you>/livecodebench-v6"
version = "1.0.1"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing; a settings-save before that restart can overwrite a hand edit.
- Local sources are used in place (no dependency hydration): keep `node_modules` + a fresh `npm run build` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.

## Option B — packaged archive install

```sh
npm install
npm run build
node scripts/pack-artifact.mjs        # output: results/livecodebench-v6-1.0.1.tar.gz (~3.0 GiB)
```

Serve the archive and use the app's third-party pack installation (`file://` is not accepted, so serve over HTTP; the local server stays up for the duration of the download):

```sh
py -3 -m http.server 8091 --directory results
```

then install:

```
http://127.0.0.1:8091/livecodebench-v6-1.0.1.tar.gz
```

Installed packs land under `~/.benchlocal/benchpacks/livecodebench-v6/`. Expect the install step to spend a couple of minutes unpacking the dataset.

## Python requirement

The grading harness needs **Python 3.9+**. Resolution order: `LCBV6_PYTHON` (explicit override), `py -3` (Windows launcher), `python`, `python3` — each candidate is validated by running it. If none validates, the pack reports it in the run.

## Running

- Start with small subsets: the CLI supports `--ids abc387_b,3704,...` and `--limit N`; a full 1055-problem run is a multi-hour job.
- Defaults: `temperature` 0, `max_tokens` 16384, model request timeout 900 s, 6 s per test case inside the harness, 300 s wall-clock cap per problem. The CLI exposes `--per-test-timeout-ms` and `--exec-timeout-ms` if your setup needs more headroom.
- Some problems (166 of them) carry multi-MB test sets — expect those individual problems to take distinctly longer; the wall-clock cap protects the run.

## Troubleshooting

- **`no code block found in response`** — the model didn't produce a fenced ``` block; that is the official extraction rule (a reply without fences scores 0, it is not coerced into code).
- **`Time Limit Exceeded on test N`** — the watchdog killed a test at the per-test cap; raise `--per-test-timeout-ms` only if you believe the limit is unfair for slow-but-correct code.
- **`harness error` results** — the Python harness could not run (interpreter problems, corrupt problem file). Check `LCBV6_PYTHON` and re-run; the raw log carries the stderr tail.
- **Provider errors** — the endpoint refused/failed the request; recorded per problem as retryable and scored 0, marking the run as not clean for that model.
