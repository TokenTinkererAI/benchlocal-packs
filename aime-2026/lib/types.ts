/**
 * Frozen internal contracts for the AIME-2026 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One 2026 AIME problem (2026 AIME I problems 1-15, then 2026 AIME II 1-15). */
export type AimeProblem = {
  /** e.g. "AIME/0" */
  id: string;
  /** "AIME 2026 I" | "AIME 2026 II" */
  contest: string;
  /** problem number within its contest (1..15) */
  number: number;
  /** problem statement, verbatim from the vendored source data */
  problem: string;
  /** gold answer: an integer in 0-999 */
  answer: number;
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

/** Parsed model reply. */
export type ModelReply = {
  text: string;
  finishReason?: string;
  raw?: unknown;
};

export type ProblemScenarioMeta = ScenarioMeta;
