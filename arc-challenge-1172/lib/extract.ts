/**
 * Answer-letter extraction for ARC-Challenge-1172.
 *
 * Layered and deterministic: strict "answer ... X" matches first (the LAST
 * match wins so reasoning that mentions distractors is not misread), then
 * \boxed{X}, then a bare-letter final line. Anything else is reported as
 * unparseable rather than guessed.
 *
 * The accepted alphabet is the question's option-letter set (A-D for the
 * four-option majority; A-C or A-E for the few upstream 3- and 5-option
 * questions). It defaults to "ABCD".
 */
import type { AnswerLetter } from "./types";

export type ExtractResult = {
  letter?: AnswerLetter;
  notes: string[];
};

export function extractAnswerLetter(rawText: string, allowedLetters = "ABCD"): ExtractResult {
  const notes: string[] = [];
  const alphabet = Array.from(new Set(allowedLetters.toUpperCase().split(""))).sort().join("");
  if (alphabet === "") {
    return { notes: ["no answer letters configured"] };
  }
  const letterClass = `[${alphabet}]`;
  const letterRe = new RegExp(`^${letterClass}$`);

  const toLetter = (value: string): AnswerLetter | undefined => {
    const upper = value.toUpperCase();
    return letterRe.test(upper) ? (upper as AnswerLetter) : undefined;
  };

  const text = rawText.replace(/\r\n/g, "\n").trim();

  if (text === "") {
    return { notes: ["empty response"] };
  }

  // 1. "answer is/:/=/would be ... X" (also option/choice variants). Last match wins.
  const answerPattern = new RegExp(
    `\\b(?:answer|option|choice)\\b(?:[ \\t][^\\n]{0,24}?)?(?:is|:|=|–|—|-|was|would be|must be|should be|will be|has to be)\\s*\\**\\s*\\(?\\s*(${letterClass})\\b`,
    "gi"
  );
  let last: string | undefined;
  for (const match of text.matchAll(answerPattern)) {
    last = match[1];
  }
  if (last) {
    notes.push("matched an 'answer ... X' phrase");
    return { letter: toLetter(last), notes };
  }

  // 2. \boxed{X} (last occurrence).
  const boxedPattern = new RegExp(`\\\\boxed\\{\\s*\\(?\\s*(${letterClass})\\s*\\)?\\s*\\}`, "gi");
  let boxed: string | undefined;
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
