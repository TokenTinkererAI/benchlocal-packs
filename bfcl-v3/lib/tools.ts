/**
 * Converts the dataset's function documents into OpenAI-compatible tool
 * schemas for the request's `tools` field.
 *
 * The dataset stores BFCL's own type vocabulary (`dict`, `any`, `float`, …)
 * and a few capitalised variants; the wire schema uses the JSON Schema types
 * from the upstream GORILLA_TO_OPENAPI mapping. Only a copy is converted —
 * grading always uses the dataset's original types.
 */
import type { BenchFunction, SchemaProperty } from "./types";

const GORILLA_TO_OPENAPI: Record<string, string> = {
  integer: "integer",
  number: "number",
  float: "number",
  string: "string",
  boolean: "boolean",
  bool: "boolean",
  array: "array",
  list: "array",
  dict: "object",
  object: "object",
  tuple: "array",
  any: "string",
  byte: "integer",
  short: "integer",
  long: "integer",
  double: "number",
  char: "string",
  ArrayList: "array",
  Array: "array",
  HashMap: "object",
  Hashtable: "object",
  Queue: "array",
  Stack: "array",
  Any: "string",
  String: "string",
  Boolean: "boolean",
  Bigint: "integer"
};

export type WireTool = {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required: string[];
    };
  };
};

function convertProperty(property: SchemaProperty): Record<string, unknown> {
  const declared = property.type ?? "any";
  const wireType = GORILLA_TO_OPENAPI[declared] ?? "string";
  const result: Record<string, unknown> = { type: wireType };
  if (property.description) {
    result.description = property.description;
  }
  if (wireType === "array") {
    const itemType = property.items?.type ? GORILLA_TO_OPENAPI[property.items.type] ?? "string" : "string";
    result.items = { type: itemType };
  }
  return result;
}

export function buildWireTools(functions: BenchFunction[]): WireTool[] {
  return functions.map((fn) => {
    const properties: Record<string, unknown> = {};
    for (const [name, property] of Object.entries(fn.parameters?.properties ?? {})) {
      properties[name] = convertProperty(property);
    }
    return {
      type: "function" as const,
      function: {
        name: fn.name,
        description: fn.description ?? "",
        parameters: {
          type: "object" as const,
          properties,
          required: fn.parameters?.required ?? []
        }
      }
    };
  });
}
