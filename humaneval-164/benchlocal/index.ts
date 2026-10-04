import {
  createHostHelpers,
  defineBenchPack,
  loadBenchPackManifest,
  requireScoredResults,
  type ProgressEmitter,
  type ScenarioResult,
  type ScenarioRunInput
} from "@benchlocal/sdk";

import { getScenarioCards, scoreModelResults } from "../lib/benchmark";
import { runScenarioForModel } from "../lib/orchestrator";
import { resolvePython } from "../lib/python";
import { getProblem } from "../lib/generated/problems";
import type { ModelSettings, PythonInterpreter } from "../lib/types";

const manifest = loadBenchPackManifest(__dirname);

export { manifest };

export default defineBenchPack({
  manifest,

  async listScenarios() {
    return getScenarioCards();
  },

  async prepare(context) {
    const helpers = createHostHelpers(context);
    const python: PythonInterpreter = await resolvePython();

    context.logger.info(
      `HumanEval-164 using ${python.display} (Python ${python.version ? python.version.join(".") : "unvalidated"}).`
    );

    return {
      async runScenario(input: ScenarioRunInput, emit: ProgressEmitter): Promise<ScenarioResult> {
        const problem = getProblem(input.scenario.id);
        if (!problem) {
          throw new Error(`Unknown scenario id "${input.scenario.id}".`);
        }

        const endpoint = helpers.getRequiredInferenceEndpoint(input.model.id);
        const generation = helpers.resolveGenerationRequest(input.generation);

        const settings: ModelSettings = {
          baseUrl: endpoint.baseUrl,
          authMode: endpoint.authMode,
          apiKey: endpoint.apiKey,
          model: endpoint.exposedModel,
          temperature: generation.temperature,
          topP: generation.top_p,
          maxTokens: generation.max_tokens,
          timeoutMs:
            typeof generation.request_timeout_seconds === "number"
              ? generation.request_timeout_seconds * 1000
              : undefined
        };

        return runScenarioForModel(settings, input.model.id, input.model.label, problem, emit, {
          python,
          signal: input.abortSignal
        });
      },

      async dispose() {}
    };
  },

  scoreModelResults(results) {
    return scoreModelResults(requireScoredResults(results));
  }
});
