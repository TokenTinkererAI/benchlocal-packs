/**
 * Frozen internal contracts for the BFCL-v3 pack.
 *
 * The pack evaluates Berkeley Function Calling Leaderboard (BFCL) v3 phase-1
 * categories: single-turn, non-live scenarios graded by comparing the model's
 * emitted tool calls against the dataset's ground-truth calls (AST match).
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** A tool/function document as it appears in the dataset (`function` field). */
export type BenchFunction = {
  name: string;
  description?: string;
  parameters: {
    type?: string;
    properties?: Record<string, SchemaProperty>;
    required?: string[];
  };
};

export type SchemaProperty = {
  type?: string;
  description?: string;
  items?: { type?: string };
};

/**
 * One ground-truth call: function name -> { parameter -> list of acceptable
 * values }. A listed `""` value marks the parameter optional.
 */
export type GoldCall = Record<string, Record<string, unknown[]>>;

/** One evaluated scenario (one dataset line). */
export type BenchScenario = {
  /** dataset id, e.g. "parallel_multiple_17" */
  id: string;
  /** dataset category, e.g. "parallel_multiple" */
  category: string;
  /** the single-turn user message */
  user: string;
  /** tool documents exposed to the model (names normalised for the wire) */
  functions: BenchFunction[];
  /** expected calls; an empty list means "no call" (irrelevance category) */
  gold: GoldCall[];
};

/** Compact per-scenario index entry used to build UI cards without loading data. */
export type ScenarioIndexEntry = {
  id: string;
  category: string;
  fnNames: string[];
  user: string;
};

export type DatasetManifest = {
  revision: string;
  license: string;
  categories: Array<{ id: string; label: string; count: number }>;
  /** Upstream entries left out of the graded set, with the reason. */
  excludedScenarios: Array<{ id: string; category: string; reason: string }>;
  scenarios: ScenarioIndexEntry[];
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

/** A tool call emitted by the model. */
export type ToolCall = { name: string; arguments: string };

/** Parsed model reply. */
export type ModelReply = {
  /** assistant text content (usually empty for tool-calling replies) */
  text: string;
  /** tool calls, in emission order */
  toolCalls: ToolCall[];
  finishReason?: string;
  raw?: unknown;
};

export type ScenarioMetaCard = ScenarioMeta;
