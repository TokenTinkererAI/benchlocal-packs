"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const questions_1 = require("./generated/questions");
const prompts_1 = require("./prompts");
exports.CATEGORY_LABEL = "ARC-Easy (accuracy)";
function getScenarioCards() {
    return questions_1.QUESTIONS.map((question) => ({
        id: question.id,
        title: question.id,
        category: "ARC-Easy",
        description: "Grade-school science multiple choice; scored by exact answer match.",
        promptText: (0, prompts_1.formatQuestion)(question),
        detailCards: [
            { title: "Question", content: question.question },
            {
                title: "Options",
                content: question.options.map((option, index) => `${"ABCDE"[index]}) ${option}`).join("\n")
            },
            { title: "Upstream id", content: question.recordId }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
    return {
        totalScore: points,
        categories: [],
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
    };
}
