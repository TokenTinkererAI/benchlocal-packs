/**
 * Frozen internal contracts for the GSM8K-1319 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One GSM8K test problem; `finalNumber` is the parsed gold answer. */
export type Gsm8kProblem = {
  /** e.g. "GSM8K/0" */
  id: string;
  /** The word problem, verbatim from the upstream test split. */
  question: string;
  /**
   * The number after the '#### ' marker in the upstream reference answer,
   * normalized (commas and `$` stripped; integral values are integers).
   */
  finalNumber: number;
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

export type QuestionScenarioMeta = ScenarioMeta;
