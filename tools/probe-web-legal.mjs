// Verify the bounded legal family independently against the immutable reference.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {parse} from 'parse5';
import {semantic} from './html-parity.mjs';
import {renderLegal} from './render-legal.mjs';
const results=[];
for(const name of ['aup','disclaimer','dp','dpa','eula','return','sla','support-policy','tos','privacy']){
 const source=`corpus/authored/apps/web/src/pages/${name}.astro`,file=`${name}/index.html`,raw=await readFile(source,'utf8'),golden=await readFile('golden/site/'+file,'utf8'),html=renderLegal(raw,source),found=[];
 function visit(n){if(n.tagName==='div'&&n.attrs?.some(a=>a.name==='class'&&a.value.split(' ').includes('prose-sm')))found.push(n);for(const c of n.childNodes??[])visit(c)}
 visit(parse(golden,{sourceCodeLocationInfo:true}));if(found.length!==1)throw Error('Expected one legal body '+file);
 const l=found[0].sourceCodeLocation,matches=semantic(html)===semantic(golden.slice(l.startOffset,l.endOffset));
 results.push({route:`/${name}/`,source,sourceSha256:createHash('sha256').update(raw).digest('hex'),file,bodyStart:l.startOffset,bodyEnd:l.endOffset,matches,family:'legal'});
 await mkdir(`build/faithful/web/${name}`,{recursive:true});await writeFile('build/faithful/web/'+file,html);
}
await writeFile('evidence/mdx/web-legal-cohort.json',JSON.stringify({eligible:results.length,matched:results.filter(r=>r.matches).length,results},null,2)+'\n');
console.log(JSON.stringify({eligible:results.length,matched:results.filter(r=>r.matches).length}));
if(results.some(r=>!r.matches))process.exitCode=1;
