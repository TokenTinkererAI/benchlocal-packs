"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallAccumulator = void 0;
exports.createChatCompletion = createChatCompletion;
const DEFAULT_TIMEOUT_MS = 3_600_000;
function joinUrl(baseUrl, urlPath) {
    const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    return new URL(urlPath.replace(/^\//, ""), base).toString();
}
function buildHeaders(settings) {
    const headers = {
        "content-type": "application/json",
        accept: "text/event-stream, application/json"
    };
    if (settings.authMode === "bearer" && settings.apiKey) {
        headers.authorization = `Bearer ${settings.apiKey}`;
    }
    return headers;
}
function extractTextContent(content) {
    if (typeof content === "string") {
        return content;
    }
    if (Array.isArray(content)) {
        return content
            .map((part) => {
            if (typeof part === "string") {
                return part;
            }
            if (part && typeof part === "object" && typeof part.text === "string") {
                return part.text;
            }
            return "";
        })
            .join("");
    }
    return "";
}
function firstChoice(json) {
    if (!json || typeof json !== "object") {
        return undefined;
    }
    const choices = json.choices;
    if (!Array.isArray(choices) || choices.length === 0) {
        return undefined;
    }
    const first = choices[0];
    if (!first || typeof first !== "object") {
        return undefined;
    }
    return first;
}
/** Accumulates streamed tool-call fragments keyed by their `index`. */
class ToolCallAccumulator {
    byIndex = new Map();
    ingest(rawToolCalls) {
        if (!Array.isArray(rawToolCalls)) {
            return;
        }
        for (const raw of rawToolCalls) {
            if (!raw || typeof raw !== "object") {
                continue;
            }
            const entry = raw;
            const index = typeof entry.index === "number" ? entry.index : 0;
            const acc = this.byIndex.get(index) ?? { name: "", arguments: "" };
            const nameFragment = entry.function?.name;
            if (typeof nameFragment === "string" && nameFragment.length > 0 && nameFragment !== acc.name) {
                // The name normally arrives once; appending also handles servers that
                // stream it in fragments, while `!==` skips servers that resend it.
                acc.name = acc.name.length === 0 ? nameFragment : acc.name + nameFragment;
            }
            const argumentFragment = entry.function?.arguments;
            if (typeof argumentFragment === "string") {
                acc.arguments += argumentFragment;
            }
            this.byIndex.set(index, acc);
        }
    }
    /** Non-streaming servers return complete tool calls on the message. */
    ingestComplete(rawToolCalls) {
        if (!Array.isArray(rawToolCalls)) {
            return;
        }
        rawToolCalls.forEach((raw, position) => {
            if (!raw || typeof raw !== "object") {
                return;
            }
            const entry = raw;
            const index = typeof entry.index === "number" ? entry.index : position;
            const name = typeof entry.function?.name === "string" ? entry.function.name : "";
            const args = typeof entry.function?.arguments === "string" ? entry.function.arguments : "";
            this.byIndex.set(index, { name, arguments: args });
        });
    }
    list() {
        return [...this.byIndex.entries()].sort((a, b) => a[0] - b[0]).map(([, call]) => call);
    }
}
exports.ToolCallAccumulator = ToolCallAccumulator;
async function readStreamingResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    let finishReason;
    let chunkCount = 0;
    let sawDone = false;
    const toolCalls = new ToolCallAccumulator();
    const handleLine = (rawLine) => {
        if (sawDone) {
            return;
        }
        const line = rawLine.replace(/\r$/, "");
        if (line === "" || line.startsWith(":")) {
            return; // SSE comment / keep-alive
        }
        if (!line.startsWith("data:")) {
            return;
        }
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") {
            sawDone = true;
            return;
        }
        let chunk;
        try {
            chunk = JSON.parse(payload);
        }
        catch {
            return; // tolerate non-JSON keep-alive payloads on the data channel
        }
        const choice = firstChoice(chunk);
        if (!choice) {
            return;
        }
        const piece = extractTextContent(choice.delta?.content);
        if (piece) {
            text += piece;
            chunkCount += 1;
        }
        toolCalls.ingest(choice.delta?.tool_calls);
        if (typeof choice.finish_reason === "string" && choice.finish_reason !== "") {
            finishReason = choice.finish_reason;
        }
    };
    try {
        while (!sawDone) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            buffer += decoder.decode(value, { stream: true });
            let newlineIndex;
            while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
                handleLine(buffer.slice(0, newlineIndex));
                buffer = buffer.slice(newlineIndex + 1);
                if (sawDone) {
                    break;
                }
            }
        }
        buffer += decoder.decode();
        if (!sawDone && buffer.trim() !== "") {
            handleLine(buffer);
        }
    }
    finally {
        try {
            reader.releaseLock();
        }
        catch {
            // reader already released or errored — nothing to clean up
        }
    }
    return {
        text: text.trimEnd(),
        toolCalls: toolCalls.list(),
        finishReason,
        raw: { streamed: true, chunks: chunkCount, finishReason, done: sawDone, toolCalls: toolCalls.list().length }
    };
}
async function createChatCompletion(settings, messages, tools, options) {
    const timeoutMs = settings.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    let timedOut = false;
    const timeoutTimer = setTimeout(() => {
        timedOut = true;
        controller.abort(new Error(`Model request timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
    const externalSignal = options?.signal;
    if (externalSignal) {
        if (externalSignal.aborted) {
            controller.abort(externalSignal.reason);
        }
        else {
            externalSignal.addEventListener("abort", () => controller.abort(externalSignal.reason), { once: true });
        }
    }
    try {
        const response = await fetch(joinUrl(settings.baseUrl, "/chat/completions"), {
            method: "POST",
            headers: buildHeaders(settings),
            body: JSON.stringify({
                model: settings.model,
                messages,
                temperature: settings.temperature,
                top_p: settings.topP,
                max_tokens: settings.maxTokens,
                stream: true,
                tools,
                tool_choice: "auto"
            }),
            signal: controller.signal
        });
        if (!response.ok) {
            const detail = await response.text();
            throw new Error(`Inference request failed with ${response.status} ${response.statusText}: ${detail}`.trim());
        }
        const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
        if (contentType.includes("text/event-stream") && response.body) {
            return await readStreamingResponse(response);
        }
        // Fallback: the server answered with a single JSON body (ignored or
        // buffered the stream). Same handling as a classic non-streaming reply.
        const json = await response.json();
        const choice = firstChoice(json);
        if (!choice?.message) {
            throw new Error("Inference response did not include a message choice.");
        }
        const toolCalls = new ToolCallAccumulator();
        toolCalls.ingestComplete(choice.message.tool_calls);
        const finishReason = typeof choice.finish_reason === "string" ? choice.finish_reason : undefined;
        return {
            text: extractTextContent(choice.message.content).trimEnd(),
            toolCalls: toolCalls.list(),
            finishReason,
            raw: json
        };
    }
    catch (error) {
        if (timedOut) {
            throw new Error(`Model request timed out after ${timeoutMs}ms.`);
        }
        throw error instanceof Error ? error : new Error(`Inference request failed: ${String(error)}`);
    }
    finally {
        clearTimeout(timeoutTimer);
    }
}
