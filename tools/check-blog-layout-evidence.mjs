// Audit recorded browser measurements against the official upstream behavior.
import{readFile}from'node:fs/promises';import assert from'node:assert/strict';
const evidence=JSON.parse(await readFile('evidence/parity/blog-scroll-layout.json'));
assert.equal(evidence.checks.length,15);
for(const row of evidence.checks){assert.deepEqual(row.local,row.official,JSON.stringify({viewport:row.size,search:row.search}));if(row.size.width>=1024){const nav=row.official.elements.find(e=>e.selector==='nav[aria-label="Blog categories"]');assert.equal(nav.overflowY,'auto');assert(nav.scrollHeight>nav.clientHeight)}}
console.log(JSON.stringify({checks:evidence.checks.length,matched:true,note:'Desktop nested category scrolling matches upstream; measurements are representative browser evidence, not corpus-wide visual certification.'}));
