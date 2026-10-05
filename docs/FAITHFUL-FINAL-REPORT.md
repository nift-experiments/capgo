# Faithful Capgo migration report

The captured English Capgo frontend is reproduced by a genuine source-backed Nift project. Its architecture is frozen, with the backend/runtime limitations below explicitly retained. This is not a recreation of Capgo's private console or all server services, nor a claim that every dependency has been replaced with Nift-native code.

Source closure revision: `7bb03eecc49e142367cb4451a3dcd6fcb4b18b4e`. Upstream: `Cap-go/website` at `7d5b69d6ba8a6630384dffc7d012431ee3ed22ec`, with AGPL attribution retained. Nift: installed 4.6.0; its source commit is not exposed by the executable. MDX package: `22bb53653f47c22defff863e3465e8df9a11da99`. Binary hash and complete environment are recorded in `evidence/final-benchmarks/methodology.json`.

## Source and route accounting

| Disjoint route group | Count |
|---|---:|
| Authored docs bodies | 529 |
| Published authored blog bodies | 514 |
| Authored plugin tutorial bodies | 149 |
| Authored marketing/legal bodies, including five supplemental templates | 98 |
| Source-backed listing layouts | 51 |
| Registry-only plugin landing routes | 2 |
| Compatibility redirect routes | 4 |
| Total HTML routes | 1,347 |

The first four rows are 1,290 source-connected authored bodies. The initial inventory was 1,285, followed by five supplemental bodies. Adding 51 listing layouts gives 1,341 source-backed rendered regions. Grids within listings are not extra pages. The initial 1,193 MD/MDX source-file inventory included an unpublished blog document and excluded marketing templates; it was never the output-route count. Historical 1,202 meant 529 docs plus 673 web bodies, as reconciled in `MIGRATION-ACCOUNTING.md`.

Docs retain familiar frontmatter and MD/MDX authoring; 519 MDX and ten Markdown docs are converted through the locked renderer. Blog Markdown uses pinned Satteri and explicit authored CTA adaptation; plugin tutorial Markdown uses pinned Marked. Marketing/component bodies use registered authored-source adapters. All normal source preparation is local and deterministic. No normal build requires the external Astro checkout.

## Metadata and output gates

All 1,343 content/listing/registry heads regenerate from authored or deterministically derived metadata. Four compatibility redirect heads intentionally remain reference artifacts. Actual upstream SEO props, blog/plugin schemas, Starlight metadata derivation and the Capgo Head override supply titles, descriptions, canonical/alternate URLs, OpenGraph/Twitter, dates/authors, robots and structured data. Metadata does not use a per-page frozen-value fallback. Retained resource links/compiler labels preserve frontend asset identity. See `METADATA-RECOVERY.md`.

The complete gate checks 1,347 routes and 3,876 files. It reports zero introduced issues, zero semantic differences and zero unexpected files. All 1,347 parsed heads are byte identical. There are 1,192 body-source byte differences accepted only with semantic equivalence (529 docs, 663 web). The reference already has 11,339 reported internal-link/anchor issues; those are preserved and separated from introduced issues.

A final visual check found one whitespace difference missed by trimmed-text comparison. The renderer now preserves whitespace at inline boundaries without treating JS ternary formatting as text. Literal, expression and ternary regression cases pass. Original styles and high-quality image assets are retained; no SVG/raster recreation or palette redesign was introduced.

## Retained implementation and residual limitations

Generated shell fragments, global production CSS, fonts/images, module bundles and browser controllers remain explicit retained dependencies. Shared Nift includes and 28 shared head templates recover repeated structure. Frozen artifacts are not counted as new authored bodies. Further optional extraction is stopped.

Build-time plans/credits/rankings use hash-recorded public responses; the original Kotlin 404 is preserved. Sponsor data uses an explicitly labelled credentialless empty-live-sponsor fixture, not an invented API success. Distribution files are authored source data. Reference dates and decorative randomness are explicit inputs.

`RUNTIME-INTEGRATIONS.md` classifies each integration family. The pricing calculator eventually matches the reference's $99/month Team result for the tested 100,000 MAU / one update / 4 MB case. Live Algolia docs search returned actual results. Browser metrics display the original explicit unavailable states for failed remote access. Senja loaded its external testimonials. Availability and changing external content are not frozen.

Original CSR/keystore/UDID server endpoints are not ported; real signing/device workflows remain unsupported locally. Successful browser-only certificate conversion/download remains unverified because the browser fixture chooser did not select the file. Real account creation, remote auth/configuration, all pricing combinations/error paths, translated routes, and private backend functionality are not certified. No account was created, terms accepted, personal identifier submitted or contact message sent.

The earlier allowlisted provider server scaffold is separate from the retained faithful controllers and does not automatically reconnect them. A downloaded site needs a compatible backend/configuration for those integrations. Static parity is not used as evidence of backend success.

## Browser and reproduction evidence

`BROWSER-VERIFICATION.md` records representative desktop/mobile coverage of homepage, navigation, product explainers, solution/comparison, docs landing/rich tabs/code-copy/search, blog article/category/search, plugins, Semver validation, API error state, legal, forms, locale menu and keyboard behavior. Raw accessibility states/screenshots are in `evidence/browser-closure`; previous reference-versus-migrated geometry at 375/768/1440 is also retained. This is distinct-class coverage, not an exhaustive accessibility audit or certification of every route interaction.

The independent clean clone at `2f8dae1a` reproduced all intermediates with no copied caches and no global MDX resolution: 79.71s / 637.4 MiB. Tracked input audit covers all 1,347 wrappers and 7,775 required includes, with zero issues. Required source files and the committed oracle are inside the repo. Six Nift configuration/package sources remain tracked; generated hashes/locks were removed. `CLEAN-CHECKOUT.md` gives lockfile installs, first asset initialization, ordinary builds, validation and serving commands.

A later direct cold test found missing creation of `build/faithful` in rich-component preparation. That correctness fix is included in the source closure revision; three final direct cold runs recreate the directory successfully. A second independent clone of the corrected revision rebuilt with no copied caches or dependencies in 123.11s / 665.4 MiB. Its output and head gates pass; raw evidence is in `evidence/clean-checkout-final/`. This single bootstrap observation is separate from the repeated cold-intermediate benchmark.

## Repeated local benchmarks

| Workload | Runs | Median | Range | Maximum peak RSS |
|---|---:|---:|---:|---:|
| Upstream Astro `bun run build` | 5 | 106.09s | 92.18–124.61s | 3.61 GiB |
| Nift warm full `nift build --all` | 3 | 5.67s | 5.56–5.67s | 235.8 MiB |
| Nift cold intermediates `nift build --all` | 3 | 81.29s | 80.09–82.85s | 667.1 MiB |
| Nift web regeneration | 3 | 20.68s | 19.81–20.78s | 667.6 MiB |
| Nift no-op `nift build` | 3 | 4.60s | 4.13–4.63s | 235.4 MiB |
| Nift authored docs edit | 3 | 5.78s | 5.78–6.24s | 254.4 MiB |
| Nift rich MDX edit | 3 | 6.41s | 6.20–6.54s | 275.6 MiB |
| Nift marketing title edit | 3 | 4.28s | 4.23–4.35s | 236.3 MiB |
| Nift blog/listing edit | 3 | 4.35s | 4.30–4.51s | 251.7 MiB |

Hardware: Intel i7-12700H, 20 logical CPUs, Ubuntu 26.04.1 LTS, Linux 7.0.0-29-generic. Nift threads `-1`; Node 22.22.1. Upstream uses Bun 1.4.2 / Node 24.21.0 and the original default build concurrency. Builds run sequentially; installation is excluded. Peak RSS is GNU time's maximum process RSS, not the sum of concurrent processes. Every time/output/preparation record is preserved.

Cold intermediates remove `build/faithful`, `.nift/mdx-prepared`, `.nift/mdx-cache`; dependencies, public assets and Nift output state remain. Web regeneration deletes only web fingerprints. Warm/no-op keep caches. Incremental cases change actual authored text/title, run ordinary `nift build`, and restore source/output afterward. An unmeasured prime precedes final warm samples. Optional targeted/best-case timing was not used.

Astro `bun run build` clears its per-app output/Astro/deploy caches each run; dependencies, committed data and configured snapshot preload remain. Other optional fetches retain upstream behavior. Five runs replace the single historical 78.10s / 3.47 GiB observation for this measured session; the historical result remains recorded.

These are different workloads: Nift's cold content build still reuses compiled production CSS/JS/assets, while upstream regenerates its frontend bundles. Warm Nift also reuses MDX/content intermediates. The timings demonstrate this migration's development/build workload, not an equivalent-work compiler speed claim.

The final warm median is higher than the earlier paired 4.40s checkpoint. The report retains that difference rather than claiming no regression. Runs span different local load/thermal states and now include complete metadata preparation; no causal attribution to a particular extraction is established by these unpaired samples. Phase evidence is available for investigation without further architectural refactoring.

## Handoff to Agent

Faithful frontend architecture is frozen. Only correctness, reproduction and benchmark-methodology fixes remain eligible. Capgo Agent now becomes the primary implementation: maintained HTML bodies and route/source mapping from this project, official/reference output as the visual/behavioral oracle, and Nift + semantic HTML/CSS/vanilla JavaScript as its default runtime. Retained framework-generated bundles are not its final architecture. Agent still needs native reconstruction, complete interaction/visual gates, independent reproduction and its own repeated benchmark/comparison report.
