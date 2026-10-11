import type { BenchScenario, ChatMessage } from "./types";

/**
 * System instruction for the tool-calling task.
 *
 * The dataset's function documents are supplied through the request's `tools`
 * field (native tool calling), so the instruction only has to state the task
 * and the irrelevance rule — the schemas travel with the request.
 */
export const SYSTEM_PROMPT =
  "You are a function-calling assistant. You are given one or more functions. " +
  "When the user's request requires a function, invoke the appropriate function or functions, " +
  "each with correctly typed arguments. " +
  "If none of the available functions is relevant to the request, do not call any function; " +
  "answer the user in plain text instead.";

export function buildMessages(scenario: BenchScenario): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: scenario.user }
  ];
}
