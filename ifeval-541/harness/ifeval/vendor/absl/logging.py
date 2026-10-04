"""`absl.logging` API surface used by the vendored IFEval checkers.

Delegates to the Python standard library `logging` module.  stdlib `logging`
accepts the same `logger.error(msg, *args)` call shape with %-style
substitution that the upstream code uses, so the call sites stay verbatim.

Configured the same way as a plain stdlib logger: records at WARNING and above
reach stderr through logging's "last resort" handler unless the embedding
harness configures logging itself.  That mirrors upstream behaviour (absl also
writes those messages to stderr) and keeps the messages visible in the
subprocess stderr tail captured by the pack executor.
"""

import logging as _stdlib_logging

debug = _stdlib_logging.debug
info = _stdlib_logging.info
warning = _stdlib_logging.warning
warn = _stdlib_logging.warning
error = _stdlib_logging.error
exception = _stdlib_logging.exception
critical = _stdlib_logging.critical
fatal = _stdlib_logging.fatal
log = _stdlib_logging.log

__all__ = [
    "debug",
    "info",
    "warning",
    "warn",
    "error",
    "exception",
    "critical",
    "fatal",
    "log",
]
