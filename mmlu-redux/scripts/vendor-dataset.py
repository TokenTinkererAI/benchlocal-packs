#!/usr/bin/env python3
"""Vendor the MMLU-Redux verified-correct evaluation subset into data/mmlu_redux.jsonl.

Source dataset: edinburgh-dawg/mmlu-redux-2.0 (HuggingFace, CC BY 4.0),
revision 372ea425445d51e1ba1188c56e5e893f8138621f.

The upstream release is stored as one Arrow file per MMLU subject
(`<subject>/data-00000-of-00001.arrow`, 100 reviewed questions each). Each row
carries the original cais/mmlu fields plus the MMLU-Redux re-annotation:

    question, choices (4 strings), answer (index 0-3), error_type, source,
    correct_answer, potential_reason

`error_type == "ok"` marks a question whose original MMLU label was verified
CORRECT by the MMLU-Redux annotators; every other value flags an annotated
defect (bad_question_clarity, bad_options_clarity, no_correct_answer,
multiple_correct_answers, wrong_groundtruth, expert). Only "ok" rows form the
canonical MMLU-Redux evaluation subset, and only those are vendored here.

The vendored file keeps the original fields verbatim (nulls preserved) and adds
two provenance columns:
    subject          - the MMLU subject / HF config the row came from
    recordId         - "<subject>#<n>", n = 1-based order within the subject
    sourceRowIndex   - 0-based row index inside the upstream Arrow file

Usage:
    py -3 scripts/vendor-dataset.py [--source DIR] [--out PATH]

Requires pyarrow. Network is not used: run
`hf download edinburgh-dawg/mmlu-redux-2.0 --repo-type dataset` first.

Run: npm run vendor:dataset
"""

from __future__ import annotations

import argparse
import collections
import hashlib
import json
import os
import sys

import pyarrow.ipc as ipc

DATASET_ID = "edinburgh-dawg/mmlu-redux-2.0"
REVISION = "372ea425445d51e1ba1188c56e5e893f8138621f"
VERIFIED_ERROR_TYPE = "ok"
EXPECTED_KEPT = 5330
EXPECTED_REVIEWED = 5700
EXPECTED_SUBJECTS = 57
ARROW_NAME = os.path.join("data-00000-of-00001.arrow")

DEFAULT_SOURCE = os.path.join(
    os.path.expanduser("~"),
    ".cache",
    "huggingface",
    "hub",
    "datasets--edinburgh-dawg--mmlu-redux-2.0",
    "snapshots",
    REVISION,
)

ORIGINAL_FIELDS = [
    "question",
    "choices",
    "answer",
    "error_type",
    "source",
    "correct_answer",
    "potential_reason",
]


def find_subjects(source: str) -> list[str]:
    subjects = []
    for name in sorted(os.listdir(source)):
        if os.path.isfile(os.path.join(source, name, ARROW_NAME)):
            subjects.append(name)
    return subjects


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", default=DEFAULT_SOURCE, help="snapshot directory of the HF dataset")
    parser.add_argument("--out", default=os.path.join("data", "mmlu_redux.jsonl"), help="output JSONL path")
    args = parser.parse_args()

    source = os.path.abspath(args.source)
    if not os.path.isdir(source):
        print(f"error: source snapshot directory not found: {source}", file=sys.stderr)
        print("hint: hf download edinburgh-dawg/mmlu-redux-2.0 --repo-type dataset", file=sys.stderr)
        return 1
    # The snapshot dir is named after the revision git-sha; pin it so a silently
    # re-downloaded newer revision cannot slip into the vendored file.
    if os.path.basename(source) != REVISION:
        print(
            f"error: snapshot dir '{os.path.basename(source)}' is not the pinned revision {REVISION}",
            file=sys.stderr,
        )
        return 1

    subjects = find_subjects(source)
    if len(subjects) != EXPECTED_SUBJECTS:
        print(f"error: expected {EXPECTED_SUBJECTS} subject directories, found {len(subjects)}", file=sys.stderr)
        return 1

    kept: list[dict] = []
    reviewed = 0
    error_types: collections.Counter[str] = collections.Counter()
    per_subject: dict[str, int] = {}

    for subject in subjects:
        table = ipc.open_stream(os.path.join(source, subject, ARROW_NAME)).read_all()
        rows = table.to_pylist()
        if len(rows) != 100:
            print(f"error: {subject}: expected 100 reviewed rows, found {len(rows)}", file=sys.stderr)
            return 1
        reviewed += len(rows)
        error_types.update(row["error_type"] for row in rows)
        count = 0
        for index, row in enumerate(rows):
            if row["error_type"] != VERIFIED_ERROR_TYPE:
                continue
            choices = [str(choice) for choice in row["choices"]]
            if len(choices) != 4:
                print(f"error: {subject}#{index}: expected 4 choices, found {len(choices)}", file=sys.stderr)
                return 1
            if not (0 <= int(row["answer"]) <= 3):
                print(f"error: {subject}#{index}: answer index out of range", file=sys.stderr)
                return 1
            count += 1
            record = {field: row[field] for field in ORIGINAL_FIELDS}
            record["choices"] = choices
            record["answer"] = int(row["answer"])
            record["subject"] = subject
            record["recordId"] = f"{subject}#{count}"
            record["sourceRowIndex"] = index
            kept.append(record)
        per_subject[subject] = count

    if reviewed != EXPECTED_REVIEWED:
        print(f"error: expected {EXPECTED_REVIEWED} reviewed rows, found {reviewed}", file=sys.stderr)
        return 1
    if len(kept) != EXPECTED_KEPT:
        print(f"error: expected {EXPECTED_KEPT} verified-correct rows, found {len(kept)}", file=sys.stderr)
        return 1

    out_path = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8", newline="\n") as handle:
        for record in kept:
            handle.write(json.dumps(record, ensure_ascii=False, separators=(",", ":")))
            handle.write("\n")

    raw = open(out_path, "rb").read()
    sha256 = hashlib.sha256(raw).hexdigest()

    excluded = {k: v for k, v in sorted(error_types.items()) if k != VERIFIED_ERROR_TYPE}
    print(f"source:        {DATASET_ID} @ {REVISION}")
    print(f"reviewed rows: {reviewed} across {len(subjects)} subjects")
    print(f"kept (ok):     {len(kept)}  -> {os.path.relpath(out_path, os.getcwd()).replace(os.sep, '/')}")
    print(f"excluded:      {sum(excluded.values())}  {json.dumps(excluded)}")
    print(f"per-subject ok rows: {json.dumps(per_subject)}")
    print(f"sha256:        {sha256}")
    print(f"bytes:         {len(raw)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
