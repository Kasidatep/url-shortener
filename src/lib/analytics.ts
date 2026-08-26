import { NextRequest } from 'next/server';
import LinkAnalytics from '@/models/LinkAnalytics';

function deviceFromUserAgent(value: string) {
  const ua = value.toLowerCase();
  if (/bot|crawler|spider|preview/.test(ua)) return 'bot';
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/mobile|iphone|android/.test(ua)) return 'mobile';
  return ua ? 'desktop' : 'unknown';
}

function referrerFromHeader(value: string | null, currentHost: string) {
  if (!value) return 'Direct';
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host === currentHost.toLowerCase() ? 'Internal' : host.slice(0, 120);
  } catch {
    return 'Unknown';
  }
}

export async function recordLinkClick(request: NextRequest, shortUrl: string) {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const rawCountry = request.headers.get('x-country') || request.headers.get('cf-ipcountry') || 'Unknown';
  const country = /^[A-Za-z]{2}$/.test(rawCountry) ? rawCountry.toUpperCase() : 'Unknown';
  const device = deviceFromUserAgent(request.headers.get('user-agent') || '');
  const referrer = referrerFromHeader(request.headers.get('referer'), new URL(request.url).hostname);
  const expireAt = new Date(now);
  expireAt.setUTCDate(expireAt.getUTCDate() + 400);

  try {
    await LinkAnalytics.updateOne(
      { shortUrl, date, country, device, referrer },
      { $inc: { count: 1 }, $setOnInsert: { expireAt } },
      { upsert: true },
    );
  } catch {
    // Analytics must never block a redirect.
  }
}
