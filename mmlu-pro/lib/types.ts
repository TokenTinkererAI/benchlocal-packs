/**
 * Frozen internal contracts for the MMLU-Pro pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** MMLU-Pro answer letters (ten-option multiple choice). */
export type MmluLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

/** The 14 MMLU-Pro disciplines / upstream HF category values. */
export type MmluCategory =
  | "business"
  | "law"
  | "psychology"
  | "biology"
  | "chemistry"
  | "history"
  | "other"
  | "health"
  | "economics"
  | "math"
  | "physics"
  | "computer science"
  | "philosophy"
  | "engineering";

/** One MMLU-Pro test question, options already deterministically shuffled. */
export type MmluProProblem = {
  /** e.g. "MMLU-Pro/0" - 0-based position in the vendored test split. */
  id: string;
  /** Upstream `question_id` (stable provenance key used as the shuffle seed part). */
  questionId: number;
  /** Upstream `category` (one of 14 disciplines). */
  category: MmluCategory;
  question: string;
  /** 3-10 options in final display order */
  options: readonly string[];
  /** index of the gold option after the shuffle */
  answerIndex: number;
  /** gold letter after the shuffle */
  answerLetter: MmluLetter;
  /** index of the gold option in the upstream test split (0-9), pre-shuffle */
  upstreamAnswerIndex: number;
  /** Upstream `src` provenance string (e.g. "ori_mmlu-business"). */
  src: string;
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
