// Direct Nift builds prepare authored content before page rendering begins.
import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {openSync,writeSync,closeSync} from 'node:fs';
// Nift run() captures stdout. Relay interactive progress to the controlling
// terminal; redirected/CI builds retain their ordinary captured output.
let terminal;
if(process.stdin.isTTY){try{terminal=openSync(process.platform==='win32'?'CONOUT$':'/dev/tty','w');}catch{}}
function output(chunk,error=false){if(terminal!==undefined)writeSync(terminal,chunk);else (error?process.stderr:process.stdout).write(chunk);}
const options=JSON.parse(await readFile('.nift/mdx-render.json'));
const commands=options.rehypePlugins.some(p=>p.path==='components/faithful/code-blocks.mjs')?['tools/prepare-code-cohort.mjs','tools/prepare-faithful.mjs']:['tools/prepare-faithful.mjs'];
let exitCode=0;
try{for(const path of commands){const started=Date.now();output('Preparing '+path+'...\n');const child=spawn(process.execPath,[path],{stdio:['inherit','pipe','pipe']});child.stdout.on('data',chunk=>output(chunk));child.stderr.on('data',chunk=>output(chunk,true));const heartbeat=setInterval(()=>output('Still preparing authored MDX ('+Math.round((Date.now()-started)/1000)+'s); page rendering starts afterward.\n'),10000);heartbeat.unref();try{exitCode=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',code=>resolve(code??1));});}finally{clearInterval(heartbeat);}if(exitCode!==0)break;}}finally{if(terminal!==undefined)closeSync(terminal);}
process.exitCode=exitCode;
