# Installing MBPP+-378 into BenchLocal

This pack is a **verifier-less table pack**: it runs entirely on the host and
needs **no Docker** (see §5). It ships one artifact:
`results/mbpp-plus-378-1.0.1.tar.gz`, built by `scripts/pack-artifact.mjs`.

Host mechanics below are the ones verified against the BenchLocal desktop app
**0.4.0** host source (`packages/benchpack-host/src/index.ts`,
`packages/benchlocal-core/src/config.ts`, `app/src/**`) — the same citations the
sibling packs (`humaneval-164`, `livecodebench-v6`) document; citations are
`path:line` against that source tree.

---

## 1. What the host does with a pack artifact

### 1.1 The install pipeline

Install-from-URL does, in order:

1. **URL validation** — the URL must parse and use `http:` or `https:`
   (`index.ts:1832-1846`); a `file://` URL is rejected (`index.ts:1841-1842`), so
   a local archive cannot be installed through the URL box.
2. **Download** to a staging dir as `package.tar.gz` (`index.ts:1403-1404`).
3. **Extract** with the system `tar` binary (`index.ts:1420`).
4. **Root resolution** — the extracted top level becomes the pack root; a single
   top-level folder is unwrapped (`index.ts:1422-1428`). This pack's artifact
   puts **every member at the archive root**.
5. **Runtime hydration** — the host copies its own `@benchlocal/sdk`,
   `@benchlocal/core`, `zod` and `smol-toml` into the staged pack's
   `node_modules` (`index.ts:1357-1393`). **The artifact must not ship
   `node_modules`.**
6. **Validation** — `benchlocal.pack.json` is read from the pack root
   (`index.ts:1057-1067`), compatibility requirements are checked
   (`index.ts:1444-1448`), and for table packs the `entry` file must exist
   (`index.ts:1450-1456`).
7. **Activation** — the pack moves to
   `~/.benchlocal/benchpacks/<id>/versions/<version>-<rand>` with a `current.json`
   pointer (`index.ts:1677-1702`), and `config.toml` gains
   `[benchpacks.<id>]` with `source = "archive"` (`index.ts:1870-1887`).

There is **no checksum verification** of table-pack archives; integrity relies on
the transport. Serve release archives over HTTPS.

### 1.2 Required artifact contents (host validation)

| Requirement | Where enforced |
| --- | --- |
| `benchlocal.pack.json` at the pack root, parseable JSON | `index.ts:1057-1067` |
| Manifest has `schemaVersion: 1`, `protocolVersion: 1`, `id`, `name`, `version`, `entry` | `index.ts:1033-1055` |
| `type` omitted or `"table"` | `index.ts:972-974`, `1039-1043` |
| `capabilities` contains a `verification` **or** `sidecars` key (this pack: `"verification": false`) | `index.ts:1050-1053` |
| `requirements.benchlocal.minVersion <= app version` (this pack: `>= 0.2.0`) | `index.ts:287-319` |
| Table-pack `entry` file exists inside the installed pack | `index.ts:1450-1456` |
| The entry module loads and exposes `listScenarios` | `index.ts:1182-1210` |

Beyond the manifest, this pack's **runtime payload** must be present in the
archive, because the host installs it verbatim:

- `dist/benchlocal/index.js` (the entry) and `dist/lib/**` (its imports);
- `harness/run_problem.py` — the Python grading harness, resolved at run time
  relative to `dist/lib/..`;
- `data/manifest.json` + `data/problems/<task_id>.json` — the vendored dataset.

`README.md`, `METHODOLOGY.md`, `INSTALL.md`, `LICENSE`, `NOTICE` and
`package.json` are release-quality requirements of this repo — the host does not
read them during install.

### 1.3 What the host does *not* support

- **No local file/folder picker for packs** — install is a URL string, and
  `file://` is rejected (`index.ts:1841-1842`).
- **Local development is a config-file workflow**: `source = "local"` + `path`
  in `config.toml` (`packages/benchlocal-core/src/config.ts:126,144-149`; host
  resolution at `index.ts:955-958`). A locally-sourced pack is **not** copied or
  hydrated — it is inspected and run directly from the folder, so the folder
  needs `node_modules` **and** a built `dist/`.
- **No auto-install from a hand-written `source = "archive"` block.**

---

## 2. The artifact this repo produces

`scripts/pack-artifact.mjs` builds `results/mbpp-plus-378-1.0.1.tar.gz` with
these members (all at the archive root):

```
benchlocal.pack.json          # manifest — read from the pack root
package.json                  # CJS module-type anchor for dist/ (not host-validated)
README.md                     # release docs (not host-validated)
METHODOLOGY.md                # release docs (not host-validated)
INSTALL.md                    # release docs (not host-validated)
LICENSE                       # release docs (not host-validated)
NOTICE                        # release docs (not host-validated)
dist/benchlocal/index.js      # manifest entry — must exist
dist/lib/**                   # imports of the entry
harness/run_problem.py        # Python grading harness (run time)
data/manifest.json            # dataset manifest
data/problems/*.json          # 378 problem records (inputs + vendored expected outputs)
```

Excluded from the archive (per repo policy and host behavior): `node_modules/`
(the host hydrates its own), `_reference/`, `lib/` (TypeScript sources), `cli/`,
`scripts/`, `benchlocal/` (TS source of `dist/`), `dist-cli/`, `results/`, and
all dotfiles. The script packs an **explicit member list**, so exclusions are
structural, and it re-lists the finished archive to verify the layout.

Usage:

```bash
node scripts/pack-artifact.mjs          # strict: exit 1 listing every missing required file
node scripts/pack-artifact.mjs --fast   # strict, skip the full-read archive listing
node scripts/pack-artifact.mjs --dev    # warn instead of failing (pre-release)
```

---

## 3. Install paths

### Path A — Install from URL (recommended for testers / after release)

1. Serve the artifact from any static server, e.g. from the repo root:

   ```bash
   python -m http.server 8091 --directory results
   # -> http://127.0.0.1:8091/mbpp-plus-378-1.0.1.tar.gz
   ```

2. In the BenchLocal app: **Settings → Bench Packs** → panel **"Third-Party
   Bench Packs"**.
3. Paste the URL into **Bench Pack URL** and click **Install from URL**.
4. The app reports progress phases `downloading → extracting → hydrating →
   validating → activating` (`index.ts:1265-1274`) and then lists the pack with
   status **`ready`**.
5. Run it from the pack's UI. Uninstall from the same table removes the install
   directory and the config block (`index.ts:1903-1933`).

### Path B — Local folder via `config.toml` (dev loop)

1. Close the app (the app rewrites `config.toml` when it saves config).
2. Edit the BenchLocal config file (`~/.benchlocal/config.toml`) and add:

   ```toml
   [benchpacks.mbpp-plus-378]
   enabled = true
   source = "local"
   path = "<absolute path of this pack directory>"
   version = "1.0.1"
   ```

   (`source` enum: `config.ts:126`; `local` requires `path`: `config.ts:144-149`;
   the host resolves the pack root straight from `path`: `index.ts:955-958`.)
3. Make sure the folder has dependencies and a build: `npm install` (the repo
   declares `@benchlocal/sdk`/`@benchlocal/core` 0.3.0) and `npm run build`.
4. Start the app; the pack appears in the third-party table, status `ready` once
   `dist/benchlocal/index.js` exists (`index.ts:1169-1220`).
5. Iterate: rebuild and reopen — the host re-imports the entry keyed on file
   mtime (`index.ts:1084-1088`).

### Path C — Registry (public distribution)

A registry entry of the form
`{"type": "archive", "url": "https://…/mbpp-plus-378-1.0.1.tar.gz"}` makes the
host download exactly the artifact this repo produces (`index.ts:1728-1733`);
`{"type": "github", "repo": "...", "tag": "..."}` downloads the GitHub tag
archive instead (`index.ts:470-472`), which requires `dist/` to be committed at
that tag.

---

## 4. Recommended loops for this repo

### Dev loop

```bash
npm install
npm run build                 # dist/ + dist-cli/
npm run typecheck
node dist-cli/cli/selftest.js # 378 canonical + 3 controls
# register the folder with source = "local" once (Path B), then iterate with npm run build
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

## 5. Docker

**Not required and never invoked for this pack.** The manifest declares
`"verification": false` and no `verifiers`/`sidecars`, so the host's verifier
loop has nothing to start (`index.ts:3359-3361`, `4525-4559`). Execution is a
local Python subprocess started by the pack's own code
(`lib/executor.ts` → `harness/run_problem.py`) — see `METHODOLOGY.md`.

---

## 6. Evidence

### 6.1 Strict pack (after `npm run build`)

```
$ node scripts/pack-artifact.mjs
packing 398 members (this reads the data/ tree) ...
verifying (listing the archive — full read) ...
BenchLocal pack artifact
  pack:       mbpp-plus-378 1.0.1 (entry ./dist/benchlocal/index.js)
  output:     results/mbpp-plus-378-1.0.1.tar.gz (1.0 MiB)
  members:    398 (398 expected)
  sha256:     <printed by the packer; also written to results/mbpp-plus-378-1.0.1.sha256.txt>

  benchlocal.pack.json
  package.json
  README.md
  METHODOLOGY.md
  INSTALL.md
  LICENSE
  NOTICE
  dist/benchlocal/index.js
  dist/lib/benchmark.js
  dist/lib/dataset.js
  ...
  ... (387 more)
```

### 6.2 Archive + SHA-256

```bash
$ tar -tzf results/mbpp-plus-378-1.0.1.tar.gz | wc -l
398
$ tar -tzf results/mbpp-plus-378-1.0.1.tar.gz | grep -cE "^data/problems/"
378
$ sha256sum results/mbpp-plus-378-1.0.1.tar.gz
<64 hex chars> *results/mbpp-plus-378-1.0.1.tar.gz
```

### 6.3 Pack probe (extract the artifact, hydrate deps, load it like the host)

`_reference/probe-pack.mjs --from-archive results/mbpp-plus-378-1.0.1.tar.gz --exec Mbpp/2`
extracts the archive, copies `@benchlocal`/`zod`/`smol-toml` in the way the host
hydrates an installed pack, then imports `dist/benchlocal/index.js` and checks
the manifest, the 378 scenario cards, the score function and one end-to-end
canonical execution through the packaged `harness/run_problem.py` + `data/`:

```
[ok ] manifest id/version: ["mbpp-plus-378","1.0.1"]
[ok ] manifest author/type: ["TokenTinkerer","table"]
[ok ] sampling defaults: {"temperature":0,"max_tokens":16384,"request_timeout_seconds":900}
[ok ] scenario count: 378
[ok ] first scenario: ["Mbpp/2","mbpp-plus"]
[ok ] last scenario: "Mbpp/809"
[ok ] score all-pass: 100
[ok ] exec Mbpp/2 canonical: "passed base 3/3 plus 108/108"
PACK PROBE OK
```
