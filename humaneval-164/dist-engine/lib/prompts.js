"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_PROMPT = void 0;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert Python programmer completing coding benchmark tasks. " +
    "Reply with raw Python code only. Do not include markdown fences, explanations, tests, or example calls.";
function buildMessages(problem) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        {
            role: "user",
            content: `Complete the following Python function so that its behavior is fully implemented:\n\n${problem.prompt}`
        }
    ];
}
