import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { MbppProblemRecord, ModelReply, ModelSettings, PythonInterpreter } from "./types";
import { buildMessages } from "./prompts";
import { extractCompletion } from "./extract";
import { createChatCompletion } from "./model-client";
import { executeCode } from "./executor";
import { getProblemMeta, harnessPath, loadProblemRecord, problemFilePath } from "./dataset";

export type RunProblemOptions = {
  python: PythonInterpreter;
  signal?: AbortSignal;
  minTimeLimitS?: number;
  gtTimeLimitFactor?: number;
  timeoutPerTaskS?: number;
  execTimeoutMs?: number;
};

const MAX_RAW_LOG_CHARS = 20_000;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

/** "base 3/3, plus 108/108" - the EvalPlus base+plus detail line. */
function phaseDetail(harness: {
  base?: { passed: number; total: number; status: string };
  plus?: { passed: number; total: number; status: string };
  passed_count: number;
  total: number;
}): string {
  const parts: string[] = [];
  if (harness.base) {
    parts.push(`base ${harness.base.passed}/${harness.base.total}${harness.base.status !== "pass" ? ` (${harness.base.status})` : ""}`);
  }
  if (harness.plus) {
    parts.push(`plus ${harness.plus.passed}/${harness.plus.total}${harness.plus.status !== "pass" ? ` (${harness.plus.status})` : ""}`);
  }
  if (parts.length === 0) {
    return `${harness.passed_count}/${harness.total} tests passed`;
  }
  return `${parts.join(", ")}`;
}

/** First failing input of a phase, for the failure summary. */
function firstFailure(phase?: { failures?: Array<{ index: number; error: string }> }): string | undefined {
  const failure = phase?.failures?.[0];
  if (!failure) {
    return undefined;
  }
  return `input #${failure.index} - ${failure.error}`;
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

  let record: MbppProblemRecord;
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
  const extraction = extractCompletion(replyText);
  const extractionNote = extraction.notes.length > 0 ? extraction.notes.join("; ") : "as returned";

  const baseLog = [
    `=== extraction (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    "",
    "=== response ===",
    replyText,
    "",
    "=== submitted code ===",
    extraction.completion
  ].join("\n");

  if (extraction.completion.trim() === "") {
    const cause = truncated
      ? "token budget exhausted before code was produced - raise max_tokens for this model"
      : "the model returned no code";
    return finish({
      status: "fail",
      errorType: truncated ? "provider_error" : undefined,
      retryable: truncated ? true : undefined,
      score: 0,
      summary: `no code block found in response - ${cause}`,
      rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
      output: { finalAnswer: replyText, assistantMessages: [replyText] }
    });
  }

  await emit({
    type: "model_progress",
    modelId,
    scenarioId: problemId,
    message: `Executing submission (${extraction.completion.length} chars) with ${options.python.display}.`
  });

  const outcome = await executeCode({
    python: options.python,
    harnessScriptPath: harnessPath(),
    problemFile: problemFilePath(problemId),
    code: extraction.completion,
    minTimeLimitS: options.minTimeLimitS,
    gtTimeLimitFactor: options.gtTimeLimitFactor,
    timeoutPerTaskS: options.timeoutPerTaskS,
    execTimeoutMs: options.execTimeoutMs
  });

  const output = { finalAnswer: replyText, assistantMessages: [replyText] };

  if (outcome.kind === "passed") {
    const harness = outcome.harness;
    return finish({
      status: "pass",
      score: 1,
      summary: `${phaseDetail(harness)} - all ${harness.total} inputs passed`,
      rawLog: clip(
        `${baseLog}\n\n=== execution ===\npass: ${phaseDetail(harness)} in ${harness.elapsed_s ?? "?"}s`,
        MAX_RAW_LOG_CHARS
      ),
      output
    });
  }

  if (outcome.kind === "failed") {
    const harness = outcome.harness;
    const detail = harness.detail ?? {};
    const errorMessage = typeof detail.error_message === "string" ? detail.error_message : undefined;
    const error = typeof detail.error === "string" ? detail.error : undefined;
    const failing = firstFailure(harness.base) ?? firstFailure(harness.plus);
    const reason = errorMessage
      ? `${errorMessage}${error ? ` (${error})` : ""}`
      : failing
        ? `failed on ${failing}`
        : "failed";
    // A submission that does not even parse is almost always a reply without the
    // fenced code block the prompt asks for; say so instead of only showing the
    // SyntaxError the harness reported.
    const noFenceHint =
      errorMessage === "submission did not load" && !extraction.notes.includes("stripped markdown fence")
        ? " - the response contained no fenced code block (the prompt requires one)"
        : "";
    return finish({
      status: "fail",
      score: 0,
      summary: `${phaseDetail(harness)} - ${reason}${noFenceHint}${truncated ? " (completion truncated - raise max_tokens)" : ""}`,
      rawLog: clip(
        `${baseLog}\n\n=== execution ===\nfail: ${phaseDetail(harness)}\n` +
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
