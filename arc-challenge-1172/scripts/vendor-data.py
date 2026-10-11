#!/usr/bin/env python3
"""Vendor the ARC-Challenge test split into data/arc_challenge_test.csv.

This is the maintainer transform that produces the pack's vendored data file
from the pinned upstream parquet. It is NOT part of the pack build (the build
reads the vendored CSV); it exists so the vendored file can be re-derived and
checked. Requires pandas + pyarrow.

    py -3 scripts/vendor-data.py <path-to-test-00000-of-00001.parquet>

The transform is deterministic: the same parquet yields a byte-identical CSV
(LF line endings, RFC 4180 quoting, fixed column order, upstream row order).
"""
import csv
import hashlib
import pathlib
import sys

import pandas as pd

# Pinned upstream artifact: allenai/ai2_arc, revision
# 210d026faf9955653af8916fad021475a3f00453, config ARC-Challenge, split test.
EXPECTED_PARQUET_SHA256 = "62f03257e737aed263f55c6abf87c7bb0028a44a6bdd2a26eb1279eb42c1d1e9"
EXPECTED_ROWS = 1172

COLUMNS = [
    "id",
    "question",
    "option_1_label",
    "option_1_text",
    "option_2_label",
    "option_2_text",
    "option_3_label",
    "option_3_text",
    "option_4_label",
    "option_4_text",
    "option_5_label",
    "option_5_text",
    "answer_key",
]

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_PATH = ROOT / "data" / "arc_challenge_test.csv"


def sha256_of(path):
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


def main(argv):
    if len(argv) != 2:
        print("usage: py -3 scripts/vendor-data.py <parquet>", file=sys.stderr)
        return 2

    src = pathlib.Path(argv[1])
    actual = sha256_of(src)
    if actual != EXPECTED_PARQUET_SHA256:
        print(f"parquet sha256 mismatch: {actual}", file=sys.stderr)
        return 1

    frame = pd.read_parquet(src)
    if len(frame) != EXPECTED_ROWS:
        print(f"expected {EXPECTED_ROWS} rows, got {len(frame)}", file=sys.stderr)
        return 1

    rows = []
    for _, record in frame.iterrows():
        labels = [str(value) for value in record["choices"]["label"]]
        texts = [str(value) for value in record["choices"]["text"]]
        if len(labels) != len(texts) or not 3 <= len(labels) <= 5:
            print(f"unexpected choice shape for {record['id']}", file=sys.stderr)
            return 1
        row = {"id": str(record["id"]), "question": str(record["question"])}
        for index in range(5):
            row[f"option_{index + 1}_label"] = labels[index] if index < len(labels) else ""
            row[f"option_{index + 1}_text"] = texts[index] if index < len(texts) else ""
        row["answer_key"] = str(record["answerKey"])
        if row["answer_key"] not in labels:
            print(f"answer key not among choices for {record['id']}", file=sys.stderr)
            return 1
        rows.append(row)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=COLUMNS, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {OUT_PATH.relative_to(ROOT)} ({len(rows)} rows)")
    print(f"  parquet sha256: {actual}")
    print(f"  vendored sha256: {sha256_of(OUT_PATH)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
