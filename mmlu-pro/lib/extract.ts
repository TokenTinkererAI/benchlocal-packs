/**
 * Answer-letter extraction for MMLU-Pro (10-option multiple choice, letters A-J).
 *
 * Layered and deterministic; the layers are tried in this order and the first
 * one that yields a letter decides (nothing is ever guessed):
 *
 *   1. `\boxed{X}` / `\fbox{X}` - the last explicitly boxed letter in the
 *                                 response.
 *   2. "answer ... X" phrases   - the last `answer|option|choice ... is/:/= ...
 *                                 X` match, so distractor mentions inside the
 *                                 reasoning are not misread. The official
 *                                 MMLU-Pro format `The answer is (X)` is a
 *                                 first-class case of this layer (the
 *                                 parentheses around the letter are decoration).
 *   3. standalone final line    - a lone letter (optionally emphasized or in
 *                                 parentheses) on the final non-empty line.
 *
 * A response with no letter in any layer is reported as unparseable.
 */
import type { MmluLetter } from "./types";

export type ExtractResult = {
  letter?: MmluLetter;
  notes: string[];
};

const LETTER_RE = /^[A-J]$/;

/**
 * Strips the markdown/LaTeX/quotation decoration around a candidate token:
 * `**B**`, `` `B` ``, `"B"`, `(B)`, `\text{B}`, `B.` all reduce to `B`.
 * Anything with more content than a single letter stays multi-character.
 */
function cleanToken(raw: string): string {
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

function toLetter(value: string): MmluLetter | undefined {
  const cleaned = cleanToken(value).toUpperCase();
  return LETTER_RE.test(cleaned) ? (cleaned as MmluLetter) : undefined;
}

/** `\boxed{...}` / `\fbox{...}` allowing one level of nested braces (`\boxed{\text{B}}`). */
const BOXED_RE = /\\+(?:boxed|fbox)\s*\{((?:[^{}]|\{[^{}]*\})*)\}/gi;

/**
 * "answer is/:/=/… X" (also option/choice variants), tolerating up to 24
 * characters between the keyword and the verb and light decoration around the
 * letter. The LAST match wins.
 */
const ANSWER_PHRASE_RE =
  /\b(?:answer|option|choice)\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|–|—|-|was|were|would be|must be|should be|will be|has to be)\s*[(*"'\[]{0,3}\s*([A-J])\b/gi;

export function extractAnswerLetter(rawText: string): ExtractResult {
  const notes: string[] = [];
  const text = rawText.replace(/\r\n/g, "\n").trim();

  if (text === "") {
    return { notes: ["empty response"] };
  }

  // 1. \boxed{X} / \fbox{X} (last occurrence).
  let boxed: string | undefined;
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
  let last: string | undefined;
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
    return { letter: cleaned.toUpperCase() as MmluLetter, notes };
  }

  notes.push(`no answer letter found (last line: "${lastLine.slice(0, 80)}")`);
  return { notes };
}
