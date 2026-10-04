# Installing HumanEval-164 into BenchLocal

Evidence base: the installed BenchLocal desktop app is **0.4.0**
(`app/package.json:5` in the BenchLocal repo, `version: "0.4.0"`), and every
mechanism below was read from the BenchLocal host source
`packages/benchpack-host/src/index.ts` (plus
`packages/benchlocal-core/src/config.ts` and `app/src/**`) in a checkout of the
0.4.0 tree. Citations are `path:line` against that source tree.

This pack is a **verifier-less table pack**: it runs entirely on the host and
needs **no Docker** (see §6). It ships one artifact:
`results/humaneval-164-1.0.2.tar.gz`, built by `scripts/pack-artifact.mjs`.

---

## 1. What the host does with a pack artifact

### 1.1 The install pipeline

The app's install actions are `installBenchPackFromRegistry`, `installBenchPackFromUrl`,
`updateBenchPackFromRegistry` and `uninstallBenchPack`
(`packages/benchpack-host/src/index.ts:1704-1933`), wired through
`controller.installBenchPack*` (`app/src/main/controller.ts:1103-1152`) and the
IPC channels `benchlocal:benchpacks:install` / `benchlocal:benchpacks:install-from-url`
(`app/src/main/ipc.ts:43-44,254-264`; preload bridge `app/src/preload/index.ts:125`).

Install-from-URL does, in order:

1. **URL validation** — the URL must parse and use `http:` or `https:`
   (`packages/benchpack-host/src/index.ts:1832-1846`). A `file://` URL is
   rejected (`index.ts:1841-1842`), so a *local* archive cannot be installed
   through the URL box.
2. **Web-pack shortcut** — if the URL is an allowed web-pack URL *and* its path
   ends in `.json`, it is treated as a Web Bench Pack manifest; otherwise the
   URL is fetched as an archive (`index.ts:1603-1620`, `1855-1857`). Our
   `...tar.gz` URL always takes the archive path.
3. **Download** to a staging dir as `package.tar.gz` —
   `%TEMP%\benchlocal-benchpack-<rand>\package.tar.gz`
   (`index.ts:1403-1404`, `1292-1314`).
4. **Extract** with the system `tar` binary: `tar -xzf <archive> -C <dir>`
   (`index.ts:1420`; `runTarCommand` at `index.ts:698-705`). On Windows this
   uses `C:\Windows\System32\tar.exe` (bsdtar, present on Windows 10 1803+).
5. **Root resolution** — the extracted top level is used as the pack root; if
   the archive contains **exactly one top-level directory**, that directory is
   unwrapped and becomes the pack root (`index.ts:1422-1428`). Both "files at
   archive root" and "single wrapper folder" archives install; this repo's
   artifact uses **files at the archive root**.
6. **Runtime hydration** — the host copies its own bundled
   `@benchlocal/sdk`, `@benchlocal/core`, `zod` and `smol-toml` into the staged
   pack's `node_modules` (`index.ts:1357-1393`; sources resolved from
   `resources\benchlocal-runtime` via `index.ts:446-460`; that bundle is
   produced by electron-builder `extraResources`, `app/package.json:67-95`).
   **Do not ship `node_modules` in the artifact.**
7. **Validation** — `benchlocal.pack.json` is read from the pack root
   (`index.ts:1443`, `1057-1067`), compatibility requirements are checked
   (`index.ts:1444-1448`, `277-332`), and for table packs the `entry` file must
   exist on disk (`index.ts:1450-1456`).
8. **Activation** — the staged directory is moved to
   `<benchpack_storage_dir>/<id>/versions/<version>-<rand>` and
   `<benchpack_storage_dir>/<id>/current.json` is pointed at it
   (`index.ts:1677-1702`, `1694-1697`, `1734-1742`), and the config gets
   `[benchpacks.<id>]` with `source = "archive"` and the URL
   (`index.ts:1870-1887`; first installed pack also becomes `default_benchpack`,
   `index.ts:1889-1891`).
   `benchpack_storage_dir` defaults to `~/.benchlocal/benchpacks`
   (`packages/benchlocal-core/src/config.ts:268-277`); by default that is
      `~/.benchlocal/benchpacks`.
9. **Uninstall** removes the config block and the whole install directory
   (`index.ts:1903-1933`).

There is **no checksum or signature verification** of table-pack archives —
integrity relies on the transport (HTTPS). The only hash the host knows about
is `manifestHash` for *web* packs (`index.ts:1029`). Serve release archives
over HTTPS.

### 1.2 Required artifact contents (host validation)

A table pack is valid, at the host's enforcement level, when:

| Requirement | Where enforced |
| --- | --- |
| `benchlocal.pack.json` at the pack root, parseable JSON | `packages/benchpack-host/src/index.ts:1057-1067` |
| Manifest has `schemaVersion: 1`, `protocolVersion: 1`, `id`, `name`, `version`, `entry` (all strings) | `index.ts:1033-1055` (checks `1041-1047`) |
| `type` omitted or `"table"` (absent defaults to table) | `index.ts:972-974`, `1039-1043` |
| `capabilities` object containing a `verification` **or** `sidecars` key | `index.ts:1050-1053` (ours: `"verification": false`, `benchlocal.pack.json:32`) |
| `requirements`, when present, is well-shaped; `hostFeatures` must be a supported feature set | `index.ts:140-165`, `1033-1053`, supported features `index.ts:129` (`inferenceEndpoints`, `dockerInferenceEndpoints`) |
| Version window: `requirements.benchlocal.minVersion <= app version` (also optional `maxVersionExclusive`) | `index.ts:287-319`; app version comes from the app's `package.json` (`app/src/main/app-metadata.ts:54-73`, `app/src/main/controller.ts:792-798`). Ours demands `>= 0.2.0` (`benchlocal.pack.json:15-16`) — satisfied by 0.4.0 |
| Table pack `entry` file exists **inside the installed pack** | `index.ts:1450-1456` (install) and `index.ts:1169-1180` / `2007-2011` (inspect / run) |
| The entry module loads and exports `listScenarios` | `index.ts:1182-1210` (`load_error` status otherwise), `1199-1207`; default-export interop handled at `index.ts:1069-1082` |

So the two host-critical members are **`benchlocal.pack.json`** and the
**entry target `dist/benchlocal/index.js`** (mapped from `benchlocal.pack.json:9`
+ `tsconfig.benchlocal.json`, which compiles `benchlocal/**` + `lib/**` to
`dist/`). The `dist/lib/**` files the entry imports must be shipped as well or
the module load fails (`index.ts:1221-1229`).

`README.md`, `METHODOLOGY.md`, `LICENSE`, `NOTICE` and `package.json` are
release-quality requirements of this repo — the host does not read them during
install. (`package.json` is deliberately shipped without `"type": "module"`,
matching the CommonJS output of `tsconfig.benchlocal.json`, so the host's
`await import(entryPath)` loads the entry correctly; `index.ts:1084-1088`.)

### 1.3 What the host does *not* support

- **No local file/folder picker for packs.** The only install input in the UI
  is a URL string (`app/src/renderer/src/App.tsx:9898-9932`,
  `app/src/preload/index.ts:125`), and `file://` is rejected
  (`index.ts:1841-1842`).
- **Local development is a config-file workflow**: `source = "local"` +
  `path` in `config.toml` (see §3B; schema at
  `packages/benchlocal-core/src/config.ts:49,126,144-149`; host resolution at
  `index.ts:955-958`). A locally-sourced pack is *not* copied or hydrated —
  it is inspected and run directly from the folder.
- **No auto-install from a hand-written `source = "archive"` block.** The
  download+install code runs only from the install/update actions
  (`index.ts:1726-1733`, `1787-1794`, `1855-1860`); a manually added archive
  entry resolves against the installed-versions dir like any other source
  (`index.ts:960-970`).

---

## 2. The artifact this repo produces

`scripts/pack-artifact.mjs` builds `results/humaneval-164-1.0.2.tar.gz` with
these members (all at the archive root):

```
benchlocal.pack.json      # manifest — root of the archive (index.ts:1057-1058)
package.json              # CJS module-type anchor for dist/ (not host-validated)
README.md                 # release docs (not host-validated)
METHODOLOGY.md            # release docs (not host-validated)
LICENSE                   # release docs (not host-validated)
NOTICE                    # release docs (not host-validated)
dist/benchlocal/index.js  # manifest entry — must exist (index.ts:1450-1456)
dist/lib/**               # imports of the entry; required for module load
```

Excluded from the archive (per repo policy and host behavior):
`node_modules/` (host hydrates its own, `index.ts:1357-1393`), `_reference/`,
`data/`, `lib/` (TypeScript sources), `cli/`, `dist-cli/`, `dist-engine/`,
`scripts/`, `benchlocal/` (TS source of `dist/benchlocal`), `results/`, and all
dotfiles. The script packs an **explicit member list**, so exclusions are
structural, and it re-lists the finished archive to verify the layout.

Usage:

```bash
node scripts/pack-artifact.mjs          # strict: exit 1 listing every missing required file
node scripts/pack-artifact.mjs --dev    # warns about missing files, packs what exists
```

Strict mode exits 1 with the missing files and a build hint; `--dev` is for
work-in-progress trees (e.g. before `npm run build:benchlocal` has been run).

---

## 3. Install paths

### Path A — Install from URL (recommended for testers / after release)

Prereq: the archive is reachable at an `http://` or `https://` URL
(`index.ts:1841-1845`; the app fetches in its main process, so no CORS
involvement — `index.ts:1306`).

1. Serve the artifact from any static server, e.g. from the repo root:

   ```bash
   python -m http.server 8091 --directory results
   # -> http://127.0.0.1:8091/humaneval-164-1.0.2.tar.gz
   ```

2. In the BenchLocal app: **Settings → Bench Packs** (`app/src/renderer/src/App.tsx:487-494`)
   → panel **"Third-Party Bench Packs"** (`App.tsx:9898-9904`).
3. Paste the URL into **Bench Pack URL** (placeholder
   `https://example.com/my-benchpack.tar.gz`, `App.tsx:9907-9914`) and click
   **Install from URL** (`App.tsx:9915-9931`).
4. The app reports progress phases `downloading → extracting → hydrating →
   validating → activating` (`index.ts:1265-1274`) and then shows
   `humaneval-164` in the third-party table with source = the archive URL
   (`App.tsx:9766-9785`); status must be **`ready`**.
5. Run it from the pack's UI. Uninstall from the same table removes the
   install directory and the config block (`index.ts:1903-1933`).

On failure (missing entry, incompatible version, bad manifest) the UI surfaces
the host error string (`App.tsx:3382-3384`); status strings are inspected at
`index.ts:1091-1230` (`entry_missing`, `invalid_manifest`, `incompatible`,
`load_error`, …).

### Path B — Local folder via `config.toml` (dev loop)

There is no UI for this (§1.3); it is the supported local workflow
(`packages/benchlocal-core/src/config.ts:144-149`).

1. Close the app (the app rewrites `config.toml` when it saves config —
   `app/src/main/controller.ts:804-817`).
2. Edit the BenchLocal config file (`~/.benchlocal/config.toml` — path derived from
   `packages/benchlocal-core/src/config.ts:195-213`) and add:

   ```toml
   [benchpacks.humaneval-164]
   enabled = true
   source = "local"
   path = "<absolute path of this pack directory>"
   version = "1.0.2"
   ```

   (`source` enum: `config.ts:126`; `local` **requires** `path`:
   `config.ts:144-149`; the host resolves the pack root straight from `path`
   with no copy/hydration: `packages/benchpack-host/src/index.ts:955-958`.)
3. Make sure the folder is built and has dependencies: `npm install` (the
   repo declares `@benchlocal/sdk`/`@benchlocal/core` 0.3.0,
   `package.json:15-18`; hydration does **not** run for local packs —
   `index.ts:1435` only runs in the archive path), then `npm run build:benchlocal`.
4. Start the app. Settings → Bench Packs lists the pack in the third-party
   table (any `source !== "registry"` entry appears, `App.tsx:9766-9785`);
   status must read `ready` once `dist/benchlocal/index.js` exists
   (`index.ts:1169-1220`).
5. Iterate: rebuild (`npm run build:benchlocal`) and reopen/reload — the host
   re-imports the entry keyed on file mtime (`index.ts:1084-1088`), so a stale
   module is not an issue across rebuilds.

### Path C — Official registry (public distribution)

Packs listed in the registry at `registry.official_url` (default
`https://raw.githubusercontent.com/stevibe/benchlocal-registry/main/registry.json`,
`packages/benchlocal-core/src/config.ts:278-280`; registry loaded at
`index.ts:1244-1263`) can be installed with the registry's Install button.
Registry entries for archive-style packs support:

- `{"type": "github", "repo": "...", "tag": "..."}` → the host downloads
  `https://codeload.github.com/<repo>/tar.gz/refs/tags/<tag>`
  (`index.ts:470-472`, `1728`) — i.e. **the GitHub archive of the tag**, which
  has a single top-level folder and is unwrapped per `index.ts:1422-1428`.
  There is no build step, so `dist/benchlocal/index.js` must be committed at
  that tag.
- `{"type": "archive", "url": "https://…/humaneval-164-1.0.2.tar.gz"}` → the
  host downloads that URL directly (`index.ts:1728-1733`) — this is exactly the
  artifact `scripts/pack-artifact.mjs` produces.

Registry entry shape: `index.ts:334-355` (id, name, version, source;
`schemaVersion: 1` + `packs[]` at `index.ts:357-364`).

---

## 4. Recommended loops for this repo

### Dev loop

```bash
npm install
npm run build:benchlocal              # tsc -p tsconfig.benchlocal.json -> dist/
# add the config.toml block from Path B once, then per iteration:
npm run build:benchlocal              # rebuild
node dist-cli/cli/selftest.js         # optional engine sanity (see README)
# reopen/reload BenchLocal; the pack must show status "ready"
```

Keep the pack registered with `source = "local"` against the working tree; no
repacking and no reinstall is needed while iterating.

### Release loop

```bash
# 1. bump version in benchlocal.pack.json AND package.json (both are shipped)
# 2. build + verify
npm run build:benchlocal
node dist-cli/cli/selftest.js
# 3. pack STRICT (fails loudly if dist/ or docs are missing)
node scripts/pack-artifact.mjs        # -> results/humaneval-164-1.0.2.tar.gz
# 4. smoke-test the real install path
python -m http.server 8091 --directory results
#    Settings -> Bench Packs -> Third-Party Bench Packs -> Install from URL
# 5. publish: attach results/humaneval-164-1.0.2.tar.gz to the GitHub release
#    for the tag; for registry distribution add an entry per Path C.
```

Notes:

- Upgrades of an installed pack go through the registry update path, which
  requires the pack to exist in the registry (`index.ts:1761-1782`,
  `1801-1803`). URL-installed packs are upgraded by installing the new URL
  again (old version directories are left on disk; only `.staging-*` dirs are
  pruned, `index.ts:525-530`).
- The archive filename version is derived from `benchlocal.pack.json`
  (`humaneval-164-1.0.2.tar.gz`); the host derives its version directory name
  with the same sanitization rule (`index.ts:532-534`).

---

## 5. Docker

**Not required and never invoked for this pack.**

- The manifest declares `"verification": false` and no `verifiers`/`sidecars`
  (`benchlocal.pack.json:28-33`). The host reads verifier specs as
  `manifest.verifiers ?? manifest.sidecars ?? []`
  (`packages/benchpack-host/src/index.ts:3359-3361`) — for this pack that is an
  empty list.
- The run path calls `startConfiguredBenchPackVerifiers`
  (`index.ts:4525-4559`), whose whole body is a loop over those specs; with no
  specs nothing runs. Even for packs with specs, only `mode === "docker"` with
  `auto_start` triggers container work, and a missing Docker runtime only
  throws when the spec is `required` (`index.ts:3613-3637`).
- The run does not block on any verifier (`blockingVerifier` finds none,
  `index.ts:4572-4579`), and the Verification settings tab filters to packs
  whose capabilities declare `verification`/`sidecars`
  (`app/src/main/controller.ts:1454-1459`) — this pack never appears there.
- Execution is a local Python subprocess from the pack's own code (see
  `README.md` / `METHODOLOGY.md` in this repo). The official execution packs
  (e.g. CLI-40, BugFind-15) declare Docker verifiers and therefore do need
  Docker; this one does not.
