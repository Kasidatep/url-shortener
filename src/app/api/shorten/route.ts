import connectMongo from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';

export async function POST(request: NextRequest) {
    console.log(request)
    const body = await request.json();
    await connectMongo();

    const shortUrl = shortid.generate();

    const newUrl = new Url({
        originalUrl: body.originalUrl,
        shortUrl,
        metadata: body.metadata,
    });

    try {
        await newUrl.save();
        return NextResponse.json({ shortUrl });
    }catch(err){
        console.log(err);
        return NextResponse.json({ message: 'Invalid URL' }, { status: 400 });
    }    
}
