/**
 * Local Python interpreter discovery for the MBPP+-378 pack.
 *
 * Resolution order (first candidate that validates wins; result cached in-module):
 *   1. MBPP378_PYTHON (explicit override; an invalid value fails hard)
 *   2. py -3   (Windows launcher; win32 only)
 *   3. python
 *   4. python3
 *
 * Validation runs `-c "import sys; print('%d.%d' % sys.version_info[:2])"`,
 * requires exit 0, a `major.minor` line and version >= 3.9 (the harness keeps
 * 3.9 compatibility). This also rejects the Microsoft Store stub automatically
 * (it exits non-zero with a message).
 */
import { execFile, spawn, type ChildProcess } from "node:child_process";

import type { PythonInterpreter } from "./types";

const PROBE_CODE = "import sys; print('%d.%d' % sys.version_info[:2])";
const PROBE_TIMEOUT_MS = 10_000;
const PROBE_STDOUT_LIMIT = 4096;
const MIN_VERSION: readonly [number, number] = [3, 9];

type PythonCandidate = {
  command: string;
  args: string[];
};

let cachedInterpreter: PythonInterpreter | null = null;

function fallbackCandidates(): PythonCandidate[] {
  const candidates: PythonCandidate[] = [];
  if (process.platform === "win32") {
    candidates.push({ command: "py", args: ["-3"] });
  }
  candidates.push({ command: "python", args: [] });
  candidates.push({ command: "python3", args: [] });
  return candidates;
}

function killProcessTree(child: ChildProcess): void {
  if (child.pid === undefined) {
    return;
  }
  if (process.platform === "win32") {
    execFile("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true }, () => {
      // Best effort; the probe falls through to the grace timeout anyway.
    });
    return;
  }
  try {
    child.kill("SIGKILL");
  } catch {
    // Already gone.
  }
}

function probeCandidate(candidate: PythonCandidate): Promise<PythonInterpreter | null> {
  return new Promise((resolve) => {
    let settled = false;
    let timedOut = false;
    let stdout = "";
    let child: ChildProcess | null = null;
    let timer: NodeJS.Timeout | undefined;

    const finish = (value: PythonInterpreter | null): void => {
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
      child = spawn(candidate.command, [...candidate.args, "-c", PROBE_CODE], {
        windowsHide: true,
        shell: false,
        stdio: ["ignore", "pipe", "ignore"]
      });
    } catch {
      finish(null);
      return;
    }

    child.stdout?.on("data", (chunk: Buffer) => {
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
      const version: [number, number] = [Number.parseInt(match[1], 10), Number.parseInt(match[2], 10)];
      if (version[0] < MIN_VERSION[0] || (version[0] === MIN_VERSION[0] && version[1] < MIN_VERSION[1])) {
        finish(null);
        return;
      }
      const display = `${candidate.command} ${candidate.args.join(" ")}`.trim();
      finish({ command: candidate.command, args: [...candidate.args], version, display });
    });
  });
}

export async function resolvePython(): Promise<PythonInterpreter> {
  if (cachedInterpreter) {
    return cachedInterpreter;
  }

  const override = process.env.MBPP378_PYTHON;
  if (typeof override === "string" && override.trim() !== "") {
    const resolved = await probeCandidate({ command: override, args: [] });
    if (!resolved) {
      throw new Error(
        `MBPP378_PYTHON is set to "${override}" but that is not a working Python 3.9+ interpreter. ` +
          "Fix the value or unset the variable."
      );
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

  throw new Error("Python 3.9+ not found. Install Python or set MBPP378_PYTHON to its path.");
}

export function resetPythonCacheForTests(): void {
  cachedInterpreter = null;
}
