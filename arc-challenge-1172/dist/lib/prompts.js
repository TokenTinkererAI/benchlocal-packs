"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_PROMPT = void 0;
exports.formatQuestion = formatQuestion;
exports.answerLetters = answerLetters;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert answering grade-school science multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";
const LETTERS = ["A", "B", "C", "D", "E"];
/** Formats the question and its options with A-E labels. */
function formatQuestion(question) {
    const lines = [question.question, ""];
    question.options.forEach((option, index) => {
        lines.push(`${LETTERS[index]}) ${option}`);
    });
    return lines.join("\n");
}
/** The letters valid for this question, in display order. */
function answerLetters(question) {
    return LETTERS.slice(0, question.options.length).join("");
}
/** "A, B, C or D" style list for the instruction line. */
function letterList(letters) {
    const parts = letters.split("");
    if (parts.length <= 1) {
        return parts.join("");
    }
    return `${parts.slice(0, -1).join(", ")} or ${parts[parts.length - 1]}`;
}
function buildMessages(question) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: "Answer the following multiple-choice question. Think step by step, and end your response with a final line of the form:\n\n" +
                "Answer: <LETTER>\n\n" +
                `where <LETTER> is one of ${letterList(answerLetters(question))}.\n\n` +
                formatQuestion(question)
        }
    ];
}
