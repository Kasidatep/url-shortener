import { lookup } from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import { isIP } from 'node:net';
import { unstable_cache } from 'next/cache';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';

type RawResponse={body:Buffer;contentType:string;finalUrl:URL};
type PreviewLink={password?:string|null;originalUrl:string;expirationType:'none'|'clicks'|'datetime';expirationDate?:Date|null;maxClicks?:number|null;clicks:number};
export type LinkPreview={title:string;hostname:string;imageDataUrl?:string;protected:boolean};

function isPrivateAddress(address:string){
  const value=address.toLowerCase().split('%')[0];
  if(value==='::'||value==='::1'||value.startsWith('fc')||value.startsWith('fd')||value.startsWith('fe8')||value.startsWith('fe9')||value.startsWith('fea')||value.startsWith('feb')||value.startsWith('ff'))return true;
  const mapped=value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  const ipv4=mapped||value;
  if(isIP(ipv4)!==4)return false;
  const parts=ipv4.split('.').map(Number);
  const [a,b,c]=parts;
  return a===0||a===10||a===127||a>=224||(a===100&&b>=64&&b<=127)||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&b===168)||(a===192&&b===0)||(a===192&&b===88&&c===99)||(a===198&&(b===18||b===19))||(a===198&&b===51&&c===100)||(a===203&&b===0&&c===113);
}

async function resolvePublic(url:URL){
  if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw new Error('Unsupported preview URL');
  const port=url.port?Number(url.port):(url.protocol==='https:'?443:80);
  if(![80,443].includes(port))throw new Error('Unsupported preview port');
  const addresses=await lookup(url.hostname,{all:true,verbatim:true});
  if(!addresses.length||addresses.some(item=>isPrivateAddress(item.address)))throw new Error('Private preview destination');
  return addresses[0];
}

async function requestSafe(input:string,maxBytes:number,accept:RegExp,redirects=0):Promise<RawResponse>{
  if(redirects>3)throw new Error('Too many preview redirects');
  const url=new URL(input);
  const resolved=await resolvePublic(url);
  const client=url.protocol==='https:'?https:http;
  const hostHeader=url.hostname+(url.port?':'+url.port:'');
  return new Promise((resolve,reject)=>{
    const request=client.request({
      protocol:url.protocol,
      hostname:resolved.address,
      family:resolved.family,
      port:url.port||undefined,
      path:url.pathname+url.search,
      method:'GET',
      servername:url.protocol==='https:'?url.hostname:undefined,
      rejectUnauthorized:true,
      headers:{Host:hostHeader,'User-Agent':'MemoLink-Preview/1.0','Accept':'text/html,image/avif,image/webp,image/png,image/jpeg;q=0.9,*/*;q=0.1','Accept-Encoding':'identity'},
    },response=>{
      const status=response.statusCode||500;
      const location=response.headers.location;
      if(status>=300&&status<400&&location){
        response.resume();
        void requestSafe(new URL(location,url).toString(),maxBytes,accept,redirects+1).then(resolve,reject);
        return;
      }
      const contentType=String(response.headers['content-type']||'').split(';')[0].trim().toLowerCase();
      if(status<200||status>=300||!accept.test(contentType)){response.resume();reject(new Error('Unsupported preview response'));return;}
      const chunks:Buffer[]=[];
      let size=0;
      response.on('data',(chunk:Buffer)=>{
        size+=chunk.length;
        if(size>maxBytes){request.destroy(new Error('Preview response too large'));return;}
        chunks.push(chunk);
      });
      response.on('end',()=>resolve({body:Buffer.concat(chunks),contentType,finalUrl:url}));
      response.on('error',reject);
    });
    request.setTimeout(3500,()=>request.destroy(new Error('Preview timeout')));
    request.on('error',reject);
    request.end();
  });
}

function decode(value:string){
  return value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
}

function meta(html:string,key:string){
  const tags=html.match(/<meta\s+[^>]*>/gi)||[];
  for(const tag of tags){
    const attrs:Record<string,string>={};
    for(const match of Array.from(tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)))attrs[match[1].toLowerCase()]=match[2];
    if((attrs.property||attrs.name)?.toLowerCase()===key.toLowerCase()&&attrs.content)return decode(attrs.content);
  }
  return '';
}

async function loadPreview(code:string):Promise<LinkPreview>{
  const safeCode=code.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,48);
  await connectMongo();
  const link=await Url.findOne({shortUrl:safeCode,active:true}).select('+password originalUrl expirationType expirationDate maxClicks clicks').lean() as unknown as PreviewLink|null;
  if(!link)return{title:'Secure short link',hostname:'MemoLink',protected:false};
  const protectedLink=Boolean(link.password);
  const expired=(link.expirationType==='datetime'&&link.expirationDate&&new Date(link.expirationDate)<=new Date())||(link.expirationType==='clicks'&&link.clicks>=(link.maxClicks||0));
  if(protectedLink||expired)return{title:protectedLink?'Password-protected link':'Link unavailable',hostname:'MemoLink',protected:protectedLink};
  try{
    const page=await requestSafe(link.originalUrl,256_000,/^text\/html$/);
    const html=page.body.toString('utf8');
    const title=(meta(html,'og:title')||meta(html,'twitter:title')||decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]||'')).slice(0,100)||'Open destination';
    const imageValue=meta(html,'og:image:secure_url')||meta(html,'og:image')||meta(html,'twitter:image');
    let imageDataUrl:string|undefined;
    if(imageValue){
      try{
        const imageUrl=new URL(imageValue,page.finalUrl).toString();
        const image=await requestSafe(imageUrl,2_500_000,/^image\/(png|jpe?g|webp)$/);
        imageDataUrl=`data:${image.contentType};base64,${image.body.toString('base64')}`;
      }catch{}
    }
    return{title,hostname:page.finalUrl.hostname.replace(/^www\./,''),imageDataUrl,protected:false};
  }catch{
    try{return{title:'Open destination',hostname:new URL(link.originalUrl).hostname.replace(/^www\./,''),protected:false};}
    catch{return{title:'Secure short link',hostname:'MemoLink',protected:false};}
  }
}

export const getLinkPreview=unstable_cache(loadPreview,['memolink-preview-v1'],{revalidate:3600});
