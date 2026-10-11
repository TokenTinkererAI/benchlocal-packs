"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
async function readStreamingResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    let finishReason;
    let chunkCount = 0;
    let sawDone = false;
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
        // Leading whitespace is semantic (indentation of a bare function-body
        // continuation); only trailing whitespace is stripped here. Extraction
        // performs its own normalization afterwards.
        text: text.trimEnd(),
        finishReason,
        raw: { streamed: true, chunks: chunkCount, finishReason, done: sawDone }
    };
}
async function createChatCompletion(settings, messages, options) {
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
                stream: true
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
        const finishReason = typeof choice.finish_reason === "string" ? choice.finish_reason : undefined;
        return {
            // Leading whitespace is semantic (indentation of a bare function-body
            // continuation); only trailing whitespace is stripped here. Extraction
            // performs its own normalization afterwards.
            text: extractTextContent(choice.message.content).trimEnd(),
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
