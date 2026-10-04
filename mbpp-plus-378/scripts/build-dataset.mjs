#!/usr/bin/env node
/**
 * build-dataset.mjs — turn the official MBPP+ jsonl release into the pack's
 * split dataset.
 *
 * For every one of the 378 MBPP+ tasks it:
 *   1. spawns scripts/compute-expected.py, which applies EvalPlus's own
 *      mbpp_deserialize_inputs and runs the canonical solution over
 *      base_input + plus_input exactly like EvalPlus's get_groundtruth
 *      (exec(prompt + canonical_solution), one call per input, per-call time
 *      recorded, `is not None` collapse for MBPP_OUTPUT_NOT_NONE_TASKS);
 *   2. writes data/problems/<task_id with '/' -> '_'>.json with the
 *      deserialized inputs, the vendored expected outputs (lossless
 *      {"__mb_t": ...} codec shared with harness/run_problem.py), and the
 *      reference timings used for the harness' per-input time limits;
 *   3. records the source file's SHA-256 and per-problem metadata in
 *      data/manifest.json (the pack's listScenarios reads only that file).
 *
 * Usage:
 *   node scripts/build-dataset.mjs --src data/MbppPlus.jsonl.gz
 *   node scripts/build-dataset.mjs --src <file> --limit 5 --out data-test
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

function argValue(name, fallback = null) {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
}

if (argv.includes("--help") || argv.includes("-h")) {
  console.log("usage: node scripts/build-dataset.mjs --src <MbppPlus.jsonl.gz> [--out data] [--limit N] [--python CMD]");
  process.exit(0);
}

const SRC = argValue("--src", path.join(ROOT, "data", "MbppPlus.jsonl.gz"));
const OUT_DIR = path.resolve(argValue("--out", path.join(ROOT, "data")));
const LIMIT = Number.parseInt(argValue("--limit", "0"), 10);
const PYTHON_OVERRIDE = argValue("--python", process.env.MBPP378_PYTHON ?? null);
const EXPECTED_TOTAL = 378;
const RELEASE = "v0.2.0";
const PER_PROBLEM_TIMEOUT_MS = 180_000;
const ID_RE = /^Mbpp\/[0-9]+$/;

// ---------------------------------------------------------------------------
// Python resolution (same order as lib/python.ts)
// ---------------------------------------------------------------------------

function probePython(command, args) {
  const result = spawnSync(command, [...args, "-c", "import sys; print('%d.%d' % sys.version_info[:2])"], {
    encoding: "utf8",
    timeout: 10_000
  });
  if (result.status !== 0) {
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
  const candidates = [];
  if (PYTHON_OVERRIDE) {
    candidates.push({ command: PYTHON_OVERRIDE, args: [] });
  }
  if (process.platform === "win32") {
    candidates.push({ command: "py", args: ["-3"] });
  }
  candidates.push({ command: "python", args: [] }, { command: "python3", args: [] });
  for (const candidate of candidates) {
    const probe = probePython(candidate.command, candidate.args);
    if (probe) {
      return probe;
    }
  }
  throw new Error("Python 3.9+ not found (set MBPP378_PYTHON or pass --python).");
}

// ---------------------------------------------------------------------------
// Source data
// ---------------------------------------------------------------------------

if (!fs.existsSync(SRC)) {
  console.error(`error: source not found: ${SRC}`);
  process.exit(2);
}
const raw = fs.readFileSync(SRC);
const sha256Source = createHash("sha256").update(raw).digest("hex");
const text = SRC.endsWith(".gz") ? zlib.gunzipSync(raw).toString("utf8") : raw.toString("utf8");
// Raw jsonl lines are handed to Python verbatim: MbppPlus.jsonl contains
// Python-style Infinity/NaN literals (Mbpp/404) that JSON.parse rejects and
// JSON.stringify would silently turn into null. Only the light fields the
// build driver itself needs (task_id) are parsed here - with a tolerant regex
// so a non-JSON literal elsewhere on the line cannot break it.
const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
const records = lines.map((line, index) => {
  const match = line.match(/"task_id"\s*:\s*"(Mbpp\/[0-9]+)"/);
  if (!match) {
    console.error(`error: no task_id on line ${index + 1}`);
    process.exit(1);
  }
  return { task_id: match[1], line };
});

const REQUIRED_MARKERS = [
  '"prompt"',
  '"canonical_solution"',
  '"entry_point"',
  '"base_input"',
  '"plus_input"',
  '"atol"',
  '"contract"',
  '"assertion"'
];
for (const record of records) {
  for (const marker of REQUIRED_MARKERS) {
    if (!record.line.includes(marker)) {
      console.error(`error: ${record.task_id} is missing field ${marker}`);
      process.exit(1);
    }
  }
  if (!ID_RE.test(record.task_id)) {
    console.error(`error: unexpected task_id ${JSON.stringify(record.task_id)}`);
    process.exit(1);
  }
}
if (records.length !== EXPECTED_TOTAL && !LIMIT) {
  console.error(`error: expected ${EXPECTED_TOTAL} tasks in ${SRC}, found ${records.length}`);
  process.exit(1);
}
const uniqueIds = new Set(records.map((record) => record.task_id));
if (uniqueIds.size !== records.length) {
  console.error("error: duplicate task_id in source");
  process.exit(1);
}

const selected = LIMIT > 0 ? records.slice(0, LIMIT) : records;

// ---------------------------------------------------------------------------
// Per-problem oracle pass
// ---------------------------------------------------------------------------

const python = resolvePython();
console.log(`source: ${path.relative(ROOT, SRC)} (sha256 ${sha256Source})`);
console.log(`python: ${python.command} ${python.args.join(" ")} (${python.version.join(".")})`);
console.log(`tasks:  ${selected.length}${LIMIT ? ` (limited from ${records.length})` : ""}`);

const problemsDir = path.join(OUT_DIR, "problems");
fs.mkdirSync(problemsDir, { recursive: true });
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mbpp378-build-"));

const problems = [];
let failures = 0;

for (const [index, record] of selected.entries()) {
  const safeId = record.task_id.replace("/", "_");
  const recordPath = path.join(tempDir, `${safeId}.record.jsonl`);
  const outPath = path.join(problemsDir, `${safeId}.json`);
  const summaryPath = path.join(tempDir, `${safeId}.summary.json`);
  fs.writeFileSync(recordPath, record.line, "utf8");
  const recordSha = createHash("sha256").update(record.line).digest("hex");

  const started = Date.now();
  // spawnSync with an argument array (no shell) - no command injection surface.
  const result = spawnSync(
    python.command,
    [
      ...python.args,
      path.join(ROOT, "scripts", "compute-expected.py"),
      "--record",
      recordPath,
      "--out",
      outPath,
      "--summary",
      summaryPath,
      "--source-file",
      path.basename(SRC),
      "--source-release",
      RELEASE,
      "--source-sha",
      sha256Source,
      "--record-sha",
      recordSha
    ],
    { encoding: "utf8", timeout: PER_PROBLEM_TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024, cwd: ROOT }
  );
  const elapsed = Date.now() - started;

  if (result.status !== 0 || !fs.existsSync(outPath) || !fs.existsSync(summaryPath)) {
    failures += 1;
    const stderr = (result.stderr ?? "").trim().split(/\r?\n/).slice(-4).join(" | ");
    console.error(
      `error: oracle failed for ${record.task_id} (exit ${result.status}, ${elapsed}ms)` +
        (result.error ? ` ${result.error.message}` : "") +
        (stderr ? ` -> ${stderr}` : "")
    );
    continue;
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  problems.push({
    id: summary.id,
    file: `${safeId}.json`,
    title: summary.title ?? "",
    entryPoint: summary.entry_point,
    atol: summary.atol,
    nBase: summary.n_base,
    nPlus: summary.n_plus,
    expectedMode: summary.expected_mode,
    maxRefBaseS: summary.max_ref_base_s,
    maxRefPlusS: summary.max_ref_plus_s,
    bytes: summary.bytes
  });
  if (summary.expected_mode !== "vendored") {
    console.log(
      `  note: ${summary.id} grades against expected outputs recomputed at run time ` +
        `(encoded size base ${Math.round(summary.expected_bytes.base / 1e6)} MB / plus ${Math.round(
          summary.expected_bytes.plus / 1e6
        )} MB)`
    );
  }

  if ((index + 1) % 40 === 0 || index + 1 === selected.length) {
    console.log(`  [${index + 1}/${selected.length}] ${record.task_id} ok (${elapsed}ms)`);
  }
}

fs.rmSync(tempDir, { recursive: true, force: true });

if (failures > 0) {
  console.error(`error: ${failures} problem(s) failed the oracle pass`);
  process.exit(1);
}

const manifest = {
  dataset: "evalplus/mbppplus",
  release: RELEASE,
  source: { file: path.basename(SRC), sha256: sha256Source, records: records.length },
  count: problems.length,
  problems
};
fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

const totalBase = problems.reduce((sum, problem) => sum + problem.nBase, 0);
const totalPlus = problems.reduce((sum, problem) => sum + problem.nPlus, 0);
const maxRef = Math.max(...problems.map((problem) => Math.max(problem.maxRefBaseS, problem.maxRefPlusS)));
console.log(`total:   ${problems.length} problems -> ${path.relative(ROOT, problemsDir)}/`);
console.log(`tests:   ${totalBase} base + ${totalPlus} plus = ${totalBase + totalPlus} inputs`);
console.log(`max canonical call time: ${maxRef.toFixed(6)}s (per-input limit floor is 4.0s)`);
console.log(`manifest: ${path.relative(ROOT, path.join(OUT_DIR, "manifest.json"))}`);
