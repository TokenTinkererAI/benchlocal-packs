# Installing HumanEval+-164 into BenchLocal

This pack is a custom, **verifier-less table pack**: it runs entirely on the host and
needs **no Docker**. It is installed by registering this folder as a **local source** in BenchLocal — no archive, no URL install, no registry.

Requirements on the machine that runs the benchmark:

- BenchLocal (any version satisfying the manifest's `benchlocal.minVersion` 0.2.0)
- a local **Python 3.9+** reachable as `py -3`, `python`, or `python3`
  (override with `HUMANEVALPLUS164_PYTHON` if none of those is the one you want)
- no network access at run time (the harness runs subprocesses locally; only the
  model endpoint is contacted, by the app)

Disk/RAM note: the installed pack carries ~282 MB of test data. Most of that is
expectations for a handful of problems whose reference outputs are megabytes
long (`HumanEval/15`, `HumanEval/130`). Grading one problem loads one record;
the two largest cost roughly 0.3 s and a few hundred MB of peak RSS while the
harness holds the expectation, which is inherent to grading those problems.

---

## 1. Install (local source)

### Local source via `config.toml`

Installing from a folder is a `config.toml` edit — the host uses the working tree
in place, so the tree needs `node_modules` and a built `dist/`:

```toml
# ~/.benchlocal/config.toml
[benchpacks.humaneval-plus-164]
enabled = true
source = "local"
path = "<absolute path of this pack directory>"
version = "1.0.2"
```

Then:

```bash
cd /path/to/benchlocal-packs/humaneval-plus-164
npm install            # once
npm run build          # dist/ + dist-cli/
# restart BenchLocal (config.toml is read at startup) and confirm the pack is "ready"
```

Keep the block's `version` in sync with `benchlocal.pack.json` (or omit it). The
app reads `config.toml` at startup only, and a settings-save before that restart
can clobber a hand edit — restart first, then check the block survived.

---

## 2. Development and release loops

```bash
# rebuild the dataset from the vendored source (needs Python; ~1 min)
npm run build:dataset

# compile both outputs and typecheck
npm run build && npm run typecheck

# acceptance test: all 164 reference solutions + negative controls
npm run selftest

# prompt/extraction fixtures (model layer; needs dist-cli built)
node scripts/check-model-layer.mjs

# end-to-end against the mock endpoint (port 8107)
npm run mock                                            # terminal 1
node dist-cli/cli/run.js --base-url http://127.0.0.1:8107/v1 --model mock \
  --out results/mock.json                               # terminal 2

# package (strict) and record the hash
npm run pack
sha256sum results/humaneval-plus-164-1.0.1.tar.gz
```

Release checklist:

1. bump `version` in **both** `benchlocal.pack.json` and `package.json`
   (both are shipped, and a mismatch between them is confusing when diagnosing
   installs);
2. `npm run build:dataset` if the source data changed, then `npm run build`;
3. `npm run selftest` — must print `SELFTEST PASS: 164/164 canonical`; then
   `node scripts/check-model-layer.mjs` — must print `MODEL LAYER PASS (8 fixtures)`;
4. `npm run pack` (strict) and verify the member list and sha256 it prints;
5. reload BenchLocal and confirm the pack reports `ready` with 164 scenarios.

---

## 3. Troubleshooting

| symptom | cause / fix |
| --- | --- |
| `Python 3.9+ not found. Install Python or set HUMANEVALPLUS164_PYTHON to its path.` | no `py -3`/`python`/`python3` validated on the host. Install Python, or set the env var to a full path. The Microsoft Store stub is rejected automatically. |
| scenarios fail instantly with `execution harness error: no harness result found on stdout` | the Python that ran is too old or cannot import `harness/run_problem.py`; run it by hand: `py -3 harness/run_problem.py <spec.json>` to see the traceback. |
| a submission reports `timed out after 90000ms (execution cap)` | the submission hung inside a single C call; the watchdog cannot interrupt C code, so the process tree was killed. Raise `--exec-timeout-ms` only if you know the submission is legitimately slow. |
| a submission reports `per-test time limit (4s) exceeded` | EvalPlus's own per-test limit (`max(4s, 4× reference runtime)`) — the reference is far faster than the submission. |
| a problem fails with `find_zero` detail | `HumanEval/32` uses EvalPlus's polynomial oracle: any returned point where `|poly(xs, x)| ≤ 1e-4` passes; read §5 of METHODOLOGY. |
| the whole run is slow | the app runs one problem at a time; 164 problems at ~0.3 s of grading each plus model latency dominate. Reasoning models spend most of the wall clock in generation, not in grading. |
| mock endpoint will not start | port 8107 is taken (`netstat -ano \| grep 8107`); kill the previous mock or pass `--port`. |
