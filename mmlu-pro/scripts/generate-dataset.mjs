/**
 * Generates lib/generated/problems.ts from data/mmlu_pro.jsonl
 * (MMLU-Pro evaluation split, MIT - see data/LICENSE-mmlu-pro).
 *
 * Deterministic: identical input -> identical output. Option order is shuffled
 * per question with a fixed salt (mulberry32, seeded by a hash of the question
 * provenance) so the stored data already carries the final option order and
 * the gold letter; runs are reproducible and the upstream label-position bias
 * (A is over-represented in the source) is removed.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonlPath = path.join(root, "data", "mmlu_pro.jsonl");
const outDir = path.join(root, "lib", "generated");

const EXPECTED_JSONL_SHA256 = "9dccf55b5718bffbf705bc19b8757274267e07d16af6a56c831cf5e8fb00069e";
const SOURCE_PARQUET_SHA256 = "0e24a191921c2f453518a537a8b2117bd137e7714d4ef1565e9ba06c1ecb9ad8";
const EXPECTED_PROBLEMS = 12032;
const EXPECTED_CATEGORIES = 14;
const SHUFFLE_SALT = "mmlu-pro-shuffle-v1";
const LETTERS = "ABCDEFGHIJ";

const raw = readFileSync(jsonlPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_JSONL_SHA256) {
  throw new Error(`mmlu_pro.jsonl sha256 mismatch (drifted source?): ${sha256}`);
}

const rows = raw
  .toString("utf8")
  .replace(/\r\n/g, "\n")
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`line ${index + 1} is not valid JSON: ${error.message}`);
    }
  });

if (rows.length !== EXPECTED_PROBLEMS) {
  throw new Error(`expected ${EXPECTED_PROBLEMS} test rows, got ${rows.length}`);
}

const norm = (value) => String(value).replace(/\r\n/g, "\n").trim();

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

/** Fisher-Yates permutation of `items`, seeded by sha256(`${SHUFFLE_SALT}:${seedText}`). */
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

const problems = [];
const categoriesSeen = new Set();
const categoryOrder = [];
const optionCounts = {};
const upstreamLetterCounts = {};

rows.forEach((row, index) => {
  const questionId = row.question_id;
  if (!Number.isInteger(questionId)) {
    throw new Error(`problem ${index}: question_id is not an integer`);
  }
  const question = norm(row.question);
  if (question === "") {
    throw new Error(`problem ${index} (id ${questionId}): empty question`);
  }
  const category = norm(row.category);
  if (category === "") {
    throw new Error(`problem ${index} (id ${questionId}): empty category`);
  }
  if (!categoriesSeen.has(category)) {
    categoriesSeen.add(category);
    categoryOrder.push(category);
  }
  const src = norm(row.src);
  if (!Array.isArray(row.options) || row.options.length < 3 || row.options.length > 10) {
    throw new Error(`problem ${index} (id ${questionId}): expected 3-10 options, got ${Array.isArray(row.options) ? row.options.length : typeof row.options}`);
  }
  const choices = row.options.map(norm);
  if (choices.some((choice) => choice === "")) {
    throw new Error(`problem ${index} (id ${questionId}): empty option text`);
  }
  const upstreamAnswerIndex = row.answer_index;
  if (!Number.isInteger(upstreamAnswerIndex) || upstreamAnswerIndex < 0 || upstreamAnswerIndex >= choices.length) {
    throw new Error(`problem ${index} (id ${questionId}): answer index ${upstreamAnswerIndex} outside ${choices.length} options`);
  }
  if (LETTERS[upstreamAnswerIndex] !== norm(row.answer)) {
    throw new Error(`problem ${index} (id ${questionId}): answer "${row.answer}" does not match answer_index ${upstreamAnswerIndex}`);
  }

  // Index-based shuffle: the gold option is tracked by its index, so a
  // duplicated distractor (or a duplicated gold) can never misplace the key.
  const permutation = shuffleOptions(
    Array.from({ length: choices.length }, (_unused, position) => position),
    `${questionId}:${question}`
  );
  const options = permutation.map((originalIndex) => choices[originalIndex]);
  const answerIndex = permutation.indexOf(upstreamAnswerIndex);
  if (answerIndex < 0) {
    throw new Error(`problem ${index} (id ${questionId}): gold option lost during shuffle`);
  }
  const answerLetter = LETTERS[answerIndex];

  optionCounts[choices.length] = (optionCounts[choices.length] ?? 0) + 1;
  upstreamLetterCounts[norm(row.answer)] = (upstreamLetterCounts[norm(row.answer)] ?? 0) + 1;

  problems.push({
    id: `MMLU-Pro/${index}`,
    questionId,
    category,
    question,
    options,
    answerIndex,
    answerLetter,
    upstreamAnswerIndex,
    src
  });
});

if (categoriesSeen.size !== EXPECTED_CATEGORIES) {
  throw new Error(`expected ${EXPECTED_CATEGORIES} categories, got ${categoriesSeen.size}`);
}

const letterCounts = {};
const categoryCounts = {};
for (const problem of problems) {
  letterCounts[problem.answerLetter] = (letterCounts[problem.answerLetter] ?? 0) + 1;
  categoryCounts[problem.category] = (categoryCounts[problem.category] ?? 0) + 1;
}
const orderedLetterCounts = Object.fromEntries(LETTERS.split("").map((letter) => [letter, letterCounts[letter] ?? 0]));
const orderedCategoryCounts = Object.fromEntries(categoryOrder.map((category) => [category, categoryCounts[category] ?? 0]));
const orderedOptionCounts = Object.fromEntries(
  Object.keys(optionCounts)
    .map(Number)
    .sort((left, right) => left - right)
    .map((count) => [count, optionCounts[count]])
);

const label = (category) => category.replace(/(^|\s)\S/g, (character) => character.toUpperCase());

const esc = (value) => JSON.stringify(value);
const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: data/mmlu_pro.jsonl - MMLU-Pro evaluation (test) split, vendored verbatim.");
lines.push("// Dataset: TIGER-Lab/MMLU-Pro @ b189ec765aa7ed75c8acfea42df31fdae71f97be (MIT, (c) TIGER-Lab).");
lines.push("//          12,032 test questions across 14 disciplines; upstream validation split (70) not vendored.");
lines.push("//          10 options per question in the original release; upstream removed the 'N/A' placeholders,");
lines.push(`//          so rows carry ${Object.keys(orderedOptionCounts).join("/")} real options; all are kept as-is.`);
lines.push(`// Source sha256: ${sha256}`);
lines.push(`//          data/test-00000-of-00001.parquet sha256: ${SOURCE_PARQUET_SHA256}`);
lines.push(`// Option order: deterministic shuffle (salt "${SHUFFLE_SALT}"), index-based Fisher-Yates seeded by sha256(salt:questionId:question).`);
lines.push(`// Answer letters after shuffle: ${JSON.stringify(orderedLetterCounts)}`);
lines.push(`// Answer letters before shuffle: ${JSON.stringify(Object.fromEntries(LETTERS.split("").map((letter) => [letter, upstreamLetterCounts[letter] ?? 0])))}`);
lines.push(`// Category weights (data order): ${JSON.stringify(orderedCategoryCounts)}`);
lines.push(`// Option-count distribution: ${JSON.stringify(orderedOptionCounts)}`);
lines.push("");
lines.push(`import type { MmluCategory, MmluProProblem } from "../types";`);
lines.push("");
lines.push("/** Fixed display order of the 14 MMLU-Pro disciplines (first-appearance order in the vendored data). */");
lines.push(`export const CATEGORY_ORDER: readonly MmluCategory[] = [${categoryOrder.map(esc).join(", ")}];`);
lines.push("");
lines.push("/** Result-card labels per discipline. */");
lines.push("export const CATEGORY_LABELS: Record<MmluCategory, string> = {");
for (const category of categoryOrder) {
  lines.push(`  ${esc(category)}: ${esc(label(category))},`);
}
lines.push("};");
lines.push("");
lines.push("/**");
lines.push(" * Identity helper: keeps each generated entry typed as MmluProProblem without");
lines.push(" * asking tsc to represent a union of 12,032 distinct object literal types");
lines.push(" * (error TS2590 on plain `MmluProProblem[]` literals at this size).");
lines.push(" */");
lines.push("function problem(entry: MmluProProblem): MmluProProblem {");
lines.push("  return entry;");
lines.push("}");
lines.push("");
lines.push("export const PROBLEMS: readonly MmluProProblem[] = [");
for (const problemEntry of problems) {
  lines.push("  problem({");
  lines.push(`    id: ${esc(problemEntry.id)},`);
  lines.push(`    questionId: ${problemEntry.questionId},`);
  lines.push(`    category: ${esc(problemEntry.category)},`);
  lines.push(`    question: ${esc(problemEntry.question)},`);
  lines.push(`    options: [${problemEntry.options.map(esc).join(", ")}],`);
  lines.push(`    answerIndex: ${problemEntry.answerIndex},`);
  lines.push(`    answerLetter: ${esc(problemEntry.answerLetter)},`);
  lines.push(`    upstreamAnswerIndex: ${problemEntry.upstreamAnswerIndex},`);
  lines.push(`    src: ${esc(problemEntry.src)}`);
  lines.push("  }),");
}
lines.push("];");
lines.push("");
lines.push("export function getProblem(id: string): MmluProProblem | undefined {");
lines.push("  return PROBLEMS.find((problem) => problem.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), lines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  categories: ${categoriesSeen.size} | weights: ${JSON.stringify(orderedCategoryCounts)}`);
console.log(`  answer letters after shuffle: ${JSON.stringify(orderedLetterCounts)}`);
console.log(`  answer letters before shuffle: ${JSON.stringify(Object.fromEntries(LETTERS.split("").map((letter) => [letter, upstreamLetterCounts[letter] ?? 0])))}`);
console.log(`  option counts: ${JSON.stringify(orderedOptionCounts)}`);
console.log("  lib/generated/problems.ts");
