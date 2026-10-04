/**
 * Frozen internal contracts for the MBPP+-378 pack.
 */

/** Per-problem metadata from data/manifest.json (no heavy fields). */
export type MbppProblemMeta = {
  /** EvalPlus task id, e.g. "Mbpp/2". */
  id: string;
  /** File under data/problems/ holding the full record. */
  file: string;
  /** First description line of the task text. */
  title: string;
  entryPoint: string;
  /** EvalPlus float tolerance for this task (0 unless the task needs one). */
  atol: number;
  nBase: number;
  nPlus: number;
  /** Longest canonical call over the base/plus suite (build-time measurement). */
  maxRefBaseS: number;
  maxRefPlusS: number;
  bytes: number;
};

export type MbppManifest = {
  dataset: string;
  release: string;
  source: { file: string; sha256: string; records: number };
  count: number;
  problems: MbppProblemMeta[];
};

/**
 * The light view of one problem record (data/problems/<id>.json). The heavy
 * fields (base_input / plus_input / base_expected / plus_expected, encoded with
 * the {"__t": ...} codec) are read only by the Python harness and are
 * deliberately not typed here.
 */
export type MbppProblemRecord = {
  schema: string;
  id: string;
  task_id: string;
  entry_point: string;
  atol: number;
  prompt: string;
  canonical_solution: string;
  contract: string;
  assertion: string;
  n_base: number;
  n_plus: number;
  max_ref_base_s: number;
  max_ref_plus_s: number;
  source: {
    dataset: string;
    release: string;
    file: string;
    sha256: string;
    record_sha256: string;
  };
};

export type PythonInterpreter = {
  command: string;
  args: string[];
  version: [number, number];
  display: string;
};

/** Chat-completion settings resolved from BenchLocal / CLI. */
export type ModelSettings = {
  baseUrl: string;
  authMode: "none" | "bearer";
  apiKey?: string;
  model: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  timeoutMs?: number;
};

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ModelReply = {
  text: string;
  finishReason?: string;
  raw?: unknown;
};

/** One graded phase (the base or the plus suite), mirroring EvalPlus statuses. */
export type HarnessPhase = {
  status: "pass" | "fail" | "timeout";
  passed: number;
  total: number;
  evaluated: number;
  failures: Array<{ index: number; error: string }>;
};

/** JSON the Python harness prints after ###RESULT###. */
export type HarnessResult = {
  verdict: "pass" | "fail" | "error";
  total: number;
  passed_count: number;
  results: boolean[];
  base?: HarnessPhase;
  plus?: HarnessPhase;
  detail?: Record<string, unknown>;
  error?: string;
  elapsed_s?: number;
};

export type ExecutionOutcome =
  | { kind: "passed"; harness: HarnessResult }
  | { kind: "failed"; harness: HarnessResult }
  | { kind: "timed_out"; timeoutMs: number }
  | { kind: "spawn_error"; message: string }
  | { kind: "harness_error"; message: string; stderrTail: string };
