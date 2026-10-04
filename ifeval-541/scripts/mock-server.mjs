#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for IFEval-541 end-to-end tests.
 *
 * Modes (default: compliant):
 *   (no flag)   answer the 24 mapped scenarios with their verified *compliant*
 *               responses (each passes the vendored checker strictly); every
 *               other prompt gets the generic non-compliant answer.
 *   --garbage   answer the mapped scenarios with their verified *garbage*
 *               responses (each fails strictly); everything else gets the
 *               generic non-compliant answer.
 *   --empty     answer every prompt with an empty (blank) response.
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path. --chunk-delay-ms N spaces the
 * SSE chunks out by N milliseconds each (default 0).
 *
 * Usage: node scripts/mock-server.mjs [--port 8121] [--garbage] [--empty] [--json-only] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads the compiled dataset + fixture file)
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { PROBLEMS } = require("../dist-cli/lib/generated/problems.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8121"), 10);
const garbage = args.includes("--garbage");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const fixturePath = path.join(REPO_ROOT, "_reference", "fixtures", "mock-answers.json");
const fixtures = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const genericGarbage = fixtures.genericGarbage;

const byId = new Map(fixtures.answers.map((entry) => [entry.id, entry]));
const promptToEntry = new Map();
for (const problem of PROBLEMS) {
  const entry = byId.get(problem.id);
  if (entry) {
    promptToEntry.set(problem.prompt, entry);
  }
}

function answerFor(promptText) {
  if (empty) {
    return "";
  }
  const entry = promptToEntry.get(promptText);
  if (entry) {
    return garbage ? entry.garbage : entry.compliant;
  }
  return genericGarbage;
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
      const messages = Array.isArray(payload.messages) ? payload.messages : [];
      const userMessages = messages.filter((message) => message?.role === "user");
      const lastUser = userMessages.length > 0 ? userMessages[userMessages.length - 1] : messages[messages.length - 1];
      const promptText = typeof lastUser?.content === "string" ? lastUser.content : "";
      const answer = answerFor(promptText);

      if (payload.stream === true && !jsonOnly) {
        await writeStreamingReply(res, payload.model ?? "mock", answer);
        return;
      }

      res.writeHead(200, { "content-type": "application/json", connection: "close" });
      res.end(
        JSON.stringify({
          id: `chatcmpl-mock-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: payload.model ?? "mock",
          choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: answer } }],
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
  const mode = empty ? "EMPTY (blank responses)" : garbage ? "GARBAGE (non-compliant)" : "COMPLIANT (mapped scenarios)";
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 - ${mode}; ` +
      `${promptToEntry.size} mapped scenario(s) of ${PROBLEMS.length}, generic fallback for the rest` +
      (jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]")
  );
});
