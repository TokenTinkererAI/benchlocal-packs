# coding=utf-8
"""Vendored copy of Google Research's `instruction_following_eval` package.

Source: https://github.com/google-research/google-research/tree/master/instruction_following_eval
License: Apache-2.0 (see LICENSE in this directory).

The four modules below are vendored byte-for-byte from upstream (verified by
sha256, see UPSTREAM.md); no upstream line was edited. Their third-party
imports are satisfied by the stdlib-backed shims and the vendored pure-Python
packages in `../vendor/`, which the harness puts on sys.path before importing:

  * `absl`         -> `../vendor/absl`         (shim over stdlib logging)
  * `nltk`         -> `../vendor/nltk`         (shim: regex tokenizers)
  * `langdetect`   -> `../vendor/langdetect`   (vendored upstream package)
  * `immutabledict`-> `../vendor/immutabledict` (vendored upstream package)

See METHODOLOGY.md ("Checker strategy") for the exact substitution list.
"""
