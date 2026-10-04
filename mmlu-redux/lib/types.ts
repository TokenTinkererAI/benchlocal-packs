/**
 * Frozen internal contracts for the MMLU-Redux pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** The four canonical MMLU groups (upstream `categories.py`). */
export type MmluGroup = "stem" | "humanities" | "social_sciences" | "other";

/** One MMLU-Redux verified-correct question, options already deterministically shuffled. */
export type MmluProblem = {
  /** e.g. "MMLU-Redux/0" */
  id: string;
  /** "<subject>#<n>" - stable provenance key used as the shuffle seed part. */
  recordId: string;
  /** MMLU subject / upstream HF config, e.g. "abstract_algebra". */
  subject: string;
  /** Canonical MMLU group derived from the standard subject mapping. */
  group: MmluGroup;
  question: string;
  /** 4 options in final display order */
  options: [string, string, string, string];
  /** index of the gold option after the shuffle */
  answerIndex: 0 | 1 | 2 | 3;
  /** gold letter after the shuffle */
  answerLetter: "A" | "B" | "C" | "D";
  /** index of the gold option in the upstream cais/mmlu key (0-3), pre-shuffle */
  upstreamAnswerIndex: 0 | 1 | 2 | 3;
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
