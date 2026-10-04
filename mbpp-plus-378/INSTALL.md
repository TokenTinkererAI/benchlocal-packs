# Installing MBPP+-378 into BenchLocal

This pack is a custom, **verifier-less table pack**: it runs entirely on the host and needs **no Docker** (see §4). Install it by registering this folder as a **local source** in BenchLocal — no archive, no URL install, no registry.

---

## 1. Build

```sh
npm install
npm run build          # compiles the pack + CLI
```

## 2. Install (local source)

### Local source via `config.toml`

1. Close the app while editing (it rewrites `config.toml` when it saves config).
2. Add to `~/.benchlocal/config.toml`:

   ```toml
   [benchpacks.mbpp-plus-378]
   enabled = true
   source = "local"
   path = "<absolute path of this pack directory>"
   version = "1.0.1"
   ```

3. Make sure the folder has dependencies and a build: `npm install`, then `npm run build`.
4. Start the app; the pack appears with status `ready` once `dist/benchlocal/index.js` exists.
5. Iterate: rebuild and reopen/reload — the host re-imports the entry on change.

---

## 3. Recommended loops for this repo

### Dev loop

```bash
npm install
npm run build                 # dist/ + dist-cli/
npm run typecheck
node dist-cli/cli/selftest.js # 378 canonical + 3 controls
# register the folder with source = "local" once (see above), then iterate with npm run build
```

### Release loop

```bash
npm run build:dataset     # rebuild data/problems + manifest from data/MbppPlus.jsonl.gz
npm run build             # compile pack + CLI
npm run typecheck
npm run selftest          # 378/378 canonical + controls
npm run pack              # -> results/mbpp-plus-378-1.0.1.tar.gz (strict + verified)
sha256sum results/mbpp-plus-378-1.0.1.tar.gz
```

---

## 4. Docker

**Not required and never invoked for this pack.** The manifest declares
`"verification": false` and no `verifiers`/`sidecars`, so the host's verifier
loop has nothing to start. Execution is a
local Python subprocess started by the pack's own code
(`lib/executor.ts` → `harness/run_problem.py`) — see `METHODOLOGY.md`.

---
