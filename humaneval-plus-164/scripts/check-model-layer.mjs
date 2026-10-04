#!/usr/bin/env node
/**
 * Verifies the model layer of the HumanEval+-164 pack: completion extraction
 * (8 fixtures) and prompt construction. Requires the CLI build:
 *
 *   npm run build:cli
 *   node scripts/check-model-layer.mjs
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { extractCompletion } = require(path.join(REPO_ROOT, "dist-cli", "lib", "extract.js"));
const { buildMessages } = require(path.join(REPO_ROOT, "dist-cli", "lib", "prompts.js"));

const EXPECTED_SYSTEM_PROMPT =
  "You are an expert Python programmer completing coding benchmark tasks. Reply with raw Python code only. Do not include markdown fences, explanations, tests, or example calls.";

const FENCE = "stripped markdown fence";
const TRUNCATED = "truncated at top-level statement";
const EMPTY = "empty completion";

const manifest = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "manifest.json"), "utf8"));
const problem = manifest.problems.find((entry) => entry.id === "HumanEval/0");
if (!problem) {
  console.error("check-model-layer: HumanEval/0 is missing from data/manifest.json.");
  process.exit(1);
}

const fixtures = [
  { name: "bare continuation", input: "    return 1", expected: "    return 1", notes: [] },
  { name: "fenced block", input: "```python\n    return 2\n```", expected: "    return 2", notes: [FENCE] },
  {
    name: "prose plus fenced block",
    input: "Here you go:\n\n```python\n    return 3\n```\nHope this helps!",
    expected: "    return 3",
    notes: [FENCE]
  },
  {
    name: "full prompt echo",
    input: problem.prompt + "    return False",
    expected: problem.prompt + "    return False",
    notes: []
  },
  {
    name: "trailing top-level print",
    input: "    return 4\n\nprint('done')",
    expected: "    return 4",
    notes: [TRUNCATED]
  },
  {
    name: "trailing def is inert",
    input: "    return 5\n\ndef helper():\n    pass",
    expected: "    return 5\n\ndef helper():\n    pass",
    notes: []
  },
  {
    name: "trailing main guard",
    input: '    return 6\n\nif __name__ == "__main__":\n    pass',
    expected: "    return 6",
    notes: [TRUNCATED]
  },
  { name: "whitespace only", input: "   \n", expected: "", notes: [EMPTY] }
];

let failures = 0;

fixtures.forEach((fixture, index) => {
  const result = extractCompletion(fixture.input, problem);
  const completionOk = result.completion === fixture.expected;
  const notesOk =
    Array.isArray(result.notes) &&
    result.notes.length === fixture.notes.length &&
    result.notes.every((note, noteIndex) => note === fixture.notes[noteIndex]);
  if (!completionOk || !notesOk) {
    failures += 1;
    console.error(`fixture ${index + 1} (${fixture.name}) FAILED`);
    console.error(`  expected completion: ${JSON.stringify(fixture.expected)}`);
    console.error(`  actual completion:   ${JSON.stringify(result.completion)}`);
    console.error(`  expected notes:      ${JSON.stringify(fixture.notes)}`);
    console.error(`  actual notes:        ${JSON.stringify(result.notes)}`);
  }
});

{
  const messages = buildMessages(problem);
  const expectedUserContent = `Complete the following Python function so that its behavior is fully implemented:\n\n${problem.prompt}`;
  const messagesOk =
    Array.isArray(messages) &&
    messages.length === 2 &&
    messages[0]?.role === "system" &&
    messages[0]?.content === EXPECTED_SYSTEM_PROMPT &&
    messages[1]?.role === "user" &&
    messages[1]?.content === expectedUserContent;
  if (!messagesOk) {
    failures += 1;
    console.error("buildMessages check FAILED");
    console.error(`  actual messages: ${JSON.stringify(messages)}`);
  }
}

if (failures > 0) {
  console.error(`MODEL LAYER FAIL (${failures} failing fixture${failures === 1 ? "" : "s"})`);
  process.exit(1);
}
console.log("MODEL LAYER PASS (8 fixtures)");
process.exit(0);
