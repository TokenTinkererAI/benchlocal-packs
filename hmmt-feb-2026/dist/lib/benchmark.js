"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = exports.CATEGORY_ID = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
const prompts_1 = require("./prompts");
exports.CATEGORY_ID = "hmmt-feb-2026";
exports.CATEGORY_LABEL = "HMMT Feb 2026 (accuracy)";
/** First ~60 characters of the problem, single-line, for the scenario card title. */
function excerpt(problem) {
    const single = problem.replace(/\s+/g, " ").trim();
    return single.length <= 60 ? single : `${single.slice(0, 59)}...`;
}
function getScenarioCards() {
    return problems_1.PROBLEMS.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${problem.types.join(", ")} - ${excerpt(problem.problem)}`,
        category: "HMMT Feb 2026",
        description: `${problem.types.join(", ")} (source problem ${problem.number}). No tools; one chat completion; scored by textual answer match against the official gold answer.`,
        promptText: (0, prompts_1.formatProblem)(problem),
        detailCards: [
            { title: "Problem", content: problem.problem },
            { title: "Problem type", content: problem.types.join(", ") },
            {
                title: "Scoring",
                content: "The final answer is read from the last \\boxed{...} group (or an answer phrase, or the last line) and compared with the official gold answer after textual LaTeX normalization. No code execution, no symbolic evaluation."
            }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
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
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail.toFixed(1)}%) - ${points} points.`
    };
}
