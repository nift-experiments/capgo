// Source-derived Blog.astro adapter. Cards regenerate from authored frontmatter.
import {readFile,readdir} from 'node:fs/promises';
import {load} from 'js-yaml';
import{slug}from'../vendor/github-slugger/index.mjs';
import{copy}from'./render-blog-cta.mjs';
const cardSource=await readFile('corpus/authored/apps/web/src/components/Blog.astro','utf8');
const escape=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const month=['January','February','March','April','May','June','July','August','September','October','November','December'];
export async function blogPosts(){const root='corpus/authored/apps/web/src/content/blog/en/';const posts=[];for(const name of await readdir(root)){if(!/\.mdx?$/.test(name))continue;const raw=await readFile(root+name,'utf8'),front=raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);if(!front)throw Error('Missing blog metadata '+name);const data=load(front[1]);if(data.published!==false&&data.locale==='en')posts.push({source:root+name,data})}return posts}
function renderCard(data,index){
 const tags=data.tag.split(',').map(t=>t.trim()).filter(Boolean),visible=tags.slice(0,2),hidden=tags.length-visible.length;
 let html=cardSource.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,'');
 html=html.replace(/\{visibleTags\.map\(\(tag\) => \(\s*([\s\S]*?)\s*\)\)\}/,(_,template)=>visible.map(tag=>template.replaceAll('{tag}',escape(tag))).join(''));
 html=html.replace(/\{hiddenCount > 0 && \(\s*([\s\S]*?)\s*\)\}/,(_,template)=>hidden?template.replaceAll('{hiddenCount}',String(hidden)):'');
 html=html.replaceAll('href={cannLink}',`href="/blog/${escape(data.slug)}/"`).replaceAll('aria-label={props.title}',`aria-label="${escape(data.title)}"`).replaceAll('alt={props.title}',`alt="${escape(data.title)}"`).replaceAll('{props.title}',escape(data.title)).replaceAll('{props.image}',`"${escape(data.head_image)}"`).replaceAll("{props.loading || 'lazy'}",`"${index<3?'eager':'lazy'}"`);
 const formatted=new Intl.DateTimeFormat('en-US',{timeZone:'Australia/Melbourne',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(data.created_at)),parts=['year','month','day'].map(k=>formatted.find(p=>p.type===k).value);
 html=html.replaceAll('{formatTime(props.date)}',`${month[Number(parts[1])-1]} ${parts[2]}, ${parts[0]}`);
 if(/[{}]|<\/?[A-Z]/.test(html))throw Error('Unsupported Blog.astro syntax');
 return `<div data-blog-card data-search="${escape(`${data.title} ${data.tag}`.toLowerCase())}">${html.trim()}</div>`;
}
export function renderBlogGrid(posts,route){const origin=route.startsWith('/articles/')?'ai':'human',category=route.match(/\/category\/([^/]+)/)?.[1];const selected=posts.filter(p=>(p.data.origin??'ai')===origin&&(!category||p.data.tag.split(',').some(t=>slug(t.trim())===category))).sort((a,b)=>new Date(a.data.created_at)>new Date(b.data.created_at)?-1:1);return selected.map((p,i)=>renderCard(p.data,i)).join('')}
export async function renderBlogListing(posts,route){
 const base=route.startsWith('/articles/')?'articles':'blog',origin=base==='articles'?'ai':'human',active=route.match(/\/category\/([^/]+)/)?.[1],selected=posts.filter(p=>(p.data.origin??'ai')===origin),counts=new Map();
 for(const p of selected)for(const tag of p.data.tag.split(',').map(t=>t.trim()).filter(Boolean))counts.set(tag,(counts.get(tag)??0)+1);
 const categories=[['All articles',selected.length,null],...[...counts].sort(([a],[b])=>a.localeCompare(b)).map(([tag,count])=>[tag,count,slug(tag)])];
 const listingSource=await readFile('corpus/authored/apps/web/src/components/BlogListing.astro','utf8'),classes=listingSource.match(/class:list=\{\[\s*'([^']+)',\s*!currentCategory \? '([^']+)' : '([^']+)'/);
 if(!classes)throw Error('Unsupported authored category classes');
 const url=category=>'/'+base+'/'+(category?'category/'+category+'/':''),isActive=category=>(category??undefined)===active;
 const options=categories.map(([tag,count,category])=>`<option value="${url(category)}"${isActive(category)?' selected=""':''}>${escape(tag)} (${count})</option>`).join('');
 const links=categories.map(([tag,count,category])=>`<a href="${url(category)}" class="${classes[1]} ${isActive(category)?classes[2]:classes[3]}"${isActive(category)?' aria-current="page"':''}><span>${escape(tag)}</span><span class="text-xs text-gray-400 tabular-nums">${count}</span></a>`).join('');
 const config=await readFile('corpus/authored/apps/web/src/config/app.ts','utf8'),description=config.match(/const blogDescription = '([^']+)'/)?.[1];if(!description)throw Error('Unsupported authored blog description');
 const values={heading:escape(base==='articles'?copy.latest_from_articles:copy.latest_from_the_blog),description:escape(base==='articles'?copy.articles_description:description),options,categories:links,grid:renderBlogGrid(posts,route)};
 let template=await readFile('migration/templates/blog-listing.html','utf8');for(const [name,value]of Object.entries(values))template=template.replace('__NIFT_LISTING_'+name.toUpperCase()+'__',()=>value);if(template.includes('__NIFT_LISTING_'))throw Error('Missing listing template value');return template;
}
