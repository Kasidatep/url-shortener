import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My links',
  robots: { index: false, follow: false, nocache: true },
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
