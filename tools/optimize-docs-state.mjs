// One-time refinement of extracted docs state; never rewrites maintained templates during builds.
import {readFile,writeFile} from 'node:fs/promises';
const shell=JSON.parse(await readFile('migration/docs-shell.json'));
const maps=new Map();
for(const template of new Set(shell.pages.flatMap(p=>p.parts.map(x=>x.template)))){
 const text=await readFile(template,'utf8'),map={};let index=0;
 for(const m of text.matchAll(/<details(?=\s|>)/g)){
  let size=256,from=text.slice(m.index,m.index+size);
  while(text.split(from).length!==2){size+=128;from=text.slice(m.index,m.index+size);if(size>text.length)throw Error('Nonunique docs state');}
  map['OPEN_'+index++]=[from,from.replace(/^<details/,'<details open')];
 }
 for(const m of text.matchAll(/<a\b[^>]*href="\/docs\/[^"\n]*"[^>]*>/g)){let size=m[0].length,from=m[0];while(text.split(from).length!==2){size+=128;from=text.slice(m.index,m.index+size);if(size>text.length)throw Error('Nonunique current link');}map['CURRENT_'+index++]=[from,from.replace(/(href="[^"]*")/,'$1 aria-current="page"')];}
 maps.set(template,map);
}
for(const p of shell.pages){let wrapper=await readFile('migration/pages/'+p.file,'utf8');for(const part of p.parts){const pairs=[];for(const [key,value] of Object.entries(part.state)){if(key.startsWith('LANGUAGE_'))pairs.push(['__NIFT_DOCS_'+key+'__',value]);else {if(!maps.get(part.template)[key])throw Error(key);pairs.push(maps.get(part.template)[key]);}}
 const old='render_docs_shell('+JSON.stringify(part.template)+','+JSON.stringify(part.replacements)+')';const replacement='render_docs_shell('+JSON.stringify(part.template)+','+JSON.stringify(pairs)+')';if(!wrapper.includes(old))throw Error(p.file);wrapper=wrapper.replace(old,replacement);part.replacements=pairs;}
 await writeFile('migration/pages/'+p.file,wrapper);
}
await writeFile('migration/docs-shell.json',JSON.stringify(shell,null,2)+'\n');
