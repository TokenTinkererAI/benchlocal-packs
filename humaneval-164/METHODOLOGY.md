# Methodology

This document describes how HumanEval-164 evaluates models: the benchmark provenance, the execution model, the prompting and extraction rules, the scoring, how results are reproduced, and the deliberate deviations from the canonical OpenAI harness.

## Benchmark provenance

HumanEval is a set of 164 hand-written Python programming problems introduced in "Evaluating Large Language Models Trained on Code" (Mark Chen et al., 2021; arXiv:2107.03374). Each problem consists of:

- a prompt: module imports, the function signature, and a docstring with examples;
- a test module defining `check(candidate)`, which asserts the required behavior;
- a canonical solution (used by this repository's self-test and mock server, never as model output).

The dataset is vendored from the openai/human-eval repository (MIT license) as `data/HumanEval.jsonl.gz`; a copy of the upstream license is kept at `data/LICENSE-human-eval`.

`npm run build:dataset` expands the dataset into two generated modules: `lib/generated/problems.ts` (prompt and test per problem) and `lib/generated/canonical.ts` (canonical solutions). The transform is deterministic — the same input file produces byte-identical output — and verifies that the file contains exactly 164 records with `task_id` values `HumanEval/0` … `HumanEval/163`. Each generated file records the SHA-256 of the source archive in its header:

```
b796127e635a67f93fb35c04f4cb03cf06f38c8072ee7cee8833d7bee06979ef
```

The generated modules are compiled into the pack, so the pack evaluates exactly this dataset revision.

## Execution model

The pack runs as a module inside BenchLocal and spawns one Python child process per problem; the check program is the only child process involved in scoring.

### Python resolution

The interpreter is resolved once when the pack is prepared, trying candidates in order:

1. `HUMANEVAL164_PYTHON` — explicit override (path or command). If set, it must be valid; otherwise the pack fails with a clear error instead of falling through.
2. `py -3` — the Windows Python launcher (tried on Windows only).
3. `python`
4. `python3`

Each candidate is validated by running `<candidate> -c "import sys; print('%d.%d' % sys.version_info[:2])"` with a 10-second timeout. Resolution requires exit code 0, a `major.minor` version string, and version ≥ 3.8. The Microsoft Store placeholder `python.exe` alias exits non-zero and is therefore rejected. If no candidate validates:

```
Python 3.8+ not found. Install Python or set HUMANEVAL164_PYTHON to its path.
```

### Check program and subprocess

For each problem the pack assembles a single Python program:

1. the reliability guard (below);
2. the problem prompt;
3. the extracted completion;
4. the problem's test module;
5. the call `check(<entry_point>)`.

The program is written as `check.py` (UTF-8) into a fresh temporary directory (`mkdtemp`, prefix `he164-`) and executed as a child process: no shell, `windowsHide`, working directory set to the temp directory, with `PYTHONIOENCODING=utf-8` and `PYTHONDONTWRITEBYTECODE=1`. stdout and stderr are captured with a 256 KiB per-stream bound. The temporary directory is removed afterwards, with a short retry if the filesystem still holds a file.

**Timeout.** The default execution cap is 5000 ms, measured from spawn to process close — it includes interpreter startup. When it fires, the whole process tree is killed (`taskkill /PID <pid> /T /F` on Windows, `SIGKILL` on POSIX) and the outcome is `timed_out`; if no close event arrives afterwards, the pack gives up after a 2-second grace period rather than leaking a child process.

**Outcome mapping.** Exit code 0 → `passed`; non-zero exit → `failed`; kill on timeout → `timed_out`; spawn failure → `spawn_error`. The stderr tail (≤ 4000 characters) and the spawn-to-close duration are recorded with every outcome.

### Reliability guard and the Windows fix

The check program begins with a reliability guard adapted from openai/human-eval (MIT). Like the canonical guard, it disables facilities that would let ordinary benchmark code destroy its own results or interfere with the harness: `builtins.exit`/`quit`/`help`; destructive `os` functions (kill, system, putenv, the remove/rmdir family, setuid, fork/forkpty/killpg, the rename/replace family, the chmod/chown family, chroot, getcwd, chdir); `shutil.rmtree`/`move`/`chown`; and `subprocess.Popen`. It blocks `ipdb`, `joblib`, `resource`, `psutil` and `tkinter` from being imported, disables `faulthandler`, and pins `OMP_NUM_THREADS` to 1.

**The Windows fix.** The canonical guard assigns these names unconditionally — for example `os.fork = None`. On Windows, `os.fork` does not exist, so the assignment *creates* the attribute. CPython's `random` module, at import time, checks `if hasattr(os, "fork")` and then calls `os.register_at_fork(...)`, which does not exist on Windows; the import therefore raises `AttributeError`. Problems whose tests import `random` — `/32`, `/38`, `/50` and `/53` — fail spuriously even with the canonical solution. This pack's guard disables a name only if the running platform actually has it (a `hasattr` check), so on Windows the attribute is never created and `import random` works; on POSIX the same set of functions is disabled as before.

**Not a security boundary.** Neither the canonical guard nor this adaptation is a sandbox. The upstream docstring says it explicitly: "This function is NOT a security sandbox. Untrusted code, including, model-generated code, should not be blindly executed outside of one." The guard is a reliability measure aimed at well-behaved benchmark tests; code that actively tries to escape it can do so. This pack executes submissions as ordinary child processes of the current user, with the same filesystem, network, and environment access as the BenchLocal host, bounded only by the wall-clock cap. Evaluate untrusted models only in a disposable environment you control (a virtual machine or a dedicated machine).

**Memory.** No memory limit is enforced. The canonical guard can apply address-space limits through the POSIX `resource` module when a limit is passed; `resource` does not exist on Windows, and the pack uses a single cross-platform guard, so no memory cap is applied on any platform. Runaway allocations are bounded only by the operating system.

## Prompting protocol

The pack uses chat-completions prompting — a deliberate deviation from the canonical harness, which feeds the raw prompt text to a completion endpoint. Every problem is sent as two messages.

System message (verbatim):

```
You are an expert Python programmer completing coding benchmark tasks. Reply with raw Python code only. Do not include markdown fences, explanations, tests, or example calls.
```

User message (template; `<prompt>` is the problem's canonical prompt):

```
Complete the following Python function so that its behavior is fully implemented:

<prompt>
```

Requests go to `<baseUrl>/chat/completions` with `stream: true` — the reply is a Server-Sent Events stream accumulated client-side (see Transport); a bearer token is sent only when an API key is configured. Sampling defaults, declared in `benchlocal.pack.json`, are `temperature` 0, `max_tokens` 65536 and a 3600-second request timeout. Reasoning models that spend the whole budget on hidden reasoning produce empty or truncated completions; the failure summary says so and points at `max_tokens`. No `stop` sequences are sent (see Deviations); the request body otherwise contains only the fields above, plus `top_p` when one is configured.

## Transport

Requests are made with `stream: true` and the SSE response is accumulated client-side. Reason: Node's built-in `fetch` (undici) enforces a fixed ~300 s response-headers timeout that pack code cannot raise, and non-streaming OpenAI-compatible servers (llama.cpp among them) do not send headers until generation finishes — generations needing more than ~5 minutes would otherwise fail with `fetch failed` regardless of the configured `request_timeout_seconds`. With streaming, headers arrive immediately and the pack's own timeout (default 3600 s) plus the caller's abort signal are the only limits. A non-SSE `application/json` response is still accepted as a fallback for servers or proxies that buffer the stream; the mock server exercises both behaviours (`--json-only` switches it to the non-streaming reply).

## Completion extraction

The assistant's reply is converted to executable code by a deterministic sequence:

1. `\r\n` is normalized to `\n`.
2. If the text contains a Markdown fenced block, the inside of the first block is taken (fence lines removed). Recorded note: "stripped markdown fence".
3. `trimEnd()` only. Leading whitespace is never stripped — indentation is semantic in Python.
4. **Junk truncation.** The completion is cut at the first line, other than the first, that begins at column 0 with `if ` or `print(`. Rationale: the check program runs top to bottom, so statements that execute at import time can affect the test, while trailing `def`/`class`/import lines after the function body are inert — they are never executed once `check()` has returned — so they are kept. Examples: a trailing `print("done")` or `if __name__ == "__main__":` block is truncated; a trailing helper `def` is kept. A cut is never applied to line 0.
5. If the result is empty or whitespace-only it is noted as an `empty completion` and **not executed**: the problem fails immediately with an explanatory summary — `token budget exhausted ... raise max_tokens` when the model hit the output-token cap, otherwise `the model returned no code`.

Extraction notes (fence stripped, truncated at top-level statement, empty completion) appear in the per-problem result.

## Scoring

- Each problem produces a binary result: score 1 when the execution status is `passed` (exit code 0), score 0 otherwise (`failed`, `timed_out`, `spawn_error`).
- pass@1 is `passed / 164`; the run score is that percentage rounded to the nearest integer, i.e. points out of 100. The summary reads `pass@1: <passed>/<total> (<x>%) - <points> points.` The pack registers a single category, `HumanEval (pass@1)`, weight 100.
- Failure detail: the result summary carries the last meaningful stderr line (or `timed out after <ms> ms`, or the spawn error), plus a `completion truncated - raise max_tokens` hint when the model ran out of output tokens; the raw log carries the extraction notes and `finish_reason`, the extracted completion, the execution status and interpreter, and the stderr tail (≤ 4000 characters). Tracebacks are sanitized: the temporary check file appears as `check_program.py`, with no temp paths.
- Model-call failures (endpoint unreachable, non-OK HTTP status, malformed response) are recorded per problem as `provider_error` with the retryable flag set, and score 0. Execution-harness failures are recorded as `execution_error` with the retryable flag set. Neither kind is silently skipped; a run containing provider errors is not a valid pass@1 measurement for that model.

## Reproducibility

- `npm run selftest` builds the CLI and runs `cli/selftest.ts`. Phase 1 executes every problem with its canonical solution through the same execution path the pack uses. Phase 2 runs three negative controls on `HumanEval/0`:
  1. completion `return False` → expected `failed`;
  2. completion `while True: pass` with a 2000 ms cap → expected `timed_out`;
  3. completion `import os; return os.system('echo guard-check')` → expected `failed` with `NoneType` in stderr (the guard disabled `os.system`).
- A passing run ends with exactly:

  `SELFTEST PASS: 164/164 canonical, 3/3 controls`

  (with `--limit N`, the first phase runs a subset and the controls are skipped).
- The dataset transform is deterministic and the dataset SHA-256 is recorded in the generated headers, so the evaluated problem set can be re-derived from `data/HumanEval.jsonl.gz` and checked.
- Prompt construction and completion extraction have their own fixture checks in `scripts/check-model-layer.mjs` (8 fixtures covering fenced blocks, full-prompt echoes, trailing executed statements, and inert definitions).

## Deviations from the canonical harness

The pack departs from the reference implementation in five deliberate ways. Each one is a design choice with a documented reason; together they mean scores from this pack are not expected to match raw-completion harness numbers exactly.

1. **Chat-wrapped prompting** (canonical: raw completion of the prompt text). The pack targets the OpenAI-compatible chat endpoints configured in BenchLocal, so the instruction is an explicit system message and the problem goes in a user message. Templating stays in one place (`lib/prompts.ts`), and the request works against chat-only servers.
2. **5000 ms execution cap** (canonical: 3000 ms). The cap covers process spawn; a cold `python` start on Windows can consume a large fraction of a 3-second budget, so the default is raised to keep the limit about the code rather than interpreter startup. Runs can set a different cap.
3. **Adapted reliability guard** (canonical: unconditional assignment). The `hasattr` check fixes the Windows `os.fork` / `import random` trap described above.
4. **No stop sequences; post-hoc truncation.** No `stop` field is sent; junk in the reply is removed deterministically after it arrives (see Completion extraction). Truncation behavior does not depend on how a given server implements stop sequences.
5. **No memory cap** (canonical: optional POSIX `resource` limits). The cross-platform guard applies no memory limit, and Windows has no `resource`-module equivalent. See Execution model.

## Why this pack has no Docker verifier

BenchLocal can run pack checks inside container-based verifiers for packs that need them. The official CLI-40 and BugFind-15 execution packs use that path because their checks exercise Linux shell behavior and therefore need a Linux environment.

HumanEval does not. The benchmark's check is pure Python: the canonical harness itself evaluates a completion by executing it inside a guarded Python process, not inside an OS container. HumanEval-164 follows the same idea with a local subprocess, so the pack requires only a Python 3.8+ interpreter and declares `"verification": false` in its manifest — no verifier container is requested and no Docker installation is needed.

The trade-off is explicit and is why the trust-model notes above matter: without a container there is no isolation boundary around the executed code. The reliability guard reduces the chance that ordinary, well-behaved test code interferes with the harness; it does not constrain deliberately malicious code, and it does not limit memory. For evaluating untrusted models, run the pack in a disposable environment.
