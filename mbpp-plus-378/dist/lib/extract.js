"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCompletion = extractCompletion;
const FENCE_MARKER = "```";
const TOP_LEVEL_STATEMENT = /^(if\s|print\s*\()/;
function extractCompletion(rawText) {
    const notes = [];
    const normalized = rawText.replace(/\r\n/g, "\n");
    let body = normalized;
    const fenceStart = normalized.indexOf(FENCE_MARKER);
    if (fenceStart !== -1) {
        const firstLineEnd = normalized.indexOf("\n", fenceStart);
        if (firstLineEnd === -1) {
            body = "";
        }
        else {
            const rest = normalized.slice(firstLineEnd + 1);
            const fenceEnd = rest.indexOf(FENCE_MARKER);
            body = fenceEnd === -1 ? rest : rest.slice(0, fenceEnd);
        }
        notes.push("stripped markdown fence");
    }
    // Never strip leading whitespace: indentation is semantic.
    body = body.trimEnd();
    const lines = body.split("\n");
    for (let index = 1; index < lines.length; index += 1) {
        if (TOP_LEVEL_STATEMENT.test(lines[index])) {
            body = lines.slice(0, index).join("\n").trimEnd();
            notes.push("truncated at top-level statement");
            break;
        }
    }
    if (body.trim() === "") {
        notes.push("empty completion");
    }
    return { completion: body, notes };
}
