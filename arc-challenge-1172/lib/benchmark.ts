import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { QUESTIONS } from "./generated/questions";
import { formatQuestion } from "./prompts";

export const CATEGORY_ID = "arc-challenge";
export const CATEGORY_LABEL = "ARC-Challenge (accuracy)";

export function getScenarioCards(): ScenarioMeta[] {
  return QUESTIONS.map((question) => ({
    id: question.id,
    title: `${question.id} - ${question.recordId}`,
    category: CATEGORY_LABEL,
    description: `${question.options.length}-option science question; no tools, scored by exact answer match.`,
    promptText: formatQuestion(question),
    detailCards: [
      { title: "Question", content: question.question },
      {
        title: "Options",
        content: question.options.map((option, index) => `${"ABCDE"[index]}) ${option}`).join("\n")
      },
      { title: "Source record", content: question.recordId }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

  const categories = total === 0
    ? []
    : [
        {
          id: CATEGORY_ID,
          label: `${CATEGORY_LABEL} (${total})`,
          score: points,
          weight: total
        }
      ];

  return {
    totalScore: points,
    categories,
    summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}
