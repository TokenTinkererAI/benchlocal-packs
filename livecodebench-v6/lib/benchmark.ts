import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { loadManifest } from "./dataset";

export const CATEGORY_LABEL = "LiveCodeBench v6 (pass@1)";

const PLATFORM_ORDER = ["atcoder", "codeforces", "leetcode"];

export function getScenarioCards(): ScenarioMeta[] {
  return loadManifest().problems.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.title}`,
    category: problem.platform,
    description: [
      problem.platform,
      problem.difficulty,
      problem.contestDate.slice(0, 10),
      problem.fnName ? `function: ${problem.fnName}` : "stdin/stdout",
      `${problem.nPublic} public tests + hidden tests`
    ].join(" | "),
    detailCards: [
      {
        title: "Problem",
        content: `${problem.title}\n${problem.contestId} - ${problem.contestDate.slice(0, 10)}`
      },
      {
        title: "Format",
        content: problem.fnName
          ? `LeetCode-style: implement function \`${problem.fnName}\` in class \`Solution\`.`
          : "Read from stdin, write to stdout."
      },
      {
        title: "Tests",
        content: `${problem.nPublic} public test cases + hidden test cases (all must pass for the problem to count).`
      }
    ]
  }));
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const passAt1 = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(passAt1);
  const detail = Math.round(passAt1 * 10) / 10;

  const platformOf = new Map(
    loadManifest().problems.map((problem) => [problem.id, problem.platform])
  );
  const perPlatform = new Map<string, { passed: number; total: number }>();
  for (const result of results) {
    const platform = platformOf.get(result.scenarioId);
    if (!platform) {
      continue;
    }
    const entry = perPlatform.get(platform) ?? { passed: 0, total: 0 };
    entry.total += 1;
    if ((result.score ?? 0) >= 0.5) {
      entry.passed += 1;
    }
    perPlatform.set(platform, entry);
  }

  const categories = PLATFORM_ORDER.filter((platform) => perPlatform.has(platform)).map(
    (platform) => {
      const entry = perPlatform.get(platform) ?? { passed: 0, total: 0 };
      return {
        id: platform,
        label: `${platform} (${entry.total})`,
        score: Math.round((entry.passed / entry.total) * 100),
        weight: entry.total
      };
    }
  );

  return {
    totalScore: points,
    categories,
    summary:
      total === 0
        ? "No results."
        : `pass@1: ${passed}/${total} (${detail}%) - ${points} points.`
  };
}
