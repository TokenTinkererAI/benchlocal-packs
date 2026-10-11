/**
 * Frozen internal contracts for the ARC-Challenge-1172 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** A choice letter as displayed by the pack (3-5 options upstream). */
export type AnswerLetter = "A" | "B" | "C" | "D" | "E";

/** One ARC-Challenge question, options already deterministically shuffled. */
export type ArcQuestion = {
  /** e.g. "ARC/0" */
  id: string;
  /** upstream record id (provenance) */
  recordId: string;
  question: string;
  /** 3-5 options in final display order */
  options: readonly string[];
  answerIndex: number;
  answerLetter: AnswerLetter;
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
