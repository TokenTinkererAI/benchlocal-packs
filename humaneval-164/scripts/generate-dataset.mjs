/**
 * Generates lib/generated/problems.ts and lib/generated/canonical.ts from
 * data/HumanEval.jsonl.gz (vendored from openai/human-eval, MIT license).
 *
 * Deterministic: same input file -> byte-identical output.
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const datasetPath = path.join(root, "data", "HumanEval.jsonl.gz");
const outDir = path.join(root, "lib", "generated");

const gz = readFileSync(datasetPath);
const sha256 = createHash("sha256").update(gz).digest("hex");
const raw = gunzipSync(gz).toString("utf8");

const problems = raw
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => JSON.parse(line));

if (problems.length !== 164) {
  throw new Error(`expected 164 problems, got ${problems.length}`);
}

for (const [index, problem] of problems.entries()) {
  for (const field of ["task_id", "prompt", "entry_point", "canonical_solution", "test"]) {
    if (typeof problem[field] !== "string") {
      throw new Error(`problem ${index}: missing string field ${field}`);
    }
  }
  const expected = `HumanEval/${index}`;
  if (problem.task_id !== expected) {
    throw new Error(`problem ${index}: expected task_id ${expected}, got ${problem.task_id}`);
  }
}

mkdirSync(outDir, { recursive: true });

const esc = (value) => JSON.stringify(value);
const header = (summary) =>
  `// GENERATED FILE - do not edit.\n// Source: data/HumanEval.jsonl.gz (openai/human-eval, MIT license).\n// Dataset sha256: ${sha256}\n// ${summary}\n`;

const problemsTs = [header("The 164 canonical HumanEval problems (prompt + test).")];
problemsTs.push(`import type { HumanEvalProblem } from "../types";\n`);
problemsTs.push(`export const PROBLEMS: readonly HumanEvalProblem[] = [`);
for (const [index, problem] of problems.entries()) {
  problemsTs.push(`  {`);
  problemsTs.push(`    id: ${esc(problem.task_id)},`);
  problemsTs.push(`    number: ${index},`);
  problemsTs.push(`    entryPoint: ${esc(problem.entry_point)},`);
  problemsTs.push(`    prompt: ${esc(problem.prompt)},`);
  problemsTs.push(`    test: ${esc(problem.test)}`);
  problemsTs.push(`  },`);
}
problemsTs.push(`];\n`);
problemsTs.push(`export function getProblem(id: string): HumanEvalProblem | undefined {`);
problemsTs.push(`  return PROBLEMS.find((problem) => problem.id === id);`);
problemsTs.push(`}\n`);

const canonicalTs = [header("Canonical solutions (self-test and mock fixtures only).")];
canonicalTs.push(`export const CANONICAL_SOLUTIONS: Readonly<Record<string, string>> = {`);
for (const problem of problems) {
  canonicalTs.push(`  ${esc(problem.task_id)}: ${esc(problem.canonical_solution)},`);
}
canonicalTs.push(`};\n`);

writeFileSync(path.join(outDir, "problems.ts"), problemsTs.join("\n"), "utf8");
writeFileSync(path.join(outDir, "canonical.ts"), canonicalTs.join("\n"), "utf8");

console.log(`generated 164 problems (dataset sha256 ${sha256.slice(0, 16)}...)`);
console.log(`  lib/generated/problems.ts`);
console.log(`  lib/generated/canonical.ts`);
