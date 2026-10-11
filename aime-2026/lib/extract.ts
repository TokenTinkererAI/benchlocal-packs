/**
 * Integer answer extraction for AIME-2026.
 *
 * Layered and deterministic, never guesses. Within every layer the LAST match
 * wins, so reasoning that mentions intermediate numbers is not misread:
 *
 *   1. the value inside \boxed{...} (last occurrence);
 *   2. an 'Answer: N' / 'the answer is N' phrase (last occurrence);
 *   3. fallback: the last standalone integer in the response.
 *
 * Captured text is normalized (thousands commas stripped, leading zeros
 * dropped) and then range-checked: only values 0-999 are accepted, so '023'
 * becomes 23 and '1,234' becomes 1234, which is rejected as out of range.
 * Responses with no acceptable integer are reported as unparseable rather
 * than guessed.
 *
 * A leading minus sign is not part of a captured token (AIME answers are
 * never negative), and a decimal score such as '12.5' does not yield an
 * integer: the fallback layer never reads a fragment of a decimal number.
 */
export type ExtractResult = {
  value?: number;
  notes: string[];
};

export const ANSWER_MIN = 0;
export const ANSWER_MAX = 999;

/**
 * Strips thousands commas and leading zeros, then parses an unsigned integer.
 * '023' -> 23, '1,234' -> 1234, '70' -> 70, 'abc' -> undefined.
 * (No range check here - extraction applies isInRange afterwards.)
 */
export function normalizeNumber(raw: string): number | undefined {
  const cleaned = raw.replace(/,/g, "").replace(/^0+(?=\d)/, "").trim();
  if (!/^\d+$/.test(cleaned)) {
    return undefined;
  }
  const value = Number(cleaned);
  return Number.isSafeInteger(value) ? value : undefined;
}

/** True when the value is a valid AIME answer (integer 0-999). */
export function isInRange(value: number): boolean {
  return Number.isInteger(value) && value >= ANSWER_MIN && value <= ANSWER_MAX;
}

/** Unsigned integer token: digits with optional thousands commas; not a decimal prefix. */
const INT_TOKEN = String.raw`(\d[\d,]*)(?!\d)(?!\.\d)`;

/** Fallback-layer token: must also not continue a longer (e.g. comma-grouped) number. */
const STANDALONE_INT = String.raw`(?<![\d.,])(\d[\d,]*)(?!\d)(?!\.\d)`;

/** The 'answer ... is/:/= ...' connective used by layer 2. */
const ANSWER_PHRASE = String.raw`\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)[ \t*_$({}\\]{0,8}`;

function lastMatch(text: string, pattern: RegExp): RegExpExecArray | undefined {
  let last: RegExpExecArray | undefined;
  for (const match of text.matchAll(pattern)) {
    last = match;
  }
  return last;
}

/** Normalizes and range-checks one captured token. */
function evaluate(raw: string): { value?: number; reason?: string } {
  const normalized = normalizeNumber(raw);
  if (normalized === undefined) {
    return { reason: `"${raw}" is not an integer` };
  }
  if (!isInRange(normalized)) {
    return { reason: `"${raw}" -> ${normalized} is outside 0-999` };
  }
  return { value: normalized };
}

export function extractFinalAnswer(rawText: string): ExtractResult {
  const notes: string[] = [];
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
    } else {
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
