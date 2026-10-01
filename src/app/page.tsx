import type { Metadata } from 'next';
import ShortenerApp from '@/components/ShortenerApp';
import { landingCopy } from '@/config/landing-copy';
import { env } from '@/config/env';

const title = 'Free URL Shortener & QR Codes — Big ideas. Short links.';
const description = 'Turn long URLs into memorable short links with MemoLink. Create QR codes, choose a custom name, add a password or set an expiry. Free, with no account needed.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/' },
  openGraph: { title: 'MemoLink — Big ideas. Short links.', description, url: '/', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'MemoLink — Big ideas. Short links.', description },
};

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebApplication', '@id': `${env.app.url}/#app`, url: env.app.url, name: 'MemoLink', description: landingCopy.en.definition, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript and browser storage', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['URL shortening', 'Custom link names', 'QR codes', 'Password-protected links', 'Date and click-limit expiration'] },
      { '@type': 'FAQPage', '@id': `${env.app.url}/#faq`, inLanguage: 'en', mainEntity: landingCopy.en.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    ],
  };
  return <><ShortenerApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /></>;
}
