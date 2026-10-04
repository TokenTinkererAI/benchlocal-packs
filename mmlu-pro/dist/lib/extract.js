"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAnswerLetter = extractAnswerLetter;
const LETTER_RE = /^[A-J]$/;
/**
 * Strips the markdown/LaTeX/quotation decoration around a candidate token:
 * `**B**`, `` `B` ``, `"B"`, `(B)`, `\text{B}`, `B.` all reduce to `B`.
 * Anything with more content than a single letter stays multi-character.
 */
function cleanToken(raw) {
    return raw
        .replace(/\\left|\\right/g, "")
        .replace(/\\[a-zA-Z]+\s*\{([^{}]*)\}/g, "$1")
        .replace(/[$`*_"'~]/g, "")
        .replace(/[()[\]{}]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/[.,:;!?]+$/, "")
        .trim();
}
function toLetter(value) {
    const cleaned = cleanToken(value).toUpperCase();
    return LETTER_RE.test(cleaned) ? cleaned : undefined;
}
/** `\boxed{...}` / `\fbox{...}` allowing one level of nested braces (`\boxed{\text{B}}`). */
const BOXED_RE = /\\+(?:boxed|fbox)\s*\{((?:[^{}]|\{[^{}]*\})*)\}/gi;
/**
 * "answer is/:/=/… X" (also option/choice variants), tolerating up to 24
 * characters between the keyword and the verb and light decoration around the
 * letter. The LAST match wins.
 */
const ANSWER_PHRASE_RE = /\b(?:answer|option|choice)\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|–|—|-|was|were|would be|must be|should be|will be|has to be)\s*[(*"'\[]{0,3}\s*([A-J])\b/gi;
function extractAnswerLetter(rawText) {
    const notes = [];
    const text = rawText.replace(/\r\n/g, "\n").trim();
    if (text === "") {
        return { notes: ["empty response"] };
    }
    // 1. \boxed{X} / \fbox{X} (last occurrence).
    let boxed;
    for (const match of text.matchAll(BOXED_RE)) {
        boxed = match[1];
    }
    if (boxed !== undefined) {
        const letter = toLetter(boxed);
        if (letter) {
            notes.push("matched a boxed (\\boxed{}) answer");
            return { letter, notes };
        }
        notes.push(`boxed content was not a single letter ("${cleanToken(boxed).slice(0, 40)}")`);
    }
    // 2. "answer ... X" phrase (last occurrence) - includes the official `The answer is (X)` form.
    let last;
    for (const match of text.matchAll(ANSWER_PHRASE_RE)) {
        last = match[1];
    }
    if (last) {
        const letter = toLetter(last);
        if (letter) {
            notes.push("matched an 'answer ... X' phrase");
            return { letter, notes };
        }
    }
    // 3. Final-line fallback: a lone letter (optionally emphasized/bracketed).
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !/^`{3,}$/.test(line));
    const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
    const cleaned = cleanToken(lastLine);
    if (LETTER_RE.test(cleaned.toUpperCase())) {
        notes.push("matched a single-letter final line");
        return { letter: cleaned.toUpperCase(), notes };
    }
    notes.push(`no answer letter found (last line: "${lastLine.slice(0, 80)}")`);
    return { notes };
}
