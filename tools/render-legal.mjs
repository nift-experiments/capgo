// Bounded source adapter for the English legal template family. Unknown syntax fails.
// The original templates and English message corpus remain the authored inputs.
import {copy} from './render-blog-cta.mjs';
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function renderLegal(raw,source){
 let html=raw.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'').trim();
 html=html.replace(/^<Layout content=\{content\}\s*>/,'').replace(/<\/Layout>$/,'');
 html=html.replace(/\{\s*Astro\.locals\.locale !== defaultLocale && \(\s*<span class="text-xs">[\s\S]*?<\/span>\s*\)\s*\}/g,'');
 const expression=/\{m\.(\w+)\(\{\}, \{ locale: Astro\.locals\.locale \}\)(?:\.replace\('\$1', (brand|domain)\))?\}/g;
 function value(key,replacement){if(!Object.hasOwn(copy,key))throw Error('Unknown legal copy '+key);return replacement?copy[key].replace('$1',replacement==='brand'?'Capgo':source.endsWith('/dp.astro')?'':'https://capgo.app'):copy[key]}
 // set:html in the authored template intentionally inserts markup rather than text.
 html=html.replace(/<([a-z]+) set:html=\{m\.(\w+)\(\{\}, \{ locale: Astro\.locals\.locale \}\)\}\s*\/>/g,(_,tag,key)=>`<${tag}>${value(key)}</${tag}>`);
 html=html.replace(/<p set:html=\{m\.application_definition\(\{ brand: config\.public\.brand \}, \{ locale: Astro\.locals\.locale \}\)\}\s*\/>/g,()=>`<p>${copy.application_definition.replaceAll('{brand}','Capgo')}</p>`);
 html=html.replace(/<p set:html=\{m\.privacy_contact_us_website\(\{\}, \{ locale: Astro\.locals\.locale \}\)\.replace\('\$1', `<a href='\$\{domain\}\/#support' target='_blank'>\$\{domain\}\/#support<\/a>`\)\}\s*\/>/g,()=>`<p>${copy.privacy_contact_us_website.replace('$1',"<a href='https://capgo.app/#support' target='_blank'>https://capgo.app/#support</a>")}</p>`);
 html=html.replaceAll('href={`${domain}/#support`}','href="https://capgo.app/#support"');
 html=html.replace(expression,(_,key,replacement)=>escape(value(key,replacement))).replaceAll('{domain}',escape(source.endsWith('/dp.astro')?'':'https://capgo.app')).replaceAll('{brand}','Capgo');
 if(/[{}]|<\/?[A-Z]|set:html/.test(html))throw Error('Unsupported legal template syntax: '+source+' '+html.match(/.{0,25}(?:[{}]|<\/?[A-Z]|set:html).{0,60}/)?.[0]);
 return html.trim();
}
