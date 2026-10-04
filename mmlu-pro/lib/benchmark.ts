import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { CATEGORY_LABELS, CATEGORY_ORDER, PROBLEMS } from "./generated/problems";
import { formatQuestion } from "./prompts";

export const CATEGORY_LABEL = "MMLU-Pro (accuracy)";

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${CATEGORY_LABELS[problem.category]}`,
    category: CATEGORY_LABELS[problem.category],
    description: `${CATEGORY_LABELS[problem.category]} (${problem.src}). No-tools multiple choice (3-10 options); scored by exact answer match.`,
    promptText: formatQuestion(problem),
    detailCards: [
      { title: "Question", content: problem.question },
      {
        title: "Options",
        content: problem.options.map((option, index) => `${"ABCDEFGHIJ"[index]}. ${option}`).join("\n")
      },
      { title: "Category", content: `${CATEGORY_LABELS[problem.category]} (${problem.src})` }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

  const categoryOf = new Map(PROBLEMS.map((problem) => [problem.id, problem.category]));
  const perCategory = new Map<string, { passed: number; total: number }>();
  for (const result of results) {
    const category = categoryOf.get(result.scenarioId);
    if (!category) {
      continue;
    }
    const entry = perCategory.get(category) ?? { passed: 0, total: 0 };
    entry.total += 1;
    if ((result.score ?? 0) >= 0.5) {
      entry.passed += 1;
    }
    perCategory.set(category, entry);
  }

  const categories = CATEGORY_ORDER.filter((category) => perCategory.has(category)).map((category) => {
    const entry = perCategory.get(category) ?? { passed: 0, total: 0 };
    return {
      id: category,
      label: `${CATEGORY_LABELS[category]} (${entry.total})`,
      score: Math.round((entry.passed / entry.total) * 100),
      weight: entry.total
    };
  });

  return {
    totalScore: points,
    categories,
    summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}
