// Faithful source component family, rendered as plain HTML for Nift.
import{readFile}from'node:fs/promises';import{build}from'esbuild';import{copy}from'./render-blog-cta.mjs';import{renderAuthored,authoredHtml,Fragment}from'./authored-template.mjs';
const bundled=await build({entryPoints:['corpus/authored/apps/web/src/lib/ldJson.ts'],bundle:true,write:false,platform:'node',format:'esm'}),schemas=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].contents).toString('base64'));
const app=await readFile('corpus/authored/apps/web/src/config/app.ts','utf8'),blogDescription=app.match(/const blogDescription = '([^']+)'/)?.[1];if(!blogDescription)throw Error('Unsupported authored runtime config');
const m=new Proxy({}, {get:(_,key)=>{if(!Object.hasOwn(copy,key))throw Error('Unknown authored English message '+String(key));return(args={})=>Object.entries(args).reduce((text,[name,value])=>text.replaceAll('{'+name+'}',String(value)),copy[key])}});
const linkBundle=await build({entryPoints:['corpus/authored/apps/web/src/services/links.ts'],bundle:true,write:false,platform:'node',format:'esm',plugins:[{name:'english-locale',setup(b){b.onResolve({filter:/^astro:i18n$/},()=>({path:'english',namespace:'locale'}));b.onLoad({filter:/.*/,namespace:'locale'},()=>({contents:"export const getRelativeLocaleUrl=(locale,path)=>{if(locale!=='en')throw Error('Unsupported locale');return path}",loader:'js'}))}}]}),links=await import('data:text/javascript;base64,'+Buffer.from(linkBundle.outputFiles[0].contents).toString('base64'));
export async function renderConversion(source,route){
 const Astro={props:{},locals:{locale:'en',runtimeConfig:{public:{brand:'Capgo',baseUrl:'https://capgo.app',blog_description:blogDescription}}},url:new URL(route,'https://capgo.app')};
 const modules={'@/copy/messages':{default:m},'@/services/links':links,'@/lib/ldJson':schemas,'@/layouts/Layout.astro':{default:props=>Fragment(props)}};
 for(const [name,path]of [['HumanSupport','components/HumanSupport.astro'],['ConversionRelatedLinks','components/conversion/ConversionRelatedLinks.astro'],['ConversionLandingLayout','components/conversion/ConversionLandingLayout.astro']])modules['@/'+path]={default:async props=>authoredHtml(await renderAuthored('corpus/authored/apps/web/src/'+path,{...Astro,props},modules))};
 return renderAuthored(source,Astro,modules);
}
