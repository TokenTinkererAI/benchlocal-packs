/**
 * Prompt construction for HumanEval+-164 model requests.
 *
 * Identical to the HumanEval-164 pack's wrapper: grading uses the expanded
 * EvalPlus test suites, but the request stays a chat completion of the same
 * canonical prompt so the two packs' scores are directly comparable (see
 * METHODOLOGY - "Relationship to the HumanEval-164 pack").
 */
import type { ChatMessage, ProblemMeta } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert Python programmer completing coding benchmark tasks. " +
  "Reply with raw Python code only. Do not include markdown fences, explanations, tests, or example calls.";

export function buildMessages(problem: Pick<ProblemMeta, "prompt">): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Complete the following Python function so that its behavior is fully implemented:\n\n${problem.prompt}`
    }
  ];
}
