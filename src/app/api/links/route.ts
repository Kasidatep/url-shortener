import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import { hashSecret, isValidDeviceKey } from '@/lib/security';

export async function GET(request: NextRequest) {
  const key = request.headers.get('x-device-key');
  if (!isValidDeviceKey(key)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const links = await Url.find({ ownerDeviceHash: hashSecret(key!) })
    .sort({ createdAt: -1 }).limit(200)
    .select('shortUrl originalUrl clicks active expirationType maxClicks expirationDate createdAt lastClickedAt')
    .lean();
  return NextResponse.json({ links }, { headers: { 'Cache-Control': 'no-store' } });
}
