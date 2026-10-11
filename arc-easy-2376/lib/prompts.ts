import type { ArcQuestion, ChatMessage } from "./types";

export const SYSTEM_PROMPT =
  "You are an expert answering grade-school science multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";

const LETTERS = "ABCDE";

/** Formats the question and its options with A-E labels. */
export function formatQuestion(question: ArcQuestion): string {
  const lines = [question.question, ""];
  question.options.forEach((option, index) => {
    lines.push(`${LETTERS[index]}) ${option}`);
  });
  return lines.join("\n");
}

export function buildMessages(question: ArcQuestion): ChatMessage[] {
  const validLetters = LETTERS.slice(0, question.options.length).split("").join(", ");
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content:
        "Answer the following multiple-choice question. Think step by step, and end your response with a final line of the form:\n\n" +
        "Answer: <LETTER>\n\n" +
        `where <LETTER> is one of ${validLetters}.\n\n` +
        formatQuestion(question)
    }
  ];
}
