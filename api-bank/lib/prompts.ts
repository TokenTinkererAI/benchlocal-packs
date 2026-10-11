/**
 * Prompting + tool-schema construction for API-Bank.
 *
 * The pack targets OpenAI-compatible chat endpoints with native function
 * calling: the scenario's APIs are declared through the `tools` parameter and
 * the model answers with `tool_calls` rather than `[ApiName(...)]` text.
 */
import type { ApiDef, ApiScenario, ChatMessage } from "./types";

export const SYSTEM_PROMPT = [
  "You are an AI assistant that fulfils user requests by calling API tools.",
  "",
  "Rules:",
  "- Call exactly one API per turn and wait for its result before the next call.",
  "- If the API you need is not in your tool list yet, call ToolSearcher first with",
  "  descriptive keywords; its result reveals the matching API so you can call it.",
  "- Use the API's declared parameters and pass real values from the conversation.",
  "- Stop calling APIs once the user's request is fully satisfied.",
  "- Do not print API calls as text; use the tool-calling interface."
].join("\n");

/** Marker line that lets the offline harness identify the scenario under test. */
export function scenarioMarker(scenario: ApiScenario): string {
  return `Scenario: ${scenario.id}.`;
}

export function buildSystemMessage(scenario: ApiScenario): string {
  return `${SYSTEM_PROMPT}\n\n${scenarioMarker(scenario)}`;
}

export function buildUserMessage(scenario: ApiScenario): string {
  const intro =
    scenario.level === 1
      ? "Fulfil the user's request by calling the appropriate API with the correct arguments."
      : "Fulfil the user's request by searching for and calling the appropriate APIs, in order.";
  return `${intro}\n\n${scenario.task.trim()}`;
}

export function buildMessages(scenario: ApiScenario): ChatMessage[] {
  return [
    { role: "system", content: buildSystemMessage(scenario) },
    { role: "user", content: buildUserMessage(scenario) }
  ];
}

/** Convert an API definition into an OpenAI function-tool schema. */
export function toToolSchema(api: ApiDef): Record<string, unknown> {
  const properties: Record<string, unknown> = {};
  for (const [name, param] of Object.entries(api.parameters)) {
    properties[name] = {
      type: jsonTypeFor(param.type),
      description: param.description
    };
  }
  return {
    type: "function",
    function: {
      name: api.name,
      description: api.description,
      parameters: {
        type: "object",
        properties,
        required: Object.keys(api.parameters)
      }
    }
  };
}

function jsonTypeFor(declared: string): string {
  const normalized = declared.toLowerCase();
  if (normalized.includes("int") || normalized.includes("float") || normalized.includes("number")) {
    return "number";
  }
  if (normalized.includes("list")) {
    return "array";
  }
  if (normalized.includes("dict")) {
    return "object";
  }
  if (normalized.includes("bool")) {
    return "boolean";
  }
  return "string";
}

export function buildToolSchemas(apiDefs: Record<string, ApiDef>, names: string[]): Record<string, unknown>[] {
  return names
    .map((name) => apiDefs[name])
    .filter((api): api is ApiDef => Boolean(api))
    .map(toToolSchema);
}
