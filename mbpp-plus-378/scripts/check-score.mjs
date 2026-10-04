#!/usr/bin/env node
/**
 * Scoring checks for MBPP+-378 (run with: npm run check:score).
 *
 * Validates lib/benchmark.ts's scoreModelResults with synthetic results (house
 * rule: integer points out of 100, "pass@1: n/total (x%) - p points." summary)
 * and, when a CLI results file is passed, with a real run:
 *
 *   node scripts/check-score.mjs results/mock-run.json
 */
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { scoreModelResults, getScenarioCards } = require("../dist-cli/lib/benchmark.js");

let failures = 0;

function check(name, score, expect) {
  const ok =
    score.totalScore === expect.totalScore &&
    score.summary === expect.summary &&
    score.categories.length === expect.categories;
  if (!ok) {
    failures += 1;
    console.log(`[FAIL] ${name}`);
    console.log(`  expected ${JSON.stringify(expect)}`);
    console.log(`  actual   ${JSON.stringify({ totalScore: score.totalScore, summary: score.summary, categories: score.categories.length })}`);
  } else {
    console.log(`[ok ] ${name}: ${score.totalScore} points | ${score.summary}`);
  }
}

check("no results", scoreModelResults([]), {
  totalScore: 0,
  summary: "No results.",
  categories: 1
});

const results = (passed, total) => {
  const list = [];
  for (let i = 0; i < total; i += 1) {
    list.push({ scenarioId: `Mbpp/${i + 2}`, score: i < passed ? 1 : 0, status: i < passed ? "pass" : "fail" });
  }
  return list;
};

check("378/378", scoreModelResults(results(378, 378)), {
  totalScore: 100,
  summary: "pass@1: 378/378 (100.0%) - 100 points.",
  categories: 1
});
check("189/378", scoreModelResults(results(189, 378)), {
  totalScore: 50,
  summary: "pass@1: 189/378 (50.0%) - 50 points.",
  categories: 1
});
check("1/378", scoreModelResults(results(1, 378)), {
  totalScore: 0,
  summary: "pass@1: 1/378 (0.3%) - 0 points.",
  categories: 1
});

const cards = getScenarioCards();
if (cards.length !== 378) {
  failures += 1;
  console.log(`[FAIL] scenario cards: expected 378, got ${cards.length}`);
} else {
  const badCard = cards.find((card) => !card.id || !card.title || !card.description);
  if (badCard) {
    failures += 1;
    console.log(`[FAIL] scenario card missing fields: ${JSON.stringify(badCard).slice(0, 200)}`);
  } else {
    console.log(`[ok ] scenario cards: ${cards.length} cards (first: ${cards[0].title})`);
  }
}

const runPath = process.argv[2];
if (runPath) {
  const run = JSON.parse(fs.readFileSync(runPath, "utf8"));
  const scored = run.results.map((result) => ({
    scenarioId: result.id,
    score: result.status === "pass" ? 1 : 0,
    status: result.status
  }));
  const score = scoreModelResults(scored);
  console.log(`[ok ] ${runPath}: ${score.totalScore} points | ${score.summary}`);
  if (score.summary !== `pass@1: ${run.passed}/${run.total} (100.0%) - ${score.totalScore} points.`) {
    console.log(`      (run recorded ${run.passed}/${run.total}, pass@1 ${run.passAt1}%)`);
  }
}

console.log("");
console.log(failures === 0 ? "SCORE OK" : `SCORE FAILED: ${failures} case(s)`);
process.exitCode = failures === 0 ? 0 : 1;
