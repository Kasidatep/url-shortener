import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help center',
  description: 'Practical guidance for creating, protecting, sharing, recovering and measuring MemoLink short links.',
  alternates: { canonical: '/faq' },
  openGraph: { title: 'MemoLink Help Center', description: 'Clear answers about short links, passwords, expiration, ownership and privacy-friendly analytics.', url: '/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) { return children; }
