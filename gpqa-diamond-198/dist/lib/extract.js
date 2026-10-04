"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAnswerLetter = extractAnswerLetter;
const LETTER_RE = /^[A-D]$/;
function toLetter(value) {
    const upper = value.toUpperCase();
    return LETTER_RE.test(upper) ? upper : undefined;
}
function extractAnswerLetter(rawText) {
    const notes = [];
    const text = rawText.replace(/\r\n/g, "\n").trim();
    if (text === "") {
        return { notes: ["empty response"] };
    }
    // 1. "answer is/:/=/would be ... X" (also option/choice variants). Last match wins.
    const answerPattern = /\b(?:answer|option|choice)\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|–|—|-|was|would be|must be|should be|will be|has to be)\s*\**\s*\(?\s*([A-D])\b/gi;
    let last;
    for (const match of text.matchAll(answerPattern)) {
        last = match[1];
    }
    if (last) {
        notes.push("matched an 'answer ... X' phrase");
        return { letter: toLetter(last), notes };
    }
    // 2. \boxed{X} (last occurrence).
    const boxedPattern = /\\boxed\{\s*\(?\s*([A-D])\s*\)?\s*\}/gi;
    let boxed;
    for (const match of text.matchAll(boxedPattern)) {
        boxed = match[1];
    }
    if (boxed) {
        notes.push("matched a \\boxed{} answer");
        return { letter: toLetter(boxed), notes };
    }
    // 3. Final-line fallback: a lone letter (optionally emphasized/bracketed).
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !/^`{3,}$/.test(line));
    const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
    const cleaned = lastLine
        .replace(/[*_`]/g, "")
        .replace(/[()[\]{}]/g, "")
        .trim()
        .replace(/[.,:;!?]+$/, "");
    if (LETTER_RE.test(cleaned)) {
        notes.push("matched a single-letter final line");
        return { letter: toLetter(cleaned), notes };
    }
    notes.push(`no answer letter found (last line: "${lastLine.slice(0, 80)}")`);
    return { notes };
}
