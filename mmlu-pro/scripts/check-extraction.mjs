#!/usr/bin/env node
/**
 * Fixture checks for MMLU-Pro: answer extraction (all three layers, A-J),
 * prompt formatting, dataset integrity, the option-shuffle remapping against
 * the vendored source and the category mapping. Runs against the built
 * dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { extractAnswerLetter } = require("../dist-cli/lib/extract.js");
const { buildMessages, formatQuestion, ANSWER_INSTRUCTION, SYSTEM_PROMPT, LETTERS } = require("../dist-cli/lib/prompts.js");
const { PROBLEMS, CATEGORY_ORDER, CATEGORY_LABELS } = require("../dist-cli/lib/generated/problems.js");

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
// 1. Extraction fixtures (all three layers, official (X) form, A-J)
// ---------------------------------------------------------------------------

const fixtures = [
  // layer 2: official MMLU-Pro form "The answer is (X)" first-class
  ["The answer is (C)", "C"],
  ["Weighing every option, the evidence settles on one choice.\n\nThe answer is (J).", "J"],
  ["Answer: B", "B"],
  ["Answer: (E)", "E"],
  ["**Answer: D**", "D"],
  ["The answer is a", "A"],
  ["The correct answer is B.", "B"],
  ["So the answer would be C.", "C"],
  ["The correct option is d", "D"],
  ["The answer must be i", "I"],
  ["The answer is I.", "I"],
  ["I checked every option.\n\nFinal answer: (a)", "A"],
  // layer 2: last occurrence wins (distractor mentions mid-reasoning)
  [
    "The answer is (A) — though a first reading suggests (C) — and after checking the final answer is (I).",
    "I"
  ],
  [
    "Since option F was ruled out early, and option B is discussed at length, the final choice is C.",
    "C"
  ],
  // layer 1: boxed (wins over layer 2, documented layer order)
  ["\\boxed{A}", "A"],
  ["Let me think. B is wrong and D is wrong too.\n\n\\boxed{G}", "G"],
  ["**\\boxed{\\text{H}}**", "H"],
  ["Final answer: \\boxed{(J)}", "J"],
  ["The evidence is unclear. We can perhaps consider \\fbox{E}.", "E"],
  ["The answer is B.\n\n\\boxed{D}", "D"],
  // layer 3: lone final line
  ["Some reasoning text\n\nB", "B"],
  ["```\nG\n```", "G"],
  ["final verdict:\n\n(J)", "J"],
  ["**F**", "F"],
  ["I worked through every option carefully.\n\nH.", "H"],
  ["Comparing the options leaves only one candidate.\n\nD)", "D"],
  // unparseable (never guessed)
  ["The answers are B and D", undefined],
  ["The answer choices are A, B, C and D", undefined],
  ["The correct answer is among the options B and C.", undefined],
  ["Answer: K", undefined],
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
// 2. Prompt formatting (zero-shot MMLU-Pro chat prompt)
// ---------------------------------------------------------------------------

check(
  "prompt: instruction is the official core sentence",
  ANSWER_INSTRUCTION,
  'Answer the following multiple choice question. Think step by step and then finish your answer with "The answer is (X)" where X is the correct letter choice.'
);

const problem = PROBLEMS[0];
const messages = buildMessages(problem);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check("prompt: user starts with the instruction", user.startsWith(ANSWER_INSTRUCTION), true);
check("prompt: instruction carries the official (X) form", user.includes('"The answer is (X)"'), true);
check("prompt: contains question text", user.includes(problem.question), true);
check("prompt: labeled option block matches formatter", user.includes(formatQuestion(problem)), true);
check("prompt: contains option A", user.includes(`A. ${problem.options[0]}`), true);
check("prompt: contains last option label", user.includes(`${LETTERS[problem.options.length - 1]}. ${problem.options[problem.options.length - 1]}`), true);
check("prompt: ends with the official Answer: cue", user.trimEnd().endsWith("Answer:"), true);

// ---------------------------------------------------------------------------
// 3. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 12,032 problems", PROBLEMS.length, 12032);
check("dataset: first id", PROBLEMS[0].id, "MMLU-Pro/0");
check("dataset: last id", PROBLEMS[PROBLEMS.length - 1].id, "MMLU-Pro/12031");
check(
  "dataset: ids are index-ordered",
  PROBLEMS.every((entry, index) => entry.id === `MMLU-Pro/${index}`),
  true
);
check(
  "dataset: questionId unique (upstream question_id)",
  new Set(PROBLEMS.map((entry) => entry.questionId)).size,
  PROBLEMS.length
);
check(
  "dataset: answer letters valid for their index",
  PROBLEMS.every((entry) => "ABCDEFGHIJ"[entry.answerIndex] === entry.answerLetter),
  true
);
check(
  "dataset: 3-10 options each",
  PROBLEMS.every((entry) => Array.isArray(entry.options) && entry.options.length >= 3 && entry.options.length <= 10),
  true
);
check(
  "dataset: no empty option text",
  PROBLEMS.every((entry) => entry.options.every((option) => String(option).trim() !== "")),
  true
);
check(
  "dataset: no empty question text",
  PROBLEMS.every((entry) => String(entry.question).trim() !== ""),
  true
);
check(
  "dataset: categories are the 14 official disciplines",
  JSON.stringify([...new Set(PROBLEMS.map((entry) => entry.category))].sort()),
  JSON.stringify([...CATEGORY_ORDER].sort())
);
check("dataset: 14 categories", CATEGORY_ORDER.length, 14);
check(
  "dataset: category labels",
  CATEGORY_ORDER.map((category) => `${category}=${CATEGORY_LABELS[category]}`).slice(0, 3).join(","),
  "business=Business,law=Law,psychology=Psychology"
);
const categoryWeights = CATEGORY_ORDER.map(
  (category) => PROBLEMS.filter((entry) => entry.category === category).length
);
check(
  "dataset: category weights match the official counts",
  JSON.stringify(categoryWeights),
  JSON.stringify([789, 1101, 798, 717, 1132, 381, 924, 818, 844, 1351, 1299, 410, 499, 969])
);

const letterSpread = PROBLEMS.reduce((acc, entry) => {
  acc[entry.answerLetter] = (acc[entry.answerLetter] ?? 0) + 1;
  return acc;
}, {});
check(
  "dataset: every letter A-J used",
  "ABCDEFGHIJ".split("").every((letter) => (letterSpread[letter] ?? 0) > 0),
  true
);
// Structural note: letters beyond a question's option count are impossible
// (21 questions carry 3 options, 606 carry 4, ...), so the tail letters sit
// somewhat below N/10; each letter must still land within 20% of N/10.
const ideal = PROBLEMS.length / 10;
check(
  "dataset: letter distribution even-ish (each within 20% of N/10)",
  "ABCDEFGHIJ".split("").every((letter) => Math.abs((letterSpread[letter] ?? 0) - ideal) <= ideal * 0.2),
  true
);

// ---------------------------------------------------------------------------
// 4. Option shuffle: the output is a permutation of the vendored source and
//    the gold option still carries the upstream answer text.
// ---------------------------------------------------------------------------

const jsonlRaw = readFileSync(path.join(root, "data", "mmlu_pro.jsonl"));
check(
  "source: vendored jsonl sha256",
  createHash("sha256").update(jsonlRaw).digest("hex"),
  "9dccf55b5718bffbf705bc19b8757274267e07d16af6a56c831cf5e8fb00069e"
);
const sourceRows = jsonlRaw.toString("utf8").trim().split("\n").map((line) => JSON.parse(line));
check("source: one vendored row per problem", sourceRows.length, PROBLEMS.length);

const shuffleProblems = [];
const goldMismatches = [];
const nonPermutations = [];
PROBLEMS.forEach((entry, index) => {
  const row = sourceRows[index];
  if (entry.questionId !== row.question_id || entry.category !== row.category || entry.src !== row.src) {
    shuffleProblems.push(`${entry.id}: provenance mismatch`);
  }
  const sourceOptions = row.options.map((option) => String(option).replace(/\r\n/g, "\n").trim());
  const shuffled = [...entry.options].sort();
  const original = [...sourceOptions].sort();
  if (JSON.stringify(shuffled) !== JSON.stringify(original)) {
    nonPermutations.push(entry.id);
  }
  if (entry.options[entry.answerIndex] !== sourceOptions[row.answer_index]) {
    goldMismatches.push(entry.id);
  }
  if (entry.upstreamAnswerIndex !== row.answer_index) {
    shuffleProblems.push(`${entry.id}: upstreamAnswerIndex mismatch`);
  }
  if ("ABCDEFGHIJ"[row.answer_index] !== row.answer) {
    shuffleProblems.push(`${entry.id}: upstream answer letter mismatch`);
  }
});
check("shuffle: every problem is a permutation of its source options", nonPermutations.length, 0);
check("shuffle: gold option still holds the upstream answer text", goldMismatches.length, 0);
check("shuffle: provenance fields intact", shuffleProblems.length, 0);
check(
  "shuffle: order actually changed for the corpus",
  PROBLEMS.filter((entry, index) => entry.answerLetter !== "ABCDEFGHIJ"[sourceRows[index].answer_index]).length > 0,
  true
);

console.log("");
console.log(`letter spread: ${JSON.stringify(Object.fromEntries("ABCDEFGHIJ".split("").map((letter) => [letter, letterSpread[letter] ?? 0])))}`);
console.log(
  `categories: ${JSON.stringify(
    Object.fromEntries(CATEGORY_ORDER.map((category, index) => [category, categoryWeights[index]]))
  )}`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
