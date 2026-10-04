# capgo-similar — implementation gameplan

**All 22 checkpoints are pending. Implementation requires user approval.**
Read HANDOVER.md, UPSTREAM.md and provenance.json first. Each checkpoint ends
with acceptance evidence, a small Git commit and a handover update. Dependencies
flow in order; do not skip corpus/functionality gates to advertise benchmarks.
The ordered list is adapted to the pinned Capgo monorepo and latest user changes.

## CP01 — Pin baseline and corpus contract

- [ ] Verify the recorded upstream and lock hashes, create a disposable detached upstream checkout, record license/attribution and select exact runtime patches. Agree one inclusion/exclusion manifest and runtime capability vocabulary shared with the sibling experiment. Acceptance: documented pin verification and no divergent source snapshot.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP02 — Reproduce upstream build

- [ ] Install the frozen lock with Bun 1.4.2 and chosen Node 24 patch, build docs and web without deploying, record command/env/logs and generated artifact inventory. Identify required public API responses; capture authorised public snapshots or record missing ones. Acceptance: a reproducible baseline or explicit blockers; no timing campaign yet.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP03 — Inventory routes and content semantics

- [ ] Enumerate published slugs, docs, marketing routes, category/index families, plugin mappings, redirects and raw/LLM outputs. Capture expected heading/code/text/image/link semantics. Acceptance: collision-free exact route manifest and classified exclusions, not source-file-count guesses.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP04 — Define API and runtime contract

- [ ] Audit interactive pages and decide supported own-API capabilities, schemas/auth/CORS/base URL behavior, external services and preview fallbacks. Specify local run/deployment topology. Acceptance: per-feature success/setup/error contract and documented unavailable production services.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP05 — Preserve authoring inputs

- [ ] Import MD/MDX/frontmatter and asset references by hash, with original path attribution and a human-edit/upstream-update merge policy. Preserve published/origin/locale semantics. Acceptance: source manifest matches agreed corpus and human edits have a documented home.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP06 — Prove the content compiler boundary

- [ ] Spike plain MD and component-heavy MDX with pinned external compiler/static adapters. Cover tables, raw HTML, sigils, nested code, images, Starlight cards/tabs/Steps and Astro component replacements. Acceptance: semantic fixtures render without executing code examples or needing changes to Nift/packages.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP07 — Define tracking and per-page dependencies

- [ ] Plan wrappers and metadata schemas, register converter/component/source inputs as per-page dependencies, test cache invalidation by source and adapter edits. Acceptance: one-page edit regenerates content + one Nift target, and shared adapter fans out correctly.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP08 — Create minimal Nift project

- [ ] Only after approval use normal Nift project config/public output. Add representative homepage/docs/blog/plugin wrappers and explicit templates. Acceptance: full/incremental/targeted subset builds, root and repository-prefix links correct.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP09 — Implement deterministic importer orchestration

- [ ] Import full authored corpus and metadata, handle asset/image imports, generate wrappers and fail on unknown MDX expressions/components. Acceptance: two imports are byte-stable; documented local overrides survive; no manual double-entry content.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP10 — Complete corpus and generated families

- [ ] Generate all agreed pages, directories, categories, plugin endpoints, raw Markdown and LLM outputs; map redirects separately. Acceptance: exact route/semantic coverage, expected gaps classified, metadata validated.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP11 — Recreate recognizable layout families

- [ ] Implement marketing header/footer, docs sidebar/TOC/breadcrumbs, blog/article bylines and plugin detail layouts using reusable vanilla templates. Acceptance: navigation generated from data and all layout families accessible without JS.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP12 — Implement Capgo-inspired visual system

- [ ] Choose recognizable spacing, typography, colors, icons and responsive layout. Blue/light themes allowed; adapt upstream CSS rather than copy Tailwind architecture. Acceptance: homepage/docs/nested/article/mobile targeted comparisons meet practical similarity goals.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP13 — Add vanilla client behavior

- [ ] Menus, TOC, tabs/package commands, copy controls, theme and questionnaire interactions; JS pagination with shareable URLs and no-JS content fallback. Acceptance: keyboard, reduced-motion and failure paths pass focused browser checks.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP14 — Provide local search and code/diagram rendering

- [ ] Generate search indexes, map experiment URLs, pin highlighter/diagram tools; allow optional own-provider search. Acceptance: queries find representative corpus text, code matches input and diagrams degrade accessibly.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP15 — Implement user-configurable runtime adapters

- [ ] Provide API provider config examples, local server if needed and wiring for selected pricing/metrics/forms/tools behavior. Keep private secrets outside client output and support missing-capability states. Acceptance: contract fixtures and a real configurable sample provider work end-to-end.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP16 — Close asset and route gaps

- [ ] Verify public + imported image/font/media closure, canonical/sitemap/robots/404 and redirect behavior for Pages preview and runtime serving. Acceptance: zero unexpected broken links/fragments/assets and deterministic metadata.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP17 — Run corpus and usability gates

- [ ] Audit route count, headings/sections/text/code, component conversion, local links, external URL syntax, metadata and practical HTML validity. Run targeted visual/browser checks. Acceptance: mechanical gates pass; no exhaustive pixel-parity campaign.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP18 — Document download-and-run workflow

- [ ] Fresh clone install, build, configure own API and run local server/client, plus troubleshooting and optional frozen preview. Acceptance: documented commands work from a fresh environment without private Capgo credentials.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP19 — Prepare optional Pages and runtime deployment

- [ ] Add reviewed Actions recipe for static preview and separate runtime hosting instructions; verify nested project-prefix/root links and artifact limits. Acceptance: preview/full-runtime boundaries explicit; no server features falsely advertised on Pages.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP20 — Freeze benchmark scenarios

- [ ] Record converter caches, inputs, public snapshots, machine/concurrency, validation scope, warmups and measurement commands. Acceptance: identical inclusion/runtime snapshot policy with alt and equal full-artifact timing scope.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP21 — Measure and report comparative results

- [ ] Run declared repeat scenarios for upstream/similar/alt on same hardware including end-to-end authored edit and render-only separately. Acceptance: valid outputs, raw runs/dispersion/memory/footprint/page counts and honest limitations.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP22 — Prepare Labs report and release handover

- [ ] After results exist, propose Labs metadata/report entry with dark/no-blue styling there only, document fidelity and runtime differences, finalize source attribution and reproducibility. Acceptance: fresh-download reproduction and reviewed evidence; no speculative speed claims.
- [ ] Save evidence, commit this checkpoint, and update handover status.

