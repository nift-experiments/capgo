// One-time connection of verified recovered Nift layouts, preserving shared global shell.
import{readFile,writeFile}from'node:fs/promises';
const report=JSON.parse(await readFile('evidence/mdx/web-listing-layout-cohort.json'));if(report.results.length!==51||report.results.some(r=>!r.matches))throw Error('All listing layouts must verify before recovery');
const registry=JSON.parse(await readFile('migration/web-sources.json')),plans=[];
for(const row of report.results){
 const old=registry.sources.find(r=>r.file===row.file);if(old?.family==='blog-listing')continue;if(old?.family!=='blog-grid')throw Error('Expected connected grid '+row.file);
 const wrapperPath='migration/pages/'+row.file,wrapper=await readFile(wrapperPath,'utf8'),golden=await readFile('golden/site/'+row.file,'utf8'),first='migration/fragments/'+row.file+'.2.html',last='migration/fragments/'+row.file+'.3.html',a=await readFile(first,'utf8'),b=await readFile(last,'utf8'),aStart=golden.indexOf(a),bStart=golden.indexOf(b);
 if(aStart<0||bStart<0||row.bodyStart<aStart||row.bodyStart>aStart+a.length||row.bodyEnd<bStart||row.bodyEnd>bStart+b.length)throw Error('Unexpected shell boundaries '+row.file);
 const firstRef='$[open('+JSON.stringify(first)+')]',lastRef='$[open('+JSON.stringify(last+'.after-web.html')+')]',start=wrapper.indexOf(firstRef),end=wrapper.indexOf(lastRef)+lastRef.length;if(start<0||end<lastRef.length||end<=start)throw Error('Unexpected wrapper '+row.file);
 const before=first+'.before-listing.html',after=last+'.after-listing.html',replacement='$[open('+JSON.stringify(before)+')]$[open('+JSON.stringify('build/faithful/web/'+row.file)+')]$[open('+JSON.stringify(after)+')]';
 plans.push({row,wrapperPath,wrapper:wrapper.slice(0,start)+replacement+wrapper.slice(end),before,beforeHtml:a.slice(0,row.bodyStart-aStart),after,afterHtml:b.slice(row.bodyEnd-bStart)});
}
for(const p of plans){await writeFile(p.before,p.beforeHtml);await writeFile(p.after,p.afterHtml);await writeFile(p.wrapperPath,p.wrapper);registry.sources[registry.sources.findIndex(r=>r.file===p.row.file)]=p.row}
await writeFile('migration/web-sources.json',JSON.stringify(registry,null,2)+'\n');console.log(JSON.stringify({connectedListingLayouts:plans.length}));
