import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { HarnessResult, ModelReply, ModelSettings, PythonInterpreter } from "./types";
import { buildMessages } from "./prompts";
import { createChatCompletion } from "./model-client";
import { executeGrading } from "./executor";
import { getProblem, harnessPath } from "./dataset";

export type RunProblemOptions = {
  python: PythonInterpreter;
  signal?: AbortSignal;
  execTimeoutMs?: number;
};

const MAX_RAW_LOG_CHARS = 20_000;
const MAX_MISSED_LIST = 3;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

function countFlags(flags: boolean[] | undefined): number {
  return (flags ?? []).filter(Boolean).length;
}

function missedSuffix(missed: string[] | undefined): string {
  const list = (missed ?? []).filter(Boolean);
  if (list.length === 0) {
    return "";
  }
  const shown = list.slice(0, MAX_MISSED_LIST).join(", ");
  const extra = list.length > MAX_MISSED_LIST ? `, +${list.length - MAX_MISSED_LIST} more` : "";
  return `; missed ${shown}${extra}`;
}

/** `strict: pass (3/3) | loose: pass (3/3)` - the per-scenario human summary. */
function gradedSummary(harness: HarnessResult): string {
  const total = harness.total ?? 0;
  const strictCount = countFlags(harness.strict_instruction_flags);
  const looseCount = countFlags(harness.loose_instruction_flags);
  const strictWord = harness.strict ? "pass" : "fail";
  const looseWord = harness.loose ? "pass" : "fail";
  const strictText = `strict: ${strictWord} (${strictCount}/${total}${harness.strict ? "" : missedSuffix(harness.strict_failed)})`;
  const looseText = `loose: ${looseWord} (${looseCount}/${total}${harness.loose ? "" : missedSuffix(harness.loose_failed)})`;
  return `${strictText} | ${looseText}`;
}

function verdictNote(harness: HarnessResult): string {
  return `strict=${harness.strict ? "pass" : "fail"} loose=${harness.loose ? "pass" : "fail"}`;
}

function detailBlock(harness: HarnessResult): string {
  const ids = harness.instruction_ids ?? [];
  const strictFlags = harness.strict_instruction_flags ?? [];
  const looseFlags = harness.loose_instruction_flags ?? [];
  const rows = ids.map((id, index) => {
    const strictFlag = strictFlags[index] ? "yes" : "no";
    const looseFlag = looseFlags[index] ? "yes" : "no";
    return `  ${id}: strict=${strictFlag} loose=${looseFlag}`;
  });
  return [
    `strict: ${harness.strict ? "pass" : "fail"} (${countFlags(harness.strict_instruction_flags)}/${harness.total ?? 0})`,
    `loose:  ${harness.loose ? "pass" : "fail"} (${countFlags(harness.loose_instruction_flags)}/${harness.total ?? 0})`,
    "per instruction:",
    ...rows
  ].join("\n");
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

  const problem = getProblem(problemId);
  if (!problem) {
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
    message: `Requesting response from ${modelLabel}.`
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
  const truncationHint = truncated ? " (response truncated - raise max_tokens)" : "";

  const baseLog = [
    `=== prompt (${problem.instructionIds.length} instruction(s): ${problem.instructionIds.join(", ")}) ===`,
    problem.prompt,
    "",
    `=== response (finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
    replyText
  ].join("\n");

  const output = { finalAnswer: replyText, assistantMessages: [replyText] };

  if (replyText.trim() === "") {
    return finish({
      status: "fail",
      score: 0,
      note: "strict=fail loose=fail",
      summary: `empty response (0/${problem.instructionIds.length} instructions)${truncationHint}`,
      rawLog: clip(`${baseLog}\n\n=== grading ===\nempty response - every instruction counts as not followed`, MAX_RAW_LOG_CHARS),
      output
    });
  }

  const outcome = await executeGrading({
    python: options.python,
    harnessScriptPath: harnessPath(),
    spec: {
      problem_id: problem.id,
      key: problem.key,
      prompt: problem.prompt,
      instruction_id_list: problem.instructionIds,
      kwargs: problem.kwargs,
      response: replyText
    },
    execTimeoutMs: options.execTimeoutMs
  });

  if (outcome.kind === "graded") {
    const harness = outcome.harness;
    const summaryText = gradedSummary(harness);
    return finish({
      status: harness.strict ? "pass" : "fail",
      score: harness.strict ? 1 : 0,
      note: verdictNote(harness),
      summary: `${summaryText}${harness.strict ? "" : truncationHint}`,
      rawLog: clip(`${baseLog}\n\n=== grading ===\n${detailBlock(harness)}\n(${harness.elapsed_s ?? "?"}s)`, MAX_RAW_LOG_CHARS),
      output
    });
  }

  if (outcome.kind === "timed_out") {
    return finish({
      status: "fail",
      errorType: "execution_error",
      retryable: true,
      score: 0,
      summary: `grading exceeded the ${outcome.timeoutMs} ms wall-clock cap`,
      rawLog: clip(`${baseLog}\n\n=== grading ===\nwall-clock cap exceeded`, MAX_RAW_LOG_CHARS),
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

export { gradedSummary, verdictNote };
