"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBJECT_ORDER = exports.CATEGORY_LABEL = void 0;
exports.subjectCategoryId = subjectCategoryId;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const problems_1 = require("./generated/problems");
exports.CATEGORY_LABEL = "MATH-500 (accuracy)";
/** Fixed display order for the per-subject result-card breakdown. */
exports.SUBJECT_ORDER = [
    "Algebra",
    "Counting & Probability",
    "Geometry",
    "Intermediate Algebra",
    "Number Theory",
    "Prealgebra",
    "Precalculus"
];
/** First ~60 characters of the problem, single-line, for the scenario card title. */
function excerpt(problem) {
    const single = problem.replace(/\s+/g, " ").trim();
    return single.length <= 60 ? single : `${single.slice(0, 59)}...`;
}
/** Stable category id for a subject label ("Counting & Probability" -> "counting-probability"). */
function subjectCategoryId(subject) {
    return subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function getScenarioCards() {
    return problems_1.PROBLEMS.map((problem) => ({
        id: problem.id,
        title: `${problem.id} - ${problem.subject} L${problem.level} - ${excerpt(problem.problem)}`,
        category: problem.subject,
        description: `${problem.subject} (level ${problem.level}). No tools; one chat completion; scored by textual answer match against the published gold answer.`,
        promptText: problem.problem,
        detailCards: [
            { title: "Problem", content: problem.problem },
            { title: "Subject / level", content: `${problem.subject} - level ${problem.level} (as published by MATH)` },
            {
                title: "Scoring",
                content: "The final answer is read from the last \\boxed{...} group (or an answer phrase, or the last line) and compared with the published gold answer after textual LaTeX normalization. No code execution, no symbolic evaluation."
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
    const subjectOf = new Map(problems_1.PROBLEMS.map((problem) => [problem.id, problem.subject]));
    const perSubject = new Map();
    for (const result of results) {
        const subject = subjectOf.get(result.scenarioId);
        if (!subject) {
            continue;
        }
        const entry = perSubject.get(subject) ?? { passed: 0, total: 0 };
        entry.total += 1;
        if ((result.score ?? 0) >= 0.5) {
            entry.passed += 1;
        }
        perSubject.set(subject, entry);
    }
    const categories = exports.SUBJECT_ORDER.filter((subject) => perSubject.has(subject)).map((subject) => {
        const entry = perSubject.get(subject) ?? { passed: 0, total: 0 };
        return {
            id: subjectCategoryId(subject),
            label: `${subject} (${entry.total})`,
            score: entry.total === 0 ? 0 : Math.round((entry.passed / entry.total) * 100),
            weight: entry.total
        };
    });
    return {
        totalScore: points,
        categories,
        summary: total === 0 ? "No results." : `accuracy: ${passed}/${total} (${detail.toFixed(1)}%) - ${points} points.`
    };
}
