// Faithful Starlight component markup. Scoped tokens preserve the pinned upstream CSS.
import tabsRestore from './tabs-restore.mjs';
import tabRuntime from './tabs-runtime.mjs';
import iconTrees from './icon-trees.mjs';
export function components({element:h}){
 const cell=tag=>({style,niftAlignment,...props})=>{if(niftAlignment)return h(tag,{...props,style});if(style?.textAlign){props.align=style.textAlign;const rest={...style};delete rest.textAlign;if(Object.keys(rest).length)props.style=rest;}else if(style)props.style=style;return h(tag,props)};
 const ast=node=>h(node.data.hName,Object.fromEntries(Object.entries(node.data.hProperties).map(([key,value])=>[key,Array.isArray(value)?value.join(' '):value])),...node.children.map(ast));
 const Icon=({name,className='',size='1em'})=>{return h('svg',{'aria-hidden':'true',className:(className+' astro-7kyxvqbk').trim(),width:16,height:16,viewBox:'0 0 24 24',fill:'currentColor',style:{'--sl-icon-size':size}},...(iconTrees[name]??[]).map(ast));};
 const Aside=({type='note',title,icon,children})=>{const variants={note:['Note','information'],tip:['Tip','rocket'],caution:['Caution','warning'],danger:['Danger','error']};if(!variants[type])throw Error('Invalid Starlight aside '+type);title??=variants[type][0];return h('aside',{'aria-label':title,className:'starlight-aside starlight-aside--'+type},h('p',{className:'starlight-aside__title','aria-hidden':'true'},Icon({name:icon??variants[type][1],className:'starlight-aside__icon'}),title),h('div',{className:'starlight-aside__content'},children));};
 const Card=({title,icon,children})=>h('article',{className:'card sl-flex astro-ca73yafj'},h('p',{className:'title sl-flex astro-ca73yafj'},icon?Icon({name:icon,className:'icon astro-ca73yafj',size:'1.333em'}):null,h('span',{className:'astro-ca73yafj',dangerouslySetInnerHTML:{__html:title}})),h('div',{className:'body astro-ca73yafj'},children));
 const CardGrid=({stagger=false,children})=>h('div',{className:'card-grid'+(stagger?' stagger':'')+' astro-tr2husg2'},children);
 const LinkCard=({title,description,...attributes})=>h('div',{className:'sl-link-card astro-hxqtoujl'},h('span',{className:'sl-flex stack astro-hxqtoujl'},h('a',{...attributes,className:((attributes.className??attributes.class??'')+' astro-hxqtoujl').trim()},h('span',{className:'title astro-hxqtoujl',dangerouslySetInnerHTML:{__html:title}})),description?h('span',{className:'description astro-hxqtoujl',dangerouslySetInnerHTML:{__html:description}}):null),Icon({name:'right-arrow',className:'icon rtl:flip astro-hxqtoujl',size:'1.333em'}));
 const Steps=({children})=>{let elements=(Array.isArray(children)?children:[children]).filter(x=>x&&typeof x==='object'&&x.type!=='script');if(elements.length!==1||elements[0].type!=='ol')throw Error('Steps requires one ordered list');const list=elements[0],props={...list.props,role:'list',className:((list.props.className??'')+' sl-steps').trim()};if(props.start)props.style={...props.style,'--sl-steps-start':props.start-1};return h('ol',props)};
 const items=value=>(Array.isArray(value)?value:[value]).flatMap(x=>Array.isArray(x)?items(x):x?[x]:[]);
 function focusable(value){return items(value).some(node=>{
  if(typeof node!=='object')return false;
  const p=node.props??{};
  if(p.dangerouslySetInnerHTML)return /<(?:button|a\s[^>]*href|input|select|textarea|iframe)\b/.test(p.dangerouslySetInnerHTML.__html);
  if(!p.hidden&&!p.disabled&&p.tabIndex!==-1&&(['button','select','textarea','iframe','object','embed','summary'].includes(node.type)||node.type==='a'&&p.href||node.type==='input'&&p.type!=='hidden'||p.tabIndex!==undefined))return true;
  return focusable(p.children);
 });}
 const TabItem=({children})=>h('div',null,children);
 const Tabs=({syncKey,niftTabIndex,niftRestoreScript,children})=>{
  const instance=Number(niftTabIndex),panels=items(children).filter(x=>x&&typeof x==='object'&&(x.type===TabItem||x.props?.niftTabItem));
  if(!panels.length)throw Error('Tabs requires TabItem children');
  const cls='astro-jyuni4a6';
  return [niftRestoreScript?h('script',{key:'restore',dangerouslySetInnerHTML:{__html:tabsRestore}}):null,h('starlight-tabs',{className:cls,key:'tabs','data-sync-key':syncKey},h('div',{className:'tablist-wrapper not-content '+cls},h('ul',{role:'tablist',className:cls},...panels.map((panel,index)=>h('li',{role:'presentation',className:'tab '+cls,key:index},h('a',{role:'tab',href:'#tab-panel-'+instance+'-'+index,id:'tab-'+instance+'-'+index,'aria-selected':index===0?'true':'false',tabIndex:index===0?0:-1,className:cls},panel.props.icon?Icon({name:panel.props.icon,className:cls}):null,panel.props.label))))),...panels.map((panel,index)=>h('div',{key:index,id:'tab-panel-'+instance+'-'+index,'aria-labelledby':'tab-'+instance+'-'+index,role:'tabpanel',hidden:index!==0,tabIndex:focusable(panel.props.children)?undefined:0},panel.props.children)),syncKey?h('starlight-tabs-restore',{key:'restore-element',className:cls}):null),instance===0?h('script',{key:'controller',type:'module',dangerouslySetInnerHTML:{__html:tabRuntime}}):null];
 };
 const FileTree=({niftFileTreeHtml})=>h('starlight-file-tree',{className:'not-content astro-hcukmjby','data-pagefind-ignore':'true',dangerouslySetInnerHTML:{__html:niftFileTreeHtml}});
 return {FileTree,NativeTh:props=>h('th',props),NativeTd:props=>h('td',props),th:cell('th'),td:cell('td'),Aside,Card,CardGrid,LinkCard,Steps,Tabs,TabItem};
}
