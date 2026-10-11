"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeModelOutput = decodeModelOutput;
exports.runScenarioForModel = runScenarioForModel;
const prompts_1 = require("./prompts");
const tools_1 = require("./tools");
const model_client_1 = require("./model-client");
const grading_1 = require("./grading");
const dataset_1 = require("./dataset");
/** Host-shaped model output record for the run artifact. */
function toModelOutput(reply) {
    return {
        finalAnswer: reply.text.length > 0 ? reply.text : undefined,
        assistantMessages: reply.text.length > 0 ? [reply.text] : [],
        toolCalls: reply.toolCalls.map((call, index) => ({
            id: `call_${index}`,
            name: (0, dataset_1.normalizeFuncName)(call.name ?? ""),
            rawArguments: call.arguments ?? ""
        }))
    };
}
const MAX_RAW_LOG_CHARS = 20_000;
function clip(text, max) {
    return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}
/**
 * Converts emitted tool calls into BFCL's model-output shape: a list of
 * `{ function_name: { param: value } }` dictionaries. A call whose arguments
 * are not a JSON object cannot be decoded and fails the scenario, mirroring
 * upstream's decoder-failure path.
 */
function decodeModelOutput(toolCalls) {
    const calls = [];
    for (const call of toolCalls) {
        const name = (0, dataset_1.normalizeFuncName)(call.name ?? "");
        if (!name) {
            return { calls, error: "a tool call was emitted without a function name" };
        }
        const rawArguments = (call.arguments ?? "").trim();
        let parsed = {};
        if (rawArguments !== "" && rawArguments !== "{}") {
            try {
                parsed = JSON.parse(rawArguments);
            }
            catch {
                return { calls, error: `arguments for '${name}' were not valid JSON: ${rawArguments.slice(0, 200)}` };
            }
        }
        const args = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
        calls.push({ [name]: args });
    }
    return { calls };
}
async function runScenarioForModel(model, modelId, modelLabel, scenario, emit, options) {
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
        message: `Requesting tool calls from ${modelLabel} (${scenario.functions.length} function(s) available).`
    });
    let reply;
    try {
        reply = await (0, model_client_1.createChatCompletion)(model, (0, prompts_1.buildMessages)(scenario), (0, tools_1.buildWireTools)(scenario.functions), {
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
    const truncated = reply.finishReason === "length" || reply.finishReason === "max_tokens";
    const decoded = decodeModelOutput(reply.toolCalls);
    const baseLog = [
        `=== scenario ${scenario.id} (${scenario.category}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
        `=== emitted tool calls (${reply.toolCalls.length}) ===`,
        JSON.stringify(decoded.calls, null, 2),
        "",
        "=== assistant content ===",
        reply.text
    ].join("\n");
    if (decoded.error) {
        return finish({
            status: "fail",
            score: 0,
            summary: `decode error: ${decoded.error}${truncated ? " (response truncated - raise max_tokens)" : ""}`,
            rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
            output: toModelOutput(reply)
        });
    }
    const checksIrrelevance = scenario.category === "irrelevance";
    const check = checksIrrelevance
        ? (0, grading_1.checkIrrelevance)(decoded.calls)
        : (0, grading_1.astChecker)(scenario.functions, decoded.calls, scenario.gold, scenario.category);
    if (check.valid) {
        const summary = checksIrrelevance
            ? "correct: no function call emitted"
            : `correct: ${decoded.calls.length} call(s) matched`;
        return finish({
            status: "pass",
            score: 1,
            summary,
            rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
            output: toModelOutput(reply)
        });
    }
    const reason = check.error[0] ?? "no detail";
    return finish({
        status: "fail",
        score: 0,
        summary: `wrong: ${check.errorType}: ${reason}${truncated ? " (response truncated - raise max_tokens)" : ""}`,
        rawLog: clip(`${baseLog}\n\n=== grading (${check.errorType}) ===\n${check.error.join("\n")}`, MAX_RAW_LOG_CHARS),
        output: toModelOutput(reply)
    });
}
