/**
 * Generates the vendored data file and the pack's problem module for AIME-2026:
 *
 *   data/aime_2026.raw.json  (pinned source export)  ->  data/aime_2026.jsonl
 *                                                         lib/generated/problems.ts
 *
 * `data/aime_2026.raw.json` is a faithful export of the 30-row Hugging Face
 * table `MathArena/aime_2026` (revision d2de22f3c656b4f56cf8981212186377d1e23bc3,
 * file data/train-00000-of-00001.parquet): each record carries the verbatim
 * `problem` string, the published integer `answer`, and the upstream
 * `problem_idx`. See data/LICENSE-aime for provenance and terms.
 *
 * This script re-derives `data/aime_2026.jsonl` from the raw export (adding the
 * `contest`/`number` provenance fields derived from `problem_idx`) and then
 * emits `lib/generated/problems.ts`. Both the raw export and the derived file
 * are hash-pinned, and the derivation is deterministic: re-running the script
 * reproduces both files byte-for-byte. A drifted file fails the build instead
 * of silently changing the benchmark.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Pack configuration
// ---------------------------------------------------------------------------
const PACK_NAME = "AIME-2026";
const RAW_FILE = "aime_2026.raw.json";
const DATA_FILE = "aime_2026.jsonl";
const SOURCE_REVISION = "d2de22f3c656b4f56cf8981212186377d1e23bc3";

// sha256 of the vendored raw export (data/aime_2026.raw.json).
const EXPECTED_RAW_SHA256 = "7975041d4ce0c646944ab923ca7fc361f7711677d0ab06128da539a62a9b59ed";
// sha256 of the derived data file (data/aime_2026.jsonl).
const EXPECTED_DATA_SHA256 = "af993e0891a821c9afcfae1493713dc004b79fbd433f6c77e570f8670ba56f8a";
const EXPECTED_RECORDS = 30;
const EXPECTED_CONTEST_I = "AIME 2026 I";
const EXPECTED_CONTEST_II = "AIME 2026 II";

// ---------------------------------------------------------------------------
// Documented corrections to the upstream table
// ---------------------------------------------------------------------------
// The upstream MathArena/aime_2026 table lists 850 for AIME 2026 II Problem 10
// (problem_idx 25). The official contest answer keys give 340:
//   - Art of Problem Solving, "2026 AIME II Answer Key"
//     https://artofproblemsolving.com/wiki/index.php?title=2026_AIME_II_Answer_Key
//   - LIVE by Po-Shen Loh, 2026 AIME II answer key
//     https://live.poshenloh.com/images/past-contests/pdf/aime-2026II-answers.pdf
// The independent mirror thulthula/AIME2026 also carries 340 for this problem.
// Corrections are applied AFTER validation, asserted against the upstream value
// (so a future upstream fix fails loudly instead of double-correcting), and are
// recorded in NOTICE + METHODOLOGY. The raw export stays verbatim.
const CORRECTIONS = [
  {
    problemIdx: 25,
    upstreamAnswer: 850,
    correctedAnswer: 340,
    reason: "official 2026 AIME II answer key (AoPS; Po-Shen Loh LIVE) gives 340"
  }
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rawPath = path.join(root, "data", RAW_FILE);
const dataPath = path.join(root, "data", DATA_FILE);
const outDir = path.join(root, "lib", "generated");

const sha256 = (text) => createHash("sha256").update(text, "utf8").digest("hex");

// ---------------------------------------------------------------------------
// 1. Verify the raw source export
// ---------------------------------------------------------------------------
const rawText = readFileSync(rawPath, "utf8");
const rawSha = sha256(rawText);
if (rawSha !== EXPECTED_RAW_SHA256) {
  throw new Error(`${RAW_FILE} sha256 mismatch (drifted source?): ${rawSha}`);
}

const records = JSON.parse(rawText);
if (!Array.isArray(records) || records.length !== EXPECTED_RECORDS) {
  throw new Error(`expected ${EXPECTED_RECORDS} records in ${RAW_FILE}, got ${records?.length}`);
}

// ---------------------------------------------------------------------------
// 2. Derive the vendored data file (data/aime_2026.jsonl) deterministically
// ---------------------------------------------------------------------------
const problems = [];
records.forEach((record, index) => {
  const problemIdx = record.problem_idx;
  if (problemIdx !== index + 1) {
    throw new Error(`record ${index}: problem_idx ${problemIdx} is out of sequence`);
  }
  const contest = index < 15 ? EXPECTED_CONTEST_I : EXPECTED_CONTEST_II;
  const number = index < 15 ? index + 1 : index - 15 + 1;
  const problem = String(record.problem ?? "").replace(/\r\n/g, "\n").trim();
  if (!problem) {
    throw new Error(`record ${index}: empty problem text`);
  }
  const answer = record.answer;
  if (!Number.isInteger(answer) || answer < 0 || answer > 999) {
    throw new Error(`record ${index}: answer ${JSON.stringify(answer)} is not an integer in 0-999`);
  }
  problems.push({ id: `AIME/${index}`, problemIdx, contest, number, problem, answer });
});

// ---------------------------------------------------------------------------
// 2b. Apply documented corrections (see CORRECTIONS above)
// ---------------------------------------------------------------------------
for (const correction of CORRECTIONS) {
  const target = problems.find((problem) => problem.problemIdx === correction.problemIdx);
  if (!target) {
    throw new Error(`correction target problem_idx ${correction.problemIdx} not found`);
  }
  if (target.answer !== correction.upstreamAnswer) {
    throw new Error(
      `correction for problem_idx ${correction.problemIdx} expected upstream answer ` +
        `${correction.upstreamAnswer}, found ${target.answer} - upstream table changed, review CORRECTIONS`
    );
  }
  target.answer = correction.correctedAnswer;
  console.log(
    `applied correction: problem_idx ${correction.problemIdx} ` +
      `${correction.upstreamAnswer} -> ${correction.correctedAnswer} (${correction.reason})`
  );
}

const uniqueAnswers = new Set(problems.map((problem) => problem.answer));
if (uniqueAnswers.size !== problems.length) {
  throw new Error(`expected ${problems.length} distinct gold answers, got ${uniqueAnswers.size}`);
}

const dataLine = (problem) =>
  JSON.stringify({
    problem_idx: problem.problemIdx,
    contest: problem.contest,
    number: problem.number,
    problem: problem.problem,
    answer: problem.answer
  });
const dataContent = `${problems.map(dataLine).join("\n")}\n`;
const dataSha = sha256(dataContent);
if (dataSha !== EXPECTED_DATA_SHA256) {
  throw new Error(`derived ${DATA_FILE} sha256 mismatch: ${dataSha} (expected ${EXPECTED_DATA_SHA256})`);
}
if (existsSync(dataPath) && readFileSync(dataPath, "utf8") !== dataContent) {
  throw new Error(`${DATA_FILE} on disk differs from the re-derivation (drifted data file?)`);
}
writeFileSync(dataPath, dataContent, "utf8");

// ---------------------------------------------------------------------------
// 3. Emit lib/generated/problems.ts
// ---------------------------------------------------------------------------
const contestCounts = problems.reduce((acc, problem) => {
  acc[problem.contest] = (acc[problem.contest] ?? 0) + 1;
  return acc;
}, {});

const esc = (value) => JSON.stringify(value);
const outLines = [];
outLines.push("// GENERATED FILE - do not edit.");
outLines.push(`// Source: data/${DATA_FILE} (vendored from MathArena/aime_2026, revision ${SOURCE_REVISION}).`);
outLines.push(`// Source sha256: ${dataSha}`);
outLines.push("// Cross-checked answer-for-answer against zhenghaoxu/aime-2026 (revision 252cd0519bef57aa55669070f5693f1e5ed1d0ee)");
outLines.push("// and lingjie23/aime_2026 (revision 69131f7eb3dee86616aeea73f2116257c398d54b): all 30 gold answers identical,");
outLines.push("// and against the MathArena/aime_2026_I split (revision 37806d403fa0c9ae914ee7d7da215cf2a3c7a94d) for problems 1-15,");
outLines.push("// plus qyi-iquest/AIME_2026 and baysonfox/AIME2026-I for problems 1-15. See NOTICE for the one outlier mirror.");
outLines.push("// NOTE: AIME 2026 II Problem 10 (problem_idx 25) is corrected from the upstream 850 to the official 340;");
outLines.push("// see the CORRECTIONS block in scripts/generate-dataset.mjs and NOTICE for the official-key sources.");
outLines.push("// Problems originate from the MAA 2026 AIME I and AIME II contests; see data/LICENSE-aime and NOTICE.");
outLines.push("");
outLines.push(`import type { AimeProblem } from "../types";`);
outLines.push("");
outLines.push(`export const SOURCE_SHA256 = ${esc(dataSha)};`);
outLines.push(`export const SOURCE_REVISION = ${esc(SOURCE_REVISION)};`);
outLines.push("");
outLines.push("export const PROBLEMS: readonly AimeProblem[] = [");
for (const problem of problems) {
  outLines.push("  {");
  outLines.push(`    id: ${esc(problem.id)},`);
  outLines.push(`    contest: ${esc(problem.contest)},`);
  outLines.push(`    number: ${problem.number},`);
  outLines.push(`    problem: ${esc(problem.problem)},`);
  outLines.push(`    answer: ${problem.answer}`);
  outLines.push("  },");
}
outLines.push("];");
outLines.push("");
outLines.push("export function getProblem(id: string): AimeProblem | undefined {");
outLines.push("  return PROBLEMS.find((problem) => problem.id === id);");
outLines.push("}");
outLines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "problems.ts"), outLines.join("\n"), "utf8");

console.log(`generated ${problems.length} problems for ${PACK_NAME} (data sha256 ${dataSha.slice(0, 16)}...)`);
console.log(`  contests: ${JSON.stringify(contestCounts)}`);
console.log(
  `  answers: ${uniqueAnswers.size} distinct, min ${Math.min(...uniqueAnswers)}, max ${Math.max(...uniqueAnswers)}`
);
console.log(`  data/${DATA_FILE}`);
console.log(`  lib/generated/problems.ts`);
