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
/** "base 3/3, plus 108/108" - the EvalPlus base+plus detail line. */
function phaseDetail(harness) {
    const parts = [];
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
function firstFailure(phase) {
    const failure = phase?.failures?.[0];
    if (!failure) {
        return undefined;
    }
    return `input #${failure.index} - ${failure.error}`;
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
    const extraction = (0, extract_1.extractCompletion)(replyText);
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
    const outcome = await (0, executor_1.executeCode)({
        python: options.python,
        harnessScriptPath: (0, dataset_1.harnessPath)(),
        problemFile: (0, dataset_1.problemFilePath)(problemId),
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
            rawLog: clip(`${baseLog}\n\n=== execution ===\npass: ${phaseDetail(harness)} in ${harness.elapsed_s ?? "?"}s`, MAX_RAW_LOG_CHARS),
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
        const noFenceHint = errorMessage === "submission did not load" && !extraction.notes.includes("stripped markdown fence")
            ? " - the response contained no fenced code block (the prompt requires one)"
            : "";
        return finish({
            status: "fail",
            score: 0,
            summary: `${phaseDetail(harness)} - ${reason}${noFenceHint}${truncated ? " (completion truncated - raise max_tokens)" : ""}`,
            rawLog: clip(`${baseLog}\n\n=== execution ===\nfail: ${phaseDetail(harness)}\n` +
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
