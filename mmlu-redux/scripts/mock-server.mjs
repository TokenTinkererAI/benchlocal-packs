#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for MMLU-Redux end-to-end tests.
 *
 * Modes:
 *   (default)  answer every question correctly, rotating formats per problem
 *              so the extraction layers are all exercised:
 *                0: "Answer: X"
 *                1: "**Answer: X**" (with reasoning text)
 *                2: "The correct option is x." (lowercase)
 *                3: bare letter on the final line
 *                4: "\boxed{X}" with reasoning
 *   --wrong    answer every question with a different letter
 *   --empty    answer with empty content (unparseable by design)
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path.
 *
 * Usage: node scripts/mock-server.mjs [--port 8124] [--wrong] [--empty] [--json-only] [--delay-ms 0] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads dist-cli/lib/generated/problems.js + prompts.js)
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PROBLEMS } = require("../dist-cli/lib/generated/problems.js");
const { buildMessages } = require("../dist-cli/lib/prompts.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8124"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

if (wrong && empty) {
  console.error("error: --wrong and --empty are mutually exclusive");
  process.exit(2);
}

/**
 * Index every problem by the exact user message lib/prompts.buildMessages
 * produces for it. The mock therefore verifies the real prompt string: a
 * request that does not carry it verbatim is answered with an unmistakable
 * UNMATCHED completion (which extraction reports as unparseable).
 */
const index = new Map();
let collisions = 0;
PROBLEMS.forEach((problem, problemIndex) => {
  const userContent = buildMessages(problem)[1].content;
  if (index.has(userContent)) {
    collisions += 1;
  }
  index.set(userContent, problemIndex);
});

/** Pull the problem out of the request's user message. */
function identify(content) {
  const problemIndex = index.get(content);
  return problemIndex === undefined ? undefined : { problem: PROBLEMS[problemIndex], problemIndex };
}

function nextLetter(letter) {
  return "ABCD"[("ABCD".indexOf(letter) + 1) % 4];
}

function formatFor(problemIndex, letter) {
  switch (problemIndex % 5) {
    case 0:
      return `Answer: ${letter}`;
    case 1:
      return `Let me work through this.\n\n**Answer: ${letter}**`;
    case 2:
      return `The correct option is ${letter.toLowerCase()}.`;
    case 3:
      return `Considering every option carefully:\n\n${letter}`;
    default:
      return `I considered each option and the evidence points one way.\n\n\\boxed{${letter}}`;
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

let requests = 0;
let unmatched = 0;

const server = createServer((req, res) => {
  if (req.method === "GET" && (req.url === "/health" || req.url === "/v1/health")) {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
    return;
  }
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
        ? payload.messages
            .filter((message) => String(message?.role ?? "user") === "user")
            .map((message) => String(message?.content ?? ""))
            .join("\n")
        : "";
      const found = identify(content);
      requests += 1;

      let text;
      if (empty) {
        text = "";
      } else if (!found) {
        unmatched += 1;
        text = "UNMATCHED: the mock server could not identify the question in this request.";
      } else {
        const letter = wrong ? nextLetter(found.problem.answerLetter) : found.problem.answerLetter;
        text = formatFor(found.problemIndex, letter);
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
  const mode = empty ? "RETURNING EMPTY RESPONSES" : wrong ? "ANSWERING ALL WRONG" : "answering all correctly";
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 — ${mode}${
      jsonOnly
        ? " [json-only: stream requests answered with a single JSON body]"
        : " [sse: stream requests answered as text/event-stream]"
    } (${PROBLEMS.length} problems indexed${
      collisions > 0 ? `, ${collisions} duplicate key(s) collapsed` : ""
    })`
  );
});

process.on("SIGTERM", () => {
  console.log(`mock server stopping (requests: ${requests}, unmatched: ${unmatched})`);
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  console.log(`mock server stopping (requests: ${requests}, unmatched: ${unmatched})`);
  server.close(() => process.exit(0));
});
