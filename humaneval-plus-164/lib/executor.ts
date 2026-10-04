/**
 * Execution layer for HumanEval+-164: one Python subprocess per problem running
 * harness/run_problem.py against that problem's base+plus suites.
 *
 * Not a security sandbox (same trust model as EvalPlus's own harness): the
 * subprocess runs model-generated code behind a reliability guard, with a
 * per-test watchdog and a global soft deadline inside the harness, plus the
 * wall-clock cap enforced here by killing the process tree.
 */
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import type { ExecutionOutcome, HarnessResult, PythonInterpreter } from "./types";

export const RESULT_MARKER = "###RESULT###";

/**
 * Wall-clock cap per problem. The harness self-limits to EvalPlus's
 * `min(60s, sum(per-test limits)) + 1s` global deadline; this is the backstop
 * for a hang inside a single C call, where neither the watchdog nor the
 * between-tests deadline check can fire.
 */
export const EXEC_TIMEOUT_MS_DEFAULT = 90_000;

const STDOUT_LIMIT = 256 * 1024;
const STDERR_LIMIT = 64 * 1024;
const KILL_GRACE_MS = 2000;

export type ExecuteOptions = {
  python: PythonInterpreter;
  harnessScriptPath: string;
  problemFile: string;
  completion: string;
  /** per-test floor in seconds (EvalPlus DEFAULT_MIN_TIME_LIMIT) */
  minTimeLimit?: number;
  /** multiplier applied to the reference runtime (EvalPlus DEFAULT_GT_TIME_LIMIT_FACTOR) */
  gtTimeLimitFactor?: number;
  /** wall-clock cap enforced here (default 90000 ms) */
  execTimeoutMs?: number;
};

function killProcessTree(child: ChildProcess): void {
  if (child.pid === undefined) {
    return;
  }
  if (process.platform === "win32") {
    execFile("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true }, () => {
      // best effort; the grace timer still completes the run
    });
    return;
  }
  try {
    child.kill("SIGKILL");
  } catch {
    // already gone
  }
}

export function parseHarnessStdout(stdout: string): HarnessResult | null {
  const lines = stdout.split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i];
    const markerIndex = line.lastIndexOf(RESULT_MARKER);
    if (markerIndex >= 0) {
      try {
        return JSON.parse(line.slice(markerIndex + RESULT_MARKER.length)) as HarnessResult;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function executeCompletion(options: ExecuteOptions): Promise<ExecutionOutcome> {
  const execTimeoutMs = options.execTimeoutMs ?? EXEC_TIMEOUT_MS_DEFAULT;
  const startedAt = Date.now();

  let tempDir: string;
  try {
    tempDir = mkdtempSync(path.join(tmpdir(), "heplus164-"));
  } catch (error) {
    return Promise.resolve({
      kind: "spawn_error",
      message: `could not create temp directory: ${error instanceof Error ? error.message : String(error)}`,
      durationMs: Date.now() - startedAt
    });
  }

  const specPath = path.join(tempDir, "spec.json");
  try {
    writeFileSync(
      specPath,
      JSON.stringify({
        problem_file: options.problemFile,
        completion: options.completion,
        min_time_limit: options.minTimeLimit,
        gt_time_limit_factor: options.gtTimeLimitFactor
      }),
      "utf8"
    );
  } catch (error) {
    cleanup(tempDir);
    return Promise.resolve({
      kind: "spawn_error",
      message: `could not write run spec: ${error instanceof Error ? error.message : String(error)}`,
      durationMs: Date.now() - startedAt
    });
  }

  return new Promise<ExecutionOutcome>((resolve) => {
    let settled = false;
    let timedOut = false;
    let stdout = "";
    let stderr = "";
    let child: ChildProcess | null = null;
    let timer: NodeJS.Timeout | undefined;
    let graceTimer: NodeJS.Timeout | undefined;

    const finish = (outcome: ExecutionOutcome): void => {
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
        finish({ kind: "timed_out", timeoutMs: execTimeoutMs, durationMs: Date.now() - startedAt });
      }, KILL_GRACE_MS);
    }, execTimeoutMs);

    try {
      child = spawn(options.python.command, [...options.python.args, options.harnessScriptPath, specPath], {
        cwd: tempDir,
        windowsHide: true,
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
        env: {
          ...process.env,
          // Reproducible set/dict iteration order between the build-time ground
          // truth and grading (documented deviation; upstream does not pin it).
          PYTHONHASHSEED: "0",
          PYTHONIOENCODING: "utf-8",
          PYTHONDONTWRITEBYTECODE: "1"
        }
      });
    } catch (error) {
      finish({
        kind: "spawn_error",
        message: `failed to spawn Python: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - startedAt
      });
      return;
    }

    child.stdout?.on("data", (chunk: Buffer) => {
      if (stdout.length < STDOUT_LIMIT) {
        stdout += chunk.toString("utf8").slice(0, STDOUT_LIMIT - stdout.length);
      }
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      if (stderr.length < STDERR_LIMIT) {
        stderr += chunk.toString("utf8").slice(0, STDERR_LIMIT - stderr.length);
      }
    });

    child.on("error", (error) => {
      finish({
        kind: "spawn_error",
        message: error.message,
        durationMs: Date.now() - startedAt
      });
    });

    child.on("close", () => {
      const durationMs = Date.now() - startedAt;
      if (timedOut) {
        finish({ kind: "timed_out", timeoutMs: execTimeoutMs, durationMs });
        return;
      }
      const stderrTail = sanitizeTraceback(stderr.slice(-4000), specPath);
      const harness = parseHarnessStdout(stdout);
      if (!harness) {
        finish({
          kind: "harness_error",
          message: "no harness result found on stdout",
          stderrTail,
          durationMs
        });
        return;
      }
      if (harness.verdict === "error") {
        finish({
          kind: "harness_error",
          message: harness.error ?? "harness reported an error",
          stderrTail,
          durationMs
        });
        return;
      }
      finish(
        harness.verdict === "pass"
          ? { kind: "passed", harness, durationMs }
          : { kind: "failed", harness, durationMs }
      );
    });
  });
}

/** Keep a temp path out of user-facing failure details. */
function sanitizeTraceback(text: string, specPath: string): string {
  const dir = path.dirname(specPath);
  return text.split(specPath).join("run_spec.json").split(dir).join("<temp>");
}

function cleanup(tempDir: string): void {
  try {
    rmSync(tempDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  } catch {
    // best effort
  }
}
