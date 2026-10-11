#!/usr/bin/env node
/**
 * Fixture checks for ARC-Challenge-1172: answer extraction, prompt formatting,
 * and dataset integrity. Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractAnswerLetter } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_PROMPT, answerLetters } = require("../dist-cli/lib/prompts.js");
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
// 1. Extraction fixtures (default alphabet A-D, the four-option majority)
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

// Alphabet-scoped extraction: the accepted letter set follows the question's
// option count, so a letter outside the question's options never extracts.
check("extract [ABC] 'Answer: C' -> C", extractAnswerLetter("Answer: C", "ABC").letter, "C");
check("extract [ABC] 'Answer: D' -> undefined", extractAnswerLetter("Answer: D", "ABC").letter, undefined);
check("extract [ABCD] 'Answer: E' -> undefined", extractAnswerLetter("Answer: E", "ABCD").letter, undefined);
check("extract [ABCDE] 'Answer: E' -> E", extractAnswerLetter("Answer: E", "ABCDE").letter, "E");
check("extract [ABCDE] '\\boxed{E}' -> E", extractAnswerLetter("reason\n\n\\boxed{E}", "ABCDE").letter, "E");
check("extract [ABCDE] bare final 'E' -> E", extractAnswerLetter("weighing options\n\nE", "ABCDE").letter, "E");

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
check(
  "prompt: contains last option",
  user.includes(`${"ABCDE"[question.options.length - 1]}) ${question.options[question.options.length - 1]}`),
  true
);

const five = QUESTIONS.find((q) => q.options.length === 5);
const three = QUESTIONS.find((q) => q.options.length === 3);
if (five) {
  check("prompt [5 options]: lists A-E", buildMessages(five)[1].content.includes("A, B, C, D or E"), true);
  check("prompt [5 options]: answerLetters", answerLetters(five), "ABCDE");
  check("prompt [5 options]: contains option E", buildMessages(five)[1].content.includes(`E) ${five.options[4]}`), true);
} else {
  check("prompt [5 options]: present", false, true);
}
if (three) {
  check("prompt [3 options]: lists A-C", buildMessages(three)[1].content.includes("A, B or C"), true);
  check("prompt [3 options]: answerLetters", answerLetters(three), "ABC");
} else {
  check("prompt [3 options]: present", false, true);
}

// ---------------------------------------------------------------------------
// 3. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 1172 questions", QUESTIONS.length, 1172);
check(
  "dataset: answer letters valid",
  QUESTIONS.every((q) => "ABCDE"[q.answerIndex] === q.answerLetter),
  true
);
check(
  "dataset: 3-5 options each",
  QUESTIONS.every((q) => Array.isArray(q.options) && q.options.length >= 3 && q.options.length <= 5),
  true
);
check(
  "dataset: correct answer unique",
  QUESTIONS.every((q) => q.options.filter((option) => option === q.options[q.answerIndex]).length === 1),
  true
);
check(
  "dataset: option counts",
  JSON.stringify(QUESTIONS.reduce((acc, q) => {
    acc[q.options.length] = (acc[q.options.length] ?? 0) + 1;
    return acc;
  }, {})),
  JSON.stringify({ 3: 4, 4: 1165, 5: 3 })
);
const ids = QUESTIONS.map((q) => q.id);
check("dataset: ids sequential", ids[0] === "ARC/0" && ids[1171] === "ARC/1171", true);
check("dataset: ids unique", new Set(ids).size, 1172);
check("dataset: upstream ids unique", new Set(QUESTIONS.map((q) => q.recordId)).size, 1172);

const letterSpread = QUESTIONS.reduce((acc, q) => {
  acc[q.answerLetter] = (acc[q.answerLetter] ?? 0) + 1;
  return acc;
}, {});
check(
  "dataset: every A-D letter used",
  ["A", "B", "C", "D"].every((letter) => (letterSpread[letter] ?? 0) > 0),
  true
);
check(
  "dataset: answer letter within option count",
  QUESTIONS.every((q) => q.answerIndex >= 0 && q.answerIndex < q.options.length),
  true
);
check(
  "dataset: answer letters within A-E",
  QUESTIONS.every((q) => "ABCDE".includes(q.answerLetter)),
  true
);
check(
  "dataset: four-option letters spread",
  ["A", "B", "C", "D"].every((letter) => Math.abs((letterSpread[letter] ?? 0) - 1172 / 4) < 1172 / 10),
  true
);

console.log("");
console.log(`option counts: ${JSON.stringify(QUESTIONS.reduce((acc, q) => {
  acc[q.options.length] = (acc[q.options.length] ?? 0) + 1;
  return acc;
}, {}))}`);
console.log(`letter spread: ${JSON.stringify(letterSpread)}`);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
