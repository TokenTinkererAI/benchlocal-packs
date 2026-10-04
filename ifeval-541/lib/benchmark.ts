import type { BenchmarkScore, ScoredScenarioResult, ScenarioMeta } from "@benchlocal/sdk";

import { PROBLEMS } from "./generated/problems";

export const CATEGORY_LABEL = "IFEval (strict instruction following)";

export function getScenarioCards(): ScenarioMeta[] {
  return PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.instructionIds.join(" + ")}`,
    category: "instruction-following",
    description: `${problem.instructionIds.length} instruction(s): ${problem.instructionIds.join(", ")}. Graded by IFEval's programmatic checks (strict + loose).`,
    promptText: problem.prompt,
    detailCards: [
      { title: "Prompt", content: problem.prompt },
      { title: "Instructions", content: problem.instructionIds.join("\n") },
      {
        title: "Grading",
        content:
          "Programmatic constraint checks from Google Research's instruction_following_eval " +
          "(vendored, Apache-2.0). A scenario passes when every instruction is followed strictly."
      }
    ]
  }));
}

/** Machine-readable per-result verdict written by the orchestrator into `note`. */
const NOTE_PATTERN = /strict=(pass|fail)\s+loose=(pass|fail)/;

function strictPass(result: ScoredScenarioResult): boolean {
  const note = typeof result.note === "string" ? NOTE_PATTERN.exec(result.note) : null;
  if (note) {
    return note[1] === "pass";
  }
  return (result.score ?? 0) >= 0.5;
}

function looseVerdict(result: ScoredScenarioResult): boolean | null {
  const note = typeof result.note === "string" ? NOTE_PATTERN.exec(result.note) : null;
  if (!note) {
    return null;
  }
  return note[2] === "pass";
}

function percentage(passed: number, total: number): string {
  const value = total === 0 ? 0 : Math.round((passed / total) * 1000) / 10;
  return value.toFixed(1);
}

export function scoreModelResults(results: ScoredScenarioResult[]): BenchmarkScore {
  const total = results.length;
  const passed = results.filter(strictPass).length;
  const points = total === 0 ? 0 : Math.round((passed / total) * 100);

  const looseKnown = results.filter((result) => looseVerdict(result) !== null);
  const loosePassed = looseKnown.filter((result) => looseVerdict(result) === true).length;

  const categories = [
    {
      id: "instruction-following",
      label: `${CATEGORY_LABEL} (${total})`,
      score: points,
      weight: total
    }
  ];

  const strictText = `strict: ${passed}/${total} (${percentage(passed, total)}%) - ${points} points.`;
  const looseText =
    looseKnown.length > 0
      ? `loose: ${loosePassed}/${looseKnown.length} (${percentage(loosePassed, looseKnown.length)}%)`
      : "loose: n/a";

  return {
    totalScore: points,
    categories,
    summary: total === 0 ? "No results." : `${strictText} | ${looseText}`
  };
}
