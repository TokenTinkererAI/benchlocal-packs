"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = exports.CATEGORY_ID = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const dataset_1 = require("./dataset");
exports.CATEGORY_ID = "mbpp-plus";
exports.CATEGORY_LABEL = "MBPP+ (pass@1)";
function getScenarioCards() {
    return (0, dataset_1.loadManifest)().problems.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${problem.entryPoint}`,
        category: exports.CATEGORY_ID,
        description: `${problem.title} | ${problem.nBase} base + ${problem.nPlus} plus inputs`,
        detailCards: [
            { title: "Task", content: `${problem.entryPoint}: ${problem.title}` },
            {
                title: "Tests",
                content: `${problem.nBase} base inputs + ${problem.nPlus} plus inputs (every input of both suites must pass).`
            },
            {
                title: "Grading",
                content: `EvalPlus comparison semantics; float tolerance atol=${problem.atol}` +
                    (problem.atol === 0 ? " (1e-6 is used when the expected value is a float)." : ".")
            }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const passAt1 = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(passAt1);
    // One fixed decimal so the summary always reads e.g. "(100.0%)".
    const detail = passAt1.toFixed(1);
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
