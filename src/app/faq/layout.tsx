import type { Metadata } from 'next';
import { getServerPreferences } from '@/lib/preferences';
import { seoMessages } from '@/config/seo';
import { env } from '@/config/env';

export async function generateMetadata():Promise<Metadata>{
  const {locale}=await getServerPreferences();
  const {helpTitle:title,helpDescription:description}=seoMessages[locale];
  return {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: { title, description, url: '/faq', type: 'website',siteName:'MemoLink' },
  twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function FaqLayout({ children }: { children: React.ReactNode }) {
  const {locale}=await getServerPreferences();
  const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'MemoLink',item:env.app.url},{'@type':'ListItem',position:2,name:seoMessages[locale].helpTitle,item:env.app.url+'/faq'}]};
  return <>{children}<script id="help-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></>;
}
