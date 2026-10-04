/**
 * One-problem run pipeline: build the prompt, call the model once, extract
 * the final integer, and compare it to the gold answer.
 */
import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { AimeProblem, ModelReply, ModelSettings } from "./types";
import { buildMessages } from "./prompts";
import { extractFinalAnswer } from "./extract";
import { createChatCompletion } from "./model-client";

export type RunProblemOptions = {
  signal?: AbortSignal;
};

const MAX_RAW_LOG_CHARS = 20_000;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

export async function runProblemForModel(
  model: ModelSettings,
  modelId: string,
  modelLabel: string,
  problem: AimeProblem,
  emit: ProgressEmitter,
  options: RunProblemOptions
): Promise<ScenarioResult> {
  const startedAt = new Date();
  const startedAtMs = Date.now();

  const finish = (
    partial: Pick<ScenarioResult, "status" | "score" | "summary"> & Partial<ScenarioResult>
  ): ScenarioResult => ({
    scenarioId: problem.id,
    points: 1,
    rawLog: partial.rawLog ?? "",
    ...partial,
    timings: {
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAtMs
    }
  });

  await emit({
    type: "model_progress",
    modelId,
    scenarioId: problem.id,
    message: `Requesting answer from ${modelLabel}.`
  });

  let reply: ModelReply;
  try {
    reply = await createChatCompletion(model, buildMessages(problem), { signal: options.signal });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return finish({
      status: "fail",
      errorType: "provider_error",
      retryable: true,
      score: 0,
      summary: `model call failed: ${message}`,
      rawLog: clip(`=== model call failed ===\n${message}`, MAX_RAW_LOG_CHARS)
    });
  }

  const replyText = reply.text;
  const truncated = reply.finishReason === "length" || reply.finishReason === "max_tokens";
  const extraction = extractFinalAnswer(replyText);
  const extractionNote = extraction.notes.join("; ");

  const baseLog = [
    `=== answer (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    extraction.value === undefined ? "(no integer extracted)" : String(extraction.value),
    "",
    "=== response ===",
    replyText
  ].join("\n");

  if (extraction.value === undefined) {
    const rejected = extraction.notes.filter((note) => note.includes("rejected:"));
    const detail = rejected.length > 0 ? ` (${rejected.join("; ")})` : "";
    return finish({
      status: "fail",
      score: 0,
      summary: `unparseable answer - no integer in 0-999 found${detail}${
        truncated ? " (response truncated - raise max_tokens)" : ""
      }`,
      rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
      output: { finalAnswer: replyText, assistantMessages: [replyText] }
    });
  }

  const correct = extraction.value === problem.answer;
  const summary = correct
    ? `correct (answered ${extraction.value})`
    : `wrong: answered ${extraction.value}, expected ${problem.answer}${
        truncated ? " (response truncated - raise max_tokens)" : ""
      }`;

  return finish({
    status: correct ? "pass" : "fail",
    score: correct ? 1 : 0,
    summary,
    rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
    output: { finalAnswer: replyText, assistantMessages: [replyText] }
  });
}
