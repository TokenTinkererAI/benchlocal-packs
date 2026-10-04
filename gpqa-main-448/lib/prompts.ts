import type { ChatMessage, GpqaQuestion } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert scientist answering graduate-level multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";

const LETTERS = ["A", "B", "C", "D"] as const;

/** Formats the question and its options with A-D labels. */
export function formatQuestion(question: GpqaQuestion): string {
  const lines = [question.question, ""];
  question.options.forEach((option, index) => {
    lines.push(`${LETTERS[index]}) ${option}`);
  });
  return lines.join("\n");
}

export function buildMessages(question: GpqaQuestion): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content:
        "Answer the following multiple-choice question. Think step by step, and end your response with a final line of the form:\n\n" +
        "Answer: <LETTER>\n\n" +
        "where <LETTER> is one of A, B, C, D.\n\n" +
        formatQuestion(question)
    }
  ];
}
