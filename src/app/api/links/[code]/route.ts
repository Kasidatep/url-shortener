import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import { hashSecret, isValidDeviceKey } from '@/lib/security';
import { normalizeUrl, parseExpiration } from '@/lib/validation';
import { hashPassword } from '@/utils/hash';

function ownerFilter(request: NextRequest, code: string) {
  const key = request.headers.get('x-device-key');
  return isValidDeviceKey(key) ? { shortUrl: code, ownerDeviceHash: hashSecret(key!) } : null;
}

export async function PATCH(request: NextRequest, { params }: { params: { code: string } }) {
  const filter = ownerFilter(request, params.code);
  if (!filter) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const update: Record<string, unknown> = {};
    if (typeof body.active === 'boolean') update.active = body.active;
    if (body.originalUrl) update.originalUrl = normalizeUrl(body.originalUrl);
    if (body.expirationType) Object.assign(update, parseExpiration(body.expirationType, body.maxClicks, body.expirationDate));
    if (typeof body.password === 'string') update.password = body.password ? await hashPassword(body.password) : null;
    await connectMongo();
    const link = await Url.findOneAndUpdate(filter, { $set: update }, { new: true }).select('-ownerDeviceHash -password');
    return link ? NextResponse.json({ link }) : NextResponse.json({ message: 'Link not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { code: string } }) {
  const filter = ownerFilter(request, params.code);
  if (!filter) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const result = await Url.deleteOne(filter);
  return result.deletedCount ? new NextResponse(null, { status: 204 }) : NextResponse.json({ message: 'Link not found' }, { status: 404 });
}
