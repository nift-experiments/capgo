import {readFile,writeFile} from 'node:fs/promises';
import {preparePaths} from '../.nift/packages/mdx/renderer/prepare.mjs';
const options=JSON.parse(await readFile('.nift/mdx-faithful.json'));
const path=process.argv[2]??'corpus/authored/apps/docs/src/content/docs/docs/plugins/accelerometer/index.mdx';
console.log(await preparePaths([path],options));
