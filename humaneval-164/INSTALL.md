# Installing HumanEval-164 into BenchLocal

This pack is a custom, **verifier-less table pack**: it runs entirely on the host and needs **no Docker** (see §4). Install it by registering this folder as a **local source** in BenchLocal — no archive, no URL install, no registry.

---

## 1. Build

```sh
npm install
npm run build:benchlocal         # compiles benchlocal/ + lib/ to dist/
```

## 2. Install (local source)

### Local source via `config.toml`

1. Close the app while editing (the app rewrites `config.toml` when it saves config).
2. Add to `~/.benchlocal/config.toml`:

   ```toml
   [benchpacks.humaneval-164]
   enabled = true
   source = "local"
   path = "<absolute path of this pack directory>"
   version = "1.0.2"
   ```

3. Make sure the folder is built and has dependencies: `npm install`, then `npm run build:benchlocal`.
4. Start the app; the pack must read `ready` once `dist/benchlocal/index.js` exists.
5. Iterate: rebuild and reopen/reload — the host re-imports the entry on change.

---

## 3. Development loop

```bash
npm install
npm run build:benchlocal              # tsc -p tsconfig.benchlocal.json -> dist/
node dist-cli/cli/selftest.js         # optional engine sanity (see README)
# restart/reload BenchLocal; the pack must show status "ready"
```

Keep the pack registered with `source = "local"` against the working tree; no repacking and no reinstall is needed while iterating.

Optional packaging: `node scripts/pack-artifact.mjs` (strict; `--dev` for work-in-progress trees) writes `results/humaneval-164-1.0.2.tar.gz`.

## 4. Docker

**Not required and never invoked for this pack.**

- The manifest declares `"verification": false` and no `verifiers`/`sidecars`, so the host has no verifier specs to start.
- Execution is a local Python subprocess started by the pack's own code (see `README.md` / `METHODOLOGY.md` in this repo). The official execution packs (e.g. CLI-40, BugFind-15) declare Docker verifiers and therefore do need Docker; this one does not.
