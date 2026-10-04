"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCENARIOS = exports.CATEGORY_LABEL = exports.CATEGORY_ID = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
exports.CATEGORY_ID = "humaneval";
exports.CATEGORY_LABEL = "HumanEval (pass@1)";
/** First line of the problem's docstring, for the scenario card. */
function describe(entryPoint, prompt) {
    const docstring = prompt.match(/"""([\s\S]*?)"""/);
    const firstLine = docstring?.[1]?.split("\n").map((line) => line.trim()).find(Boolean);
    return firstLine ? `${entryPoint}: ${firstLine}` : `Complete ${entryPoint}.`;
}
exports.SCENARIOS = problems_1.PROBLEMS.map((problem) => ({
    id: problem.id,
    title: `${problem.id} - ${problem.entryPoint}`,
    category: exports.CATEGORY_ID,
    description: describe(problem.entryPoint, problem.prompt),
    promptText: problem.prompt,
    entryPoint: problem.entryPoint
}));
function getScenarioCards() {
    return exports.SCENARIOS.map((scenario) => ({
        id: scenario.id,
        title: scenario.title,
        category: scenario.category,
        description: scenario.description,
        promptText: scenario.promptText,
        detailCards: [
            { title: "Task", content: scenario.description },
            { title: "Entry point", content: scenario.entryPoint },
            { title: "Prompt", content: scenario.promptText }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const passAt1 = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(passAt1);
    const detail = Math.round(passAt1 * 10) / 10;
    return {
        totalScore: points,
        categories: [
            {
                id: exports.CATEGORY_ID,
                label: exports.CATEGORY_LABEL,
                score: points,
                weight: 100
            }
        ],
        summary: total === 0 ? "No results." : `pass@1: ${passed}/${total} (${detail}%) - ${points} points.`
    };
}
