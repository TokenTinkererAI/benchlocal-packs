/**
 * Generates lib/generated/problems.ts from data/math_500.jsonl
 * (HuggingFaceH4/MATH-500, 500 problems; see data/LICENSE-math for provenance).
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
const PACK_NAME = "MATH-500";
const SOURCE_FILE = "math_500.jsonl";
const SOURCE_REVISION = "6e4ed1a2a79af7d8630a6b768ec859cb5af4d3be";
const EXPECTED_SOURCE_SHA256 = "35dc41080a3680858b27fa7e0533d2d547825316fc5dafe5d316f4ccc5a06132";
const EXPECTED_RECORDS = 500;
const REQUIRED_FIELDS = ["problem", "solution", "answer", "subject", "level", "unique_id"];
const SUBJECTS = [
  "Algebra",
  "Counting & Probability",
  "Geometry",
  "Intermediate Algebra",
  "Number Theory",
  "Prealgebra",
  "Precalculus"
];

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
  for (const field of REQUIRED_FIELDS) {
    if (!(field in record)) {
      throw new Error(`record ${index}: missing field "${field}"`);
    }
  }
  const id = `MATH/${index}`;
  const problem = String(record.problem ?? "").replace(/\r\n/g, "\n").trim();
  if (!problem) {
    throw new Error(`record ${index}: empty problem text`);
  }
  const answer = String(record.answer ?? "").trim();
  if (!answer) {
    throw new Error(`record ${index}: empty gold answer`);
  }
  if (!SUBJECTS.includes(record.subject)) {
    throw new Error(`record ${index}: unknown subject ${JSON.stringify(record.subject)}`);
  }
  if (!Number.isInteger(record.level) || record.level < 1 || record.level > 5) {
    throw new Error(`record ${index}: level ${JSON.stringify(record.level)} is not an integer 1-5`);
  }
  if (typeof record.unique_id !== "string" || record.unique_id.trim() === "") {
    throw new Error(`record ${index}: empty unique_id`);
  }
  problems.push({
    id,
    problem,
    answer,
    subject: record.subject,
    level: record.level,
    uniqueId: record.unique_id
  });
});

const uniqueIds = new Set(problems.map((problem) => problem.uniqueId));
if (uniqueIds.size !== problems.length) {
  throw new Error(`expected ${problems.length} distinct unique_id values, got ${uniqueIds.size}`);
}

const subjectCounts = problems.reduce((acc, problem) => {
  acc[problem.subject] = (acc[problem.subject] ?? 0) + 1;
  return acc;
}, {});
for (const subject of SUBJECTS) {
  if (!subjectCounts[subject]) {
    throw new Error(`no problems for subject ${JSON.stringify(subject)}`);
  }
}

const levelCounts = problems.reduce((acc, problem) => {
  acc[problem.level] = (acc[problem.level] ?? 0) + 1;
  return acc;
}, {});

const esc = (value) => JSON.stringify(value);
const outLines = [];
outLines.push("// GENERATED FILE - do not edit.");
outLines.push(`// Source: data/${SOURCE_FILE} (vendored from HuggingFaceH4/MATH-500, revision ${SOURCE_REVISION}).`);
outLines.push(`// Source sha256: ${sha256}`);
outLines.push("// MATH-500 is a 500-problem test subset of the MATH dataset (Hendrycks et al., 2021),");
outLines.push("// assembled by OpenAI for 'Let's Verify Step by Step' (Lightman et al., 2023).");
outLines.push("// The MATH dataset is MIT licensed (Copyright (c) 2021 Dan Hendrycks); see data/LICENSE-math and NOTICE.");
outLines.push("");
outLines.push(`import type { MathProblem } from "../types";`);
outLines.push("");
outLines.push(`export const SOURCE_SHA256 = ${esc(sha256)};`);
outLines.push(`export const SOURCE_REVISION = ${esc(SOURCE_REVISION)};`);
outLines.push("");
outLines.push("export const PROBLEMS: readonly MathProblem[] = [");
for (const problem of problems) {
  outLines.push("  {");
  outLines.push(`    id: ${esc(problem.id)},`);
  outLines.push(`    problem: ${esc(problem.problem)},`);
  outLines.push(`    answer: ${esc(problem.answer)},`);
  outLines.push(`    subject: ${esc(problem.subject)},`);
  outLines.push(`    level: ${problem.level}`);
  outLines.push("  },");
}
outLines.push("];");
outLines.push("");
outLines.push("export function getProblem(id: string): MathProblem | undefined {");
outLines.push("  return PROBLEMS.find((problem) => problem.id === id);");
outLines.push("}");
outLines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), outLines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems for ${PACK_NAME} (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  subjects: ${JSON.stringify(subjectCounts)}`);
console.log(`  levels: ${JSON.stringify(levelCounts)}`);
console.log(`  lib/generated/problems.ts`);
