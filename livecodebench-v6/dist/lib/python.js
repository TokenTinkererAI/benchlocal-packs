"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePython = resolvePython;
exports.resetPythonCacheForTests = resetPythonCacheForTests;
/**
 * Local Python interpreter discovery for the LiveCodeBench-v6 pack.
 *
 * Resolution order (first candidate that validates wins; result cached in-module):
 *   1. LCBV6_PYTHON (explicit override; an invalid value fails hard)
 *   2. py -3   (Windows launcher; win32 only)
 *   3. python
 *   4. python3
 *
 * Validation runs `-c "import sys; print('%d.%d' % sys.version_info[:2])"`,
 * requires exit 0, a `major.minor` line and version >= 3.9 (the harness uses
 * ast.unparse). This rejects the Microsoft Store stub automatically (it exits
 * non-zero with a message).
 */
const node_child_process_1 = require("node:child_process");
const PROBE_CODE = "import sys; print('%d.%d' % sys.version_info[:2])";
const PROBE_TIMEOUT_MS = 10_000;
const PROBE_STDOUT_LIMIT = 4096;
const MIN_VERSION = [3, 9];
let cachedInterpreter = null;
function fallbackCandidates() {
    const candidates = [];
    if (process.platform === "win32") {
        candidates.push({ command: "py", args: ["-3"] });
    }
    candidates.push({ command: "python", args: [] });
    candidates.push({ command: "python3", args: [] });
    return candidates;
}
function killProcessTree(child) {
    if (child.pid === undefined) {
        return;
    }
    if (process.platform === "win32") {
        (0, node_child_process_1.execFile)("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true }, () => {
            // Best effort; the probe will fall through to the grace timeout anyway.
        });
        return;
    }
    try {
        child.kill("SIGKILL");
    }
    catch {
        // Already gone.
    }
}
function probeCandidate(candidate) {
    return new Promise((resolve) => {
        let settled = false;
        let timedOut = false;
        let stdout = "";
        let child = null;
        let timer;
        const finish = (value) => {
            if (settled) {
                return;
            }
            settled = true;
            if (timer) {
                clearTimeout(timer);
            }
            resolve(value);
        };
        timer = setTimeout(() => {
            timedOut = true;
            if (child) {
                killProcessTree(child);
            }
            finish(null);
        }, PROBE_TIMEOUT_MS);
        try {
            child = (0, node_child_process_1.spawn)(candidate.command, [...candidate.args, "-c", PROBE_CODE], {
                windowsHide: true,
                shell: false,
                stdio: ["ignore", "pipe", "ignore"]
            });
        }
        catch {
            finish(null);
            return;
        }
        child.stdout?.on("data", (chunk) => {
            if (stdout.length >= PROBE_STDOUT_LIMIT) {
                return;
            }
            stdout += chunk.toString("utf8").slice(0, PROBE_STDOUT_LIMIT - stdout.length);
        });
        child.on("error", () => {
            finish(null);
        });
        child.on("close", (code) => {
            if (timedOut) {
                return;
            }
            if (code !== 0) {
                finish(null);
                return;
            }
            const match = stdout.trim().match(/^(\d+)\.(\d+)$/);
            if (!match) {
                finish(null);
                return;
            }
            const version = [Number.parseInt(match[1], 10), Number.parseInt(match[2], 10)];
            if (version[0] < MIN_VERSION[0] || (version[0] === MIN_VERSION[0] && version[1] < MIN_VERSION[1])) {
                finish(null);
                return;
            }
            const display = `${candidate.command} ${candidate.args.join(" ")}`.trim();
            finish({ command: candidate.command, args: [...candidate.args], version, display });
        });
    });
}
async function resolvePython() {
    if (cachedInterpreter) {
        return cachedInterpreter;
    }
    const override = process.env.LCBV6_PYTHON;
    if (typeof override === "string" && override.trim() !== "") {
        const resolved = await probeCandidate({ command: override, args: [] });
        if (!resolved) {
            throw new Error(`LCBV6_PYTHON is set to "${override}" but that is not a working Python 3.9+ interpreter. ` +
                "Fix the value or unset the variable.");
        }
        cachedInterpreter = resolved;
        return resolved;
    }
    for (const candidate of fallbackCandidates()) {
        const resolved = await probeCandidate(candidate);
        if (resolved) {
            cachedInterpreter = resolved;
            return resolved;
        }
    }
    throw new Error("Python 3.9+ not found. Install Python or set LCBV6_PYTHON to its path.");
}
function resetPythonCacheForTests() {
    cachedInterpreter = null;
}
