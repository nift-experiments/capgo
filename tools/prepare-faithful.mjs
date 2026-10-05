import './render-environment.mjs';
// Batch the authored pages currently covered by faithful adapters. Never substitute golden bodies.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {parse} from 'parse5';
import {preparePaths} from '../.nift/packages/mdx/renderer/prepare.mjs';
import {semantic,markdownBody} from './html-parity.mjs';
let connected;try{connected=JSON.parse(await readFile('migration/mdx-sources.json'));}catch(error){if(error.code!=='ENOENT')throw error}
if(connected&&!process.argv.includes('--probe')){
 const options=JSON.parse(await readFile('.nift/mdx-render.json'));
 const result=await preparePaths(connected.sources.map(row=>row.source),options);
 await mkdir('build/faithful',{recursive:true});const observation={prepared:result.prepared,cached:result.cached,pages:connected.sources.length};await writeFile('build/faithful/mdx-preparation.json',JSON.stringify(observation)+'\n');console.log(JSON.stringify(observation));
}else {
const manifest=JSON.parse(await readFile('data/corpus-manifest.json')),options=JSON.parse(await readFile('.nift/mdx-faithful.json')),eligible=[];
for(const row of manifest.records.filter(x=>x.family==='docs')){const source='corpus/authored/'+row.source,body=await readFile(source,'utf8');if(!/^import /m.test(body)&&!body.includes('```')&&!body.includes('~~~')&&!/<[A-Za-z]/.test(body))eligible.push({...row,source});}
const prepared=await preparePaths(eligible.map(x=>x.source),options),results=[];
for(const row of eligible){const rendered=JSON.parse(await readFile('.nift/mdx-prepared/'+row.source+'.json')).html;const golden=markdownBody(await readFile('golden/site/'+row.output,'utf8'));const matches=semantic(rendered)===semantic(golden.html);results.push({route:row.route,source:row.source,file:row.output,matches});}
await mkdir('evidence/mdx',{recursive:true});await writeFile('evidence/mdx/plain-cohort.json',JSON.stringify({prepared:prepared.prepared,cached:prepared.cached,eligible:eligible.length,matched:results.filter(x=>x.matches).length,results},null,2)+'\n');console.log(JSON.stringify({prepared:prepared.prepared,cached:prepared.cached,eligible:eligible.length,matched:results.filter(x=>x.matches).length}));

}
