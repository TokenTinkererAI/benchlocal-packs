#!/usr/bin/env node
/**
 * Fixture checks for TruthfulQA-817: answer extraction, prompt formatting,
 * and dataset integrity. Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractAnswerLetter } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_PROMPT, optionLetters } = require("../dist-cli/lib/prompts.js");
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
// 1. Extraction fixtures (four choices, A-D)
// ---------------------------------------------------------------------------

const fixtures4 = [
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

for (const [text, expected] of fixtures4) {
  const result = extractAnswerLetter(text, 4);
  const label = `extract[4] ${JSON.stringify(text.slice(0, 42))}${text.length > 42 ? "..." : ""}`;
  check(label, result.letter, expected);
}

// ---------------------------------------------------------------------------
// 2. Extraction fixtures (variable choice counts)
// ---------------------------------------------------------------------------

const fixturesN = [
  [13, "Answer: M", "M"],
  [13, "**Answer: K**", "K"],
  [13, "The final answer is J", "J"],
  [13, "\\boxed{L}", "L"],
  [13, "Answer: I", "I"],
  [13, "The answer is I, because the others are wrong.", "I"],
  [13, "Let me reason. Option F is a myth. The answer is G.", "G"],
  [13, "The answer is I think H.", undefined],
  [13, "The answer is I\n\nOn reflection, the answer is H", "H"],
  [13, "The answers are B and D", undefined],
  [13, "Answer: N", undefined],
  [7, "answer: G", "G"],
  [7, "I would pick option H", undefined],
  [2, "Answer: B", "B"],
  [2, "Answer: C", undefined]
];

for (const [letterCount, text, expected] of fixturesN) {
  const result = extractAnswerLetter(text, letterCount);
  const label = `extract[${letterCount}] ${JSON.stringify(text.slice(0, 42))}${text.length > 42 ? "..." : ""}`;
  check(label, result.letter, expected);
}

// ---------------------------------------------------------------------------
// 3. Prompt formatting
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
const lastLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[question.options.length - 1];
check("prompt: contains last option", user.includes(`${lastLetter}) ${question.options[question.options.length - 1]}`), true);
check("prompt: letter range listed", user.includes("is one of A"), true);
check("optionLetters(4)", optionLetters(4).join(""), "ABCD");
check("optionLetters(13)", optionLetters(13).join(""), "ABCDEFGHIJKLM");

// ---------------------------------------------------------------------------
// 4. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 817 questions", QUESTIONS.length, 817);
check(
  "dataset: answer letters valid",
  QUESTIONS.every((q) => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[q.answerIndex] === q.answerLetter),
  true
);
check(
  "dataset: choice counts in range",
  QUESTIONS.every((q) => Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= 13),
  true
);
check(
  "dataset: correct answer unique",
  QUESTIONS.every((q) => q.options.filter((option) => option === q.options[q.answerIndex]).length === 1),
  true
);
check(
  "dataset: no empty options",
  QUESTIONS.every((q) => q.options.every((option) => typeof option === "string" && option.length > 0)),
  true
);
check(
  "dataset: question texts unique",
  new Set(QUESTIONS.map((q) => q.question)).size === QUESTIONS.length,
  true
);
check(
  "dataset: shuffle removed positional bias",
  QUESTIONS.filter((q) => q.answerIndex === 0).length < QUESTIONS.length,
  true
);
check(
  "dataset: choice-count distribution",
  JSON.stringify(
    QUESTIONS.reduce((acc, q) => {
      acc[q.options.length] = (acc[q.options.length] ?? 0) + 1;
      return acc;
    }, {})
  ),
  JSON.stringify({ 2: 43, 3: 90, 4: 219, 5: 192, 6: 135, 7: 65, 8: 36, 9: 17, 10: 9, 11: 7, 12: 3, 13: 1 })
);

console.log("");
const letterSpread = QUESTIONS.reduce((acc, q) => {
  acc[q.answerLetter] = (acc[q.answerLetter] ?? 0) + 1;
  return acc;
}, {});
console.log(`letter spread: ${JSON.stringify(letterSpread)}`);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
