#!/usr/bin/env node
/**
 * Probe: load the compiled pack the way the BenchLocal host does and
 * sanity-check scenarios, manifest and scoring without the app.
 * Run: node _reference/probe-pack.mjs
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mod = await import(pathToFileURL(path.join(root, "dist", "benchlocal", "index.js")).href);

let pack = mod.default ?? mod;
pack = pack.default ?? pack; // mirrors host normalizeBenchPackModule CJS unwrap

console.log("manifest:", pack.manifest?.id, "v" + pack.manifest?.version, "| author:", pack.manifest?.author);
const scenarios = await pack.listScenarios();
console.log("scenarios:", scenarios.length);
console.log("first:", scenarios[0]?.id, "|", scenarios[0]?.category, "|", scenarios[0]?.title);

const result = (id, pass) => ({
  scenarioId: id,
  status: pass ? "pass" : "fail",
  score: pass ? 1 : 0,
  points: 1,
  summary: "",
  rawLog: "",
  timings: { startedAt: new Date().toISOString(), completedAt: new Date().toISOString(), durationMs: 1 }
});

const partial = pack.scoreModelResults([result("AIME/0", true), result("AIME/1", true), result("AIME/2", false)]);
console.log("score 2/3:", partial.totalScore, "|", partial.summary);

const full = pack.scoreModelResults(scenarios.map((scenario) => result(scenario.id, true)));
console.log(`score 30/30:`, full.totalScore, "|", full.summary);
console.log("categories:", full.categories.map((category) => `${category.label}=${category.score}`).join(", "));

const zero = pack.scoreModelResults(scenarios.map((scenario) => result(scenario.id, false)));
console.log(`score 0/30:`, zero.totalScore, "|", zero.summary);
