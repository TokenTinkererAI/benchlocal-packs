"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_PROMPT = void 0;
exports.optionLetters = optionLetters;
exports.formatQuestion = formatQuestion;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are a helpful, truthful assistant answering multiple-choice questions. Think through the problem carefully, then give your final answer in the required format.";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/** Letter labels for a question with `count` answer choices. */
function optionLetters(count) {
    return ALPHABET.slice(0, count).split("");
}
/** Formats the question and its options with A.. labels. */
function formatQuestion(question) {
    const letters = optionLetters(question.options.length);
    const lines = [question.question, ""];
    question.options.forEach((option, index) => {
        lines.push(`${letters[index]}) ${option}`);
    });
    return lines.join("\n");
}
function buildMessages(question) {
    const letters = optionLetters(question.options.length);
    const range = letters.length === 1 ? letters[0] : `${letters[0]}, ${letters.slice(1).join(", ")}`;
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: "Answer the following multiple-choice question. Exactly one of the options is true; the rest are common misconceptions. " +
                "Think step by step, and end your response with a final line of the form:\n\n" +
                "Answer: <LETTER>\n\n" +
                `where <LETTER> is one of ${range}.\n\n` +
                formatQuestion(question)
        }
    ];
}
