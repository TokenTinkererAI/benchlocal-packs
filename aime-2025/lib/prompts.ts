/**
 * Zero-shot competition-math chat template for AIME-2025.
 *
 * Single sample, no tools, no few-shot exemplars: the model is asked to solve
 * the problem step by step and to terminate with a machine-checkable final
 * line. The exact wording is part of the benchmark definition and is
 * reproduced verbatim in METHODOLOGY.md; scripts/check-extraction.mjs asserts
 * these strings have not drifted.
 */
import type { AimeProblem, ChatMessage } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert competition mathematician. Work through the problem carefully, then give your final answer in the required format.";

/** The user-message wrapper around every problem statement. */
export const ANSWER_INSTRUCTION =
  "Solve the problem step by step. The answer is an integer from 0 to 999. End your response with a final line of the form:\n" +
  "\n" +
  "Answer: 123\n" +
  "\n" +
  "where 123 is your final answer as an integer.";

/** The problem text as sent to the model (verbatim, no rewriting). */
export function formatProblem(problem: AimeProblem): string {
  return problem.problem;
}

export function buildMessages(problem: AimeProblem): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `${ANSWER_INSTRUCTION}\n\nProblem:\n${formatProblem(problem)}` }
  ];
}
