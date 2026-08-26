import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opening secure link',
  description: 'A secure short link powered by MemoLink.',
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: 'MemoLink', description: 'A secure short link with privacy-conscious controls.' },
};

export default function ShortLinkLayout({ children }: { children: React.ReactNode }) { return children; }
