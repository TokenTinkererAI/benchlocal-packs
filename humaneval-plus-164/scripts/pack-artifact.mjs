#!/usr/bin/env node
/**
 * pack-artifact.mjs - build the installable BenchLocal artifact for this repo.
 *
 * Produces `results/humaneval-plus-164-<version>.tar.gz` with every member at
 * the archive root (NOT nested in a folder): manifest + package.json + docs +
 * dist/ (compiled pack) + harness/ (Python grading harness) + data/
 * (per-problem records, manifest, canonical fixtures, vendored source asset).
 *
 * Host contract this layout satisfies (BenchLocal desktop app host source):
 *  - archive members unpack at the pack root; `benchlocal.pack.json` is read there;
 *  - for table packs the `entry` file must exist;
 *  - the host hydrates @benchlocal deps into the installed pack => node_modules
 *    MUST NOT be shipped.
 *
 * Verification reads the archive back (a full read of ~280 MB of data), so the
 * console member list is previewed rather than printed in full.
 *
 * Usage:
 *   node scripts/pack-artifact.mjs          # strict + full verification
 *   node scripts/pack-artifact.mjs --fast   # strict, skip the tar -t verification
 *   node scripts/pack-artifact.mjs --dev    # warn instead of failing (pre-release)
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`Usage: node scripts/pack-artifact.mjs [--dev] [--fast]

  (no flags)  strict mode: fail if required files are missing; verify by listing the archive
  --fast      skip the archive listing verification (still checks the tar exit code)
  --dev       development mode: warn about missing required files and pack what exists`);
  process.exit(0);
}

const unknownFlags = argv.filter((flag) => !["--dev", "--fast"].includes(flag));
if (unknownFlags.length > 0) {
  console.error(`error: unknown argument(s): ${unknownFlags.join(", ")} (supported: --dev, --fast, --help)`);
  process.exit(2);
}

const DEV = argv.includes("--dev");
const FAST = argv.includes("--fast");

const ROOT_FILES = [
  "benchlocal.pack.json",
  "package.json",
  "README.md",
  "METHODOLOGY.md",
  "INSTALL.md",
  "LICENSE",
  "NOTICE"
];
const EXTRA_DIRS = ["dist", "harness", "data"];
const DIST_ENTRY = "dist/benchlocal/index.js";
const DIST_LIB_DIR = "dist/lib";
const ARCHIVE_TOP_LEVEL_ALLOWLIST = new Set([...ROOT_FILES, ...EXTRA_DIRS]);
const LIST_PREVIEW = 30;

function isFile(relPath) {
  try {
    return fs.statSync(path.join(REPO_ROOT, relPath)).isFile();
  } catch {
    return false;
  }
}

function collectDir(rel) {
  const files = [];
  const walk = (relDir) => {
    const abs = path.join(REPO_ROOT, relDir);
    if (!fs.existsSync(abs)) {
      return;
    }
    for (const entry of fs.readdirSync(abs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === "__pycache__" ||
        entry.name.endsWith(".tsbuildinfo") ||
        entry.name.endsWith(".pyc")
      ) {
        continue;
      }
      const childRel = `${relDir}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(childRel);
      } else if (entry.isFile()) {
        files.push(childRel);
      }
    }
  };
  walk(rel);
  return files;
}

function readJson(relPath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8"));
  } catch {
    return null;
  }
}

function sanitizeName(input) {
  return String(input).replace(/[^a-zA-Z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// 1. Required files + data integrity
// ---------------------------------------------------------------------------

const manifest = readJson("benchlocal.pack.json");
const pkg = readJson("package.json");
const dataManifest = readJson("data/manifest.json");

const collected = EXTRA_DIRS.flatMap((dir) => collectDir(dir));
const distLibJs = collected.filter((file) => file.startsWith(`${DIST_LIB_DIR}/`) && file.endsWith(".js"));

const missing = [];
for (const rel of ROOT_FILES) {
  if (!isFile(rel)) {
    missing.push({ rel, why: "release artifact file list" });
  }
}
if (!isFile(DIST_ENTRY)) {
  missing.push({ rel: DIST_ENTRY, why: "manifest entry (host requires it to exist)" });
}
if (distLibJs.length === 0) {
  missing.push({ rel: `${DIST_LIB_DIR}/**/*.js`, why: "compiled lib imported by the entry" });
}
if (!isFile("harness/run_problem.py")) {
  missing.push({ rel: "harness/run_problem.py", why: "Python grading harness used at run time" });
}
if (!isFile("data/canonical.json")) {
  missing.push({ rel: "data/canonical.json", why: "self-test and mock fixtures" });
}
if (!isFile("data/source/HumanEvalPlus.jsonl.gz")) {
  missing.push({ rel: "data/source/HumanEvalPlus.jsonl.gz", why: "vendored EvalPlus release asset (source pin)" });
}
for (const license of ["data/LICENSE-human-eval", "data/LICENSE-evalplus"]) {
  if (!isFile(license)) {
    missing.push({ rel: license, why: "upstream license shipped with the dataset" });
  }
}

// data integrity: manifest count vs problem files on disk, exclusion bookkeeping
try {
  const problemsDir = path.join(REPO_ROOT, "data", "problems");
  const problemFiles = fs.existsSync(problemsDir)
    ? fs.readdirSync(problemsDir).filter((name) => name.endsWith(".json"))
    : [];
  const declared = dataManifest?.problems ?? [];
  if (!dataManifest) {
    missing.push({ rel: "data/manifest.json", why: "unreadable" });
  } else {
    if (problemFiles.length !== declared.length) {
      missing.push({
        rel: "data/problems/*.json",
        why: `expected ${declared.length} problem files, found ${problemFiles.length}`
      });
    }
    const notOnDisk = declared.filter((problem) => !problemFiles.includes(problem.file));
    if (notOnDisk.length > 0) {
      missing.push({ rel: notOnDisk[0].file, why: `${notOnDisk.length} declared problem file(s) missing` });
    }
    if (dataManifest.counts?.problems !== 164) {
      missing.push({ rel: "data/manifest.json", why: `expected 164 problems, found ${dataManifest.counts?.problems}` });
    }
    const excluded = declared.reduce((total, problem) => total + (problem.excludedInputs ?? 0), 0);
    if (excluded !== dataManifest.exclusions?.count) {
      missing.push({
        rel: "data/manifest.json",
        why: `exclusion bookkeeping mismatch: per-problem ${excluded} vs declared ${dataManifest.exclusions?.count}`
      });
    }
  }
} catch {
  missing.push({ rel: "data/manifest.json", why: "unreadable" });
}

if (typeof manifest?.entry === "string") {
  const normalizedEntry = manifest.entry.replace(/^\.\//, "");
  const shipped = new Set([...ROOT_FILES.filter(isFile), ...collected]);
  if (!shipped.has(normalizedEntry) && !missing.some((item) => item.rel === normalizedEntry)) {
    missing.push({ rel: normalizedEntry, why: `declared as manifest entry ("${manifest.entry}") but not included` });
  }
}

if (missing.length > 0 && !DEV) {
  console.error("error: refusing to pack - required file(s) missing:\n");
  for (const item of missing) {
    console.error(`  - ${item.rel}  (${item.why})`);
  }
  console.error(`\nhint: run "npm run build" first, or pass --dev for a development-only artifact.`);
  process.exit(1);
}
if (missing.length > 0) {
  console.warn("[pack-artifact] WARNING: development mode - required file(s) missing:");
  for (const item of missing) {
    console.warn(`  - ${item.rel}  (${item.why})`);
  }
  console.warn("");
}

// ---------------------------------------------------------------------------
// 2. Member list + tarball
// ---------------------------------------------------------------------------

const members = [...ROOT_FILES.filter(isFile), ...collected];
if (members.length === 0) {
  console.error("error: nothing to pack.");
  process.exit(1);
}

const packId = sanitizeName(manifest?.id ?? pkg?.name ?? "benchpack") || "benchpack";
const packVersion = sanitizeName(manifest?.version ?? pkg?.version ?? "0.0.0") || "0.0.0";
const outPath = path.join(REPO_ROOT, "results", `${packId}-${packVersion}.tar.gz`);
const outPathForTar = path.relative(REPO_ROOT, outPath).replaceAll("\\", "/");

fs.mkdirSync(path.dirname(outPath), { recursive: true });

console.log(`packing ${members.length} members (this reads the data/ tree) ...`);
const tarResult = spawnSync("tar", ["-czf", outPathForTar, "--", ...members], {
  cwd: REPO_ROOT,
  encoding: "utf8",
  maxBuffer: 256 * 1024 * 1024
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
// 3. Verification
// ---------------------------------------------------------------------------

let listedMembers = [];
if (!FAST) {
  console.log("verifying (listing the archive - full read) ...");
  const listResult = spawnSync("tar", ["-tzf", outPathForTar], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024
  });
  if (listResult.error || listResult.status !== 0) {
    console.error(`error: failed to list the created archive: ${listResult.error?.message ?? `tar exited ${listResult.status}`}`);
    process.exit(1);
  }
  listedMembers = listResult.stdout.split(/\r?\n/).filter(Boolean);

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
    for (const problem of problems.slice(0, 50)) {
      console.error(`  - ${problem}`);
    }
    process.exit(1);
  }
}

const sha256 = createHash("sha256").update(fs.readFileSync(outPath)).digest("hex");
const sizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);

console.log("BenchLocal pack artifact");
if (manifest) {
  console.log(`  pack:       ${packId} ${packVersion} (entry ${manifest.entry})`);
}
console.log(`  output:     ${path.relative(REPO_ROOT, outPath).replaceAll("\\", "/")} (${sizeMb} MiB)`);
console.log(
  `  members:    ${FAST ? members.length : listedMembers.length} (${members.length} expected)${FAST ? " [fast: listing skipped]" : ""}`
);
console.log(`  sha256:     ${sha256}`);
if (DEV && missing.length > 0) {
  console.log(`  mode:       dev (warnings only - ${missing.length} required file(s) missing)`);
}
console.log("");
const preview = (FAST ? members : listedMembers).slice(0, LIST_PREVIEW);
for (const member of preview) {
  console.log(`  ${member}`);
}
const rest = (FAST ? members : listedMembers).length - preview.length;
if (rest > 0) {
  console.log(`  ... (${rest} more)`);
}
