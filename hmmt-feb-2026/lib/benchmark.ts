/**
 * Scenario cards and scoring for HMMT-Feb-2026.
 *
 * Every problem carries one point; the model's extracted answer is compared
 * to the official gold answer after textual normalization (lib/normalize.ts).
 * The aggregate score is the rounded percentage of correct answers (integer
 * points out of 100), reported in the house summary style:
 * 'accuracy: 27/33 (81.8%) - 82 points.'
 */
import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { PROBLEMS } from "./generated/problems";
import { formatProblem } from "./prompts";

export const CATEGORY_ID = "hmmt-feb-2026";
export const CATEGORY_LABEL = "HMMT Feb 2026 (accuracy)";

/** First ~60 characters of the problem, single-line, for the scenario card title. */
function excerpt(problem: string): string {
  const single = problem.replace(/\s+/g, " ").trim();
  return single.length <= 60 ? single : `${single.slice(0, 59)}...`;
}

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.types.join(", ")} - ${excerpt(problem.problem)}`,
    category: "HMMT Feb 2026",
    description: `${problem.types.join(", ")} (source problem ${problem.number}). No tools; one chat completion; scored by textual answer match against the official gold answer.`,
    promptText: formatProblem(problem),
    detailCards: [
      { title: "Problem", content: problem.problem },
      { title: "Problem type", content: problem.types.join(", ") },
      {
        title: "Scoring",
        content:
          "The final answer is read from the last \\boxed{...} group (or an answer phrase, or the last line) and compared with the official gold answer after textual LaTeX normalization. No code execution, no symbolic evaluation."
      }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

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
    summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail.toFixed(1)}%) - ${points} points.`
  };
}
