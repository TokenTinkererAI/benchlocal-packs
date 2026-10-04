/**
 * Frozen internal contracts for the IFEval-541 pack.
 */

/** JSON-safe instruction kwargs as they appear in the vendored dataset. */
export type IfevalKwargValue = string | number | string[];
export type IfevalKwargs = Record<string, IfevalKwargValue>;

/** One dataset row, compiled into lib/generated/problems.ts. */
export type IfevalProblem = {
  /** Pack scenario id: `IFEval/<index>` (0-based, dataset file order). */
  id: string;
  /** Upstream dataset `key` (informational). */
  key: number;
  /** The prompt, verbatim. Sent as the single user message. */
  prompt: string;
  /** Instruction ids graded for this prompt. */
  instructionIds: string[];
  /** One kwargs entry per instruction id. */
  kwargs: IfevalKwargs[];
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

/** Spec written to a scratch dir and handed to harness/run_problem.py. */
export type HarnessSpec = {
  problem_id: string;
  key: number;
  prompt: string;
  instruction_id_list: string[];
  kwargs: IfevalKwargs[];
  response: string;
};

/** JSON the Python harness prints after ###RESULT###. */
export type HarnessResult = {
  verdict: "pass" | "fail" | "error";
  strict?: boolean;
  loose?: boolean;
  total?: number;
  instruction_ids?: string[];
  strict_instruction_flags?: boolean[];
  loose_instruction_flags?: boolean[];
  strict_failed?: string[];
  loose_failed?: string[];
  error?: string;
  elapsed_s?: number;
};

export type ExecutionOutcome =
  | { kind: "graded"; harness: HarnessResult }
  | { kind: "timed_out"; timeoutMs: number }
  | { kind: "spawn_error"; message: string }
  | { kind: "harness_error"; message: string; stderrTail: string };
