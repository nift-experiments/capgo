// Direct `nift build` and the npm wrapper share the same authored-content preparation.
import {spawnSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
const options=JSON.parse(await readFile('.nift/mdx-render.json'));
const commands=options.rehypePlugins.some(p=>p.path==='components/faithful/code-blocks.mjs')?['tools/prepare-code-cohort.mjs','tools/prepare-faithful.mjs']:['tools/prepare-faithful.mjs'];
for(const path of commands){const result=spawnSync(process.execPath,[path],{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);}
