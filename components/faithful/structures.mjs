// Astro deduplicates the Mermaid controller once per document.
export default function(){return tree=>{let seen=false;function walk(n){if(n.name==='MermaidGraph'&&!seen){n.attributes.push({type:'mdxJsxAttribute',name:'niftMermaidScript',value:'true'});seen=true;}for(const c of n.children??[])walk(c)}walk(tree)};}
