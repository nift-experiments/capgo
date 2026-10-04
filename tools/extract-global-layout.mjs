// One-time, verified recovery of global layouts. Normal builds never rerun this migration.
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';import {dirname} from 'node:path';import {createHash} from 'node:crypto';
const structure=JSON.parse(await readFile('migration/structure.json')),report=[];
const header=structure.includes.filter(x=>x.kind==='header').sort((a,b)=>b.uses-a.uses)[0];const headerPath='migration/templates/global-header.html';await copyFile(header.path,headerPath);
const groups=new Map();
for(const page of structure.pages){let p='migration/pages/'+page.file,wrapper=await readFile(p,'utf8');wrapper=wrapper.replaceAll(JSON.stringify(header.path),JSON.stringify(headerPath));
 for(const part of page.parts.filter(x=>x.kind==='footer')){const source=await readFile(part.path,'utf8');if(!source.includes('id="language-dropdown"'))continue;const values=[];const template=source.replace(/href="([^"]*)" id="language_([^"]+)"/g,(match,href,lang)=>{const token='__NIFT_LANGUAGE_'+lang+'__';values.push({token,href});return match.replace(href,token)});if(values.length!==9)throw Error('Unexpected language menu in '+page.route);const digest=createHash('sha256').update(template).digest('hex');const target='migration/templates/footer-'+digest.slice(0,16)+'.html';if(!groups.has(target)){await writeFile(target,template);groups.set(target,{path:target,uses:0,bytes:Buffer.byteLength(template)})}groups.get(target).uses++;
 let expression='open('+JSON.stringify(target)+')';for(const v of values)expression+='.replace('+JSON.stringify(v.token)+','+JSON.stringify(v.href)+')';
 const before='$[open('+JSON.stringify(part.path)+')]';if(!wrapper.includes(before))throw Error('Missing footer reference: '+page.route);wrapper=wrapper.replace(before,'$['+expression+']');report.push({route:page.route,template:target,values});
 }
 await writeFile(p,wrapper);
}
const result={globalHeader:{path:headerPath,uses:header.uses},footers:Array.from(groups.values()),pageValues:report};await mkdir('evidence/parity',{recursive:true});await writeFile('migration/global-layout.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({headerUses:header.uses,footerTemplates:groups.size,footerPages:report.length,footerBytesSaved:Array.from(groups.values()).reduce((n,x)=>n+(x.uses-1)*x.bytes,0)}));
