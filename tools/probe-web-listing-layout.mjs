import{readFile,writeFile,mkdir}from'node:fs/promises';
import{parse}from'parse5';import{semantic}from'./html-parity.mjs';import{blogPosts,renderBlogListing}from'./render-blog-listing.mjs';
const posts=await blogPosts(),routes=JSON.parse(await readFile('golden/routes.json')).filter(r=>/^\/(blog|articles)\/(?:category\/[^/]+\/)?$/.test(r.route)),results=[];
for(const r of routes){
 const golden=await readFile('golden/site/'+r.file,'utf8');let found;
 function visit(n){if(n.attrs?.some(a=>a.name==='class'&&a.value==='product-hero flex w-full flex-col items-center py-8'))found=n;for(const c of n.childNodes??[])visit(c)}visit(parse(golden,{sourceCodeLocationInfo:true}));
 if(!found)throw Error('Missing listing grid '+r.file);
 const l=found.sourceCodeLocation,g=golden.slice(l.startOffset,l.endOffset),html=await renderBlogListing(posts,r.route),matches=semantic(g)===semantic(html);
 results.push({route:r.route,file:r.file,matches,bodyStart:l.startOffset,bodyEnd:l.endOffset,family:'blog-listing',source:'corpus/authored/apps/web/src/components/BlogListing.astro'});
 await mkdir('build/faithful/web/'+r.file.slice(0,r.file.lastIndexOf('/')),{recursive:true});await writeFile('build/faithful/web/'+r.file,html);
 if(!matches){const a=JSON.parse(semantic(html)),b=JSON.parse(semantic(g)),i=a.findIndex((r,i)=>JSON.stringify(r)!==JSON.stringify(b[i]));console.log(JSON.stringify({route:r.route,index:i,actual:a.slice(i,i+1),expected:b.slice(i,i+1)}))}
}
await writeFile('evidence/mdx/web-listing-layout-cohort.json',JSON.stringify({eligible:routes.length,matched:results.filter(r=>r.matches).length,results},null,2)+'\n');
console.log(JSON.stringify({posts:posts.length,routes:routes.length,matched:results.filter(r=>r.matches).length}));if(results.some(r=>!r.matches))process.exitCode=1;
