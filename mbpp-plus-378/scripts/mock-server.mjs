#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for MBPP+-378 end-to-end tests.
 *
 * default    : answers every known problem with its canonical solution inside a
 *              fenced code block (a full run must therefore score 100 points);
 * --wrong    : answers every problem with `def <entry>(*args, **kwargs): return None`
 *              (clean grading failures - no harness errors);
 * --empty    : answers with prose and no fenced block (extraction failure path);
 * --limit N  : only map the first N problems (the rest get the fallback answer).
 *
 * Requests are matched against the pack's own prompt builder (dist-cli), so a
 * prompt-builder change shows up as a mismatch (fallback answer), never as a
 * silent false pass.
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path. --chunk-delay-ms N inserts a
 * delay before each SSE chunk (the deterministic slow-stream test).
 *
 * Usage: node scripts/mock-server.mjs [--port 8105] [--wrong] [--empty] [--limit N] [--json-only] [--chunk-delay-ms N]
 * Requires: npm run build:cli
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { loadManifest, loadProblemRecord } = require("../dist-cli/lib/dataset.js");
const { buildUserPrompt } = require("../dist-cli/lib/prompts.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8105"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const limit = Number.parseInt(argValue("--limit", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const manifest = loadManifest();
const problems = limit > 0 ? manifest.problems.slice(0, limit) : manifest.problems;

const byPrompt = new Map();
const byEntry = new Map();
let duplicates = 0;
for (const meta of problems) {
  const record = loadProblemRecord(meta.id);
  const userPrompt = buildUserPrompt(record);
  const solution = record.canonical_solution.replace(/^\n+/, "");
  if (byPrompt.has(userPrompt)) {
    duplicates += 1;
  }
  byPrompt.set(userPrompt, solution);
  if (!byEntry.has(record.entry_point)) {
    byEntry.set(record.entry_point, { solution, ids: [meta.id] });
  } else {
    byEntry.get(record.entry_point).ids.push(meta.id);
  }
}

const fenced = (code) => `Here is a correct solution:\n\n\`\`\`python\n${code}\n\`\`\``;

function wrongAnswer(entryPoint) {
  const name = entryPoint && /^[A-Za-z_][A-Za-z0-9_]*$/.test(entryPoint) ? entryPoint : "solution";
  return fenced(`def ${name}(*args, **kwargs):\n    return None`);
}

function answerFor(userMessage) {
  const entryMatch = userMessage.match(/define the function `([^`]+)`/);
  const entryPoint = entryMatch ? entryMatch[1] : null;

  if (empty) {
    return "This is a straightforward task: I would implement the function with a single pass over the input, but I will not paste code here.";
  }
  if (wrong) {
    return wrongAnswer(entryPoint);
  }
  if (byPrompt.has(userMessage)) {
    return fenced(byPrompt.get(userMessage));
  }
  if (entryPoint && byEntry.has(entryPoint)) {
    return fenced(byEntry.get(entryPoint).solution);
  }
  return wrongAnswer(entryPoint);
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
      const userMessage = messages
        .filter((message) => message && message.role === "user")
        .map((message) => String(message.content ?? ""))
        .join("\n");
      const answer = answerFor(userMessage);

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
  const mode = empty ? "EMPTY (no fenced blocks)" : wrong ? "ALL WRONG" : "canonical solutions";
  const transport = jsonOnly
    ? "[json-only: stream requests answered with a single JSON body]"
    : "[sse: stream requests answered as text/event-stream]";
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 - ${mode} ${transport} (${byPrompt.size} mapped prompt(s), ${duplicates} duplicate prompt(s))`
  );
});
