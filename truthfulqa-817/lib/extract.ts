/**
 * Answer-letter extraction for TruthfulQA-817.
 *
 * TruthfulQA MC1 questions carry a variable number of answer choices (2-13),
 * so extraction is parameterised by the choice count: only the letters the
 * question actually offers are accepted.
 *
 * Layered and deterministic: strict "answer ... X" matches first (the LAST
 * match wins so reasoning that mentions distractors is not misread), then
 * \boxed{X}, then a bare-letter final line. Anything else is reported as
 * unparseable rather than guessed.
 */
export type ExtractResult = {
  letter?: string;
  notes: string[];
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** True when the text continues as a word after a matched letter (e.g. the pronoun "I"). */
function continuesAsWord(text: string, fromIndex: number): boolean {
  let index = fromIndex;
  while (index < text.length && (text[index] === " " || text[index] === "\t")) {
    index += 1;
  }
  return /[a-z']/.test(text[index] ?? "");
}

function normalizeLetter(value: string, count: number): string | undefined {
  const upper = value.toUpperCase();
  if (upper.length !== 1) {
    return undefined;
  }
  const index = ALPHABET.indexOf(upper);
  return index >= 0 && index < count ? upper : undefined;
}

export function extractAnswerLetter(rawText: string, letterCount: number): ExtractResult {
  const notes: string[] = [];
  const text = rawText.replace(/\r\n/g, "\n").trim();

  if (text === "") {
    return { notes: ["empty response"] };
  }

  const count = Math.max(1, Math.min(ALPHABET.length, Math.floor(letterCount) || 1));
  const maxLetter = ALPHABET[count - 1];
  const singleRe = new RegExp(`^[A-${maxLetter}]$`);

  // 1. "answer is/:/=/would be ... X" (also option/choice variants). Last match wins.
  const answerPattern = new RegExp(
    `\\b(?:answer|option|choice)\\b(?:[ \\t][^\\n]{0,24}?)?(?:is|:|=|–|—|-|was|would be|must be|should be|will be|has to be)\\s*\\**\\s*\\(?\\s*([A-${maxLetter}])\\b`,
    "gi"
  );
  let last: string | undefined;
  for (const match of text.matchAll(answerPattern)) {
    const captured = match[1];
    // Guard against the pronoun "I" (a valid letter here, but also a common word):
    // reject it when it continues as a lowercase word rather than standing alone.
    if ((captured === "I" || captured === "i") && continuesAsWord(text, (match.index ?? 0) + match[0].length)) {
      continue;
    }
    last = captured;
  }
  if (last) {
    notes.push("matched an 'answer ... X' phrase");
    return { letter: normalizeLetter(last, count), notes };
  }

  // 2. \boxed{X} (last occurrence).
  const boxedPattern = new RegExp(`\\\\boxed\\{\\s*\\(?\\s*([A-${maxLetter}])\\s*\\)?\\s*\\}`, "gi");
  let boxed: string | undefined;
  for (const match of text.matchAll(boxedPattern)) {
    boxed = match[1];
  }
  if (boxed) {
    notes.push("matched a \\boxed{} answer");
    return { letter: normalizeLetter(boxed, count), notes };
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
  if (singleRe.test(cleaned)) {
    notes.push("matched a single-letter final line");
    return { letter: normalizeLetter(cleaned, count), notes };
  }

  notes.push(`no answer letter found (last line: "${lastLine.slice(0, 80)}")`);
  return { notes };
}
