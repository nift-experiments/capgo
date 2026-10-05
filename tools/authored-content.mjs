// Bounded Astro content API adapter backed by the committed authored corpus.
import{readFile}from'node:fs/promises';import yaml from'js-yaml';
const manifest=JSON.parse(await readFile('data/corpus-manifest.json')).records;
export const docsGlobPaths=manifest.filter(r=>r.family==='docs').map(r=>r.source.replace('apps/docs/src/content/docs/','')).filter(p=>/\/plugins\/[^/]+\/index\.mdx?$/.test(p));
export async function getCollection(name,filter=()=>true){if(name!=='plugin')throw Error('Unsupported authored collection '+name);const rows=await Promise.all(manifest.filter(r=>r.family==='plugin').map(async r=>{const raw=await readFile('corpus/authored/'+r.source,'utf8'),front=raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);if(!front)throw Error('Missing plugin frontmatter '+r.source);return{filePath:r.source,data:yaml.load(front[1])}}));return rows.filter(filter)}
