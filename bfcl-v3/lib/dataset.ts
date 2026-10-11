/**
 * Runtime dataset access for the BFCL-v3 pack.
 *
 * The vendored upstream files under `data/raw/` are compiled by
 * `scripts/generate-dataset.mjs` into `data/manifest.json` (a light index used
 * to build UI cards) and one `data/scenarios/<category>.json` file per
 * evaluated category. Scenarios are read lazily and cached, so a run touches
 * only the file for the category it is evaluating.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import type { DatasetManifest, BenchScenario, ScenarioIndexEntry } from "./types";

/** `dist/lib/../..` and `dist-cli/lib/../..` both resolve to the pack root. */
const DATA_DIR = path.join(__dirname, "..", "..", "data");

export const CATEGORY_LABELS: Record<string, string> = {
  simple: "Simple",
  multiple: "Multiple",
  parallel: "Parallel",
  parallel_multiple: "Parallel Multiple",
  irrelevance: "Irrelevance",
  sql: "SQL"
};

/**
 * Tool names are put on the wire with `_` instead of `.` (the OpenAI-style
 * function-name alphabet), mirroring BFCL's handling for OpenAI-compatible
 * chat endpoints. The dataset is normalised the same way at build time, so a
 * returned name matches its ground-truth key directly.
 */
export function normalizeFuncName(name: string): string {
  return name.replace(/\./g, "_");
}

let cachedManifest: DatasetManifest | undefined;
const scenarioCache = new Map<string, Map<string, BenchScenario>>();

export function loadManifest(): DatasetManifest {
  if (!cachedManifest) {
    const raw = readFileSync(path.join(DATA_DIR, "manifest.json"), "utf8");
    cachedManifest = JSON.parse(raw) as DatasetManifest;
  }
  return cachedManifest;
}

function loadCategory(category: string): Map<string, BenchScenario> {
  let cache = scenarioCache.get(category);
  if (!cache) {
    const raw = readFileSync(path.join(DATA_DIR, "scenarios", `${category}.json`), "utf8");
    const list = JSON.parse(raw) as BenchScenario[];
    cache = new Map(list.map((scenario) => [scenario.id, scenario]));
    scenarioCache.set(category, cache);
  }
  return cache;
}

export function getScenario(id: string): BenchScenario | undefined {
  const category = id.includes("_") ? id.slice(0, id.lastIndexOf("_")) : id;
  const scenario = loadCategory(category).get(id);
  if (scenario) {
    return scenario;
  }
  // Fall back to the manifest order if the id does not encode the category.
  const entry = loadManifest().scenarios.find((candidate) => candidate.id === id);
  if (!entry) {
    return undefined;
  }
  return loadCategory(entry.category).get(id);
}

export function getScenarioCards() {
  const manifest = loadManifest();
  return manifest.scenarios.map((entry: ScenarioIndexEntry) => {
    const label = CATEGORY_LABELS[entry.category] ?? entry.category;
    return {
      id: entry.id,
      title: `${entry.id} - ${entry.fnNames[0] ?? label}`,
      category: entry.category,
      description: `${label} / ${entry.fnNames.length} function${entry.fnNames.length === 1 ? "" : "s"} available; graded by AST match against the ground-truth calls.`,
      promptText: entry.user,
      detailCards: [
        { title: "Category", content: label },
        { title: "Available functions", content: entry.fnNames.join("\n") || "(none)" },
        { title: "User request", content: entry.user }
      ]
    };
  });
}

export function scenarioCount(): number {
  return loadManifest().scenarios.length;
}
