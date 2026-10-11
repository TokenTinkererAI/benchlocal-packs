#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for API-Bank end-to-end tests.
 *
 * It is tools-aware: for each request it identifies the scenario from the
 * `Scenario: <id>.` marker in the system message, counts the assistant turns
 * already in the conversation, and answers with the next expected tool call
 * (default), a deliberately wrong call (`--wrong`), or a plain text reply with
 * no tool call (`--empty`). Once the expected sequence is exhausted it answers
 * with a short closing message and `finish_reason: "stop"` so the pack's tool
 * loop terminates.
 *
 * Streaming mirrors llama.cpp: a `text/event-stream` reply whose tool call
 * arrives as several `tool_calls` deltas (name first, then the argument JSON in
 * fragments), a final `finish_reason` chunk, then `data: [DONE]`. Pass
 * `--json-only` to ignore `stream: true` and answer with a single JSON body
 * instead — that exercises the client's non-SSE tool-call fallback.
 *
 * Usage: node scripts/mock-server.mjs [--port 8223] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads dist-cli/lib/generated/scenarios.js)
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { SCENARIOS } = require("../dist-cli/lib/generated/scenarios.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8223"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const WRONG_CALL = { name: "NotATool", args: { wrong: "call" } };

function scenarioFromMessages(messages) {
  if (!Array.isArray(messages)) return undefined;
  for (const message of messages) {
    const content = typeof message?.content === "string" ? message.content : "";
    const match = /Scenario:\s*(L\d+\/\d+)\./.exec(content);
    if (match) return SCENARIOS.find((scenario) => scenario.id === match[1]);
  }
  return undefined;
}

function countAssistantTurns(messages) {
  if (!Array.isArray(messages)) return 0;
  return messages.filter((message) => message?.role === "assistant").length;
}

/** Decide what the mock should answer for this request. */
function decide(payload) {
  const scenario = scenarioFromMessages(payload.messages);
  const turn = countAssistantTurns(payload.messages);

  if (empty) {
    return { kind: "text", text: "I looked at the request but I am not going to call any API." };
  }
  if (wrong) {
    if (turn === 0) {
      return { kind: "call", call: WRONG_CALL };
    }
    return { kind: "text", text: "Done." };
  }
  if (!scenario) {
    return { kind: "text", text: "No scenario marker found; nothing to call." };
  }
  const expected = scenario.expectedCalls;
  if (turn < expected.length) {
    return { kind: "call", call: expected[turn] };
  }
  return { kind: "text", text: "All required APIs have been called." };
}

const id = () => `chatcmpl-mock-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function splitArguments(raw) {
  if (raw.length <= 24) return [raw];
  const pieces = [];
  const size = Math.max(8, Math.ceil(raw.length / 4));
  for (let i = 0; i < raw.length; i += size) {
    pieces.push(raw.slice(i, i + size));
  }
  return pieces;
}

async function writeStreamingToolCall(res, model, call) {
  const responseId = id();
  const created = Math.floor(Date.now() / 1000);
  const callId = `call_${Math.floor(Math.random() * 1e9)}`;
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive"
  });
  writeSse(res, {
    id: responseId,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [
      {
        index: 0,
        delta: { role: "assistant", tool_calls: [{ index: 0, id: callId, type: "function", function: { name: call.name, arguments: "" } }] },
        finish_reason: null
      }
    ]
  });
  for (const piece of splitArguments(JSON.stringify(call.args))) {
    if (chunkDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, chunkDelayMs));
    }
    writeSse(res, {
      id: responseId,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [
        { index: 0, delta: { tool_calls: [{ index: 0, function: { arguments: piece } }] }, finish_reason: null }
      ]
    });
  }
  writeSse(res, {
    id: responseId,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }]
  });
  res.write("data: [DONE]\n\n");
  res.end();
}

async function writeStreamingText(res, model, text) {
  const responseId = id();
  const created = Math.floor(Date.now() / 1000);
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive"
  });
  const pieces = text.split(/(\s+)/).filter((piece) => piece !== "");
  for (const piece of pieces) {
    if (chunkDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, chunkDelayMs));
    }
    writeSse(res, {
      id: responseId,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: { content: piece }, finish_reason: null }]
    });
  }
  writeSse(res, {
    id: responseId,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }]
  });
  res.write("data: [DONE]\n\n");
  res.end();
}

function jsonReply(res, model, decision) {
  const body =
    decision.kind === "call"
      ? {
          id: id(),
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            {
              index: 0,
              finish_reason: "tool_calls",
              message: {
                role: "assistant",
                content: null,
                tool_calls: [
                  {
                    id: `call_${Math.floor(Math.random() * 1e9)}`,
                    type: "function",
                    function: { name: decision.call.name, arguments: JSON.stringify(decision.call.args) }
                  }
                ]
              }
            }
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
        }
      : {
          id: id(),
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            { index: 0, finish_reason: "stop", message: { role: "assistant", content: decision.text } }
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
        };
  res.writeHead(200, { "content-type": "application/json", connection: "close" });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  if (req.method !== "POST" || !req.url || !req.url.includes("/chat/completions")) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    try {
      const payload = JSON.parse(body);
      const model = payload.model ?? "mock";
      const decision = decide(payload);
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
      if (payload.stream === true && !jsonOnly) {
        if (decision.kind === "call") {
          await writeStreamingToolCall(res, model, decision.call);
        } else {
          await writeStreamingText(res, model, decision.text);
        }
        return;
      }
      jsonReply(res, model, decision);
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: String(error) }));
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 — ${
      empty ? "EMPTY (never calls a tool)" : wrong ? "WRONG (calls a bogus API)" : "replaying the expected call sequence"
    }${jsonOnly ? " [json-only: single JSON body]" : " [sse: streamed tool_call deltas]"} (${SCENARIOS.length} scenarios indexed)`
  );
});
