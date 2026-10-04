"""Stdlib-backed shim for the `nltk` API surface used by IFEval's checkers.

This is NOT the real NLTK: it exists so the vendored upstream checker code can
run with zero pip installs and zero runtime downloads (NLTK's `punkt` sentence
model is normally fetched at runtime with `nltk.download`).  Every behaviour
implemented here is a documented substitution listed in METHODOLOGY.md.

API surface required by `instruction_following_eval/`:

  * `nltk.tokenize.RegexpTokenizer(pattern).tokenize(text)`
      -> `re.findall(pattern, text)`  (identical to NLTK's implementation of
         RegexpTokenizer, so `count_words` is unchanged in behaviour)

  * `nltk.data.load("nltk:tokenizers/punkt/english.pickle").tokenize(text)`
      -> lazy call into `instructions_util.split_into_sentences(text)`, which
         is upstream's own regex-based sentence splitter (vendored, verbatim).
         This replaces the statistical Punkt model (and its downloaded data)
         with a regex splitter; see METHODOLOGY.md for the exact delta.

  * `nltk.word_tokenize(text)`
      -> whitespace-delimited tokens.  Used only by
         `CapitalWordFrequencyChecker` to filter words with `.isupper()`; the
         divergence from NLTK's Treebank tokenizer is limited to tokens that
         mix case with apostrophes (e.g. `DON'T` counts once instead of twice).
"""

import re
import sys

__all__ = ["tokenize", "data", "word_tokenize"]

_SUBSTITUTION_NOTE = (
    "[ifeval-vendor] nltk shim in use: RegexpTokenizer=re.findall, "
    "data.load(punkt)=instructions_util.split_into_sentences, "
    "word_tokenize=whitespace split (see METHODOLOGY.md)\n"
)

_noted = False


def _note_once():
    global _noted
    if not _noted:
        _noted = True
        sys.stderr.write(_SUBSTITUTION_NOTE)
        sys.stderr.flush()


class RegexpTokenizer:
    """Same contract as `nltk.tokenize.RegexpTokenizer` for regex patterns."""

    def __init__(self, pattern):
        self._pattern = re.compile(pattern)

    def tokenize(self, text):
        return self._pattern.findall(text)


class _RegexSentenceTokenizer:
    """Stands in for NLTK's Punkt `PunktSentenceTokenizer` tokenize() call."""

    def tokenize(self, text):
        _note_once()
        from instruction_following_eval import instructions_util

        return instructions_util.split_into_sentences(text)


class _DataLoader:
    """Stands in for `nltk.data.load`; ignores the resource path."""

    def load(self, path, *args, **kwargs):
        _note_once()
        return _RegexSentenceTokenizer()


def word_tokenize(text, *args, **kwargs):
    """Whitespace tokenization (substitute for NLTK's Treebank tokenizer)."""
    _note_once()
    return [token for token in re.split(r"\s+", text) if token]


tokenize = type(sys)("nltk.tokenize")
tokenize.RegexpTokenizer = RegexpTokenizer
tokenize.word_tokenize = word_tokenize

data = _DataLoader()
