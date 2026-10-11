/**
 * Generates lib/generated/questions.ts from data/arc_challenge_test.csv
 * (AI2 ARC - Reasoning Challenge, CC BY-SA 4.0 - see data/LICENSE-arc).
 *
 * Deterministic: identical input -> identical output. Option order is
 * shuffled per question with a fixed salt (mulberry32, seeded by question
 * hash) so the stored data already carries the final option order and the
 * correct letter; runs are reproducible.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseCsvObjects } from "./csv.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = path.join(root, "data", "arc_challenge_test.csv");
const outDir = path.join(root, "lib", "generated");

// Pinned upstream artifact: allenai/ai2_arc, revision
// 210d026faf9955653af8916fad021475a3f00453, config ARC-Challenge, split test.
const EXPECTED_PARQUET_SHA256 = "62f03257e737aed263f55c6abf87c7bb0028a44a6bdd2a26eb1279eb42c1d1e9";
const EXPECTED_CSV_SHA256 = "74c0ca446f700bc6e71e0c3df609934372a0141a6ff499166a48b7758be4b7d8";
const EXPECTED_ROWS = 1172;
const SHUFFLE_SALT = "arc-challenge-1172-shuffle-v1";
const LETTERS = "ABCDE";

const raw = readFileSync(csvPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_CSV_SHA256) {
  throw new Error(`arc_challenge_test.csv sha256 mismatch (drifted source?): ${sha256}`);
}

const rows = parseCsvObjects(raw.toString("utf8"));
if (rows.length !== EXPECTED_ROWS) {
  throw new Error(`expected ${EXPECTED_ROWS} ARC-Challenge rows, got ${rows.length}`);
}

const norm = (value) => value.replace(/\r\n/g, "\n").trim();
const esc = (value) => JSON.stringify(value);

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleOptions(input, seedText) {
  const seed = createHash("sha256").update(`${SHUFFLE_SALT}:${seedText}`).digest().readUInt32BE(0);
  const random = mulberry32(seed);
  const items = [...input];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

const questions = [];
const optionCounts = {};
rows.forEach((row, index) => {
  const recordId = norm(row["id"]);
  const question = norm(row["question"]);
  const answerKey = norm(row["answer_key"]);

  const choices = [];
  for (let slot = 1; slot <= 5; slot += 1) {
    const label = norm(row[`option_${slot}_label`] ?? "");
    const text = norm(row[`option_${slot}_text`] ?? "");
    if (label === "" && text === "") {
      continue;
    }
    if (label === "" || text === "") {
      throw new Error(`question ${index} (${recordId}): incomplete option slot ${slot}`);
    }
    choices.push({ label, text });
  }
  if (choices.length < 3 || choices.length > 5) {
    throw new Error(`question ${index} (${recordId}): expected 3-5 options, got ${choices.length}`);
  }
  if (!choices.some((choice) => choice.label === answerKey)) {
    throw new Error(`question ${index} (${recordId}): answer key "${answerKey}" not among option labels`);
  }

  const shuffled = shuffleOptions(choices, `${recordId}:${question}`);
  const answerIndex = shuffled.findIndex((choice) => choice.label === answerKey);
  if (answerIndex < 0) {
    throw new Error(`question ${index} (${recordId}): correct answer lost during shuffle`);
  }

  optionCounts[shuffled.length] = (optionCounts[shuffled.length] ?? 0) + 1;
  questions.push({
    id: `ARC/${index}`,
    recordId,
    question,
    options: shuffled.map((choice) => choice.text),
    answerIndex,
    answerLetter: LETTERS[answerIndex]
  });
});

const letterCounts = questions.reduce((acc, question) => {
  acc[question.answerLetter] = (acc[question.answerLetter] ?? 0) + 1;
  return acc;
}, {});

const threeOptionCount = optionCounts[3] ?? 0;
const fiveOptionCount = optionCounts[5] ?? 0;
const numericLabelRows = rows.filter((row) => /^[1-5]$/.test(norm(row["option_1_label"]))).length;

const textCounts = new Map();
for (const question of questions) {
  textCounts.set(question.question, (textCounts.get(question.question) ?? 0) + 1);
}
const duplicateTextIds = questions
  .filter((question) => (textCounts.get(question.question) ?? 0) > 1)
  .map((question) => question.recordId);

const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: data/arc_challenge_test.csv (AI2 ARC - Reasoning Challenge, CC BY-SA 4.0, (c) Allen Institute for AI).");
lines.push(`// Parquet sha256: ${EXPECTED_PARQUET_SHA256}`);
lines.push(`// Vendored csv sha256: ${sha256}`);
lines.push(`// Option order: deterministic shuffle (salt "${SHUFFLE_SALT}").`);
lines.push(
  `// Upstream note: ${threeOptionCount} question(s) carry three options, ${fiveOptionCount} carry five options and ${numericLabelRows} use numeric option labels (1-5) upstream; all are kept as-is and relabelled positionally to A-E in display order.`
);
lines.push(
  `// Upstream note: ${duplicateTextIds.length} question(s) share their question text with another row but carry distinct option sets - ${duplicateTextIds.join(", ")}; kept as-is.`
);
lines.push("");
lines.push(`import type { ArcQuestion } from "../types";`);
lines.push("");
lines.push("export const QUESTIONS: readonly ArcQuestion[] = [");
for (const question of questions) {
  lines.push("  {");
  lines.push(`    id: ${esc(question.id)},`);
  lines.push(`    recordId: ${esc(question.recordId)},`);
  lines.push(`    question: ${esc(question.question)},`);
  lines.push(`    options: [${question.options.map(esc).join(", ")}],`);
  lines.push(`    answerIndex: ${question.answerIndex},`);
  lines.push(`    answerLetter: ${esc(question.answerLetter)}`);
  lines.push("  },");
}
lines.push("];");
lines.push("");
lines.push("export function getQuestion(id: string): ArcQuestion | undefined {");
lines.push("  return QUESTIONS.find((question) => question.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "questions.ts"), lines.join("\n"), "utf8");

console.log(`generated ${questions.length} questions (vendored csv sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  option counts: ${JSON.stringify(optionCounts)}`);
console.log(`  answer letters: ${JSON.stringify(letterCounts)}`);
console.log(`  lib/generated/questions.ts`);
