/**
 * Local Python execution for HumanEval-164.
 *
 * Each submission is written to a fresh temp directory as `check.py` and run in
 * a child Python process. This is a reliability guard, not a security boundary:
 * the adapted guard below disables destructive/blocking functions that would
 * interfere with the test, and the process tree is killed on timeout.
 */
import { execFile, spawn, type ChildProcess } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { CheckOutcome, HumanEvalProblem, PythonInterpreter } from "./types";

export const EXEC_TIMEOUT_MS_DEFAULT = 5000;

const STREAM_CAPTURE_LIMIT_BYTES = 256 * 1024;
const STDERR_TAIL_CHARS = 4000;
const KILL_GRACE_MS = 2000;
const CLEANUP_RETRY_DELAY_MS = 150;

/**
 * Reliability guard, adapted from openai/human-eval (MIT).
 *
 * The `hasattr` check is deliberate: the original disables e.g. `os.fork`
 * unconditionally, which on Windows *creates* the attribute and then breaks
 * `import random` (its `if hasattr(_os, "fork")` guard calls the nonexistent
 * `os.register_at_fork`). Only functions the platform actually has are disabled.
 */
const GUARD = `import faulthandler as _hev_fh
_hev_fh.disable()
import builtins as _hev_b
_hev_b.exit = None
_hev_b.quit = None
_hev_b.help = None
import os as _hev_os
_hev_os.environ["OMP_NUM_THREADS"] = "1"
for _hev_name in [
    "kill", "system", "putenv", "remove", "removedirs", "rmdir", "fchdir",
    "setuid", "fork", "forkpty", "killpg", "rename", "renames", "truncate",
    "replace", "unlink", "fchmod", "fchown", "chmod", "chown", "chroot",
    "lchflags", "lchmod", "lchown", "getcwd", "chdir",
]:
    if hasattr(_hev_os, _hev_name):
        setattr(_hev_os, _hev_name, None)
import shutil as _hev_sh
_hev_sh.rmtree = None
_hev_sh.move = None
_hev_sh.chown = None
import subprocess as _hev_sp
_hev_sp.Popen = None
import sys as _hev_sys
for _hev_m in ["ipdb", "joblib", "resource", "psutil", "tkinter"]:
    _hev_sys.modules[_hev_m] = None`;

export function buildCheckProgram(problem: HumanEvalProblem, completion: string): string {
  return `${GUARD}\n${problem.prompt}${completion}\n${problem.test}\ncheck(${problem.entryPoint})\n`;
}

function killProcessTree(child: ChildProcess): void {
  if (child.pid === undefined) {
    return;
  }
  if (process.platform === "win32") {
    execFile("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true }, () => {
      // Ignore failures; the grace timeout resolves the check either way.
    });
    return;
  }
  try {
    child.kill("SIGKILL");
  } catch {
    // Already gone.
  }
}

function executeScript(
  python: PythonInterpreter,
  scriptPath: string,
  cwd: string,
  timeoutMs: number
): Promise<CheckOutcome> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let settled = false;
    let timedOut = false;
    let spawnFailure: Error | null = null;
    let stdoutBytes = 0;
    let stderrBytes = 0;
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    let timeoutTimer: NodeJS.Timeout | undefined;
    let graceTimer: NodeJS.Timeout | undefined;

    const settle = (status: CheckOutcome["status"], exitCode: number | null): void => {
      if (settled) {
        return;
      }
      settled = true;
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }
      if (graceTimer) {
        clearTimeout(graceTimer);
      }
      const stderrText = Buffer.concat(stderrChunks)
        .toString("utf8")
        .split(scriptPath).join("check_program.py")
        .split(scriptPath.replaceAll("\\", "/")).join("check_program.py");
      resolve({
        status,
        exitCode,
        durationMs: Date.now() - startedAt,
        stderrTail: stderrText.slice(-STDERR_TAIL_CHARS)
      });
    };

    let child: ChildProcess;
    try {
      child = spawn(python.command, [...python.args, scriptPath], {
        cwd,
        windowsHide: true,
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONDONTWRITEBYTECODE: "1" }
      });
    } catch (error) {
      spawnFailure = error instanceof Error ? error : new Error(String(error));
      settle("spawn_error", null);
      return;
    }

    child.stdout?.on("data", (chunk: Buffer) => {
      if (stdoutBytes >= STREAM_CAPTURE_LIMIT_BYTES) {
        return;
      }
      const remaining = STREAM_CAPTURE_LIMIT_BYTES - stdoutBytes;
      const kept = chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
      if (kept.length > 0) {
        stdoutChunks.push(kept);
        stdoutBytes += kept.length;
      }
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      if (stderrBytes >= STREAM_CAPTURE_LIMIT_BYTES) {
        return;
      }
      const remaining = STREAM_CAPTURE_LIMIT_BYTES - stderrBytes;
      const kept = chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
      if (kept.length > 0) {
        stderrChunks.push(kept);
        stderrBytes += kept.length;
      }
    });

    child.on("error", (error: Error) => {
      spawnFailure = spawnFailure ?? error;
      if (!timedOut && !settled) {
        settle("spawn_error", null);
      }
    });

    child.on("close", (code: number | null) => {
      if (settled) {
        return;
      }
      if (timedOut) {
        settle("timed_out", code);
        return;
      }
      if (spawnFailure) {
        settle("spawn_error", code);
        return;
      }
      settle(code === 0 ? "passed" : "failed", code);
    });

    timeoutTimer = setTimeout(() => {
      timedOut = true;
      killProcessTree(child);
      graceTimer = setTimeout(() => {
        settle("timed_out", null);
      }, KILL_GRACE_MS);
    }, timeoutMs);
  });
}

async function cleanupTempDir(dir: string): Promise<void> {
  const remove = async (): Promise<void> => {
    await rm(dir, { recursive: true, force: true });
  };
  try {
    await remove();
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EBUSY" || code === "EPERM") {
      await new Promise((resolve) => setTimeout(resolve, CLEANUP_RETRY_DELAY_MS));
      try {
        await remove();
      } catch {
        // Swallow: a stale temp dir is preferable to masking the check result.
      }
    }
  }
}

export async function runCheck(
  python: PythonInterpreter,
  problem: HumanEvalProblem,
  completion: string,
  options?: { timeoutMs?: number }
): Promise<CheckOutcome> {
  const timeoutMs = options?.timeoutMs ?? EXEC_TIMEOUT_MS_DEFAULT;
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "he164-"));
  const scriptPath = path.join(tempDir, "check.py");

  try {
    await writeFile(scriptPath, buildCheckProgram(problem, completion), { encoding: "utf8" });
    return await executeScript(python, scriptPath, tempDir, timeoutMs);
  } finally {
    await cleanupTempDir(tempDir);
  }
}
