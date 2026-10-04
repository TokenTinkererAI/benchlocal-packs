"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_INSTRUCTION = exports.SYSTEM_PROMPT = void 0;
exports.buildUserPrompt = buildUserPrompt;
exports.buildMessages = buildMessages;
exports.SYSTEM_PROMPT = "You are an expert Python programmer. You will be given a programming task and must write " +
    "a complete, correct Python solution.";
exports.USER_INSTRUCTION = "Please provide a self-contained Python script that solves the following problem in a " +
    "markdown code block:";
function buildUserPrompt(problem) {
    return [
        exports.USER_INSTRUCTION,
        "",
        problem.prompt.trim(),
        "",
        `The code block must define the function \`${problem.entry_point}\` with exactly that name ` +
            "(including its `def` line and any imports it needs). Do not include tests or example calls."
    ].join("\n");
}
function buildMessages(problem) {
    return [
        { role: "system", content: exports.SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(problem) }
    ];
}
