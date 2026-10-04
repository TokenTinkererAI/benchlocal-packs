#!/usr/bin/env node
/**
 * check-checkers.mjs - resolve the pack's Python interpreter and run the
 * in-process checker unit test (scripts/check_checkers.py).
 *
 * Usage: npm run check:checkers
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { resolvePython } = require("../dist-cli/lib/python.js");
const { harnessPath, packRoot, verifyVendoredDataset, DATASET_SHA256, PROBLEM_COUNT } = require(
  "../dist-cli/lib/dataset.js"
);

const python = await resolvePython();
const dataset = verifyVendoredDataset();
console.log(`python: ${python.display} (${python.version.join(".")})`);
console.log(`harness: ${harnessPath()}`);
console.log(`pack root: ${packRoot()}`);
console.log(
  `dataset: ${dataset.lines} records, sha256 ${dataset.sha256}` +
    (dataset.sha256 === DATASET_SHA256 ? " (matches pinned source)" : " (MISMATCH!)")
);
if (dataset.sha256 !== DATASET_SHA256 || dataset.lines !== PROBLEM_COUNT) {
  console.error("error: vendored dataset does not match the pinned generator input");
  process.exit(1);
}
console.log("");

const result = spawnSync(
  python.command,
  [...python.args, path.join(REPO_ROOT, "scripts", "check_checkers.py")],
  { stdio: "inherit", cwd: REPO_ROOT }
);

if (result.error) {
  console.error(`error: failed to run the checker test: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
