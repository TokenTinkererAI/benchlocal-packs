"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TURNS = void 0;
exports.runScenarioForModel = runScenarioForModel;
const prompts_1 = require("./prompts");
const model_client_1 = require("./model-client");
const mock_api_1 = require("./mock-api");
const grade_1 = require("./grade");
const extract_1 = require("./extract");
/** Hard cap on assistant turns per scenario (documented in METHODOLOGY.md). */
exports.MAX_TURNS = 16;
const MAX_RAW_LOG_CHARS = 24_000;
function clip(text, max) {
    return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}
async function runScenarioForModel(model, modelId, modelLabel, scenario, apiDefs, emit, options) {
    const startedAt = new Date();
    const startedAtMs = Date.now();
    const finish = (partial) => ({
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
    const messages = (0, prompts_1.buildMessages)(scenario);
    const available = scenario.requiresRetrieval ? ["ToolSearcher"] : [...scenario.toolNames];
    const executed = [];
    const transcript = [];
    let turns = 0;
    let capped = false;
    let finishReason;
    for (let turn = 1; turn <= exports.MAX_TURNS; turn += 1) {
        turns = turn;
        let reply;
        try {
            reply = await (0, model_client_1.createChatCompletion)(model, messages, (0, prompts_1.buildToolSchemas)(apiDefs, available), {
                signal: options.signal
            });
        }
        catch (error) {
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
                type: "function",
                function: { name: call.name, arguments: call.argumentsRaw }
            }))
        });
        for (const call of reply.toolCalls) {
            const parsed = (0, extract_1.parseArguments)(call.argumentsRaw);
            const executedCall = {
                id: call.id,
                name: call.name,
                args: parsed.args,
                parsed: parsed.ok,
                error: parsed.error
            };
            executed.push(executedCall);
            const result = (0, mock_api_1.executeCall)(apiDefs, scenario, executedCall);
            messages.push({
                role: "tool",
                tool_call_id: call.id,
                content: JSON.stringify(result.output)
            });
            for (const name of (0, mock_api_1.revealedTools)(scenario, executedCall, result.output)) {
                if (!available.includes(name)) {
                    available.push(name);
                }
            }
            transcript.push(`--- turn ${turn}: ${(0, grade_1.formatCall)(executedCall)} [${result.source}]${parsed.ok ? "" : ` (argument parse error: ${parsed.error})`}`);
        }
        if (turn === exports.MAX_TURNS) {
            capped = true;
        }
    }
    const grade = (0, grade_1.gradeSequence)(scenario.expectedCalls, executed);
    const expectedLines = scenario.expectedCalls.map((call, index) => `  ${index + 1}. ${(0, grade_1.formatCall)(call)}`).join("\n");
    const actualLines = executed.length === 0
        ? "  (none)"
        : executed.map((call, index) => `  ${index + 1}. ${(0, grade_1.formatCall)(call)}`).join("\n");
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
