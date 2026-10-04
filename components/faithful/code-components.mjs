// Convert declarative Code/PackageManagers into source-derived code nodes.
// Command conventions follow starlight-package-managers 0.13.0 (MIT).
function value(node){
 if(node.type==='Literal')return node.value;
 if(node.type==='TemplateLiteral'&&node.expressions.length===0)return node.quasis.map(q=>q.value.cooked).join('');
 if(node.type==='ArrayExpression')return node.elements.map(value);
 if(node.type==='ObjectExpression')return Object.fromEntries(node.properties.map(p=>[p.key.name??p.key.value,value(p.value)]));
 throw Error('Unsupported dynamic code-component expression: '+node.type);
}
function props(node){return Object.fromEntries(node.attributes.map(a=>{
 if(a.type!=='mdxJsxAttribute')throw Error('Unsupported code-component attribute spread');
 return [a.name,a.value===null?true:typeof a.value==='string'?a.value:value(a.value.data.estree.body[0].expression)];
}));}
const commands={npm:{add:'npm i',exec:'npx',dlx:'npx',install:'npm install',run:'npm run',remove:'npm uninstall',create:'npm create',devOption:'-D'},pnpm:{add:'pnpm add',exec:'pnpm',dlx:'pnpx',install:'pnpm install',run:'pnpm run',remove:'pnpm remove',create:'pnpm create',devOption:'-D'},yarn:{add:'yarn add',exec:'yarn',dlx:'yarn dlx',install:'yarn install',run:'yarn run',remove:'yarn remove',create:'yarn create',devOption:'-D'},bun:{add:'bun add',exec:'bunx',dlx:'bunx',install:'bun install',run:'bun run',remove:'bun remove',create:'bun create',devOption:'-d'}};
function command(manager,p){const type=p.type??'add',defs=commands[manager];if(!defs?.[type])throw Error('Unsupported package-manager command');let c=defs[type];if(p.prefix)c=p.prefix+' '+c;if(p.comment)c='# '+p.comment.replaceAll('{PKG}',manager)+'\n'+c;if(type==='add'&&p.dev)c+=' '+defs.devOption;if(p.pkg)c+=' '+(type==='create'&&manager==='yarn'?p.pkg.replace(/@[^\s]+/,''):p.pkg);if(p.args)c+=(manager==='npm'&&!['dlx','exec','run'].includes(type)?' --':'')+' '+p.args;return c;}
const attribute=(name,value)=>({type:'mdxJsxAttribute',name,value});
const jsx=(name,attributes,children)=>({type:'mdxJsxFlowElement',name,attributes,children});
const block=(code,lang,meta='',extra={})=>({type:'code',value:code,lang,meta,niftCodeProps:extra,niftExplicit:true});
export function transformCodeComponents(tree){
 function walk(parent){for(let i=0;i<(parent.children??[]).length;i++){
  const node=parent.children[i];
  if(['mdxJsxFlowElement','mdxJsxTextElement'].includes(node.type)&&node.name==='Code'){
   const {code,lang='',meta='',...extra}=props(node);if(typeof code!=='string')throw Error('Code requires authored string');parent.children[i]=block(code,lang,meta,extra);continue;
  }
  if(['mdxJsxFlowElement','mdxJsxTextElement'].includes(node.type)&&node.name==='PackageManagers'){
   const p=props(node);if(p.variant==='compact')throw Error('Compact package-manager variant requires its own verified adapter');const managers=p.pkgManagers??['npm','pnpm','yarn'],frame=p.variant==='compact'?'none':p.frame==='none'?'code':p.frame??'terminal';
   if(managers.length===1){parent.children[i]=block(command(managers[0],p),'sh','',{frame:p.variant==='compact'?'terminal':frame,...(p.title?{title:p.title}:{})});continue;}
   const icons={npm:'seti:npm',yarn:'seti:yarn',pnpm:'pnpm',bun:'bun'};
   let tabs=jsx('Tabs',[attribute('syncKey','starlight-package-managers-pkg')],managers.map(manager=>jsx('TabItem',[attribute('label',manager),...(p.icons===false?[]:[attribute('icon',icons[manager])])],[block(command(manager,p),'sh','',{frame,...(p.title?{title:p.title}:{})})])));
   parent.children[i]=tabs;continue;
  }
  walk(node);
 }}walk(tree);return tree;
}
export default function(){return transformCodeComponents;}
