"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_PROMPT = void 0;
exports.formatQuestion = formatQuestion;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert scientist answering graduate-level multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";
const LETTERS = ["A", "B", "C", "D"];
/** Formats the question and its options with A-D labels. */
function formatQuestion(question) {
    const lines = [question.question, ""];
    question.options.forEach((option, index) => {
        lines.push(`${LETTERS[index]}) ${option}`);
    });
    return lines.join("\n");
}
function buildMessages(question) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: "Answer the following multiple-choice question. Think step by step, and end your response with a final line of the form:\n\n" +
                "Answer: <LETTER>\n\n" +
                "where <LETTER> is one of A, B, C, D.\n\n" +
                formatQuestion(question)
        }
    ];
}
