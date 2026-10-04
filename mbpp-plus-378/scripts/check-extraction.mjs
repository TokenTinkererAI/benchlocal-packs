#!/usr/bin/env node
/**
 * Extraction fixture suite for MBPP+-378 (run with: npm run check:extraction).
 *
 * Encodes the HumanEval-164 extractor's contract: fence stripping takes the
 * FIRST fenced block, leading whitespace is preserved (indentation is
 * semantic), and the body is cut at the first column-0 `if `/`print(` line
 * after line 0.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractCompletion } = require("../dist-cli/lib/extract.js");

const CASES = [
  {
    name: "plain fenced block",
    input: "```python\ndef add(a, b):\n    return a + b\n```",
    expect: "def add(a, b):\n    return a + b"
  },
  {
    name: "prose before and after the fence",
    input: "Sure! Here it is:\n\n```python\ndef add(a, b):\n    return a + b\n```\n\nHope that helps.",
    expect: "def add(a, b):\n    return a + b"
  },
  {
    name: "no fence keeps the raw reply",
    input: "def add(a, b):\n    return a + b",
    expect: "def add(a, b):\n    return a + b"
  },
  {
    name: "empty reply",
    input: "   \n",
    expect: ""
  },
  {
    name: "trailing top-level print is cut",
    input: "```python\ndef add(a, b):\n    return a + b\n\nprint(add(1, 2))\n```",
    expect: "def add(a, b):\n    return a + b"
  },
  {
    name: "indented print inside the body is kept",
    input: "```python\ndef add(a, b):\n    print(a)\n    return a + b\n```",
    expect: "def add(a, b):\n    print(a)\n    return a + b"
  },
  {
    name: "trailing def is inert and kept",
    input: "```python\ndef add(a, b):\n    return a + b\n\ndef helper():\n    return 1\n```",
    expect: "def add(a, b):\n    return a + b\n\ndef helper():\n    return 1"
  },
  {
    name: "CRLF is normalized",
    input: "```python\r\ndef add(a, b):\r\n    return a + b\r\n```\r\n",
    expect: "def add(a, b):\n    return a + b"
  },
  {
    name: "unterminated fence keeps the rest",
    input: "```python\ndef add(a, b):\n    return a + b",
    expect: "def add(a, b):\n    return a + b"
  }
];

let failures = 0;
for (const testCase of CASES) {
  const result = extractCompletion(testCase.input);
  const ok = result.completion === testCase.expect;
  if (!ok) {
    failures += 1;
    console.log(`[FAIL] ${testCase.name}`);
    console.log(`  expected: ${JSON.stringify(testCase.expect)}`);
    console.log(`  actual:   ${JSON.stringify(result.completion)}`);
  } else {
    console.log(`[ok ] ${testCase.name} (${result.notes.join("; ") || "as returned"})`);
  }
}

console.log("");
if (failures === 0) {
  console.log(`EXTRACTION OK: ${CASES.length}/${CASES.length} cases`);
} else {
  console.log(`EXTRACTION FAILED: ${failures}/${CASES.length} cases`);
  process.exitCode = 1;
}
