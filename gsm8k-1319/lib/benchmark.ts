import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { PROBLEMS } from "./generated/problems";

export const CATEGORY_ID = "gsm8k";
export const CATEGORY_LABEL = "GSM8K (accuracy)";

/** First ~72 characters of the problem, single-line, for the scenario card title. */
function excerpt(question: string): string {
  const single = question.replace(/\s+/g, " ").trim();
  return single.length <= 72 ? single : `${single.slice(0, 71)}...`;
}

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${excerpt(problem.question)}`,
    category: "GSM8K",
    description:
      "Grade-school math word problem. No tools; one chat completion; scored by exact numeric answer match.",
    promptText: problem.question,
    detailCards: [
      { title: "Problem", content: problem.question },
      {
        title: "Scoring",
        content:
          "Exact numeric answer match against the number after the '#### ' marker in the reference answer. No code execution."
      }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);

  return {
    totalScore: points,
    categories: [
      {
        id: CATEGORY_ID,
        label: CATEGORY_LABEL,
        score: points,
        weight: total
      }
    ],
    summary:
      total === 0
        ? "No results."
        : `accuracy: ${passed}/${total} (${accuracy.toFixed(1)}%) - ${points} points.`
  };
}
