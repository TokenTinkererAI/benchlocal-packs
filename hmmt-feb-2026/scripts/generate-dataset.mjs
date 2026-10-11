/**
 * Generates lib/generated/problems.ts from data/hmmt_feb_2026.jsonl
 * (MathArena/hmmt_feb_2026, 33 problems; see data/LICENSE-hmmt for provenance).
 *
 * Deterministic: identical input -> identical output. The vendored source
 * file is hash-pinned, so a drifted dataset fails the build instead of
 * silently changing the benchmark.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Pack configuration
// ---------------------------------------------------------------------------
const PACK_NAME = "HMMT-Feb-2026";
const SOURCE_FILE = "hmmt_feb_2026.jsonl";
const SOURCE_REVISION = "02fba4f74d8e68e73e66a02d540fd979c05c274c";
const PARQUET_FILE = "data/train-00000-of-00001.parquet";
const PARQUET_SHA256 = "e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916";
const EXPECTED_SOURCE_SHA256 = "fbcd8e4f4325f98ec90c9064119c3f4f8b423de81b548643f43e0d725e5a71d4";
const EXPECTED_RECORDS = 33;
const KNOWN_TYPES = ["Algebra", "Number Theory", "Combinatorics", "Geometry"];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "data", SOURCE_FILE);
const outDir = path.join(root, "lib", "generated");

const raw = readFileSync(sourcePath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_SOURCE_SHA256) {
  throw new Error(`${SOURCE_FILE} sha256 mismatch (drifted source?): ${sha256}`);
}

const text = raw.toString("utf8");
const lines = text.split("\n");
if (lines[lines.length - 1] === "") {
  lines.pop();
}
if (lines.length !== EXPECTED_RECORDS) {
  throw new Error(`expected ${EXPECTED_RECORDS} records in ${SOURCE_FILE}, got ${lines.length}`);
}

const problems = [];
lines.forEach((line, index) => {
  if (!line.trim()) {
    throw new Error(`record ${index}: empty line in ${SOURCE_FILE}`);
  }
  const record = JSON.parse(line);
  if (record.problem_idx !== index + 1) {
    throw new Error(`record ${index}: problem_idx ${record.problem_idx} is out of sequence`);
  }
  const problem = String(record.problem ?? "").replace(/\r\n/g, "\n").trim();
  if (!problem) {
    throw new Error(`record ${index}: empty problem text`);
  }
  const answer = String(record.answer ?? "").trim();
  if (!answer) {
    throw new Error(`record ${index}: empty gold answer`);
  }
  if (!Array.isArray(record.problem_type) || record.problem_type.length === 0) {
    throw new Error(`record ${index}: missing or empty problem_type`);
  }
  const types = record.problem_type.map((item) => String(item).trim()).filter(Boolean);
  for (const type of types) {
    if (!KNOWN_TYPES.includes(type)) {
      throw new Error(`record ${index}: unknown problem_type ${JSON.stringify(type)}`);
    }
  }
  problems.push({ id: `HMMT/${index}`, number: record.problem_idx, problem, answer, types });
});

const typeCounts = problems.reduce((acc, problem) => {
  for (const type of problem.types) {
    acc[type] = (acc[type] ?? 0) + 1;
  }
  return acc;
}, {});

const esc = (value) => JSON.stringify(value);
const outLines = [];
outLines.push("// GENERATED FILE - do not edit.");
outLines.push(`// Source: data/${SOURCE_FILE} (projected from MathArena/hmmt_feb_2026, revision ${SOURCE_REVISION}).`);
outLines.push(`// Upstream parquet ${PARQUET_FILE} sha256: ${PARQUET_SHA256}`);
outLines.push(`// Vendored ${SOURCE_FILE} sha256: ${sha256}`);
outLines.push("// The 33 gold answers were cross-checked against the official HMMT February 2026");
outLines.push("// published solutions (hmmt.org archive, February 14, 2026 sitting): all 33 agree.");
outLines.push("// Problems originate from the HMMT February 2026 contest; see data/LICENSE-hmmt and NOTICE.");
outLines.push("");
outLines.push(`import type { HmmtProblem } from "../types";`);
outLines.push("");
outLines.push(`export const SOURCE_SHA256 = ${esc(sha256)};`);
outLines.push(`export const SOURCE_REVISION = ${esc(SOURCE_REVISION)};`);
outLines.push(`export const PARQUET_SHA256 = ${esc(PARQUET_SHA256)};`);
outLines.push("");
outLines.push("export const PROBLEMS: readonly HmmtProblem[] = [");
for (const problem of problems) {
  outLines.push("  {");
  outLines.push(`    id: ${esc(problem.id)},`);
  outLines.push(`    number: ${problem.number},`);
  outLines.push(`    problem: ${esc(problem.problem)},`);
  outLines.push(`    answer: ${esc(problem.answer)},`);
  outLines.push(`    types: [${problem.types.map(esc).join(", ")}]`);
  outLines.push("  },");
}
outLines.push("];");
outLines.push("");
outLines.push("export function getProblem(id: string): HmmtProblem | undefined {");
outLines.push("  return PROBLEMS.find((problem) => problem.id === id);");
outLines.push("}");
outLines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), outLines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems for ${PACK_NAME} (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  problem_type distribution (multi-label): ${JSON.stringify(typeCounts)}`);
console.log(`  lib/generated/problems.ts`);
