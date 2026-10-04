#!/usr/bin/env node
/**
 * Fixture checks for MATH-500: boxed/phrase/final-line extraction (every
 * layer), textual normalization, prompt formatting, and dataset integrity.
 * Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { extractFinalAnswer } = require("../dist-cli/lib/extract.js");
const { stripString, answersMatch } = require("../dist-cli/lib/normalize.js");
const { buildMessages, SYSTEM_PROMPT, ANSWER_INSTRUCTION } = require("../dist-cli/lib/prompts.js");
const { PROBLEMS, SOURCE_SHA256 } = require("../dist-cli/lib/generated/problems.js");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let failures = 0;
let checks = 0;

function check(name, actual, expected) {
  checks += 1;
  const ok = Object.is(actual, expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

// ---------------------------------------------------------------------------
// 1. Extraction fixtures — every layer, guards, empty and unparseable replies
// ---------------------------------------------------------------------------

const fixtures = [
  // layer 1: the content of \boxed{...} (last balanced group)
  ["Let me reason about this.\n\nTherefore the value is \\boxed{42}", "42"],
  ["\\boxed{\\frac{14}{3}}", "\\frac{14}{3}"],
  ["A first guess is \\boxed{3}, but the real value is \\boxed{\\frac{14}{3}}", "\\frac{14}{3}"],
  ["Thus \\boxed{ \\text{Evelyn} }", "\\text{Evelyn}"],
  ["\\boxed{3\\sqrt{13}}", "3\\sqrt{13}"],
  // layer 2: 'Answer: X' / 'the answer is X' (last usable match wins)
  ["Step by step...\n\nAnswer: 27.", "27"],
  ["So the answer is 42.", "42"],
  ["**Answer: 42**", "42"],
  ["Answer: 12, but on reflection the answer is 70", "70"],
  ["The answer is \\frac{11}{2}.", "\\frac{11}{2}"],
  ["Answer: (6,31,-1)", "(6,31,-1)"],
  // layer 3: fallback — the last non-empty line, trailing punctuation stripped
  ["We computed several intermediate values.\n\n7", "7"],
  ["Intermediate values noted.\n\n42.", "42"],
  ["Several steps later.\n\n\\left( 3, \\frac{\\pi}{2} \\right)", "\\left( 3, \\frac{\\pi}{2} \\right)"],
  ["The reasoning is long.\n\neast", "east"],
  // never guesses: no candidate in these replies
  ["\\boxed{}", undefined],
  ["I started with \\boxed{ but never closed it.", undefined],
  ["Let me think.\n\nI cannot determine the answer from the information given.", undefined],
  ["I am not sure about this one.", undefined],
  ["", undefined]
];

for (const [text, expected] of fixtures) {
  const result = extractFinalAnswer(text);
  const label = `extract ${JSON.stringify(text.slice(0, 46))}${text.length > 46 ? "..." : ""}`;
  check(label, result.candidate, expected);
}

// "no candidate" must be distinguishable from a legitimately empty string
check("zero is a valid extracted answer", extractFinalAnswer("\\boxed{0}").candidate, "0");
check("no candidate is undefined, not \"\"", extractFinalAnswer("no candidate here").candidate, undefined);

// ---------------------------------------------------------------------------
// 2. Normalization — predictions and gold answers must meet in canonical form
// ---------------------------------------------------------------------------

const equalPairs = [
  ["$1,024$", "1024"],
  ["\\dfrac{1}{2}", "\\frac{1}{2}"],
  ["\\tfrac{1}{2}", "\\frac{1}{2}"],
  ["42\\text{ cm}", "42"],
  ["\\text{east}", "east"],
  ["18.0", "18"],
  ["a + b", "a+b"],
  ["$\\left( 3, \\frac{\\pi}{2} \\right)$", "(3,\\frac{\\pi}{2})"],
  ["90^\\circ", "90"],
  ["50\\%", "50"],
  ["x = 5", "5"],
  ["\\frac12", "\\frac{1}{2}"],
  ["\\sqrt3", "\\sqrt{3}"],
  ["10,\\!080", "10080"],
  ["42.", "42"],
  ["p - q", "p-q"]
];

for (const [prediction, gold] of equalPairs) {
  check(`match ${JSON.stringify(prediction)} == ${JSON.stringify(gold)}`, answersMatch(prediction, gold), true);
}

const unequalPairs = [
  ["0.5", "\\frac{1}{2}"],
  ["one half", "\\frac{1}{2}"],
  ["\\frac{14}{3}", "14/3"],
  ["43", "42"],
  ["", "42"]
];

for (const [prediction, gold] of unequalPairs) {
  check(`differ ${JSON.stringify(prediction)} != ${JSON.stringify(gold)}`, answersMatch(prediction, gold), false);
}

check("stripString removes whitespace ('a + b' -> 'a+b')", stripString("a + b"), "a+b");
check("stripString strips a trailing '.0'", stripString("18.0"), "18");

// ---------------------------------------------------------------------------
// 3. Prompt formatting
// ---------------------------------------------------------------------------

const problem = PROBLEMS[0];
const messages = buildMessages(problem);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check("prompt: contains the \\boxed{answer} instruction", user.includes("\\boxed{answer}"), true);
check("prompt: contains problem text", user.includes(problem.problem), true);
check(
  "prompt: user message ends with the problem text",
  user.trimEnd().endsWith(problem.problem),
  true
);
check(
  "prompt: answer instruction precedes the problem block",
  user.indexOf(ANSWER_INSTRUCTION) === 0 && user.indexOf(problem.problem) > user.indexOf("Problem:"),
  true
);

// ---------------------------------------------------------------------------
// 4. Dataset integrity
// ---------------------------------------------------------------------------

const sourceBytes = readFileSync(path.join(root, "data", "math_500.jsonl"));
check(
  "dataset: vendored file matches pinned sha256",
  createHash("sha256").update(sourceBytes).digest("hex"),
  SOURCE_SHA256
);
check("dataset: 500 problems", PROBLEMS.length, 500);
check(
  "dataset: sequential MATH/<index> ids",
  PROBLEMS.every((entry, index) => entry.id === `MATH/${index}`),
  true
);
check(
  "dataset: every problem non-empty",
  PROBLEMS.every((entry) => typeof entry.problem === "string" && entry.problem.trim().length > 0),
  true
);
check(
  "dataset: every gold answer non-empty",
  PROBLEMS.every((entry) => typeof entry.answer === "string" && entry.answer.trim().length > 0),
  true
);
check(
  "dataset: every level an integer 1-5",
  PROBLEMS.every((entry) => Number.isInteger(entry.level) && entry.level >= 1 && entry.level <= 5),
  true
);

const SUBJECT_ORDER = [
  "Algebra",
  "Counting & Probability",
  "Geometry",
  "Intermediate Algebra",
  "Number Theory",
  "Prealgebra",
  "Precalculus"
];
const subjectCounts = PROBLEMS.reduce((acc, entry) => {
  acc[entry.subject] = (acc[entry.subject] ?? 0) + 1;
  return acc;
}, {});
check(
  "dataset: subjects and counts",
  JSON.stringify(SUBJECT_ORDER.map((subject) => [subject, subjectCounts[subject]])),
  JSON.stringify([
    ["Algebra", 124],
    ["Counting & Probability", 38],
    ["Geometry", 41],
    ["Intermediate Algebra", 97],
    ["Number Theory", 62],
    ["Prealgebra", 82],
    ["Precalculus", 56]
  ])
);
check("dataset: spot MATH/0 = polar coordinates", PROBLEMS[0].answer, "\\left( 3, \\frac{\\pi}{2} \\right)");
check("dataset: spot MATH/1 = p - q", PROBLEMS[1].answer, "p - q");
check("dataset: spot MATH/2 = \\frac{14}{3}", PROBLEMS[2].answer, "\\frac{14}{3}");
check("dataset: spot MATH/4 = \\text{Evelyn}", PROBLEMS[4].answer, "\\text{Evelyn}");
check("dataset: spot MATH/7 = 90^\\circ", PROBLEMS[7].answer, "90^\\circ");
check("dataset: spot MATH/8 = 3\\sqrt{13}", PROBLEMS[8].answer, "3\\sqrt{13}");

// The gold answers must survive the pack's own normalizer (never empty).
check(
  "dataset: every gold answer normalizes to a non-empty string",
  PROBLEMS.every((entry) => stripString(entry.answer) !== ""),
  true
);

console.log("");
console.log(
  `gold answers: ${PROBLEMS.filter((entry) => /\d/.test(entry.answer)).length} contain a digit, ` +
    `${PROBLEMS.filter((entry) => entry.answer.includes("\\text{")).length} \\text{..., ` +
    `${PROBLEMS.filter((entry) => entry.answer.includes("\\frac")).length} \\frac`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
