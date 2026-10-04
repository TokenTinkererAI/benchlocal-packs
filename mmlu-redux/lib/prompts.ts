import type { ChatMessage, MmluProblem } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.";

export const LETTERS = ["A", "B", "C", "D"] as const;

/** "high_school_european_history" -> "high school european history" (MMLU-style subject phrase). */
export function formatSubject(subject: string): string {
  return subject.replace(/_/g, " ");
}

/** The MMLU-style option block: `A. <text>` ... `D. <text>`. */
export function formatQuestion(problem: MmluProblem): string {
  const lines = [problem.question, ""];
  problem.options.forEach((option, index) => {
    lines.push(`${LETTERS[index]}. ${option}`);
  });
  return lines.join("\n");
}

export function buildMessages(problem: MmluProblem): ChatMessage[] {
  const subject = formatSubject(problem.subject);
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content:
        `The following are multiple choice questions (with answers) about ${subject}.\n\n` +
        `${formatQuestion(problem)}\n\n` +
        "Answer with a single letter (A, B, C or D). End your response with a final line of the form:\n\n" +
        "Answer: <LETTER>\n\n" +
        "where <LETTER> is one of A, B, C or D."
    }
  ];
}
