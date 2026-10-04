"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProblemForModel = runProblemForModel;
const prompts_1 = require("./prompts");
const extract_1 = require("./extract");
const model_client_1 = require("./model-client");
const executor_1 = require("./executor");
const dataset_1 = require("./dataset");
const MAX_RAW_LOG_CHARS = 20_000;
function clip(text, max) {
    return text.length <= max ? text : `${text.slice(0, max)}\n...[clipped]`;
}
async function runProblemForModel(model, modelId, modelLabel, problemId, emit, options) {
    const startedAt = new Date();
    const startedAtMs = Date.now();
    const finish = (partial) => ({
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
    const meta = (0, dataset_1.getProblemMeta)(problemId);
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
        record = (0, dataset_1.loadProblemRecord)(problemId);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return finish({
            status: "fail",
            errorType: "execution_error",
            retryable: true,
            score: 0,
            summary: `could not load problem record: ${message}`
        });
    }
    let reply;
    try {
        reply = await (0, model_client_1.createChatCompletion)(model, (0, prompts_1.buildMessages)(record), { signal: options.signal });
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
    const extraction = (0, extract_1.extractCode)(replyText);
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
            summary: `no code block found in response (fenced \`\`\` block required)${truncated ? " (response truncated - raise max_tokens)" : ""}`,
            rawLog: clip(baseLog, MAX_RAW_LOG_CHARS),
            output: { finalAnswer: replyText, assistantMessages: [replyText] }
        });
    }
    const outcome = await (0, executor_1.executeCode)({
        python: options.python,
        harnessScriptPath: (0, dataset_1.harnessPath)(),
        problemFile: (0, dataset_1.problemFilePath)(problemId),
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
            rawLog: clip(`${baseLog}\n\n=== execution ===\npass: ${harness.passed_count}/${harness.total} tests in ${harness.elapsed_s ?? "?"}s`, MAX_RAW_LOG_CHARS),
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
            rawLog: clip(`${baseLog}\n\n=== execution ===\nfail: ${harness.passed_count}/${harness.total} tests passed\n` +
                `detail: ${JSON.stringify(harness.detail ?? {})}`, MAX_RAW_LOG_CHARS),
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
            rawLog: clip(`${baseLog}\n\n=== harness error ===\n${outcome.message}\n\n=== stderr tail ===\n${outcome.stderrTail}`, MAX_RAW_LOG_CHARS),
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
