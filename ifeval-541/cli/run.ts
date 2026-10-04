#!/usr/bin/env node
/**
 * Local CLI runner for the IFEval-541 pack.
 *
 * Runs the same pipeline the BenchLocal pack uses (single user message with
 * the prompt verbatim, raw-text grading through harness/run_problem.py with the
 * vendored upstream IFEval checker code) against any OpenAI-compatible chat
 * endpoint:
 *
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8121/v1 --model mock --ids IFEval/0,IFEval/1
 *
 * Built via: npm run build:cli  (output in dist-cli/)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { PROBLEMS } from "../lib/generated/problems";
import { runProblemForModel } from "../lib/orchestrator";
import { resolvePython } from "../lib/python";
import type { ModelSettings } from "../lib/types";

type CliArgs = {
  baseUrl?: string;
  model?: string;
  apiKey?: string;
  limit?: number;
  ids?: string[];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  timeoutMs?: number;
  execTimeoutMs?: number;
  out?: string;
  help: boolean;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    switch (flag) {
      case "--base-url": args.baseUrl = value; i += 1; break;
      case "--model": args.model = value; i += 1; break;
      case "--api-key": args.apiKey = value; i += 1; break;
      case "--limit": args.limit = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--ids": args.ids = (value ?? "").split(",").map((id) => id.trim()).filter(Boolean); i += 1; break;
      case "--temperature": args.temperature = Number.parseFloat(value ?? ""); i += 1; break;
      case "--top-p": args.topP = Number.parseFloat(value ?? ""); i += 1; break;
      case "--max-tokens": args.maxTokens = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--timeout-ms": args.timeoutMs = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--exec-timeout-ms": args.execTimeoutMs = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--out": args.out = value; i += 1; break;
      case "--help":
      case "-h":
        args.help = true;
        break;
      default:
        if (flag.startsWith("--")) {
          console.error(`Unknown flag: ${flag}`);
          process.exit(2);
        }
    }
  }
  return args;
}

function printHelp(): void {
  console.log(`IFEval-541 CLI runner

Usage:
  node dist-cli/cli/run.js --base-url URL --model NAME [options]

Options:
  --base-url URL          OpenAI-compatible base URL (e.g. http://127.0.0.1:8121/v1)
  --model NAME            Model name to request
  --api-key KEY           Bearer token (optional)
  --limit N               Only run the first N problems (dataset order)
  --ids a,b,c             Only run specific scenario ids (e.g. IFEval/0,IFEval/12)
  --temperature F         Sampling temperature (default 0)
  --top-p F               Nucleus sampling (omit for endpoint default)
  --max-tokens N          Completion cap (default 16384)
  --timeout-ms N          Per-request model timeout (default 900000)
  --exec-timeout-ms N     Wall-clock cap per grading run (default 120000)
  --out PATH              Write a JSON results file
  --help                  Show this help`);
}

function percentage(passed: number, total: number): string {
  return total === 0 ? "0.0" : ((passed / total) * 100).toFixed(1);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.baseUrl || !args.model) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  let problems = [...PROBLEMS];
  if (args.ids && args.ids.length > 0) {
    const wanted = new Set(args.ids);
    problems = problems.filter((problem) => wanted.has(problem.id));
    const found = new Set(problems.map((problem) => problem.id));
    for (const id of args.ids) {
      if (!found.has(id)) {
        console.error(`warning: unknown scenario id "${id}"`);
      }
    }
  }
  if (typeof args.limit === "number" && Number.isFinite(args.limit)) {
    problems = problems.slice(0, args.limit);
  }
  if (problems.length === 0) {
    console.error("No scenarios selected.");
    process.exit(2);
  }

  const python = await resolvePython();
  console.log(`python: ${python.display} (${python.version.join(".")})`);

  const settings: ModelSettings = {
    baseUrl: args.baseUrl,
    authMode: args.apiKey ? "bearer" : "none",
    apiKey: args.apiKey,
    model: args.model,
    temperature: args.temperature ?? 0,
    topP: args.topP,
    maxTokens: args.maxTokens ?? 16384,
    timeoutMs: args.timeoutMs ?? 900_000
  };

  const startedAt = new Date();
  console.log(`IFEval-541 CLI: ${problems.length}/${PROBLEMS.length} scenarios | model=${args.model} @ ${args.baseUrl}`);

  let strictPassed = 0;
  let loosePassed = 0;
  const results: Array<Record<string, unknown>> = [];

  for (const [index, problem] of problems.entries()) {
    const startMs = Date.now();
    const result = await runProblemForModel(
      settings,
      `cli:${args.model}`,
      args.model,
      problem.id,
      async () => {},
      { python, execTimeoutMs: args.execTimeoutMs ?? 120_000 }
    );
    const elapsed = Date.now() - startMs;
    const strictPass = (result.score ?? 0) >= 0.5;
    const looseMatch = typeof result.note === "string" ? /loose=pass/.exec(result.note) : null;
    if (strictPass) {
      strictPassed += 1;
    }
    if (looseMatch) {
      loosePassed += 1;
    }
    const marker = strictPass ? "PASS" : "FAIL";
    console.log(
      `[${index + 1}/${problems.length}] ${problem.id} ${marker} (${elapsed}ms) - ${result.summary}`
    );
    results.push({
      id: problem.id,
      status: result.status,
      score: result.score ?? 0,
      note: result.note ?? null,
      summary: result.summary,
      durationMs: result.timings?.durationMs,
      rawLog: typeof result.rawLog === "string" ? result.rawLog.slice(0, 6000) : null
    });
  }

  const points = problems.length === 0 ? 0 : Math.round((strictPassed / problems.length) * 100);
  console.log(
    `\nSummary: strict: ${strictPassed}/${problems.length} (${percentage(strictPassed, problems.length)}%) - ${points} points. ` +
      `| loose: ${loosePassed}/${problems.length} (${percentage(loosePassed, problems.length)}%)`
  );

  if (args.out) {
    const outPath = path.resolve(args.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(
      outPath,
      JSON.stringify(
        {
          pack: "ifeval-541",
          startedAt: startedAt.toISOString(),
          completedAt: new Date().toISOString(),
          model: { baseUrl: args.baseUrl, model: args.model },
          settings: {
            temperature: settings.temperature ?? null,
            topP: settings.topP ?? null,
            maxTokens: settings.maxTokens ?? null,
            execTimeoutMs: args.execTimeoutMs ?? 120_000
          },
          strictPassed,
          loosePassed,
          total: problems.length,
          points,
          results
        },
        null,
        2
      )
    );
    console.log(`Wrote ${outPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
