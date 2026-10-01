import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help center',
  description: 'Practical guidance for creating, protecting, sharing, recovering and measuring MemoLink short links.',
  alternates: { canonical: '/faq' },
  openGraph: { title: 'MemoLink Help Center', description: 'Clear answers about short links, QR codes, passwords, expiration, device ownership and privacy-friendly analytics.', url: '/faq', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'MemoLink Help Center', description: 'Clear answers for creating, sharing and managing better short links.' },
  keywords: ['URL shortener FAQ','secure short links','QR code sharing','Open Graph link preview','link privacy'],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
