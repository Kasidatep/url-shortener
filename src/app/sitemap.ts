import type { MetadataRoute } from 'next';
import { env } from '@/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: env.app.url, changeFrequency: 'monthly', priority: 1 },
    { url: env.app.url + '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
