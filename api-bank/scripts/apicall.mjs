/**
 * Tolerant parsers for the Python-flavoured call syntax used by the API-Bank
 * dataset (`[ApiName(key='value', list=['a', 'b'])]` and its `->{result}`
 * continuations). The dataset ships these as single-quoted Python reprs, so a
 * JSON parser alone is not enough.
 *
 * Everything here is pure and dependency-free; the generator and the fixture
 * checker both use it, and the same input always yields the same output.
 */

/** Parse a Python-ish literal (str / int / float / bool / None / list / dict). */
export function parsePyLiteral(text) {
  const parsed = parseValueAt(text, 0);
  return parsed ? parsed.value : undefined;
}

/** Parse a literal starting at `pos`; returns { value, end } or null. */
export function parseValueAt(text, pos) {
  let i = pos;
  const skipWs = () => {
    while (i < text.length && /\s/.test(text[i])) i += 1;
  };

  const parseString = () => {
    const quote = text[i];
    i += 1;
    let out = "";
    while (i < text.length) {
      const c = text[i];
      if (c === "\\") {
        const next = text[i + 1];
        i += 2;
        if (next === "n") out += "\n";
        else if (next === "t") out += "\t";
        else if (next === "r") out += "\r";
        else if (next === undefined) out += "\\";
        else out += next;
        continue;
      }
      if (c === quote) {
        i += 1;
        return out;
      }
      out += c;
      i += 1;
    }
    return out;
  };

  const parseNumberOrWord = () => {
    const numberMatch = /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(text.slice(i));
    if (numberMatch) {
      i += numberMatch[0].length;
      return /[.eE]/.test(numberMatch[0]) ? Number.parseFloat(numberMatch[0]) : Number.parseInt(numberMatch[0], 10);
    }
    const wordMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(text.slice(i));
    if (!wordMatch) {
      return undefined;
    }
    i += wordMatch[0].length;
    if (wordMatch[0] === "True") return true;
    if (wordMatch[0] === "False") return false;
    if (wordMatch[0] === "None" || wordMatch[0] === "null") return null;
    return wordMatch[0];
  };

  const parseList = () => {
    i += 1; // [
    const items = [];
    skipWs();
    if (text[i] === "]") {
      i += 1;
      return items;
    }
    for (;;) {
      const item = parseValueAt(text, i);
      if (!item) return items;
      items.push(item.value);
      i = item.end;
      skipWs();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "]") {
        i += 1;
        return items;
      }
      return items;
    }
  };

  const parseDict = () => {
    i += 1; // {
    const obj = {};
    skipWs();
    if (text[i] === "}") {
      i += 1;
      return obj;
    }
    for (;;) {
      const key = parseValueAt(text, i);
      if (!key) return obj;
      i = key.end;
      skipWs();
      if (text[i] !== ":") return obj;
      i += 1;
      const value = parseValueAt(text, i);
      if (!value) return obj;
      obj[String(key.value)] = value.value;
      i = value.end;
      skipWs();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "}") {
        i += 1;
        return obj;
      }
      return obj;
    }
  };

  skipWs();
  const c = text[i];
  if (c === "'" || c === '"') {
    const value = parseString();
    return { value, end: i };
  }
  if (c === "[") {
    const value = parseList();
    return { value, end: i };
  }
  if (c === "{") {
    const value = parseDict();
    return { value, end: i };
  }
  const scalar = parseNumberOrWord();
  return scalar === undefined ? null : { value: scalar, end: i };
}

/** Split a parameter list on top-level commas (quotes and brackets respected). */
export function splitTopLevel(text, separator = ",") {
  const parts = [];
  let current = "";
  let depth = 0;
  let quote = null;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quote) {
      current += c;
      if (c === "\\") {
        current += text[i + 1] ?? "";
        i += 1;
      } else if (c === quote) {
        quote = null;
      }
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      current += c;
      continue;
    }
    if (c === "[" || c === "{" || c === "(") depth += 1;
    else if (c === "]" || c === "}" || c === ")") depth -= 1;
    if (c === separator && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += c;
  }
  if (current.trim() !== "") {
    parts.push(current);
  }
  return parts;
}

/** Parse `key=value, key2=value2` into an object. */
export function parseArgList(text) {
  const args = {};
  for (const part of splitTopLevel(text, ",")) {
    const eq = findTopLevelEquals(part);
    if (eq < 0) continue;
    const key = part.slice(0, eq).trim();
    const raw = part.slice(eq + 1).trim();
    if (key === "") continue;
    args[key] = parsePyLiteral(raw);
  }
  return args;
}

function findTopLevelEquals(text) {
  let depth = 0;
  let quote = null;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quote) {
      if (c === "\\") {
        i += 1;
      } else if (c === quote) {
        quote = null;
      }
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      continue;
    }
    if (c === "[" || c === "{" || c === "(") depth += 1;
    else if (c === "]" || c === "}" || c === ")") depth -= 1;
    else if (c === "=" && depth === 0) return i;
  }
  return -1;
}

/** Scan one `[Name(args)]` call starting at `text[start] === "["`. */
function scanCallAt(text, start) {
  if (text[start] !== "[") return null;
  const nameMatch = /^\[(\w+)\(/.exec(text.slice(start));
  if (!nameMatch) return null;
  const name = nameMatch[1];
  let i = start + nameMatch[0].length;
  const argsStart = i;
  let depth = 1;
  let quote = null;
  while (i < text.length) {
    const c = text[i];
    if (quote) {
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i += 1;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      i += 1;
      continue;
    }
    if (c === "(") depth += 1;
    else if (c === ")") {
      depth -= 1;
      if (depth === 0) {
        const argsText = text.slice(argsStart, i);
        i += 1;
        if (text[i] === "]") i += 1;
        return { name, argsText, end: i };
      }
    }
    i += 1;
  }
  return null;
}

/** Parse the first API call in a string: `[Name(k='v')]` -> { name, args }. */
export function parseApiCallText(text) {
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== "[") continue;
    const call = scanCallAt(text, i);
    if (call) {
      return { name: call.name, args: parseArgList(call.argsText) };
    }
  }
  return null;
}

/** All `[Name(args)]` calls in a string, in order. */
export function extractCalls(text) {
  const calls = [];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== "[") continue;
    const call = scanCallAt(text, i);
    if (call) {
      calls.push({ name: call.name, args: parseArgList(call.argsText), end: call.end });
      i = call.end - 1;
    }
  }
  return calls;
}

/** All `[Name(args)]->RESULT` pairs in a string (API-Bank's step continuations). */
export function extractArrowResults(text) {
  const results = [];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== "[") continue;
    const call = scanCallAt(text, i);
    if (!call) continue;
    i = call.end - 1;
    if (text.slice(call.end, call.end + 2) !== "->") continue;
    const parsed = parseValueAt(text, call.end + 2);
    if (!parsed) continue;
    results.push({ name: call.name, args: parseArgList(call.argsText), output: parsed.value });
    i = parsed.end - 1;
  }
  return results;
}

/** Normalize a dataset API card into the pack's ApiDef shape. */
export function normalizeCard(card) {
  if (!card || typeof card !== "object" || typeof card.name !== "string") {
    return null;
  }
  return {
    name: card.name,
    description: typeof card.description === "string" ? card.description : "",
    parameters: normalizeParams(card.input_parameters ?? card.parameters),
    outputs: normalizeParams(card.output_parameters ?? card.response)
  };
}

function normalizeParams(record) {
  const out = {};
  if (!record || typeof record !== "object") {
    return out;
  }
  for (const [name, raw] of Object.entries(record)) {
    const param = raw && typeof raw === "object" ? raw : {};
    out[name] = {
      type: typeof param.type === "string" ? param.type : "str",
      description: typeof param.description === "string" ? param.description : ""
    };
  }
  return out;
}

/** Extract JSON API cards from a level-1/level-2 instruction block. */
export function extractInstructionCards(instruction) {
  const marker = instruction.indexOf("API descriptions:");
  const body = marker >= 0 ? instruction.slice(marker + "API descriptions:".length) : instruction;
  const cards = [];
  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    try {
      const card = JSON.parse(trimmed);
      const normalized = normalizeCard(card);
      if (normalized) cards.push(normalized);
    } catch {
      // not a JSON card line — ignore
    }
  }
  return cards;
}
