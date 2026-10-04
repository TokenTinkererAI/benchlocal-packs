/**
 * Dataset access for LiveCodeBench-v6.
 *
 * data/manifest.json (light per-problem metadata + source pins) is read once;
 * data/problems/<id>.json holds the full record, read lazily per run.
 * Paths resolve relative to the compiled lib, which works both for the
 * working tree (dist/lib/../.. = repo root) and installed packs
 * (dist/lib/../.. = pack root, where data/ and harness/ also live).
 */
import fs from "node:fs";
import path from "node:path";

import type { LcbManifest, LcbProblemMeta, LcbProblemRecord } from "./types";

let cachedManifest: LcbManifest | null = null;

export function packRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function dataDir(): string {
  return path.join(packRoot(), "data");
}

export function harnessPath(): string {
  return path.join(packRoot(), "harness", "run_problem.py");
}

export function loadManifest(): LcbManifest {
  if (cachedManifest) {
    return cachedManifest;
  }
  const manifestPath = path.join(dataDir(), "manifest.json");
  const raw = fs.readFileSync(manifestPath, "utf8");
  cachedManifest = JSON.parse(raw) as LcbManifest;
  return cachedManifest;
}

export function getProblemMeta(id: string): LcbProblemMeta | undefined {
  return loadManifest().problems.find((problem) => problem.id === id);
}

export function problemFilePath(id: string): string {
  return path.join(dataDir(), "problems", `${id}.json`);
}

export function loadProblemRecord(id: string): LcbProblemRecord {
  const raw = fs.readFileSync(problemFilePath(id), "utf8");
  return JSON.parse(raw) as LcbProblemRecord;
}

export function resetManifestCacheForTests(): void {
  cachedManifest = null;
}
