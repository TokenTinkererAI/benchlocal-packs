#!/usr/bin/env node
/**
 * Local CLI runner for the HumanEval+-164 pack.
 *
 * Runs the same lib pipeline the BenchLocal pack uses, against any
 * OpenAI-compatible chat endpoint:
 *
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8107/v1 --model mock
 *   node dist-cli/cli/run.js --base-url http://127.0.0.1:8107/v1 --model mock --ids 0,32
 *
 * Built via: npm run build:cli  (output in dist-cli/)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { ScoredScenarioResult } from "@benchlocal/sdk";

import { scoreModelResults } from "../lib/benchmark";
import { getScenarioMetas, harnessPath, problemFilePath } from "../lib/dataset";
import { runScenarioForModel } from "../lib/orchestrator";
import { resolvePython } from "../lib/python";
import type { ModelSettings, ProblemMeta, PythonInterpreter } from "../lib/types";

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
  python?: string;
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
      case "--python": args.python = value; i += 1; break;
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
  console.log(`HumanEval+-164 CLI runner

Usage:
  node dist-cli/cli/run.js --base-url URL --model NAME [options]

Options:
  --base-url URL         OpenAI-compatible base URL (e.g. http://127.0.0.1:1234/v1)
  --model NAME           Model name to request
  --api-key KEY          Bearer token (optional)
  --limit N              Only run the first N problems
  --ids a,b,c            Only run specific problems (0 or HumanEval/0 forms)
  --temperature F        Sampling temperature (default 0)
  --top-p F              Nucleus sampling (omit for endpoint default)
  --max-tokens N         Completion cap (default 65536)
  --timeout-ms N         Per-request model timeout (default 3600000)
  --exec-timeout-ms N    Wall-clock cap per problem, backstop (default 90000)
  --python PATH          Override the Python interpreter
  --out PATH             Write a JSON results file
  --help                 Show this help`);
}

function selectProblems(args: CliArgs): ProblemMeta[] {
  let problems = getScenarioMetas();
  if (args.ids && args.ids.length > 0) {
    const wanted = new Set(args.ids.map((id) => (id.startsWith("HumanEval/") ? id : `HumanEval/${id}`)));
    problems = problems.filter((problem) => wanted.has(problem.id));
  }
  if (typeof args.limit === "number" && Number.isFinite(args.limit)) {
    problems = problems.slice(0, args.limit);
  }
  return problems;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.baseUrl || !args.model) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const python: PythonInterpreter = args.python
    ? { command: args.python, args: [], version: null, display: args.python }
    : await resolvePython();

  const problems = selectProblems(args);
  if (problems.length === 0) {
    console.error("No problems selected.");
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

  const harnessScriptPath = harnessPath();
  const startedAt = new Date();
  console.log(
    `HumanEval+-164 CLI: ${problems.length} problems | model=${args.model} @ ${args.baseUrl} | python=${python.display}`
  );

  let passed = 0;
  let harnessErrors = 0;
  const scored: ScoredScenarioResult[] = [];
  const results: Array<Record<string, unknown>> = [];

  for (const [index, problem] of problems.entries()) {
    const startMs = Date.now();
    const result = await runScenarioForModel(
      settings,
      `cli:${args.model}`,
      args.model,
      problem,
      async () => {},
      {
        python,
        harnessScriptPath,
        problemFile: problemFilePath(problem.id),
        execTimeoutMs: args.execTimeoutMs
      }
    );
    const elapsed = Date.now() - startMs;
    if (result.status === "pass") {
      passed += 1;
    }
    if (result.errorType === "execution_error" && /harness error/i.test(result.summary)) {
      harnessErrors += 1;
    }
    scored.push({ ...result, score: result.score ?? 0 });
    const marker = result.status === "pass" ? "PASS" : "FAIL";
    console.log(
      `[${index + 1}/${problems.length}] ${problem.id} ${marker} (${elapsed}ms)${
        result.status === "pass" ? "" : ` - ${result.summary}`
      }`
    );
    results.push({
      id: problem.id,
      status: result.status,
      score: result.score ?? 0,
      summary: result.summary,
      durationMs: result.timings?.durationMs,
      completion: result.output?.finalAnswer ?? null,
      rawLog: typeof result.rawLog === "string" ? result.rawLog.slice(0, 6000) : null
    });
  }

  const passAt1 = problems.length === 0 ? 0 : Math.round((passed / problems.length) * 1000) / 10;
  const score = scoreModelResults(scored);
  console.log(`\nSummary: pass@1 ${passed}/${problems.length} (${passAt1}%)`);
  console.log(`Score: ${score.summary}`);
  console.log(`Harness errors: ${harnessErrors}`);

  if (args.out) {
    const outPath = path.resolve(args.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(
      outPath,
      JSON.stringify(
        {
          pack: "humaneval-plus-164",
          startedAt: startedAt.toISOString(),
          completedAt: new Date().toISOString(),
          model: { baseUrl: args.baseUrl, model: args.model },
          python: { command: python.command, args: python.args, display: python.display, version: python.version },
          settings: {
            temperature: settings.temperature ?? null,
            topP: settings.topP ?? null,
            maxTokens: settings.maxTokens ?? null
          },
          passed,
          total: problems.length,
          passAt1,
          harnessErrors,
          score,
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
