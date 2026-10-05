import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {renderAuthored} from '../tools/authored-template.mjs';
const root=await mkdtemp(join(tmpdir(),'authored-whitespace-'));
try{
 const path=join(root,'inline.astro');
 await writeFile(path,'---\nconst name="team";\n---\n<p>\nEnterprise needs?\n<a href="/demo/">Talk to our {name}</a>\n today.\n</p>');
 const html=await renderAuthored(path,{},{});
 assert.match(html,/Enterprise needs\? <a/);
 assert.match(html,/<\/a> today\./);
 assert.match(html,/Talk to our team/);
 const expr=join(root,'expression.astro');
 await writeFile(expr,'---\nconst word="Contact";\n---\n<p>{word}\n<strong>our team</strong>\nnow.</p>');
 assert.equal(await renderAuthored(expr,{},{}),'<p>Contact <strong>our team</strong> now.</p>');
 const conditional=join(root,'conditional.astro');
 await writeFile(conditional,'---\nconst show=true;\n---\n<div>{show ?\n<span>Yes</span> :\n<span>No</span>}</div>');
 assert.equal(await renderAuthored(conditional,{},{}),'<div><span>Yes</span></div>');
 console.log('Authored inline whitespace regression checks passed');
}finally{await rm(root,{recursive:true,force:true});}
