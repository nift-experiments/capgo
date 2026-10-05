"""Sequential closure benchmarks; restore every authored edit before exit."""
import os,json,subprocess,shutil,re,time,platform,hashlib,sys
from pathlib import Path
root=Path.cwd();out=root/'evidence/final-benchmarks';out.mkdir(exist_ok=True)
env=os.environ.copy();env.pop('MDX_NODE_MODULES',None);env['LC_ALL']='C'
records=[]
def measure(label,n,cmd,cwd=root,runenv=env):
 stem=out/f'{label}-{n}';start=time.time()
 with (stem.with_suffix('.output.txt')).open('w') as f:
  p=subprocess.run(['/usr/bin/time','-v','-o',str(stem.with_suffix('.time.txt')),*cmd],cwd=cwd,env=runenv,stdout=f,stderr=subprocess.STDOUT)
 raw=stem.with_suffix('.time.txt').read_text();m=re.search(r'Elapsed .*?: ([\d:.]+)',raw);elapsed=0
 if m:
  for part in m[1].split(':'):elapsed=elapsed*60+float(part)
 rss=re.search(r'Maximum resident set size \(kbytes\): (\d+)',raw)
 row={'class':label,'run':n,'command':cmd,'seconds':elapsed,'peakRssKiB':int(rss[1]) if rss else None,'exitCode':p.returncode};records.append(row)
 (out/'runs.json').write_text(json.dumps(records,indent=2)+'\n')
 obs=root/'build/faithful/preparation-observation.json'
 if cwd==root and obs.exists():shutil.copyfile(obs,stem.with_suffix('.preparation.json'))
 print(json.dumps(row),flush=True)
 if p.returncode:raise RuntimeError('Benchmark failed: '+label)
with (out/'warm-prime.output.txt').open('w') as f:
 subprocess.run(['nift','build','--all'],cwd=root,env=env,stdout=f,stderr=subprocess.STDOUT,check=True)
for i in range(1,4):measure('warm-full',i,['nift','build','--all'])
for i in range(1,4):measure('no-op',i,['nift','build'])
for i in range(1,4):
 (root/'build/faithful/web-fingerprints.json').unlink(missing_ok=True)
 measure('web-regeneration',i,['nift','build','--all'])
for i in range(1,4):
 for p in ['build/faithful','.nift/mdx-prepared','.nift/mdx-cache']:shutil.rmtree(root/p,ignore_errors=True)
 measure('cold-intermediates',i,['nift','build','--all'])
manifest=json.loads((root/'migration/web-sources.json').read_text())['sources']
marketing=next(r['source'] for r in manifest if r['route']=='/');blog=next(r['source'] for r in manifest if r['family']=='blog')
docs=root/'corpus/authored/apps/docs/src/content/docs/docs/getting-started/deploy.mdx'
ordinary=root/'corpus/authored/apps/docs/src/content/docs/docs/index.mdx'
for label,p in [('incremental-docs',ordinary),('incremental-rich-mdx',docs),('incremental-marketing',root/marketing),('incremental-blog-listing',root/blog)]:
 original=p.read_bytes()
 try:
  for i in range(1,4):
   if p.suffix=='.astro':
    s=original.decode();assert 'const title = `' in s
    s=s.replace('const title = `',f'const title = `Benchmark {i} ',1)
    p.write_text(s)
   else:p.write_bytes(original+f'\n\nMigration benchmark edit {i}.\n'.encode())
   measure(label,i,['nift','build'])
 finally:
  p.write_bytes(original)
  with (out/f'{label}-restore.output.txt').open('w') as f:
   restored=subprocess.run(['nift','build'],cwd=root,env=env,stdout=f,stderr=subprocess.STDOUT)
  if restored.returncode:raise RuntimeError('Restore build failed')
upstream=Path('/tmp/capgo-baseline-7d5b69d');upenv=env.copy();upenv['PATH']='/tmp/capgo-toolchain/bin:'+env['PATH'];upenv['NODE_OPTIONS']='--max-old-space-size=16384 --import '+str(root/'golden/snapshot-fetch.mjs')
if '--nift-only' not in sys.argv:
 for i in range(1,4):measure('upstream-astro',i,['bun','run','build'],upstream,upenv)
