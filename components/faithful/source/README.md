These files are copied without edits from Cap-go/website commit
7d5b69d6ba8a6630384dffc7d012431ee3ed22ec and retain its AGPL license.

- Questionnaire and FrameworkSelector components: apps/docs/src/components/
- messages.ts: apps/shared/copy/messages.ts
- plugins.ts: apps/web/src/config/plugins.ts
- pluginDocs.ts: apps/docs/src/services/pluginDocs.ts

Normal builds regenerate reusable questionnaire data, inline controllers,
framework labels, and registry entries with tools/prepare-rich-components.mjs.
The production directory's repository fallback choices are explicitly pinned
in data/faithful-plugin-directory.json; this preserves published behavior.

- BlogMidArticleCta.astro: apps/web/src/components/BlogMidArticleCta.astro.
  Its declarative markup and shared English copy regenerate the seven authored blog MDX CTA uses.
