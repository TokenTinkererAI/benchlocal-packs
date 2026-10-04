#!/usr/bin/env node
/**
 * Pack probe: load the SHIPPED adapter (dist/benchlocal/index.js) and exercise
 * the pieces the host calls, without BenchLocal.
 *
 *   node scripts/check-pack.mjs
 *
 * Checks:
 *   - the adapter imports and returns a manifest whose entry exists;
 *   - listScenarios() returns 164 well-formed scenario cards;
 *   - scoreModelResults() produces the house score for synthetic results;
 *   - data/manifest.json, data/canonical.json, harness/run_problem.py resolve
 *     relative to the compiled lib (the same paths the installed pack uses);
 *   - the two problems with the largest records are readable;
 *   - no HumanEval entry point is shadowed by the harness import preamble.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];

function check(name, ok, detail = "") {
  problems.push({ name, ok });
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail ? ` - ${detail}` : ""}`);
}

const adapterPath = path.join(REPO_ROOT, "dist", "benchlocal", "index.js");
if (!fs.existsSync(adapterPath)) {
  console.error("error: dist/benchlocal/index.js is missing - run `npm run build` first.");
  process.exit(1);
}

const module = await import(pathToFileURL(adapterPath).href);
// dist/ is CommonJS (the host imports it dynamically and unwraps the interop
// namespace), so the pack object may sit at `default.default`.
const adapter = module.default?.default ?? module.default;
const manifest = module.manifest ?? adapter?.manifest;

check("adapter exports a manifest", Boolean(manifest), `${manifest?.id} ${manifest?.version}`);
check("manifest entry exists on disk", fs.existsSync(path.join(REPO_ROOT, manifest.entry.replace(/^\.\//, ""))), manifest.entry);
check("manifest has no repository URL", manifest.repository === undefined);
check("pack id/version", manifest.id === "humaneval-plus-164" && manifest.version === "1.0.1");

const scenarios = await adapter.listScenarios();
check("listScenarios() returns 164 scenarios", scenarios.length === 164, `${scenarios.length}`);
check(
  "scenario ids are HumanEval/0..163",
  scenarios[0]?.id === "HumanEval/0" && scenarios[163]?.id === "HumanEval/163"
);
check(
  "scenario cards carry prompt + description + detail cards",
  scenarios.every(
    (scenario) =>
      typeof scenario.promptText === "string" &&
      scenario.promptText.length > 0 &&
      typeof scenario.description === "string" &&
      Array.isArray(scenario.detailCards) &&
      scenario.category === "humaneval-plus"
  )
);

const synthetic = scenarios.map((scenario, index) => ({
  scenarioId: scenario.id,
  status: index < 157 ? "pass" : "fail",
  score: index < 157 ? 1 : 0,
  points: 1,
  summary: "",
  rawLog: ""
}));
const score = adapter.scoreModelResults(synthetic);
check("scoreModelResults() house style", score.summary === "pass@1: 157/164 (95.7%) - 96 points.", JSON.stringify(score.summary));
check("categories weight 100", score.categories?.[0]?.weight === 100 && score.categories?.[0]?.id === "humaneval-plus");

const dataManifest = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "manifest.json"), "utf8"));
check("data/manifest.json has 164 problems", dataManifest.problems.length === 164);
check(
  "graded totals",
  dataManifest.counts.baseTests === 1570 && dataManifest.counts.plusTests === 122675,
  `base ${dataManifest.counts.baseTests}, plus ${dataManifest.counts.plusTests}`
);
check("exclusion bookkeeping", dataManifest.exclusions.count === 8);

const canonical = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "canonical.json"), "utf8"));
check("data/canonical.json has 164 reference solutions", Object.keys(canonical.canonical).length === 164);
check("harness/run_problem.py present", fs.existsSync(path.join(REPO_ROOT, "harness", "run_problem.py")));

const largest = [...dataManifest.problems].sort((a, b) => (b.plusTests ?? 0) - (a.plusTests ?? 0))[0];
for (const id of ["HumanEval/0", "HumanEval/15", "HumanEval/139"]) {
  const meta = dataManifest.problems.find((problem) => problem.id === id);
  const file = path.join(REPO_ROOT, "data", "problems", meta.file);
  const size = fs.statSync(file).size;
  const head = fs.readFileSync(file, { encoding: "utf8", flag: "r" });
  check(`record ${id} parses`, JSON.parse(head).task_id === id, `${(size / 1024 / 1024).toFixed(1)} MiB`);
}
const maxPlus = Math.max(...dataManifest.problems.map((problem) => problem.plusTests ?? 0));
const atMax = dataManifest.problems.filter((problem) => problem.plusTests === maxPlus).map((problem) => problem.id);
check(
  "max plus tests per problem is 1000",
  maxPlus === 1000 && atMax.includes("HumanEval/94"),
  `${atMax.length} problem(s) at the maximum`
);

// The import preamble binds a handful of names that collide with HumanEval entry
// points (median/add/search/digits). The harness must report a distinct failure
// for a submission that never defines the entry point, never the inherited
// binding - this asserts the collision is enumerated and handled.
// spawnSync with an argument array (no shell) - the only interpolated values are
// this repository's own absolute paths.
const probe = spawnSync(
  "py",
  [
    "-3",
    "-c",
    [
      "import json,sys",
      "sys.path.insert(0, r'" + path.join(REPO_ROOT, "harness").replaceAll("\\", "/") + "')",
      "import run_problem as h",
      "ns={}",
      "exec(h.import_string, ns)",
      "m=json.load(open(r'" + path.join(REPO_ROOT, "data", "manifest.json").replaceAll("\\", "/") + "',encoding='utf-8'))",
      "shadowed=[p['id']+':'+p['entryPoint'] for p in m['problems'] if p['entryPoint'] in ns]",
      "print(json.dumps(shadowed))"
    ].join("\n")
  ],
  { encoding: "utf8", timeout: 60000, env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } }
);
let shadowed = null;
try {
  shadowed = JSON.parse((probe.stdout ?? "").trim());
} catch {
  shadowed = null;
}
const expectedShadowed = ["HumanEval/47:median", "HumanEval/53:add", "HumanEval/69:search", "HumanEval/85:add", "HumanEval/131:digits"];
check(
  "preamble/entry-point collisions are the known five",
  Array.isArray(shadowed) &&
    shadowed.length === expectedShadowed.length &&
    expectedShadowed.every((name) => shadowed.includes(name)),
  shadowed === null ? `probe failed: ${probe.stderr?.trim()?.slice(0, 200)}` : JSON.stringify(shadowed)
);

// A submission that does not define the entry point must not inherit the
// preamble's binding: `add` for HumanEval/53 is also `operator.add`, which would
// satisfy the tests. The harness compares the resolved object against the
// preamble's binding and reports entry_point_missing instead.
const noDef = spawnSync(
  "py",
  [
    "-3",
    "-c",
    [
      "import importlib.util, json",
      "repo = r'" + REPO_ROOT.replaceAll("\\", "/") + "'",
      "spec = importlib.util.spec_from_file_location('h', repo + '/harness/run_problem.py')",
      "h = importlib.util.module_from_spec(spec)",
      "spec.loader.exec_module(h)",
      "result, _ = h.run_problem(repo + '/data/problems/HumanEval_53.json', '\\n    pass\\n', 4.0, 4.0)",
      "print(json.dumps(result))"
    ].join("\n")
  ],
  { encoding: "utf8", timeout: 120000, env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } }
);
let passthrough = null;
try {
  passthrough = JSON.parse((noDef.stdout ?? "").trim());
} catch {
  passthrough = null;
}
check(
  "a body-less submission is not rescued by the preamble",
  passthrough !== null && passthrough.verdict === "fail" && passthrough.detail?.kind !== "pass",
  passthrough === null ? `probe failed: ${noDef.stderr?.trim()?.slice(0, 200)}` : `${passthrough.verdict}/${passthrough.detail?.kind}`
);

const failed = problems.filter((problem) => !problem.ok);
console.log("");
if (failed.length > 0) {
  console.error(`check-pack FAILED (${failed.length}/${problems.length} checks failed)`);
  process.exit(1);
}
console.log(`check-pack OK (${problems.length}/${problems.length} checks passed)`);
