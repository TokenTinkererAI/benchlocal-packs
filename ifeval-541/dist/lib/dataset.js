"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATASET_SHA256 = exports.PROBLEM_COUNT = exports.PROBLEMS = void 0;
exports.packRoot = packRoot;
exports.dataDir = dataDir;
exports.harnessPath = harnessPath;
exports.getProblem = getProblem;
exports.verifyVendoredDataset = verifyVendoredDataset;
/**
 * Dataset access for IFEval-541.
 *
 * The 541 prompts live in lib/generated/problems.ts (compiled from the
 * vendored data/ifeval.jsonl); the Python grading harness is a real file that
 * resolves relative to the compiled lib, which works both for the working tree
 * (dist/lib/../.. = repo root) and for installed packs (same layout).
 */
const node_crypto_1 = require("node:crypto");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const problems_1 = require("./generated/problems");
Object.defineProperty(exports, "PROBLEMS", { enumerable: true, get: function () { return problems_1.PROBLEMS; } });
Object.defineProperty(exports, "PROBLEM_COUNT", { enumerable: true, get: function () { return problems_1.PROBLEM_COUNT; } });
Object.defineProperty(exports, "DATASET_SHA256", { enumerable: true, get: function () { return problems_1.DATASET_SHA256; } });
const byId = new Map(problems_1.PROBLEMS.map((problem) => [problem.id, problem]));
function packRoot() {
    return node_path_1.default.resolve(__dirname, "..", "..");
}
function dataDir() {
    return node_path_1.default.join(packRoot(), "data");
}
function harnessPath() {
    return node_path_1.default.join(packRoot(), "harness", "run_problem.py");
}
function getProblem(id) {
    return byId.get(id);
}
/** Verifies the vendored dataset file is present and unchanged (provenance). */
function verifyVendoredDataset() {
    const datasetPath = node_path_1.default.join(dataDir(), "ifeval.jsonl");
    const raw = node_fs_1.default.readFileSync(datasetPath);
    const sha256 = (0, node_crypto_1.createHash)("sha256").update(raw).digest("hex");
    const lines = raw.toString("utf8").split(/\r?\n/).filter((line) => line.trim() !== "").length;
    return { path: datasetPath, sha256, lines };
}
