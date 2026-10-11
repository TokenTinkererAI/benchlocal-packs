/**
 * Tool-call extraction for API-Bank.
 *
 * Two input shapes feed the same accumulator:
 *   - streamed SSE deltas, where `tool_calls[i].function.name` and
 *     `tool_calls[i].function.arguments` arrive as fragments across chunks;
 *   - a non-streaming `message` object, where each tool call is already whole.
 *
 * The accumulator is keyed by the OpenAI `index` field so parallel calls
 * (several tool calls in one assistant turn) are reassembled independently.
 * Nothing here decides correctness — parsing is separate from grading.
 */
import type { ToolCall } from "./types";

export type ToolCallDelta = {
  index?: number;
  id?: string;
  type?: string;
  function?: { name?: string; arguments?: string };
};

export type ToolCallAccumulator = {
  order: number[];
  byIndex: Map<number, { id?: string; name: string; arguments: string }>;
};

export function createAccumulator(): ToolCallAccumulator {
  return { order: [], byIndex: new Map() };
}

/** Merge one streamed delta fragment into the accumulator. */
export function accumulateDelta(acc: ToolCallAccumulator, delta: ToolCallDelta | undefined): void {
  if (!delta) {
    return;
  }
  const index = typeof delta.index === "number" ? delta.index : acc.order.length;
  let entry = acc.byIndex.get(index);
  if (!entry) {
    entry = { name: "", arguments: "" };
    acc.byIndex.set(index, entry);
    acc.order.push(index);
  }
  if (typeof delta.id === "string" && delta.id !== "") {
    entry.id = delta.id;
  }
  const fn = delta.function;
  if (fn) {
    if (typeof fn.name === "string" && fn.name !== "") {
      // Some servers re-send the whole name on every fragment; others stream it.
      entry.name = entry.name === "" || fn.name.startsWith(entry.name) ? fn.name : entry.name + fn.name;
    }
    if (typeof fn.arguments === "string") {
      entry.arguments += fn.arguments;
    }
  }
}

/** Merge a whole (non-streamed) `message.tool_calls` array into the accumulator. */
export function accumulateMessageToolCalls(acc: ToolCallAccumulator, toolCalls: unknown): void {
  if (!Array.isArray(toolCalls)) {
    return;
  }
  toolCalls.forEach((call, fallbackIndex) => {
    if (!call || typeof call !== "object") {
      return;
    }
    const record = call as { id?: unknown; index?: unknown; function?: { name?: unknown; arguments?: unknown } };
    const index = typeof record.index === "number" ? record.index : fallbackIndex;
    const name = typeof record.function?.name === "string" ? record.function.name : "";
    const args = typeof record.function?.arguments === "string" ? record.function.arguments : "";
    const id = typeof record.id === "string" ? record.id : undefined;
    acc.byIndex.set(index, { id, name, arguments: args });
    if (!acc.order.includes(index)) {
      acc.order.push(index);
    }
  });
}

/** Finalize accumulated fragments into ordered tool calls, skipping empty ones. */
export function finalizeToolCalls(acc: ToolCallAccumulator): ToolCall[] {
  const calls: ToolCall[] = [];
  for (const index of acc.order) {
    const entry = acc.byIndex.get(index);
    if (!entry) {
      continue;
    }
    const name = entry.name.trim();
    if (name === "") {
      continue;
    }
    calls.push({
      id: entry.id && entry.id !== "" ? entry.id : `call_${index}`,
      name,
      argumentsRaw: entry.arguments
    });
  }
  return calls;
}

/** Parse a raw arguments string into a JSON object; tolerate empty/blank as {}. */
export function parseArguments(raw: string): { args: Record<string, unknown>; ok: boolean; error?: string } {
  const text = (raw ?? "").trim();
  if (text === "") {
    return { args: {}, ok: true };
  }
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { args: parsed as Record<string, unknown>, ok: true };
    }
    return { args: {}, ok: false, error: "arguments were not a JSON object" };
  } catch (error) {
    return { args: {}, ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
