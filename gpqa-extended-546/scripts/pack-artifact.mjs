#!/usr/bin/env node
/**
 * pack-artifact.mjs — build the installable BenchLocal artifact for this repo.
 *
 * Produces `results/<pack-id>-<version>.tar.gz` with every member at the
 * archive root (NOT nested in a folder).
 *
 * Host contract this layout satisfies (BenchLocal 0.4.0 desktop app, host
 * source `packages/benchpack-host/src/index.ts`):
 *
 *  - The app downloads Bench Packs as `package.tar.gz` and unpacks them with
 *    the system `tar` binary:  `tar -xzf <archive> -C <dir>`      (:1403-1420)
 *  - The pack root is the archive root; a single top-level directory is
 *    detected and unwrapped, so both layouts work                (:1422-1428)
 *  - `benchlocal.pack.json` is read from the pack root           (:1443, :1057-1067)
 *  - For table packs the `entry` file must exist                 (:1450-1455)
 *  - The host hydrates `node_modules/@benchlocal/{sdk,core}`,
 *    `zod` and `smol-toml` itself into the installed pack        (:1357-1393)
 *    => node_modules MUST NOT be shipped in the artifact.
 *
 * Usage:
 *   node scripts/pack-artifact.mjs          # strict (exit 1 if anything required is missing)
 *   node scripts/pack-artifact.mjs --dev    # warn instead of failing (pre-release / partial tree)
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`Usage: node scripts/pack-artifact.mjs [--dev]

  (no flags)  strict mode: exit 1 with a clear message if required files are missing
  --dev       development mode: warn about missing required files and pack what exists`);
  process.exit(0);
}

const unknownFlags = argv.filter((flag) => flag !== "--dev");
if (unknownFlags.length > 0) {
  console.error(`error: unknown argument(s): ${unknownFlags.join(", ")} (supported: --dev, --help)`);
  process.exit(2);
}

const DEV = argv.includes("--dev");

/**
 * Release artifact file list (top-level members of the archive).
 * `dist/**` is the benchlocal build (`npm run build:benchlocal`,
 * tsconfig.benchlocal.json -> outDir "dist"), never the CLI/engine builds.
 */
const ROOT_FILES = ["benchlocal.pack.json", "package.json", "README.md", "METHODOLOGY.md", "LICENSE", "NOTICE"];
const DIST_ENTRY = "dist/benchlocal/index.js";
const DIST_LIB_DIR = "dist/lib";
const ARCHIVE_TOP_LEVEL_ALLOWLIST = new Set([...ROOT_FILES, "dist"]);

function isFile(relPath) {
  try {
    return fs.statSync(path.join(REPO_ROOT, relPath)).isFile();
  } catch {
    return false;
  }
}

function isDirectory(relPath) {
  try {
    return fs.statSync(path.join(REPO_ROOT, relPath)).isDirectory();
  } catch {
    return false;
  }
}

/** Collect dist/** files, skipping dotfiles, node_modules and tsbuildinfo. */
function collectDistFiles() {
  const files = [];

  const walk = (rel) => {
    const abs = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(abs)) {
      return;
    }
    for (const entry of fs.readdirSync(abs, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
      if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name.endsWith(".tsbuildinfo")) {
        continue;
      }
      const childRel = `${rel}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(childRel);
      } else if (entry.isFile()) {
        files.push(childRel);
      }
    }
  };

  walk("dist");
  return files;
}

function readJson(relPath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8"));
  } catch {
    return null;
  }
}

/** Mirrors sanitizeBenchPackVersion in the host (index.ts:532-534). */
function sanitizeName(input) {
  return String(input).replace(/[^a-zA-Z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// 1. Determine required files and find what is missing
// ---------------------------------------------------------------------------

const manifest = readJson("benchlocal.pack.json");
const pkg = readJson("package.json");

const distFiles = collectDistFiles();
const distLibJs = distFiles.filter((file) => file.startsWith(`${DIST_LIB_DIR}/`) && file.endsWith(".js"));

const missing = [];
for (const rel of ROOT_FILES) {
  if (!isFile(rel)) {
    missing.push({ rel, why: "release artifact file list" });
  }
}
if (!isFile(DIST_ENTRY)) {
  missing.push({ rel: DIST_ENTRY, why: "manifest entry (host requires it to exist: packages/benchpack-host/src/index.ts:1450-1455)" });
}
if (distLibJs.length === 0) {
  missing.push({ rel: `${DIST_LIB_DIR}/**/*.js`, why: "compiled lib imported by the entry (repo-local build output)" });
}

// manifest.entry must point at a member we actually ship.
if (typeof manifest?.entry === "string") {
  const normalizedEntry = manifest.entry.replace(/^\.\//, "");
  const shipped = new Set([...ROOT_FILES.filter(isFile), ...distFiles]);
  if (!shipped.has(normalizedEntry) && !missing.some((item) => item.rel === normalizedEntry)) {
    missing.push({ rel: normalizedEntry, why: `declared as manifest entry ("${manifest.entry}") but not included in the artifact` });
  }
}

if (missing.length > 0 && !DEV) {
  console.error("error: refusing to pack — required file(s) missing:\n");
  for (const item of missing) {
    console.error(`  - ${item.rel}  (${item.why})`);
  }
  console.error(`\nhint: run "npm run build:benchlocal" first, or pass --dev to build a`);
  console.error(`development-only artifact that warns instead of failing.`);
  process.exit(1);
}

if (missing.length > 0) {
  console.warn("[pack-artifact] WARNING: development mode — required file(s) missing (artifact is NOT release-ready):");
  for (const item of missing) {
    console.warn(`  - ${item.rel}  (${item.why})`);
  }
  console.warn("");
}

// ---------------------------------------------------------------------------
// 2. Assemble the member list (archive root, deterministic order)
// ---------------------------------------------------------------------------

const members = [...ROOT_FILES.filter(isFile), ...distFiles];

if (members.length === 0) {
  console.error("error: nothing to pack.");
  process.exit(1);
}

const packId = sanitizeName(manifest?.id ?? pkg?.name ?? "benchpack") || "benchpack";
const packVersion = sanitizeName(manifest?.version ?? pkg?.version ?? "0.0.0") || "0.0.0";
const outPath = path.join(REPO_ROOT, "results", `${packId}-${packVersion}.tar.gz`);
// tar -f is called with a repo-relative path (and cwd=REPO_ROOT): GNU tar treats
// a "C:/..." argument as a remote host spec ("Cannot connect to C: resolve
// failed"), so a drive-letter path must never be passed to -f.
const outPathForTar = path.relative(REPO_ROOT, outPath).replaceAll("\\", "/");

fs.mkdirSync(path.dirname(outPath), { recursive: true });

// ---------------------------------------------------------------------------
// 3. Create the tarball (host unpacks with `tar -xzf`, index.ts:1420)
// ---------------------------------------------------------------------------

const tarResult = spawnSync("tar", ["-czf", outPathForTar, "--", ...members], {
  cwd: REPO_ROOT,
  encoding: "utf8"
});

if (tarResult.error) {
  console.error(`error: failed to run "tar": ${tarResult.error.message}`);
  process.exit(1);
}
if (tarResult.status !== 0) {
  console.error(`error: tar exited with status ${tarResult.status}`);
  if (tarResult.stderr?.trim()) {
    console.error(tarResult.stderr.trim());
  }
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 4. Verify what actually landed in the archive
// ---------------------------------------------------------------------------

const listResult = spawnSync("tar", ["-tzf", outPathForTar], { cwd: REPO_ROOT, encoding: "utf8" });
if (listResult.error || listResult.status !== 0) {
  console.error(`error: failed to list the created archive: ${listResult.error?.message ?? `tar exited ${listResult.status}`}`);
  process.exit(1);
}

const listedMembers = listResult.stdout.split(/\r?\n/).filter(Boolean);
const problems = [];

if (listedMembers.length === 0) {
  problems.push("archive is empty");
}
for (const member of listedMembers) {
  const segments = member.split("/");
  if (!ARCHIVE_TOP_LEVEL_ALLOWLIST.has(segments[0])) {
    problems.push(`unexpected top-level member: ${member}`);
  }
  if (segments.some((segment) => segment.startsWith("."))) {
    problems.push(`dotfile member: ${member}`);
  }
}
for (const required of members) {
  if (!listedMembers.includes(required)) {
    problems.push(`member vanished during packaging: ${required}`);
  }
}

if (problems.length > 0) {
  console.error("error: artifact verification failed:");
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

const sha256 = createHash("sha256").update(fs.readFileSync(outPath)).digest("hex");
const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);

console.log("BenchLocal pack artifact");
if (manifest) {
  console.log(`  pack:       ${packId} ${packVersion} (entry ${manifest.entry})`);
} else {
  console.log(`  pack:       ${packId} ${packVersion} (benchlocal.pack.json missing — dev artifact only)`);
}
console.log(`  output:     ${path.relative(REPO_ROOT, outPath).replaceAll("\\", "/")} (${sizeKb} KiB)`);
console.log(`  members:    ${listedMembers.length} (dist/: ${distFiles.length} files)`);
console.log(`  layout:     files at archive root — single-folder archives are also unwrapped by the host, see index.ts:1422-1428`);
console.log(`  sha256:     ${sha256}`);
if (DEV && missing.length > 0) {
  console.log(`  mode:       dev (warnings only — ${missing.length} required file(s) missing)`);
}
console.log("");
for (const member of listedMembers) {
  console.log(`  ${member}`);
}
