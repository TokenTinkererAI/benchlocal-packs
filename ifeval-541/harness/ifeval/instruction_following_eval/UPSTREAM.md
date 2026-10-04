# Vendored upstream code — provenance

The four modules in this directory are vendored **byte-for-byte** from Google
Research's IFEval evaluation code. No upstream line was edited; the third-party
imports (`langdetect`, `immutabledict`, `nltk`, `absl.logging`) are satisfied by
the packages/shims in `../vendor/`, which the harness puts on `sys.path` before
importing this package (see `../grader.py` and `../../../run_problem.py`).

## Source

- Repository: <https://github.com/google-research/google-research>
- Directory: `instruction_following_eval/`
- Commit cloned for vendoring: `e49bbfe381c9c0e564b937f1c4e163a2273c65cc`
  (`git clone --depth 1 --filter=blob:none --sparse https://github.com/google-research/google-research`,
  then `git sparse-checkout set instruction_following_eval`)
- License: Apache-2.0 (`Copyright The Google Research Authors`) — see `LICENSE`
  in this directory.

## Byte-identity check

`git hash-object` of each vendored file equals the upstream git blob id:

| file | sha256 | upstream blob id | match |
| --- | --- | --- | --- |
| `instructions.py` | `60e086f5342a03ce8e18b64bbcccf86308f523c08aa826707a562150a52f3edf` | `0007359bd37c7b9c1d9557f8937cb6586d2788a7` | yes |
| `instructions_util.py` | `a73797261eee5bf447e279d82a2b700b1bdd3cb1193412dbab1270a85832bc6b` | `d50702400738df4378fe286c0090a416f9a172fa` | yes |
| `instructions_registry.py` | `ec92d72c264f6d906978613085db262356174300370a3fffe6fefd5969ce9cfc` | `6b42adcc4c8cc827810ab3efa8a06f02bb48c397` | yes |
| `evaluation_lib.py` | `35decc06000718487f44d7deafa6d3f48a8ec0886281edf40162c0265b7d248c` | `c87422822f9e1565ca7574ac0b3cee5389c9f44e` | yes |

`__init__.py` in this directory is new (the upstream directory is imported as
`instruction_following_eval` from the repository root; the vendored layout needs
an explicit package marker).

## Third-party imports and how they are satisfied

| upstream import | provided by | kind |
| --- | --- | --- |
| `langdetect` | `../vendor/langdetect` (langdetect 1.0.9, Apache-2.0) | vendored real package |
| `immutabledict` | `../vendor/immutabledict` (immutabledict 4.3.1, MIT) | vendored real package |
| `from absl import logging` | `../vendor/absl/logging.py` | shim over stdlib `logging` (substitution) |
| `nltk.tokenize.RegexpTokenizer` | `../vendor/nltk/__init__.py` | `re.findall(pattern, text)` — behaviourally identical (substitution) |
| `nltk.data.load("nltk:tokenizers/punkt/english.pickle")` | `../vendor/nltk/__init__.py` | delegates to upstream's own `instructions_util.split_into_sentences` (substitution) |
| `nltk.word_tokenize` | `../vendor/nltk/__init__.py` | whitespace tokenization (substitution) |

The substitution list and its measured impact are documented in
`METHODOLOGY.md` at the repository root.
