/**
 * One scenario = one problem: request a completion, extract it, grade it with
 * the local Python harness, and shape the result for BenchLocal.
 */
import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import { executeCompletion } from "./executor";
import { extractCompletion } from "./extract";
import { createChatCompletion } from "./model-client";
import { buildMessages } from "./prompts";
import type {
  ExecutionOutcome,
  HarnessResult,
  ModelReply,
  ModelSettings,
  ProblemMeta,
  PythonInterpreter
} from "./types";

export type RunScenarioOptions = {
  python: PythonInterpreter;
  harnessScriptPath: string;
  problemFile: string;
  execTimeoutMs?: number;
  signal?: AbortSignal;
};

const MAX_RAW_LOG_CHARS = 20_000;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

/** Human-readable one-liner for a harness verdict. */
function describeHarness(harness: HarnessResult): string {
  const detail = harness.detail;
  const where =
    detail && typeof detail.test_index === "number" && detail.test_index >= 0
      ? ` (${detail.suite ?? "?"} test ${detail.test_index + 1}${detail.tests ? `/${detail.tests}` : ""})`
      : "";
  switch (detail?.kind) {
    case "pass":
      return "all graded tests passed";
    case "wrong_answer":
      return `wrong answer${where}${detail.message ? `: ${detail.message}` : ""}`;
    case "runtime_error":
      return `runtime error${where}${detail.error ? `: ${detail.error}` : ""}`;
    case "comparison_error":
      return `comparison failed${where}${detail.error ? `: ${detail.error}` : ""}`;
    case "timeout":
      return `per-test time limit (${detail.limit_seconds ?? "?"}s) exceeded${where}`;
    case "global_timeout":
      return `global test-suite deadline exceeded${where}`;
    case "syntax_error":
      return `submission is not valid Python: ${detail.error ?? "syntax error"}`;
    case "entry_point_missing":
      return `the entry point was not defined by the submission: ${detail.error ?? ""}`.trim();
    case "submission_error":
      return `submission failed while loading: ${detail.error ?? ""}`.trim();
    default:
      return harness.error ?? "grading failed";
  }
}

export async function runScenarioForModel(
  model: ModelSettings,
  modelId: string,
  modelLabel: string,
  problem: ProblemMeta,
  emit: ProgressEmitter,
  options: RunScenarioOptions
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
    message: `Requesting completion from ${modelLabel}.`
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
  const extracted = extractCompletion(replyText, problem);
  const extractionNote = extracted.notes.length > 0 ? extracted.notes.join("; ") : "as returned";

  if (extracted.completion.trim() === "") {
    const cause = truncated
      ? "token budget exhausted before code was produced - raise max_tokens for this model"
      : "the model returned no code";
    return finish({
      status: "fail",
      errorType: truncated ? "provider_error" : undefined,
      retryable: truncated ? true : undefined,
      score: 0,
      summary: `empty completion - ${cause}`,
      rawLog: clip(
        [
          `=== empty completion (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
          "",
          "=== assistant content as received ===",
          replyText.length > 0 ? replyText : "(content field was empty; reasoning-only output cannot be scored)"
        ].join("\n"),
        MAX_RAW_LOG_CHARS
      ),
      output: { finalAnswer: "", assistantMessages: [replyText] }
    });
  }

  await emit({
    type: "model_progress",
    modelId,
    scenarioId: problem.id,
    message: `Grading submission (${extracted.completion.length} chars) against ${problem.baseTests} base + ${problem.plusTests} plus tests with ${options.python.display}.`
  });

  let outcome: ExecutionOutcome;
  try {
    outcome = await executeCompletion({
      python: options.python,
      harnessScriptPath: options.harnessScriptPath,
      problemFile: options.problemFile,
      completion: extracted.completion,
      execTimeoutMs: options.execTimeoutMs
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return finish({
      status: "fail",
      errorType: "execution_error",
      retryable: true,
      score: 0,
      summary: `execution harness error: ${message}`,
      rawLog: clip(
        `=== execution harness error ===\n${message}\n\n=== completion (${extractionNote}) ===\n${extracted.completion}`,
        MAX_RAW_LOG_CHARS
      )
    });
  }

  const logLines = [
    `=== completion (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    extracted.completion,
    "",
    "=== execution ===",
    `outcome: ${outcome.kind}, duration: ${outcome.durationMs}ms`,
    `python: ${options.python.display}`
  ];

  if (outcome.kind === "passed" || outcome.kind === "failed") {
    const { harness } = outcome;
    logLines.push(
      `verdict: ${harness.verdict} | base: ${harness.base_status} (${harness.base_tests ?? 0} tests) | plus: ${harness.plus_status} (${harness.plus_tests ?? 0} tests)`,
      `detail: ${describeHarness(harness)}`
    );
    if (harness.detail?.input !== undefined) {
      logLines.push(`failing input: ${harness.detail.input}`);
    }
    if (harness.detail?.expected !== undefined || harness.detail?.got !== undefined) {
      logLines.push(`expected: ${harness.detail.expected ?? "(n/a)"}`, `got:      ${harness.detail.got ?? "(n/a)"}`);
    }
    if (harness.detail?.error) {
      logLines.push(`error: ${harness.detail.error}`);
    }
    if (outcome.kind === "passed") {
      return finish({
        status: "pass",
        score: 1,
        summary: `passed in ${outcome.durationMs}ms (${harness.base_tests ?? 0} base + ${harness.plus_tests ?? 0} plus tests)`,
        rawLog: clip(logLines.join("\n"), MAX_RAW_LOG_CHARS),
        output: { finalAnswer: extracted.completion, assistantMessages: [replyText] }
      });
    }
    const truncatedHint = truncated ? " (completion truncated - raise max_tokens)" : "";
    return finish({
      status: "fail",
      score: 0,
      summary: `failed: ${describeHarness(harness)}${truncatedHint}`,
      rawLog: clip(logLines.join("\n"), MAX_RAW_LOG_CHARS),
      output: { finalAnswer: extracted.completion, assistantMessages: [replyText] }
    });
  }

  if (outcome.kind === "timed_out") {
    logLines.push(`execution cap of ${outcome.timeoutMs}ms exceeded - process tree killed`);
    return finish({
      status: "fail",
      errorType: "execution_error",
      retryable: true,
      score: 0,
      summary: `timed out after ${outcome.timeoutMs}ms (execution cap)`,
      rawLog: clip(logLines.join("\n"), MAX_RAW_LOG_CHARS),
      output: { finalAnswer: extracted.completion, assistantMessages: [replyText] }
    });
  }

  const message = outcome.message;
  const stderrTail = outcome.kind === "harness_error" ? outcome.stderrTail : "";
  logLines.push(
    `harness error: ${message}`,
    stderrTail ? `=== stderr tail ===\n${stderrTail}` : ""
  );
  return finish({
    status: "fail",
    errorType: "execution_error",
    retryable: true,
    score: 0,
    summary: `execution harness error: ${message}`,
    rawLog: clip(logLines.join("\n"), MAX_RAW_LOG_CHARS),
    output: { finalAnswer: extracted.completion, assistantMessages: [replyText] }
  });
}
