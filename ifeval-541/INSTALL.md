# Installing IFEval-541

This is a custom BenchLocal bench pack — a plain repository installed by registering it as a **local source** in the app (no archive, no URL install, no registry).

The pack is a plain Node module plus a Python grading harness — **no Docker, no
verifier container, no pip installs**. Runtime requirements: Python 3.9+ on the
machine running BenchLocal, and an OpenAI-compatible inference endpoint.

## 1. Build

```sh
npm install
npm run build          # compiles the pack + CLI
```

## 2. Install (local source)

This pack is custom — it is not distributed through the official registry. Point BenchLocal at this folder directly by adding to `~/.benchlocal/config.toml`:

```toml
[benchpacks.ifeval-541]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.2"
```

Notes:

- The app reads `config.toml` at startup only — restart it after editing. A settings-save before that restart can overwrite a hand edit; restart first, then confirm the block survived.
- Local sources are used in place (no dependency hydration): keep `node_modules` + a fresh `npm run build` in the working tree, and keep the block's `version` in sync with `benchlocal.pack.json`.
- This pack ships **without** a config entry — nothing is registered for you.

## 3. Python on the host

The grading harness is Python and needs **3.9 or newer** — nothing else; the
checker code and its pure-Python dependencies are vendored inside the pack.
Resolution order: `IFEVAL541_PYTHON` (explicit override) → `py -3` (Windows) →
`python` → `python3`. The chosen interpreter is printed at the start of every
run (`python: py -3 (3.14)`).

If the app reports `Python 3.9+ not found`, install Python or set
`IFEVAL541_PYTHON` to its full path.

## 4. Get a model endpoint

Any OpenAI-compatible chat endpoint works — a local server (llama.cpp,
LM Studio, ollama) or a hosted API. Configure it in the app (base URL + model
name; an API key if required).

Defaults: temperature 0, `max_tokens` 65536, 3600 s request timeout (replies are
requested with `stream: true` — see the Transport section of
[METHODOLOGY.md](METHODOLOGY.md)). IFEval
prompts are also a formatting test — instruct-tuned models sometimes burn many
tokens on preamble; if a summary says `(response truncated - raise
max_tokens)`, raise the budget for that run.

## 5. Run

Select the pack, pick a model, run. 541 scenarios, one chat completion each;
results aggregate to points out of 100 (`totalScore`) with the strict/loose
breakdown in the summary line.

## Troubleshooting

- **Scores differ from a Punkt-based harness.** Expected on edge cases — see the
  substitutions and deviations sections of [METHODOLOGY.md](METHODOLOGY.md)
  (regex sentence splitting, whitespace word tokenization, zero-shot prompting,
  single sample).
- **`harness error: ...` results.** The Python harness failed to grade (e.g. a
  missing interpreter or a corrupt install). The raw log carries the harness
  message and stderr tail; re-install the pack if `harness/` files are missing.
- **`empty response` results.** The model returned no text (or only whitespace);
  every instruction counts as not followed.
- **Provider errors.** The endpoint refused or failed the request; they are
  flagged retryable, score 0 and are visible in each scenario's raw log.
