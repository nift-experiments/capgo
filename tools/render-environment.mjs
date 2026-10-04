// These launch/profiling controls do not participate in authored content rendering.
// Preserve all application variables so environment-dependent adapters still invalidate.
for (const name of ['_','SHLVL','NIFT','NIFT_BUILD_THREADS','BUILD_PROFILE','npm_lifecycle_event','npm_lifecycle_script','npm_execpath','npm_node_execpath']) delete process.env[name];
