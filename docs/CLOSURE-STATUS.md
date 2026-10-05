# Faithful migration closure status

The initial 1,285 authored bodies and five supplemental bodies are connected, plus 51 listing layouts. Every one of the 1,347 routes is classified. Source connection is distinct from whole-page/runtime completion. Supplemental source paths, roles and Nift representation are in `evidence/supplemental-template-inventory.json`.

Head recovery: 1,343 pages use 28 shared Nift templates with explicit per-route metadata values (`migration/head-metadata.json`). This extracts canonical, OpenGraph/Twitter, titles, descriptions, language alternates and structured data without changing output. Metadata is recovered from pinned production output; authored SEO-prop regeneration is still pending. Four compatibility redirects have no shared head. Existing shared header/footer and docs sidebar templates remain in use. Further valuable shell/CTA recovery and source provenance are pending.

The strict gate passes all 1,347 routes / 3,876 files with zero introduced issues after supplemental bodies and head extraction. This does not certify all browser mechanisms. A paired warm build check found medians 4.49s before / 4.40s after extraction, avoiding attribution of noisy earlier samples to a regression. Final formal benchmarks wait for architecture closure.

## Open runtime work

The signing tools call relative `/api/tools/android-keystore-generator`, `/api/tools/ios-certificate-generator`, and `/api/tools/ios-udid-finder/profile`. The current runtime server exposes the earlier capabilities contract, not these original route contracts. The static preview has no backend. These endpoints are **not operationally verified** and require faithful runtime integration before completion. The iOS certificate converter uses a retained browser controller and local file conversion; browser verification remains pending.

The pricing calculator posts to the configured API base plus `/private/credits`; both frozen static builds remain at loading totals in the recorded browser check. Matching this state verifies only parity of the observed state, not successful API calculation. Its source-driven build-time plan/credit inputs are reproducible. Metrics widgets, contact/registration and other retained controllers still need explicit endpoint, success/failure, keyboard/focus and mobile verification. No live credentials or device identifiers are required for build reproduction.

## Open reproducibility work

A repository audit found `build/` in `.gitignore` also ignored the authored migration route directory `docs/cli/reference/build/`. The ignore is now rooted as `/build/`, and those source wrappers/fragments are tracked. This is a real clean-checkout gap previously masked by local files. A genuinely clean checkout, dependencies provisioned from lockfiles, empty generated/cache directories, asset initialization and full validation remain to be verified. No completion or cache-independence claim is made yet.

Next: close runtime contracts and authored metadata/source provenance, broaden browser mechanism coverage, then clean checkout validation, architecture freeze and final benchmark suite. Agent remains at the recovered baseline.
