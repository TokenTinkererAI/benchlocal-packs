/**
 * Frozen internal contracts for the GPQA-Main-448 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One GPQA question, options already deterministically shuffled. */
export type GpqaQuestion = {
  /** e.g. "GPQA/0" */
  id: string;
  /** upstream Record ID (provenance) */
  recordId: string;
  question: string;
  /** 4 options in final display order */
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  answerLetter: "A" | "B" | "C" | "D";
  /** High-level domain (Physics / Chemistry / Biology) */
  domain: string;
  subdomain: string;
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
