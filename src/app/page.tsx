import type { Metadata } from 'next';
import ShortenerApp from '@/components/ShortenerApp';
import { env } from '@/config/env';
import { getServerPreferences } from '@/lib/preferences';
import { seoMessages } from '@/config/seo';

export async function generateMetadata():Promise<Metadata>{
  const {locale}=await getServerPreferences();
  const {title,description}=seoMessages[locale];
  return {title:{absolute:title},description,alternates:{canonical:'/'},openGraph:{title,description,url:'/',siteName:'MemoLink',type:'website'},twitter:{card:'summary_large_image',title,description}};
}
export default async function Home() {
  const {locale}=await getServerPreferences();
  const description=seoMessages[locale].description;
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebApplication', '@id': env.app.url + '/#app',
    name: 'MemoLink', url: env.app.url, description,
    inLanguage: locale,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    browserRequirements: 'JavaScript and local storage required for creating and managing links.',
    featureList: ['URL shortening', 'Custom link names', 'QR codes', 'Password protection', 'Expiration dates and click limits', 'UTM campaign parameters', 'Aggregate visit analytics', 'Recovery key management'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  return <><ShortenerApp/><script id="application-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g, '\\u003c')}}/></>;
}
