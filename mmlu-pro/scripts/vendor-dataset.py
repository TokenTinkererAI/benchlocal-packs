#!/usr/bin/env python3
"""Vendor the MMLU-Pro evaluation (test) split into data/mmlu_pro.jsonl.

Source dataset: TIGER-Lab/MMLU-Pro (HuggingFace), revision
b189ec765aa7ed75c8acfea42df31fdae71f97be, file
data/test-00000-of-00001.parquet (12,032 rows; the `validation` split, 70 rows,
is used by upstream for few-shot exemplars only and is not vendored here).

The released parquet already carries the final option lists (the upstream
"N/A" placeholder options of the original release were removed before this
revision), so every row has between 3 and 10 real options. Fields are vendored
verbatim, in the dataset's own column order:

    question_id, question, options (3-10 strings), answer (letter "A"-"J"),
    answer_index (0-9), cot_content, category, src

Usage:
    py -3 scripts/vendor-dataset.py [--source DIR] [--out PATH]

Network is not used: run
`hf download TIGER-Lab/MMLU-Pro --repo-type dataset` first.

Run: npm run vendor:dataset
"""

from __future__ import annotations

import argparse
import collections
import hashlib
import json
import os
import sys

import pyarrow.parquet as pq

DATASET_ID = "TIGER-Lab/MMLU-Pro"
REVISION = "b189ec765aa7ed75c8acfea42df31fdae71f97be"
TEST_PARQUET = os.path.join("data", "test-00000-of-00001.parquet")
TEST_PARQUET_SHA256 = "0e24a191921c2f453518a537a8b2117bd137e7714d4ef1565e9ba06c1ecb9ad8"
EXPECTED_ROWS = 12032
FIELDS = [
    "question_id",
    "question",
    "options",
    "answer",
    "answer_index",
    "cot_content",
    "category",
    "src",
]

DEFAULT_SOURCE = os.path.join(
    os.path.expanduser("~"),
    ".cache",
    "huggingface",
    "hub",
    "datasets--TIGER-Lab--MMLU-Pro",
    "snapshots",
    REVISION,
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", default=DEFAULT_SOURCE, help="snapshot directory of the HF dataset")
    parser.add_argument("--out", default=os.path.join("data", "mmlu_pro.jsonl"), help="output JSONL path")
    args = parser.parse_args()

    source = os.path.abspath(args.source)
    if not os.path.isdir(source):
        print(f"error: source snapshot directory not found: {source}", file=sys.stderr)
        print("hint: hf download TIGER-Lab/MMLU-Pro --repo-type dataset", file=sys.stderr)
        return 1
    # The snapshot dir is named after the revision git-sha; pin it so a silently
    # re-downloaded newer revision cannot slip into the vendored file.
    if os.path.basename(source) != REVISION:
        print(f"error: snapshot dir '{os.path.basename(source)}' is not the pinned revision {REVISION}", file=sys.stderr)
        return 1

    parquet_path = os.path.join(source, TEST_PARQUET)
    if not os.path.isfile(parquet_path):
        print(f"error: test parquet not found: {parquet_path}", file=sys.stderr)
        return 1
    parquet_sha256 = hashlib.sha256(open(parquet_path, "rb").read()).hexdigest()
    if parquet_sha256 != TEST_PARQUET_SHA256:
        print(
            f"error: {TEST_PARQUET} sha256 mismatch (drifted source?):\n  expected {TEST_PARQUET_SHA256}\n  got      {parquet_sha256}",
            file=sys.stderr,
        )
        return 1

    table = pq.read_table(parquet_path)
    if table.column_names != FIELDS:
        print(f"error: unexpected columns: {table.column_names} (expected {FIELDS})", file=sys.stderr)
        return 1
    rows = table.to_pylist()
    if len(rows) != EXPECTED_ROWS:
        print(f"error: expected {EXPECTED_ROWS} test rows, found {len(rows)}", file=sys.stderr)
        return 1

    records = []
    question_ids = set()
    option_counts: collections.Counter[int] = collections.Counter()
    categories: collections.Counter[str] = collections.Counter()
    category_order: list[str] = []
    gold_letters: collections.Counter[str] = collections.Counter()

    for index, row in enumerate(rows):
        question_id = row["question_id"]
        if question_id in question_ids:
            print(f"error: duplicate question_id {question_id} at row {index}", file=sys.stderr)
            return 1
        question_ids.add(question_id)
        question = str(row["question"])
        if question.strip() == "":
            print(f"error: row {index} (id {question_id}): empty question", file=sys.stderr)
            return 1
        options = [str(option) for option in row["options"]]
        if not (3 <= len(options) <= 10):
            print(f"error: row {index} (id {question_id}): {len(options)} options (expected 3-10)", file=sys.stderr)
            return 1
        if any(option.strip() == "" for option in options):
            print(f"error: row {index} (id {question_id}): empty option text", file=sys.stderr)
            return 1
        answer_index = int(row["answer_index"])
        answer = str(row["answer"])
        if not (0 <= answer_index <= 9):
            print(f"error: row {index} (id {question_id}): answer_index {answer_index} out of range", file=sys.stderr)
            return 1
        if answer_index >= len(options):
            print(f"error: row {index} (id {question_id}): answer_index {answer_index} outside options", file=sys.stderr)
            return 1
        if "ABCDEFGHIJ"[answer_index] != answer:
            print(f"error: row {index} (id {question_id}): answer {answer} != answer_index {answer_index}", file=sys.stderr)
            return 1
        category = str(row["category"])
        if category.strip() == "":
            print(f"error: row {index} (id {question_id}): empty category", file=sys.stderr)
            return 1
        if category not in categories:
            category_order.append(category)

        option_counts[len(options)] += 1
        categories[category] += 1
        gold_letters[answer] += 1
        records.append({field: (int(row[field]) if field in ("question_id", "answer_index") else
                                (options if field == "options" else str(row[field]))) for field in FIELDS})

    if len(categories) != 14:
        print(f"error: expected 14 categories, found {len(categories)}", file=sys.stderr)
        return 1

    out_path = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8", newline="\n") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=False, separators=(",", ":")))
            handle.write("\n")

    raw = open(out_path, "rb").read()
    sha256 = hashlib.sha256(raw).hexdigest()

    print(f"source:        {DATASET_ID} @ {REVISION}")
    print(f"parquet sha256:{parquet_sha256}")
    print(f"rows:          {len(records)} -> {os.path.relpath(out_path, os.getcwd()).replace(os.sep, '/')}")
    print(f"sha256:        {sha256}")
    print(f"bytes:         {len(raw)}")
    print(f"option counts: {json.dumps(dict(sorted(option_counts.items())))}")
    print(f"categories:    {json.dumps(category_order)}")
    print(f"category rows: {json.dumps({c: categories[c] for c in category_order})}")
    print(f"gold letters:  {json.dumps({letter: gold_letters[letter] for letter in 'ABCDEFGHIJ'})}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
