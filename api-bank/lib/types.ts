/**
 * Frozen internal contracts for the API-Bank pack.
 */
import type { ScenarioMeta } from "@benchlocal/sdk";

/** One API parameter, as declared by the dataset's API definition. */
export type ApiParam = {
  type: string;
  description: string;
};

/** One callable API, as declared by the dataset. Declared to the model as a tool. */
export type ApiDef = {
  name: string;
  description: string;
  parameters: Record<string, ApiParam>;
  outputs: Record<string, ApiParam>;
};

/** A single call the model is expected to make (api name + JSON-ish arguments). */
export type ExpectedCall = {
  name: string;
  args: Record<string, unknown>;
};

/** A recorded call result: the mock API layer replays it for a matching call. */
export type RecordedCallResult = {
  name: string;
  args: Record<string, unknown>;
  output: unknown;
};

/** One API-Bank scenario: a task plus the call sequence it must produce. */
export type ApiScenario = {
  /** e.g. "L1/0", "L2/3", "L3/7" */
  id: string;
  level: 1 | 2 | 3;
  category: string;
  title: string;
  /** Short human-readable requirement (shown in the scenario card). */
  requirement: string;
  /** The task text handed to the model (dialogue transcript or requirement). */
  task: string;
  /** Names of the APIs in this scenario's catalog (resolved against APIS). */
  toolNames: string[];
  /**
   * True when the model must call ToolSearcher before the task APIs become
   * available (API-Bank levels 2 and 3).
   */
  requiresRetrieval: boolean;
  expectedCalls: ExpectedCall[];
  mockOutputs: RecordedCallResult[];
};

/** A tool call as returned by the model. */
export type ToolCall = {
  id: string;
  name: string;
  /** Raw JSON argument string exactly as the model produced it. */
  argumentsRaw: string;
};

/** A tool call after argument parsing, as executed against the mock layer. */
export type ExecutedCall = {
  id: string;
  name: string;
  args: Record<string, unknown>;
  parsed: boolean;
  error?: string;
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

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_calls?: Array<{ id: string; type: "function"; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
};

/** Parsed model reply. */
export type ModelReply = {
  text: string;
  toolCalls: ToolCall[];
  finishReason?: string;
  raw?: unknown;
};

export type ScenarioCard = ScenarioMeta;
