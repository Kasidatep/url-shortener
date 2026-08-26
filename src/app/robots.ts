import type { MetadataRoute } from 'next';
import { env } from '@/config/env';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/manage', '/*?*'] }], sitemap: env.app.url + '/sitemap.xml' };
}
