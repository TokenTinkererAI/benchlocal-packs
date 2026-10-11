"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAnswerLetter = extractAnswerLetter;
function extractAnswerLetter(rawText, allowedLetters = "ABCD") {
    const notes = [];
    const alphabet = Array.from(new Set(allowedLetters.toUpperCase().split(""))).sort().join("");
    if (alphabet === "") {
        return { notes: ["no answer letters configured"] };
    }
    const letterClass = `[${alphabet}]`;
    const letterRe = new RegExp(`^${letterClass}$`);
    const toLetter = (value) => {
        const upper = value.toUpperCase();
        return letterRe.test(upper) ? upper : undefined;
    };
    const text = rawText.replace(/\r\n/g, "\n").trim();
    if (text === "") {
        return { notes: ["empty response"] };
    }
    // 1. "answer is/:/=/would be ... X" (also option/choice variants). Last match wins.
    const answerPattern = new RegExp(`\\b(?:answer|option|choice)\\b(?:[ \\t][^\\n]{0,24}?)?(?:is|:|=|–|—|-|was|would be|must be|should be|will be|has to be)\\s*\\**\\s*\\(?\\s*(${letterClass})\\b`, "gi");
    let last;
    for (const match of text.matchAll(answerPattern)) {
        last = match[1];
    }
    if (last) {
        notes.push("matched an 'answer ... X' phrase");
        return { letter: toLetter(last), notes };
    }
    // 2. \boxed{X} (last occurrence).
    const boxedPattern = new RegExp(`\\\\boxed\\{\\s*\\(?\\s*(${letterClass})\\s*\\)?\\s*\\}`, "gi");
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
    if (letterRe.test(cleaned)) {
        notes.push("matched a single-letter final line");
        return { letter: toLetter(cleaned), notes };
    }
    notes.push(`no answer letter found (last line: "${lastLine.slice(0, 80)}")`);
    return { notes };
}
