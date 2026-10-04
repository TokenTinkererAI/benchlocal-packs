#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for MATH-500 end-to-end tests.
 *
 * Answers every problem with its gold answer (default), or with a wrong
 * (--wrong) or candidate-free (--empty) reply, in one of three formats
 * rotating per problem, so that all three extraction layers are exercised:
 *
 *   0: reasoning + "\boxed{<gold>}"                    (layer 1)
 *   1: reasoning + "The answer is <gold>."             (layer 2)
 *   2: reasoning + a bare "<gold>" final line          (layer 3)
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path.
 *
 * Usage: node scripts/mock-server.mjs [--port 8123] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
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

const port = Number.parseInt(argValue("--port", "8123"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

/**
 * A deliberately wrong answer that stays wrong after textual normalization:
 * integers are shifted by one; anything else gets "+1" appended (which no
 * normalization rule removes).
 */
function wrongAnswer(gold) {
  if (/^-?\d+$/.test(gold)) {
    return String(Number.parseInt(gold, 10) + 1);
  }
  return `${gold}+1`;
}

function formatFor(problem, value) {
  const variant = PROBLEMS.indexOf(problem) % 3;
  switch (variant) {
    case 0:
      return `Let me work through this step by step.\n\nTherefore the value is \\boxed{${value}}`;
    case 1:
      return `Working through the cases carefully, I keep the intermediate values above in mind.\n\nThe answer is ${value}.`;
    default:
      return `Checking each part of the problem gives the value written below.\n\n${value}`;
  }
}

const EMPTY_REPLY =
  "Let me reflect on this one.\n\nI can see several plausible approaches here, but none of them pins the value down with certainty.";

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
      const problem = PROBLEMS.find((candidate) => content.includes(candidate.problem));
      const value = problem ? (wrong ? wrongAnswer(problem.answer) : problem.answer) : "0";
      const text = empty ? EMPTY_REPLY : problem ? formatFor(problem, value) : "Answer: 0";

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
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 - ${
      empty ? "EMPTY prose (no candidate)" : wrong ? "ANSWERING ALL WRONG" : "answering all correctly"
    }${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]"} (${PROBLEMS.length} problems indexed)`
  );
});
