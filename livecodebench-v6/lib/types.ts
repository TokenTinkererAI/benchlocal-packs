/**
 * Frozen internal contracts for the LiveCodeBench-v6 pack.
 */

/** Per-problem metadata from data/manifest.json (no heavy fields). */
export type LcbProblemMeta = {
  id: string;
  title: string;
  platform: string;
  difficulty: string;
  contestDate: string;
  contestId: string;
  hasStarter: boolean;
  /** LeetCode-style function name; null for stdin problems. */
  fnName: string | null;
  nPublic: number;
  bytes: number;
};

export type LcbManifest = {
  dataset: string;
  release: string;
  count: number;
  sources: Array<{ file: string; sha256: string; lines: number }>;
  problems: LcbProblemMeta[];
};

/** One full problem record, read from data/problems/<id>.json. */
export type LcbProblemRecord = {
  question_title: string;
  question_content: string;
  platform: string;
  question_id: string;
  contest_id: string;
  contest_date: string;
  starter_code: string;
  difficulty: string;
  /** JSON string: array of {input, output, testtype} - plaintext. */
  public_test_cases: string;
  /** Opaque string: plaintext JSON or zlib+base64 wrapped pickle of a JSON
   * string (decrypted by the Python harness, mirroring upstream). */
  private_test_cases: string;
  /** JSON string; may contain func_name. */
  metadata: string;
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

/** One graded test result entry: true | -2 (WA) | -3 (TLE) | -4 (RE). */
export type HarnessTestResult = boolean | number;

/** JSON the Python harness prints after ###RESULT###. */
export type HarnessResult = {
  verdict: "pass" | "fail" | "error";
  total: number;
  results: HarnessTestResult[];
  passed_count: number;
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
