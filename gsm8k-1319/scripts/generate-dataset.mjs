/**
 * Generates lib/generated/problems.ts from data/gsm8k_test.jsonl
 * (GSM8K test set, MIT - see data/LICENSE-gsm8k).
 *
 * Deterministic: identical input -> identical output. The upstream reference
 * answers end with a '#### ' marker followed by the final number; the
 * generator parses that number (commas and '$' stripped; integral values
 * become integers), verifies the pinned source sha256 and exactly 1319 rows,
 * and emits the compiled problem module.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jsonlPath = path.join(root, "data", "gsm8k_test.jsonl");
const outDir = path.join(root, "lib", "generated");

const EXPECTED_SHA256 = "752adc99f23132275139f1f7be57126b08735a55daf0c56859ee6df70abafbac";
const EXPECTED_ROWS = 1319;

const raw = readFileSync(jsonlPath);
const sha256 = createHash("sha256").update(raw).digest("hex");
if (sha256 !== EXPECTED_SHA256) {
  throw new Error(`gsm8k_test.jsonl sha256 mismatch (drifted source?): ${sha256}`);
}

const text = raw.toString("utf8");
if (text.length > 0 && !text.endsWith("\n")) {
  throw new Error("gsm8k_test.jsonl must end with a newline");
}
const lines = text.split("\n").filter((line) => line.trim() !== "");
if (lines.length !== EXPECTED_ROWS) {
  throw new Error(`expected ${EXPECTED_ROWS} rows, got ${lines.length}`);
}

/** Same normalization rules as lib/extract.ts: strip '$' and commas, then Number(). */
function normalizeNumber(value) {
  const cleaned = value.replace(/[$,]/g, "").trim();
  if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(cleaned)) {
    return undefined;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

const MARKER_RE = /####\s*(?:\$\s*)?(-?\d[\d,]*(?:\.\d+)?|-?\.\d+)/g;

const stats = { comma: 0, negative: 0, decimal: 0 };
const problems = [];
lines.forEach((line, index) => {
  let row;
  try {
    row = JSON.parse(line);
  } catch (error) {
    throw new Error(`row ${index}: invalid JSON (${error.message})`);
  }
  if (typeof row.question !== "string" || row.question.trim() === "") {
    throw new Error(`row ${index}: missing question`);
  }
  if (typeof row.answer !== "string" || row.answer.trim() === "") {
    throw new Error(`row ${index}: missing answer`);
  }

  // The upstream reference answer carries exactly one '#### ' marker; use the
  // last one defensively and fail on anything unparseable.
  let markerText;
  for (const match of row.answer.matchAll(MARKER_RE)) {
    markerText = match[1];
  }
  if (markerText === undefined) {
    throw new Error(`row ${index}: no '#### ' marker in reference answer`);
  }
  if (markerText.includes(",")) {
    stats.comma += 1;
  }
  if (markerText.includes(".")) {
    stats.decimal += 1;
  }
  if (markerText.startsWith("-")) {
    stats.negative += 1;
  }
  const finalNumber = normalizeNumber(markerText);
  if (finalNumber === undefined) {
    throw new Error(`row ${index}: unparseable marker number "${markerText}"`);
  }

  problems.push({
    id: `GSM8K/${index}`,
    question: row.question,
    finalNumber
  });
});

const esc = (value) => JSON.stringify(value);
const num = (value) => {
  const literal = JSON.stringify(value);
  if (typeof literal !== "string") {
    throw new Error(`non-finite final number: ${value}`);
  }
  return literal;
};

const out = [];
out.push("// GENERATED FILE - do not edit.");
out.push("// Source: data/gsm8k_test.jsonl (GSM8K test set, MIT license, (c) 2021 OpenAI).");
out.push(`// Source sha256: ${sha256}`);
out.push(`// Rows: ${problems.length}. Gold answers: the number after the '#### ' marker of the upstream reference answer, normalized (commas/$ stripped).`);
out.push("");
out.push('import type { Gsm8kProblem } from "../types";');
out.push("");
out.push("export const PROBLEMS: readonly Gsm8kProblem[] = [");
for (const problem of problems) {
  out.push("  {");
  out.push(`    id: ${esc(problem.id)},`);
  out.push(`    question: ${esc(problem.question)},`);
  out.push(`    finalNumber: ${num(problem.finalNumber)}`);
  out.push("  },");
}
out.push("];");
out.push("");
out.push("export function getProblem(id: string): Gsm8kProblem | undefined {");
out.push("  return PROBLEMS.find((problem) => problem.id === id);");
out.push("}");
out.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), out.join("\n"), "utf8");

console.log(`generated ${problems.length} problems (source sha256 ${sha256.slice(0, 16)}...)`);
console.log(
  `  gold answers: comma-formatted ${stats.comma}, negative ${stats.negative}, decimal ${stats.decimal}, integer ${problems.length - stats.decimal}`
);
console.log("  lib/generated/problems.ts");
