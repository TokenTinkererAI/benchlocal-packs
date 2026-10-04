"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABEL = void 0;
exports.getScenarioCards = getScenarioCards;
exports.scoreModelResults = scoreModelResults;
const questions_1 = require("./generated/questions");
const prompts_1 = require("./prompts");
exports.CATEGORY_LABEL = "GPQA Diamond (accuracy)";
const DOMAIN_ORDER = ["Physics", "Chemistry", "Biology"];
function getScenarioCards() {
    return questions_1.QUESTIONS.map((question) => ({
        id: question.id,
        title: `${question.id} - ${question.subdomain}`,
        category: question.domain,
        description: `${question.domain} / ${question.subdomain}. No-tools multiple choice; scored by exact answer match.`,
        promptText: (0, prompts_1.formatQuestion)(question),
        detailCards: [
            { title: "Question", content: question.question },
            {
                title: "Options",
                content: question.options.map((option, index) => `${"ABCD"[index]}) ${option}`).join("\n")
            },
            { title: "Domain", content: `${question.domain} - ${question.subdomain}` }
        ]
    }));
}
function scoreModelResults(results) {
    const total = results.length;
    const passed = results.filter((result) => (result.score ?? 0) >= 0.5).length;
    const accuracy = total === 0 ? 0 : (passed / total) * 100;
    const points = Math.round(accuracy);
    const detail = Math.round(accuracy * 10) / 10;
    const domainOf = new Map(questions_1.QUESTIONS.map((question) => [question.id, question.domain]));
    const perDomain = new Map();
    for (const result of results) {
        const domain = domainOf.get(result.scenarioId);
        if (!domain) {
            continue;
        }
        const entry = perDomain.get(domain) ?? { passed: 0, total: 0 };
        entry.total += 1;
        if ((result.score ?? 0) >= 0.5) {
            entry.passed += 1;
        }
        perDomain.set(domain, entry);
    }
    const categories = DOMAIN_ORDER.filter((domain) => perDomain.has(domain)).map((domain) => {
        const entry = perDomain.get(domain) ?? { passed: 0, total: 0 };
        return {
            id: domain.toLowerCase(),
            label: `${domain} (${entry.total})`,
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
