#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for GSM8K-1319 end-to-end tests.
 *
 * Answers every problem correctly (default), wrong (--wrong: gold + 1), or
 * without a number at all (--empty: prose, exercises the unparseable path).
 * Correct/wrong answers rotate over four formats to exercise every extraction
 * layer:
 *   0: reasoning + "#### <n>"                    (marker layer)
 *   1: reasoning + "Answer: <n>"                 (answer-phrase layer)
 *   2: "Working through it. The answer is <n>."  (answer-phrase layer)
 *   3: reasoning + bare "<n>" final line         (fallback layer)
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path.
 *
 * Usage: node scripts/mock-server.mjs [--port 8103] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads dist-cli/lib/generated/problems.js)
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PROBLEMS } = require("../dist-cli/lib/generated/problems.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8103"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const EMPTY_REPLY =
  "I thought about this problem for a while, but I am not sure how to solve it. No final answer.";

function formatFor(problem, numberText) {
  const variant = PROBLEMS.indexOf(problem) % 4;
  switch (variant) {
    case 0:
      return `Let me work through this step by step.\n\n#### ${numberText}`;
    case 1:
      return `Let me work through this step by step.\n\nAnswer: ${numberText}`;
    case 2:
      return `Let me work through it. The answer is ${numberText}.`;
    default:
      return `Working through the problem:\n\n${numberText}`;
  }
}

function splitIntoChunks(text) {
  // Split on whitespace runs but keep them, so the reassembled stream is
  // byte-identical to the one-shot reply.
  const pieces = text.split(/(\s+)/).filter((piece) => piece !== "");
  const chunks = [];
  const perChunk = Math.max(1, Math.ceil(pieces.length / 4));
  for (let i = 0; i < pieces.length; i += perChunk) {
    chunks.push(pieces.slice(i, i + perChunk).join(""));
  }
  return chunks;
}

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function writeStreamingReply(res, model, text) {
  const id = `chatcmpl-mock-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive"
  });
  for (const piece of splitIntoChunks(text)) {
    if (chunkDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, chunkDelayMs));
    }
    writeSse(res, {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: { content: piece }, finish_reason: null }]
    });
  }
  writeSse(res, {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }]
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
      const content = Array.isArray(payload.messages)
        ? payload.messages.map((message) => String(message?.content ?? "")).join("\n")
        : "";
      const problem = PROBLEMS.find((candidate) => content.includes(candidate.question));

      if (!problem) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "mock: problem not found in request" }));
        return;
      }

      let text;
      if (empty) {
        text = EMPTY_REPLY;
      } else {
        const value = wrong ? problem.finalNumber + 1 : problem.finalNumber;
        text = formatFor(problem, String(value));
      }

      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      if (payload.stream === true && !jsonOnly) {
        await writeStreamingReply(res, payload.model ?? "mock", text);
        return;
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
              finish_reason: "stop",
              message: { role: "assistant", content: text }
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
  const mode = empty ? "ANSWERING UNPARSEABLE (no number)" : wrong ? "ANSWERING ALL WRONG (+1)" : "answering all correctly";
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 - ${mode}${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]"} (${PROBLEMS.length} problems indexed)`
  );
});
