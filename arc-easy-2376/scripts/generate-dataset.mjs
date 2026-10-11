/**
 * Generates lib/generated/questions.ts from data/arc_easy_test.jsonl
 * (AI2 ARC - Reasoning Challenge, ARC-Easy test split, CC BY-SA 4.0 -
 * see data/LICENSE-arc).
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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "arc_easy_test.jsonl");
const outDir = path.join(root, "lib", "generated");

const EXPECTED_DATA_SHA256 = "7c73345800fdb847ae5fca138cb26c65c718087a490170068631c50dee1d6fec";
const EXPECTED_PARQUET_SHA256 = "4160597d618ae851c7eb04e281574f3f654776216ac6b6641588d64527b47177";
const UPSTREAM_REVISION = "210d026faf9955653af8916fad021475a3f00453";
const SHUFFLE_SALT = "arc-easy-2376-shuffle-v1";
const EXPECTED_ROWS = 2376;
const LETTERS = "ABCDE";

const raw = readFileSync(dataPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_DATA_SHA256) {
  throw new Error(`arc_easy_test.jsonl sha256 mismatch (drifted source?): ${sha256}`);
}

const rows = raw
  .toString("utf8")
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`row ${index} is not valid JSON: ${String(error)}`);
    }
  });
if (rows.length !== EXPECTED_ROWS) {
  throw new Error(`expected ${EXPECTED_ROWS} rows, got ${rows.length}`);
}

const norm = (value) => value.replace(/\r\n/g, "\n").trim();

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
const optionCountCounts = new Map();
const numericLabelIds = [];
rows.forEach((row, index) => {
  const question = norm(String(row.question));
  const labels = row.choices.label.map((label) => String(label).trim());
  const texts = row.choices.text.map((text) => norm(String(text)));
  const key = String(row.answerKey).trim();

  const keyIndex = labels.indexOf(key);
  if (keyIndex < 0) {
    throw new Error(`question ${index} (${row.id}): answerKey "${key}" is not one of the option labels`);
  }
  const correct = texts[keyIndex];

  const options = shuffleOptions(texts, `${row.id}:${question}`);
  const answerIndex = options.indexOf(correct);
  if (answerIndex < 0) {
    throw new Error(`question ${index} (${row.id}): correct answer lost during shuffle`);
  }
  if (options.filter((option) => option === correct).length !== 1) {
    throw new Error(`question ${index} (${row.id}): correct answer not unique after shuffle`);
  }
  if (new Set(options).size < 3) {
    throw new Error(`question ${index} (${row.id}): fewer than 3 unique options`);
  }

  optionCountCounts.set(options.length, (optionCountCounts.get(options.length) ?? 0) + 1);
  if (labels.every((label) => /^[0-9]+$/.test(label))) {
    numericLabelIds.push(row.id);
  }

  questions.push({
    id: `ARC/${index}`,
    recordId: String(row.id),
    question,
    options,
    answerIndex,
    answerLetter: LETTERS[answerIndex]
  });
});

const letterCounts = questions.reduce((acc, question) => {
  acc[question.answerLetter] = (acc[question.answerLetter] ?? 0) + 1;
  return acc;
}, {});

const nonFourShotIds = questions.filter((question) => question.options.length !== 4).map((question) => question.id);

const esc = (value) => JSON.stringify(value);
const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: data/arc_easy_test.jsonl (AI2 ARC - ARC-Easy test split, CC BY-SA 4.0, (c) AI2).");
lines.push(`// Source sha256: ${sha256}`);
lines.push(`// Upstream parquet: allenai/ai2_arc @ ${UPSTREAM_REVISION} sha256 ${EXPECTED_PARQUET_SHA256}.`);
lines.push(`// Option order: deterministic shuffle (salt "${SHUFFLE_SALT}").`);
lines.push(
  `// Upstream quirks kept as-is: ${nonFourShotIds.length} question(s) carry other than four options (labels A-C / A-E) and ${numericLabelIds.length} use numeric answer labels (1-4) upstream; the answer key is mapped to its option position in every case.`
);
lines.push("");
lines.push('import type { ArcQuestion } from "../types";');
lines.push("");
lines.push("const q = (question: ArcQuestion): ArcQuestion => question;");
lines.push("");
lines.push("export const QUESTIONS: readonly ArcQuestion[] = [");
for (const question of questions) {
  lines.push("  q({");
  lines.push(`    id: ${esc(question.id)},`);
  lines.push(`    recordId: ${esc(question.recordId)},`);
  lines.push(`    question: ${esc(question.question)},`);
  lines.push(`    options: [${question.options.map(esc).join(", ")}],`);
  lines.push(`    answerIndex: ${question.answerIndex},`);
  lines.push(`    answerLetter: ${esc(question.answerLetter)}`);
  lines.push("  }),");
}
lines.push("];");
lines.push("");
lines.push("export function getQuestion(id: string): ArcQuestion | undefined {");
lines.push("  return QUESTIONS.find((question) => question.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "questions.ts"), lines.join("\n"), "utf8");

console.log(`generated ${questions.length} questions (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  options per question: ${JSON.stringify(Object.fromEntries([...optionCountCounts].sort((a, b) => a[0] - b[0])))}`);
console.log(`  numeric-label questions: ${numericLabelIds.length}`);
console.log(`  answer letters: ${JSON.stringify(letterCounts)}`);
console.log(`  lib/generated/questions.ts`);
