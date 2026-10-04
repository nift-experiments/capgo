# capgo

Reference Capgo recreation designed for pleasant human+agent maintenance,
with familiar MD/MDX/frontmatter authoring where practical.

**Migration in progress.** The local site reproduces the pinned production build, with shared Nift shells and the first 496 authored docs rendered through the Nift MDX package. Rich MDX and the rest of the corpus remain in progress. See HANDOVER.md for current evidence.

Build directly with the installed Nift 4.5 or newer:

```sh
nift build --all
```

The project pre-build hook prepares authored MDX automatically. After a failed or interrupted build, use `nift build --repair` once. A cached full build of the current 496-page MDX cohort took **3.30 seconds / 204.8 MiB peak RSS**, including the preparation hook. Interactive builds now show preparation status before Nift’s existing page progress. The MDX renderer uses a deterministic environment, so switching terminals does not invalidate all prepared pages; source, dependency and Node-version changes still invalidate the cache. The migration remains in progress.


Both experiments use the same pinned [Capgo source](https://github.com/Cap-go/website/tree/7d5b69d6ba8a6630384dffc7d012431ee3ed22ec),
inspected on 4 October 2026. The current source inventory contains 1,193 authored
MD/MDX documents; the frozen production snapshot contains 1,347 HTML routes.

These Capgo websites may use blue and light themes and should follow Capgo's
style family. The Labs report site alone has the dark/no-blue rule. There is no
static-only constraint: the planned downloadable project supports user-configured
APIs and ordinary runtime tooling. GitHub Pages is an optional static preview.

Read:

- [HANDOVER.md](HANDOVER.md): purpose, architecture, runtime and maintenance rules.
- [GAMEPLAN.md](GAMEPLAN.md): the current golden-reference migration phases.
- [UPSTREAM.md](UPSTREAM.md): observed architecture, corpus and open constraints.
- [provenance.json](provenance.json): exact upstream SHA, lock digest and measured inventory.

Sibling: https://github.com/nift-experiments/capgo-agent

No Nift core or unrelated package changes are in scope. No permanent upstream
fork, dependency installation, benchmark campaign or deployment was performed in
this planning phase.

The distinction is maintenance model, not forced visual or technology divergence.
Prefer HTML/CSS/vanilla JS; isolated framework islands are allowed for materially
complex stateful UI, with documented boundaries, costs and tests. Build/system
and equivalent maintenance/agent evaluations are separate future goals.

MDX integration is gated on certified reusable Nift `mdx.input` → `mdx.html`
work, including batched rendering and measured trusted-build parser limits.
Production rendering is not implemented; no private Capgo renderer is planned.
