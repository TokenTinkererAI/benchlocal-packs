#!/usr/bin/env node
/**
 * Build the pack dataset from the vendored EvalPlus release asset.
 *
 * Runs scripts/build_expected.py under a local Python 3.9+ (resolved the same
 * way the pack resolves it: py -3, then python, then python3) and verifies the
 * generated tree. PYTHONHASHSEED=0 is pinned so the recorded ground truth is
 * reproducible.
 *
 *   node scripts/build-dataset.mjs [--source data/source/HumanEvalPlus.jsonl.gz] [--python PATH]
 *
 * The heavy work (computing expected outputs by executing the canonical
 * solutions) happens in Python; this wrapper only resolves the interpreter and
 * checks the result, so `npm run build` stays free of Python.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

function argValue(name, fallback) {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] !== undefined ? argv[index + 1] : fallback;
}

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`Usage: node scripts/build-dataset.mjs [--source PATH] [--python PATH]

  --source PATH  vendored HumanEvalPlus.jsonl.gz (default data/source/HumanEvalPlus.jsonl.gz)
  --python PATH  Python 3.9+ interpreter (default: py -3, then python, then python3)`);
  process.exit(0);
}

const sourcePath = path.resolve(REPO_ROOT, argValue("--source", "data/source/HumanEvalPlus.jsonl.gz"));
const pythonOverride = argValue("--python", null);

function probe(command, args) {
  const result = spawnSync(command, [...args, "-c", "import sys; print('%d.%d' % sys.version_info[:2])"], {
    encoding: "utf8",
    timeout: 15000
  });
  if (result.error || result.status !== 0) {
    return null;
  }
  const match = (result.stdout ?? "").trim().match(/^(\d+)\.(\d+)$/);
  if (!match) {
    return null;
  }
  const version = [Number.parseInt(match[1], 10), Number.parseInt(match[2], 10)];
  if (version[0] < 3 || (version[0] === 3 && version[1] < 9)) {
    return null;
  }
  return { command, args, version };
}

function resolvePython() {
  if (pythonOverride) {
    const resolved = probe(pythonOverride, []);
    if (!resolved) {
      console.error(`error: --python ${pythonOverride} is not a working Python 3.9+ interpreter.`);
      process.exit(1);
    }
    return resolved;
  }
  const candidates = [];
  if (process.platform === "win32") {
    candidates.push(["py", ["-3"]]);
  }
  candidates.push(["python", []]);
  candidates.push(["python3", []]);
  for (const [command, args] of candidates) {
    const resolved = probe(command, args);
    if (resolved) {
      return resolved;
    }
  }
  console.error("error: Python 3.9+ not found (tried py -3, python, python3).");
  process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
  console.error(`error: source dataset not found at ${path.relative(REPO_ROOT, sourcePath)}.`);
  console.error("       Expected the vendored EvalPlus release asset HumanEvalPlus.jsonl.gz (v0.1.10).");
  process.exit(1);
}

const python = resolvePython();
console.log(`python: ${python.command} ${python.args.join(" ")} (${python.version.join(".")})`);
console.log(`source: ${path.relative(REPO_ROOT, sourcePath).replaceAll("\\", "/")}`);

const builder = path.join(REPO_ROOT, "scripts", "build_expected.py");
const result = spawnSync(python.command, [...python.args, builder, sourcePath], {
  cwd: REPO_ROOT,
  stdio: ["ignore", "inherit", "inherit"],
  env: { ...process.env, PYTHONHASHSEED: "0", PYTHONIOENCODING: "utf-8", PYTHONDONTWRITEBYTECODE: "1" }
});

if (result.error) {
  console.error(`error: failed to run ${builder}: ${result.error.message}`);
  process.exit(1);
}
if (result.status !== 0) {
  console.error(`error: dataset build failed (exit ${result.status}).`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Verification: the tree must be complete and self-consistent.
// ---------------------------------------------------------------------------
const manifestPath = path.join(REPO_ROOT, "data", "manifest.json");
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  console.error(`error: data/manifest.json is unreadable: ${error.message}`);
  process.exit(1);
}

const problemsDir = path.join(REPO_ROOT, "data", "problems");
const files = fs.existsSync(problemsDir) ? fs.readdirSync(problemsDir).filter((name) => name.endsWith(".json")) : [];
const problems = manifest.problems ?? [];

const problemCount = problems.length;
const problemsOk = problemCount === 164 && files.length === 164;

console.log("");
console.log(`verify: problems=${problemCount} files=${files.length} baseTests=${manifest.counts?.baseTests} plusTests=${manifest.counts?.plusTests}`);

let canonicalOk = false;
try {
  const canonical = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "canonical.json"), "utf8"));
  canonicalOk = Object.keys(canonical.canonical ?? {}).length === 164;
} catch {
  canonicalOk = false;
}
console.log(`verify: canonical.json=${canonicalOk ? "ok" : "INVALID"}`);

const missing = problems.filter((problem) => !files.includes(problem.file)).map((problem) => problem.file);
if (missing.length > 0) {
  console.error(`error: missing problem files: ${missing.slice(0, 5).join(", ")}`);
}

let totalBytes = 0;
for (const name of files) {
  totalBytes += fs.statSync(path.join(problemsDir, name)).size;
}

if (!problemsOk || !canonicalOk || missing.length > 0) {
  console.error("error: dataset verification failed.");
  process.exit(1);
}

console.log(`verify: data/problems total ${(totalBytes / 1024 / 1024).toFixed(1)} MiB`);
console.log("build:dataset OK");
