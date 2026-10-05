// One-time migration recovery. Normal builds never read golden output.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {parse} from 'parse5';
const hash=v=>createHash('sha256').update(v).digest('hex');
const golden=await readFile('golden/site/index.html','utf8'),scripts=[];
function visit(n){if(n.tagName==='script'&&n.attrs.some(a=>a.name==='type'&&a.value==='module')&&!n.attrs.some(a=>a.name==='src'))scripts.push(n.childNodes.map(x=>x.value??'').join(''));for(const c of n.childNodes??[])visit(c)}visit(parse(golden));
const records={};for(const [name,marker] of [['Hero','hero-whatsnew-pill'],['ProblemSolution','data-scroll-chat-section'],['TransparencySection','data-transparency'],['AskAiSection','data-ask-ai']]){const source='corpus/authored/apps/web/src/components/'+name+'.astro',matches=scripts.filter(s=>s.includes(marker));if(matches.length!==1)throw Error('Expected one controller for '+name);records[source]={sourceSha256:hash(await readFile(source)),code:matches[0],controllerSha256:hash(matches[0])};}
await writeFile('data/faithful-inline-controllers.json',JSON.stringify({provenance:'Inline browser controllers retained from pinned production output; component HTML remains authored-source generated.',reference:'7d5b69d6ba8a6630384dffc7d012431ee3ed22ec',records},null,2)+'\n');
