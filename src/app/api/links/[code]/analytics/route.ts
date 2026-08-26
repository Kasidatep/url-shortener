import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Url from '@/models/Url';
import LinkAnalytics from '@/models/LinkAnalytics';
import { hashSecret, isValidDeviceKey } from '@/lib/security';

type Breakdown = Record<string, number>;

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  const key = request.headers.get('x-device-key');
  if (!isValidDeviceKey(key)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const owned = await Url.exists({ shortUrl: params.code, ownerDeviceHash: hashSecret(key!) });
  if (!owned) return NextResponse.json({ message: 'Link not found' }, { status: 404 });

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 29);
  const sinceDate = since.toISOString().slice(0, 10);
  const rows = await LinkAnalytics.find({ shortUrl: params.code, date: { $gte: sinceDate } }).lean();

  const daily: Breakdown = {};
  const countries: Breakdown = {};
  const devices: Breakdown = {};
  const referrers: Breakdown = {};
  let visits30d = 0;
  for (const row of rows) {
    visits30d += row.count;
    daily[row.date] = (daily[row.date] || 0) + row.count;
    countries[row.country] = (countries[row.country] || 0) + row.count;
    devices[row.device] = (devices[row.device] || 0) + row.count;
    referrers[row.referrer] = (referrers[row.referrer] || 0) + row.count;
  }

  return NextResponse.json({ visits30d, daily, countries, devices, referrers }, { headers: { 'Cache-Control': 'no-store' } });
}
