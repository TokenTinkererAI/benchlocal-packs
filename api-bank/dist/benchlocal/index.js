"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const sdk_1 = require("@benchlocal/sdk");
const benchmark_1 = require("../lib/benchmark");
const orchestrator_1 = require("../lib/orchestrator");
const manifest = (0, sdk_1.loadBenchPackManifest)(__dirname);
exports.manifest = manifest;
exports.default = (0, sdk_1.defineBenchPack)({
    manifest,
    async listScenarios() {
        return (0, benchmark_1.getScenarioCards)();
    },
    async prepare(context) {
        const helpers = (0, sdk_1.createHostHelpers)(context);
        return {
            async runScenario(input, emit) {
                const scenario = (0, benchmark_1.getScenario)(input.scenario.id);
                if (!scenario) {
                    throw new Error(`Unknown scenario id "${input.scenario.id}".`);
                }
                const endpoint = helpers.getRequiredInferenceEndpoint(input.model.id);
                const generation = helpers.resolveGenerationRequest(input.generation);
                const settings = {
                    baseUrl: endpoint.baseUrl,
                    authMode: endpoint.authMode,
                    apiKey: endpoint.apiKey,
                    model: endpoint.exposedModel,
                    temperature: generation.temperature,
                    topP: generation.top_p,
                    maxTokens: generation.max_tokens,
                    timeoutMs: typeof generation.request_timeout_seconds === "number"
                        ? generation.request_timeout_seconds * 1000
                        : undefined
                };
                return (0, orchestrator_1.runScenarioForModel)(settings, input.model.id, input.model.label, scenario, benchmark_1.API_DEFS, emit, {
                    signal: input.abortSignal
                });
            },
            async dispose() { }
        };
    },
    scoreModelResults(results) {
        return (0, benchmark_1.scoreModelResults)((0, sdk_1.requireScoredResults)(results));
    }
});
