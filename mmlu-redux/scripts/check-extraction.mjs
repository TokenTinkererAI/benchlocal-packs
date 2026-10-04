#!/usr/bin/env node
/**
 * Fixture checks for MMLU-Redux: answer extraction (all layers), prompt
 * formatting, dataset integrity, option-shuffle remapping and the group
 * mapping. Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SUBJECT_SUBCATEGORY, SUBCATEGORY_GROUP, GROUP_ORDER, groupForSubject } from "./mmlu-subjects.mjs";

const require = createRequire(import.meta.url);
const { extractAnswerLetter } = require("../dist-cli/lib/extract.js");
const { buildMessages, formatQuestion, formatSubject, SYSTEM_PROMPT } = require("../dist-cli/lib/prompts.js");
const { PROBLEMS, GROUP_LABELS } = require("../dist-cli/lib/generated/problems.js");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let failures = 0;
let checks = 0;

function check(name, actual, expected) {
  checks += 1;
  const ok = actual === expected;
  if (!ok) {
    failures += 1;
    console.error(`FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

// ---------------------------------------------------------------------------
// 1. Extraction fixtures (all three layers)
// ---------------------------------------------------------------------------

const fixtures = [
  // layer 2: "answer ... X" phrases
  ["Answer: B", "B"],
  ["Answer: (C)", "C"],
  ["**Answer: D**", "D"],
  ["The answer is a", "A"],
  ["The correct answer is B.", "B"],
  ["So the answer would be C.", "C"],
  ["The correct option is d", "D"],
  ["The answer must be c", "C"],
  ["I checked every option.\n\nFinal answer: (a)", "A"],
  // layer 1: \boxed{}
  ["\\boxed{A}", "A"],
  ["Let me think. B is wrong and D is wrong too.\n\n\\boxed{B}", "B"],
  ["**\\boxed{\\text{C}}**", "C"],
  ["Final answer: \\boxed{(D)}", "D"],
  // layer 1 wins over layer 2 (documented layer order)
  ["The answer is B.\n\n\\boxed{D}", "D"],
  // layer 3: lone final line
  ["Some reasoning text\n\nB", "B"],
  ["```\nB\n```", "B"],
  ["final verdict:\n\n(D)", "D"],
  ["**B**", "B"],
  ["I worked through every option carefully.\n\nC.", "C"],
  ["Comparing the options leaves only one candidate.\n\nD)", "D"],
  // unparseable
  ["The answers are B and D", undefined],
  ["The answer choices are A, B, C and D", undefined],
  ["Answer: E", undefined],
  ["I'm not sure about this one.", undefined],
  ["The reasoning is too long and never commits to an option.", undefined],
  // empty
  ["", undefined],
  ["   \n\n  ", undefined]
];

for (const [text, expected] of fixtures) {
  const result = extractAnswerLetter(text);
  const label = `extract ${JSON.stringify(text.slice(0, 48))}${text.length > 48 ? "..." : ""}`;
  check(label, result.letter, expected);
}

check(
  "extract: unparseable carries an explanatory note",
  extractAnswerLetter("no letter here at all").notes.some((note) => note.includes("no answer letter found")),
  true
);
check(
  "extract: empty response note",
  extractAnswerLetter("").notes.join("; "),
  "empty response"
);

// ---------------------------------------------------------------------------
// 2. Prompt formatting (zero-shot MMLU-style chat prompt)
// ---------------------------------------------------------------------------

const problem = PROBLEMS[0];
const messages = buildMessages(problem);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check(
  "prompt: MMLU-style subject header",
  user.startsWith(`The following are multiple choice questions (with answers) about ${formatSubject(problem.subject)}.`),
  true
);
check("prompt: subject rendered with spaces", formatSubject("high_school_european_history"), "high school european history");
check("prompt: contains answer format", user.includes("Answer: <LETTER>"), true);
check("prompt: contains question text", user.includes(problem.question), true);
check("prompt: contains option A", user.includes(`A. ${problem.options[0]}`), true);
check("prompt: contains option D", user.includes(`D. ${problem.options[3]}`), true);
check("prompt: MMLU A./B. option labels", user.includes(`B. ${problem.options[1]}`), true);
check("prompt: question block matches formatter", user.includes(formatQuestion(problem)), true);

// ---------------------------------------------------------------------------
// 3. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 5,330 problems", PROBLEMS.length, 5330);
check("dataset: first id", PROBLEMS[0].id, "MMLU-Redux/0");
check("dataset: last id", PROBLEMS[PROBLEMS.length - 1].id, "MMLU-Redux/5329");
check(
  "dataset: answer letters valid",
  PROBLEMS.every((entry) => "ABCD"[entry.answerIndex] === entry.answerLetter),
  true
);
check(
  "dataset: four options each",
  PROBLEMS.every((entry) => Array.isArray(entry.options) && entry.options.length === 4),
  true
);
check(
  "dataset: no empty option text",
  PROBLEMS.every((entry) => entry.options.every((option) => String(option).trim() !== "")),
  true
);
check(
  "dataset: groups are the four canonical MMLU groups",
  JSON.stringify([...new Set(PROBLEMS.map((entry) => entry.group))].sort()),
  JSON.stringify([...GROUP_ORDER].sort())
);
check(
  "dataset: group labels",
  GROUP_ORDER.map((group) => `${group}=${GROUP_LABELS[group]}`).join(","),
  "stem=STEM,humanities=Humanities,social_sciences=Social sciences,other=Other"
);
check(
  "dataset: 57 subjects",
  new Set(PROBLEMS.map((entry) => entry.subject)).size,
  57
);
check(
  "dataset: every subject maps to exactly one group",
  [...new Set(PROBLEMS.map((entry) => entry.subject))].every((subject) => {
    const subcategory = SUBJECT_SUBCATEGORY[subject];
    const group = subcategory ? SUBCATEGORY_GROUP[subcategory] : undefined;
    return group === groupForSubject(subject) && GROUP_ORDER.includes(group);
  }),
  true
);
check(
  "dataset: group assignment matches the standard MMLU mapping",
  PROBLEMS.every((entry) => entry.group === groupForSubject(entry.subject)),
  true
);
check(
  "dataset: mapping has 57 subjects and no dangling entries",
  `${Object.keys(SUBJECT_SUBCATEGORY).length}/${Object.keys(SUBCATEGORY_GROUP).length}`,
  "57/17"
);
const letterSpread = PROBLEMS.reduce((acc, entry) => {
  acc[entry.answerLetter] = (acc[entry.answerLetter] ?? 0) + 1;
  return acc;
}, {});
check(
  "dataset: every letter used",
  ["A", "B", "C", "D"].every((letter) => (letterSpread[letter] ?? 0) > 0),
  true
);
const ideal = PROBLEMS.length / 4;
check(
  "dataset: letter distribution even-ish (each within 10% of N/4)",
  ["A", "B", "C", "D"].every((letter) => Math.abs((letterSpread[letter] ?? 0) - ideal) <= ideal * 0.1),
  true
);

// ---------------------------------------------------------------------------
// 4. Option shuffle: the output is a permutation of the vendored source and
//    the gold option still carries the upstream answer text.
// ---------------------------------------------------------------------------

const jsonlRaw = readFileSync(path.join(root, "data", "mmlu_redux.jsonl"));
check(
  "source: vendored jsonl sha256",
  createHash("sha256").update(jsonlRaw).digest("hex"),
  "618b47dc38f607abf2fde62efd17c1a1474c9c03730a77f58d8803fd232a8ffa"
);
const sourceRows = jsonlRaw.toString("utf8").trim().split("\n").map((line) => JSON.parse(line));
check("source: one vendored row per problem", sourceRows.length, PROBLEMS.length);

const shuffleProblems = [];
const goldMismatches = [];
const nonPermutations = [];
PROBLEMS.forEach((entry, index) => {
  const row = sourceRows[index];
  if (entry.recordId !== row.recordId || entry.subject !== row.subject) {
    shuffleProblems.push(`${entry.id}: provenance mismatch`);
  }
  const sourceOptions = row.choices.map((choice) => String(choice).replace(/\r\n/g, "\n").trim());
  const shuffled = [...entry.options].sort();
  const original = [...sourceOptions].sort();
  if (JSON.stringify(shuffled) !== JSON.stringify(original)) {
    nonPermutations.push(entry.id);
  }
  if (entry.options[entry.answerIndex] !== sourceOptions[row.answer]) {
    goldMismatches.push(entry.id);
  }
  if (entry.upstreamAnswerIndex !== row.answer) {
    shuffleProblems.push(`${entry.id}: upstreamAnswerIndex mismatch`);
  }
});
check("shuffle: every problem is a permutation of its source options", nonPermutations.length, 0);
check("shuffle: gold option still holds the upstream answer text", goldMismatches.length, 0);
check("shuffle: provenance fields intact", shuffleProblems.length, 0);
check(
  "shuffle: order actually changed for the corpus",
  PROBLEMS.filter((entry, index) => entry.answerLetter !== "ABCD"[sourceRows[index].answer]).length > 0,
  true
);

console.log("");
console.log(`letter spread: ${JSON.stringify(letterSpread)}`);
console.log(
  `groups: ${JSON.stringify(
    GROUP_ORDER.reduce((acc, group) => {
      acc[group] = PROBLEMS.filter((entry) => entry.group === group).length;
      return acc;
    }, {})
  )}`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
