import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import { comparePassword } from '@/utils/hash';
import { rateLimit } from '@/lib/rate-limit';
import { recordLinkClick } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!rateLimit('unlock:' + ip, 10, 60_000)) return NextResponse.json({ message: 'Too many attempts' }, { status: 429 });
  const { code, password } = await request.json();
  if (typeof code !== 'string' || typeof password !== 'string') return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  await connectMongo();
  const url = await Url.findOne({ shortUrl: code, active: true }).select('+password');
  if (!url) return NextResponse.json({ message: 'Link not found' }, { status: 404 });
  if (!url.password || !(await comparePassword(password, url.password))) return NextResponse.json({ message: 'Incorrect password' }, { status: 403 });
  if (url.expirationType === 'datetime' && url.expirationDate && url.expirationDate <= new Date()) return NextResponse.json({ message: 'Link expired' }, { status: 410 });

  const filter: Record<string, unknown> = { _id: url._id, active: true };
  if (url.expirationType === 'clicks') filter.clicks = { $lt: url.maxClicks };
  const updated = await Url.findOneAndUpdate(filter, { $inc: { clicks: 1 }, $set: { lastClickedAt: new Date() } });
  if (!updated) return NextResponse.json({ message: 'Link expired' }, { status: 410 });
  await recordLinkClick(request, url.shortUrl);
  return NextResponse.json({ redirect: url.originalUrl }, { headers: { 'Cache-Control': 'no-store' } });
}
