# capgo

Reference Capgo recreation designed for pleasant human+agent maintenance,
with familiar MD/MDX/frontmatter authoring where practical.

**Faithful frontend closure complete, with documented runtime limitations.** All 1,290 authored bodies and 51 listing layouts are source-connected; all 1,347 routes / 3,876 files pass parity. Metadata, browser coverage, independent reproduction and final repeated benchmarks are recorded in the [final report](docs/FAITHFUL-FINAL-REPORT.md). Architecture is frozen; Capgo Agent is now the primary implementation project.

For a fresh checkout, follow [clean reproduction](docs/CLEAN-CHECKOUT.md) to install locked dependencies and initialize assets. Subsequent builds use installed Nift 4.6.0:

```sh
nift build --all
```

The project pre-build hook prepares authored MDX automatically. After a failed or interrupted build, use `nift build --repair` once. Final repeated builds measured a 5.67s warm-full median (235.8 MiB maximum peak RSS), 81.29s cold-intermediate median (667.1 MiB), and 4.60s no-op median. Cache definitions, raw evidence and higher timings relative to the earlier checkpoint are explained in the final report. Interactive builds show preparation status before Nift’s page progress. The renderer uses a deterministic environment; source, dependency and Node-version changes invalidate caches.


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
