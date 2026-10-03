import type { MetadataRoute } from 'next';
import { env } from '@/config/env';
export default function sitemap():MetadataRoute.Sitemap{return [{url:env.app.url,lastModified:'2026-10-04',changeFrequency:'monthly',priority:1},{url:env.app.url+'/faq',lastModified:'2026-10-04',changeFrequency:'monthly',priority:.7}];}
