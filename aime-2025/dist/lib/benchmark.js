"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = exports.CATEGORY_ID = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
const prompts_1 = require("./prompts");
exports.CATEGORY_ID = "aime-2025";
exports.CATEGORY_LABEL = "AIME 2025 (accuracy)";
function getScenarioCards() {
    return problems_1.PROBLEMS.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${problem.contest} Problem ${problem.number}`,
        category: "AIME 2025",
        description: `${problem.contest} Problem ${problem.number}. No-tools competition math; scored by exact integer answer match (0-999).`,
        promptText: (0, prompts_1.formatProblem)(problem),
        detailCards: [
            { title: "Problem", content: problem.problem },
            { title: "Contest", content: `${problem.contest}, Problem ${problem.number}` },
            { title: "Scoring", content: "Exact match against the published integer answer (0-999)." }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const categories = total === 0
        ? []
        : [
            {
                id: exports.CATEGORY_ID,
                label: exports.CATEGORY_LABEL,
                score: points,
                weight: total
            }
        ];
    return {
        totalScore: points,
        categories,
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${accuracy.toFixed(1)}%) - ${points} points.`
    };
}
