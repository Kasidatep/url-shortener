import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { hashPassword } from '@/utils/hash';
import { hashSecret, isValidDeviceKey } from '@/lib/security';
import { normalizeAlias, normalizeUrl, parseExpiration } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';
import { recordLinkClick } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 8192) return NextResponse.json({ message: 'Request too large' }, { status: 413 });
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!rateLimit(ip)) return NextResponse.json({ message: 'Too many links. Please wait a minute.' }, { status: 429 });
  const deviceKey = request.headers.get('x-device-key');
  if (!isValidDeviceKey(deviceKey)) return NextResponse.json({ message: 'Device key is required' }, { status: 400 });

  try {
    const body = await request.json();
    const originalUrl = normalizeUrl(body.url);
    const requestedAlias = normalizeAlias(body.customShortId);
    const expiration = parseExpiration(body.expirationType, body.maxClicks, body.expirationDate);
    await connectMongo();

    const shortUrl = requestedAlias || nanoid(8);
    if (requestedAlias && await Url.exists({ shortUrl })) {
      return NextResponse.json({ message: 'This custom name is already used', code: 'ALIAS_TAKEN' }, { status: 409 });
    }

    const password = typeof body.password === 'string' && body.password.length
      ? await hashPassword(body.password.slice(0, 128))
      : null;

    await Url.create({
      originalUrl, shortUrl, password, ...expiration,
      ownerDeviceHash: hashSecret(deviceKey!), clicks: 0, active: true,
    });
    return NextResponse.json({ shortUrl }, { status: 201 });
  } catch (error: unknown) {
    const duplicate = typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
    return NextResponse.json(
      { message: duplicate ? 'This custom name is already used' : error instanceof Error ? error.message : 'Unable to create link' },
      { status: duplicate ? 409 : 400 },
    );
  }
}

export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get('code');
  if (!code || !/^[A-Za-z0-9_-]{3,48}$/.test(code)) return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
  await connectMongo();
  const url = await Url.findOne({ shortUrl: code }).select('+password');
  if (!url) return NextResponse.json({ message: 'Short URL not found' }, { status: 404 });
  if (!url.active) return NextResponse.json({ message: 'Link disabled' }, { status: 410 });
  if (url.expirationType === 'datetime' && url.expirationDate && url.expirationDate <= new Date()) {
    return NextResponse.json({ message: 'Link expired' }, { status: 410 });
  }
  if (url.expirationType === 'clicks' && url.clicks >= (url.maxClicks || 0)) {
    return NextResponse.json({ message: 'Click limit reached' }, { status: 410 });
  }
  if (url.password) return NextResponse.json({ protected: true }, { status: 401 });

  const filter: Record<string, unknown> = { _id: url._id, active: true };
  if (url.expirationType === 'clicks') filter.clicks = { $lt: url.maxClicks };
  const updated = await Url.findOneAndUpdate(filter, { $inc: { clicks: 1 }, $set: { lastClickedAt: new Date() } });
  if (!updated) return NextResponse.json({ message: 'Link expired' }, { status: 410 });
  await recordLinkClick(request, url.shortUrl);
  return NextResponse.json({ redirect: url.originalUrl }, { headers: { 'Cache-Control': 'no-store' } });
}
