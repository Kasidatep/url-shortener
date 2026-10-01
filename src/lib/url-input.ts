// Normalize only scheme-less public-looking addresses. Never reinterpret explicit schemes.
export function normalizeUrlInput(value:string){
 const raw=value.trim();
 if(!raw||/\s/.test(raw))throw new Error('Invalid URL');
 const explicit=/^[a-z][a-z\d+.-]*:/i.test(raw);
 const parsed=new URL(explicit?raw:raw.startsWith('//')?'https:'+raw:'https://'+raw);
 if(!['http:','https:'].includes(parsed.protocol)||parsed.username||parsed.password||(!explicit&&!parsed.hostname.includes('.'))||['localhost','127.0.0.1','0.0.0.0','[::1]'].includes(parsed.hostname))throw new Error('Invalid URL');
 return parsed.toString();
}
