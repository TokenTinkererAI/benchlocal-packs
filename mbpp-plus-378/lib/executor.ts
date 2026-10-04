/**
 * Execution layer for MBPP+-378: one Python subprocess per problem running
 * harness/run_problem.py against the problem's base + plus input suites.
 *
 * Not a security sandbox (same trust model as the canonical EvalPlus harness):
 * the subprocess runs model-generated code behind the reliability guard, with a
 * per-input watchdog inside the harness and a wall-clock cap enforced here by
 * killing the whole process tree.
 */
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import type { ExecutionOutcome, HarnessResult, PythonInterpreter } from "./types";

export const RESULT_MARKER = "###RESULT###";
const STDOUT_LIMIT = 256 * 1024;
const STDERR_LIMIT = 64 * 1024;
const KILL_GRACE_MS = 2000;

export type ExecuteOptions = {
  python: PythonInterpreter;
  harnessScriptPath: string;
  problemFile: string;
  code: string;
  /** evalplus --min_time_limit equivalent (default 4.0 s, harness side). */
  minTimeLimitS?: number;
  /** evalplus --gt_time_limit_factor equivalent (default 4.0). */
  gtTimeLimitFactor?: number;
  /** evalplus EVALPLUS_TIMEOUT_PER_TASK equivalent (default 60 s per phase). */
  timeoutPerTaskS?: number;
  /** wall-clock cap enforced here; the harness self-limits too (default 300000 ms) */
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

export function executeCode(options: ExecuteOptions): Promise<ExecutionOutcome> {
  const execTimeoutMs = options.execTimeoutMs ?? 300_000;

  let tempDir: string;
  try {
    tempDir = mkdtempSync(path.join(tmpdir(), "mbpp378-"));
  } catch (error) {
    return Promise.resolve({
      kind: "spawn_error",
      message: `could not create temp directory: ${error instanceof Error ? error.message : String(error)}`
    });
  }

  const specPath = path.join(tempDir, "spec.json");
  try {
    writeFileSync(
      specPath,
      JSON.stringify({
        problem_file: options.problemFile,
        code: options.code,
        min_time_limit_s: options.minTimeLimitS,
        gt_time_limit_factor: options.gtTimeLimitFactor,
        timeout_per_task_s: options.timeoutPerTaskS
      }),
      "utf8"
    );
  } catch (error) {
    cleanup(tempDir);
    return Promise.resolve({
      kind: "spawn_error",
      message: `could not write run spec: ${error instanceof Error ? error.message : String(error)}`
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
        finish({ kind: "timed_out", timeoutMs: execTimeoutMs });
      }, KILL_GRACE_MS);
    }, execTimeoutMs);

    try {
      child = spawn(
        options.python.command,
        [...options.python.args, options.harnessScriptPath, specPath],
        {
          cwd: tempDir,
          windowsHide: true,
          shell: false,
          stdio: ["ignore", "pipe", "pipe"],
          env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8",
            PYTHONDONTWRITEBYTECODE: "1"
          }
        }
      );
    } catch (error) {
      finish({
        kind: "spawn_error",
        message: `failed to spawn Python: ${error instanceof Error ? error.message : String(error)}`
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
      finish(
        harness.verdict === "pass" ? { kind: "passed", harness } : { kind: "failed", harness }
      );
    });
  });
}

function cleanup(tempDir: string): void {
  try {
    rmSync(tempDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  } catch {
    // best effort
  }
}
