"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCall = executeCall;
exports.revealedTools = revealedTools;
const grade_1 = require("./grade");
function cardOf(api) {
    return {
        name: api.name,
        description: api.description,
        input_parameters: api.parameters,
        output_parameters: api.outputs
    };
}
function placeholderFor(type) {
    const normalized = type.toLowerCase();
    if (normalized.includes("int") || normalized.includes("float") || normalized.includes("number")) {
        return 0;
    }
    if (normalized.includes("list")) {
        return [];
    }
    if (normalized.includes("dict")) {
        return {};
    }
    if (normalized.includes("bool")) {
        return false;
    }
    return "success";
}
function findRecorded(scenario, call) {
    for (const recorded of scenario.mockOutputs) {
        if (recorded.name !== call.name) {
            continue;
        }
        const keys = Object.keys(recorded.args);
        if (keys.length !== Object.keys(call.args).length) {
            continue;
        }
        const matches = keys.every((key) => key in call.args && (0, grade_1.valueMatches)(recorded.args[key], call.args[key], key));
        if (matches) {
            return recorded.output;
        }
    }
    return undefined;
}
/** Split an identifier or phrase into lowercase alphanumeric tokens. */
function tokens(text) {
    return text
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
}
/**
 * Deterministic ToolSearcher: score each catalog API by shared tokens between
 * the query and the API's name + description, then return the best cards.
 */
function toolSearch(apiDefs, scenario, keywords) {
    const query = tokens(keywords);
    const candidates = scenario.toolNames
        .filter((name) => name !== "ToolSearcher")
        .map((name) => apiDefs[name])
        .filter((api) => Boolean(api));
    if (query.length === 0) {
        return candidates.slice(0, 3);
    }
    const scored = candidates
        .map((api) => {
        const haystack = new Set([...tokens(api.name), ...tokens(api.description)]);
        const score = query.reduce((total, token) => total + (haystack.has(token) ? 1 : 0), 0);
        return { api, score };
    })
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.api.name.localeCompare(right.api.name))
        .map((entry) => entry.api);
    // Fall back to the whole catalog so a browsing model is never left stuck.
    return (scored.length > 0 ? scored : candidates).slice(0, 3);
}
/** Execute one call against the mock layer. */
function executeCall(apiDefs, scenario, call) {
    const recorded = findRecorded(scenario, call);
    if (recorded !== undefined) {
        return { output: recorded, source: "recorded" };
    }
    if (call.name === "ToolSearcher") {
        const keywords = typeof call.args.keywords === "string" ? call.args.keywords : "";
        return { output: toolSearch(apiDefs, scenario, keywords).map(cardOf), source: "tool-search" };
    }
    const api = apiDefs[call.name];
    if (!api) {
        return { output: { error: `unknown API "${call.name}"` }, source: "placeholder" };
    }
    const outputs = {};
    for (const [name, param] of Object.entries(api.outputs)) {
        outputs[name] = placeholderFor(param.type);
    }
    if (Object.keys(outputs).length === 0) {
        outputs.status = "success";
    }
    return { output: outputs, source: "placeholder" };
}
/**
 * APIs revealed by a ToolSearcher call: the returned cards' names, limited to
 * the scenario's catalog. Non-search calls reveal nothing.
 */
function revealedTools(scenario, call, output) {
    if (call.name !== "ToolSearcher") {
        return [];
    }
    const cards = Array.isArray(output) ? output : [output];
    const names = [];
    for (const card of cards) {
        if (card && typeof card === "object" && typeof card.name === "string") {
            const name = card.name;
            if (scenario.toolNames.includes(name) && !names.includes(name)) {
                names.push(name);
            }
        }
    }
    return names;
}
