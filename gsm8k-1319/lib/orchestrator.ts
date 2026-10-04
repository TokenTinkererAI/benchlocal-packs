import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { Gsm8kProblem, ModelReply, ModelSettings } from "./types";
import { buildMessages } from "./prompts";
import { extractFinalNumber } from "./extract";
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
  problem: Gsm8kProblem,
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
  const extraction = extractFinalNumber(replyText);
  const extractionNote = extraction.notes.join("; ");

  const baseLog = [
    `=== answer (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    extraction.value !== undefined ? String(extraction.value) : "(no number extracted)",
    "",
    "=== response ===",
    replyText
  ].join("\n");

  if (extraction.value === undefined) {
    return finish({
      status: "fail",
      score: 0,
      summary: `unparseable answer - no number found in response${
        truncated ? " (response truncated - raise max_tokens)" : ""
      }`,
      rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
      output: { finalAnswer: replyText, assistantMessages: [replyText] }
    });
  }

  const correct = extraction.value === problem.finalNumber;
  const summary = correct
    ? `correct (answered ${extraction.value})`
    : `wrong: answered ${extraction.value}, expected ${problem.finalNumber}${
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
