/**
 * Frozen internal contracts for the TruthfulQA-817 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One TruthfulQA MC1 question, answer choices already deterministically shuffled. */
export type TruthfulQaQuestion = {
  /** e.g. "TQA/0" */
  id: string;
  question: string;
  /** the mc1 answer choices (2-13 of them) in final display order */
  options: string[];
  /** index of the true choice within `options` */
  answerIndex: number;
  /** letter label of the true choice ("A".."M") */
  answerLetter: string;
};

/** How many answer choices a question presents (2-13). */
export function letterCountOf(question: TruthfulQaQuestion): number {
  return question.options.length;
}

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
