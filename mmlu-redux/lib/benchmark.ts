import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { GROUP_LABELS, GROUP_ORDER, PROBLEMS } from "./generated/problems";
import { formatQuestion, formatSubject } from "./prompts";

export const CATEGORY_LABEL = "MMLU-Redux (accuracy)";

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${formatSubject(problem.subject)}`,
    category: GROUP_LABELS[problem.group],
    description: `${GROUP_LABELS[problem.group]} / ${formatSubject(problem.subject)}. No-tools multiple choice; scored by exact answer match.`,
    promptText: formatQuestion(problem),
    detailCards: [
      { title: "Question", content: problem.question },
      {
        title: "Options",
        content: problem.options.map((option, index) => `${"ABCD"[index]}. ${option}`).join("\n")
      },
      { title: "Subject", content: `${formatSubject(problem.subject)} (${GROUP_LABELS[problem.group]})` }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

  const groupOf = new Map(PROBLEMS.map((problem) => [problem.id, problem.group]));
  const perGroup = new Map<string, { passed: number; total: number }>();
  for (const result of results) {
    const group = groupOf.get(result.scenarioId);
    if (!group) {
      continue;
    }
    const entry = perGroup.get(group) ?? { passed: 0, total: 0 };
    entry.total += 1;
    if ((result.score ?? 0) >= 0.5) {
      entry.passed += 1;
    }
    perGroup.set(group, entry);
  }

  const categories = GROUP_ORDER.filter((group) => perGroup.has(group)).map((group) => {
    const entry = perGroup.get(group) ?? { passed: 0, total: 0 };
    return {
      id: group,
      label: `${GROUP_LABELS[group]} (${entry.total})`,
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
