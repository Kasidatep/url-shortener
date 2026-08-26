import type { Metadata } from 'next';
import ShortenerApp from '@/components/ShortenerApp';

export const metadata:Metadata={
  title:'Secure URL Shortener and QR Codes',
  description:'Create memorable short links with passwords, expiration, QR codes, UTM tools and device-owned management.',
  alternates:{canonical:'/'},
  openGraph:{title:'MemoLink — Simple links. Useful control.',description:'Create, protect and measure short links without creating an account.',url:'/'},
};

export default function Home(){
  const schema={'@context':'https://schema.org','@type':'WebApplication',name:'MemoLink',applicationCategory:'UtilitiesApplication',operatingSystem:'Any',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
  return <><ShortenerApp/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
