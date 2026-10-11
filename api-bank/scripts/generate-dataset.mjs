/**
 * Generates lib/generated/scenarios.ts from the vendored API-Bank test data
 * (data/level-1-api.json, data/level-2-api.json, data/level-3.json).
 *
 * Deterministic: identical input -> identical output. Every source file is
 * checked against its pinned SHA-256 before anything is emitted.
 *
 * Run: npm run build:dataset
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  extractArrowResults,
  extractInstructionCards,
  normalizeCard,
  parseApiCallText
} from "./apicall.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const outDir = path.join(root, "lib", "generated");

const SOURCES = {
  level1: {
    file: "level-1-api.json",
    sha256: "0d3155c5495399836b5b1f1cc4eb6d5d50efa16b2734af50a016a158e9dd79bb"
  },
  level2: {
    file: "level-2-api.json",
    sha256: "c61966448d9d5cf98334f39b44c0db1fe5a9c6c84a1f53e652f4aacdbbfc5da0"
  },
  level3: {
    file: "level-3.json",
    sha256: "29542493a302915303d5d67f868282ddda46fa15ba059a4bcf38c6687be29d55"
  }
};

function readSource(key) {
  const spec = SOURCES[key];
  const raw = readFileSync(path.join(dataDir, spec.file));
  const sha = createHash("sha256").update(raw).digest("hex");
  if (sha !== spec.sha256) {
    throw new Error(`${spec.file} sha256 mismatch (drifted source?): ${sha}`);
  }
  return JSON.parse(raw.toString("utf8"));
}

const apiDefs = new Map();
const apiDefSources = new Map();
const conflictingApis = [];

function registerCard(card, source) {
  if (!card) return;
  const existing = apiDefs.get(card.name);
  if (!existing) {
    apiDefs.set(card.name, card);
    apiDefSources.set(card.name, source);
    return;
  }
  // Prefer the richer definition (more declared parameters); record conflicts.
  const existingParams = Object.keys(existing.parameters).length;
  const newParams = Object.keys(card.parameters).length;
  if (JSON.stringify(existing) !== JSON.stringify(card)) {
    if (newParams > existingParams) {
      apiDefs.set(card.name, card);
      apiDefSources.set(card.name, source);
    }
    if (!conflictingApis.includes(card.name)) {
      conflictingApis.push(card.name);
    }
  }
}

function ensureApi(name, source) {
  if (apiDefs.has(name)) return;
  apiDefs.set(name, { name, description: `${name} API.`, parameters: {}, outputs: {} });
  apiDefSources.set(name, `${source} (name only)`);
}

function firstUserLine(text) {
  const match = /User:\s*(.+)/.exec(text);
  if (match) return match[1].trim();
  const line = text.trim().split("\n")[0] ?? "";
  return line.replace(/^User:\s*/, "").trim();
}

function truncate(text, max) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

function stripCallSegments(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("API-Request:")) return false;
      if (trimmed.startsWith("Generate API Request:")) return false;
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function countMarkers(text, needle) {
  let count = 0;
  let index = text.indexOf(needle);
  while (index >= 0) {
    count += 1;
    index = text.indexOf(needle, index + needle.length);
  }
  return count;
}

function canonicalArgs(args) {
  return JSON.stringify(
    Object.keys(args)
      .sort()
      .map((key) => [key, args[key]])
  );
}

// ---------------------------------------------------------------------------
// Level 1 — one scenario per record: a dialogue plus the API descriptions, and
// exactly one expected call.
// ---------------------------------------------------------------------------

const level1 = readSource("level1");
const scenarios = [];
const level1MissingCards = [];

level1.forEach((entry, index) => {
  const cards = extractInstructionCards(entry.instruction);
  for (const card of cards) registerCard(card, "level-1-api");
  const expected = parseApiCallText(entry.expected_output);
  if (!expected) {
    throw new Error(`level-1 record ${index}: could not parse expected_output`);
  }
  const toolNames = cards.map((card) => card.name);
  if (!toolNames.includes(expected.name)) {
    ensureApi(expected.name, "level-1-api");
    toolNames.push(expected.name);
    level1MissingCards.push(`${entry.file}#${entry.id}`);
  }
  scenarios.push({
    id: `L1/${index}`,
    level: 1,
    category: "Level 1 - single call",
    title: truncate(firstUserLine(entry.input) || `Level 1 task ${index}`, 70),
    requirement: truncate(firstUserLine(entry.input), 200),
    task: stripCallSegments(entry.input),
    toolNames,
    requiresRetrieval: false,
    expectedCalls: [{ name: expected.name, args: expected.args }],
    mockOutputs: []
  });
});

// ---------------------------------------------------------------------------
// Level 2 — one scenario per upstream dialogue file: retrieval (ToolSearcher),
// optional credential retrieval, then the task call. Records are per-step, so
// they are re-ordered by how many API-Request steps precede them and deduped by
// step index.
// ---------------------------------------------------------------------------

const level2 = readSource("level2");
const level2Files = new Map();
for (const entry of level2) {
  if (!level2Files.has(entry.file)) level2Files.set(entry.file, []);
  level2Files.get(entry.file).push(entry);
}

const level2FilesList = [...level2Files.keys()].sort();
const level2Stats = { files: level2FilesList.length, steps: 0, harvested: 0 };
level2FilesList.forEach((fileName, fileIndex) => {
  const entries = level2Files.get(fileName);
  const stepOf = (entry) => countMarkers(entry.input.split("Generate API Request:")[0], "API-Request:");
  const ordered = [...entries].sort((left, right) => stepOf(left) - stepOf(right) || left.id - right.id);

  const seenSteps = new Set();
  const expectedCalls = [];
  for (const entry of ordered) {
    const step = stepOf(entry);
    if (seenSteps.has(step)) continue;
    seenSteps.add(step);
    const call = parseApiCallText(entry.expected_output);
    if (!call) throw new Error(`level-2 record ${fileName}#${entry.id}: unparseable expected_output`);
    expectedCalls.push({ name: call.name, args: call.args });
  }
  level2Stats.steps += expectedCalls.length;

  const toolNameSet = new Set(["ToolSearcher"]);

  // Cards declared in the instruction (ToolSearcher) and revealed by retrieval.
  for (const entry of entries) {
    for (const card of extractInstructionCards(entry.instruction)) {
      registerCard(card, "level-2-api");
      toolNameSet.add(card.name);
    }
  }

  // Recorded step results: `[Name(args)]->RESULT` continuations in the inputs.
  const mockOutputs = [];
  const seenResults = new Set();
  for (const entry of entries) {
    for (const result of extractArrowResults(entry.input)) {
      const key = `${result.name}|${canonicalArgs(result.args)}`;
      if (seenResults.has(key)) continue;
      seenResults.add(key);
      mockOutputs.push({ name: result.name, args: result.args, output: result.output });
      toolNameSet.add(result.name);
      const cards = Array.isArray(result.output) ? result.output : [result.output];
      for (const card of cards) {
        const normalized = normalizeCard(card);
        if (normalized) {
          registerCard(normalized, "level-2-api");
          toolNameSet.add(normalized.name);
        }
      }
    }
  }
  level2Stats.harvested += mockOutputs.length;

  for (const call of expectedCalls) {
    ensureApi(call.name, "level-2-api");
    toolNameSet.add(call.name);
  }

  const longest = ordered.reduce((best, entry) => (entry.input.length > best.input.length ? entry : best), ordered[0]);
  const task = stripCallSegments(longest.input);

  const requiresRetrieval = expectedCalls[0]?.name === "ToolSearcher";
  if (expectedCalls.some((call) => call.name === "ToolSearcher") && !requiresRetrieval) {
    throw new Error(`level-2 record ${fileName}: ToolSearcher appears but is not the first call`);
  }

  scenarios.push({
    id: `L2/${fileIndex}`,
    level: 2,
    category: "Level 2 - retrieve then call",
    title: truncate(firstUserLine(task) || fileName, 70),
    requirement: truncate(firstUserLine(task), 200),
    task,
    toolNames: [...toolNameSet],
    requiresRetrieval,
    expectedCalls,
    mockOutputs
  });
});

// ---------------------------------------------------------------------------
// Level 3 — one scenario per record: a requirement and the full multi-call plan
// (including the ToolSearcher retrievals), with the recorded results used to
// feed the model back through the loop.
// ---------------------------------------------------------------------------

const level3 = readSource("level3");
const level3Stats = { calls: 0, withToolSearcher: 0, recorded: 0 };
level3.forEach((entry, index) => {
  const expectedCalls = entry.apis.map((api) => ({ name: api.api_name, args: api.input ?? {} }));
  const mockOutputs = entry.apis.map((api) => ({
    name: api.api_name,
    args: api.input ?? {},
    output: api.output && typeof api.output === "object" && "output" in api.output ? api.output.output : api.output
  }));
  level3Stats.calls += expectedCalls.length;
  level3Stats.recorded += mockOutputs.length;
  if (expectedCalls.some((call) => call.name === "ToolSearcher")) level3Stats.withToolSearcher += 1;
  if (expectedCalls[0]?.name !== "ToolSearcher") {
    throw new Error(`level-3 record ${index}: expected plan does not start with ToolSearcher`);
  }

  const toolNameSet = new Set(["ToolSearcher"]);
  for (const record of mockOutputs) {
    if (record.name === "ToolSearcher") {
      const cards = Array.isArray(record.output) ? record.output : [record.output];
      for (const card of cards) {
        const normalized = normalizeCard(card);
        if (normalized) registerCard(normalized, "level-3");
      }
    }
  }
  for (const call of expectedCalls) {
    ensureApi(call.name, "level-3");
    toolNameSet.add(call.name);
  }

  scenarios.push({
    id: `L3/${index}`,
    level: 3,
    category: "Level 3 - multi-call planning",
    title: truncate(entry.requirement.trim(), 70),
    requirement: entry.requirement.trim(),
    task: entry.requirement.trim(),
    toolNames: [...toolNameSet],
    requiresRetrieval: true,
    expectedCalls,
    mockOutputs
  });
});

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

const apiNames = [...apiDefs.keys()].sort();
const esc = (value) => JSON.stringify(value);

const lines = [];
lines.push("// GENERATED FILE - do not edit.");
lines.push("// Source: API-Bank test data (MIT), HuggingFace dataset liminghao1630/API-Bank,");
lines.push("// revision 12e8158b7628c168f07e8f31fbbe3445e99f44cf, test-data/ members:");
for (const key of ["level1", "level2", "level3"]) {
  lines.push(`//   data/${SOURCES[key].file} sha256 ${SOURCES[key].sha256}`);
}
lines.push("// Regenerate: npm run build:dataset");
lines.push("");
lines.push('import type { ApiDef, ApiScenario } from "../types";');
lines.push("");
lines.push("/** API definitions, deduplicated across the levels by API name. */");
lines.push("export const API_DEFS: Record<string, ApiDef> = {");
for (const name of apiNames) {
  const api = apiDefs.get(name);
  lines.push(`  ${esc(name)}: {`);
  lines.push(`    name: ${esc(api.name)},`);
  lines.push(`    description: ${esc(api.description)},`);
  lines.push("    parameters: {");
  for (const [param, spec] of Object.entries(api.parameters)) {
    lines.push(`      ${esc(param)}: { type: ${esc(spec.type)}, description: ${esc(spec.description)} },`);
  }
  lines.push("    },");
  lines.push("    outputs: {");
  for (const [param, spec] of Object.entries(api.outputs)) {
    lines.push(`      ${esc(param)}: { type: ${esc(spec.type)}, description: ${esc(spec.description)} },`);
  }
  lines.push("    }");
  lines.push("  },");
}
lines.push("};");
lines.push("");
lines.push("/** Every API-Bank scenario, in level order. */");
lines.push("export const SCENARIOS: readonly ApiScenario[] = [");
for (const scenario of scenarios) {
  lines.push("  {");
  lines.push(`    id: ${esc(scenario.id)},`);
  lines.push(`    level: ${scenario.level},`);
  lines.push(`    category: ${esc(scenario.category)},`);
  lines.push(`    title: ${esc(scenario.title)},`);
  lines.push(`    requirement: ${esc(scenario.requirement)},`);
  lines.push(`    task: ${esc(scenario.task)},`);
  lines.push(`    toolNames: [${scenario.toolNames.map(esc).join(", ")}],`);
  lines.push(`    requiresRetrieval: ${scenario.requiresRetrieval},`);
  lines.push("    expectedCalls: [");
  for (const call of scenario.expectedCalls) {
    lines.push(`      { name: ${esc(call.name)}, args: ${esc(call.args)} },`);
  }
  lines.push("    ],");
  lines.push("    mockOutputs: [");
  for (const record of scenario.mockOutputs) {
    lines.push(`      { name: ${esc(record.name)}, args: ${esc(record.args)}, output: ${esc(record.output)} },`);
  }
  lines.push("    ]");
  lines.push("  },");
}
lines.push("];");
lines.push("");
lines.push("export function getScenario(id: string): ApiScenario | undefined {");
lines.push("  return SCENARIOS.find((scenario) => scenario.id === id);");
lines.push("}");
lines.push("");

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "scenarios.ts"), lines.join("\n"), "utf8");

const byLevel = scenarios.reduce((acc, scenario) => {
  acc[scenario.level] = (acc[scenario.level] ?? 0) + 1;
  return acc;
}, {});
const missingParams = apiNames.filter((name) => Object.keys(apiDefs.get(name).parameters).length === 0);

console.log(`generated ${scenarios.length} scenarios (level 1: ${byLevel[1] ?? 0}, level 2: ${byLevel[2] ?? 0}, level 3: ${byLevel[3] ?? 0})`);
console.log(`  APIs: ${apiNames.length} (no declared parameters: ${missingParams.length}${missingParams.length ? ` -> ${missingParams.join(", ")}` : ""})`);
console.log(`  level 2: ${level2Stats.files} dialogues, ${level2Stats.steps} expected calls, ${level2Stats.harvested} recorded results`);
console.log(`  level 3: ${level3Stats.calls} expected calls (${level3Stats.withToolSearcher} records start with ToolSearcher), ${level3Stats.recorded} recorded results`);
if (level1MissingCards.length > 0) {
  console.log(`  level 1 records whose expected API was not listed in the instruction (synthesized minimal definition): ${level1MissingCards.length}`);
}
if (conflictingApis.length > 0) {
  console.log(`  APIs whose definitions differed between records (richest definition kept): ${conflictingApis.length}`);
}
console.log("  lib/generated/scenarios.ts");
