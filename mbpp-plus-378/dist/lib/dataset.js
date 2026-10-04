"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packRoot = packRoot;
exports.dataDir = dataDir;
exports.harnessPath = harnessPath;
exports.loadManifest = loadManifest;
exports.getProblemMeta = getProblemMeta;
exports.problemFilePath = problemFilePath;
exports.loadProblemRecord = loadProblemRecord;
exports.resetManifestCacheForTests = resetManifestCacheForTests;
/**
 * Dataset access for MBPP+-378.
 *
 * data/manifest.json (light per-problem metadata + source pins) is read once;
 * data/problems/<id>.json holds the full record (inputs, vendored expected
 * outputs, reference timings), read lazily per run and handed to the Python
 * harness as a file path - the pack never decodes the heavy fields itself.
 *
 * Paths resolve relative to the compiled lib, which works both for the working
 * tree (dist/lib/../.. = repo root) and installed packs (dist/lib/../.. = pack
 * root, where data/ and harness/ also live).
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let cachedManifest = null;
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
    const manifestPath = node_path_1.default.join(dataDir(), "manifest.json");
    cachedManifest = JSON.parse(node_fs_1.default.readFileSync(manifestPath, "utf8"));
    return cachedManifest;
}
function getProblemMeta(id) {
    return loadManifest().problems.find((problem) => problem.id === id);
}
/** data/problems/<task_id with '/' -> '_'>.json */
function problemFilePath(id) {
    const meta = getProblemMeta(id);
    if (meta) {
        return node_path_1.default.join(dataDir(), "problems", meta.file);
    }
    const safeId = id.replace(/\//g, "_");
    if (!/^[A-Za-z0-9_.-]+$/.test(safeId)) {
        throw new Error(`unsupported problem id: ${id}`);
    }
    return node_path_1.default.join(dataDir(), "problems", `${safeId}.json`);
}
function loadProblemRecord(id) {
    const raw = node_fs_1.default.readFileSync(problemFilePath(id), "utf8");
    return JSON.parse(raw);
}
function resetManifestCacheForTests() {
    cachedManifest = null;
}
