import {NextRequest,NextResponse} from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import {normalizeAlias} from '@/lib/validation';
import {rateLimit} from '@/lib/rate-limit';
export async function GET(request:NextRequest){
 const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
 if(!rateLimit('availability:'+ip))return NextResponse.json({message:'Try again later'},{status:429});
 let alias;try{alias=normalizeAlias(request.nextUrl.searchParams.get('name'));if(!alias||['faq','manifest.webmanifest','opengraph-image','llms.txt'].includes(alias.toLowerCase()))throw new Error();}catch{return NextResponse.json({available:false});}
 try{await connectMongo();const exists=await Url.exists({shortUrl:alias});return NextResponse.json({available:!exists},{headers:{'Cache-Control':'no-store'}});}catch{return NextResponse.json({message:'Unable to check name'},{status:503});}
}
