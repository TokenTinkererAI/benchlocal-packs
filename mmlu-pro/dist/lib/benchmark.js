"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
const prompts_1 = require("./prompts");
exports.CATEGORY_LABEL = "MMLU-Pro (accuracy)";
function getScenarioCards() {
    return problems_1.PROBLEMS.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${problems_1.CATEGORY_LABELS[problem.category]}`,
        category: problems_1.CATEGORY_LABELS[problem.category],
        description: `${problems_1.CATEGORY_LABELS[problem.category]} (${problem.src}). No-tools multiple choice (3-10 options); scored by exact answer match.`,
        promptText: (0, prompts_1.formatQuestion)(problem),
        detailCards: [
            { title: "Question", content: problem.question },
            {
                title: "Options",
                content: problem.options.map((option, index) => `${"ABCDEFGHIJ"[index]}. ${option}`).join("\n")
            },
            { title: "Category", content: `${problems_1.CATEGORY_LABELS[problem.category]} (${problem.src})` }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
    const categoryOf = new Map(problems_1.PROBLEMS.map((problem) => [problem.id, problem.category]));
    const perCategory = new Map();
    for (const result of results) {
        const category = categoryOf.get(result.scenarioId);
        if (!category) {
            continue;
        }
        const entry = perCategory.get(category) ?? { passed: 0, total: 0 };
        entry.total += 1;
        if ((result.score ?? 0) >= 0.5) {
            entry.passed += 1;
        }
        perCategory.set(category, entry);
    }
    const categories = problems_1.CATEGORY_ORDER.filter((category) => perCategory.has(category)).map((category) => {
        const entry = perCategory.get(category) ?? { passed: 0, total: 0 };
        return {
            id: category,
            label: `${problems_1.CATEGORY_LABELS[category]} (${entry.total})`,
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
