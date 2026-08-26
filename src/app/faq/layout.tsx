import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help center',
  description: 'Practical guidance for creating, protecting, sharing, recovering and measuring MemoLink short links.',
  alternates: { canonical: '/faq' },
  openGraph: { title: 'MemoLink Help Center', description: 'Clear answers about short links, QR codes, passwords, expiration, device ownership and privacy-friendly analytics.', url: '/faq', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'MemoLink Help Center', description: 'Clear answers for creating, sharing and managing better short links.' },
  keywords: ['URL shortener FAQ','secure short links','QR code sharing','Open Graph link preview','link privacy'],
};

const faqSchema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  mainEntity:[
    { '@type':'Question', name:'Can I change a link after creating it?', acceptedAnswer:{'@type':'Answer',text:'Yes. Open My links on the owning device to pause, reactivate or manage the link.'}},
    { '@type':'Question', name:'Can I use the same QR code after changing a destination?', acceptedAnswer:{'@type':'Answer',text:'Yes. The QR code points to the MemoLink address, so printed and shared QR codes continue to work.'}},
    { '@type':'Question', name:'How does device ownership work?', acceptedAnswer:{'@type':'Answer',text:'A private recovery key stored on the creating device authorizes link management without requiring an account.'}},
    { '@type':'Question', name:'What analytics does MemoLink collect?', acceptedAnswer:{'@type':'Answer',text:'MemoLink shows aggregate visits, countries, device categories and referrers without exposing individual visitor profiles.'}},
    { '@type':'Question', name:'What happens if I lose my recovery key?', acceptedAnswer:{'@type':'Answer',text:'Existing links continue to redirect, but management access cannot be restored without the original recovery key.'}},
    { '@type':'Question', name:'Which apps can show a MemoLink preview?', acceptedAnswer:{'@type':'Answer',text:'Apps supporting Open Graph can show it, including LINE, WhatsApp, Facebook, X, LinkedIn and Telegram.'}},
    { '@type':'Question', name:'Does a protected link reveal its destination?', acceptedAnswer:{'@type':'Answer',text:'No. Password-protected links use generic metadata and never expose the destination or password.'}},
    { '@type':'Question', name:'Can link owners identify individual visitors?', acceptedAnswer:{'@type':'Answer',text:'No. MemoLink stores privacy-friendly aggregate analytics and does not store raw IP addresses or visitor profiles.'}},
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<script id="faq-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}} /></>;
}
