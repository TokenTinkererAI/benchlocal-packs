/**
 * OpenAI-compatible chat-completions client with native tool calling.
 *
 * Requests are made with `stream: true` and the SSE response is accumulated
 * client-side. This is deliberate: Node's built-in fetch (undici) enforces a
 * hard ~300 s response-headers timeout that cannot be raised from this code,
 * and non-streaming servers do not send headers until generation finishes —
 * long reasoning would otherwise die with "fetch failed". With streaming,
 * headers arrive immediately and the only limits left are this client's own
 * request timeout and the caller's abort signal.
 *
 * Tool calls are reassembled from streamed `tool_calls` deltas and, for
 * servers that ignore `stream` (or buffer the stream), from a single
 * application/json body — both paths are covered.
 */
import type { ChatMessage, ModelReply, ModelSettings, ToolCall } from "./types";
import {
  accumulateDelta,
  accumulateMessageToolCalls,
  createAccumulator,
  finalizeToolCalls,
  type ToolCallAccumulator
} from "./extract";

const DEFAULT_TIMEOUT_MS = 3_600_000;

function joinUrl(baseUrl: string, urlPath: string): string {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(urlPath.replace(/^\//, ""), base).toString();
}

function buildHeaders(settings: ModelSettings): Record<string, string> {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "text/event-stream, application/json"
  };
  if (settings.authMode === "bearer" && settings.apiKey) {
    headers.authorization = `Bearer ${settings.apiKey}`;
  }
  return headers;
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string") {
          return (part as { text: string }).text;
        }
        return "";
      })
      .join("");
  }
  return "";
}

type ChatChoice = {
  message?: { content?: unknown; tool_calls?: unknown };
  delta?: { content?: unknown; tool_calls?: unknown };
  finish_reason?: unknown;
};

function firstChoice(json: unknown): ChatChoice | undefined {
  if (!json || typeof json !== "object") {
    return undefined;
  }
  const choices = (json as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    return undefined;
  }
  const first = choices[0];
  return first && typeof first === "object" ? (first as ChatChoice) : undefined;
}

async function readStreamingResponse(response: Response): Promise<ModelReply> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const acc: ToolCallAccumulator = createAccumulator();
  let buffer = "";
  let text = "";
  let finishReason: string | undefined;
  let chunkCount = 0;
  let sawDone = false;

  const handleLine = (rawLine: string): void => {
    if (sawDone) {
      return;
    }
    const line = rawLine.replace(/\r$/, "");
    if (line === "" || line.startsWith(":")) {
      return;
    }
    if (!line.startsWith("data:")) {
      return;
    }
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") {
      sawDone = true;
      return;
    }
    let chunk: unknown;
    try {
      chunk = JSON.parse(payload);
    } catch {
      return;
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
    const deltas = choice.delta?.tool_calls;
    if (Array.isArray(deltas)) {
      for (const delta of deltas) {
        accumulateDelta(acc, delta as { index?: number; id?: string; function?: { name?: string; arguments?: string } });
      }
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
      let newlineIndex: number;
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
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // reader already released or errored — nothing to clean up
    }
  }

  return {
    text: text.trimEnd(),
    toolCalls: finalizeToolCalls(acc),
    finishReason,
    raw: { streamed: true, chunks: chunkCount, finishReason, done: sawDone }
  };
}

export async function createChatCompletion(
  settings: ModelSettings,
  messages: ChatMessage[],
  tools: Record<string, unknown>[] | undefined,
  options?: { signal?: AbortSignal; toolChoice?: unknown }
): Promise<ModelReply> {
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
    } else {
      externalSignal.addEventListener("abort", () => controller.abort(externalSignal.reason), { once: true });
    }
  }

  const body: Record<string, unknown> = {
    model: settings.model,
    messages,
    temperature: settings.temperature,
    top_p: settings.topP,
    max_tokens: settings.maxTokens,
    stream: true
  };
  if (tools && tools.length > 0) {
    body.tools = tools;
    body.tool_choice = options?.toolChoice ?? "auto";
  }

  try {
    const response = await fetch(joinUrl(settings.baseUrl, "/chat/completions"), {
      method: "POST",
      headers: buildHeaders(settings),
      body: JSON.stringify(body),
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
    // buffered the stream). Non-streaming tool calls live on message.tool_calls.
    const json: unknown = await response.json();
    const choice = firstChoice(json);
    if (!choice?.message) {
      throw new Error("Inference response did not include a message choice.");
    }
    const acc = createAccumulator();
    accumulateMessageToolCalls(acc, choice.message.tool_calls);
    const finishReason = typeof choice.finish_reason === "string" ? choice.finish_reason : undefined;

    return {
      text: extractTextContent(choice.message.content).trimEnd(),
      toolCalls: finalizeToolCalls(acc),
      finishReason,
      raw: json
    };
  } catch (error) {
    if (timedOut) {
      throw new Error(`Model request timed out after ${timeoutMs}ms.`);
    }
    throw error instanceof Error ? error : new Error(`Inference request failed: ${String(error)}`);
  } finally {
    clearTimeout(timeoutTimer);
  }
}

export type { ToolCall };
