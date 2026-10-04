"use strict";
/**
 * Textual answer normalization for MATH-500.
 *
 * Strip pipeline in the Minerva / LightEval `strip_string` tradition: the
 * prediction and the gold answer are rewritten into a canonical string form
 * and compared with `===`. Nothing is evaluated — no sympy, no math_verify,
 * no code execution — so mathematically equivalent answers written in
 * different forms ("0.5" vs "\frac{1}{2}", "one half", "x=5" vs "5" when the
 * glyphs differ) are NOT recognized. See METHODOLOGY.md for the full rule
 * list and the documented limits.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchBrace = matchBrace;
exports.stripString = stripString;
exports.answersMatch = answersMatch;
/**
 * Finds the index of the '}' that closes the '{' at `openIndex`, counting
 * nested braces and skipping backslash-escaped characters. Returns -1 when
 * the group never closes. Used for \boxed{...} and \text{...} groups alike.
 */
function matchBrace(text, openIndex) {
    if (text[openIndex] !== "{") {
        return -1;
    }
    let depth = 0;
    for (let i = openIndex; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === "\\") {
            i += 1;
            continue;
        }
        if (ch === "{") {
            depth += 1;
        }
        else if (ch === "}") {
            depth -= 1;
            if (depth === 0) {
                return i;
            }
        }
    }
    return -1;
}
/** Command names whose {…} argument is unwrapped (or dropped, for units). */
const UNWRAP_COMMANDS = ["\\text", "\\mbox"];
/**
 * Handles \text{…} and \mbox{…} groups, brace-matched so nested braces do not
 * derail the scan:
 *   - a group whose content starts with a space is a unit annotation
 *     ("\text{ cm}", "\text{ inches}") and is dropped entirely — the
 *     Minerva/LightEval unit rule;
 *   - any other group is unwrapped to its inner content
 *     ("\text{east}" -> "east", "\mbox{Evelyn}" -> "Evelyn").
 */
function unwrapTextGroups(input) {
    let text = input;
    for (const command of UNWRAP_COMMANDS) {
        let searchFrom = 0;
        for (;;) {
            const at = text.indexOf(command, searchFrom);
            if (at < 0) {
                break;
            }
            let brace = at + command.length;
            while (brace < text.length && text[brace] === " ") {
                brace += 1;
            }
            if (text[brace] !== "{") {
                searchFrom = at + command.length;
                continue;
            }
            const close = matchBrace(text, brace);
            if (close < 0) {
                searchFrom = at + command.length;
                continue;
            }
            const inner = text.slice(brace + 1, close);
            const replacement = inner.startsWith(" ") ? "" : unwrapTextGroups(inner);
            text = text.slice(0, at) + replacement + text.slice(close + 1);
            searchFrom = at + replacement.length;
        }
    }
    return text;
}
/**
 * \sqrt3 -> \sqrt{3} (a maximal digit run is braced; a single non-digit
 * character is braced as one argument). Already-braced roots are untouched.
 */
function fixSqrt(input) {
    let out = "";
    let i = 0;
    while (i < input.length) {
        if (input.startsWith("\\sqrt", i)) {
            out += "\\sqrt";
            i += "\\sqrt".length;
            if (input[i] === "{") {
                continue;
            }
            const digits = /^\d+/.exec(input.slice(i));
            if (digits) {
                out += `{${digits[0]}}`;
                i += digits[0].length;
            }
            else {
                const next = input[i] ?? "";
                out += `{${next}}`;
                i += 1;
            }
            continue;
        }
        out += input[i];
        i += 1;
    }
    return out;
}
/**
 * \frac12 -> \frac{1}{2}; \frac1{2} -> \frac{1}{2}. Already-braced fractions
 * are untouched (nested groups are copied verbatim).
 */
function fixFrac(input) {
    let out = "";
    let i = 0;
    while (i < input.length) {
        if (input.startsWith("\\frac", i)) {
            out += "\\frac";
            i += "\\frac".length;
            if (input[i] === "{") {
                continue;
            }
            const a = input[i] ?? "";
            if (a === "") {
                break;
            }
            const b = input[i + 1] ?? "";
            if (b === "" || b === "{") {
                out += `{${a}}`;
                i += 1;
                continue;
            }
            out += `{${a}}{${b}}`;
            i += 2;
            continue;
        }
        out += input[i];
        i += 1;
    }
    return out;
}
/** Removes thousands separators: a comma between digits followed by exactly three digits. */
function removeThousandsSeparators(input) {
    return input.replace(/(?<=\d),(?=\d{3}(?!\d))/g, "");
}
/**
 * The normalization pipeline. Applied identically to predictions and gold
 * answers; the two normalized strings are compared with `===`.
 */
function stripString(raw) {
    let s = raw.replace(/\r\n?/g, "\n");
    s = s.replace(/\\!/g, ""); // LaTeX negative thin space ("10,\!080")
    s = s.replace(/\\\\/g, "\\"); // LaTeX row separator
    s = s.replace(/\\left/g, "").replace(/\\right/g, "");
    s = s.replace(/\\dfrac/g, "\\frac").replace(/\\tfrac/g, "\\frac");
    s = unwrapTextGroups(s);
    s = s.replace(/\\\$/g, "").replace(/\$/g, "");
    s = s.replace(/\\%/g, "").replace(/%/g, "");
    s = s.replace(/\^\{\\circ\}/g, "").replace(/\^\\circ/g, "").replace(/\u00b0/g, "");
    s = s.replace(/ \./g, " 0.").replace(/\{\./g, "{0.");
    if (s.startsWith(".")) {
        s = `0${s}`;
    }
    s = s.replace(/\s+/g, "");
    const sides = s.split("=");
    if (sides.length === 2 && sides[0].length <= 2) {
        s = sides[1]; // "x=5" -> "5"
    }
    s = fixSqrt(s);
    s = fixFrac(s);
    s = removeThousandsSeparators(s);
    if (s.endsWith(".")) {
        s = s.slice(0, -1);
    }
    if (s.endsWith(".0")) {
        s = s.slice(0, -2);
    }
    return s;
}
/** True when the prediction and the gold answer normalize to the same string. */
function answersMatch(prediction, gold) {
    const normalizedPrediction = stripString(prediction);
    if (normalizedPrediction === "") {
        return false;
    }
    return normalizedPrediction === stripString(gold);
}
