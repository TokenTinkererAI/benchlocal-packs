import type { BenchmarkScore, ScenarioMeta, ScoredScenarioResult } from "@benchlocal/sdk";

import { getScenarioMetas } from "./dataset";

export const CATEGORY_ID = "humaneval-plus";
export const CATEGORY_LABEL = "HumanEval+ (pass@1)";

export function getScenarioCards(): ScenarioMeta[] {
  return getScenarioMetas().map((problem) => ({
    id: problem.id,
    title: problem.title,
    category: CATEGORY_ID,
    description: problem.description,
    promptText: problem.prompt,
    detailCards: [
      { title: "Task", content: problem.description },
      { title: "Entry point", content: problem.entryPoint },
      {
        title: "Test suite",
        content:
          `${problem.baseTests} base tests (original HumanEval) + ${problem.plusTests} plus tests (EvalPlus), ` +
          `graded by execution with EvalPlus comparison semantics. A problem counts only if both suites pass.`
      },
      { title: "Prompt", content: problem.prompt }
    ]
  }));
}

/**
 * House scoring: integer points out of 100 (the score renders verbatim in the
 * app), with the exact pass@1 detail kept in the summary string.
 */
export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const passAt1 = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(passAt1);
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
