// Assign tab IDs per document rather than sharing mutable state across a batch.
export default function(){return tree=>{
 let index=0,synced=false;
 function walk(node){
  if(['mdxJsxFlowElement','mdxJsxTextElement'].includes(node.type)&&node.name==='Tabs'){node.attributes.push({type:'mdxJsxAttribute',name:'niftTabIndex',value:String(index++)});if(node.attributes.some(a=>a.name==='syncKey')&&!synced){node.attributes.push({type:'mdxJsxAttribute',name:'niftRestoreScript',value:'true'});synced=true;}}
  if(node.name==='TabItem')node.attributes.push({type:'mdxJsxAttribute',name:'niftTabItem',value:'true'});
  for(const child of node.children??[])walk(child);
 }
 walk(tree);
};}
