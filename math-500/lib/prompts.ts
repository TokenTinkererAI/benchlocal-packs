/**
 * Zero-shot competition-math chat template for MATH-500.
 *
 * Single sample, no tools, no few-shot exemplars: the model is asked to solve
 * the problem step by step and to terminate with a machine-checkable final
 * line — the final answer inside \boxed{...}. The exact wording is part of
 * the benchmark definition and is reproduced verbatim in METHODOLOGY.md;
 * scripts/check-extraction.mjs asserts these strings have not drifted.
 */
import type { ChatMessage, MathProblem } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert competition mathematician. Work through the problem carefully, then give your final answer in the required format.";

/** The user-message wrapper around every problem statement. */
export const ANSWER_INSTRUCTION =
  "Solve the problem step by step, showing your full reasoning. End your response with a final line of the form:\n" +
  "\n" +
  "\\boxed{answer}\n" +
  "\n" +
  "where answer is your final answer written as a LaTeX expression (for example \\boxed{\\frac{3}{4}} or \\boxed{42}). Write nothing after that final line.";

/** The problem text as sent to the model (verbatim, no rewriting). */
export function formatProblem(problem: MathProblem): string {
  return problem.problem;
}

export function buildMessages(problem: MathProblem): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `${ANSWER_INSTRUCTION}\n\nProblem:\n${formatProblem(problem)}` }
  ];
}
