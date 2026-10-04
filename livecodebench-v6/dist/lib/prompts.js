"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORMATTING_WITHOUT_STARTER_CODE = exports.FORMATTING_MESSAGE_WITH_STARTER_CODE = exports.SYSTEM_MESSAGE = void 0;
exports.buildUserPrompt = buildUserPrompt;
exports.buildMessages = buildMessages;
exports.SYSTEM_MESSAGE = "You are an expert Python programmer. You will be given a question (problem specification) and will generate a correct Python program that matches the specification and passes all tests.";
exports.FORMATTING_MESSAGE_WITH_STARTER_CODE = "You will use the following starter code to write the solution to the problem and enclose your code within delimiters.";
exports.FORMATTING_WITHOUT_STARTER_CODE = "Read the inputs from stdin solve the problem and write the answer to stdout (do not directly test on the sample inputs). Enclose your code within delimiters as follows. Ensure that when the python program runs, it reads the inputs, runs the algorithm and writes output to STDOUT.";
/** Official generic question template (OpenAIChat). */
function buildUserPrompt(record) {
    let prompt = `### Question:\n${record.question_content}\n\n`;
    if (record.starter_code) {
        prompt += `### Format: ${exports.FORMATTING_MESSAGE_WITH_STARTER_CODE}\n`;
        prompt += `\`\`\`python\n${record.starter_code}\n\`\`\`\n\n`;
    }
    else {
        prompt += `### Format: ${exports.FORMATTING_WITHOUT_STARTER_CODE}\n`;
        prompt += "```python\n# YOUR CODE HERE\n```\n\n";
    }
    prompt += "### Answer: (use the provided format with backticks)\n\n";
    return prompt;
}
function buildMessages(record) {
    return [
        { role: "system", content: exports.SYSTEM_MESSAGE },
        { role: "user", content: buildUserPrompt(record) }
    ];
}
