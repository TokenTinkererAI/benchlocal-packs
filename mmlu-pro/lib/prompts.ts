import type { ChatMessage, MmluProProblem } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.";

export const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

/**
 * The core instruction of the official MMLU-Pro evaluation prompt
 * (TIGER-AI-Lab/MMLU-Pro, eval prompts), replicated verbatim for zero-shot
 * chat. The official 5-shot CoT template ("The following are multiple choice
 * questions (with answers) about {category}. ...") is not used - this pack is
 * zero-shot, single-sample, with shuffled options; see METHODOLOGY.md.
 */
export const ANSWER_INSTRUCTION =
  'Answer the following multiple choice question. Think step by step and then finish your answer with "The answer is (X)" where X is the correct letter choice.';

/** The MMLU-Pro question block: `Question: <text>` + `Options:` + `A. <text>` ... (up to J). */
export function formatQuestion(problem: MmluProProblem): string {
  const lines = [`Question: ${problem.question}`, "", "Options:"];
  problem.options.forEach((option, index) => {
    lines.push(`${LETTERS[index]}. ${option}`);
  });
  return lines.join("\n");
}

export function buildMessages(problem: MmluProProblem): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `${ANSWER_INSTRUCTION}\n\n${formatQuestion(problem)}\n\nAnswer:`
    }
  ];
}
