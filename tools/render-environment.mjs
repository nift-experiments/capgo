// Faithful content adapters are deterministic and do not read shell/application env.
// Runtime API configuration belongs to the preview server, not the MDX renderer.
// Preserve only the explicit dependency override and Windows OS bootstrap variables.
const allowed=new Set(['MDX_NODE_MODULES','SystemRoot','SYSTEMROOT','WINDIR']);
for(const name of Object.keys(process.env))if(!allowed.has(name))delete process.env[name];
