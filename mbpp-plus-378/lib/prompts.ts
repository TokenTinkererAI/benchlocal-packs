/**
 * Prompt construction for MBPP+-378 model requests.
 *
 * MBPP+ problems are handed over as the original MBPP task text (the docstring
 * with its sample assertions) and the model must answer with the complete
 * function in a fenced code block. This is a chat, zero-shot deviation from
 * EvalPlus's own `evalplus.codegen` flow (which prompts for a self-contained
 * script and then extracts code with tree-sitter) - see METHODOLOGY.md.
 */
import type { ChatMessage, MbppProblemRecord } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert Python programmer. You will be given a programming task and must write " +
  "a complete, correct Python solution.";

export const USER_INSTRUCTION =
  "Please provide a self-contained Python script that solves the following problem in a " +
  "markdown code block:";

export function buildUserPrompt(
  problem: Pick<MbppProblemRecord, "prompt" | "entry_point">
): string {
  return [
    USER_INSTRUCTION,
    "",
    problem.prompt.trim(),
    "",
    `The code block must define the function \`${problem.entry_point}\` with exactly that name ` +
      "(including its `def` line and any imports it needs). Do not include tests or example calls."
  ].join("\n");
}

export function buildMessages(
  problem: Pick<MbppProblemRecord, "prompt" | "entry_point">
): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: buildUserPrompt(problem) }
  ];
}
