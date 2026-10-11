#!/usr/bin/env node
/**
 * Fixture checks for BFCL-v3: AST grading semantics, tool-call decoding, and
 * dataset integrity. Runs against the built dist-cli output.
 *
 * Usage: npm run check:extraction   (builds the CLI first)
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { astChecker, checkIrrelevance, standardizeString } = require("../dist-cli/lib/grading.js");
const { decodeModelOutput } = require("../dist-cli/lib/orchestrator.js");
const { buildWireTools } = require("../dist-cli/lib/tools.js");

const { synthesiseGoldCalls } = await import("./gold-calls.mjs");

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

function fn(name, properties, required) {
  return { name, description: "", parameters: { type: "dict", properties, required } };
}

/** One emitted call in BFCL's model-output shape. */
function call(name, args) {
  return { [name]: args };
}

function verdict(valid) {
  return valid ? "pass" : "fail";
}

function runAst(category, functions, calls, gold) {
  return verdict(astChecker(functions, calls, gold, category).valid);
}

// ---------------------------------------------------------------------------
// 1. Standardisation helper
// ---------------------------------------------------------------------------

check("standardize drops spaces and punctuation", standardizeString("April 1, 2024"), "april12024");
check("standardize lowercases and unifies quotes", standardizeString("It's A-B_C.D"), 'it"sabcd');
check("standardize keeps other characters", standardizeString("abc123"), "abc123");

// ---------------------------------------------------------------------------
// 2. Simple category
// ---------------------------------------------------------------------------

const simpleFn = fn(
  "calculate_triangle_area",
  { base: { type: "integer" }, height: { type: "integer" }, unit: { type: "string" } },
  ["base", "height"]
);
const simpleGold = [{ calculate_triangle_area: { base: [10], height: [5], unit: ["units", ""] } }];

check(
  "simple: exact call passes",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 10, height: 5 })], simpleGold),
  "pass"
);
check(
  "simple: optional parameter may be supplied",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 10, height: 5, unit: "units" })], simpleGold),
  "pass"
);
check(
  "simple: wrong function name fails",
  runAst("simple", [simpleFn], [call("calculate_area", { base: 10, height: 5 })], simpleGold),
  "fail"
);
check(
  "simple: missing required parameter fails",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 10 })], simpleGold),
  "fail"
);
check(
  "simple: unexpected parameter fails",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 10, height: 5, colour: "red" })], simpleGold),
  "fail"
);
check(
  "simple: wrong value fails",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 99, height: 5 })], simpleGold),
  "fail"
);
check(
  "simple: two calls where one is expected fails",
  runAst("simple", [simpleFn], [call("calculate_triangle_area", { base: 10, height: 5 }), call("calculate_triangle_area", { base: 10, height: 5 })], simpleGold),
  "fail"
);
check(
  "simple: zero calls fails",
  runAst("simple", [simpleFn], [], simpleGold),
  "fail"
);

const dateFn = fn("book", { date: { type: "string" } }, ["date"]);
check(
  "simple: string comparison tolerates punctuation and case",
  runAst("simple", [dateFn], [call("book", { date: "APRIL 1,2024" })], [{ book: { date: ["April 1, 2024"] } }]),
  "pass"
);
check(
  "simple: genuinely different string fails",
  runAst("simple", [dateFn], [call("book", { date: "May 2" })], [{ book: { date: ["April 1, 2024"] } }]),
  "fail"
);

const listFn = fn("sum", { values: { type: "array", items: { type: "integer" } } }, ["values"]);
check(
  "simple: array value compares element-wise",
  runAst("simple", [listFn], [call("sum", { values: [3, 5] })], [{ sum: { values: [[3, 5]] } }]),
  "pass"
);
check(
  "simple: array order matters",
  runAst("simple", [listFn], [call("sum", { values: [5, 3] })], [{ sum: { values: [[3, 5]] } }]),
  "fail"
);

const dictFn = fn("lookup", { query: { type: "dict" } }, ["query"]);
check(
  "simple: dict value matches on keys and values",
  runAst("simple", [dictFn], [call("lookup", { query: { limit: 50, filter: "public" } })], [{ lookup: { query: [{ limit: [50], filter: ["public"] }] } }]),
  "pass"
);
check(
  "simple: dict with an unexpected key fails",
  runAst("simple", [dictFn], [call("lookup", { query: { limit: 50, filter: "public", extra: 1 } })], [{ lookup: { query: [{ limit: [50], filter: ["public"] }] } }]),
  "fail"
);

const boolFn = fn("toggle", { enabled: { type: "boolean" } }, ["enabled"]);
check(
  "simple: boolean value matches",
  runAst("simple", [boolFn], [call("toggle", { enabled: true })], [{ toggle: { enabled: [true] } }]),
  "pass"
);
check(
  "simple: boolean type mismatch fails",
  runAst("simple", [boolFn], [call("toggle", { enabled: "true" })], [{ toggle: { enabled: [true] } }]),
  "fail"
);

// float schema accepting an integer literal (upstream int->float auto conversion)
const floatFn = fn("scale", { factor: { type: "float" } }, ["factor"]);
check(
  "simple: integer literal accepted for a float parameter",
  runAst("simple", [floatFn], [call("scale", { factor: 2 })], [{ scale: { factor: [2] } }]),
  "pass"
);

// variable placeholder: ground truth is a string where the schema expects an array
const varFn = fn("fit", { x: { type: "array", items: { type: "float" } } }, ["x"]);
check(
  "simple: variable placeholder string passes",
  runAst("simple", [varFn], [call("fit", { x: "data['sales']" })], [{ fit: { x: ["data['sales']"] } }]),
  "pass"
);

// ---------------------------------------------------------------------------
// 3. Multiple / parallel / parallel_multiple
// ---------------------------------------------------------------------------

const multiFns = [
  fn("alpha_get", { id: { type: "integer" } }, ["id"]),
  fn("beta_get", { name: { type: "string" } }, ["name"])
];
const multiGold = [{ beta_get: { name: ["x"] } }];
check(
  "multiple: single correct call passes",
  runAst("multiple", multiFns, [call("beta_get", { name: "x" })], multiGold),
  "pass"
);
check(
  "multiple: two calls fail",
  runAst("multiple", multiFns, [call("beta_get", { name: "x" }), call("alpha_get", { id: 1 })], multiGold),
  "fail"
);

const parallelFn = fn("play", { artist: { type: "string" }, duration: { type: "integer" } }, ["artist", "duration"]);
const parallelGold = [
  { play: { artist: ["Taylor Swift"], duration: [20] } },
  { play: { artist: ["Maroon 5"], duration: [15] } }
];
check(
  "parallel: calls may arrive in any order",
  runAst("parallel", [parallelFn], [call("play", { artist: "Maroon 5", duration: 15 }), call("play", { artist: "Taylor Swift", duration: 20 })], parallelGold),
  "pass"
);
check(
  "parallel: an extra call fails",
  runAst("parallel", [parallelFn], [call("play", { artist: "Taylor Swift", duration: 20 }), call("play", { artist: "Maroon 5", duration: 15 }), call("play", { artist: "Adele", duration: 5 })], parallelGold),
  "fail"
);
check(
  "parallel: a missing call fails",
  runAst("parallel", [parallelFn], [call("play", { artist: "Taylor Swift", duration: 20 })], parallelGold),
  "fail"
);
check(
  "parallel: a wrong argument fails",
  runAst("parallel", [parallelFn], [call("play", { artist: "Taylor Swift", duration: 99 }), call("play", { artist: "Maroon 5", duration: 15 })], parallelGold),
  "fail"
);

const pmFns = [
  fn("math_sum_of_multiples", { lower_limit: { type: "integer" }, upper_limit: { type: "integer" }, multiples: { type: "array", items: { type: "integer" } } }, ["lower_limit", "upper_limit", "multiples"]),
  fn("math_product_of_primes", { count: { type: "integer" } }, ["count"])
];
const pmGold = [
  { math_sum_of_multiples: { lower_limit: [1], upper_limit: [1000], multiples: [[3, 5]] } },
  { math_product_of_primes: { count: [5] } }
];
check(
  "parallel_multiple: mixed calls, order-insensitive",
  runAst("parallel_multiple", pmFns, [call("math_product_of_primes", { count: 5 }), call("math_sum_of_multiples", { lower_limit: 1, upper_limit: 1000, multiples: [3, 5] })], pmGold),
  "pass"
);
check(
  "parallel_multiple: dropped call fails",
  runAst("parallel_multiple", pmFns, [call("math_product_of_primes", { count: 5 })], pmGold),
  "fail"
);

// ---------------------------------------------------------------------------
// 4. Irrelevance
// ---------------------------------------------------------------------------

check("irrelevance: no call passes", verdict(checkIrrelevance([]).valid), "pass");
check("irrelevance: any call fails", verdict(checkIrrelevance([call("anything", {})]).valid), "fail");

// ---------------------------------------------------------------------------
// 5. Tool-call decoding
// ---------------------------------------------------------------------------

const decoded = decodeModelOutput([
  { name: "alpha.get", arguments: '{"id": 1}' },
  { name: "beta.get", arguments: "" }
]);
check("decode: dotted names normalised to underscores", JSON.stringify(decoded.calls), JSON.stringify([{ alpha_get: { id: 1 } }, { beta_get: {} }]));
check("decode: invalid JSON reports an error", decodeModelOutput([{ name: "a", arguments: "{oops" }]).error !== undefined, true);
check("decode: nameless call reports an error", decodeModelOutput([{ name: "", arguments: "{}" }]).error !== undefined, true);

// ---------------------------------------------------------------------------
// 6. Wire tool schema conversion
// ---------------------------------------------------------------------------

const wire = buildWireTools([fn("x.y", { a: { type: "integer" }, b: { type: "array", items: { type: "float" } }, c: { type: "dict" } }, ["a"])]);
check("wire: parameters type is object", wire[0].function.parameters.type, "object");
check("wire: integer stays integer", wire[0].function.parameters.properties.a.type, "integer");
check("wire: array maps to array with items", JSON.stringify(wire[0].function.parameters.properties.b), JSON.stringify({ type: "array", items: { type: "number" } }));
check("wire: dict maps to object", wire[0].function.parameters.properties.c.type, "object");

// ---------------------------------------------------------------------------
// 7. Dataset integrity
// ---------------------------------------------------------------------------

const manifest = JSON.parse(readFileSync(path.join(root, "data", "manifest.json"), "utf8"));
const SCENARIOS = new Map();
for (const category of manifest.categories) {
  const list = JSON.parse(readFileSync(path.join(root, "data", "scenarios", `${category.id}.json`), "utf8"));
  for (const scenario of list) {
    SCENARIOS.set(scenario.id, scenario);
  }
}

check("dataset: 1331 scenarios", manifest.scenarios.length, 1331);
check("dataset: six categories", manifest.categories.map((category) => category.id).join(","), "simple,multiple,parallel,parallel_multiple,sql,irrelevance");
check(
  "dataset: per-category counts",
  manifest.categories.map((category) => `${category.id}=${category.count}`).join(" "),
  "simple=400 multiple=200 parallel=200 parallel_multiple=200 sql=91 irrelevance=240"
);
check(
  "dataset: excluded set is the documented unsatisfiable SQL entries",
  manifest.excludedScenarios.map((entry) => entry.id).join(","),
  "sql_18,sql_19,sql_28,sql_29,sql_38,sql_39,sql_49,sql_68,sql_69"
);
check(
  "dataset: excluded entries are absent from the graded set",
  manifest.excludedScenarios.every((entry) => !SCENARIOS.has(entry.id)),
  true
);
check("dataset: no dotted function names remain", manifest.scenarios.every((entry) => entry.fnNames.every((name) => !name.includes("."))), true);
check("dataset: irrelevance scenarios expect no call", [...SCENARIOS.values()].every((scenario) => scenario.category !== "irrelevance" || scenario.gold.length === 0), true);
check(
  "dataset: graded scenarios carry ground truth",
  [...SCENARIOS.values()].every((scenario) => scenario.category === "irrelevance" || scenario.gold.length > 0),
  true
);

// Upstream identifies the expected function by the ground-truth key for the
// multiple/parallel categories, so the key must name a provided function. A
// handful of upstream `simple` entries use a shortened key; the simple checker
// ignores the key (it uses the schema name), so those stay gradeable.
const mismatchedGoldKeys = [];
for (const scenario of SCENARIOS.values()) {
  const names = new Set(scenario.functions.map((doc) => doc.name));
  for (const goldCall of scenario.gold) {
    for (const key of Object.keys(goldCall)) {
      if (!names.has(key)) {
        mismatchedGoldKeys.push(`${scenario.id}:${key}`);
      }
    }
  }
}
check(
  "dataset: multiple/parallel ground-truth keys name a provided function",
  mismatchedGoldKeys.filter((entry) => !entry.startsWith("simple_") && !entry.startsWith("sql_")).length,
  0
);
check(
  "dataset: key quirk confined to simple/sql",
  mismatchedGoldKeys.every((entry) => entry.startsWith("simple_") || entry.startsWith("sql_")),
  true
);

// Every function the ground truth expects must be callable: the required
// parameters of the matching function document must be constrained by that
// ground-truth call.
const missingRequired = [];
for (const scenario of SCENARIOS.values()) {
  if (scenario.category === "irrelevance") {
    continue;
  }
  for (const goldCall of scenario.gold) {
    const [key, params] = Object.entries(goldCall)[0];
    const doc = scenario.functions.find((candidate) => candidate.name === key) ?? scenario.functions[0];
    for (const required of doc.parameters.required ?? []) {
      if (!(required in params)) {
        missingRequired.push(`${scenario.id}:${doc.name}.${required}`);
      }
    }
  }
}
if (missingRequired.length > 0) {
  console.error(missingRequired.slice(0, 10).join("\n"));
}
check("dataset: required parameters of expected calls are constrained", missingRequired.length, 0);
check(
  "dataset: parallel call counts match ground truth",
  [...SCENARIOS.values()].every((scenario) => scenario.category !== "parallel" || scenario.gold.length >= 2),
  true
);

// ---------------------------------------------------------------------------
// 8. Ground truth is self-consistent: every scenario is passable
//
// For each scenario, synthesise the acceptable call set from the ground truth
// (exactly what the mock server emits) and grade it — all must pass. This is
// the invariant behind the mock E2E's expected 1340/1340.
// ---------------------------------------------------------------------------

function synthesiseCalls(scenario) {
  return synthesiseGoldCalls(scenario).map(({ name, args }) => ({ [name]: args }));
}

const unpasasble = [];
for (const scenario of SCENARIOS.values()) {
  const calls = synthesiseCalls(scenario);
  const result =
    scenario.category === "irrelevance"
      ? checkIrrelevance(calls)
      : astChecker(scenario.functions, calls, scenario.gold, scenario.category);
  if (!result.valid) {
    unpasasble.push(scenario.id);
  }
}
if (unpasasble.length > 0) {
  console.error(`unpassable: ${unpasasble.join(",")}`);
}
check("dataset: ground truth is passable for every graded scenario", unpasasble.length, 0);
check("dataset: 1331 graded scenarios are all passable", 1331 - unpasasble.length, 1331);

console.log("");
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
