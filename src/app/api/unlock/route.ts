import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import { comparePassword } from '@/utils/hash';
import { rateLimit } from '@/lib/rate-limit';
import { recordLinkClick } from '@/lib/analytics';

const NO_STORE={'Cache-Control':'no-store'};
function reply(message:string,status:number){return NextResponse.json({message},{status,headers:NO_STORE});}

export async function POST(request:NextRequest){
  const length=Number(request.headers.get('content-length')||0);
  if(length>4096)return reply('Request too large',413);

  let body:unknown;
  try{body=await request.json();}catch{return reply('Invalid request',400);}
  if(typeof body!=='object'||body===null)return reply('Invalid request',400);
  const {code,password}=body as Record<string,unknown>;
  if(typeof code!=='string'||!/^[A-Za-z0-9_-]{3,48}$/.test(code)||typeof password!=='string'||password.length<1||password.length>128)return reply('Invalid request',400);

  const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
  if(!rateLimit('unlock:'+ip+':'+code,8,60_000))return reply('Too many attempts',429);

  await connectMongo();
  const url=await Url.findOne({shortUrl:code,active:true}).select('+password');
  if(!url)return reply('Link not found',404);
  if(!url.password||!(await comparePassword(password,url.password)))return reply('Incorrect password',401);
  if(url.expirationType==='datetime'&&url.expirationDate&&url.expirationDate<=new Date())return reply('Link expired',410);

  const filter:Record<string,unknown>={_id:url._id,active:true};
  if(url.expirationType==='clicks')filter.clicks={$lt:url.maxClicks};
  const updated=await Url.findOneAndUpdate(filter,{$inc:{clicks:1},$set:{lastClickedAt:new Date()}});
  if(!updated)return reply('Link expired',410);
  await recordLinkClick(request,url.shortUrl);
  return NextResponse.json({redirect:url.originalUrl},{headers:NO_STORE});
}
