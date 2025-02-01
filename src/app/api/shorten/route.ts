import connectMongo from '@/lib/mongodb';
import UrlService from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { comparePassword, hashPassword } from '@/utils/hash';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        if (!body.url) {
            return NextResponse.json({ message: 'URL is required', code: 400101 }, { status: 400 });
        }

        try {
            new URL(body.url);
        } catch {
            return NextResponse.json({ message: 'Invalid URL format', code: 400102 }, { status: 400 });
        }

        await connectMongo();

        let shortUrl;
        if (body.customShortId && body.customShortId.length > 0) {
            const existingUrl = await UrlService.findOne({ shortUrl: body.customShortId });
            if (existingUrl) {
                return NextResponse.json({ message: 'Custom short URL is already in use', code: 400100 }, { status: 400 });
            }
            shortUrl = body.customShortId;
        } else {
            shortUrl = nanoid(8);
        }

        let hashedPassword = null;
        if (body.password && body.password.length > 0) {
            hashedPassword = await hashPassword(body.password);
        }

        if (body.expirationType === 'clicks' && !body.maxClicks) {
            return NextResponse.json({ message: 'Max clicks is required for this expiration type', code: 400201 }, { status: 400 });
        }

        if (body.expirationType === 'datetime' && !body.expirationDate) {
            return NextResponse.json({ message: 'Expiration date is required for this expiration type', code: 400202 }, { status: 400 });
        }

        // Validate expiration date format if provided
        if (body.expirationType === 'datetime' && body.expirationDate) {
            const expirationDate = new Date(body.expirationDate);
            if (isNaN(expirationDate.getTime())) {
                return NextResponse.json({ message: 'Invalid expiration date format', code: 400203 }, { status: 400 });
            }
        }

        // Create new URL document
        const newUrl = new UrlService({
            originalUrl: body.url,
            shortUrl,
            password: hashedPassword,
            expirationType: body.expirationType || 'none',
            maxClicks: body.maxClicks || null,
            expirationDate: body.expirationDate || null,
            metadata: body.metadata || {},
            clicks: 0
        });

        if (process.env.NODE_ENV !== 'production') {
            console.log("newUrl:", newUrl);
        }

        try {
            const saved = await newUrl.save();
            console.log("Saved successfully:", saved);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Save Error:", err.message, err);
                return NextResponse.json({ message: 'Error saving URL', code: 500001 }, { status: 500 });
            } else {
                console.error("Save Error:", err);
                return NextResponse.json({ message: 'Error saving URL', code: 500001 }, { status: 500 });
            }
        }

        return NextResponse.json({ shortUrl }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Internal server error', code: 500000 }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");
    const code = searchParams.get('code');

    await connectMongo();

    // Find the URL by its short code
    const url = await UrlService.findOne({ shortUrl: code });

    if (!url) {
        return NextResponse.json({ message: 'Short URL not found', redirect: null }, { status: 404 });
    }

    // Check if a password is required
    if (url.password) {
        if (!password) {
            return NextResponse.json({ message: 'Password required to access the URL', redirect: null }, { status: 401 });
        }

        // Validate password
        const isPasswordValid = await comparePassword(password, url.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Incorrect password', redirect: null }, { status: 403 });
        }
    }

    // Check for max click limit
    if (url.expirationType === 'clicks' && url.clicks >= url.maxClicks) {
        return NextResponse.json({ message: 'Max clicks reached', redirect: null }, { status: 400 });
    }

    // Check for expiration date
    if (url.expirationType === 'datetime' && url.expirationDate && new Date(url.expirationDate) < new Date()) {
        return NextResponse.json({ message: 'URL has expired', redirect: null }, { status: 400 });
    }

    // Increment click count if the expiration type is 'clicks'
    if (url.expirationType === 'clicks') {
        // Increment the clicks count by 1
        
        url.clicks += 1;
        
        // Save the updated document
        await url.save();
    }

    // Respond with the original URL
    return NextResponse.json({ message: 'OK', redirect: url.originalUrl }, { status: 200 });
}
