#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for BFCL-v3 end-to-end tests.
 *
 * It answers every request with a canned tool call (or none), so the full
 * request -> tool-call parsing -> AST grading path can be exercised without a
 * model endpoint:
 *
 *   (default)  "correct" mode: emits the scenario's ground-truth call(s)
 *              (no call for `irrelevance` scenarios), so a full run scores
 *              1340/1340.
 *   --wrong    emits a single bogus call for every scenario, so every scenario
 *              fails (0/1340), including irrelevance.
 *   --empty    emits no tool call at all, so only the `irrelevance` category
 *              passes (240/1340).
 *
 * A request is matched to a scenario by (user message text, sorted tool names)
 * — the dataset generator guarantees that signature is unique.
 *
 * The server mirrors llama.cpp's streaming behaviour: with `stream: true` it
 * answers with an SSE stream of `delta.tool_calls` fragments plus a final
 * `finish_reason` chunk and `data: [DONE]`. Pass `--json-only` to ignore
 * `stream` and answer with a single JSON body (`message.tool_calls`), exercising
 * the client's non-SSE fallback.
 *
 * Usage: node scripts/mock-server.mjs [--port 8224] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
 */
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { synthesiseGoldCalls } from "./gold-calls.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8224"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const manifest = JSON.parse(readFileSync(path.join(root, "data", "manifest.json"), "utf8"));

const bySignature = new Map();
for (const category of manifest.categories) {
  const scenarios = JSON.parse(readFileSync(path.join(root, "data", "scenarios", `${category.id}.json`), "utf8"));
  for (const scenario of scenarios) {
    const signature = `${scenario.user}\u0000${[...scenario.functions.map((fn) => fn.name)].sort().join("\u0000")}`;
    bySignature.set(signature, scenario);
  }
}

const WRONG_CALL = { name: "__bfcl_wrong_function__", arguments: "{}" };
const EMPTY_REPLY =
  "I can see the request, but on reflection none of the available functions is the right tool for it.";

/** Builds the ground-truth tool call(s): one acceptable value per ground-truth parameter. */
function goldCalls(scenario) {
  return synthesiseGoldCalls(scenario).map(({ name, arguments: args }) => ({ name, arguments: args }));
}

function callsFor(scenario) {
  if (empty) {
    return [];
  }
  if (wrong) {
    return [WRONG_CALL];
  }
  return scenario ? goldCalls(scenario) : [WRONG_CALL];
}

function matchScenario(payload) {
  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const userText = messages
    .filter((message) => message && message.role === "user")
    .map((message) => String(message.content ?? ""))
    .join("\n");
  const toolNames = Array.isArray(payload.tools)
    ? payload.tools.map((tool) => String(tool?.function?.name ?? "")).sort()
    : [];
  return bySignature.get(`${userText}\u0000${toolNames.join("\u0000")}`);
}

function splitArgs(text) {
  if (text.length <= 40) {
    return [text];
  }
  const third = Math.ceil(text.length / 3);
  return [text.slice(0, third), text.slice(third, third * 2), text.slice(third * 2)];
}

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function writeStreamingReply(res, model, calls) {
  const id = `chatcmpl-mock-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive"
  });

  if (calls.length === 0) {
    for (const piece of [EMPTY_REPLY]) {
      writeSse(res, {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta: { role: "assistant", content: piece }, finish_reason: null }]
      });
    }
  } else {
    calls.forEach((call, index) => {
      writeSse(res, {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              tool_calls: [{ index, id: `call_mock_${index}`, type: "function", function: { name: call.name, arguments: "" } }]
            },
            finish_reason: null
          }
        ]
      });
    });
    for (let index = 0; index < calls.length; index += 1) {
      for (const fragment of splitArgs(calls[index].arguments)) {
        if (chunkDelayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, chunkDelayMs));
        }
        writeSse(res, {
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [
            {
              index: 0,
              delta: { tool_calls: [{ index, function: { arguments: fragment } }] },
              finish_reason: null
            }
          ]
        });
      }
    }
  }

  writeSse(res, {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: calls.length === 0 ? "stop" : "tool_calls" }]
  });
  res.write("data: [DONE]\n\n");
  res.end();
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
      const scenario = matchScenario(payload);
      const calls = callsFor(scenario);

      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      if (payload.stream === true && !jsonOnly) {
        await writeStreamingReply(res, payload.model ?? "mock", calls);
        return;
      }

      const message = { role: "assistant", content: calls.length === 0 ? EMPTY_REPLY : "" };
      if (calls.length > 0) {
        message.tool_calls = calls.map((call, index) => ({
          index,
          id: `call_mock_${index}`,
          type: "function",
          function: { name: call.name, arguments: call.arguments }
        }));
      }

      res.writeHead(200, { "content-type": "application/json", connection: "close" });
      res.end(
        JSON.stringify({
          id: `chatcmpl-mock-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: payload.model ?? "mock",
          choices: [
            {
              index: 0,
              finish_reason: calls.length === 0 ? "stop" : "tool_calls",
              message
            }
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
        })
      );
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: String(error) }));
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 — ${
      empty ? "NO tool calls" : wrong ? "BOGUS call for every scenario" : "ground-truth calls"
    }${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: tool_call deltas]"} (${bySignature.size} scenarios indexed)`
  );
});
