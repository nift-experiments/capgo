// Preserve authored HTML in Markdown files; MDX JSX retains its component semantics.
// parse5 and entities are MIT licensed; see vendor/*.LICENSE.
import {parseFragment} from '../../vendor/parse5.mjs';
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
function convert(node){
 if(node.nodeName==='#text')return {type:'text',value:node.value};
 if(!node.tagName)return null;
 return {type:'paragraph',data:{hName:node.tagName,hProperties:Object.fromEntries([...(node.attrs??[]).map(a=>[a.name,a.value]),...(node.tagName==='code'?[['niftRawHtml',true]]:[])])},children:(node.childNodes??[]).map(convert).filter(Boolean)};
}
export default function(){return (tree,file)=>{
 if(!file.path?.endsWith('.md'))return;
 function walk(parent){
  if(!parent.children)return;
  const result=[],stack=[{children:result}];
  for(const child of parent.children){
   if(child.type!=='html'){walk(child);stack.at(-1).children.push(child);continue;}
   const close=child.value.trim().match(/^<\/([\w:-]+)\s*>$/);
   if(close&&stack.length>1&&stack.at(-1).data.hName===close[1].toLowerCase()){stack.pop();continue;}
   const parsed=parseFragment(child.value,{sourceCodeLocationInfo:true}).childNodes;
   const nodes=parsed.map(convert).filter(Boolean);
   stack.at(-1).children.push(...nodes);
   const opened=parsed.find(n=>n.tagName),loc=opened?.sourceCodeLocation;
   const selfClosing=loc?.startTag&&/\/\s*>$/.test(child.value.slice(loc.startTag.startOffset,loc.startTag.endOffset));
   if(loc?.startTag&&!loc.endTag&&!selfClosing&&!voidTags.has(opened.tagName)&&nodes.length===1)stack.push(nodes[0]);
  }
  parent.children=result;
 }
 walk(tree);
};}
