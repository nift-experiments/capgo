# Clean checkout reproduction

Verified revision `2f8dae1a` in an independent clone with no copied dependencies, public output, or generated caches. All 1,347 routes / 3,876 files passed parity, with zero introduced issues and zero semantic differences. All 1,347 parsed heads were byte identical. Raw evidence is in `evidence/clean-checkout/`.

Tested tools: Nift 4.6.0, Node 22.22.1, npm; MDX package commit `22bb53653f47c22defff863e3465e8df9a11da99`. Nift build threads remain `-1`. Project and renderer dependency versions are pinned in their lockfiles; globally installed MDX packages were explicitly excluded with `env -u MDX_NODE_MODULES`.

From a fresh clone:

```sh
npm ci --ignore-scripts --no-audit --no-fund
nift install
npm ci --ignore-scripts --no-audit --no-fund --prefix .nift/packages/mdx/renderer
env -u MDX_NODE_MODULES node .nift/packages/mdx/renderer/dependencies.mjs --check
env -u MDX_NODE_MODULES node tools/build.mjs --all
node tools/parity.mjs
node tools/verify-heads.mjs
git ls-files -z | node tools/audit-tracked-inputs.mjs --stdin
npm run preview
```

The tested npm installations additionally used `--offline`, resolving lockfile packages from the standard npm download cache. Online installations use the same lockfiles. Dependency acquisition is separate from build timing. Nift install requires access to the locked package repository.

The first `tools/build.mjs --all` initializes non-HTML assets from the committed reference and generates all source intermediates. Subsequent normal commands are `nift build --all` or `nift build`; normal preparation uses the authored corpus and committed data, without an external Astro checkout. The committed golden reference is needed for initial assets and validation, and is inside this repository.

Generated `build/faithful`, `.nift/mdx-prepared`, Nift hashes and locks are optional caches and are ignored. Removing 3,810 tracked generated state files was necessary to exercise a truly empty initial state. Six Nift configuration/package source files remain tracked. The audit confirms all 1,347 route wrappers and 7,775 distinct required source includes are tracked. The CLI `docs/cli/reference/build/` source directory is preserved by the rooted `/build/` ignore rule.

The clean first build measured 79.71 seconds and 652,656 KiB maximum RSS (637.4 MiB), including asset initialization and all intermediate generation, excluding installations and validation. This is one reproduction measurement, not the final repeated cold-cache benchmark. Maximum RSS is the GNU time process statistic, not summed concurrent resident memory.

The static preview binds localhost:4176. Original backend endpoints and external integrations have separate requirements; successful reproduction does not certify them. See `RUNTIME-INTEGRATIONS.md`.
