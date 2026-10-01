'use client';

import Link from 'next/link';
import { PlusIcon, QuestionMarkCircleIcon, LinkIcon } from '@heroicons/react/24/outline';

import PreferenceControls from './PreferenceControls';
import { usePreferences } from './PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import MemoLinkLogo from './MemoLinkLogo';

export default function AppHeader({ active }: { active?: 'home' | 'links' | 'faq' }) {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  return <nav className="nav" aria-label="MemoLink">
    <MemoLinkLogo/>
    <PreferenceControls />
    <div className="nav-actions">
      {active !== 'home' ? <Link href="/" className="nav-link nav-link-quiet"><PlusIcon aria-hidden="true"/>{text.navCreate}</Link> : null}
      <Link href="/faq" aria-current={active === 'faq' ? 'page' : undefined} className={active === 'faq' ? 'nav-link active' : 'nav-link nav-link-quiet'}><QuestionMarkCircleIcon aria-hidden="true"/>{text.navFaq}</Link>
      <Link href="/manage" aria-current={active === 'links' ? 'page' : undefined} className={active === 'links' ? 'nav-link active' : 'nav-link'}><LinkIcon aria-hidden="true"/>{text.navLinks}</Link>
    </div>
  </nav>;
}
