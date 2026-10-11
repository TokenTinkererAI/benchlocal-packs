"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
exports.normalizeKeyword = normalizeKeyword;
exports.isFreeTextParam = isFreeTextParam;
exports.valueMatches = valueMatches;
exports.callMatches = callMatches;
exports.gradeSequence = gradeSequence;
exports.formatCall = formatCall;
const DATE_LIKE = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/;
const TIME_LIKE = /^\d{1,2}:\d{2}(?::\d{2})?$/;
const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_LIKE = /^[a-z]+:\/\//i;
function normalizeText(value) {
    return value.normalize("NFC").replace(/\s+/g, " ").trim().toLowerCase();
}
/** Retrieval-keyword normalization: keep only alphanumerics, lowercased. */
function normalizeKeyword(value) {
    return value.normalize("NFC").toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function isNumericString(value) {
    return value.trim() !== "" && Number.isFinite(Number(value));
}
/**
 * A free-text parameter is prose the model is free to phrase itself: a string
 * of four or more whitespace-separated tokens that is not a date, time,
 * e-mail address, URL, or a retrieval keyword.
 */
function isFreeTextParam(paramName, value) {
    if (paramName === "keywords") {
        return false;
    }
    if (typeof value !== "string") {
        return false;
    }
    const trimmed = value.trim();
    if (DATE_LIKE.test(trimmed) || TIME_LIKE.test(trimmed) || EMAIL_LIKE.test(trimmed) || URL_LIKE.test(trimmed)) {
        return false;
    }
    return trimmed.split(/\s+/).length >= 4;
}
function scalarMatches(expected, actual) {
    if (typeof expected === "number" || typeof actual === "number") {
        const left = Number(expected);
        const right = Number(actual);
        if (Number.isFinite(left) && Number.isFinite(right)) {
            return left === right;
        }
    }
    if (typeof expected === "boolean" || typeof actual === "boolean") {
        return String(expected).toLowerCase() === String(actual).toLowerCase();
    }
    return normalizeText(String(expected)) === normalizeText(String(actual));
}
function listMatches(expected, actual) {
    if (expected.length !== actual.length) {
        return false;
    }
    const remaining = [...actual];
    for (const item of expected) {
        const index = remaining.findIndex((candidate) => valueMatches(item, candidate, ""));
        if (index < 0) {
            return false;
        }
        remaining.splice(index, 1);
    }
    return remaining.length === 0;
}
function valueMatches(expected, actual, paramName) {
    if (Array.isArray(expected) || Array.isArray(actual)) {
        if (!Array.isArray(expected) || !Array.isArray(actual)) {
            return false;
        }
        return listMatches(expected, actual);
    }
    if (paramName === "keywords") {
        if (typeof expected !== "string" || typeof actual !== "string") {
            return false;
        }
        const left = normalizeKeyword(expected);
        const right = normalizeKeyword(actual);
        if (left === "" || right === "") {
            return left === right;
        }
        return left === right || left.includes(right) || right.includes(left);
    }
    if (isFreeTextParam(paramName, expected)) {
        return typeof actual === "string" && actual.trim() !== "";
    }
    if (expected === null || expected === undefined) {
        return actual === null || actual === undefined || actual === "";
    }
    if (typeof expected === "object" || typeof actual === "object") {
        return JSON.stringify(expected) === JSON.stringify(actual);
    }
    if (isNumericString(String(expected)) && isNumericString(String(actual))) {
        return Number(expected) === Number(actual);
    }
    return scalarMatches(expected, actual);
}
/** Compare one executed call against one expected call. */
function callMatches(expected, actual) {
    if (actual.name !== expected.name) {
        return { ok: false, reason: `tool ${actual.name} != ${expected.name}` };
    }
    if (!actual.parsed) {
        return { ok: false, reason: `arguments were not valid JSON (${actual.error ?? "parse error"})` };
    }
    const expectedKeys = Object.keys(expected.args).sort();
    const actualKeys = Object.keys(actual.args).sort();
    if (expectedKeys.length !== actualKeys.length || expectedKeys.some((key, index) => key !== actualKeys[index])) {
        return {
            ok: false,
            reason: `argument keys [${actualKeys.join(", ")}] != [${expectedKeys.join(", ")}]`
        };
    }
    for (const key of expectedKeys) {
        if (!valueMatches(expected.args[key], actual.args[key], key)) {
            const shown = JSON.stringify(actual.args[key]);
            return { ok: false, reason: `argument ${key}=${shown} does not match the expected value` };
        }
    }
    return { ok: true, reason: "ok" };
}
/** Grade a whole executed call sequence against the expected sequence. */
function gradeSequence(expected, actual) {
    const base = { matchedCalls: 0, expectedCount: expected.length, actualCount: actual.length };
    if (actual.length === 0) {
        return { ...base, passed: false, reason: "no tool call was produced" };
    }
    if (actual.length !== expected.length) {
        const matched = countLeadingMatches(expected, actual);
        return {
            ...base,
            matchedCalls: matched,
            passed: false,
            reason: `called ${actual.length} API(s), expected ${expected.length}`
        };
    }
    for (let index = 0; index < expected.length; index += 1) {
        const match = callMatches(expected[index], actual[index]);
        if (!match.ok) {
            return {
                ...base,
                matchedCalls: index,
                passed: false,
                reason: `call ${index + 1}/${expected.length}: ${match.reason}`
            };
        }
    }
    return { ...base, matchedCalls: expected.length, passed: true, reason: "exact sequence match" };
}
function countLeadingMatches(expected, actual) {
    const limit = Math.min(expected.length, actual.length);
    let index = 0;
    while (index < limit && callMatches(expected[index], actual[index]).ok) {
        index += 1;
    }
    return index;
}
/** Human-readable one-line rendering of a call, used in logs and summaries. */
function formatCall(call) {
    const parts = Object.keys(call.args)
        .sort()
        .map((key) => `${key}=${JSON.stringify(call.args[key])}`);
    return `${call.name}(${parts.join(", ")})`;
}
