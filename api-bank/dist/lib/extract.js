"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccumulator = createAccumulator;
exports.accumulateDelta = accumulateDelta;
exports.accumulateMessageToolCalls = accumulateMessageToolCalls;
exports.finalizeToolCalls = finalizeToolCalls;
exports.parseArguments = parseArguments;
function createAccumulator() {
    return { order: [], byIndex: new Map() };
}
/** Merge one streamed delta fragment into the accumulator. */
function accumulateDelta(acc, delta) {
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
function accumulateMessageToolCalls(acc, toolCalls) {
    if (!Array.isArray(toolCalls)) {
        return;
    }
    toolCalls.forEach((call, fallbackIndex) => {
        if (!call || typeof call !== "object") {
            return;
        }
        const record = call;
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
function finalizeToolCalls(acc) {
    const calls = [];
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
function parseArguments(raw) {
    const text = (raw ?? "").trim();
    if (text === "") {
        return { args: {}, ok: true };
    }
    try {
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return { args: parsed, ok: true };
        }
        return { args: {}, ok: false, error: "arguments were not a JSON object" };
    }
    catch (error) {
        return { args: {}, ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}
