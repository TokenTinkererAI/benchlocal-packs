"use strict";
/**
 * BFCL v3 AST-match grading (phase 1).
 *
 * This module ports the upstream Berkeley Function Calling Leaderboard AST
 * checker's semantics for the single-turn, non-live categories this pack
 * evaluates: `simple`, `multiple`, `parallel`, `parallel_multiple`, `sql`.
 * The port follows the upstream Python checker
 * (`bfcl_eval/eval_checker/ast_eval/ast_checker.py`) function by function so
 * that a scenario's verdict here matches what BFCL's own harness would return
 * for the same emitted call set:
 *
 *   - `parallel*` categories: order-insensitive, call-count-exact matching
 *     (each expected call is paired with one distinct emitted call).
 *   - `multiple` categories: exactly one emitted call, matched structurally.
 *   - everything else (`simple`, `sql`): exactly one emitted call.
 *   - function names must match exactly (after the dot-to-underscore
 *     normalisation applied when tool names are put on the wire).
 *   - arguments: every emitted parameter must be one the schema exposes and
 *     one the ground truth constrains; every required parameter of the schema
 *     must be present; every ground-truth parameter without an optional (`""`)
 *     marker must be present; string/array/dict values are compared after
 *     upstream string standardisation; numeric and boolean values are compared
 *     by value; extra unexpected calls or parameters fail.
 *
 * `irrelevance` scenarios are graded separately (see `checkIrrelevance`): the
 * model must emit no tool call at all.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pyTypeOf = pyTypeOf;
exports.standardizeString = standardizeString;
exports.pyEquals = pyEquals;
exports.stringChecker = stringChecker;
exports.listChecker = listChecker;
exports.dictChecker = dictChecker;
exports.listDictChecker = listDictChecker;
exports.typeChecker = typeChecker;
exports.findDescription = findDescription;
exports.simpleFunctionChecker = simpleFunctionChecker;
exports.parallelFunctionCheckerNoOrder = parallelFunctionCheckerNoOrder;
exports.multipleFunctionChecker = multipleFunctionChecker;
exports.astChecker = astChecker;
exports.checkIrrelevance = checkIrrelevance;
function pyTypeOf(value) {
    if (value === null || value === undefined) {
        return "none";
    }
    switch (typeof value) {
        case "string":
            return "str";
        case "boolean":
            return "bool";
        case "number":
            return Number.isInteger(value) ? "int" : "float";
        case "object":
            return Array.isArray(value) ? "list" : "dict";
        default:
            return "str";
    }
}
/**
 * Upstream `PYTHON_TYPE_MAPPING` plus the wider GORILLA type vocabulary the
 * dataset's schemas may use. Only the Python-language types occur in the
 * categories this pack evaluates; the rest are present for completeness.
 */
const SCHEMA_TYPE_TO_PY = {
    string: "str",
    integer: "int",
    float: "float",
    boolean: "bool",
    array: "list",
    tuple: "list",
    dict: "dict",
    any: "str",
    // wider vocabulary (unused by the in-scope Python categories)
    number: "float",
    bool: "bool",
    list: "list",
    object: "dict",
    byte: "int",
    short: "int",
    long: "int",
    double: "float",
    char: "str",
    ArrayList: "list",
    Array: "list",
    Queue: "list",
    Stack: "list",
    HashMap: "dict",
    Hashtable: "dict",
    Any: "str",
    String: "str",
    Boolean: "bool",
    Bigint: "int"
};
/** Upstream `PYTHON_NESTED_TYPE_CHECK_LIST`. */
const NESTED_TYPE_CHECK_LIST = new Set(["array", "tuple"]);
// ---------------------------------------------------------------------------
// Value helpers
// ---------------------------------------------------------------------------
/** Upstream `standardize_string`: drop spaces and `,./-_*^`, lowercase, unify quotes. */
function standardizeString(input) {
    return input.replace(/[ ,./\-_*^]/g, "").toLowerCase().replace(/'/g, '"');
}
/** Python `==` semantics for the value kinds that appear in the dataset. */
function pyEquals(a, b) {
    if (a === b) {
        return true;
    }
    const ta = pyTypeOf(a);
    const tb = pyTypeOf(b);
    if ((ta === "bool" && tb === "int") || (ta === "int" && tb === "bool")) {
        const av = ta === "bool" ? (a ? 1 : 0) : a;
        const bv = tb === "bool" ? (b ? 1 : 0) : b;
        return av === bv;
    }
    if (ta === "list" && tb === "list") {
        const la = a;
        const lb = b;
        return la.length === lb.length && la.every((item, index) => pyEquals(item, lb[index]));
    }
    if (ta === "dict" && tb === "dict") {
        const oa = a;
        const ob = b;
        const keysA = Object.keys(oa);
        const keysB = Object.keys(ob);
        return keysA.length === keysB.length && keysA.every((key) => key in ob && pyEquals(oa[key], ob[key]));
    }
    return false;
}
/** Python `value in possible_answer` (membership by `==`). */
function pyContains(list, value) {
    return list.some((item) => pyEquals(item, value));
}
/** Upstream `get_possible_answer_type` (first value that is not the `""` marker). */
function getPossibleAnswerType(possibleAnswer) {
    for (const answer of possibleAnswer) {
        if (answer !== "") {
            return pyTypeOf(answer);
        }
    }
    return null;
}
function ok() {
    return { valid: true, error: [], errorType: "" };
}
function fail(errorType, message) {
    return { valid: false, error: [message], errorType };
}
// ---------------------------------------------------------------------------
// Value-level checkers
// ---------------------------------------------------------------------------
/**
 * SQL golds store the same value in several shapes (string / flat list / nested list) while the
 * tool schema handed to the model declares one; accept any shape-legal rendering of the value.
 */
function shapeVariants(value) {
    const out = [value];
    if (typeof value === "string") {
        out.push([value], [[value]]);
    }
    else if (Array.isArray(value)) {
        if (value.length === 1) {
            out.push(value[0]);
        }
        if (value.length === 1 && Array.isArray(value[0])) {
            out.push(value[0]);
        }
        if (value.every((item) => typeof item === "string")) {
            out.push([value]);
            out.push(value.map((item) => [item]));
        }
        else if (value.every((item) => Array.isArray(item))) {
            out.push(value.flat());
        }
    }
    return out;
}
/** Shape- and type-tolerant parameter comparison used for `sql` scenarios only. */
function tolerantValuesEqual(model, candidate) {
    const left = shapeVariants(model);
    const right = shapeVariants(candidate);
    return left.some((a) => right.some((b) => tolerantDeepEquals(a, b)));
}
/** Leaf comparison on RAW values: exact Python equality, plus standardised-string equality and
 * numeric equality across number/string renderings (`update_values` golds hold numbers while the
 * declared schema types them as strings; standardising first would turn "10.0" into "100"). */
function tolerantLeafEquals(a, b) {
    if (pyEquals(a, b)) {
        return true;
    }
    if (typeof a === "string" && typeof b === "string") {
        const sa = standardizeString(a);
        const sb = standardizeString(b);
        if (sa === sb) {
            return true;
        }
        // Gold conditions drop the quotes around string values ("ID = EX123"); models quote them.
        const stripQuotes = (s) => s.replace(/["']/g, "");
        if (stripQuotes(sa) === stripQuotes(sb)) {
            return true;
        }
    }
    const num = (v) => typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
    const na = num(a);
    const nb = num(b);
    return Number.isFinite(na) && Number.isFinite(nb) && na === nb;
}
function tolerantDeepEquals(a, b) {
    if (tolerantLeafEquals(a, b)) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((item, index) => tolerantDeepEquals(item, b[index]));
    }
    return false;
}
/**
 * `sql_keyword` golds carry the object word the schema's enum forbids ("CREATE TABLE" where the
 * enum says `CREATE`) — accept when the leading keyword agrees.
 */
function leadingKeyword(value) {
    const first = value.trim().split(/\s+/)[0] ?? "";
    return standardizeString(first);
}
function stringChecker(param, modelOutput, possibleAnswer, tolerant = false) {
    const standardizedModel = standardizeString(modelOutput);
    const standardizedPossible = possibleAnswer
        .filter((answer) => typeof answer === "string")
        .map(standardizeString);
    const rawCandidates = possibleAnswer.filter((answer) => typeof answer === "string");
    const accepted = standardizedPossible.includes(standardizedModel) ||
        (tolerant && rawCandidates.some((candidate) => leadingKeyword(candidate) === leadingKeyword(modelOutput)));
    if (!accepted) {
        return fail("value_error:string", `Invalid value for parameter '${param}': ${JSON.stringify(modelOutput)}. Expected one of ${JSON.stringify(possibleAnswer)}. Case insensitive.`);
    }
    return ok();
}
function listChecker(param, modelOutput, possibleAnswer, tolerant = false) {
    const standardizedModel = [...modelOutput].map((item) => (typeof item === "string" ? standardizeString(item) : item));
    const standardizedPossible = possibleAnswer.map((answer) => Array.isArray(answer)
        ? answer.map((item) => (typeof item === "string" ? standardizeString(item) : item))
        : answer);
    const accepted = tolerant
        ? standardizedPossible.some((candidate) => tolerantValuesEqual(modelOutput, candidate))
        : standardizedPossible.some((candidate) => pyEquals(candidate, standardizedModel));
    if (!accepted) {
        return fail("value_error:list/tuple", `Invalid value for parameter '${param}': ${JSON.stringify(modelOutput)}. Expected one of ${JSON.stringify(possibleAnswer)}.`);
    }
    return ok();
}
function standardizedValuesFor(values) {
    return values.map((item) => (typeof item === "string" ? standardizeString(item) : item));
}
function dictChecker(param, modelOutput, possibleAnswers) {
    let result = fail("dict_checker:unclear", `Could not match parameter '${param}' against any expected dictionary.`);
    for (const candidate of possibleAnswers) {
        if (candidate === "") {
            continue;
        }
        if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
            continue;
        }
        result = fail("dict_checker:unclear", `Could not match parameter '${param}' against any expected dictionary.`);
        const possibleAnswer = candidate;
        let flag = true;
        for (const [key, value] of Object.entries(modelOutput)) {
            if (!(key in possibleAnswer)) {
                result = fail("value_error:dict_key", `Unexpected dict key parameter: '${key}'.`);
                flag = false;
                break;
            }
            const standardizedValue = typeof value === "string" ? standardizeString(value) : value;
            const allowed = Array.isArray(possibleAnswer[key]) ? possibleAnswer[key] : [possibleAnswer[key]];
            const standardizedAllowed = standardizedValuesFor(allowed);
            if (!standardizedAllowed.some((item) => pyEquals(item, standardizedValue))) {
                result = fail("value_error:dict_value", `Invalid value for parameter '${key}': ${JSON.stringify(value)}. Expected one of ${JSON.stringify(standardizedAllowed)}.`);
                flag = false;
                break;
            }
        }
        if (!flag) {
            continue;
        }
        for (const [key, value] of Object.entries(possibleAnswer)) {
            const allowed = Array.isArray(value) ? value : [value];
            if (!(key in modelOutput) && !allowed.includes("")) {
                result = fail("value_error:dict_key", `Missing dict key parameter: '${key}'.`);
                flag = false;
                break;
            }
        }
        if (flag) {
            return ok();
        }
    }
    return result;
}
function listDictChecker(param, modelOutput, possibleAnswers) {
    let result = fail("list_dict_checker:unclear", `Could not match parameter '${param}' against any expected list of dictionaries.`);
    for (const candidate of possibleAnswers) {
        if (!Array.isArray(candidate)) {
            continue;
        }
        let flag = true;
        if (modelOutput.length !== candidate.length) {
            result = fail("value_error:list_dict_count", "Wrong number of dictionaries in the list.");
            continue;
        }
        for (let index = 0; index < modelOutput.length; index += 1) {
            const item = modelOutput[index];
            if (item === null || typeof item !== "object" || Array.isArray(item)) {
                result = fail("value_error:dict_value", `List element ${index} of parameter '${param}' is not a dictionary.`);
                flag = false;
                break;
            }
            const inner = dictChecker(param, item, [candidate[index]]);
            if (!inner.valid) {
                result = inner;
                flag = false;
                break;
            }
        }
        if (flag) {
            return ok();
        }
    }
    return result;
}
/**
 * Upstream converts an integer value to float when the schema expects `float`,
 * before type checking. In JavaScript both are numbers, so the conversion is
 * applied to the derived Python type instead of the value.
 */
function effectivePyType(value, expectedTypeDescription) {
    const actual = pyTypeOf(value);
    if (expectedTypeDescription === "float" && actual === "int") {
        return "float";
    }
    return actual;
}
function typeChecker(param, value, possibleAnswer, expectedTypeDescription, expectedTypeConverted, nestedTypeConverted) {
    const result = { valid: true, error: [], errorType: "type_error:simple", isVariable: false };
    let isVariable = false;
    const possibleAnswerType = getPossibleAnswerType(possibleAnswer);
    if (possibleAnswerType !== null && possibleAnswerType !== expectedTypeConverted) {
        isVariable = true;
    }
    const valueType = effectivePyType(value, expectedTypeDescription);
    if (valueType === expectedTypeConverted) {
        if (nestedTypeConverted === null) {
            result.isVariable = isVariable;
            return result;
        }
        for (const possibleAnswerItem of possibleAnswer) {
            let flag = true;
            if (Array.isArray(possibleAnswerItem) && Array.isArray(value)) {
                for (const valueItem of value) {
                    const inner = typeChecker(param, valueItem, possibleAnswerItem, String(nestedTypeConverted), nestedTypeConverted, null);
                    if (!inner.valid) {
                        flag = false;
                        break;
                    }
                }
            }
            if (flag) {
                return { valid: true, error: [], errorType: "", isVariable };
            }
        }
        result.valid = false;
        result.error = [
            `Nested type checking failed for parameter '${param}'. Expected outer type ${expectedTypeDescription} with inner type ${String(nestedTypeConverted)}. Parameter value: ${JSON.stringify(value)}.`
        ];
        result.errorType = "type_error:nested";
        // upstream does not return here — it falls through to the variable check
    }
    const possibleAnswerTypeFallback = getPossibleAnswerType(possibleAnswer);
    if (possibleAnswerTypeFallback !== null && valueType === possibleAnswerTypeFallback) {
        result.isVariable = true;
        return result;
    }
    result.valid = false;
    result.error.push(`Incorrect type for parameter '${param}'. Expected type ${expectedTypeDescription}, got ${pyTypeOf(value)}. Parameter value: ${JSON.stringify(value)}.`);
    result.errorType = "type_error:simple";
    return result;
}
// ---------------------------------------------------------------------------
// Function-level checkers
// ---------------------------------------------------------------------------
function findDescription(funcDescriptions, name) {
    if (Array.isArray(funcDescriptions)) {
        return funcDescriptions.find((description) => description.name === name);
    }
    return funcDescriptions;
}
/**
 * Upstream `simple_function_checker`: name + parameter + value match for a
 * single emitted call against a single ground-truth call.
 */
function simpleFunctionChecker(funcDescription, modelOutput, possibleAnswer, tolerant = false) {
    if (!funcDescription) {
        return fail("simple_function_checker:missing_description", "No function description for the expected call.");
    }
    const possibleAnswerParams = Object.values(possibleAnswer)[0];
    const funcName = funcDescription.name;
    const paramDetails = funcDescription.parameters.properties ?? {};
    const requiredParams = funcDescription.parameters.required ?? [];
    if (!(funcName in modelOutput)) {
        return fail("simple_function_checker:wrong_func_name", `Function name '${funcName}' not found in model output.`);
    }
    const modelParams = modelOutput[funcName];
    for (const param of requiredParams) {
        if (!(param in modelParams)) {
            return fail("simple_function_checker:missing_required", `Missing required parameter: '${param}'.`);
        }
    }
    for (const [param, rawValue] of Object.entries(modelParams)) {
        if (!(param in paramDetails) || !(param in possibleAnswerParams)) {
            return fail("simple_function_checker:unexpected_param", `Unexpected parameter: '${param}'.`);
        }
        const value = rawValue;
        const property = paramDetails[param];
        const expectedTypeDescription = property.type ?? "any";
        const expectedTypeConverted = SCHEMA_TYPE_TO_PY[expectedTypeDescription];
        if (!expectedTypeConverted) {
            return fail("type_error:unknown_schema_type", `Schema type '${expectedTypeDescription}' for parameter '${param}' is not supported.`);
        }
        let nestedTypeConverted = null;
        if (NESTED_TYPE_CHECK_LIST.has(expectedTypeDescription)) {
            const nestedType = property.items?.type;
            nestedTypeConverted = nestedType ? SCHEMA_TYPE_TO_PY[nestedType] ?? null : null;
        }
        const typeCheck = typeChecker(param, value, possibleAnswerParams[param], expectedTypeDescription, expectedTypeConverted, nestedTypeConverted);
        const isVariable = typeCheck.isVariable;
        if (!typeCheck.valid) {
            return typeCheck;
        }
        if (!isVariable) {
            if (expectedTypeConverted === "dict") {
                const result = dictChecker(param, value, possibleAnswerParams[param]);
                if (!result.valid) {
                    return result;
                }
                continue;
            }
            if (expectedTypeConverted === "list" && nestedTypeConverted === "dict") {
                const result = listDictChecker(param, value, possibleAnswerParams[param]);
                if (!result.valid) {
                    return result;
                }
                continue;
            }
            if (expectedTypeConverted === "str") {
                const result = stringChecker(param, value, possibleAnswerParams[param], tolerant);
                if (!result.valid) {
                    return result;
                }
                continue;
            }
            if (expectedTypeConverted === "list") {
                const result = listChecker(param, value, possibleAnswerParams[param], tolerant);
                if (!result.valid) {
                    return result;
                }
                continue;
            }
        }
        const contains = tolerant
            ? possibleAnswerParams[param].some((candidate) => tolerantValuesEqual(value, candidate))
            : pyContains(possibleAnswerParams[param], value);
        if (!contains) {
            return fail("value_error:others", `Invalid value for parameter '${param}': ${JSON.stringify(value)}. Expected one of ${JSON.stringify(possibleAnswerParams[param])}.`);
        }
    }
    for (const param of Object.keys(possibleAnswerParams)) {
        if (!(param in modelParams) && !possibleAnswerParams[param].includes("")) {
            return fail("simple_function_checker:missing_optional", `Optional parameter '${param}' not provided and not marked as optional.`);
        }
    }
    return ok();
}
/**
 * Upstream `parallel_function_checker_no_order`: order-insensitive, exact-count
 * matching. Each expected call consumes one distinct emitted call.
 */
function parallelFunctionCheckerNoOrder(funcDescriptions, modelOutput, possibleAnswers) {
    if (modelOutput.length !== possibleAnswers.length) {
        return fail("parallel_function_checker_no_order:wrong_count", `Wrong number of function calls: emitted ${modelOutput.length}, expected ${possibleAnswers.length}.`);
    }
    const matchedIndices = [];
    for (let index = 0; index < possibleAnswers.length; index += 1) {
        const expectedName = Object.keys(possibleAnswers[index])[0];
        const funcDescription = findDescription(funcDescriptions, expectedName);
        let result;
        for (let candidate = 0; candidate < modelOutput.length; candidate += 1) {
            if (matchedIndices.includes(candidate)) {
                continue;
            }
            result = simpleFunctionChecker(funcDescription, modelOutput[candidate], possibleAnswers[index]);
            if (result.valid) {
                matchedIndices.push(candidate);
                break;
            }
        }
        if (!result || !result.valid) {
            return fail("parallel_function_checker_no_order:cannot_find_match", `Could not match expected call '${expectedName}' against any remaining emitted call.${result && result.error[0] ? ` ${result.error[0]}` : ""}`);
        }
    }
    return ok();
}
/** Upstream `multiple_function_checker`: exactly one emitted call. */
function multipleFunctionChecker(funcDescriptions, modelOutput, possibleAnswers) {
    if (modelOutput.length !== possibleAnswers.length) {
        return fail("multiple_function_checker:wrong_count", `Wrong number of function calls: emitted ${modelOutput.length}, expected ${possibleAnswers.length}.`);
    }
    const expectedName = Object.keys(possibleAnswers[0])[0];
    const funcDescription = findDescription(funcDescriptions, expectedName);
    return simpleFunctionChecker(funcDescription, modelOutput[0], possibleAnswers[0]);
}
/**
 * Upstream `ast_checker` dispatch. `testCategory` follows BFCL's rule of
 * matching on substrings, which is why `parallel_multiple` routes to the
 * order-insensitive parallel checker.
 */
function astChecker(funcDescriptions, modelOutput, possibleAnswers, testCategory) {
    if (testCategory.includes("parallel")) {
        return parallelFunctionCheckerNoOrder(funcDescriptions, modelOutput, possibleAnswers);
    }
    if (testCategory.includes("multiple")) {
        return multipleFunctionChecker(funcDescriptions, modelOutput, possibleAnswers);
    }
    if (modelOutput.length !== 1) {
        return fail("simple_function_checker:wrong_count", `Wrong number of functions: emitted ${modelOutput.length}, expected 1.`);
    }
    // `sql` golds are shape-inconsistent with the schema handed to the model (see tolerantValuesEqual).
    const tolerant = testCategory.includes("sql");
    return simpleFunctionChecker(funcDescriptions[0], modelOutput[0], possibleAnswers[0], tolerant);
}
/**
 * Irrelevance categories are graded by upstream's relevance handler: the model
 * passes only if it emitted no tool call.
 */
function checkIrrelevance(modelOutput) {
    if (modelOutput.length === 0) {
        return ok();
    }
    return fail("irrelevance_error:tool_call_emitted", `Expected no function call but the model emitted ${modelOutput.length}.`);
}
