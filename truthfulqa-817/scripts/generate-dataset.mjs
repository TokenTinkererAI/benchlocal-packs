/**
 * Generates lib/generated/questions.ts from data/truthfulqa_mc1_validation.parquet
 * (TruthfulQA MC1, Apache-2.0 - see data/LICENSE-truthfulqa).
 *
 * Deterministic: identical input -> identical output. The MC1 answer choices
 * are shuffled per question with a fixed salt (mulberry32, seeded by a hash of
 * the question text) so the stored data already carries the final choice order
 * and the correct letter; runs are reproducible.
 *
 * The upstream file lists the true answer first for every question, so the
 * shuffle is what removes that positional bias.
 *
 * Only the `mc1_targets` field is used; `mc2_targets` (multi-true scoring) is
 * intentionally ignored - see METHODOLOGY.md.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parquetReadObjects } from "hyparquet";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const parquetPath = path.join(root, "data", "truthfulqa_mc1_validation.parquet");
const outDir = path.join(root, "lib", "generated");

const EXPECTED_PARQUET_SHA256 = "23f08e230ca4ed66babf3a72419af7cbde1f3d734dd396ac4cf6d088bd162afd";
const SHUFFLE_SALT = "truthfulqa-817-shuffle-v1";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const raw = readFileSync(parquetPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_PARQUET_SHA256) {
  throw new Error(`truthfulqa_mc1_validation.parquet sha256 mismatch (drifted source?): ${sha256}`);
}

const buffer = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength);
const rows = await parquetReadObjects({ file: buffer });
if (rows.length !== 817) {
  throw new Error(`expected 817 validation rows, got ${rows.length}`);
}

const norm = (value) => String(value ?? "").replace(/\r\n/g, "\n").trim();

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
rows.forEach((row, index) => {
  const question = norm(row.question);
  const targets = row.mc1_targets;
  const choices = Array.from(targets.choices, norm);
  const labels = Array.from(targets.labels, (value) => Number(value));
  if (choices.length < 2 || choices.length > 26) {
    throw new Error(`question ${index}: unexpected choice count ${choices.length}`);
  }
  if (choices.some((choice) => choice === "")) {
    throw new Error(`question ${index}: empty answer choice`);
  }
  const correctIndices = labels.map((label, i) => (label === 1 ? i : -1)).filter((i) => i >= 0);
  if (correctIndices.length !== 1) {
    throw new Error(`question ${index}: expected exactly one true choice, got ${correctIndices.length}`);
  }
  const correct = choices[correctIndices[0]];
  const options = shuffleOptions(choices, question);
  const answerIndex = options.indexOf(correct);
  if (answerIndex < 0) {
    throw new Error(`question ${index}: correct answer lost during shuffle`);
  }
  if (options.filter((option) => option === correct).length !== 1) {
    throw new Error(`question ${index}: correct answer not unique after shuffle`);
  }
  questions.push({
    id: `TQA/${index}`,
    question,
    options,
    answerIndex,
    answerLetter: ALPHABET[answerIndex]
  });
});

const letterCounts = questions.reduce((acc, question) => {
  acc[question.answerLetter] = (acc[question.answerLetter] ?? 0) + 1;
  return acc;
}, {});
const choiceCounts = questions.reduce((acc, question) => {
  acc[question.options.length] = (acc[question.options.length] ?? 0) + 1;
  return acc;
}, {});

const esc = (value) => JSON.stringify(value);
const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: data/truthfulqa_mc1_validation.parquet (TruthfulQA MC1, Apache-2.0, (c) the TruthfulQA authors).");
lines.push(`// Source sha256: ${sha256}`);
lines.push("// Source revision: truthfulqa/truthful_qa@741b8276f2d1982aa3d5b832d3ee81ed3b896490 (multiple_choice/validation-00000-of-00001.parquet).");
lines.push(`// Choice order: deterministic shuffle (salt "${SHUFFLE_SALT}").`);
lines.push("// mc1_targets only; mc2_targets is intentionally ignored (see METHODOLOGY.md).");
lines.push("");
lines.push(`import type { TruthfulQaQuestion } from "../types";`);
lines.push("");
lines.push("/** Typed identity helper: keeps the large literal list cheap for tsc to check. */");
lines.push("const q = (value: TruthfulQaQuestion): TruthfulQaQuestion => value;");
lines.push("");
lines.push("export const QUESTIONS: readonly TruthfulQaQuestion[] = [");
for (const question of questions) {
  lines.push("  q({");
  lines.push(`    id: ${esc(question.id)},`);
  lines.push(`    question: ${esc(question.question)},`);
  lines.push(`    options: [${question.options.map(esc).join(", ")}],`);
  lines.push(`    answerIndex: ${question.answerIndex},`);
  lines.push(`    answerLetter: ${esc(question.answerLetter)}`);
  lines.push("  }),");
}
lines.push("];");
lines.push("");
lines.push("export function getQuestion(id: string): TruthfulQaQuestion | undefined {");
lines.push("  return QUESTIONS.find((question) => question.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "questions.ts"), lines.join("\n"), "utf8");

console.log(`generated ${questions.length} questions (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  answer letters: ${JSON.stringify(letterCounts)}`);
console.log(`  choice counts: ${JSON.stringify(choiceCounts)}`);
console.log(`  lib/generated/questions.ts`);
