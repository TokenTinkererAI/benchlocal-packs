/**
 * Test oracle: synthesises an acceptable tool call from a scenario's ground
 * truth. Used by the mock server (to answer "correctly") and by the fixture
 * checks (to assert every scenario is passable).
 *
 * The ground truth stores, per parameter, a list of acceptable values. For
 * dictionary-valued parameters each key maps to its own list of acceptable
 * values (matching upstream's `dict_checker`), so the structure is unwrapped
 * recursively rather than emitted verbatim.
 *
 * Three upstream data shapes shape the synthesis:
 *   - The emitted function name is the scenario's schema name (upstream pairs
 *     the ground-truth call with the function description by name; most
 *     ground-truth keys equal it, a few upstream `simple` entries do not).
 *   - Only parameters the matched function document declares are emitted
 *     (a few upstream ground-truth entries constrain a parameter the schema
 *     does not expose; a model can only emit declared parameters).
 *   - The `simple`/`sql`/`multiple` checkers accept exactly one call, so only
 *     the first ground-truth call is emitted for those categories.
 */

function isDict(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function materializeAllowed(list) {
  if (!Array.isArray(list)) {
    return materializeValue(list);
  }
  const first = list.find((value) => value !== "");
  return first === undefined ? undefined : materializeValue(first);
}

function materializeValue(value) {
  if (isDict(value)) {
    const out = {};
    for (const [key, allowed] of Object.entries(value)) {
      const picked = materializeAllowed(allowed);
      if (picked !== undefined) {
        out[key] = picked;
      }
    }
    return out;
  }
  if (Array.isArray(value)) {
    return value.map((item) => (isDict(item) ? materializeValue(item) : item));
  }
  return value;
}

/** Returns the acceptable call set: `[{ name, args, arguments }]`. */
export function synthesiseGoldCalls(scenario) {
  const byName = new Map(scenario.functions.map((fn) => [fn.name, fn]));
  const ordered = scenario.category.includes("parallel") ? scenario.gold : scenario.gold.slice(0, 1);

  return ordered.map((call) => {
    const [goldKey, params] = Object.entries(call)[0];
    const doc = byName.get(goldKey) ?? scenario.functions[0];
    const name = doc.name;
    const declared = doc.parameters?.properties ?? {};
    const args = {};
    for (const [param, allowed] of Object.entries(params)) {
      if (!(param in declared)) {
        continue;
      }
      const picked = materializeAllowed(allowed);
      if (picked !== undefined) {
        args[param] = picked;
      }
    }
    return { name, args, arguments: JSON.stringify(args) };
  });
}
