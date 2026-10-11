"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = exports.CATEGORY_ID = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const questions_1 = require("./generated/questions");
const prompts_1 = require("./prompts");
exports.CATEGORY_ID = "arc-challenge";
exports.CATEGORY_LABEL = "ARC-Challenge (accuracy)";
function getScenarioCards() {
    return questions_1.QUESTIONS.map((question) => ({
        id: question.id,
        title: `${question.id} - ${question.recordId}`,
        category: exports.CATEGORY_LABEL,
        description: `${question.options.length}-option science question; no tools, scored by exact answer match.`,
        promptText: (0, prompts_1.formatQuestion)(question),
        detailCards: [
            { title: "Question", content: question.question },
            {
                title: "Options",
                content: question.options.map((option, index) => `${"ABCDE"[index]}) ${option}`).join("\n")
            },
            { title: "Source record", content: question.recordId }
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
                label: `${exports.CATEGORY_LABEL} (${total})`,
                score: points,
                weight: total
            }
        ];
    return {
        totalScore: points,
        categories,
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
    };
}
