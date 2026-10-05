import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {verify} from './golden.mjs';
import {semantic} from './html-parity.mjs';
export async function verifyOutput(root='public'){
 const result=await verify(root);let sources=[];try{sources=JSON.parse(await readFile('migration/mdx-sources.json')).sources}catch(e){if(e.code!=='ENOENT')throw e}
 let web=[];try{web=JSON.parse(await readFile('migration/web-sources.json')).sources}catch(e){if(e.code!=='ENOENT')throw e}sources.push(...web);
 const allowed=new Map(sources.map(x=>[x.file,x])),semanticMatches=[],errors=[];
 for(const error of result.errors){if(error.reason!=='content differs'||!allowed.has(error.path)){errors.push(error);continue}const golden=await readFile(resolve('golden/site',error.path),'utf8'),rendered=await readFile(resolve(root,error.path),'utf8');const source=allowed.get(error.path),prefix=golden.slice(0,source.bodyStart),suffix=golden.slice(source.bodyEnd);const shellMatches=rendered.startsWith(prefix)&&rendered.endsWith(suffix);const goldenBody=golden.slice(source.bodyStart,source.bodyEnd),renderedBody=rendered.slice(prefix.length,rendered.length-suffix.length);if(!shellMatches||semantic(goldenBody)!==semantic(renderedBody))errors.push({...error,reason:'Source-rendered document DOM differs'});else semanticMatches.push(error.path)}
 return {...result,errors,semanticMatches};
}
