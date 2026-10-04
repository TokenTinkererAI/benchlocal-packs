"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScenarioForModel = runScenarioForModel;
const prompts_1 = require("./prompts");
const extract_1 = require("./extract");
const model_client_1 = require("./model-client");
const executor_1 = require("./executor");
const MAX_RAW_LOG_CHARS = 20_000;
function clip(text, max) {
    return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}
function lastMeaningfulLine(text) {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    return lines.length > 0 ? lines[lines.length - 1] : undefined;
}
async function runScenarioForModel(model, modelId, modelLabel, problem, emit, options) {
    const startedAt = new Date();
    const startedAtMs = Date.now();
    const finish = (partial) => ({
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
    let reply;
    try {
        reply = await (0, model_client_1.createChatCompletion)(model, (0, prompts_1.buildMessages)(problem), { signal: options.signal });
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
    const replyText = reply.text;
    const truncated = reply.finishReason === "length" || reply.finishReason === "max_tokens";
    const extracted = (0, extract_1.extractCompletion)(replyText, problem);
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
            rawLog: clip([
                `=== empty completion (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
                "",
                "=== assistant content as received ===",
                replyText.length > 0 ? replyText : "(content field was empty; reasoning-only output cannot be scored)"
            ].join("\n"), MAX_RAW_LOG_CHARS),
            output: { finalAnswer: "", assistantMessages: [replyText] }
        });
    }
    await emit({
        type: "model_progress",
        modelId,
        scenarioId: problem.id,
        message: `Executing submission (${extracted.completion.length} chars) with ${options.python.display}.`
    });
    let outcome;
    try {
        outcome = await (0, executor_1.runCheck)(options.python, problem, extracted.completion, {
            timeoutMs: options.execTimeoutMs
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return finish({
            status: "fail",
            errorType: "execution_error",
            retryable: true,
            score: 0,
            summary: `execution harness error: ${message}`,
            rawLog: clip(`=== execution harness error ===\n${message}\n\n=== completion (${extractionNote}) ===\n${extracted.completion}`, MAX_RAW_LOG_CHARS)
        });
    }
    const passed = outcome.status === "passed";
    const failureLine = lastMeaningfulLine(outcome.stderrTail);
    const summary = passed
        ? `passed in ${outcome.durationMs}ms`
        : outcome.status === "timed_out"
            ? `timed out after ${outcome.durationMs}ms`
            : outcome.status === "spawn_error"
                ? `python spawn failed: ${failureLine ?? "unknown error"}`
                : `failed: ${failureLine ?? "non-zero exit"}${truncated ? " (completion truncated - raise max_tokens)" : ""}`;
    const rawLog = clip([
        `=== completion (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
        extracted.completion,
        "",
        "=== execution ===",
        `status: ${outcome.status}, exit: ${outcome.exitCode}, duration: ${outcome.durationMs}ms`,
        `python: ${options.python.display}`,
        outcome.stderrTail ? `=== stderr tail ===\n${outcome.stderrTail}` : ""
    ].join("\n"), MAX_RAW_LOG_CHARS);
    return finish({
        status: passed ? "pass" : "fail",
        score: passed ? 1 : 0,
        summary,
        rawLog,
        output: {
            finalAnswer: extracted.completion,
            assistantMessages: [replyText]
        }
    });
}
