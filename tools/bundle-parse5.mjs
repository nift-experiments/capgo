// One-time adapter dependency bundling; never part of normal site builds.
import {build} from 'esbuild';
await build({
  entryPoints:['node_modules/parse5/dist/index.js'],
  bundle:true,
  platform:'node',
  format:'esm',
  minify:true,
  legalComments:'none',
  outfile:process.argv[2]??'vendor/parse5.mjs',
  banner:{js:'// parse5 7.3.0 with entities 6.0.1, bundled as ESM for the bounded MDX adapter import graph.\n// MIT licenses: parse5.LICENSE and entities.LICENSE.'},
});
