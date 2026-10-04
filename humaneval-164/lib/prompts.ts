/**
 * Prompt construction for HumanEval-164 model requests.
 */
import type { ChatMessage, HumanEvalProblem } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert Python programmer completing coding benchmark tasks. " +
  "Reply with raw Python code only. Do not include markdown fences, explanations, tests, or example calls.";

export function buildMessages(problem: HumanEvalProblem): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Complete the following Python function so that its behavior is fully implemented:\n\n${problem.prompt}`
    }
  ];
}
