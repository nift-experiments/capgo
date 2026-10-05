// Direct Nift builds prepare authored content before page rendering begins.
import {spawn,spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {cpus,availableParallelism} from 'node:os';
import {openSync,writeSync,closeSync} from 'node:fs';
// Nift run() captures stdout. Relay interactive progress to the controlling
// terminal; redirected/CI builds retain their ordinary captured output.
let terminal;
if(process.stdin.isTTY){try{terminal=openSync(process.platform==='win32'?'CONOUT$':'/dev/tty','w');}catch{}}
function output(chunk,error=false){if(terminal!==undefined)writeSync(terminal,chunk);else (error?process.stderr:process.stdout).write(chunk);}
const options=JSON.parse(await readFile('.nift/mdx-render.json'));
const commands=options.rehypePlugins.some(p=>p.path==='components/faithful/code-blocks.mjs')?['tools/prepare-code-cohort.mjs','tools/prepare-faithful.mjs','tools/prepare-web.mjs','tools/prepare-docs-metadata.mjs']:['tools/prepare-faithful.mjs'];
let exitCode=0;const reportPaths={'tools/prepare-code-cohort.mjs':'build/faithful/code-preparation.json','tools/prepare-faithful.mjs':'build/faithful/mdx-preparation.json','tools/prepare-web.mjs':'build/faithful/web-preparation.json'};const phases=[],startedAt=new Date().toISOString();
async function runPhase(path){let phaseExitCode;const started=Date.now();let captured='';output('Preparing '+path+'...\n');const child=spawn(process.execPath,[path],{stdio:['inherit','pipe','pipe']});child.stdout.on('data',chunk=>{captured=(captured+chunk).slice(-65536);output(chunk)});child.stderr.on('data',chunk=>output(chunk,true));const heartbeat=setInterval(()=>output('Still preparing authored content ('+Math.round((Date.now()-started)/1000)+'s); page rendering starts afterward.\n'),10000);heartbeat.unref();try{phaseExitCode=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',code=>resolve(code??1));});}finally{clearInterval(heartbeat);}let reports=captured.split('\n').flatMap(line=>{try{return[JSON.parse(line)]}catch{return[]}});const reportPath=reportPaths[path];if(reportPath){try{if((await stat(reportPath)).mtimeMs>=started)reports=[JSON.parse(await readFile(reportPath,'utf8'))]}catch(e){if(e.code!=='ENOENT')throw e}}phases.push({tool:path,elapsedSeconds:(Date.now()-started)/1000,exitCode:phaseExitCode,reports});return phaseExitCode;}
// Web rendering has no dependency on the docs code cache; keep the two docs
// stages ordered while preparing the independent web content concurrently.
try{
 const web=commands.includes('tools/prepare-web.mjs')?runPhase('tools/prepare-web.mjs'):Promise.resolve(0);
 const metadata=commands.includes('tools/prepare-docs-metadata.mjs')?runPhase('tools/prepare-docs-metadata.mjs'):Promise.resolve(0);
 const docs=(async()=>{for(const path of commands.filter(p=>p!=='tools/prepare-web.mjs'&&p!=='tools/prepare-docs-metadata.mjs')){const code=await runPhase(path);if(code!==0)return code;}return 0})();
 const results=await Promise.allSettled([docs,web,metadata]);for(const r of results){if(r.status==='rejected')throw r.reason;if(r.value!==0)exitCode=r.value;}
}finally{if(terminal!==undefined)closeSync(terminal);}
phases.sort((a,b)=>commands.indexOf(a.tool)-commands.indexOf(b.tool));
const version=spawnSync('nift',['--version'],{encoding:'utf8'}),config=JSON.parse(await readFile('.nift/config.json')),packages=JSON.parse(await readFile('.nift/packages.lock.json'));
await mkdir('build/faithful',{recursive:true});await writeFile('build/faithful/preparation-observation.json',JSON.stringify({startedAt,node:process.version,niftVersion:version.stdout.trim()||'unavailable',niftCommit:'not exposed by installed binary',mdxPackage:packages.packages.mdx,logicalCpus:cpus().length,availableParallelism:availableParallelism(),buildThreads:config.config['build-threads'],preparedCache:'.nift/mdx-prepared',mdxContentCache:'.nift/mdx-cache',mdxCachePolicy:options.cache,codeCache:'build/faithful/code-blocks.json',webCache:'build/faithful/web',phases,note:'Preparation phase timings and conversion/cache counts; overall peak RSS is recorded separately with GNU time. No core instrumentation.'},null,2)+'\n');
process.exitCode=exitCode;
