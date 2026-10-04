/**
 * Generates lib/generated/problems.ts from data/aime_2025.jsonl
 * (2025 AIME I + II, 30 problems; see data/LICENSE-aime for provenance).
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
const PACK_NAME = "AIME-2025";
const SOURCE_FILE = "aime_2025.jsonl";
const EXPECTED_SOURCE_SHA256 = "90f729b5500adc6c1c6b69182a97d205cf8f57da7e8a8fbf02c6fafc693ab68e";
const EXPECTED_RECORDS = 30;
const EXPECTED_CONTEST_I = "AIME 2025 I";
const EXPECTED_CONTEST_II = "AIME 2025 II";

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
  const id = `AIME/${index}`;
  const expectedContest = index < 15 ? EXPECTED_CONTEST_I : EXPECTED_CONTEST_II;
  const expectedNumber = index < 15 ? index + 1 : index - 15 + 1;
  if (record.contest !== expectedContest || record.number !== expectedNumber) {
    throw new Error(
      `record ${index}: expected ${expectedContest} Problem ${expectedNumber}, got ${record.contest} Problem ${record.number}`
    );
  }
  if (record.problem_idx !== index + 1) {
    throw new Error(`record ${index}: problem_idx ${record.problem_idx} is out of sequence`);
  }
  const problem = String(record.problem ?? "").replace(/\r\n/g, "\n").trim();
  if (!problem) {
    throw new Error(`record ${index}: empty problem text`);
  }
  const answer = record.answer;
  if (!Number.isInteger(answer) || answer < 0 || answer > 999) {
    throw new Error(`record ${index}: answer ${JSON.stringify(answer)} is not an integer in 0-999`);
  }
  problems.push({ id, contest: record.contest, number: record.number, problem, answer });
});

const uniqueAnswers = new Set(problems.map((problem) => problem.answer));
if (uniqueAnswers.size !== problems.length) {
  throw new Error(`expected ${problems.length} distinct gold answers, got ${uniqueAnswers.size}`);
}

const contestCounts = problems.reduce((acc, problem) => {
  acc[problem.contest] = (acc[problem.contest] ?? 0) + 1;
  return acc;
}, {});

const esc = (value) => JSON.stringify(value);
const outLines = [];
outLines.push("// GENERATED FILE - do not edit.");
outLines.push(`// Source: data/${SOURCE_FILE} (vendored from MathArena/aime_2025, revision c94da77eb22bbd6439e62a323bec18493a421302).`);
outLines.push(`// Source sha256: ${sha256}`);
outLines.push("// Cross-checked answer-for-answer against opencompass/AIME2025 (revision a6ad95f611d72cf628a80b58bd0432ef6638f958)");
outLines.push("// and yentinglin/aime_2025 (revision 6f71d77b0b89b9dabe07ab466c51df33f514df7f): all 30 gold answers identical.");
outLines.push("// Problems originate from the MAA 2025 AIME I and AIME II contests; see data/LICENSE-aime and NOTICE.");
outLines.push("");
outLines.push(`import type { AimeProblem } from "../types";`);
outLines.push("");
outLines.push(`export const SOURCE_SHA256 = ${esc(sha256)};`);
outLines.push(`export const SOURCE_REVISION = "c94da77eb22bbd6439e62a323bec18493a421302";`);
outLines.push("");
outLines.push("export const PROBLEMS: readonly AimeProblem[] = [");
for (const problem of problems) {
  outLines.push("  {");
  outLines.push(`    id: ${esc(problem.id)},`);
  outLines.push(`    contest: ${esc(problem.contest)},`);
  outLines.push(`    number: ${problem.number},`);
  outLines.push(`    problem: ${esc(problem.problem)},`);
  outLines.push(`    answer: ${problem.answer}`);
  outLines.push("  },");
}
outLines.push("];");
outLines.push("");
outLines.push("export function getProblem(id: string): AimeProblem | undefined {");
outLines.push("  return PROBLEMS.find((problem) => problem.id === id);");
outLines.push("}");
outLines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), outLines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems for ${PACK_NAME} (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  contests: ${JSON.stringify(contestCounts)}`);
console.log(
  `  answers: ${uniqueAnswers.size} distinct, min ${Math.min(...uniqueAnswers)}, max ${Math.max(...uniqueAnswers)}`
);
console.log(`  lib/generated/problems.ts`);
