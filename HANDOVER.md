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
