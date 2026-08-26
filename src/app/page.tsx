import type { Metadata } from 'next';
import ShortenerApp from '@/components/ShortenerApp';

export const metadata: Metadata = {
  title: 'Free URL Shortener with QR Code & Expiration',
  description: 'Create short links with custom names, QR codes, passwords, click limits and expiration dates. No account required.',
  alternates: { canonical: '/' },
};

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kasidate Short',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  return <><ShortenerApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
