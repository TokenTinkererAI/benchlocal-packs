#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for LiveCodeBench-v6 end-to-end tests.
 *
 * - For the problems with known solutions (abc387_b, 3704), answers with a
 *   working fenced code block (mode: default).
 * - Every other problem gets "```python\nprint(0)\n```" (a valid block that
 *   fails grading - exercises the whole pipeline).
 * - --wrong: answer ALL problems with print(0).
 * - --empty: answer with prose and no fenced block (extraction failure path).
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path; --chunk-delay-ms N inserts a
 * delay before each SSE chunk (headers are still sent immediately).
 *
 * Usage: node scripts/mock-server.mjs [--port 8098] [--wrong] [--empty] [--json-only] [--chunk-delay-ms 0]
 * Requires: npm run build:cli (reads the compiled dataset loader)
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { dataDir } = require("../dist-cli/lib/dataset.js");

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8098"), 10);
const wrong = args.includes("--wrong");
const empty = args.includes("--empty");
const jsonOnly = args.includes("--json-only");
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);

const SOLUTIONS = {
  abc387_b: `x = int(input())
count = 0
for i in range(1, 10):
    for j in range(1, 10):
        if i * j == x:
            count += 1
print(2025 - x * count)`,
  "3704": `class Solution:
    def countPartitions(self, nums: List[int]) -> int:
        total = sum(nums)
        prefix = 0
        count = 0
        for i in range(len(nums) - 1):
            prefix += nums[i]
            if (2 * prefix - total) % 2 == 0:
                count += 1
        return count`
};

const GARBAGE = "print(0)";

// Map question_content -> solution for the problems we can answer correctly.
const contentMap = [];
for (const [id, solution] of Object.entries(SOLUTIONS)) {
  const recordPath = path.join(dataDir(), "problems", `${id}.json`);
  const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
  contentMap.push({ id, content: record.question_content, solution });
}

function answerFor(promptText) {
  if (empty) {
    return "I would solve this by sorting the input and applying a greedy strategy; the code is straightforward.";
  }
  if (!wrong) {
    for (const entry of contentMap) {
      if (promptText.includes(entry.content)) {
        return `Here is a correct solution:\n\n\`\`\`python\n${entry.solution}\n\`\`\``;
      }
    }
  }
  return `\`\`\`python\n${GARBAGE}\n\`\`\``;
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
      const promptText = Array.isArray(payload.messages)
        ? payload.messages.map((message) => String(message?.content ?? "")).join("\n")
        : "";
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
  const mode = empty ? "EMPTY (no fenced blocks)" : wrong ? "ALL WRONG (print(0))" : "answers mapped problems correctly";
  console.log(
    `mock server on http://127.0.0.1:${port}/v1 — ${mode} (${contentMap.length} mapped problem(s))` +
      `${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]"}`
  );
});
