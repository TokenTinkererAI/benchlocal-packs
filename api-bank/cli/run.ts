#!/usr/bin/env node
/**
 * Local CLI runner for the API-Bank pack.
 *
 * Runs the same tool-calling pipeline the BenchLocal pack uses, against any
 * OpenAI-compatible chat endpoint:
 *
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8223/v1 --model mock --limit 8
 *
 * Built via: npm run build:cli  (output in dist-cli/)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { SCENARIOS, API_DEFS } from "../lib/generated/scenarios";
import { runScenarioForModel, MAX_TURNS } from "../lib/orchestrator";
import type { ApiScenario, ModelSettings } from "../lib/types";

type CliArgs = {
  baseUrl?: string;
  model?: string;
  apiKey?: string;
  limit?: number;
  ids?: string[];
  level?: number;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  timeoutMs?: number;
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
      case "--level": args.level = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--temperature": args.temperature = Number.parseFloat(value ?? ""); i += 1; break;
      case "--top-p": args.topP = Number.parseFloat(value ?? ""); i += 1; break;
      case "--max-tokens": args.maxTokens = Number.parseInt(value ?? "", 10); i += 1; break;
      case "--timeout-ms": args.timeoutMs = Number.parseInt(value ?? "", 10); i += 1; break;
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
  console.log(`API-Bank CLI runner

Usage:
  node dist-cli/cli/run.js --base-url URL --model NAME [options]

Options:
  --base-url URL         OpenAI-compatible base URL (e.g. http://127.0.0.1:1234/v1)
  --model NAME           Model name to request
  --api-key KEY          Bearer token (optional)
  --limit N              Only run the first N scenarios
  --ids a,b,c            Only run specific scenarios (e.g. L1/0,L3/7)
  --level N              Only run level 1, 2 or 3
  --temperature F        Sampling temperature (default 0)
  --top-p F              Nucleus sampling (omit for endpoint default)
  --max-tokens N         Completion cap per turn (default 65536)
  --timeout-ms N         Per-request model timeout (default 3600000)
  --out PATH             Write a JSON results file
  --help                 Show this help

The tool loop is capped at ${MAX_TURNS} assistant turns per scenario.`);
}

function selectScenarios(args: CliArgs): ApiScenario[] {
  let scenarios = [...SCENARIOS];
  if (typeof args.level === "number" && Number.isFinite(args.level)) {
    scenarios = scenarios.filter((scenario) => scenario.level === args.level);
  }
  if (args.ids && args.ids.length > 0) {
    const wanted = new Set(args.ids);
    scenarios = scenarios.filter((scenario) => wanted.has(scenario.id));
  }
  if (typeof args.limit === "number" && Number.isFinite(args.limit)) {
    scenarios = scenarios.slice(0, args.limit);
  }
  return scenarios;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.baseUrl || !args.model) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const scenarios = selectScenarios(args);
  if (scenarios.length === 0) {
    console.error("No scenarios selected.");
    process.exit(2);
  }

  const settings: ModelSettings = {
    baseUrl: args.baseUrl,
    authMode: args.apiKey ? "bearer" : "none",
    apiKey: args.apiKey,
    model: args.model,
    temperature: args.temperature ?? 0,
    topP: args.topP,
    maxTokens: args.maxTokens ?? 65536,
    timeoutMs: args.timeoutMs ?? 3_600_000
  };

  const startedAt = new Date();
  console.log(`API-Bank CLI: ${scenarios.length} scenarios | model=${args.model} @ ${args.baseUrl}`);

  let passed = 0;
  const results: Array<Record<string, unknown>> = [];

  for (const [index, scenario] of scenarios.entries()) {
    const startMs = Date.now();
    const result = await runScenarioForModel(
      settings,
      `cli:${args.model}`,
      args.model,
      scenario,
      API_DEFS,
      async () => {},
      {}
    );
    const elapsed = Date.now() - startMs;
    if (result.status === "pass") {
      passed += 1;
    }
    const marker = result.status === "pass" ? "PASS" : "FAIL";
    console.log(`[${index + 1}/${scenarios.length}] ${scenario.id} ${marker} (${elapsed}ms) - ${result.summary}`);
    results.push({
      id: scenario.id,
      level: scenario.level,
      status: result.status,
      score: result.score ?? 0,
      summary: result.summary,
      durationMs: result.timings?.durationMs,
      toolCalls: result.output?.toolCalls ?? [],
      rawLog: typeof result.rawLog === "string" ? result.rawLog.slice(0, 6000) : null
    });
  }

  const accuracy = scenarios.length === 0 ? 0 : Math.round((passed / scenarios.length) * 1000) / 10;
  console.log(`\nSummary: tool-call accuracy ${passed}/${scenarios.length} (${accuracy}%)`);

  if (args.out) {
    const outPath = path.resolve(args.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(
      outPath,
      JSON.stringify(
        {
          pack: "api-bank",
          startedAt: startedAt.toISOString(),
          completedAt: new Date().toISOString(),
          model: { baseUrl: args.baseUrl, model: args.model },
          settings: {
            temperature: settings.temperature ?? null,
            topP: settings.topP ?? null,
            maxTokens: settings.maxTokens ?? null,
            maxTurns: MAX_TURNS
          },
          passed,
          total: scenarios.length,
          accuracy,
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
