#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for local pipeline testing.
 *
 * Serves the canonical HumanEval+ solutions (from data/canonical.json) with
 * extraction-variant formatting, so the whole pipeline can be exercised
 * end-to-end without a real model:
 *
 *   node scripts/mock-server.mjs --port 8107
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8107/v1 --model mock
 *
 * Variants (problem.number % 4):
 *   0 -> bare body continuation
 *   1 -> fenced code block
 *   2 -> prose + fenced code block
 *   3 -> full function redefinition (prompt + body)
 *
 * The server mirrors llama.cpp's streaming behaviour: when the request has
 * `stream: true` it answers with an SSE stream (individually written chunks,
 * a final finish_reason chunk, then `data: [DONE]`). Pass --json-only to make
 * it ignore `stream: true` and reply with a single JSON body instead — that
 * exercises the client's non-SSE fallback path. --chunk-delay-ms N spaces the
 * SSE chunks out in time (headers still arrive immediately).
 *
 * Modes: the default answers every problem with its canonical solution (all
 * pass); --wrong serves a wrong body instead (negative control for clean
 * failures).
 *
 * Usage: node scripts/mock-server.mjs [--port 8107] [--delay-ms 0] [--chunk-delay-ms 0] [--wrong] [--json-only]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

function argValue(name, fallback) {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] !== undefined ? argv[index + 1] : fallback;
}

if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`Usage: node scripts/mock-server.mjs [--port 8107] [--delay-ms 0] [--chunk-delay-ms 0] [--wrong] [--json-only]

  --port N            listen port (default 8107; the pack's reserved mock port)
  --delay-ms N        delay each completion by N ms before replying
  --chunk-delay-ms N  wait N ms between SSE chunks (streaming replies)
  --wrong             serve a wrong solution body (clean-failure control)
  --json-only         ignore stream:true and reply with one JSON body (fallback path)`);
  process.exit(0);
}

const port = Number.parseInt(argValue("--port", "8107"), 10);
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);
const wrong = argv.includes("--wrong");
const jsonOnly = argv.includes("--json-only");

const manifest = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "manifest.json"), "utf8"));
const canonical = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "data", "canonical.json"), "utf8")).canonical;

/**
 * Identify the problem from the request by exact prompt containment.
 *
 * Matching on `def <name>(` is not safe here: HumanEval reuses six entry-point
 * names across problems (triangle_area 45/71, add 53/85, correct_bracketing
 * 56/61, solve 84/161, sort_array 88/116, sum_squares 133/142) and four prompts
 * define helper functions (is_palindrome in 10, poly in 32, encode_cyclic in 38,
 * encode_shift in 50) whose names collide with other problems' entry points.
 * The CLI sends the target prompt verbatim, so match the full prompt text;
 * longest prompt wins if one were ever a substring of another (the 164 prompt
 * texts are in fact unique and none contains another, so this is exact).
 */
const promptsByLength = [...manifest.problems].sort((a, b) => b.prompt.length - a.prompt.length);

function findProblem(messages) {
  const text = messages
    .map((message) => (typeof message?.content === "string" ? message.content : ""))
    .join("\n");
  for (const problem of promptsByLength) {
    if (text.includes(problem.prompt)) {
      return problem;
    }
  }
  return undefined;
}

function completionFor(problem) {
  if (!problem) {
    return "    return None\n";
  }
  const body = wrong ? "\n    return -999999\n" : canonical[problem.id] ?? "\n    return None\n";
  switch (problem.number % 4) {
    case 0:
      return body;
    case 1:
      return "```python\n" + body + "```";
    case 2:
      return "Here is the completed function:\n\n```python\n" + body + "```\n";
    default:
      return problem.prompt + body;
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

function writeSse(response, payload) {
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function writeStreamingReply(response, model, text) {
  const id = `mock-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);
  response.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive"
  });
  for (const piece of splitIntoChunks(text)) {
    if (chunkDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, chunkDelayMs));
    }
    writeSse(response, {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: { content: piece }, finish_reason: null }]
    });
  }
  writeSse(response, {
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }]
  });
  response.write("data: [DONE]\n\n");
  response.end();
}

const server = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: true, wrong, jsonOnly }));
    return;
  }

  if (request.method === "GET" && request.url === "/v1/models") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ object: "list", data: [{ id: "mock", object: "model" }] }));
    return;
  }

  if (request.method === "POST" && request.url?.endsWith("/chat/completions")) {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk.toString();
    });
    request.on("end", async () => {
      let payload = {};
      try {
        payload = JSON.parse(raw);
      } catch {
        // handled below as unknown problem
      }
      const problem = findProblem(Array.isArray(payload.messages) ? payload.messages : []);
      const content = completionFor(problem);
      const streaming = payload.stream === true && !jsonOnly;
      const send = async () => {
        if (streaming) {
          await writeStreamingReply(response, payload.model ?? "mock", content);
        } else {
          response.writeHead(200, { "content-type": "application/json" });
          response.end(
            JSON.stringify({
              id: `mock-${problem?.number ?? "x"}`,
              object: "chat.completion",
              created: Math.floor(Date.now() / 1000),
              model: payload.model ?? "mock",
              choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
              usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
            })
          );
        }
        console.log(
          `[mock${wrong ? ":wrong" : ""}] ${problem ? problem.id : "unknown"} -> ${content.length} chars (${
            streaming ? "sse" : "json"
          })`
        );
      };
      if (delayMs > 0) {
        setTimeout(() => {
          send().catch((error) => console.error(`[mock] send failed: ${String(error)}`));
        }, delayMs);
      } else {
        try {
          await send();
        } catch (error) {
          console.error(`[mock] send failed: ${String(error)}`);
        }
      }
    });
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "not found" }));
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `HumanEval+-164 mock server on http://127.0.0.1:${port}${wrong ? " (wrong-solution mode)" : ""} [${
      jsonOnly ? "json-only: stream requests answered with a single JSON body" : "sse: stream requests answered as text/event-stream"
    }]`
  );
});
