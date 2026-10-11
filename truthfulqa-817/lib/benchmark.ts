import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { QUESTIONS } from "./generated/questions";
import { formatQuestion } from "./prompts";

export const CATEGORY_LABEL = "TruthfulQA MC1 (accuracy)";

/** Informational breakdown buckets over the number of answer choices. */
const BUCKETS = [
  { id: "choices-2-3", label: "2-3 choices", min: 2, max: 3 },
  { id: "choices-4-5", label: "4-5 choices", min: 4, max: 5 },
  { id: "choices-6-8", label: "6-8 choices", min: 6, max: 8 },
  { id: "choices-9-plus", label: "9+ choices", min: 9, max: Number.POSITIVE_INFINITY }
] as const;

function bucketOf(choiceCount: number): (typeof BUCKETS)[number] | undefined {
  return BUCKETS.find((bucket) => choiceCount >= bucket.min && choiceCount <= bucket.max);
}

export function getScenarioCards(): ScenarioMeta[] {
  return QUESTIONS.map((question) => {
    const choiceCount = question.options.length;
    const bucket = bucketOf(choiceCount);
    return {
      id: question.id,
      title: `${question.id} - MC1 (${choiceCount} choices)`,
      category: bucket?.label ?? "MC1",
      description: `TruthfulQA MC1. ${choiceCount} answer choices; scored by exact answer match.`,
      promptText: formatQuestion(question),
      detailCards: [
        { title: "Question", content: question.question },
        {
          title: "Options",
          content: question.options
            .map((option, index) => `${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]}) ${option}`)
            .join("\n")
        },
        { title: "Format", content: `MC1 - ${choiceCount} answer choices, exactly one true.` }
      ]
    };
  });
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
  const accuracy = total === 0 ? 0 : (passed / total) * 100;
  const points = Math.round(accuracy);
  const detail = Math.round(accuracy * 10) / 10;

  const choiceCountOf = new Map(QUESTIONS.map((question) => [question.id, question.options.length]));
  const perBucket = new Map<string, { passed: number; total: number }>();
  for (const result of results) {
    const choiceCount = choiceCountOf.get(result.scenarioId);
    if (choiceCount === undefined) {
      continue;
    }
    const bucket = bucketOf(choiceCount);
    if (!bucket) {
      continue;
    }
    const entry = perBucket.get(bucket.id) ?? { passed: 0, total: 0 };
    entry.total += 1;
    if ((result.score ?? 0) >= 0.5) {
      entry.passed += 1;
    }
    perBucket.set(bucket.id, entry);
  }

  const categories = BUCKETS.filter((bucket) => perBucket.has(bucket.id)).map((bucket) => {
    const entry = perBucket.get(bucket.id) ?? { passed: 0, total: 0 };
    return {
      id: bucket.id,
      label: `${bucket.label} (${entry.total})`,
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
