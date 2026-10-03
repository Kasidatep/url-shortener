import type { Metadata } from 'next';
import { getServerPreferences } from '@/lib/preferences';
import { getPageMessages } from '@/config/page-i18n';

export async function generateMetadata():Promise<Metadata>{
  const {locale}=await getServerPreferences();
  const text=getPageMessages(locale);
  return {
  title: text.dashboardTitle,
  description: text.dashboardDescription,
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: 'My links | MemoLink', description: 'Manage short links and view privacy-friendly analytics from the owning device.' },
  };
}

export default function ManageLayout({ children }: { children: React.ReactNode }) { return children; }
