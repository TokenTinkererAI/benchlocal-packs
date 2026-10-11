"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_DEFS = exports.SCENARIOS = exports.CATEGORY_LABEL = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
exports.getScenario = getScenario;
const scenarios_1 = require("./generated/scenarios");
Object.defineProperty(exports, "SCENARIOS", { enumerable: true, get: function () { return scenarios_1.SCENARIOS; } });
Object.defineProperty(exports, "API_DEFS", { enumerable: true, get: function () { return scenarios_1.API_DEFS; } });
exports.CATEGORY_LABEL = "API-Bank (tool-call accuracy)";
const LEVEL_ORDER = [1, 2, 3];
const LEVEL_LABELS = {
    1: "Level 1 - single call",
    2: "Level 2 - retrieve then call",
    3: "Level 3 - multi-call planning"
};
function getScenarioCards() {
    return scenarios_1.SCENARIOS.map((scenario) => ({
        id: scenario.id,
        title: `${scenario.id} - ${scenario.title}`,
        category: LEVEL_LABELS[scenario.level] ?? `Level ${scenario.level}`,
        description: `${LEVEL_LABELS[scenario.level] ?? `Level ${scenario.level}`}; ${scenario.expectedCalls.length} expected API call(s).`,
        promptText: scenario.requirement,
        detailCards: [
            { title: "Requirement", content: scenario.requirement },
            { title: "Context", content: scenario.task },
            {
                title: "Task shape",
                content: [
                    `Level: ${scenario.level} (${LEVEL_LABELS[scenario.level] ?? "?"})`,
                    `Expected number of API calls: ${scenario.expectedCalls.length}`,
                    `Retrieval first (ToolSearcher): ${scenario.requiresRetrieval ? "yes" : "no"}`
                ].join("\n")
            },
            {
                title: "Available APIs",
                content: scenario.toolNames.join(", ")
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
    const levelOf = new Map(scenarios_1.SCENARIOS.map((scenario) => [scenario.id, scenario.level]));
    const perLevel = new Map();
    for (const result of results) {
        const level = levelOf.get(result.scenarioId);
        if (level === undefined) {
            continue;
        }
        const entry = perLevel.get(level) ?? { passed: 0, total: 0 };
        entry.total += 1;
        if ((result.score ?? 0) >= 0.5) {
            entry.passed += 1;
        }
        perLevel.set(level, entry);
    }
    const categories = LEVEL_ORDER.filter((level) => perLevel.has(level)).map((level) => {
        const entry = perLevel.get(level) ?? { passed: 0, total: 0 };
        return {
            id: `level-${level}`,
            label: `${LEVEL_LABELS[level]} (${entry.total})`,
            score: entry.total === 0 ? 0 : Math.round((entry.passed / entry.total) * 100),
            weight: entry.total
        };
    });
    return {
        totalScore: points,
        categories,
        summary: total === 0 ? "No results." : `tool-call accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
    };
}
/** Scenario lookup used by the CLI and the offline mock server. */
function getScenario(id) {
    return scenarios_1.SCENARIOS.find((scenario) => scenario.id === id);
}
