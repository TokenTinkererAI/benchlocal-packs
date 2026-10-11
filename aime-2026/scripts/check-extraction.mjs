#!/usr/bin/env node
/**
 * Fixture checks for AIME-2026: integer extraction (all three layers),
 * normalization, prompt formatting, and dataset integrity. Runs against the
 * built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds cli first)
 */
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { extractFinalAnswer, normalizeNumber, isInRange } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_PROMPT } = require("../dist-cli/lib/prompts.js");
const { PROBLEMS, SOURCE_SHA256 } = require("../dist-cli/lib/generated/problems.js");

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
// 1. Extraction fixtures (all three layers, normalization, guards)
// ---------------------------------------------------------------------------

const fixtures = [
  // layer 1: the value inside \boxed{...} (last occurrence)
  ["Working through the sum carefully.\n\n\\boxed{70}", 70],
  ["\\boxed{12} was a guess, but the real value is \\boxed{70}", 70],
  ["Thus the requested value is \\boxed{023}.", 23],
  ["\\boxed{ 70 }", 70],
  ["\\boxed{0}", 0],
  ["\\boxed{1,234}", undefined],
  ["\\boxed{70} and \\boxed{3}", 3],
  // layer 2: 'Answer: N' / 'the answer is N' (last occurrence)
  ["The answer is 70.", 70],
  ["**Answer: 70**", 70],
  ["So the answer is 007", 7],
  ["The answer is 12, but on reflection the answer is 70", 70],
  ["Answer: 0", 0],
  ["Answer: 1000", undefined],
  ["the answer is 1,234", undefined],
  // layer 3: fallback - the last standalone integer in the response
  ["We compute 12, then 34, so I'll go with 588", 588],
  ["Thus the requested value is 42.", 42],
  ["1,234 is far too large, so 907 it is", 907],
  // never guesses
  ["I think 12.5 might be right", undefined],
  ["I'm not sure about this one.", undefined],
  ["", undefined]
];

for (const [text, expected] of fixtures) {
  const result = extractFinalAnswer(text);
  const label = `extract ${JSON.stringify(text.slice(0, 48))}${text.length > 48 ? "..." : ""}`;
  check(label, result.value, expected);
}

// value 0 must be distinguishable from "no answer found"
check("zero is a valid extracted answer", extractFinalAnswer("\\boxed{0}").value === 0, true);
check("missing answer is undefined, not 0", extractFinalAnswer("no integer here").value === undefined, true);

// ---------------------------------------------------------------------------
// 2. Normalization + range guard
// ---------------------------------------------------------------------------

check("normalize '023'", normalizeNumber("023"), 23);
check("normalize '1,234'", normalizeNumber("1,234"), 1234);
check("normalize '70'", normalizeNumber("70"), 70);
check("normalize '0'", normalizeNumber("0"), 0);
check("normalize '000'", normalizeNumber("000"), 0);
check("normalize '1,234,567'", normalizeNumber("1,234,567"), 1234567);
check("normalize rejects non-digits", normalizeNumber("seventy"), undefined);

check("range accepts 0", isInRange(0), true);
check("range accepts 999", isInRange(999), true);
check("range rejects 1000", isInRange(1000), false);

check(
  "notes flag an out-of-range candidate",
  extractFinalAnswer("\\boxed{1,234}").notes.some((note) => note.includes("outside 0-999")),
  true
);
check(
  "notes flag an empty response",
  extractFinalAnswer("").notes.some((note) => note.includes("empty response")),
  true
);

// ---------------------------------------------------------------------------
// 3. Prompt formatting
// ---------------------------------------------------------------------------

const problem = PROBLEMS[0];
const messages = buildMessages(problem);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
check("prompt: system text", messages[0].content, SYSTEM_PROMPT);
const user = messages[1].content;
check("prompt: contains answer format", user.includes("Answer: 123"), true);
check("prompt: contains integer range", user.includes("The answer is an integer from 0 to 999"), true);
check("prompt: contains problem text", user.includes(problem.problem), true);

// ---------------------------------------------------------------------------
// 4. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: 30 problems", PROBLEMS.length, 30);
check(
  "dataset: ids AIME/0..AIME/29 in order",
  PROBLEMS.every((item, index) => item.id === `AIME/${index}`),
  true
);
check(
  "dataset: every answer an integer 0-999",
  PROBLEMS.every((item) => Number.isInteger(item.answer) && item.answer >= 0 && item.answer <= 999),
  true
);
check("dataset: 30 distinct answers", new Set(PROBLEMS.map((item) => item.answer)).size, 30);
check(
  "dataset: contest counts",
  JSON.stringify(
    PROBLEMS.reduce((acc, item) => {
      acc[item.contest] = (acc[item.contest] ?? 0) + 1;
      return acc;
    }, {})
  ),
  JSON.stringify({ "AIME 2026 I": 15, "AIME 2026 II": 15 })
);
check(
  "dataset: numbering 1..15 within each contest",
  PROBLEMS.every((item, index) => item.number === (index % 15) + 1),
  true
);
check("dataset: non-empty problem text", PROBLEMS.every((item) => item.problem.trim().length > 0), true);

const sourceBytes = readFileSync(path.join(root, "data", "aime_2026.jsonl"));
check(
  "dataset: vendored file matches pinned sha256",
  createHash("sha256").update(sourceBytes).digest("hex"),
  SOURCE_SHA256
);

console.log("");
console.log(
  `answers: ${PROBLEMS.map((item) => item.answer).join(",")}`
);
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
