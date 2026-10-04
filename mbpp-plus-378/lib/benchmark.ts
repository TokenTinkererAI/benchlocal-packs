import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { loadManifest } from "./dataset";

export const CATEGORY_ID = "mbpp-plus";
export const CATEGORY_LABEL = "MBPP+ (pass@1)";

export function getScenarioCards(): ScenarioMeta[] {
  return loadManifest().problems.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.entryPoint}`,
    category: CATEGORY_ID,
    description: `${problem.title} | ${problem.nBase} base + ${problem.nPlus} plus inputs`,
    detailCards: [
      { title: "Task", content: `${problem.entryPoint}: ${problem.title}` },
      {
        title: "Tests",
        content: `${problem.nBase} base inputs + ${problem.nPlus} plus inputs (every input of both suites must pass).`
      },
      {
        title: "Grading",
        content:
          `EvalPlus comparison semantics; float tolerance atol=${problem.atol}` +
          (problem.atol === 0 ? " (1e-6 is used when the expected value is a float)." : ".")
      }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const passAt1 = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(passAt1);
  // One fixed decimal so the summary always reads e.g. "(100.0%)".
  const detail = passAt1.toFixed(1);

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
