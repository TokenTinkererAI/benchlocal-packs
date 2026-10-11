#!/usr/bin/env node
/**
 * Fixture checks for HMMT-Feb-2026: boxed/phrase/final-line extraction (every
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
const { PROBLEMS, SOURCE_SHA256, SOURCE_REVISION, PARQUET_SHA256 } = require("../dist-cli/lib/generated/problems.js");

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
  ["\\boxed{\\frac{1}{21}}", "\\frac{1}{21}"],
  ["\\boxed{-\\frac{1}{21}}", "-\\frac{1}{21}"],
  ["\\boxed{5\\sqrt{5}}", "5\\sqrt{5}"],
  ["\\boxed{74^\\circ}", "74^\\circ"],
  ["\\boxed{3^{2025}}", "3^{2025}"],
  ["A first guess is \\boxed{3}, but the real value is \\boxed{\\frac{7}{2}}", "\\frac{7}{2}"],
  ["\\boxed{ \\text{Evelyn} }", "\\text{Evelyn}"],
  // layer 2: 'Answer: X' / 'the answer is X' (last usable match wins)
  ["Step by step...\n\nAnswer: 420261", "420261"],
  ["So the answer is 420261.", "420261"],
  ["**Answer: 420261**", "420261"],
  ["Answer: 12, but on reflection the answer is 70", "70"],
  ["The answer is \\frac{875}{128}.", "\\frac{875}{128}"],
  // layer 3: fallback — the last non-empty line, trailing punctuation stripped
  ["We computed several intermediate values.\n\n1574", "1574"],
  ["Intermediate values noted.\n\n6992.", "6992"],
  ["Several steps later.\n\n\\sqrt{17} - 1", "\\sqrt{17} - 1"],
  ["The reasoning is long.\n\n2 - \\frac{\\pi}{2}", "2 - \\frac{\\pi}{2}"],
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
  ["74^\\circ", "74"],
  ["50\\%", "50"],
  ["x = 5", "5"],
  ["\\frac12", "\\frac{1}{2}"],
  ["\\sqrt3", "\\sqrt{3}"],
  ["10,\\!080", "10080"],
  ["42.", "42"],
  ["\\frac{7}{3}\\sqrt{3}", "\\frac{7}{3}\\sqrt{3}"]
];

for (const [prediction, gold] of equalPairs) {
  check(`match ${JSON.stringify(prediction)} == ${JSON.stringify(gold)}`, answersMatch(prediction, gold), true);
}

const unequalPairs = [
  ["0.5", "\\frac{1}{2}"],
  ["one half", "\\frac{1}{2}"],
  ["\\frac{14}{3}", "14/3"],
  ["43", "42"],
  ["\\frac{1}{20}", "-\\frac{1}{21}"],
  ["", "42"]
];

for (const [prediction, gold] of unequalPairs) {
  check(`differ ${JSON.stringify(prediction)} != ${JSON.stringify(gold)}`, answersMatch(prediction, gold), false);
}

check("stripString removes whitespace ('a + b' -> 'a+b')", stripString("a + b"), "a+b");
check("stripString strips a trailing '.0'", stripString("18.0"), "18");
check("stripString drops a degree annotation", stripString("74^\\circ"), "74");

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

const sourceBytes = readFileSync(path.join(root, "data", "hmmt_feb_2026.jsonl"));
check(
  "dataset: vendored file matches pinned sha256",
  createHash("sha256").update(sourceBytes).digest("hex"),
  SOURCE_SHA256
);
check("dataset: 33 problems", PROBLEMS.length, 33);
check(
  "dataset: sequential HMMT/<index> ids",
  PROBLEMS.every((entry, index) => entry.id === `HMMT/${index}`),
  true
);
check(
  "dataset: problem number equals index+1",
  PROBLEMS.every((entry, index) => entry.number === index + 1),
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
  "dataset: every problem has at least one known type",
  PROBLEMS.every(
    (entry) =>
      Array.isArray(entry.types) &&
      entry.types.length > 0 &&
      entry.types.every((type) => ["Algebra", "Number Theory", "Combinatorics", "Geometry"].includes(type))
  ),
  true
);
check("dataset: source revision pinned", SOURCE_REVISION, "02fba4f74d8e68e73e66a02d540fd979c05c274c");
check(
  "dataset: parquet sha256 pinned",
  PARQUET_SHA256,
  "e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916"
);

const KNOWN_TYPES = ["Algebra", "Number Theory", "Combinatorics", "Geometry"];
const typeCounts = PROBLEMS.reduce((acc, entry) => {
  for (const type of entry.types) {
    acc[type] = (acc[type] ?? 0) + 1;
  }
  return acc;
}, {});
check(
  "dataset: problem_type distribution (multi-label)",
  JSON.stringify(KNOWN_TYPES.map((type) => [type, typeCounts[type]])),
  JSON.stringify([
    ["Algebra", 5],
    ["Number Theory", 8],
    ["Combinatorics", 12],
    ["Geometry", 12]
  ])
);
check("dataset: spot HMMT/0 = -1/21", PROBLEMS[0].answer, "-\\frac{1}{21}");
check("dataset: spot HMMT/10 = 2/5", PROBLEMS[10].answer, "\\frac{2}{5}");
check("dataset: spot HMMT/20 = 18", PROBLEMS[20].answer, "18");
check("dataset: spot HMMT/26 = 74^\\circ", PROBLEMS[26].answer, "74^\\circ");
check("dataset: spot HMMT/29 = sqrt(1740)/3", PROBLEMS[29].answer, "\\frac{\\sqrt{1740}}{3}");
check("dataset: spot HMMT/30 = 3^{2025}", PROBLEMS[30].answer, "3^{2025}");

// The gold answers must survive the pack's own normalizer (never empty).
check(
  "dataset: every gold answer normalizes to a non-empty string",
  PROBLEMS.every((entry) => stripString(entry.answer) !== ""),
  true
);
check(
  "dataset: gold answers are pairwise distinct",
  new Set(PROBLEMS.map((entry) => stripString(entry.answer))).size,
  33
);

console.log("");
console.log(
  `gold answers: ${PROBLEMS.filter((entry) => /^-?\\?\d+$/.test(stripString(entry.answer))).length} integer-valued, ` +
    `${PROBLEMS.filter((entry) => entry.answer.includes("\\frac")).length} contain \\frac, ` +
    `${PROBLEMS.filter((entry) => entry.answer.includes("\\sqrt")).length} contain \\sqrt`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
