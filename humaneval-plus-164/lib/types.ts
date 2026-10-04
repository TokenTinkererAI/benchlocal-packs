/**
 * Frozen internal contracts for the HumanEval+-164 pack.
 * Module owners build against these signatures; keep them stable.
 */

/** One problem's entry in data/manifest.json (light metadata + prompt). */
export type ProblemMeta = {
  /** e.g. "HumanEval/0" */
  id: string;
  /** numeric problem index, 0..163 */
  number: number;
  /** e.g. "has_close_elements" */
  entryPoint: string;
  /** file name inside data/problems/ */
  file: string;
  /** "HumanEval/0 - has_close_elements" */
  title: string;
  /** first docstring line, for the scenario card */
  description: string;
  /** canonical prompt (imports + signature + docstring) */
  prompt: string;
  /** absolute tolerance used by the comparison for this problem */
  atol: number;
  /** number of original HumanEval tests that are graded */
  baseTests: number;
  /** number of EvalPlus tests that are graded */
  plusTests: number;
  /** inputs dropped by the build-time reference gate (see METHODOLOGY) */
  excludedInputs: number;
};

export type DatasetManifest = {
  schemaVersion: number;
  pack: string;
  version: string;
  dataset: string;
  problems: ProblemMeta[];
  counts: { problems: number; baseTests: number; plusTests: number };
  problemFilePattern: string;
  source: Record<string, unknown>;
  expectedOutputs: Record<string, unknown>;
  exclusions: { count: number; problems: Array<{ task_id: string; excluded: unknown[] }>; policy: string };
};

/** Resolved local Python interpreter used for execution. */
export type PythonInterpreter = {
  command: string;
  args: string[];
  /** major.minor for validated interpreters, null for direct CLI override */
  version: [number, number] | null;
  /** human-readable path/command for logs */
  display: string;
};

/** The harness's single result line. */
export type HarnessResult = {
  verdict: "pass" | "fail" | "timeout" | "error";
  base_status: "pass" | "fail" | "timeout" | "skipped" | "error";
  plus_status: "pass" | "fail" | "timeout" | "skipped" | "error";
  base_tests?: number;
  plus_tests?: number;
  task_id?: string;
  elapsed_s?: number;
  error?: string;
  detail?: {
    kind: string;
    test_index?: number;
    tests?: number;
    suite?: string;
    message?: string;
    error?: string;
    input?: string;
    expected?: string;
    got?: string;
    limit_seconds?: number;
  };
};

/** Result of executing one submission through harness/run_problem.py. */
export type ExecutionOutcome =
  | { kind: "passed"; harness: HarnessResult; durationMs: number }
  | { kind: "failed"; harness: HarnessResult; durationMs: number }
  | { kind: "timed_out"; timeoutMs: number; durationMs: number }
  | { kind: "harness_error"; message: string; stderrTail: string; durationMs: number }
  | { kind: "spawn_error"; message: string; durationMs: number };

/** Chat-completion settings resolved from BenchLocal / CLI. */
export type ModelSettings = {
  baseUrl: string;
  authMode: "none" | "bearer";
  apiKey?: string;
  /** model name sent in the request body */
  model: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  timeoutMs?: number;
};

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/** Parsed model reply. */
export type ModelReply = {
  text: string;
  finishReason?: string;
  raw?: unknown;
};
