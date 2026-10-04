"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_PROMPT = void 0;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are a careful math tutor solving grade-school math word problems. Show your step-by-step reasoning, then give the final answer in the required format.";
/**
 * Zero-shot chain-of-thought chat template. The problem comes first and the
 * final-answer instruction last, so the user message ends with the required
 * output format: a final line reading `Answer: ` followed by the number.
 */
function buildMessages(problem) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: `Solve the following grade-school math word problem.\n\n` +
                `${problem.question}\n\n` +
                `Think step by step and show your work. End your response with a final line of exactly the form:\n\n` +
                `Answer: <number>\n\n` +
                `where <number> is the final numeric answer written as a plain number (no units and no currency symbols; use a minus sign for a negative answer). Write nothing after that final line.`
        }
    ];
}
