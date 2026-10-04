#!/usr/bin/env node
/**
 * Fixture checks for GSM8K-1319: numeric answer extraction (every layer),
 * prompt formatting, and dataset integrity. Runs against the built dist-cli
 * output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractFinalNumber } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_PROMPT } = require("../dist-cli/lib/prompts.js");
const { PROBLEMS } = require("../dist-cli/lib/generated/problems.js");

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
// 1. Extraction fixtures — every layer, plus unparseable and empty replies
// ---------------------------------------------------------------------------

const fixtures = [
  // layer 1: the '#### ' marker (last occurrence wins)
  ["Let me work through this.\n\n#### 72", 72],
  ["#### 1,234", 1234],
  ["The change is negative.\n\n#### -17", -17],
  ["#### 12,345.75", 12345.75],
  ["First estimate: #### 3\n\nRefined:\n\n#### 5", 5],
  // documented layer order: the marker layer wins over a later 'Answer:' line
  ["Early estimate #### 9.\n\nAnswer: 12", 9],
  // layer 2: 'Answer: <number>' / 'answer is <number>' phrases
  ["Let me solve this step by step.\n\nAnswer: 42", 42],
  ["**Answer: 18**", 18],
  ["Answer: $1,000", 1000],
  ["Answer: 1,234", 1234],
  ["So the answer must be 0.75", 0.75],
  ["The answer is -5.", -5],
  // layer 3: fallback — last number anywhere in the response
  ["Step 1: 5 + 3 = 8.\nStep 2: 8 * 2 = 16.\n\n16", 16],
  ["I think the total is 12.5 dollars.", 12.5],
  ["The final tally: 7 + 5 = 12 apples.", 12],
  // numeric normalization: '42.0' matches gold 42
  ["#### 42.0", 42],
  // unparseable / empty
  ["I cannot determine the answer from the information given.", undefined],
  ["The answer is seven.", undefined],
  ["", undefined]
];

for (const [text, expected] of fixtures) {
  const result = extractFinalNumber(text);
  const label = `extract ${JSON.stringify(text.slice(0, 48))}${text.length > 48 ? "..." : ""}`;
  check(label, result.value, expected);
}

// ---------------------------------------------------------------------------
// 2. Prompt formatting
// ---------------------------------------------------------------------------

const problem = PROBLEMS[0];
const messages = buildMessages(problem);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check("prompt: contains the Answer: <number> instruction", user.includes("Answer: <number>"), true);
check("prompt: contains problem text", user.includes(problem.question), true);
check(
  "prompt: final-answer instruction comes last",
  user.indexOf(problem.question) < user.lastIndexOf("Answer: <number>"),
  true
);
check(
  "prompt: user message ends with the final-answer instruction",
  user.trimEnd().endsWith("Write nothing after that final line."),
  true
);

// ---------------------------------------------------------------------------
// 3. Dataset integrity
// ---------------------------------------------------------------------------

const SOURCE_SHA256 = "752adc99f23132275139f1f7be57126b08735a55daf0c56859ee6df70abafbac";
const sourceBytes = readFileSync(new URL("../data/gsm8k_test.jsonl", import.meta.url));
check("dataset: source sha256 pinned", createHash("sha256").update(sourceBytes).digest("hex"), SOURCE_SHA256);
check("dataset: 1319 problems", PROBLEMS.length, 1319);
check(
  "dataset: sequential GSM8K/<index> ids",
  PROBLEMS.every((entry, index) => entry.id === `GSM8K/${index}`),
  true
);
check(
  "dataset: every question non-empty",
  PROBLEMS.every((entry) => typeof entry.question === "string" && entry.question.trim().length > 0),
  true
);
check(
  "dataset: every finalNumber finite",
  PROBLEMS.every((entry) => typeof entry.finalNumber === "number" && Number.isFinite(entry.finalNumber)),
  true
);
check(
  "dataset: all gold answers integral",
  PROBLEMS.every((entry) => Number.isInteger(entry.finalNumber)),
  true
);
check("dataset: spot GSM8K/0 = 18 (Janet's ducks)", PROBLEMS[0].finalNumber, 18);
check("dataset: spot GSM8K/146 = 2125 (comma source)", PROBLEMS[146].finalNumber, 2125);
check("dataset: spot GSM8K/489 = -10 (negative source)", PROBLEMS[489].finalNumber, -10);
check("dataset: spot GSM8K/611 = 1450000 (comma source)", PROBLEMS[611].finalNumber, 1450000);
check("dataset: spot GSM8K/1113 = -3 (negative source)", PROBLEMS[1113].finalNumber, -3);

console.log("");
console.log(
  `gold answers: ${PROBLEMS.filter((entry) => entry.finalNumber < 0).length} negative, ` +
    `${PROBLEMS.filter((entry) => entry.finalNumber >= 1000).length} >= 1000`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
