#!/usr/bin/env node
/**
 * Fixture checks for LiveCodeBench-v6: official extraction rule, official
 * prompt template, and manifest integrity. Runs against built dist-cli output.
 *
 * Usage: npm run check:extraction
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractCode } = require("../dist-cli/lib/extract.js");
const { buildMessages, SYSTEM_MESSAGE, FORMATTING_MESSAGE_WITH_STARTER_CODE } = require("../dist-cli/lib/prompts.js");
const { loadManifest } = require("../dist-cli/lib/dataset.js");

let failures = 0;
let checks = 0;

function check(name, actual, expected) {
  checks += 1;
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

// ---------------------------------------------------------------------------
// 1. Extraction fixtures (official rule: content between the LAST two fence lines)
// ---------------------------------------------------------------------------

const fixtures = [
  ["```python\nprint(1)\n```", "print(1)"],
  ["Here you go:\n```python\nprint(1)\n```\nDone.", "print(1)"],
  ["```python\nfirst = 1\n```\nprose\n```python\nprint(2)\n```", "print(2)"],
  ["```python\ndef f():\n    return 1\n\nprint(f())\n```", "def f():\n    return 1\n\nprint(f())"],
  ["no fences here at all", ""],
  ["only one ``` fence line", ""],
  ["", ""],
  ["```\nprint(3)\n```", "print(3)"],
  ["```python\nprint(4)\r\n```", "print(4)"],
  ["```python\n```", ""],
  ["```python\nx = '```'\nprint(x)\n```", "print(x)"],
  ["analysis...\n```python\nprint(5)\n```\nmore prose\n```\nprint(6)\n```", "print(6)"]
];

for (const [text, expected] of fixtures) {
  const result = extractCode(text);
  check(`extract ${JSON.stringify(text.slice(0, 46))}${text.length > 46 ? "..." : ""}`, result.code, expected);
}

// ---------------------------------------------------------------------------
// 2. Prompt template (official OpenAIChat template)
// ---------------------------------------------------------------------------

const stdinMessages = buildMessages({ question_content: "Test question body", starter_code: "" });
check("prompt: two messages", stdinMessages.length, 2);
check("prompt: system", stdinMessages[0].content, SYSTEM_MESSAGE);
const stdinUser = stdinMessages[1].content;
check("prompt: question hdr", stdinUser.includes("### Question:\nTest question body\n\n"), true);
check("prompt: stdin format", stdinUser.includes("Read the inputs from stdin"), true);
check("prompt: YOUR CODE HERE", stdinUser.includes("```python\n# YOUR CODE HERE\n```"), true);
check("prompt: answer suffix", stdinUser.endsWith("### Answer: (use the provided format with backticks)\n\n"), true);

const starterMessages = buildMessages({ question_content: "Q2", starter_code: "class Solution:\n    pass" });
const starterUser = starterMessages[1].content;
check("prompt: starter format msg", starterUser.includes(FORMATTING_MESSAGE_WITH_STARTER_CODE), true);
check("prompt: starter block", starterUser.includes("```python\nclass Solution:\n    pass\n```"), true);

// ---------------------------------------------------------------------------
// 3. Manifest integrity
// ---------------------------------------------------------------------------

const manifest = loadManifest();
check("manifest: release", manifest.release, "release_v6");
check("manifest: count", manifest.count, 1055);
check("manifest: sources", manifest.sources.length, 6);
check(
  "manifest: source shas",
  manifest.sources.every((source) => /^[0-9a-f]{64}$/.test(source.sha256)),
  true
);
check("manifest: problems length", manifest.problems.length, 1055);
check("manifest: unique ids", new Set(manifest.problems.map((p) => p.id)).size, 1055);
check(
  "manifest: platforms",
  JSON.stringify([...new Set(manifest.problems.map((p) => p.platform))].sort()),
  JSON.stringify(["atcoder", "codeforces", "leetcode"])
);
check(
  "manifest: call-based count",
  manifest.problems.filter((p) => p.fnName).length,
  444
);

console.log("");
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
