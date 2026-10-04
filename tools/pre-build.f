result := run("node", "tools/pre-build.mjs")
if(result.stdout != "") { print(result.stdout) }
if(result.exit_code != 0) { throw error("MDX preparation failed: " + result.stderr, "user.mdx_prebuild") }
