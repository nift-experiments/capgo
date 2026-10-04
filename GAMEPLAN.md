# capgo — implementation gameplan

**Implementation authorized 4 October 2026. Checkpoints proceed until completion; evidence is required before marking acceptance.**
Read HANDOVER.md, UPSTREAM.md and provenance.json first. Each checkpoint ends
with acceptance evidence, a small Git commit and a handover update. Dependencies
flow in order; do not skip corpus/functionality gates to advertise benchmarks.
The ordered list is adapted to the pinned Capgo monorepo and latest user changes.

## Shared component and evaluation rules

Progress from static HTML to CSS to vanilla JS; use a local framework island only
when complex state materially makes it clearer/smaller to maintain. Do not
preselect React/Vue/Svelte/Solid or force technology differences between siblings.
For each island record the reason vanilla was not preferable, runtime, scope,
hydration/client bundle cost, state ownership, API boundary and independent tests.
Menus/theme/tabs/copy/TOCs/simple filtering/pagination remain vanilla JS.

Keep build/system and maintenance/agent evaluation separate, comparing
upstream / capgo / capgo-agent on equivalent corpus/functionality and tasks.
Build scenarios: clean/full, warm/full, no-change, one content edit, targeted
build, shared-layout fanout, memory, dependency/install footprint, output size.
Maintenance tasks: docs page, global navigation, shared component, new content
type, stateful feature, source→output trace, seeded bug and cross-cutting visual
change. Record success/correctness, turns, context/tokens where measurable,
files inspected/modified, failed builds/tests, unnecessary edits, intervention,
architecture explanation and preferred codebase/reasons. Freeze model/tool/start
conditions and equivalent acceptance tests before runs. Run the final evaluation only after implementation correctness gates pass.

## CP01 — Pin baseline and corpus contract

- [x] Verify the recorded upstream and lock hashes, create a disposable detached upstream checkout, record license/attribution and select exact runtime patches. Agree one inclusion/exclusion manifest and runtime capability vocabulary shared with the sibling experiment. Acceptance: documented pin verification and no divergent source snapshot.
- [x] Save evidence, commit this checkpoint, and update handover status.

## CP02 — Reproduce upstream build

- [x] Install the frozen lock with Bun 1.4.2 and chosen Node 24 patch, build docs and web without deploying, record command/env/logs and generated artifact inventory. Identify required public API responses; capture authorised public snapshots or record missing ones. Acceptance: a reproducible baseline or explicit blockers; no timing campaign yet.
- [x] Save evidence, commit this checkpoint, and update handover status.

## CP03 — Inventory routes and content semantics

- [x] Enumerate published slugs, docs, marketing routes, category/index families, plugin mappings, redirects and raw/LLM outputs. Capture expected heading/code/text/image/link semantics. Acceptance: collision-free exact route manifest and classified exclusions, not source-file-count guesses.
- [x] Save evidence, commit this checkpoint, and update handover status.

## CP04 — Define API and runtime contract

- [x] Audit interactive pages and decide supported own-API capabilities, schemas/auth/CORS/base URL behavior, external services and preview fallbacks. Specify local run/deployment topology. Acceptance: per-feature success/setup/error contract and documented unavailable production services.
- [x] Save evidence, commit this checkpoint, and update handover status.

## CP05 — Preserve human+agent authoring inputs

- [ ] Import MD/MDX/frontmatter and asset references by hash, preserve familiar source conventions where practical and record attribution, locale and upstream-update merges. Humans and agents edit the authoritative source; generated fragments are output. Acceptance: agreed corpus matches and editable ownership/update conflicts are explicit.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP06 — Integrate the certified reusable Nift MDX pipeline

- [ ] Integrate the reusable Nift MDX renderer with a distinct compiler-semantic render-preparation path and exact per-target dependency manifests. Preserve pure parse/input contracts; implement/certify generic orchestration in the MDX package before site-scale integration. Use proper Nift is_dir/is_file APIs once landed, without core edits. Add Capgo-owned adapters and measure largest/component-heavy/all-corpus builds. Acceptance: authored source remains authoritative, batching is normal, unknown components fail, dependency/asset/config invalidation is exact and browser React is unnecessary.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP07 — Define batch orchestration and per-page dependencies

- [ ] Integrate the package batch interface/build orchestration with Nift target selection and source/component/config/asset dependency manifests. Avoid per-page process spawning as the normal path and opaque untracked preprocessing. Acceptance: source/transitive/adapter edits regenerate affected HTML and consuming Nift targets, shared dependencies fan out correctly, unrelated and no-change targets remain untouched.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP08 — Create minimal Nift project

- [ ] Use normal Nift project config/public output. Add representative homepage/docs/blog/plugin wrappers and explicit templates. Acceptance: full/incremental/targeted subset builds, root and repository-prefix links correct.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP09 — Implement deterministic source import orchestration

- [ ] Import full authored corpus and metadata, preserve MD/MDX/frontmatter and local edits, handle asset references, generate wrappers and report unsupported syntax/components under certified package policy. Use the reusable package rendering path rather than a second compiler. Acceptance: repeated imports are byte-stable, ownership is human+agent-friendly and no manual double-entry content.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP10 — Complete corpus and generated families

- [ ] Generate all agreed pages, directories, categories, plugin endpoints, raw Markdown and LLM outputs; map redirects separately. Acceptance: exact route/semantic coverage, expected gaps classified, metadata validated.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP11 — Recreate recognizable layout families

- [ ] Implement marketing header/footer, docs sidebar/TOC/breadcrumbs, blog/article bylines and plugin detail layouts using reusable vanilla templates. Acceptance: navigation generated from data and all layout families accessible without JS.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP12 — Implement recognizable Capgo presentation

- [ ] Use familiar layout families, hierarchy, visual identity and useful behaviors, with recognizable spacing/typography/colors/icons and responsive design. Blue/light themes allowed; adapt styles without retaining framework machinery solely for parity. Acceptance: practical homepage/docs/nested/article/mobile comparisons; no exhaustive pixel-parity gate or artificial branding divergence.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP13 — Add vanilla enhancements and justified islands

- [ ] Implement menus, TOC, tabs, copy, theme, simple filtering and JS pagination with accessible fallback. Evaluate complex questionnaires/configurators/workflows separately under the shared island rule; document runtime/scope/bundle/state/API/tests for any island. Acceptance: keyboard/reduced-motion/error checks, independent island tests and localized hydration only when justified.
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

## CP20 — Freeze build and maintenance comparison protocols

- [ ] Agree identical corpus/inclusion/API snapshots with capgo-agent; record batch/render/import caches, machine/concurrency, full-artifact scope and separate render-only timings. Freeze equivalent maintenance tasks/model/settings/start states and correctness tests for upstream / capgo / capgo-agent. Acceptance: reproducible protocols for both dimensions, with token/context unavailable fields labeled rather than invented.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP21 — Measure separate build and maintenance results

- [ ] After corpus gates pass, run controlled upstream / capgo / capgo-agent build scenarios and equivalent maintenance tasks from the shared protocol. Include full authored edit-to-output work and renderer-only separately; measure maintenance success/turns/context/files/failures/unnecessary edits/intervention/architecture preference. Acceptance: valid outputs, raw runs/dispersion/memory/footprint/counts, independent correctness evidence and honest limits; no maintenance claims from speed alone.
- [ ] Save evidence, commit this checkpoint, and update handover status.

## CP22 — Prepare Labs report and release handover

- [ ] After results exist, propose Labs metadata/report entry with dark/no-blue styling there only, document fidelity and runtime differences, finalize source attribution and reproducibility. Acceptance: fresh-download reproduction and reviewed evidence; no speculative speed claims.
- [ ] Save evidence, commit this checkpoint, and update handover status.


## Current implementation decisions

Both sites target close Capgo visual/behavioral fidelity and the same pinned corpus, route policy, assets and API snapshots. The distinction is maintenance architecture, not visual design. Preserve the 22/23 checkpoint skeletons; investigate intermediate failures and continue. Full corpus, runtime, fresh-clone, targeted visual, build and maintenance evidence are required. MDX compiler-preparation is approved by the current user outline; 8–15 s / 1–2 s remain provisional until measured. Fallback normalization is permitted only with an evidenced decision. Labs dark/no-blue stays separate. No core edits.
