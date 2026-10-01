import { env } from '@/config/env';

export function GET() {
  const base = env.app.url.replace(/\/$/, '');
  const text = `# MemoLink

> A URL shortener and QR code tool from MemoLab. Create links without an account.

MemoLink supports custom short names, optional passwords, expiration dates, click limits, UTM parameters and aggregate visit analytics. Link management is authorized by a private recovery key stored in the creating browser. Save that key before changing browsers or clearing browser storage. Anyone with the key can manage its links.

## Public pages
- [Create a short link](${base}/): Paste a public HTTP or HTTPS URL and choose optional settings.
- [Help and frequently asked questions](${base}/faq): Creating, sharing, access controls, recovery and analytics.
- [Privacy policy](https://memolab.me/privacy)
- [Terms](https://memolab.me/terms)

## Scope
My links is a private management interface, not a public directory. Individual short-link destinations and analytics are not part of this product reference. A password protects access through a short link; it does not secure the destination website itself.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
