import type { BenchmarkScore, ScenarioMeta, ScoredScenarioResult } from "@benchlocal/sdk";

import { PROBLEMS } from "./generated/problems";

export type HumanEvalScenario = {
  id: string;
  title: string;
  category: string;
  description: string;
  promptText: string;
  entryPoint: string;
};

export const CATEGORY_ID = "humaneval";
export const CATEGORY_LABEL = "HumanEval (pass@1)";

/** First line of the problem's docstring, for the scenario card. */
function describe(entryPoint: string, prompt: string): string {
  const docstring = prompt.match(/"""([\s\S]*?)"""/);
  const firstLine = docstring?.[1]?.split("\n").map((line) => line.trim()).find(Boolean);
  return firstLine ? `${entryPoint}: ${firstLine}` : `Complete ${entryPoint}.`;
}

export const SCENARIOS: readonly HumanEvalScenario[] = PROBLEMS.map((problem) => ({
  id: problem.id,
  title: `${problem.id} - ${problem.entryPoint}`,
  category: CATEGORY_ID,
  description: describe(problem.entryPoint, problem.prompt),
  promptText: problem.prompt,
  entryPoint: problem.entryPoint
}));

export function getScenarioCards(): ScenarioMeta[] {
  return SCENARIOS.map((scenario) => ({
    id: scenario.id,
    title: scenario.title,
    category: scenario.category,
    description: scenario.description,
    promptText: scenario.promptText,
    detailCards: [
      { title: "Task", content: scenario.description },
      { title: "Entry point", content: scenario.entryPoint },
      { title: "Prompt", content: scenario.promptText }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const passAt1 = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(passAt1);
  const detail = Math.round(passAt1 * 10) / 10;

  return {
    totalScore: points,
    categories: [
      {
        id: CATEGORY_ID,
        label: CATEGORY_LABEL,
        score: points,
        weight: 100
      }
    ],
    summary: total === 0 ? "No results." : `pass@1: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}
