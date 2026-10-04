"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProblemForModel = runProblemForModel;
const prompts_1 = require("./prompts");
const extract_1 = require("./extract");
const normalize_1 = require("./normalize");
const model_client_1 = require("./model-client");
const MAX_RAW_LOG_CHARS = 20_000;
function clip(text, max) {
    return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}
async function runProblemForModel(model, modelId, modelLabel, problem, emit, options) {
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
        message: `Requesting answer from ${modelLabel}.`
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
    const extraction = (0, extract_1.extractFinalAnswer)(replyText);
    const extractionNote = extraction.notes.join("; ");
    const baseLog = [
        `=== answer (${extractionNote}; finish_reason: ${reply.finishReason ?? "unknown"}) ===`,
        extraction.candidate ?? "(no candidate extracted)",
        "",
        `=== gold ===`,
        problem.answer,
        "",
        "=== response ===",
        replyText
    ].join("\n");
    if (extraction.candidate === undefined) {
        return finish({
            status: "fail",
            score: 0,
            summary: `unparseable answer - no boxed, phrase or final-line candidate found in response${truncated ? " (response truncated - raise max_tokens)" : ""}`,
            rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
            output: { finalAnswer: replyText, assistantMessages: [replyText] }
        });
    }
    const correct = (0, normalize_1.answersMatch)(extraction.candidate, problem.answer);
    const summary = correct
        ? `correct (answered ${extraction.candidate})`
        : `wrong: answered ${extraction.candidate}, expected ${problem.answer}${truncated ? " (response truncated - raise max_tokens)" : ""}`;
    return finish({
        status: correct ? "pass" : "fail",
        score: correct ? 1 : 0,
        summary,
        rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
        output: { finalAnswer: replyText, assistantMessages: [replyText] }
    });
}
