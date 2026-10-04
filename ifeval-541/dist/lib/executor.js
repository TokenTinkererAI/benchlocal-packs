"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESULT_MARKER = void 0;
exports.parseHarnessStdout = parseHarnessStdout;
exports.executeGrading = executeGrading;
/**
 * Execution layer for IFEval-541: one Python subprocess per scenario running
 * harness/run_problem.py with the response + that problem's instruction ids
 * and kwargs.
 *
 * The harness grades with vendored, unmodified upstream IFEval checker code
 * (stdlib only + vendored pure-Python packages), so there is no untrusted
 * model code here; the subprocess boundary exists for crash isolation,
 * timeouts and a hard wall-clock cap.  The cap is enforced here by killing the
 * process tree.
 */
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_os_1 = require("node:os");
const node_path_1 = __importDefault(require("node:path"));
exports.RESULT_MARKER = "###RESULT###";
const STDOUT_LIMIT = 256 * 1024;
const STDERR_LIMIT = 64 * 1024;
const KILL_GRACE_MS = 2000;
function killProcessTree(child) {
    if (child.pid === undefined) {
        return;
    }
    if (process.platform === "win32") {
        (0, node_child_process_1.execFile)("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true }, () => {
            // best effort; the grace timer still completes the run
        });
        return;
    }
    try {
        child.kill("SIGKILL");
    }
    catch {
        // already gone
    }
}
function parseHarnessStdout(stdout) {
    const lines = stdout.split(/\r?\n/);
    for (let i = lines.length - 1; i >= 0; i -= 1) {
        const line = lines[i];
        const markerIndex = line.lastIndexOf(exports.RESULT_MARKER);
        if (markerIndex >= 0) {
            try {
                return JSON.parse(line.slice(markerIndex + exports.RESULT_MARKER.length));
            }
            catch {
                return null;
            }
        }
    }
    return null;
}
function executeGrading(options) {
    const execTimeoutMs = options.execTimeoutMs ?? 120_000;
    let tempDir;
    try {
        tempDir = (0, node_fs_1.mkdtempSync)(node_path_1.default.join((0, node_os_1.tmpdir)(), "ifeval541-"));
    }
    catch (error) {
        return Promise.resolve({
            kind: "spawn_error",
            message: `could not create temp directory: ${error instanceof Error ? error.message : String(error)}`
        });
    }
    const specPath = node_path_1.default.join(tempDir, "spec.json");
    try {
        (0, node_fs_1.writeFileSync)(specPath, JSON.stringify(options.spec), "utf8");
    }
    catch (error) {
        cleanup(tempDir);
        return Promise.resolve({
            kind: "spawn_error",
            message: `could not write run spec: ${error instanceof Error ? error.message : String(error)}`
        });
    }
    return new Promise((resolve) => {
        let settled = false;
        let timedOut = false;
        let stdout = "";
        let stderr = "";
        let child = null;
        let timer;
        let graceTimer;
        const finish = (outcome) => {
            if (settled) {
                return;
            }
            settled = true;
            if (timer) {
                clearTimeout(timer);
            }
            if (graceTimer) {
                clearTimeout(graceTimer);
            }
            cleanup(tempDir);
            resolve(outcome);
        };
        timer = setTimeout(() => {
            timedOut = true;
            if (child) {
                killProcessTree(child);
            }
            graceTimer = setTimeout(() => {
                finish({ kind: "timed_out", timeoutMs: execTimeoutMs });
            }, KILL_GRACE_MS);
        }, execTimeoutMs);
        try {
            child = (0, node_child_process_1.spawn)(options.python.command, [...options.python.args, options.harnessScriptPath, specPath], {
                cwd: tempDir,
                windowsHide: true,
                shell: false,
                stdio: ["ignore", "pipe", "pipe"],
                env: {
                    ...process.env,
                    PYTHONIOENCODING: "utf-8",
                    PYTHONDONTWRITEBYTECODE: "1"
                }
            });
        }
        catch (error) {
            finish({
                kind: "spawn_error",
                message: `failed to spawn Python: ${error instanceof Error ? error.message : String(error)}`
            });
            return;
        }
        child.stdout?.on("data", (chunk) => {
            if (stdout.length < STDOUT_LIMIT) {
                stdout += chunk.toString("utf8").slice(0, STDOUT_LIMIT - stdout.length);
            }
        });
        child.stderr?.on("data", (chunk) => {
            if (stderr.length < STDERR_LIMIT) {
                stderr += chunk.toString("utf8").slice(0, STDERR_LIMIT - stderr.length);
            }
        });
        child.on("error", (error) => {
            finish({ kind: "spawn_error", message: error.message });
        });
        child.on("close", () => {
            if (timedOut) {
                finish({ kind: "timed_out", timeoutMs: execTimeoutMs });
                return;
            }
            const stderrTail = stderr.slice(-4000);
            const harness = parseHarnessStdout(stdout);
            if (!harness) {
                finish({
                    kind: "harness_error",
                    message: "no harness result found on stdout",
                    stderrTail
                });
                return;
            }
            if (harness.verdict === "error") {
                finish({
                    kind: "harness_error",
                    message: harness.error ?? "harness reported an error",
                    stderrTail
                });
                return;
            }
            finish({ kind: "graded", harness });
        });
    });
}
function cleanup(tempDir) {
    try {
        (0, node_fs_1.rmSync)(tempDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
    }
    catch {
        // best effort
    }
}
