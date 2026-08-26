const ALIAS_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,47}$/;
const RESERVED = new Set(['api', 'manage', 'about', 'privacy', 'terms', 'robots.txt', 'sitemap.xml']);

export function normalizeUrl(input: unknown) {
  if (typeof input !== 'string') throw new Error('URL is required');
  const url = new URL(input.trim());
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP and HTTPS links are supported');
  if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(url.hostname)) throw new Error('Local destinations are not supported');
  return url.toString();
}

export function normalizeAlias(input: unknown) {
  if (!input) return null;
  if (typeof input !== 'string' || !ALIAS_PATTERN.test(input) || RESERVED.has(input.toLowerCase())) {
    throw new Error('Custom name must be 3–48 letters, numbers, - or _');
  }
  return input;
}

export function parseExpiration(type: unknown, maxClicks: unknown, date: unknown) {
  if (type === 'clicks') {
    const clicks = Number(maxClicks);
    if (!Number.isInteger(clicks) || clicks < 1 || clicks > 1_000_000) throw new Error('Click limit must be between 1 and 1,000,000');
    return { expirationType: 'clicks', maxClicks: clicks, expirationDate: null };
  }
  if (type === 'datetime') {
    const value = new Date(String(date));
    if (Number.isNaN(value.getTime()) || value <= new Date()) throw new Error('Expiration must be in the future');
    return { expirationType: 'datetime', maxClicks: null, expirationDate: value };
  }
  return { expirationType: 'none', maxClicks: null, expirationDate: null };
}
