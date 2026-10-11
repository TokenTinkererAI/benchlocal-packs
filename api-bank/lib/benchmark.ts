import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { SCENARIOS, API_DEFS } from "./generated/scenarios";

export const CATEGORY_LABEL = "API-Bank (tool-call accuracy)";

const LEVEL_ORDER: Array<1 | 2 | 3> = [1, 2, 3];

const LEVEL_LABELS: Record<number, string> = {
  1: "Level 1 - single call",
  2: "Level 2 - retrieve then call",
  3: "Level 3 - multi-call planning"
};

export function getScenarioCards(): ScenarioMeta[] {
  return SCENARIOS.map((scenario) => ({
    id: scenario.id,
    title: `${scenario.id} - ${scenario.title}`,
    category: LEVEL_LABELS[scenario.level] ?? `Level ${scenario.level}`,
    description: `${LEVEL_LABELS[scenario.level] ?? `Level ${scenario.level}`}; ${scenario.expectedCalls.length} expected API call(s).`,
    promptText: scenario.requirement,
    detailCards: [
      { title: "Requirement", content: scenario.requirement },
      { title: "Context", content: scenario.task },
      {
        title: "Task shape",
        content: [
          `Level: ${scenario.level} (${LEVEL_LABELS[scenario.level] ?? "?"})`,
          `Expected number of API calls: ${scenario.expectedCalls.length}`,
          `Retrieval first (ToolSearcher): ${scenario.requiresRetrieval ? "yes" : "no"}`
        ].join("\n")
      },
      {
        title: "Available APIs",
        content: scenario.toolNames.join(", ")
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

  const levelOf = new Map(SCENARIOS.map((scenario) => [scenario.id, scenario.level]));
  const perLevel = new Map<number, { passed: number; total: number }>();
  for (const result of results) {
    const level = levelOf.get(result.scenarioId);
    if (level === undefined) {
      continue;
    }
    const entry = perLevel.get(level) ?? { passed: 0, total: 0 };
    entry.total += 1;
    if ((result.score ?? 0) >= 0.5) {
      entry.passed += 1;
    }
    perLevel.set(level, entry);
  }

  const categories = LEVEL_ORDER.filter((level) => perLevel.has(level)).map((level) => {
    const entry = perLevel.get(level) ?? { passed: 0, total: 0 };
    return {
      id: `level-${level}`,
      label: `${LEVEL_LABELS[level]} (${entry.total})`,
      score: entry.total === 0 ? 0 : Math.round((entry.passed / entry.total) * 100),
      weight: entry.total
    };
  });

  return {
    totalScore: points,
    categories,
    summary:
      total === 0 ? "No results." : `tool-call accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}

/** Scenario lookup used by the CLI and the offline mock server. */
export function getScenario(id: string) {
  return SCENARIOS.find((scenario) => scenario.id === id);
}

export { SCENARIOS, API_DEFS };
