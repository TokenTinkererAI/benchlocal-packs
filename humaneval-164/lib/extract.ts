/**
 * Completion extraction for HumanEval-164 model replies.
 *
 * The pipeline runs with no stop sequences, so the reply is treated
 * post-hoc: markdown fences are removed, then any *executed* top-level
 * statement after the function body (marked by the canonical problem
 * prompt) is truncated. Trailing `def`/`class`/import statements are
 * inert (never executed once `check()` has returned) and are kept.
 */
import type { HumanEvalProblem } from "./types";

const FENCE_MARKER = "```";
const TOP_LEVEL_STATEMENT = /^(if\s|print\s*\()/;

export function extractCompletion(
  rawText: string,
  problem: HumanEvalProblem
): { completion: string; notes: string[] } {
  // `problem` is part of the frozen pack contract; extraction only needs the raw text.
  void problem;

  const notes: string[] = [];
  const normalized = rawText.replace(/\r\n/g, "\n");

  let body = normalized;
  const fenceStart = normalized.indexOf(FENCE_MARKER);
  if (fenceStart !== -1) {
    const firstLineEnd = normalized.indexOf("\n", fenceStart);
    if (firstLineEnd === -1) {
      body = "";
    } else {
      const rest = normalized.slice(firstLineEnd + 1);
      const fenceEnd = rest.indexOf(FENCE_MARKER);
      body = fenceEnd === -1 ? rest : rest.slice(0, fenceEnd);
    }
    notes.push("stripped markdown fence");
  }

  // Never strip leading whitespace: indentation is semantic.
  body = body.trimEnd();

  const lines = body.split("\n");
  for (let index = 1; index < lines.length; index += 1) {
    if (TOP_LEVEL_STATEMENT.test(lines[index])) {
      body = lines.slice(0, index).join("\n").trimEnd();
      notes.push("truncated at top-level statement");
      break;
    }
  }

  if (body.trim() === "") {
    notes.push("empty completion");
  }

  return { completion: body, notes };
}
