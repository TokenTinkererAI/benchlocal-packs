import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { ModelReply, ModelSettings, PythonInterpreter } from "./types";
import { buildMessages } from "./prompts";
import { extractCode } from "./extract";
import { createChatCompletion } from "./model-client";
import { executeCode } from "./executor";
import { getProblemMeta, harnessPath, loadProblemRecord, problemFilePath } from "./dataset";

export type RunProblemOptions = {
  python: PythonInterpreter;
  signal?: AbortSignal;
  perTestTimeoutMs?: number;
  execTimeoutMs?: number;
};

const MAX_RAW_LOG_CHARS = 20_000;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

export async function runProblemForModel(
  model: ModelSettings,
  modelId: string,
  modelLabel: string,
  problemId: string,
  emit: ProgressEmitter,
  options: RunProblemOptions
): Promise<ScenarioResult> {
  const startedAt = new Date();
  const startedAtMs = Date.now();

  const finish = (
    partial: Pick<ScenarioResult, "status" | "score" | "summary"> & Partial<ScenarioResult>
  ): ScenarioResult => ({
    scenarioId: problemId,
    points: 1,
    rawLog: partial.rawLog ?? "",
    ...partial,
    timings: {
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAtMs
    }
  });

  const meta = getProblemMeta(problemId);
  if (!meta) {
    return finish({
      status: "fail",
      errorType: "execution_error",
      score: 0,
      summary: `unknown problem id "${problemId}"`
    });
  }

  await emit({
    type: "model_progress",
    modelId,
    scenarioId: problemId,
    message: `Requesting solution from ${modelLabel}.`
  });

  let record;
  try {
    record = loadProblemRecord(problemId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return finish({
      status: "fail",
      errorType: "execution_error",
      retryable: true,
      score: 0,
      summary: `could not load problem record: ${message}`
    });
  }

  let reply: ModelReply;
  try {
    reply = await createChatCompletion(model, buildMessages(record), { signal: options.signal });
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
  const extraction = extractCode(replyText);

  const baseLog = [
    `=== extraction (${extraction.notes.join("; ")}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    "",
    "=== response ===",
    replyText,
    "",
    "=== submitted code ===",
    extraction.code
  ].join("\n");

  if (extraction.code.trim() === "") {
    return finish({
      status: "fail",
      score: 0,
      summary: `no code block found in response (fenced \`\`\` block required)${
        truncated ? " (response truncated - raise max_tokens)" : ""
      }`,
      rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
      output: { finalAnswer: replyText, assistantMessages: [replyText] }
    });
  }

  const outcome = await executeCode({
    python: options.python,
    harnessScriptPath: harnessPath(),
    problemFile: problemFilePath(problemId),
    code: extraction.code,
    perTestTimeoutMs: options.perTestTimeoutMs,
    execTimeoutMs: options.execTimeoutMs
  });

  const output = { finalAnswer: replyText, assistantMessages: [replyText] };

  if (outcome.kind === "passed") {
    const harness = outcome.harness;
    return finish({
      status: "pass",
      score: 1,
      summary: `all ${harness.total} tests passed`,
      rawLog: clip(
        `${baseLog}\n\n=== execution ===\npass: ${harness.passed_count}/${harness.total} tests in ${harness.elapsed_s ?? "?"}s`,
        MAX_RAW_LOG_CHARS
      ),
      output
    });
  }

  if (outcome.kind === "failed") {
    const harness = outcome.harness;
    const detail = harness.detail ?? {};
    const message = typeof detail.error_message === "string" ? detail.error_message : "failed";
    const extra = typeof detail.error === "string" ? ` (${detail.error})` : "";
    return finish({
      status: "fail",
      score: 0,
      summary: `${message}${extra} - ${harness.passed_count}/${harness.total} tests passed`,
      rawLog: clip(
        `${baseLog}\n\n=== execution ===\nfail: ${harness.passed_count}/${harness.total} tests passed\n` +
          `detail: ${JSON.stringify(harness.detail ?? {})}`,
        MAX_RAW_LOG_CHARS
      ),
      output
    });
  }

  if (outcome.kind === "timed_out") {
    return finish({
      status: "fail",
      score: 0,
      summary: `execution exceeded the ${outcome.timeoutMs} ms wall-clock cap`,
      rawLog: clip(`${baseLog}\n\n=== execution ===\nwall-clock cap exceeded`, MAX_RAW_LOG_CHARS),
      output
    });
  }

  if (outcome.kind === "harness_error") {
    return finish({
      status: "fail",
      errorType: "execution_error",
      retryable: true,
      score: 0,
      summary: `harness error: ${outcome.message}`,
      rawLog: clip(
        `${baseLog}\n\n=== harness error ===\n${outcome.message}\n\n=== stderr tail ===\n${outcome.stderrTail}`,
        MAX_RAW_LOG_CHARS
      ),
      output
    });
  }

  return finish({
    status: "fail",
    errorType: "execution_error",
    retryable: true,
    score: 0,
    summary: `could not run Python: ${outcome.message}`,
    rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
    output
  });
}
