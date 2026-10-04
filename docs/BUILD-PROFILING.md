# Local build profiling

Run `NIFT=/path/to/nift npm run build -- --all` for a full build. Normal builds use up to four Nift workers, bounded by available CPU parallelism. Override with `NIFT_BUILD_THREADS=1` for controlled single-worker comparisons.

Set `BUILD_PROFILE=1` to print reference verification, configuration, asset verification, Nift compilation and output verification timings. `/usr/bin/time -v` around the command measures total wall time and maximum resident set size. These checks preserve every golden/output SHA check; faster builds do not skip parity validation.

The 5 October Phase 5 profile is in `evidence/build-progress/2026-10-05-thread-profile.json`. Runs were sequential with existing filesystem caches. Shared docs templates add rendering work relative to opaque HTML copying; removing the one-worker restriction reduced elapsed time without reverting extraction. MDX reconnection and final benchmark phases remain pending.
