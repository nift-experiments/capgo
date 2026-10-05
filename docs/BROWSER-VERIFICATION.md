# Representative browser/runtime verification

The closure pass uses the rendered faithful preview, default desktop 1280×720 and mobile 390×844. Earlier golden-versus-migrated geometry and screenshots at 375/768/1440 remain in `evidence/parity/phase5-shells`, `mdx-cohort` and `mdx-code-cohort`. Full HTML semantic and asset checks cover every route. Browser checks cover distinct mechanisms, not every page or device. New raw accessibility states and selected screenshots are in `evidence/browser-closure`.

| Class | Check / result |
|---|---|
| Homepage | Desktop Products menu exposes original nine destinations; native store-policy disclosure opens its detailed explanation; AI radio selection changes ChatGPT to Claude and correctly encodes the original prompt URL. Senja iframe loaded testimonials. |
| Mobile navigation | At 390px menu expands, Products submenu expands and Live Updates navigation lands on the correct rendered product page. |
| Product/controller | Live Updates Delta tab selects its matching panel. Pause becomes Play. ArrowRight moves focus and selection to Rollout & rollback. Mobile screenshot/state retained. |
| Desktop navigation | Products menu and actual navigation work; keyboard Escape was exercised. Do not infer complete focus trapping from one key check. |
| Pricing | Earlier calculator control/plan-selection evidence retained. A later settled-state check matched the reference at $99/month Team for 100,000 MAU, one update/month and 4 MB. Other combinations/backend failure paths are not exhaustive. |
| Solution/comparison | Webapp-to-mobile and Ionic Appflow comparison render expected headings on desktop and mobile, with no horizontal page overflow. |
| Docs landing/search | Landing renders original sections/navigation. Algolia search `rollback` returns five live results; Escape closes search. Search hits retain upstream official-site URLs. |
| Ordinary/rich docs | Deploy a Live Update has expressive code, nested tips and rich tabs. Copy puts `npm run build` on clipboard. Github Actions selects its YAML panel; ArrowRight selects Gitlab and moves focus. Earlier rich MDX and questionnaire checks remain in cohort evidence. |
| Sidebar/TOC | Earlier desktop/mobile geometry evidence preserved; sidebar/TOC markup unchanged in full semantic parity. New docs tab-state evidence retained. This does not certify every scroll position on every browser. |
| Blog listing/filter/search | Alternatives category navigation lands on its canonical category. Search for a nonexistent phrase shows 0 of 17 and explicit no-match message; clearing restores articles. |
| Plugin directory | Nonexistent search shows 0 of 154; clearing and selecting Updates shows 6 of 154 with selected-category state. |
| Browser-local tool | Semver 1.0.0 → 1.0.1 reports update applied. Invalid remote version reports invalid format and prevents comparison. |
| Blog article | Contacts-alternative article renders title, credits, image, code and TOC; desktop screenshot inspected. Earlier article mobile geometry covers the same article shell. |
| API/data page | `/data/` renders its explicit remote-unavailable states; selecting 1W changes selected range from 1M. Successful remote statistics not claimed. |
| Legal | Privacy renders original headings/content and mobile width stays inside viewport. |
| Forms | Registration renders email/name/password inputs and original terms link; no account submission performed. Review carousel selection updates displayed quote to Nate van Jole. Missing private auth backend is explicitly classified. |
| Language | English menu opens nine language links. Translated destinations require the original translation/hosting service and are not local English-corpus routes. |
| Certificate workflow | Generator/converter form renders. Browser chooser attempt with a disposable local certificate returned no selected file; actual conversion/download is **unverified**, not a passing test. Backend CSR/keystore/UDID workflows are separate declared limitations. |
| Keyboard/focus | Docs search Escape and two independent tab implementations' ArrowRight behavior observed. Focus follows selected tabs. No claim of a full accessibility audit. |

Mobile solution, comparison, privacy, docs, blog-category and registration pages all measured scroll width 375px within the 390px viewport (scrollbar accounted for). Page titles/headings and widths are recorded in `page-classes.json`. Temporary viewport override was reset.

No upstream visual/controller redesign occurred during closure. Browser-only conversion success, remote calculation/auth/signing, translated routes and exhaustive accessibility testing remain residual limitations. Architecture is frozen with these limitations disclosed; any later change must address correctness or reproduction and rerun the affected checks.

Final visual comparison found missing whitespace before an inline homepage link, invisible to the text-trimming semantic check. The authored renderer now preserves inline-boundary whitespace outside JavaScript expressions; focused literal/expression/ternary tests pass. Head and full parity remain green.
