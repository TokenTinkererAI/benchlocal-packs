"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
const prompts_1 = require("./prompts");
exports.CATEGORY_LABEL = "MMLU-Redux (accuracy)";
function getScenarioCards() {
    return problems_1.PROBLEMS.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${(0, prompts_1.formatSubject)(problem.subject)}`,
        category: problems_1.GROUP_LABELS[problem.group],
        description: `${problems_1.GROUP_LABELS[problem.group]} / ${(0, prompts_1.formatSubject)(problem.subject)}. No-tools multiple choice; scored by exact answer match.`,
        promptText: (0, prompts_1.formatQuestion)(problem),
        detailCards: [
            { title: "Question", content: problem.question },
            {
                title: "Options",
                content: problem.options.map((option, index) => `${"ABCD"[index]}. ${option}`).join("\n")
            },
            { title: "Subject", content: `${(0, prompts_1.formatSubject)(problem.subject)} (${problems_1.GROUP_LABELS[problem.group]})` }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
    const groupOf = new Map(problems_1.PROBLEMS.map((problem) => [problem.id, problem.group]));
    const perGroup = new Map();
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
    const categories = problems_1.GROUP_ORDER.filter((group) => perGroup.has(group)).map((group) => {
        const entry = perGroup.get(group) ?? { passed: 0, total: 0 };
        return {
            id: group,
            label: `${problems_1.GROUP_LABELS[group]} (${entry.total})`,
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
