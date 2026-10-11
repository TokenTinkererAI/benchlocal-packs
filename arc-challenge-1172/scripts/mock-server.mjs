#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for ARC-Challenge-1172 end-to-end tests.
 *
 * Answers every question correctly (default), wrong (--wrong), or with
 * letter-free prose (--empty) in one of four answer formats, rotating per
 * question, to exercise extraction:
 *   0: "Answer: X"
 *   1: "**Answer: X**" (with reasoning text)
 *   2: "The correct option is x." (lowercase)
 *   3: bare letter on the final line
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path.
 *
 * Usage: node scripts/mock-server.mjs [--port 8211] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads dist-cli/lib/generated/questions.js)
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { QUESTIONS } = require("../dist-cli/lib/generated/questions.js");

// Two pairs of upstream rows share their question text with different option
// sets, so matching a request by question text alone is ambiguous. Match on
// the full rendered question block instead (question text + its labelled
// options), which identifies exactly one row.
const LETTERS = "ABCDE";
function formatBlock(question) {
  const lines = [question.question, ""];
  question.options.forEach((option, index) => lines.push(`${LETTERS[index]}) ${option}`));
  return lines.join("\n");
}
const MATCHES = QUESTIONS.map((question) => ({ question, block: formatBlock(question) }));
{
  const seen = new Set();
  for (const match of MATCHES) {
    if (seen.has(match.block)) {
      throw new Error("mock server: duplicate question block in the dataset");
    }
    seen.add(match.block);
  }
}
function pickQuestion(content) {
  let best;
  for (const match of MATCHES) {
    if (content.includes(match.block) && (!best || match.block.length > best.block.length)) {
      best = match;
    }
  }
  return best?.question;
}

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8211"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

function formatFor(question, letter) {
  const variant = QUESTIONS.indexOf(question) % 4;
  switch (variant) {
    case 0:
      return `Answer: ${letter}`;
    case 1:
      return `Let me work through this.\n\n**Answer: ${letter}**`;
    case 2:
      return `The correct option is ${letter.toLowerCase()}.`;
    default:
      return `Considering every option carefully:\n\n${letter}`;
  }
}

const EMPTY_REPLY =
  "Let me think about this one.\n\nI can see several possible approaches here, but none of them pins the problem down with certainty.";

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
      const question = pickQuestion(content);
      const letter = !question
        ? "A"
        : wrong
          ? question.answerLetter === "A"
            ? "B"
            : "A"
          : question.answerLetter;
      const text = empty ? EMPTY_REPLY : question ? formatFor(question, letter) : "Answer: A";

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
    `mock server on http://127.0.0.1:${port}/v1 — ${
      empty ? "EMPTY prose (no A-D letter)" : wrong ? "ANSWERING ALL WRONG" : "answering all correctly"
    }${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]"} (${QUESTIONS.length} questions indexed)`
  );
});
