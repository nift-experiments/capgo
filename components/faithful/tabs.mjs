// Assign tab IDs per document rather than sharing mutable state across a batch.
export default function(){return tree=>{
 let index=0;
 function walk(node){
  if(['mdxJsxFlowElement','mdxJsxTextElement'].includes(node.type)&&node.name==='Tabs')node.attributes.push({type:'mdxJsxAttribute',name:'niftTabIndex',value:String(index++)});
  for(const child of node.children??[])walk(child);
 }
 walk(tree);
};}
