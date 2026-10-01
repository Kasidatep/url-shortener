import type { Metadata } from 'next';
import ShortenerApp from '@/components/ShortenerApp';
import { env } from '@/config/env';

const description = 'Create short links and QR codes without signing up. Choose a custom name, add a password or expiry, and see aggregate visit statistics with MemoLink.';
export const metadata: Metadata = {
  title: { absolute: 'MemoLink — URL Shortener & QR Code Generator' },
  description,
  alternates: { canonical: '/' },
  openGraph: { title: 'MemoLink — Good things. Short links.', description, url: '/' },
  twitter: { card: 'summary_large_image', title: 'MemoLink — Good things. Short links.', description },
};
export default function Home() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebApplication', '@id': env.app.url + '/#app',
    name: 'MemoLink', url: env.app.url, description,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    browserRequirements: 'JavaScript and local storage required for creating and managing links.',
    featureList: ['URL shortening', 'Custom link names', 'QR codes', 'Password protection', 'Expiration dates and click limits', 'UTM campaign parameters', 'Aggregate visit analytics', 'Recovery key management'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  return <><ShortenerApp/><script id="application-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g, '\\u003c')}}/></>;
}
