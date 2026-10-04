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
import fs from "node:fs";
import path from "node:path";

import type { MbppManifest, MbppProblemMeta, MbppProblemRecord } from "./types";

let cachedManifest: MbppManifest | null = null;

export function packRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function dataDir(): string {
  return path.join(packRoot(), "data");
}

export function harnessPath(): string {
  return path.join(packRoot(), "harness", "run_problem.py");
}

export function loadManifest(): MbppManifest {
  if (cachedManifest) {
    return cachedManifest;
  }
  const manifestPath = path.join(dataDir(), "manifest.json");
  cachedManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as MbppManifest;
  return cachedManifest;
}

export function getProblemMeta(id: string): MbppProblemMeta | undefined {
  return loadManifest().problems.find((problem) => problem.id === id);
}

/** data/problems/<task_id with '/' -> '_'>.json */
export function problemFilePath(id: string): string {
  const meta = getProblemMeta(id);
  if (meta) {
    return path.join(dataDir(), "problems", meta.file);
  }
  const safeId = id.replace(/\//g, "_");
  if (!/^[A-Za-z0-9_.-]+$/.test(safeId)) {
    throw new Error(`unsupported problem id: ${id}`);
  }
  return path.join(dataDir(), "problems", `${safeId}.json`);
}

export function loadProblemRecord(id: string): MbppProblemRecord {
  const raw = fs.readFileSync(problemFilePath(id), "utf8");
  return JSON.parse(raw) as MbppProblemRecord;
}

export function resetManifestCacheForTests(): void {
  cachedManifest = null;
}
