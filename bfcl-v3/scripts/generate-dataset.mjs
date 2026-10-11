/**
 * Generates the pack's runtime dataset from the vendored BFCL v3 files.
 *
 * Source: HuggingFace dataset `gorilla-llm/Berkeley-Function-Calling-Leaderboard`
 * at the revision pinned below (Apache-2.0). `data/raw/` holds byte-identical
 * copies of the upstream files; this script verifies each against its recorded
 * SHA-256 and compiles them into:
 *
 *   data/manifest.json              light index (categories + per-scenario meta)
 *   data/scenarios/<category>.json  full scenarios (messages, tools, gold calls)
 *
 * The transform is deterministic — identical input produces byte-identical
 * output — and applies one normalisation: function names are written with `_`
 * instead of `.` (the OpenAI-style function-name alphabet), matching the form
 * tool names take on the wire, so a returned name equals its ground-truth key.
 *
 * Run: npm run build:dataset
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rawDir = path.join(root, "data", "raw");
const outDir = path.join(root, "data");
const scenDir = path.join(outDir, "scenarios");

const REVISION = "61fc0608cfd831fcfbbaa676ebdfef0ed963eeda";
const LICENSE = "Apache-2.0";

/** category id -> upstream file stem. */
const CATEGORIES = [
  { id: "simple", label: "Simple", file: "BFCL_v3_simple.json", graded: true },
  { id: "multiple", label: "Multiple", file: "BFCL_v3_multiple.json", graded: true },
  { id: "parallel", label: "Parallel", file: "BFCL_v3_parallel.json", graded: true },
  { id: "parallel_multiple", label: "Parallel Multiple", file: "BFCL_v3_parallel_multiple.json", graded: true },
  { id: "sql", label: "SQL", file: "BFCL_v3_sql.json", graded: true },
  { id: "irrelevance", label: "Irrelevance", file: "BFCL_v3_irrelevance.json", graded: false }
];

/** Expected SHA-256 of every vendored file (content unmodified). */
const SHA256 = {
  "BFCL_v3_simple.json": "fbc37b2ad252bf9af985582e0e07b456173fe627d957491472ea9cef5fb83158",
  "BFCL_v3_multiple.json": "aef168155ebd74b7ac2401198b201343bc7d16d7a3d7e0d4e6d8ee82c6969b2a",
  "BFCL_v3_parallel.json": "fad375d68295776efb63e5aa331dd884f8635e7bb50e05908113c74f14281c3c",
  "BFCL_v3_parallel_multiple.json": "8863ea8433239f55c5f016154cf0830853c89f693c6ea270396a2fa121960579",
  "BFCL_v3_irrelevance.json": "975f51c51f688649fd190078efd87081241e0a326f9114a2ea3c1ca2440d8690",
  "BFCL_v3_sql.json": "2cf021e2e4f81f1097aab31763423b785b3aaa73df8203a4f4ae3900822b0d53",
  "possible_answer/BFCL_v3_simple.json": "2911a2bc00df82c4f999ffa64fedb0164cb88e96212ffa5972087eb91fd496ee",
  "possible_answer/BFCL_v3_multiple.json": "244e00ce9395df948bcafc7bee64e8f9c87ef70887587d83cae45b13699f3047",
  "possible_answer/BFCL_v3_parallel.json": "3af54bf04e5b7640b03a9b6a82440f52474feb24b398f94435fd2b155c7727de",
  "possible_answer/BFCL_v3_parallel_multiple.json": "df4d2c16238c1465dc04697c273cf3ab4a450075fcd274e3dc86ad5bf0049b75",
  "possible_answer/BFCL_v3_sql.json": "066ee73429e1d16e0a28ee7f9a7877f313892e94f6b68fb200b14253c8d7c154"
};

const EXPECTED_COUNTS = {
  simple: 400,
  multiple: 200,
  parallel: 200,
  parallel_multiple: 200,
  sql: 91,
  irrelevance: 240
};

/**
 * Upstream entries excluded from the graded set because they are unsatisfiable
 * under BFCL's own AST checker: their ground-truth `insert_values` is a list of
 * rows that each mix integer and float literals, so no emitted value can clear
 * both the nested type check and the list membership test. They are listed in
 * METHODOLOGY.md and NOTICE; the graded SQL set is the 91 remaining entries.
 */
const EXCLUDED = {
  sql: ["sql_18", "sql_19", "sql_28", "sql_29", "sql_38", "sql_39", "sql_49", "sql_68", "sql_69"]
};

const EXCLUSION_REASON =
  "upstream ground truth is unsatisfiable under BFCL's own AST checker (malformed nested-array insert_values)";

function loadJsonl(relPath, expectedSha) {
  const raw = readFileSync(path.join(rawDir, relPath));
  const sha = createHash("sha256").update(raw).digest("hex");
  if (expectedSha && sha !== expectedSha) {
    throw new Error(`${relPath} sha256 mismatch (drifted source?): ${sha}`);
  }
  return raw
    .toString("utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

/** One single-turn user message per scenario; the dataset nests turns differently per file. */
function extractUser(question) {
  const turns = question;
  if (turns.length === 0) {
    throw new Error("empty question");
  }
  const firstTurn = turns[0];
  const turn = Array.isArray(firstTurn) ? turns[turns.length - 1] : turns;
  const userMessage = turn.find((message) => message.role === "user");
  if (!userMessage || typeof userMessage.content !== "string") {
    throw new Error("no user message in question");
  }
  return userMessage.content;
}

/** Function names go on the wire with `_` instead of `.`. */
function normalizeName(name) {
  return name.replace(/\./g, "_");
}

const manifestScenarios = [];
const categoryCounts = {};

rmSync(scenDir, { recursive: true, force: true });
mkdirSync(scenDir, { recursive: true });

for (const category of CATEGORIES) {
  const questions = loadJsonl(category.file, SHA256[category.file]);
  const goldById = new Map();
  if (category.graded) {
    const goldRel = `possible_answer/${category.file}`;
    for (const record of loadJsonl(goldRel, SHA256[goldRel])) {
      goldById.set(record.id, record.ground_truth);
    }
  }

  const scenarios = [];
  for (const record of questions) {
    if ((EXCLUDED[category.id] ?? []).includes(record.id)) {
      continue;
    }
    const functions = (record.function ?? []).map((fn) => ({
      name: normalizeName(fn.name),
      description: fn.description ?? "",
      parameters: fn.parameters ?? { type: "dict", properties: {}, required: [] }
    }));

    const normalizedNames = functions.map((fn) => fn.name);
    if (new Set(normalizedNames).size !== normalizedNames.length) {
      throw new Error(`${record.id}: function names collide after dot-to-underscore normalisation`);
    }
    for (const fn of functions) {
      if (!fn.parameters || typeof fn.parameters !== "object") {
        throw new Error(`${record.id}: function '${fn.name}' has no parameters block`);
      }
      if (!Array.isArray(fn.parameters.required)) {
        throw new Error(`${record.id}: function '${fn.name}' has no parameters.required list`);
      }
    }

    let gold = [];
    if (category.graded) {
      const raw = goldById.get(record.id);
      if (!raw) {
        throw new Error(`${record.id}: no ground truth found`);
      }
      gold = raw.map((call) => {
        const normalized = {};
        for (const [name, params] of Object.entries(call)) {
          normalized[normalizeName(name)] = params;
        }
        return normalized;
      });
    }

    const user = extractUser(record.question);
    scenarios.push({ id: record.id, category: category.id, user, functions, gold });
    manifestScenarios.push({
      id: record.id,
      category: category.id,
      fnNames: normalizedNames,
      user
    });
  }

  if (scenarios.length !== EXPECTED_COUNTS[category.id]) {
    throw new Error(`expected ${EXPECTED_COUNTS[category.id]} ${category.id} scenarios, got ${scenarios.length}`);
  }
  categoryCounts[category.id] = scenarios.length;

  writeFileSync(path.join(scenDir, `${category.id}.json`), `${JSON.stringify(scenarios)}\n`, "utf8");
}

// The mock server maps an incoming request to a scenario by (user text, tool
// names); that mapping must be unambiguous across the whole dataset.
const seen = new Map();
for (const entry of manifestScenarios) {
  const key = `${entry.user}\u0000${[...entry.fnNames].sort().join("\u0000")}`;
  if (seen.has(key)) {
    throw new Error(`prompt signature collision between ${seen.get(key)} and ${entry.id}`);
  }
  seen.set(key, entry.id);
}

const manifest = {
  revision: REVISION,
  license: LICENSE,
  categories: CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    count: categoryCounts[category.id]
  })),
  excludedScenarios: Object.entries(EXCLUDED).flatMap(([category, ids]) =>
    ids.map((id) => ({ id, category, reason: EXCLUSION_REASON }))
  ),
  scenarios: manifestScenarios
};

writeFileSync(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest)}\n`, "utf8");

const total = manifestScenarios.length;
console.log(`generated ${total} scenarios from revision ${REVISION.slice(0, 12)}...`);
for (const category of CATEGORIES) {
  console.log(`  ${category.id}: ${categoryCounts[category.id]}`);
}
const excluded = manifest.excludedScenarios;
if (excluded.length > 0) {
  console.log(`  excluded (unsatisfiable upstream ground truth): ${excluded.map((entry) => entry.id).join(", ")}`);
}
console.log("  data/manifest.json");
console.log("  data/scenarios/*.json");
