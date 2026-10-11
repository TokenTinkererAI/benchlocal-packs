#!/usr/bin/env python3
"""
derive-dataset.py — provenance tool for the HMMT-Feb-2026 pack.

Downloads the pinned MathArena/hmmt_feb_2026 parquet, verifies its SHA-256, and
projects it into the vendored `data/hmmt_feb_2026.jsonl` (one JSON object per
line). The transform is deterministic, so re-running it against the same pinned
revision reproduces the vendored file byte-for-byte.

This script is NOT part of the pack build or run path (which is pure Node):
`scripts/generate-dataset.mjs` consumes the vendored jsonl and hash-pins it.
The script exists so the provenance chain (parquet -> jsonl) can be re-checked
by anyone. It requires pandas + pyarrow and network access.

Usage:
  py -3 scripts/derive-dataset.py [path/to/local.parquet]

Without an argument the pinned parquet is downloaded from Hugging Face.
"""
import hashlib
import io
import json
import os
import sys
import urllib.request

import pandas as pd

REVISION = "02fba4f74d8e68e73e66a02d540fd979c05c274c"
SOURCE_URL = (
    "https://huggingface.co/datasets/MathArena/hmmt_feb_2026/resolve/"
    f"{REVISION}/data/train-00000-of-00001.parquet"
)
EXPECTED_PARQUET_SHA256 = "e5fcff6b1c2262841c0c37bf6d7b42529f284528d5f0d5c45c52e8bf0654a916"
EXPECTED_ROWS = 33

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(ROOT, "data", "hmmt_feb_2026.jsonl")


def sha256_of(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_parquet_bytes() -> bytes:
    if len(sys.argv) > 1:
        with open(sys.argv[1], "rb") as handle:
            return handle.read()
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "curl/8"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def main() -> int:
    raw = load_parquet_bytes()
    parquet_sha = sha256_of(raw)
    if parquet_sha != EXPECTED_PARQUET_SHA256:
        print(f"FATAL: parquet sha256 mismatch: {parquet_sha}", file=sys.stderr)
        return 1

    df = pd.read_parquet(io.BytesIO(raw), engine="pyarrow")

    if len(df) != EXPECTED_ROWS:
        print(f"FATAL: expected {EXPECTED_ROWS} rows, got {len(df)}", file=sys.stderr)
        return 1

    records = []
    for _, row in df.iterrows():
        types = [str(t).strip() for t in list(row["problem_type"])]
        records.append(
            {
                "problem_idx": int(row["problem_idx"]),
                "problem": str(row["problem"]),
                "answer": str(row["answer"]),
                "problem_type": types,
            }
        )

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    text = "".join(json.dumps(record, ensure_ascii=False) + "\n" for record in records)
    with open(OUT_PATH, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(text)

    print(f"parquet sha256: {parquet_sha}")
    print(f"rows: {len(records)}")
    print(f"wrote: {os.path.relpath(OUT_PATH, ROOT)}")
    print(f"jsonl sha256: {sha256_of(text.encode('utf-8'))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
