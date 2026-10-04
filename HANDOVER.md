# capgo — golden-reference migration handover

Current phase: Phase 0, preserve prototype and rebuild the pinned production reference.

The previous reconstruction failed visual fidelity: class stripping and broad substitute CSS broke layout, cards, decorative positioning, typography, logo grids, testimonial height, navigation and footer. Route completion did not certify fidelity. User screenshots demonstrate these regressions. Do not polish or accept this prototype as the target.

The authoritative upstream remains 7d5b69d6ba8a6630384dffc7d012431ee3ed22ec. Its successful full production output is the immutable golden oracle. Phase 1 inventories every output file; Phase 2 validates that output locally at mobile/tablet/desktop sizes; parity gates precede structural refactoring.

capgo first reproduces the complete compiled output through Nift, retains frontend assets as needed, then extracts templates and reconnects authored MDX. capgo-agent uses the same oracle but reconstructs a lean native presentation and vanilla behavior. Neither final project may be merely a copied build. No Nift core changes. Preserve Git history. Push authorized checkpoint commits.

Useful preserved work includes source provenance, normalized importer, generic MDX integration, component inventories, runtime contract, public snapshots, build logs, and incomplete adapters. Browser/runtime/production certification is pending. Old progress is archived in docs/prototype.

Phase 0 complete: useful prototype preserved in Git and superseded explicitly. Full pinned production build succeeds with recorded anonymous public API responses, including upstream Kotlin 404. See evidence/checkpoints/PHASE00.json and the build log. Phase 1 snapshot copied; inventory review and verification pending. No visual-parity claim yet.

Phase 0 complete: useful prototype preserved in Git and superseded explicitly. Full pinned production build succeeds with recorded anonymous public API responses, including upstream Kotlin 404. See evidence/checkpoints/PHASE00.json and the build log. Phase 1 snapshot copied; inventory review and verification pending. No visual-parity claim yet.

Phase 0 complete: useful prototype preserved in Git and superseded explicitly. Full pinned production build succeeds with recorded anonymous public API responses, including upstream Kotlin 404. See evidence/checkpoints/PHASE00.json and the build log. Phase 1 snapshot copied; inventory review and verification pending. No visual-parity claim yet.

Phase 1 complete: immutable full production snapshot, 3,876 files / 1,347 HTML routes. Every merged and original per-app file hash verified; four root collisions retain their original docs bytes. Metadata, scripts/styles, headings and complete per-app inventories are recorded. Use tools/golden.mjs to verify before migration builds. Phase 2 responsive/browser references underway; no final migration claim.

Phase 2 accepted: 13 representative routes captured at 375/768/1440px (39 observations). Golden screenshots include mobile/desktop menus, search and SemVer interaction. External network dependencies and one original mobile overflow are documented in PHASE02.json. No accounts or live form submissions were performed.

Phase 3: all 1,347 HTML routes rendered through Nift opaque inputs; all 3,876 output files SHA-identical. Original public output moved reversibly to build/archive. Default npm build now invokes faithful bootstrap; prototype builder preserved under docs/prototype. 39 responsive browser observations and screenshots saved. This is intentionally compiled-output bootstrap, not final MDX migration.

Phase 4 accepted for capgo bootstrap: 3,876 files, 1,347 routes, zero byte/semantic/introduced link differences and no unexpected files. 39 paired responsive samples have exact geometry/typography; 27 are pixel-identical, remaining homepage animation or tiny rendering variation. Baseline link/anchor defects are reported separately. Agent remains prototype and has not passed this gate. Full build progress measurements saved for both implementations with explicit stage labels.

Phase 5 milestone: shared head/header/footer fragments extracted without HTML reserialization. 81,083,117 bytes of repeated markup deduplicated. Full file/content parity still exact. Nine responsive browser samples recorded after extraction. Build 11.18s / 141,072 KiB peak RSS including hash validation. Phase 5 remains in progress; language-aware footer and docs shell recovery next.

Phase 5 second extraction: 813 pages share one editable global header and one footer template with original route-aware language links. Output remains SHA-identical. Full build 11.41s / 144,724 KiB peak RSS, including hash validation. Docs navigation is next. Do not rerun extraction tools after editing extracted templates; they are one-time migration tools.

Phase 5 docs shell extraction: 529 docs pages share one header and one sidebar with per-route open/selected/language state. Output remains byte-identical for all 3,876 files. An interpreted all-token helper caused 64.27s full builds; sparse native replacements reduced this to 15.08s / 142,564 KiB maximum RSS without reverting extraction. Templates remain maintained Nift inputs. Extraction/refinement tools are one-time migration tools, never normal-build steps. MDX bodies remain pending Phase 6.

Phase 5 performance follow-up: build wrapper no longer forces one worker. Default is min(4, available CPU parallelism), overridable with NIFT_BUILD_THREADS. Sequential full-build checks measured 14.44s / 139,256 KiB at one worker, 5.63s / 146,576 KiB at four, and 5.22s / 145,216 KiB with the new default. Every run verified all 3,876 file hashes. BUILD_PROFILE=1 prints stage times; the default run spent 2.73s in Nift and about 2.35s in setup/verification. These are cached Phase 5 measurements, not final MDX benchmarks.

User-requested default: build-threads is now -1 (all hardware cores), superseding the four-worker cap above. NIFT_BUILD_THREADS accepts -1 or a positive override. Verified full build: 4.75s wall time / 141,896 KiB maximum RSS, with zero differences across all 3,876 files. Nift portion: 1.33s.

Phase 6 first authored-content checkpoint: 138 plain MDX docs now use the installed Nift MDX package, with faithful Starlight heading/code markup and upstream remark-smartypants 3.0.3 typography. Body DOM/text/attributes match exactly; page shells and other files remain byte-identical. Full route audit passes. Responsive 375/768/1440 geometry is identical. Normal builds batch source preparation and validate only the changed body DOM, preserving exact shell checks. Cold prepared-cache build 9.98s / 186,644 KiB max RSS; prepared full build 4.42s / 182,736 KiB. Rich components and remaining corpus are still pending; do not label either project finished.

Phase 6 code/callout checkpoint: 346 authored docs render through Nift MDX with 2,529 source-derived Expressive Code examples, upstream callouts and table alignment. All 346 body DOM/text/attribute comparisons and full 1,347-route parity pass. No golden-body fallback. Code preparation is fingerprinted by source/compiler/lock; unchanged builds reuse it. First expanded full build 33.35s / 375,584 KiB max RSS; prepared full build 7.08s / 228,936 KiB. Four responsive samples have identical geometry; three are pixel-identical. Copy control displays Copied!; clipboard contents not certified by the browser bridge. Imported-component adapters are next.
