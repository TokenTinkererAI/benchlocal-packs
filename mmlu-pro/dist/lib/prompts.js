"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSWER_INSTRUCTION = exports.LETTERS = exports.SYSTEM_PROMPT = void 0;
exports.formatQuestion = formatQuestion;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert answering multiple-choice questions from many academic subjects. Think through the problem, then give your final answer in the required format.";
exports.LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
/**
 * The core instruction of the official MMLU-Pro evaluation prompt
 * (TIGER-AI-Lab/MMLU-Pro, eval prompts), replicated verbatim for zero-shot
 * chat. The official 5-shot CoT template ("The following are multiple choice
 * questions (with answers) about {category}. ...") is not used - this pack is
 * zero-shot, single-sample, with shuffled options; see METHODOLOGY.md.
 */
exports.ANSWER_INSTRUCTION = 'Answer the following multiple choice question. Think step by step and then finish your answer with "The answer is (X)" where X is the correct letter choice.';
/** The MMLU-Pro question block: `Question: <text>` + `Options:` + `A. <text>` ... (up to J). */
function formatQuestion(problem) {
    const lines = [`Question: ${problem.question}`, "", "Options:"];
    problem.options.forEach((option, index) => {
        lines.push(`${exports.LETTERS[index]}. ${option}`);
    });
    return lines.join("\n");
}
function buildMessages(problem) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: `${exports.ANSWER_INSTRUCTION}\n\n${formatQuestion(problem)}\n\nAnswer:`
        }
    ];
}
