# Faithful migration closure status

The initial 1,285 authored bodies and five supplemental bodies are connected, plus 51 listing layouts. Every one of the 1,347 routes is classified. Source connection is distinct from whole-page/runtime completion. Supplemental source paths, roles and Nift representation are in `evidence/supplemental-template-inventory.json`.

Head recovery is complete: 814 web and 529 docs heads regenerate from actual authored source or deterministic source-derived metadata, using 28 shared output templates. All 1,347 parsed heads are byte identical, including four retained compatibility redirects. No normal-build per-page frozen metadata fallback remains. See `METADATA-RECOVERY.md`. No further optional structural extraction is planned.

The strict gate passes all 1,347 routes / 3,876 files with zero introduced issues after supplemental bodies and head extraction. This does not certify all browser mechanisms. A paired warm build check found medians 4.49s before / 4.40s after extraction, avoiding attribution of noisy earlier samples to a regression. Final repeated benchmarks are complete; see `FAITHFUL-FINAL-REPORT.md`.

## Explicit runtime limitations

The signing tools call relative `/api/tools/android-keystore-generator`, `/api/tools/ios-certificate-generator`, and `/api/tools/ios-udid-finder/profile`. The current runtime server exposes the earlier capabilities contract, not these original route contracts. The static preview has no backend. These endpoints are **not operationally verified** and remain documented residual backend limitations. The iOS certificate converter uses a retained browser controller and local file conversion; successful file conversion remains unverified.

The pricing calculator initially remained loading, but later settled identically to the reference for the checked 100,000-MAU monthly Team example ($99). Its complete API surface is not certified. Metrics success, registration/signing/device workflows and browser certificate conversion retain the explicit limitations in `RUNTIME-INTEGRATIONS.md`.


## Clean-checkout gate passed

Independent clone `2f8dae1a` regenerated all intermediates without copied caches or global MDX dependencies. Full route/file parity and head parity pass. The tracked input audit passes for all 1,347 wrappers and 7,775 required includes. See `CLEAN-CHECKOUT.md` and raw `evidence/clean-checkout/` logs. Generated Nift hashes and locks were removed from tracking.

Runtime/API integrations are now explicitly classified in `RUNTIME-INTEGRATIONS.md`; several external/private services and original signing backends remain residual limitations. Representative browser checks and their residual limitations are recorded in `BROWSER-VERIFICATION.md`. The faithful frontend architecture is now frozen: only correctness, reproducibility and benchmark-methodology fixes are allowed. Repeated final benchmarks and the faithful report are complete. Agent implementation is now the primary project. Backend services and successful browser certificate conversion are disclosed limitations, not completed functionality.
