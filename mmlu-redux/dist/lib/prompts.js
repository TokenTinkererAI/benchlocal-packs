"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LETTERS = exports.SYSTEM_PROMPT = void 0;
exports.formatSubject = formatSubject;
exports.formatQuestion = formatQuestion;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.";
exports.LETTERS = ["A", "B", "C", "D"];
/** "high_school_european_history" -> "high school european history" (MMLU-style subject phrase). */
function formatSubject(subject) {
    return subject.replace(/_/g, " ");
}
/** The MMLU-style option block: `A. <text>` ... `D. <text>`. */
function formatQuestion(problem) {
    const lines = [problem.question, ""];
    problem.options.forEach((option, index) => {
        lines.push(`${exports.LETTERS[index]}. ${option}`);
    });
    return lines.join("\n");
}
function buildMessages(problem) {
    const subject = formatSubject(problem.subject);
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: `The following are multiple choice questions (with answers) about ${subject}.\n\n` +
                `${formatQuestion(problem)}\n\n` +
                "Answer with a single letter (A, B, C or D). End your response with a final line of the form:\n\n" +
                "Answer: <LETTER>\n\n" +
                "where <LETTER> is one of A, B, C or D."
        }
    ];
}
