/**
 * Prompt construction for IFEval-541.
 *
 * Deviation (documented in METHODOLOGY.md): the paper's reference prompts are
 * means to prepare few-shot templates per model family; the dataset's
 * `prompt` field is the canonical zero-shot instruction text, and upstream's
 * own evaluation harness sends it as-is. This pack therefore sends exactly ONE
 * user message containing the prompt verbatim - no system message, no chat
 * template scaffolding, no answer-format hints. The model's reply is graded
 * raw (no extraction step).
 */
import type { ChatMessage, IfevalProblem } from "./types";

export function buildMessages(problem: IfevalProblem): ChatMessage[] {
  return [{ role: "user", content: problem.prompt }];
}
