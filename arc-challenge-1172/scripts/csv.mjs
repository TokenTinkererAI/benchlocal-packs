/**
 * Minimal RFC 4180 CSV parser (handles quoted fields, embedded commas,
 * escaped quotes, and newlines inside quotes). No dependencies.
 */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

export function parseCsvObjects(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) {
    return [];
  }
  const header = rows[0].map((name, index) => {
    const trimmed = name.trim();
    return index === 0 ? trimmed.replace(/^\uFEFF/, "") : trimmed;
  });
  return rows
    .slice(1)
    .filter((cells) => cells.length > 1 || (cells.length === 1 && cells[0].trim() !== ""))
    .map((cells) => {
      const record = {};
      header.forEach((key, index) => {
        record[key] = cells[index] ?? "";
      });
      return record;
    });
}
