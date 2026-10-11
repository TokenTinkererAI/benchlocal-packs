#!/usr/bin/env node
/**
 * Fixture checks for API-Bank: dataset parsing, call-sequence grading, tool-call
 * accumulation, the mock API layer, prompt/tool-schema shaping, dataset
 * integrity, and score aggregation. Runs against the built dist-cli output plus
 * the shared dataset parsers in scripts/apicall.mjs.
 *
 * Usage: npm run check:extraction   (builds the CLI first)
 */
import { createRequire } from "node:module";

import {
  extractArrowResults,
  extractInstructionCards,
  normalizeCard,
  parseApiCallText,
  parsePyLiteral,
  splitTopLevel
} from "./apicall.mjs";

const require = createRequire(import.meta.url);
const grade = require("../dist-cli/lib/grade.js");
const extract = require("../dist-cli/lib/extract.js");
const mockApi = require("../dist-cli/lib/mock-api.js");
const prompts = require("../dist-cli/lib/prompts.js");
const benchmark = require("../dist-cli/lib/benchmark.js");
const { SCENARIOS, API_DEFS } = require("../dist-cli/lib/generated/scenarios.js");

let failures = 0;
let checks = 0;

function check(name, actual, expected) {
  checks += 1;
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

function checkTrue(name, actual) {
  check(name, Boolean(actual), true);
}

// ---------------------------------------------------------------------------
// 1. Dataset syntax parsers (scripts/apicall.mjs)
// ---------------------------------------------------------------------------

check("py: string", parsePyLiteral("'hello'"), "hello");
check("py: double-quoted string", parsePyLiteral('"hello world"'), "hello world");
check("py: int", parsePyLiteral("42"), 42);
check("py: float", parsePyLiteral("0.5"), 0.5);
check("py: bool", parsePyLiteral("True"), true);
check("py: null", parsePyLiteral("None"), null);
check("py: list", parsePyLiteral("['a', 'b', 3]"), ["a", "b", 3]);
check("py: dict", parsePyLiteral("{'token': 'abc', 'n': 1}"), { token: "abc", n: 1 });
check("py: nested", parsePyLiteral("{'a': [1, 2], 'b': {'c': True}}"), { a: [1, 2], b: { c: true } });

check(
  "call: simple",
  parseApiCallText("API-Request: [ModifyRegistration(appointment_id='34567890', new_appointment_date='2023-03-26')]"),
  { name: "ModifyRegistration", args: { appointment_id: "34567890", new_appointment_date: "2023-03-26" } }
);
check(
  "call: list argument",
  parseApiCallText("[DeleteMeeting(attendees=['Mary', 'Peter'], meeting_topic='Board Meeting')]"),
  { name: "DeleteMeeting", args: { attendees: ["Mary", "Peter"], meeting_topic: "Board Meeting" } }
);
check("call: no call", parseApiCallText("there is no call here"), null);
check(
  "call: comma inside string",
  parseApiCallText("[EmailReminder(content='Hello, John.', recipient='a@b.com')]"),
  { name: "EmailReminder", args: { content: "Hello, John.", recipient: "a@b.com" } }
);

check("split: respects quotes", splitTopLevel("a=1, b='x, y', c=[1,2]", ","), ["a=1", " b='x, y'", " c=[1,2]"]);

const arrow = extractArrowResults("AI: ok\nAPI-Request: [GetUserToken(username='u', password='p')]->{'token': 'xyz'}\nAI: done");
check("arrow: one result", arrow.length, 1);
check("arrow: name", arrow[0]?.name, "GetUserToken");
check("arrow: args", arrow[0]?.args, { username: "u", password: "p" });
check("arrow: output", arrow[0]?.output, { token: "xyz" });

const card = normalizeCard({
  name: "QueryStock",
  description: "stocks",
  input_parameters: { stock_code: { type: "str", description: "code" } },
  output_parameters: { price: { type: "float", description: "price" } }
});
check("card: name", card?.name, "QueryStock");
check("card: parameters", card?.parameters.stock_code.type, "str");
check("card: outputs", card?.outputs.price.type, "float");

const instructionCards = extractInstructionCards(
  '\nAPI descriptions:\n{"name": "A", "description": "d", "input_parameters": {}, "output_parameters": {}}\n{"name": "B", "description": "e", "input_parameters": {"x": {"type": "str", "description": "y"}}, "output_parameters": {}}\n'
);
check("instruction: card count", instructionCards.length, 2);
check("instruction: names", instructionCards.map((entry) => entry.name), ["A", "B"]);

// ---------------------------------------------------------------------------
// 2. Grading normalization
// ---------------------------------------------------------------------------

check("norm: whitespace + case", grade.normalizeText("  Hello   World "), "hello world");
check("free-text: prose", grade.isFreeTextParam("content", "Meeting with the client will be held at Room 1."), true);
check("free-text: keywords excluded", grade.isFreeTextParam("keywords", "history October 6th"), false);
check("free-text: date excluded", grade.isFreeTextParam("time", "2023-03-26 14:00:00"), false);
check("free-text: email excluded", grade.isFreeTextParam("recipient", "john@example.com"), false);
check("free-text: short label", grade.isFreeTextParam("content", "Pay bills"), false);

check("value: case-insensitive", grade.valueMatches("John", "john", "user_name"), true);
check("value: numeric string vs number", grade.valueMatches("10", 10, "latitude"), true);
check("value: number equality", grade.valueMatches(10, 10.0, "temperature"), true);
check("value: list order-insensitive", grade.valueMatches(["Mary", "Peter"], ["Peter", "Mary"], "attendees"), true);
check("value: list mismatch", grade.valueMatches(["Mary", "Peter"], ["Mary"], "attendees"), false);
check("value: keyword camel-case", grade.valueMatches("QueryMeeting", "Query Meeting", "keywords"), true);
check("value: keyword substring", grade.valueMatches("history October 6th", "history October 6", "keywords"), true);
check("value: keyword wrong", grade.valueMatches("QueryMeeting", "EmailReminder", "keywords"), false);
check("value: free-text paraphrase", grade.valueMatches("Meeting will be held at Room 1.", "Please attend the meeting.", "content"), true);
check("value: free-text empty fails", grade.valueMatches("Meeting will be held at Room 1.", "  ", "content"), false);
check("value: strict date", grade.valueMatches("2023-03-26", "2023-03-27", "date"), false);
check("value: strict date case", grade.valueMatches("Dr. Lee", "dr. lee", "doctor"), true);

const expectedCall = { name: "GetUserToken", args: { username: "foo", password: "bar" } };
check("call: exact", grade.callMatches(expectedCall, { name: "GetUserToken", args: { username: "foo", password: "bar" }, parsed: true }).ok, true);
check("call: wrong name", grade.callMatches(expectedCall, { name: "Other", args: { username: "foo", password: "bar" }, parsed: true }).ok, false);
check("call: missing key", grade.callMatches(expectedCall, { name: "GetUserToken", args: { username: "foo" }, parsed: true }).ok, false);
check("call: extra key", grade.callMatches(expectedCall, { name: "GetUserToken", args: { username: "foo", password: "bar", x: 1 }, parsed: true }).ok, false);
check("call: unparsed arguments", grade.callMatches(expectedCall, { name: "GetUserToken", args: {}, parsed: false, error: "boom" }).ok, false);
check("call: wrong value", grade.callMatches(expectedCall, { name: "GetUserToken", args: { username: "foo", password: "nope" }, parsed: true }).ok, false);

const seq = [expectedCall, { name: "QueryBalance", args: { token: "t" } }];
check("seq: pass", grade.gradeSequence(seq, [
  { name: "GetUserToken", args: { username: "foo", password: "bar" }, parsed: true },
  { name: "QueryBalance", args: { token: "t" }, parsed: true }
]).passed, true);
check("seq: short", grade.gradeSequence(seq, [{ name: "GetUserToken", args: { username: "foo", password: "bar" }, parsed: true }]).passed, false);
check("seq: empty", grade.gradeSequence(seq, []).passed, false);
check("seq: empty reason", grade.gradeSequence(seq, []).reason, "no tool call was produced");
check("seq: order", grade.gradeSequence(seq, [
  { name: "QueryBalance", args: { token: "t" }, parsed: true },
  { name: "GetUserToken", args: { username: "foo", password: "bar" }, parsed: true }
]).passed, false);

// ---------------------------------------------------------------------------
// 3. Tool-call accumulation (streamed deltas + JSON fallback)
// ---------------------------------------------------------------------------

const acc = extract.createAccumulator();
extract.accumulateDelta(acc, { index: 0, id: "call_1", type: "function", function: { name: "QueryMeeting", arguments: "" } });
extract.accumulateDelta(acc, { index: 0, function: { arguments: '{"user_' } });
extract.accumulateDelta(acc, { index: 0, function: { arguments: 'name": "John"}' } });
const calls = extract.finalizeToolCalls(acc);
check("stream: one call", calls.length, 1);
check("stream: name", calls[0].name, "QueryMeeting");
check("stream: parsed args", extract.parseArguments(calls[0].argumentsRaw).args, { user_name: "John" });

const accParallel = extract.createAccumulator();
extract.accumulateDelta(accParallel, { index: 0, id: "a", function: { name: "Geocoding", arguments: "" } });
extract.accumulateDelta(accParallel, { index: 1, id: "b", function: { name: "GetWeatherForCoordinates", arguments: "" } });
extract.accumulateDelta(accParallel, { index: 0, function: { arguments: '{"address":"Tokyo"}' } });
extract.accumulateDelta(accParallel, { index: 1, function: { arguments: '{"latitude":"1","longitude":"2"}' } });
const parallel = extract.finalizeToolCalls(accParallel);
check("stream: parallel count", parallel.length, 2);
check("stream: parallel names", parallel.map((call) => call.name), ["Geocoding", "GetWeatherForCoordinates"]);

const accJson = extract.createAccumulator();
extract.accumulateMessageToolCalls(accJson, [
  { id: "x", type: "function", function: { name: "Calculator", arguments: '{"formula":"8*8"}' } }
]);
check("json fallback: name", extract.finalizeToolCalls(accJson)[0].name, "Calculator");
check("json fallback: args", extract.parseArguments(extract.finalizeToolCalls(accJson)[0].argumentsRaw).args, { formula: "8*8" });
check("args: empty string", extract.parseArguments("").args, {});
check("args: malformed", extract.parseArguments("{not json").ok, false);

// ---------------------------------------------------------------------------
// 4. Mock API layer
// ---------------------------------------------------------------------------

const l3 = SCENARIOS.find((scenario) => scenario.id === "L3/0");
// A search whose keywords match no recorded result exercises the live search path.
const searchResult = mockApi.executeCall(API_DEFS, l3, { id: "1", name: "ToolSearcher", args: { keywords: "zzz-unrecorded" }, parsed: true });
check("mock: tool search source", searchResult.source, "tool-search");
checkTrue("mock: tool search returns cards", Array.isArray(searchResult.output) && searchResult.output.length > 0);
check(
  "mock: reveal names",
  mockApi.revealedTools(l3, { id: "1", name: "ToolSearcher", args: {}, parsed: true }, [{ name: "QueryMeeting" }]).includes("QueryMeeting"),
  true
);
// A recorded ToolSearcher result is replayed verbatim and reveals its API too.
const recordedSearch = mockApi.executeCall(API_DEFS, l3, { id: "1b", name: "ToolSearcher", args: { keywords: "QueryMeeting" }, parsed: true });
check("mock: recorded tool search source", recordedSearch.source, "recorded");
check(
  "mock: recorded search reveals QueryMeeting",
  mockApi.revealedTools(l3, { id: "1b", name: "ToolSearcher", args: {}, parsed: true }, recordedSearch.output).includes("QueryMeeting"),
  true
);
check("mock: non-search reveals nothing", mockApi.revealedTools(l3, { id: "2", name: "QueryMeeting", args: { user_name: "John" }, parsed: true }, {}), []);

const l2 = SCENARIOS.find((scenario) => scenario.id === "L2/0");
const tokenCall = l2.expectedCalls.find((call) => call.name === "GetUserToken");
const tokenResult = mockApi.executeCall(API_DEFS, l2, { id: "3", name: "GetUserToken", args: tokenCall.args, parsed: true });
check("mock: recorded token result", tokenResult.source, "recorded");
checkTrue("mock: recorded token has a token field", tokenResult.output && typeof tokenResult.output.token === "string");

const unknownResult = mockApi.executeCall(API_DEFS, l2, { id: "4", name: "NotATool", args: {}, parsed: true });
checkTrue("mock: unknown api is flagged", JSON.stringify(unknownResult.output).includes("unknown API"));

// ---------------------------------------------------------------------------
// 5. Prompting + tool schemas
// ---------------------------------------------------------------------------

const l1 = SCENARIOS.find((scenario) => scenario.id === "L1/0");
const messages = prompts.buildMessages(l1);
check("prompt: two messages", messages.length, 2);
check("prompt: system role", messages[0].role, "system");
checkTrue("prompt: system carries scenario marker", messages[0].content.includes("Scenario: L1/0."));
check("prompt: user role", messages[1].role, "user");
checkTrue("prompt: user contains task", messages[1].content.includes(l1.task.slice(0, 40)));

const schemas = prompts.buildToolSchemas(API_DEFS, l1.toolNames);
check("tool schema: count", schemas.length, l1.toolNames.length);
check("tool schema: type", schemas[0].type, "function");
checkTrue("tool schema: object parameters", schemas[0].function.parameters.type === "object");

// ---------------------------------------------------------------------------
// 6. Dataset integrity
// ---------------------------------------------------------------------------

check("dataset: scenario count", SCENARIOS.length, 498);
const byLevel = SCENARIOS.reduce((acc, scenario) => {
  acc[scenario.level] = (acc[scenario.level] ?? 0) + 1;
  return acc;
}, {});
check("dataset: level counts", byLevel, { 1: 399, 2: 49, 3: 50 });

let expectedTotal = 0;
for (const scenario of SCENARIOS) expectedTotal += scenario.expectedCalls.length;
check("dataset: expected call total", expectedTotal, 399 + 119 + 245);

check(
  "dataset: every expected API is defined",
  SCENARIOS.every((scenario) => scenario.expectedCalls.every((call) => Boolean(API_DEFS[call.name]))),
  true
);
check(
  "dataset: every catalog API is defined",
  SCENARIOS.every((scenario) => scenario.toolNames.every((name) => Boolean(API_DEFS[name]))),
  true
);
check(
  "dataset: expected APIs are in the catalog",
  SCENARIOS.every((scenario) => scenario.expectedCalls.every((call) => scenario.toolNames.includes(call.name))),
  true
);
check(
  "dataset: retrieval scenarios start with ToolSearcher",
  SCENARIOS.every((scenario) => !scenario.requiresRetrieval || scenario.expectedCalls[0].name === "ToolSearcher"),
  true
);
check(
  "dataset: level 3 carries recorded results",
  SCENARIOS.filter((scenario) => scenario.level === 3).every((scenario) => scenario.mockOutputs.length > 0),
  true
);
check(
  "dataset: multi-call level 2 carries recorded results",
  SCENARIOS.filter((scenario) => scenario.level === 2 && scenario.expectedCalls.length >= 2).every(
    (scenario) => scenario.mockOutputs.length > 0
  ),
  true
);
check(
  "dataset: level 1 has no recorded results",
  SCENARIOS.filter((scenario) => scenario.level === 1).every((scenario) => scenario.mockOutputs.length === 0),
  true
);
check(
  "dataset: ids unique",
  new Set(SCENARIOS.map((scenario) => scenario.id)).size,
  SCENARIOS.length
);
check(
  "dataset: tasks non-empty",
  SCENARIOS.every((scenario) => scenario.task.trim().length > 0),
  true
);
checkTrue("dataset: ToolSearcher is defined", Boolean(API_DEFS.ToolSearcher));

// ---------------------------------------------------------------------------
// 7. Score aggregation
// ---------------------------------------------------------------------------

function synthetic(passed, total) {
  return SCENARIOS.slice(0, total).map((scenario, index) => ({
    scenarioId: scenario.id,
    status: index < passed ? "pass" : "fail",
    summary: "",
    rawLog: "",
    score: index < passed ? 1 : 0
  }));
}

const full = benchmark.scoreModelResults(synthetic(498, 498));
check("score: all pass points", full.totalScore, 100);
check("score: summary format", full.summary, "tool-call accuracy: 498/498 (100%) - 100 points.");
check("score: zero", benchmark.scoreModelResults(synthetic(0, 498)).totalScore, 0);
check("score: two-thirds", benchmark.scoreModelResults(synthetic(2, 3)).totalScore, 67);
check("score: categories are levels", benchmark.scoreModelResults(synthetic(498, 498)).categories.map((entry) => entry.id), ["level-1", "level-2", "level-3"]);

console.log("");
console.log(failures === 0 ? `PASS (${checks} checks)` : `${failures}/${checks} FAILED`);
process.exit(failures === 0 ? 0 : 1);
