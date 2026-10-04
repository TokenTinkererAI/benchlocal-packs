"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packRoot = packRoot;
exports.dataDir = dataDir;
exports.harnessPath = harnessPath;
exports.loadManifest = loadManifest;
exports.getScenarioMetas = getScenarioMetas;
exports.getProblemMeta = getProblemMeta;
exports.problemFilePath = problemFilePath;
exports.loadCanonicalSolutions = loadCanonicalSolutions;
exports.resetDatasetCacheForTests = resetDatasetCacheForTests;
/**
 * Dataset access for HumanEval+-164.
 *
 * data/manifest.json (light per-problem metadata + the canonical prompt) is read
 * once; data/problems/<file>.json holds the graded record (inputs, expected
 * outputs, reference timings) and is read by the Python harness only -- it is
 * not parsed here, because several records are far too large for that
 * (HumanEval/15's is ~147 MB) and TypeScript never needs their contents.
 *
 * Paths resolve relative to the compiled lib, which works both for the working
 * tree (dist/lib/../.. = repo root) and installed packs (dist/lib/../.. = pack
 * root, where data/ and harness/ also live).
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let cachedManifest = null;
let cachedCanonical = null;
function packRoot() {
    return node_path_1.default.resolve(__dirname, "..", "..");
}
function dataDir() {
    return node_path_1.default.join(packRoot(), "data");
}
function harnessPath() {
    return node_path_1.default.join(packRoot(), "harness", "run_problem.py");
}
function loadManifest() {
    if (cachedManifest) {
        return cachedManifest;
    }
    const raw = node_fs_1.default.readFileSync(node_path_1.default.join(dataDir(), "manifest.json"), "utf8");
    cachedManifest = JSON.parse(raw);
    return cachedManifest;
}
function getScenarioMetas() {
    return loadManifest().problems;
}
function getProblemMeta(id) {
    return loadManifest().problems.find((problem) => problem.id === id);
}
/**
 * Absolute path of one problem's graded record. Only the Python harness reads it.
 *
 * The problem id ("HumanEval/7") is used verbatim as the file stem with "/"
 * replaced by "_", as recorded per problem in the manifest.
 */
function problemFilePath(id) {
    const meta = getProblemMeta(id);
    if (!meta) {
        throw new Error(`Unknown problem id "${id}".`);
    }
    return node_path_1.default.join(dataDir(), "problems", meta.file);
}
/** Canonical solutions (self-test and mock fixtures only; never used for grading). */
function loadCanonicalSolutions() {
    if (cachedCanonical) {
        return cachedCanonical;
    }
    const raw = node_fs_1.default.readFileSync(node_path_1.default.join(dataDir(), "canonical.json"), "utf8");
    const parsed = JSON.parse(raw);
    cachedCanonical = parsed.canonical;
    return cachedCanonical;
}
function resetDatasetCacheForTests() {
    cachedManifest = null;
    cachedCanonical = null;
}
