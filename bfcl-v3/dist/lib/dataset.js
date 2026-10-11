"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABELS = void 0;
exports.normalizeFuncName = normalizeFuncName;
exports.loadManifest = loadManifest;
exports.getScenario = getScenario;
exports.getScenarioCards = getScenarioCards;
exports.scenarioCount = scenarioCount;
/**
 * Runtime dataset access for the BFCL-v3 pack.
 *
 * The vendored upstream files under `data/raw/` are compiled by
 * `scripts/generate-dataset.mjs` into `data/manifest.json` (a light index used
 * to build UI cards) and one `data/scenarios/<category>.json` file per
 * evaluated category. Scenarios are read lazily and cached, so a run touches
 * only the file for the category it is evaluating.
 */
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
/** `dist/lib/../..` and `dist-cli/lib/../..` both resolve to the pack root. */
const DATA_DIR = node_path_1.default.join(__dirname, "..", "..", "data");
exports.CATEGORY_LABELS = {
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
function normalizeFuncName(name) {
    return name.replace(/\./g, "_");
}
let cachedManifest;
const scenarioCache = new Map();
function loadManifest() {
    if (!cachedManifest) {
        const raw = (0, node_fs_1.readFileSync)(node_path_1.default.join(DATA_DIR, "manifest.json"), "utf8");
        cachedManifest = JSON.parse(raw);
    }
    return cachedManifest;
}
function loadCategory(category) {
    let cache = scenarioCache.get(category);
    if (!cache) {
        const raw = (0, node_fs_1.readFileSync)(node_path_1.default.join(DATA_DIR, "scenarios", `${category}.json`), "utf8");
        const list = JSON.parse(raw);
        cache = new Map(list.map((scenario) => [scenario.id, scenario]));
        scenarioCache.set(category, cache);
    }
    return cache;
}
function getScenario(id) {
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
function getScenarioCards() {
    const manifest = loadManifest();
    return manifest.scenarios.map((entry) => {
        const label = exports.CATEGORY_LABELS[entry.category] ?? entry.category;
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
function scenarioCount() {
    return loadManifest().scenarios.length;
}
