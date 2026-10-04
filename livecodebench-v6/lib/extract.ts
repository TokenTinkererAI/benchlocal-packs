/**
 * Code extraction for LiveCodeBench-v6.
 *
 * Mirrors lcb_runner's extract_code for chat models verbatim: collect lines
 * containing "```"; fewer than two fence lines means no code (""); otherwise
 * the content between the LAST two fence lines is returned. No fence-less
 * fallback, no trimming - exactly the official rule, so verdicts line up
 * with the upstream harness.
 */
export type ExtractResult = {
  code: string;
  notes: string[];
};

export function extractCode(rawText: string): ExtractResult {
  const notes: string[] = [];
  const text = rawText.replace(/\r\n/g, "\n");

  if (text.trim() === "") {
    return { code: "", notes: ["empty response"] };
  }

  const lines = text.split("\n");
  const fenceLines: number[] = [];
  lines.forEach((line, index) => {
    if (line.includes("```")) {
      fenceLines.push(index);
    }
  });

  if (fenceLines.length < 2) {
    notes.push(`no fenced block found (${fenceLines.length} fence line(s))`);
    return { code: "", notes };
  }

  const start = fenceLines[fenceLines.length - 2] + 1;
  const end = fenceLines[fenceLines.length - 1];
  const code = lines.slice(start, end).join("\n");
  notes.push(`extracted last fenced block (${fenceLines.length} fence lines, official rule)`);

  if (code.trim() === "") {
    notes.push("fenced block is empty");
  }

  return { code, notes };
}
