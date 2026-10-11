import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { CATEGORY_LABELS, getScenarioCards, loadManifest } from "./dataset";

export { getScenarioCards };

/** Order in which the per-category breakdown is reported. */
const CATEGORY_ORDER = ["simple", "multiple", "parallel", "parallel_multiple", "sql", "irrelevance"];

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

  const categoryOf = new Map(
    loadManifest().scenarios.map((entry) => [entry.id, entry.category] as const)
  );
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
      label: `${CATEGORY_LABELS[category] ?? category} (${entry.total})`,
      score: entry.total === 0 ? 0 : Math.round((entry.passed / entry.total) * 100),
      weight: entry.total
    };
  });

  return {
    totalScore: points,
    categories,
    summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}

export type { ScenarioMeta };
