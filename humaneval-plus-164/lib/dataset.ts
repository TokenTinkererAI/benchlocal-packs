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
import fs from "node:fs";
import path from "node:path";

import type { DatasetManifest, ProblemMeta } from "./types";

let cachedManifest: DatasetManifest | null = null;
let cachedCanonical: Record<string, string> | null = null;

export function packRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function dataDir(): string {
  return path.join(packRoot(), "data");
}

export function harnessPath(): string {
  return path.join(packRoot(), "harness", "run_problem.py");
}

export function loadManifest(): DatasetManifest {
  if (cachedManifest) {
    return cachedManifest;
  }
  const raw = fs.readFileSync(path.join(dataDir(), "manifest.json"), "utf8");
  cachedManifest = JSON.parse(raw) as DatasetManifest;
  return cachedManifest;
}

export function getScenarioMetas(): ProblemMeta[] {
  return loadManifest().problems;
}

export function getProblemMeta(id: string): ProblemMeta | undefined {
  return loadManifest().problems.find((problem) => problem.id === id);
}

/**
 * Absolute path of one problem's graded record. Only the Python harness reads it.
 *
 * The problem id ("HumanEval/7") is used verbatim as the file stem with "/"
 * replaced by "_", as recorded per problem in the manifest.
 */
export function problemFilePath(id: string): string {
  const meta = getProblemMeta(id);
  if (!meta) {
    throw new Error(`Unknown problem id "${id}".`);
  }
  return path.join(dataDir(), "problems", meta.file);
}

/** Canonical solutions (self-test and mock fixtures only; never used for grading). */
export function loadCanonicalSolutions(): Record<string, string> {
  if (cachedCanonical) {
    return cachedCanonical;
  }
  const raw = fs.readFileSync(path.join(dataDir(), "canonical.json"), "utf8");
  const parsed = JSON.parse(raw) as { canonical: Record<string, string> };
  cachedCanonical = parsed.canonical;
  return cachedCanonical;
}

export function resetDatasetCacheForTests(): void {
  cachedManifest = null;
  cachedCanonical = null;
}
