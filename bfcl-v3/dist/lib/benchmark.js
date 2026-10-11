"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScenarioCards = void 0;
exports.scoreModelResults = scoreModelResults;
const dataset_1 = require("./dataset");
Object.defineProperty(exports, "getScenarioCards", { enumerable: true, get: function () { return dataset_1.getScenarioCards; } });
/** Order in which the per-category breakdown is reported. */
const CATEGORY_ORDER = ["simple", "multiple", "parallel", "parallel_multiple", "sql", "irrelevance"];
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
    const categoryOf = new Map((0, dataset_1.loadManifest)().scenarios.map((entry) => [entry.id, entry.category]));
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
    const categories = CATEGORY_ORDER.filter((category) => perCategory.has(category)).map((category) => {
        const entry = perCategory.get(category) ?? { passed: 0, total: 0 };
        return {
            id: category,
            label: `${dataset_1.CATEGORY_LABELS[category] ?? category} (${entry.total})`,
            score: entry.total === 0 ? 0 : Math.round((entry.passed / entry.total) * 100),
            weight: entry.total
        };
    });
    return {
        totalScore: points,
        categories,
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail}%) - ${points} points.`
    };
}
