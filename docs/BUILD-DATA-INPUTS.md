# Faithful build data inputs

Normal builds render authored HTML using committed inputs. They do not read `golden/site`, contact build-time APIs, or require the original Astro checkout.

| Input | Kind | Use |
|---|---|---|
| `data/api-snapshots/plans.json`, `credits.json` | Recorded public API responses from the reference build | Pricing, About, Affiliate, Enterprise, and Native Build |
| `data/api-snapshots/ranking-index.json` and its response files | Recorded public ranking responses | Seven framework ranking pages; original Kotlin 404 is preserved |
| `data/api-snapshots/github-sponsors-fixture.json` | Explicit deterministic fixture, **not a captured API response** | Empty live sponsor entries for a credentialless build; authored sponsor entries and structure remain visible |
| `corpus/authored/apps/web/src/data/*distribution.json` | Authored upstream data files | Distribution charts |
| Authored metrics modules | Source-authored initial/loading data | Metrics pages fetch current public metrics through their retained browser controllers |
| `data/faithful-build-inputs.json` | Reference calendar input | Reproduces the golden build's date label; not a live-data claim |
| `data/faithful-random-layout.json` | Recorded decoration inputs | Deterministic decorative layout, with authored-source hashes |
| `data/faithful-local-icons.json` | Source SVG/library assets normalized by the upstream icon toolchain | Preserves source icons and symbol/use behavior; local SVG source hashes are validated |

`tools/recorded-api.mjs` permits only explicit input mappings. An unmapped build-time request fails validation even when authored source catches the fetch exception. No credentials are read from the machine. Authored environment accesses use an explicit empty environment, matching the credentialless reference configuration; registration CAPTCHA is consequently absent from this reference.

Browser runtime fetches remain separate from these build-time inputs. Their existing controllers and endpoints are preserved for fidelity. Provider configuration and clean-checkout verification remain migration work; this document does not claim that every integration has been certified against a user-supplied API.

Recovery tools may use the pinned upstream checkout or golden output once to derive explicitly committed metadata/runtime assets. Ordinary Nift builds use the recovered data and authored corpus. Caches under `build/faithful` and `.nift` are accelerators and must be tested absent before final reproducibility is claimed.
