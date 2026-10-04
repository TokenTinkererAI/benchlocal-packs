/**
 * Frozen internal contracts for the HumanEval-164 pack.
 * Module owners build against these signatures; keep them stable.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One HumanEval problem, as vendored from openai/human-eval. */
export type HumanEvalProblem = {
  /** e.g. "HumanEval/0" */
  id: string;
  /** numeric problem index, 0..163 */
  number: number;
  /** e.g. "has_close_elements" */
  entryPoint: string;
  /** canonical prompt (imports + signature + docstring) */
  prompt: string;
  /** canonical test source; defines check(candidate) */
  test: string;
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

/** Result of executing one submission. */
export type CheckOutcome = {
  status: "passed" | "failed" | "timed_out" | "spawn_error";
  exitCode: number | null;
  durationMs: number;
  /** bounded stderr tail (<= 4000 chars) */
  stderrTail: string;
};

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

/** Scenario metadata used by listScenarios() and the CLI. */
export type HumanEvalScenarioMeta = ScenarioMeta;
