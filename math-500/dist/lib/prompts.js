"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSWER_INSTRUCTION = exports.SYSTEM_PROMPT = void 0;
exports.formatProblem = formatProblem;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert competition mathematician. Work through the problem carefully, then give your final answer in the required format.";
/** The user-message wrapper around every problem statement. */
exports.ANSWER_INSTRUCTION = "Solve the problem step by step, showing your full reasoning. End your response with a final line of the form:\n" +
    "\n" +
    "\\boxed{answer}\n" +
    "\n" +
    "where answer is your final answer written as a LaTeX expression (for example \\boxed{\\frac{3}{4}} or \\boxed{42}). Write nothing after that final line.";
/** The problem text as sent to the model (verbatim, no rewriting). */
function formatProblem(problem) {
    return problem.problem;
}
function buildMessages(problem) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        { role: "user", content: `${exports.ANSWER_INSTRUCTION}\n\nProblem:\n${formatProblem(problem)}` }
    ];
}
