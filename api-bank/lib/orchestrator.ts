import type { ProgressEmitter, ScenarioResult } from "@benchlocal/sdk";

import type { ApiDef, ApiScenario, ChatMessage, ExecutedCall, ModelSettings } from "./types";
import { buildMessages, buildToolSchemas } from "./prompts";
import { createChatCompletion } from "./model-client";
import { executeCall, revealedTools } from "./mock-api";
import { gradeSequence, formatCall } from "./grade";
import { parseArguments } from "./extract";

export type RunScenarioOptions = {
  signal?: AbortSignal;
};

/** Hard cap on assistant turns per scenario (documented in METHODOLOGY.md). */
export const MAX_TURNS = 16;

const MAX_RAW_LOG_CHARS = 24_000;

function clip(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}

export async function runScenarioForModel(
  model: ModelSettings,
  modelId: string,
  modelLabel: string,
  scenario: ApiScenario,
  apiDefs: Record<string, ApiDef>,
  emit: ProgressEmitter,
  options: RunScenarioOptions
): Promise<ScenarioResult> {
  const startedAt = new Date();
  const startedAtMs = Date.now();

  const finish = (
    partial: Pick<ScenarioResult, "status" | "summary"> & Partial<ScenarioResult>
  ): ScenarioResult => ({
    scenarioId: scenario.id,
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
    scenarioId: scenario.id,
    message: `Requesting API calls for ${scenario.id} (level ${scenario.level}) from ${modelLabel}.`
  });

  const messages: ChatMessage[] = buildMessages(scenario);
  const available = scenario.requiresRetrieval ? ["ToolSearcher"] : [...scenario.toolNames];
  const executed: ExecutedCall[] = [];
  const transcript: string[] = [];
  let turns = 0;
  let capped = false;
  let finishReason: string | undefined;

  for (let turn = 1; turn <= MAX_TURNS; turn += 1) {
    turns = turn;
    let reply;
    try {
      reply = await createChatCompletion(model, messages, buildToolSchemas(apiDefs, available), {
        signal: options.signal
      });
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

    finishReason = reply.finishReason ?? finishReason;

    if (reply.toolCalls.length === 0) {
      transcript.push(`--- turn ${turn}: no tool call (text: ${reply.text.slice(0, 160) || "(empty)"})`);
      break;
    }

    messages.push({
      role: "assistant",
      content: reply.text,
      tool_calls: reply.toolCalls.map((call) => ({
        id: call.id,
        type: "function" as const,
        function: { name: call.name, arguments: call.argumentsRaw }
      }))
    });

    for (const call of reply.toolCalls) {
      const parsed = parseArguments(call.argumentsRaw);
      const executedCall: ExecutedCall = {
        id: call.id,
        name: call.name,
        args: parsed.args,
        parsed: parsed.ok,
        error: parsed.error
      };
      executed.push(executedCall);

      const result = executeCall(apiDefs, scenario, executedCall);
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result.output)
      });

      for (const name of revealedTools(scenario, executedCall, result.output)) {
        if (!available.includes(name)) {
          available.push(name);
        }
      }

      transcript.push(
        `--- turn ${turn}: ${formatCall(executedCall)} [${result.source}]${
          parsed.ok ? "" : ` (argument parse error: ${parsed.error})`
        }`
      );
    }

    if (turn === MAX_TURNS) {
      capped = true;
    }
  }

  const grade = gradeSequence(scenario.expectedCalls, executed);
  const expectedLines = scenario.expectedCalls.map((call, index) => `  ${index + 1}. ${formatCall(call)}`).join("\n");
  const actualLines =
    executed.length === 0
      ? "  (none)"
      : executed.map((call, index) => `  ${index + 1}. ${formatCall(call)}`).join("\n");

  const baseLog = [
    `=== scenario ${scenario.id} (level ${scenario.level}) ===`,
    `finish_reason: ${finishReason ?? "unknown"}; turns: ${turns}${capped ? " (turn cap reached)" : ""}`,
    "",
    "=== expected calls ===",
    expectedLines || "  (none)",
    "",
    "=== executed calls ===",
    actualLines,
    "",
    "=== transcript ===",
    transcript.join("\n") || "(no turns)"
  ].join("\n");

  const truncated = finishReason === "length" || finishReason === "max_tokens";
  const suffix = truncated ? " (response truncated - raise max_tokens)" : "";

  const toolCallRecords = executed.map((call, index) => ({
    id: call.id,
    name: call.name,
    rawArguments: JSON.stringify(call.args),
    turn: index + 1
  }));

  if (grade.passed) {
    return finish({
      status: "pass",
      score: 1,
      summary: `level ${scenario.level}: matched ${grade.expectedCount}/${grade.expectedCount} API call(s)${suffix}`,
      rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
      output: { finalAnswer: actualLines, assistantMessages: transcript, toolCalls: toolCallRecords }
    });
  }

  await emit({
    type: "model_progress",
    modelId,
    scenarioId: scenario.id,
    message: `${scenario.id}: ${grade.reason}`
  });

  return finish({
    status: "fail",
    score: 0,
    summary: `level ${scenario.level}: ${grade.reason}${suffix}`,
    rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
    output: { finalAnswer: actualLines, assistantMessages: transcript, toolCalls: toolCallRecords }
  });
}
