/**
 * Deterministic in-process mock API layer.
 *
 * API-Bank's upstream harness executes an API call against a live tool runtime
 * and checks the returned result. This pack keeps the same idea but stays
 * offline: every API is backed by the dataset itself.
 *
 *   1. If the dataset records a result for the requested (api, arguments)
 *      pair, that recorded result is returned verbatim.
 *   2. `ToolSearcher` is served by a deterministic keyword search over the
 *      scenario's own API catalog.
 *   3. Anything else returns a deterministic type-shaped placeholder.
 *
 * Same call in, same result out — no network, no clock, no randomness.
 */
import type { ApiDef, ApiScenario, ExecutedCall } from "./types";
import { valueMatches } from "./grade";

export type MockResult = {
  output: unknown;
  source: "recorded" | "tool-search" | "placeholder";
};

function cardOf(api: ApiDef): Record<string, unknown> {
  return {
    name: api.name,
    description: api.description,
    input_parameters: api.parameters,
    output_parameters: api.outputs
  };
}

function placeholderFor(type: string): unknown {
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

function findRecorded(scenario: ApiScenario, call: ExecutedCall): unknown | undefined {
  for (const recorded of scenario.mockOutputs) {
    if (recorded.name !== call.name) {
      continue;
    }
    const keys = Object.keys(recorded.args);
    if (keys.length !== Object.keys(call.args).length) {
      continue;
    }
    const matches = keys.every((key) => key in call.args && valueMatches(recorded.args[key], call.args[key], key));
    if (matches) {
      return recorded.output;
    }
  }
  return undefined;
}

/** Split an identifier or phrase into lowercase alphanumeric tokens. */
function tokens(text: string): string[] {
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
function toolSearch(apiDefs: Record<string, ApiDef>, scenario: ApiScenario, keywords: string): ApiDef[] {
  const query = tokens(keywords);
  const candidates = scenario.toolNames
    .filter((name) => name !== "ToolSearcher")
    .map((name) => apiDefs[name])
    .filter((api): api is ApiDef => Boolean(api));

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
export function executeCall(apiDefs: Record<string, ApiDef>, scenario: ApiScenario, call: ExecutedCall): MockResult {
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
  const outputs: Record<string, unknown> = {};
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
export function revealedTools(scenario: ApiScenario, call: ExecutedCall, output: unknown): string[] {
  if (call.name !== "ToolSearcher") {
    return [];
  }
  const cards = Array.isArray(output) ? output : [output];
  const names: string[] = [];
  for (const card of cards) {
    if (card && typeof card === "object" && typeof (card as { name?: unknown }).name === "string") {
      const name = (card as { name: string }).name;
      if (scenario.toolNames.includes(name) && !names.includes(name)) {
        names.push(name);
      }
    }
  }
  return names;
}
