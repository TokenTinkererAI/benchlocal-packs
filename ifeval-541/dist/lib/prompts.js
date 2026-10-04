"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMessages = buildMessages;
function buildMessages(problem) {
    return [{ role: "user", content: problem.prompt }];
}
