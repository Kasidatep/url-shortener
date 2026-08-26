import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My links',
  description: 'Private device-owned link management and aggregate analytics in MemoLink.',
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: 'My links | MemoLink', description: 'Manage short links and view privacy-friendly analytics from the owning device.' },
};

export default function ManageLayout({ children }: { children: React.ReactNode }) { return children; }
