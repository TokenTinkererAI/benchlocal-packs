"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSWER_MAX = exports.ANSWER_MIN = void 0;
exports.normalizeNumber = normalizeNumber;
exports.isInRange = isInRange;
exports.extractFinalAnswer = extractFinalAnswer;
exports.ANSWER_MIN = 0;
exports.ANSWER_MAX = 999;
/**
 * Strips thousands commas and leading zeros, then parses an unsigned integer.
 * '023' -> 23, '1,234' -> 1234, '70' -> 70, 'abc' -> undefined.
 * (No range check here - extraction applies isInRange afterwards.)
 */
function normalizeNumber(raw) {
    const cleaned = raw.replace(/,/g, "").replace(/^0+(?=\d)/, "").trim();
    if (!/^\d+$/.test(cleaned)) {
        return undefined;
    }
    const value = Number(cleaned);
    return Number.isSafeInteger(value) ? value : undefined;
}
/** True when the value is a valid AIME answer (integer 0-999). */
function isInRange(value) {
    return Number.isInteger(value) && value >= exports.ANSWER_MIN && value <= exports.ANSWER_MAX;
}
/** Unsigned integer token: digits with optional thousands commas; not a decimal prefix. */
const INT_TOKEN = String.raw `(\d[\d,]*)(?!\d)(?!\.\d)`;
/** Fallback-layer token: must also not continue a longer (e.g. comma-grouped) number. */
const STANDALONE_INT = String.raw `(?<![\d.,])(\d[\d,]*)(?!\d)(?!\.\d)`;
/** The 'answer ... is/:/= ...' connective used by layer 2. */
const ANSWER_PHRASE = String.raw `\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)[ \t*_$({}\\]{0,8}`;
function lastMatch(text, pattern) {
    let last;
    for (const match of text.matchAll(pattern)) {
        last = match;
    }
    return last;
}
/** Normalizes and range-checks one captured token. */
function evaluate(raw) {
    const normalized = normalizeNumber(raw);
    if (normalized === undefined) {
        return { reason: `"${raw}" is not an integer` };
    }
    if (!isInRange(normalized)) {
        return { reason: `"${raw}" -> ${normalized} is outside 0-999` };
    }
    return { value: normalized };
}
function extractFinalAnswer(rawText) {
    const notes = [];
    const text = rawText.replace(/\r\n/g, "\n").trim();
    if (text === "") {
        return { notes: ["empty response"] };
    }
    // 1. \boxed{...} (last occurrence).
    const boxed = lastMatch(text, /\\boxed\s*\{([^{}]*)\}/g);
    if (boxed) {
        const inner = lastMatch(boxed[1], new RegExp(INT_TOKEN, "g"));
        if (inner) {
            const outcome = evaluate(inner[1]);
            if (outcome.value !== undefined) {
                notes.push(`matched a \\boxed{} answer ("${inner[1]}")`);
                return { value: outcome.value, notes };
            }
            notes.push(`\\boxed{} candidate rejected: ${outcome.reason}`);
        }
        else {
            notes.push(`\\boxed{} held no integer ("${boxed[1].replace(/\s+/g, " ").slice(0, 40)}")`);
        }
    }
    // 2. An 'answer is/:/= ... N' phrase (last occurrence).
    const phrase = lastMatch(text, new RegExp(`${ANSWER_PHRASE}${INT_TOKEN}`, "gi"));
    if (phrase) {
        const outcome = evaluate(phrase[1]);
        if (outcome.value !== undefined) {
            notes.push(`matched an 'answer ... integer' phrase ("${phrase[1]}")`);
            return { value: outcome.value, notes };
        }
        notes.push(`'answer' phrase candidate rejected: ${outcome.reason}`);
    }
    // 3. Fallback: the last standalone integer in the response.
    const anywhere = lastMatch(text, new RegExp(STANDALONE_INT, "g"));
    if (anywhere) {
        const outcome = evaluate(anywhere[1]);
        if (outcome.value !== undefined) {
            notes.push(`fallback: used the last standalone integer in the response ("${anywhere[1]}")`);
            return { value: outcome.value, notes };
        }
        notes.push(`fallback integer rejected: ${outcome.reason}`);
    }
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
    notes.push(`no integer answer in 0-999 found (last line: "${lastLine.slice(0, 80)}")`);
    return { notes };
}
