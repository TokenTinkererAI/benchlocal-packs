/**
 * Dataset access for IFEval-541.
 *
 * The 541 prompts live in lib/generated/problems.ts (compiled from the
 * vendored data/ifeval.jsonl); the Python grading harness is a real file that
 * resolves relative to the compiled lib, which works both for the working tree
 * (dist/lib/../.. = repo root) and for installed packs (same layout).
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { PROBLEMS, PROBLEM_COUNT, DATASET_SHA256 } from "./generated/problems";
import type { IfevalProblem } from "./types";

export { PROBLEMS, PROBLEM_COUNT, DATASET_SHA256 };

const byId = new Map<string, IfevalProblem>(PROBLEMS.map((problem) => [problem.id, problem]));

export function packRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function dataDir(): string {
  return path.join(packRoot(), "data");
}

export function harnessPath(): string {
  return path.join(packRoot(), "harness", "run_problem.py");
}

export function getProblem(id: string): IfevalProblem | undefined {
  return byId.get(id);
}

/** Verifies the vendored dataset file is present and unchanged (provenance). */
export function verifyVendoredDataset(): { path: string; sha256: string; lines: number } {
  const datasetPath = path.join(dataDir(), "ifeval.jsonl");
  const raw = fs.readFileSync(datasetPath);
  const sha256 = createHash("sha256").update(raw).digest("hex");
  const lines = raw.toString("utf8").split(/\r?\n/).filter((line) => line.trim() !== "").length;
  return { path: datasetPath, sha256, lines };
}
