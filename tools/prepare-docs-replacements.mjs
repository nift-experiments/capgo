// One-time migration from token iteration to sparse replacements. Run before optimize-docs-state.mjs, never during normal builds.
import {readFile,writeFile} from 'node:fs/promises';
const root='';
const shell=JSON.parse(await readFile(root+'migration/docs-shell.json'));
const maps=new Map();
for(const template of new Set(shell.pages.flatMap(p=>p.parts.map(x=>x.template)))){
 let text=await readFile(root+template,'utf8'),map={};
 for(const m of text.matchAll(/<details__NIFT_DOCS_OPEN_(\d+)__[\s\S]*?<\/summary>/g))map['OPEN_'+m[1]]=[m[0].replace(/__NIFT_DOCS_OPEN_\d+__/g,''),m[0].replace(/__NIFT_DOCS_OPEN_\d+__/g,' open')];
 for(const m of text.matchAll(/<a\b[^>]*__NIFT_DOCS_CURRENT_(\d+)__[^>]*>/g))map['CURRENT_'+m[1]]=[m[0].replace(/__NIFT_DOCS_CURRENT_\d+__/g,''),m[0].replace(/__NIFT_DOCS_CURRENT_\d+__/g,' aria-current="page"')];
 text=text.replace(/__NIFT_DOCS_(?:OPEN|CURRENT)_\d+__/g,'');
 maps.set(template,map);await writeFile(root+template,text);
}
for(const p of shell.pages){let wrapper=await readFile(root+'migration/pages/'+p.file,'utf8');for(const part of p.parts){const pairs=[];for(const [key,value] of Object.entries(part.state)){if(key.startsWith('LANGUAGE_'))pairs.push(['__NIFT_DOCS_'+key+'__',value]);else {if(!maps.get(part.template)[key])throw Error(key);pairs.push(maps.get(part.template)[key]);}}
 const old='render_docs_shell('+JSON.stringify(part.template)+','+JSON.stringify(part.state)+')';const replacement='render_docs_shell('+JSON.stringify(part.template)+','+JSON.stringify(pairs)+')';if(!wrapper.includes(old))throw Error(p.file);wrapper=wrapper.replace(old,replacement);part.replacements=pairs;}
 await writeFile(root+'migration/pages/'+p.file,wrapper);
}
await writeFile(root+'migration/docs-shell.json',JSON.stringify(shell,null,2)+'\n');
