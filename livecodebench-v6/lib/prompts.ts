/**
 * Prompt construction for LiveCodeBench-v6.
 *
 * Mirrors lcb_runner's OpenAI-chat code-generation template verbatim
 * (lcb_runner/prompts/code_generation.py, MIT - LiveCodeBench) so scores are
 * comparable with runs from the official harness.
 */
import type { ChatMessage, LcbProblemRecord } from "./types";

export const SYSTEM_MESSAGE =
  "You are an expert Python programmer. You will be given a question (problem specification) and will generate a correct Python program that matches the specification and passes all tests.";

export const FORMATTING_MESSAGE_WITH_STARTER_CODE =
  "You will use the following starter code to write the solution to the problem and enclose your code within delimiters.";

export const FORMATTING_WITHOUT_STARTER_CODE =
  "Read the inputs from stdin solve the problem and write the answer to stdout (do not directly test on the sample inputs). Enclose your code within delimiters as follows. Ensure that when the python program runs, it reads the inputs, runs the algorithm and writes output to STDOUT.";

/** Official generic question template (OpenAIChat). */
export function buildUserPrompt(record: Pick<LcbProblemRecord, "question_content" | "starter_code">): string {
  let prompt = `### Question:\n${record.question_content}\n\n`;
  if (record.starter_code) {
    prompt += `### Format: ${FORMATTING_MESSAGE_WITH_STARTER_CODE}\n`;
    prompt += `\`\`\`python\n${record.starter_code}\n\`\`\`\n\n`;
  } else {
    prompt += `### Format: ${FORMATTING_WITHOUT_STARTER_CODE}\n`;
    prompt += "```python\n# YOUR CODE HERE\n```\n\n";
  }
  prompt += "### Answer: (use the provided format with backticks)\n\n";
  return prompt;
}

export function buildMessages(record: Pick<LcbProblemRecord, "question_content" | "starter_code">): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_MESSAGE },
    { role: "user", content: buildUserPrompt(record) }
  ];
}
