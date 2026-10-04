/**
 * Numeric answer extraction for GSM8K-1319.
 *
 * Layered and deterministic, never guesses. Within every layer the LAST match
 * wins, so reasoning that mentions intermediate numbers is not misread:
 *
 *   1. the '#### ' marker (the GSM8K reference-answer format);
 *   2. an 'Answer: <number>' / 'the answer is <number>' phrase;
 *   3. fallback: the last number anywhere in the response.
 *
 * Captured text is normalized before comparison: commas and `$` are stripped,
 * integral values become integers and everything else floats, so '42', '42.0'
 * and '1,234' all match their gold. No number at all is reported as
 * unparseable rather than guessed.
 */
export type ExtractResult = {
  value?: number;
  notes: string[];
};

/** Optional `$` prefix; optional sign; digits with optional thousands commas; optional decimal part. */
const NUMBER_SOURCE = String.raw`(?:\$\s*)?(-?\d[\d,]*(?:\.\d+)?|-?\.\d+)`;

/** Strips comma/`$` formatting and parses to a number; undefined when the text is not a number. */
export function normalizeNumber(raw: string): number | undefined {
  const cleaned = raw.replace(/[$,]/g, "").trim();
  if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(cleaned)) {
    return undefined;
  }
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : undefined;
}

function lastCapture(text: string, pattern: RegExp): string | undefined {
  let last: string | undefined;
  for (const match of text.matchAll(pattern)) {
    last = match[1];
  }
  return last;
}

export function extractFinalNumber(rawText: string): ExtractResult {
  const notes: string[] = [];
  // U+2212 MINUS SIGN is normalized to an ASCII hyphen so signed answers match.
  const text = rawText.replace(/\r\n/g, "\n").replace(/\u2212/g, "-").trim();

  if (text === "") {
    return { notes: ["empty response"] };
  }

  // 1. The '#### ' marker (GSM8K reference-answer format). Last occurrence wins.
  const marker = lastCapture(text, new RegExp(String.raw`####\s*${NUMBER_SOURCE}`, "g"));
  if (marker !== undefined) {
    const value = normalizeNumber(marker);
    if (value !== undefined) {
      notes.push(`matched the '#### ' marker ("${marker}")`);
      return { value, notes };
    }
  }

  // 2. An 'answer is/:/= ... <number>' phrase. Last match wins.
  const phrase = lastCapture(
    text,
    new RegExp(
      String.raw`\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)\s*(?:\\boxed\{)?\s*${NUMBER_SOURCE}`,
      "gi"
    )
  );
  if (phrase !== undefined) {
    const value = normalizeNumber(phrase);
    if (value !== undefined) {
      notes.push(`matched an 'answer ... number' phrase ("${phrase}")`);
      return { value, notes };
    }
  }

  // 3. Fallback: the last number anywhere in the response.
  const anywhere = lastCapture(text, new RegExp(NUMBER_SOURCE, "g"));
  if (anywhere !== undefined) {
    const value = normalizeNumber(anywhere);
    if (value !== undefined) {
      notes.push(`fallback: used the last number in the response ("${anywhere}")`);
      return { value, notes };
    }
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
  notes.push(`no number found (last line: "${lastLine.slice(0, 80)}")`);
  return { notes };
}
