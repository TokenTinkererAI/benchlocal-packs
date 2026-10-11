"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWireTools = buildWireTools;
const GORILLA_TO_OPENAPI = {
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
function convertProperty(property) {
    const declared = property.type ?? "any";
    const wireType = GORILLA_TO_OPENAPI[declared] ?? "string";
    const result = { type: wireType };
    if (property.description) {
        result.description = property.description;
    }
    if (wireType === "array") {
        const itemType = property.items?.type ? GORILLA_TO_OPENAPI[property.items.type] ?? "string" : "string";
        result.items = { type: itemType };
    }
    return result;
}
function buildWireTools(functions) {
    return functions.map((fn) => {
        const properties = {};
        for (const [name, property] of Object.entries(fn.parameters?.properties ?? {})) {
            properties[name] = convertProperty(property);
        }
        return {
            type: "function",
            function: {
                name: fn.name,
                description: fn.description ?? "",
                parameters: {
                    type: "object",
                    properties,
                    required: fn.parameters?.required ?? []
                }
            }
        };
    });
}
