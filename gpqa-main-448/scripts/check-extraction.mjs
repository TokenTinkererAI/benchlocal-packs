#!/usr/bin/env node
/**
 * Fixture checks for GPQA-Main-448: answer extraction, prompt formatting,
 * and dataset integrity. Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractAnswerLetter } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_PROMPT } = require("../dist-cli/lib/prompts.js");
const { QUESTIONS } = require("../dist-cli/lib/generated/questions.js");

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
// 1. Extraction fixtures
// ---------------------------------------------------------------------------

const fixtures = [
  ["Answer: B", "B"],
  ["Answer: (C)", "C"],
  ["**Answer: D**", "D"],
  ["The answer is a", "A"],
  ["The correct answer is B.", "B"],
  ["So the answer would be C.", "C"],
  ["The correct option is D", "D"],
  ["The answer to this question is C", "C"],
  ["\\boxed{A}", "A"],
  ["Let me think. B is wrong and D is wrong too.\n\nThe answer is A", "A"],
  ["Some reasoning text\n\nB", "B"],
  ["```\nB\n```", "B"],
  ["final verdict:\n\n(D)", "D"],
  ["**B**", "B"],
  ["Answer = A", "A"],
  ["the answer must be d", "D"],
  ["The answers are B and D", undefined],
  ["The answer choices are A, B, C and D", undefined],
  ["Answer: E", undefined],
  ["I'm not sure about this one.", undefined],
  ["", undefined],
  ["The answer is possibly (b) but on reflection it's C.\n\n\\boxed{C}", "C"]
];

for (const [text, expected] of fixtures) {
  const result = extractAnswerLetter(text);
  const label = `extract ${JSON.stringify(text.slice(0, 48))}${text.length > 48 ? "..." : ""}`;
  check(label, result.letter, expected);
}

// ---------------------------------------------------------------------------
// 2. Prompt formatting
// ---------------------------------------------------------------------------

const question = QUESTIONS[0];
const messages = buildMessages(question);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check("prompt: contains answer format", user.includes("Answer: <LETTER>"), true);
check("prompt: contains question text", user.includes(question.question), true);
check("prompt: contains option A", user.includes(`A) ${question.options[0]}`), true);
check("prompt: contains option D", user.includes(`D) ${question.options[3]}`), true);

// ---------------------------------------------------------------------------
// 3. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 448 questions", QUESTIONS.length, 448);
check(
  "dataset: answer letters valid",
  QUESTIONS.every((q) => "ABCD"[q.answerIndex] === q.answerLetter),
  true
);
check(
  "dataset: four options each",
  QUESTIONS.every((q) => Array.isArray(q.options) && q.options.length === 4),
  true
);
check(
  "dataset: at least 3 distinct options each",
  QUESTIONS.every((q) => new Set(q.options).size >= 3),
  true
);
check(
  "dataset: domains",
  JSON.stringify([...new Set(QUESTIONS.map((q) => q.domain))].sort()),
  JSON.stringify(["Biology", "Chemistry", "Physics"])
);
const letterSpread = QUESTIONS.reduce((acc, q) => {
  acc[q.answerLetter] = (acc[q.answerLetter] ?? 0) + 1;
  return acc;
}, {});
check(
  "dataset: every letter used",
  ["A", "B", "C", "D"].every((letter) => (letterSpread[letter] ?? 0) > 0),
  true
);

console.log("");
console.log(`letter spread: ${JSON.stringify(letterSpread)}`);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
