#!/usr/bin/env node
/**
 * Splits the LiveCodeBench release_v6 jsonl files (official
 * `livecodebench/code_generation_lite` download: test.jsonl ... test6.jsonl)
 * into per-problem files under data/problems/, and emits data/manifest.json.
 *
 * - Each output file is one record, fields verbatim; `private_test_cases`
 *   stays encrypted exactly as published.
 * - data/manifest.json records per-source sha256 and per-problem metadata
 *   used by the pack to list scenarios without touching the heavy files.
 *
 * Usage:
 *   node scripts/build-dataset.mjs --src <dir-with-jsonl> [--out data]
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const srcDir = args[args.indexOf("--src") + 1] && args.includes("--src") ? args[args.indexOf("--src") + 1] : null;
const outDir = args.includes("--out") ? args[args.indexOf("--out") + 1] : path.join(root, "data");

if (!srcDir) {
  console.error("usage: node scripts/build-dataset.mjs --src <dir-with-jsonl> [--out data]");
  process.exit(2);
}

const SOURCES = ["test.jsonl", "test2.jsonl", "test3.jsonl", "test4.jsonl", "test5.jsonl", "test6.jsonl"];
const EXPECTED_TOTAL = 1055;
const ID_RE = /^[A-Za-z0-9_.-]+$/;

const problemsDir = path.join(outDir, "problems");
fs.mkdirSync(problemsDir, { recursive: true });

async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    fs.createReadStream(filePath)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolve(hash.digest("hex")))
      .on("error", reject);
  });
}

const sources = [];
const problems = [];
const seenIds = new Set();

for (const fileName of SOURCES) {
  const filePath = path.join(srcDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`error: source missing: ${filePath}`);
    process.exit(2);
  }
  const sha256 = await sha256File(filePath);
  let lines = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath, { encoding: "utf8" }),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.trim() === "") {
      continue;
    }
    lines += 1;
    let record;
    try {
      record = JSON.parse(line);
    } catch (error) {
      console.error(`error: invalid JSON in ${fileName} line ${lines}: ${error.message}`);
      process.exit(1);
    }
    const id = record.question_id;
    if (typeof id !== "string" || !ID_RE.test(id)) {
      console.error(`error: bad question_id "${id}" in ${fileName}`);
      process.exit(1);
    }
    if (seenIds.has(id)) {
      console.error(`error: duplicate question_id "${id}"`);
      process.exit(1);
    }
    seenIds.add(id);

    let fnName = null;
    try {
      const metadata = JSON.parse(record.metadata ?? "{}");
      fnName = metadata.func_name ?? null;
    } catch {
      fnName = null;
    }
    let nPublic = 0;
    try {
      nPublic = JSON.parse(record.public_test_cases ?? "[]").length;
    } catch {
      nPublic = 0;
    }

    const outPath = path.join(problemsDir, `${id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(record), "utf8");

    problems.push({
      id,
      title: record.question_title ?? "",
      platform: record.platform ?? "unknown",
      difficulty: record.difficulty ?? "unknown",
      contestDate: record.contest_date ?? "",
      contestId: record.contest_id ?? "",
      hasStarter: typeof record.starter_code === "string" && record.starter_code.trim() !== "",
      fnName,
      nPublic,
      bytes: Buffer.byteLength(line)
    });
  }

  sources.push({ file: fileName, sha256, lines });
  console.log(`${fileName}: ${lines} problems (sha256 ${sha256.slice(0, 16)}...)`);
}

if (problems.length !== EXPECTED_TOTAL) {
  console.error(`error: expected ${EXPECTED_TOTAL} problems, got ${problems.length}`);
  process.exit(1);
}

const manifest = {
  dataset: "livecodebench/code_generation_lite",
  release: "release_v6",
  count: problems.length,
  sources,
  problems
};
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

const byPlatform = problems.reduce((acc, p) => {
  acc[p.platform] = (acc[p.platform] ?? 0) + 1;
  return acc;
}, {});
console.log(`total: ${problems.length} problems -> ${path.relative(root, problemsDir)}/`);
console.log(`platforms: ${JSON.stringify(byPlatform)}`);
console.log(`call-based (fn_name): ${problems.filter((p) => p.fnName).length}`);
console.log(`manifest: ${path.relative(root, path.join(outDir, "manifest.json"))}`);
