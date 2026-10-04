"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCode = extractCode;
function extractCode(rawText) {
    const notes = [];
    const text = rawText.replace(/\r\n/g, "\n");
    if (text.trim() === "") {
        return { code: "", notes: ["empty response"] };
    }
    const lines = text.split("\n");
    const fenceLines = [];
    lines.forEach((line, index) => {
        if (line.includes("```")) {
            fenceLines.push(index);
        }
    });
    if (fenceLines.length < 2) {
        notes.push(`no fenced block found (${fenceLines.length} fence line(s))`);
        return { code: "", notes };
    }
    const start = fenceLines[fenceLines.length - 2] + 1;
    const end = fenceLines[fenceLines.length - 1];
    const code = lines.slice(start, end).join("\n");
    notes.push(`extracted last fenced block (${fenceLines.length} fence lines, official rule)`);
    if (code.trim() === "") {
        notes.push("fenced block is empty");
    }
    return { code, notes };
}
