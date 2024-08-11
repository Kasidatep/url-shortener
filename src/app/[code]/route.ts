// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectMongo from '../../lib/mongodb';
// import { Url } from '../../models/Url';

import { env } from "@/config/env";
import connectMongo from "@/lib/mongodb";
import { Url } from "@/models/Url";
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { code } = req.query;
//     await connectMongo();
//     const url = await Url.findOne({ shortUrl: `${code}` });
//     if (url) {
//         url.clicks++;
//         await url.save();
//         res.redirect(url.originalUrl);
//     } else {
//         res.status(404).json({ message: 'URL Not Found' });
//     }
// }

export async function GET(request: NextRequest, 
     { params }: { params: { code: string } }) {
    // const { code } = request.query;
    console.log("test")
    console.log(request.url)
    const { code } = params;
    console.log(code)

    await connectMongo();
    const url = await Url.findOne({ shortUrl: `${code}` });
    console.log(url)
    if (url) {
        url.clicks++;
        await url.save();
        return NextResponse.redirect(url.originalUrl)
    }else{
        return NextResponse.redirect(`${env.app.url}?redirect=notfound`)
    }
}

