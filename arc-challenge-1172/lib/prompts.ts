import type { ArcQuestion, ChatMessage } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert answering grade-school science multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";

const LETTERS = ["A", "B", "C", "D", "E"] as const;

/** Formats the question and its options with A-E labels. */
export function formatQuestion(question: ArcQuestion): string {
  const lines = [question.question, ""];
  question.options.forEach((option, index) => {
    lines.push(`${LETTERS[index]}) ${option}`);
  });
  return lines.join("\n");
}

/** The letters valid for this question, in display order. */
export function answerLetters(question: ArcQuestion): string {
  return LETTERS.slice(0, question.options.length).join("");
}

/** "A, B, C or D" style list for the instruction line. */
function letterList(letters: string): string {
  const parts = letters.split("");
  if (parts.length <= 1) {
    return parts.join("");
  }
  return `${parts.slice(0, -1).join(", ")} or ${parts[parts.length - 1]}`;
}

export function buildMessages(question: ArcQuestion): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content:
        "Answer the following multiple-choice question. Think step by step, and end your response with a final line of the form:\n\n" +
        "Answer: <LETTER>\n\n" +
        `where <LETTER> is one of ${letterList(answerLetters(question))}.\n\n` +
        formatQuestion(question)
    }
  ];
}
