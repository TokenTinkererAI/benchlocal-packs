/**
 * Frozen internal contracts for the MATH-500 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One MATH-500 problem; `answer` is the upstream gold answer string. */
export type MathProblem = {
  /** e.g. "MATH/0" */
  id: string;
  /** The competition-math problem statement, verbatim (LaTeX source). */
  problem: string;
  /**
   * The published gold answer, verbatim from the MATH-500 `answer` field:
   * a LaTeX expression such as "\\frac{14}{3}", "-50", "90^\\circ" or
   * "\\text{east}". Compared against the extracted prediction after textual
   * normalization (see lib/normalize.ts) — never evaluated numerically.
   */
  answer: string;
  /** MATH subject area, e.g. "Algebra" or "Counting & Probability". */
  subject: string;
  /** Difficulty level 1-5 as published by MATH. */
  level: number;
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
