/**
 * Text answer extraction for HMMT-Feb-2026.
 *
 * Layered and deterministic, it never guesses. Every layer takes the LAST
 * match in the response, so reasoning that mentions intermediate values is
 * not misread, and every layer produces a raw candidate string that is then
 * normalized by lib/normalize.ts and compared with the gold answer:
 *
 *   1. the content of the last balanced \boxed{...} group (brace-matched, so
 *      nested groups such as \boxed{\frac{1}{2}} are captured whole);
 *   2. the last 'Answer: X' / 'answer is X' phrase — X is the remainder of
 *      that line, cut at the first sentence boundary;
 *   3. fallback: the last non-empty line, stripped of surrounding $/markdown
 *      emphasis and trailing punctuation (kept otherwise raw, so
 *      normalization decides).
 *
 * A candidate that still reads like an English sentence is rejected in
 * layers 2-3 (see looksLikeSentence) rather than treated as an answer. With
 * no acceptable candidate the result carries no `candidate` and the run
 * reports an explicit "unparseable answer" failure.
 */
import { matchBrace } from "./normalize";

export type ExtractResult = {
  /** Raw (unnormalized) candidate answer string, when one was found. */
  candidate?: string;
  notes: string[];
};

const BOXED = "\\boxed";

/**
 * The 'answer ... is/:/=' connective. No `\b` between the optional gap and
 * the keyword (space and '=' are both non-word characters, so a boundary
 * could never match there). Only spaces may follow the connective: a leading
 * backslash or bracket belongs to the answer itself ("\frac{11}{2}"), never
 * to the formatting.
 */
const ANSWER_PHRASE =
  /\banswer\b(?:[ \t][^\n]{0,24}?)?(?:is|:|=|was|would be|must be|should be|will be|has to be)[ \t]{0,8}/gi;

function excerpt(text: string, max = 60): string {
  const single = text.replace(/\s+/g, " ").trim();
  return single.length <= max ? single : `${single.slice(0, max - 3)}...`;
}

/** The content of the last \boxed{...} whose braces balance. */
function lastBoxedContent(text: string): { content: string } | { error: string } | undefined {
  const starts: number[] = [];
  for (const match of text.matchAll(/\\boxed/g)) {
    if (typeof match.index === "number") {
      starts.push(match.index);
    }
  }
  if (starts.length === 0) {
    return undefined;
  }
  for (let i = starts.length - 1; i >= 0; i -= 1) {
    let brace = starts[i] + BOXED.length;
    while (brace < text.length && text[brace] === " ") {
      brace += 1;
    }
    if (text[brace] !== "{") {
      continue;
    }
    const close = matchBrace(text, brace);
    if (close < 0) {
      continue;
    }
    return { content: text.slice(brace + 1, close) };
  }
  return { error: "every \\boxed{} group in the response was unbalanced" };
}

/**
 * True when a line reads like an English sentence rather than an answer
 * value: two or more consecutive alphabetic words of three or more letters
 * (after removing LaTeX commands), or a line longer than 120 characters.
 */
export function looksLikeSentence(line: string): boolean {
  const withoutCommands = line.replace(/\\[a-zA-Z]+/g, " ");
  const stripped = withoutCommands.replace(/[{}$^_\\]/g, " ");
  if (stripped.replace(/\s+/g, " ").trim().length > 120) {
    return true;
  }
  return /\b[a-zA-Z]{3,}[ \t]+[a-zA-Z]{3,}\b/.test(stripped);
}

/** Trims a raw candidate: unwraps a whole-spanning \boxed{}, strips $, emphasis and trailing punctuation. */
function cleanCandidate(raw: string): string {
  let s = raw.trim();
  for (;;) {
    const at = s.lastIndexOf(BOXED);
    if (at < 0) {
      break;
    }
    let brace = at + BOXED.length;
    while (brace < s.length && s[brace] === " ") {
      brace += 1;
    }
    if (s[brace] !== "{") {
      break;
    }
    const close = matchBrace(s, brace);
    if (close < 0 || close !== s.length - 1) {
      break;
    }
    s = s.slice(brace + 1, close).trim();
  }
  s = s.replace(/^\$+/, "").replace(/\$+$/, "");
  s = s.replace(/^[*_]+/, "").replace(/[*_]+$/, "");
  s = s.replace(/[.,;:!?]+$/, "");
  return s.trim();
}

/** The rest of the line starting at `from`, cut at the first sentence boundary. */
function restOfLine(text: string, from: number): string {
  const newline = text.indexOf("\n", from);
  let rest = newline >= 0 ? text.slice(from, newline) : text.slice(from);
  const sentenceEnd = rest.indexOf(". ");
  if (sentenceEnd >= 0) {
    rest = rest.slice(0, sentenceEnd);
  }
  return rest;
}

export function extractFinalAnswer(rawText: string): ExtractResult {
  const notes: string[] = [];
  const text = rawText.replace(/\r\n?/g, "\n").trim();

  if (text === "") {
    return { notes: ["empty response"] };
  }

  // 1. \boxed{...} (last balanced group).
  const boxed = lastBoxedContent(text);
  if (boxed) {
    if ("content" in boxed) {
      const candidate = cleanCandidate(boxed.content);
      if (candidate !== "") {
        notes.push(`matched a \\boxed{} answer ("${excerpt(candidate)}")`);
        return { candidate, notes };
      }
      notes.push("\\boxed{} held no value");
    } else {
      notes.push(boxed.error);
    }
  }

  // 2. An 'answer ... is/:/=' phrase (last usable one).
  const matches = [...text.matchAll(ANSWER_PHRASE)];
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const match = matches[i];
    const start = (match.index ?? 0) + match[0].length;
    const candidate = cleanCandidate(restOfLine(text, start));
    if (candidate === "") {
      continue;
    }
    if (looksLikeSentence(candidate)) {
      notes.push(`'answer' phrase candidate rejected as prose ("${excerpt(candidate)}")`);
      continue;
    }
    notes.push(`matched an 'answer ...' phrase ("${excerpt(candidate)}")`);
    return { candidate, notes };
  }

  // 3. Fallback: the last non-empty line.
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
  const candidate = cleanCandidate(lastLine);
  if (candidate !== "" && !looksLikeSentence(candidate)) {
    notes.push(`fallback: used the last line ("${excerpt(candidate)}")`);
    return { candidate, notes };
  }
  if (candidate !== "") {
    notes.push(`final line rejected as prose ("${excerpt(candidate)}")`);
  }

  notes.push(`unparseable answer - no boxed, phrase or final-line candidate (last line: "${excerpt(lastLine, 80)}")`);
  return { notes };
}
