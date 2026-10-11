/**
 * Frozen internal contracts for the HMMT-Feb-2026 pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One HMMT February 2026 problem; `answer` is the official gold answer string. */
export type HmmtProblem = {
  /** e.g. "HMMT/0" */
  id: string;
  /** problem_idx from the source table (1..33), the problem's index in the published set */
  number: number;
  /** The problem statement, verbatim from the vendored source data (LaTeX source). */
  problem: string;
  /**
   * The official gold final answer, verbatim from the source `answer` field:
   * a LaTeX expression such as "-\\frac{1}{21}", "420261", "5\\sqrt{5}",
   * "74^\\circ" or "3^{2025}". Compared against the extracted prediction after
   * textual normalization (see lib/normalize.ts) — never evaluated numerically.
   */
  answer: string;
  /**
   * Problem-type labels from the source `problem_type` field. A problem may
   * carry more than one label (e.g. ["Combinatorics", "Geometry"]).
   */
  types: string[];
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
