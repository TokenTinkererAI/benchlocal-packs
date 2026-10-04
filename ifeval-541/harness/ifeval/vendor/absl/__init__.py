"""Minimal `absl` shim so vendored upstream code can run without absl-py.

The vendored IFEval checker code (`instruction_following_eval/instructions.py`)
uses exactly one absl API: `from absl import logging` followed by
`logging.error("... %s ... %s", value, e)` in the exception paths of the
language-detection checks.

This shim delegates those calls to the Python standard library `logging`
module, whose `error()/warning()/info()/debug()` signatures and %-style
message formatting are compatible with the calls upstream makes.  This is a
substitution (absl-py is NOT vendored) and is listed in METHODOLOGY.md.
"""

from . import logging

__all__ = ["logging"]
