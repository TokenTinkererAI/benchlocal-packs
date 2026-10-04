/**
 * Generates lib/generated/problems.ts from data/mmlu_redux.jsonl
 * (MMLU-Redux verified-correct subset, CC BY 4.0 - see data/LICENSE-mmlu-redux).
 *
 * Deterministic: identical input -> identical output. Option order is shuffled
 * per question with a fixed salt (mulberry32, seeded by the question hash) so
 * the stored data already carries the final option order and the gold letter;
 * runs are reproducible and the upstream MMLU label-position bias (D is
 * over-represented in the source) is removed.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SUBJECT_SUBCATEGORY, SUBCATEGORY_GROUP, GROUP_ORDER, GROUP_LABELS, groupForSubject } from "./mmlu-subjects.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonlPath = path.join(root, "data", "mmlu_redux.jsonl");
const outDir = path.join(root, "lib", "generated");

const EXPECTED_JSONL_SHA256 = "618b47dc38f607abf2fde62efd17c1a1474c9c03730a77f58d8803fd232a8ffa";
const EXPECTED_PROBLEMS = 5330;
const EXPECTED_SUBJECTS = 57;
const SHUFFLE_SALT = "mmlu-redux-shuffle-v1";

const raw = readFileSync(jsonlPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_JSONL_SHA256) {
  throw new Error(`mmlu_redux.jsonl sha256 mismatch (drifted source?): ${sha256}`);
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
  throw new Error(`expected ${EXPECTED_PROBLEMS} verified-correct rows, got ${rows.length}`);
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
const subjectsSeen = new Set();
const duplicateOptionRecords = [];
const ambiguousGoldRecords = [];

rows.forEach((row, index) => {
  const subject = norm(row.subject);
  if (row.error_type !== "ok") {
    throw new Error(`problem ${index} (${row.recordId}): error_type "${row.error_type}" is not "ok"`);
  }
  subjectsSeen.add(subject);
  const group = groupForSubject(subject);

  const question = norm(row.question);
  if (question === "") {
    throw new Error(`problem ${index} (${row.recordId}): empty question`);
  }
  if (!Array.isArray(row.choices) || row.choices.length !== 4) {
    throw new Error(`problem ${index} (${row.recordId}): expected 4 choices`);
  }
  const choices = row.choices.map(norm);
  if (choices.some((choice) => choice === "")) {
    throw new Error(`problem ${index} (${row.recordId}): empty option`);
  }
  const upstreamAnswerIndex = row.answer;
  if (!Number.isInteger(upstreamAnswerIndex) || upstreamAnswerIndex < 0 || upstreamAnswerIndex > 3) {
    throw new Error(`problem ${index} (${row.recordId}): answer index ${upstreamAnswerIndex} out of range`);
  }

  // Index-based shuffle: the gold option is tracked by its index, so a
  // duplicated distractor (or a duplicated gold) can never misplace the key.
  const permutation = shuffleOptions([0, 1, 2, 3], `${row.recordId}:${question}`);
  const options = permutation.map((originalIndex) => choices[originalIndex]);
  const answerIndex = permutation.indexOf(upstreamAnswerIndex);
  if (answerIndex < 0) {
    throw new Error(`problem ${index} (${row.recordId}): gold option lost during shuffle`);
  }
  const answerLetter = "ABCD"[answerIndex];

  const distinct = new Set(choices);
  if (distinct.size !== 4) {
    duplicateOptionRecords.push(row.recordId);
    const goldText = choices[upstreamAnswerIndex];
    if (choices.filter((choice) => choice === goldText).length !== 1) {
      ambiguousGoldRecords.push(row.recordId);
    }
  }

  problems.push({
    id: `MMLU-Redux/${index}`,
    recordId: norm(row.recordId),
    subject,
    group,
    question,
    options,
    answerIndex,
    answerLetter,
    upstreamAnswerIndex
  });
});

if (subjectsSeen.size !== EXPECTED_SUBJECTS) {
  throw new Error(`expected ${EXPECTED_SUBJECTS} subjects, got ${subjectsSeen.size}`);
}

// Every subject in the data maps exactly once, and the mapping has no dangling entries.
const mappedSubjects = Object.keys(SUBJECT_SUBCATEGORY);
const unmapped = [...subjectsSeen].filter((subject) => !(subject in SUBJECT_SUBCATEGORY)).sort();
if (unmapped.length > 0) {
  throw new Error(`subjects present in the data but not in the MMLU subject mapping: ${unmapped.join(", ")}`);
}
const unused = mappedSubjects.filter((subject) => !subjectsSeen.has(subject)).sort();
if (unused.length > 0) {
  throw new Error(`MMLU subject mapping entries not present in the data: ${unused.join(", ")}`);
}
if (mappedSubjects.length !== EXPECTED_SUBJECTS) {
  throw new Error(`MMLU subject mapping has ${mappedSubjects.length} entries, expected ${EXPECTED_SUBJECTS}`);
}
for (const subject of mappedSubjects) {
  const subcategory = SUBJECT_SUBCATEGORY[subject];
  if (!SUBCATEGORY_GROUP[subcategory]) {
    throw new Error(`subcategory "${subcategory}" (subject "${subject}") is not mapped to a group`);
  }
}

const letterCounts = {};
const groupCounts = {};
const subjectCounts = {};
for (const problem of problems) {
  letterCounts[problem.answerLetter] = (letterCounts[problem.answerLetter] ?? 0) + 1;
  groupCounts[problem.group] = (groupCounts[problem.group] ?? 0) + 1;
  subjectCounts[problem.subject] = (subjectCounts[problem.subject] ?? 0) + 1;
}
const orderedLetterCounts = Object.fromEntries("ABCD".split("").map((letter) => [letter, letterCounts[letter] ?? 0]));
const orderedGroupCounts = Object.fromEntries(GROUP_ORDER.map((group) => [group, groupCounts[group] ?? 0]));

const esc = (value) => JSON.stringify(value);
const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: data/mmlu_redux.jsonl - MMLU-Redux verified-correct subset (error_type \"ok\").");
lines.push("// Dataset: edinburgh-dawg/mmlu-redux-2.0 @ 372ea425445d51e1ba1188c56e5e893f8138621f (CC BY 4.0, (c) MMLU-Redux authors).");
lines.push("//         5,700 reviewed questions across 57 MMLU subjects; 5,330 verified correct were kept.");
lines.push(`// Source sha256: ${sha256}`);
lines.push(`// Option order: deterministic shuffle (salt "${SHUFFLE_SALT}"), index-based Fisher-Yates seeded by sha256(salt:recordId:question).`);
lines.push(`// Answer letters after shuffle: ${JSON.stringify(orderedLetterCounts)}`);
lines.push(`// MMLU groups (weights): ${JSON.stringify(orderedGroupCounts)}`);
if (duplicateOptionRecords.length > 0) {
  lines.push(
    `// Upstream note: ${duplicateOptionRecords.length} question(s) carry a duplicated option text (${duplicateOptionRecords.join(", ")}); kept as-is.`
  );
}
if (ambiguousGoldRecords.length > 0) {
  lines.push(
    `// Upstream note: of those, ${ambiguousGoldRecords.length} duplicate the gold option text itself (${ambiguousGoldRecords.join(", ")}); the gold letter is the shuffled position of the upstream answer index.`
  );
}
lines.push("");
lines.push(`import type { MmluGroup, MmluProblem } from "../types";`);
lines.push("");
lines.push("/** Fixed display order of the four canonical MMLU groups. */");
lines.push(`export const GROUP_ORDER: readonly MmluGroup[] = [${GROUP_ORDER.map(esc).join(", ")}];`);
lines.push("");
lines.push("/** Result-card labels per group. */");
lines.push("export const GROUP_LABELS: Record<MmluGroup, string> = {");
for (const group of GROUP_ORDER) {
  lines.push(`  ${group}: ${esc(GROUP_LABELS[group])},`);
}
lines.push("};");
lines.push("");
lines.push("/**");
lines.push(" * Identity helper: keeps each generated entry typed as MmluProblem without");
lines.push(" * asking tsc to represent a union of 5,330 distinct object literal types");
lines.push(" * (error TS2590 on plain `MmluProblem[]` literals at this size).");
lines.push(" */");
lines.push("function problem(entry: MmluProblem): MmluProblem {");
lines.push("  return entry;");
lines.push("}");
lines.push("");
lines.push("export const PROBLEMS: readonly MmluProblem[] = [");
for (const problemEntry of problems) {
  lines.push("  problem({");
  lines.push(`    id: ${esc(problemEntry.id)},`);
  lines.push(`    recordId: ${esc(problemEntry.recordId)},`);
  lines.push(`    subject: ${esc(problemEntry.subject)},`);
  lines.push(`    group: ${esc(problemEntry.group)},`);
  lines.push(`    question: ${esc(problemEntry.question)},`);
  lines.push(`    options: [${problemEntry.options.map(esc).join(", ")}],`);
  lines.push(`    answerIndex: ${problemEntry.answerIndex},`);
  lines.push(`    answerLetter: ${esc(problemEntry.answerLetter)},`);
  lines.push(`    upstreamAnswerIndex: ${problemEntry.upstreamAnswerIndex}`);
  lines.push("  }),");
}
lines.push("];");
lines.push("");
lines.push("export function getProblem(id: string): MmluProblem | undefined {");
lines.push("  return PROBLEMS.find((problem) => problem.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), lines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  subjects: ${subjectsSeen.size} | groups: ${JSON.stringify(orderedGroupCounts)}`);
console.log(`  answer letters: ${JSON.stringify(orderedLetterCounts)}`);
if (duplicateOptionRecords.length > 0) {
  console.log(`  upstream duplicate-option questions kept as-is: ${duplicateOptionRecords.length} (${duplicateOptionRecords.join(", ")})`);
}
if (ambiguousGoldRecords.length > 0) {
  console.log(`  ...of which duplicate the gold text: ${ambiguousGoldRecords.length} (${ambiguousGoldRecords.join(", ")})`);
}
console.log("  lib/generated/problems.ts");
