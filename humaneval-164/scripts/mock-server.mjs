#!/usr/bin/env node
/**
 * Mock OpenAI-compatible chat server for local pipeline testing.
 *
 * Serves canonical HumanEval solutions (from the built dataset) with
 * extraction-variant formatting, so the whole pipeline can be exercised
 * end-to-end without a real model:
 *
 *   node scripts/mock-server.mjs --port 8099
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8099/v1 --model mock --limit 8
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
 * exercises the client's non-SSE fallback path. --chunk-delay-ms N spaces
 * the SSE chunks out in time (headers still arrive immediately).
 *
 * Modes: the default answers every problem with its canonical solution (all
 * pass); --wrong answers with a wrong body (all fail); --empty answers with
 * an empty completion (all fail before execution).
 *
 * Usage: node scripts/mock-server.mjs [--port 8099] [--delay-ms 0] [--chunk-delay-ms 0] [--wrong] [--empty] [--json-only]
 */
import http from "node:http";

const argv = process.argv.slice(2);
function argValue(name, fallback) {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] !== undefined ? argv[index + 1] : fallback;
}

const port = Number.parseInt(argValue("--port", "8099"), 10);
const delayMs = Number.parseInt(argValue("--delay-ms", "0"), 10);
const chunkDelayMs = Number.parseInt(argValue("--chunk-delay-ms", "0"), 10);
const wrong = argv.includes("--wrong");
const empty = argv.includes("--empty");
const jsonOnly = argv.includes("--json-only");

async function loadBuiltDataset() {
  const bases = ["../dist-cli/", "../dist-engine/", "../dist/"];
  for (const base of bases) {
    try {
      const canonical = await import(new URL(`${base}lib/generated/canonical.js`, import.meta.url));
      const problems = await import(new URL(`${base}lib/generated/problems.js`, import.meta.url));
      return { canonical: canonical.CANONICAL_SOLUTIONS, problems: problems.PROBLEMS };
    } catch {
      // try the next build output
    }
  }
  return null;
}

const dataset = await loadBuiltDataset();
if (!dataset) {
  console.error("mock-server: no built dataset found. Run `npm run build:cli` first.");
  process.exit(1);
}

const entryToProblem = new Map(dataset.problems.map((problem) => [problem.entryPoint, problem]));

function findProblem(messages) {
  const text = messages
    .map((message) => (typeof message?.content === "string" ? message.content : ""))
    .join("\n");
  // HumanEval names are not unique across problems: some prompts carry helper
  // defs that are another problem's entry point (is_palindrome in the
  // make_palindrome prompt), and six entry-point names repeat between two
  // problems (triangle_area, add, correct_bracketing, solve, sort_array,
  // sum_squares). The CLI sends the target prompt verbatim, so match the full
  // prompt text first; longest match wins if one prompt is a substring of
  // another. Fall back to the first resolvable def name for anything else.
  let best;
  for (const problem of dataset.problems) {
    if (text.includes(problem.prompt) && (!best || problem.prompt.length > best.prompt.length)) {
      best = problem;
    }
  }
  if (best) {
    return best;
  }
  const matches = [...text.matchAll(/def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)];
  for (const match of matches) {
    const problem = entryToProblem.get(match[1]);
    if (problem) {
      return problem;
    }
  }
  return undefined;
}

const WRONG_BODY = "    return None\n";

function completionFor(problem) {
  if (!problem) {
    return WRONG_BODY;
  }
  const body = wrong ? WRONG_BODY : dataset.canonical[problem.id] ?? WRONG_BODY;
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
    response.end(JSON.stringify({ ok: true }));
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
      try {
        let payload = {};
        try {
          payload = JSON.parse(raw);
        } catch {
          // handled below as unknown problem
        }
        const problem = findProblem(Array.isArray(payload.messages) ? payload.messages : []);
        const text = empty ? "" : completionFor(problem);
        const streaming = payload.stream === true && !jsonOnly;
        const send = async () => {
          if (streaming) {
            await writeStreamingReply(response, payload.model ?? "mock", text);
          } else {
            response.writeHead(200, { "content-type": "application/json" });
            response.end(
              JSON.stringify({
                id: `mock-${problem?.number ?? "x"}`,
                object: "chat.completion",
                created: Math.floor(Date.now() / 1000),
                model: payload.model ?? "mock",
                choices: [
                  { index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }
                ],
                usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
              })
            );
          }
          console.log(`[mock] ${problem ? problem.id : "unknown"} -> ${text.length} chars (${streaming ? "sse" : "json"})`);
        };
        if (delayMs > 0) {
          setTimeout(() => {
            send().catch((error) => console.error(`[mock] send failed: ${String(error)}`));
          }, delayMs);
        } else {
          await send();
        }
      } catch (error) {
        response.writeHead(500, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: String(error) }));
      }
    });
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "not found" }));
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `HumanEval-164 mock server on http://127.0.0.1:${port} - ${
      empty ? "EMPTY completions (no code)" : wrong ? "ANSWERING ALL WRONG" : "answering all correctly"
    }${jsonOnly ? " [json-only: stream requests answered with a single JSON body]" : " [sse: stream requests answered as text/event-stream]"}`
  );
});
