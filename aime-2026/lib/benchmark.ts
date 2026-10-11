/**
 * Scenario cards and scoring for AIME-2026.
 *
 * Every problem carries one point; the model's extracted integer is compared
 * to the gold answer by exact match. The aggregate score is the rounded
 * percentage of correct answers (integer points out of 100), reported in the
 * house summary style: 'accuracy: 27/30 (90.0%) - 90 points.'
 */
import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { PROBLEMS } from "./generated/problems";
import { formatProblem } from "./prompts";

export const CATEGORY_ID = "aime-2026";
export const CATEGORY_LABEL = "AIME 2026 (accuracy)";

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.contest} Problem ${problem.number}`,
    category: "AIME 2026",
    description: `${problem.contest} Problem ${problem.number}. No-tools competition math; scored by exact integer answer match (0-999).`,
    promptText: formatProblem(problem),
    detailCards: [
      { title: "Problem", content: problem.problem },
      { title: "Contest", content: `${problem.contest}, Problem ${problem.number}` },
      { title: "Scoring", content: "Exact match against the published integer answer (0-999)." }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);

  const categories =
    total === 0
      ? []
      : [
          {
            id: CATEGORY_ID,
            label: CATEGORY_LABEL,
            score: points,
            weight: total
          }
        ];

  return {
    totalScore: points,
    categories,
    summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${accuracy.toFixed(1)}%) - ${points} points.`
  };
}
