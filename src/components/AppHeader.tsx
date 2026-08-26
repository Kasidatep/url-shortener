'use client';

import PreferenceControls from './PreferenceControls';
import { usePreferences } from './PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import MemoLinkLogo from './MemoLinkLogo';

export default function AppHeader({ active }: { active?: 'home' | 'links' | 'faq' }) {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  return <nav className="nav">
    <MemoLinkLogo/>
    <div className="nav-actions">
      <Link href="/" className={active === 'home' ? 'nav-link active' : 'nav-link nav-link-quiet'}>{text.navCreate}</Link>
      <Link href="/faq" className={active === 'faq' ? 'nav-link active' : 'nav-link nav-link-quiet'}>{text.navFaq}</Link>
      <PreferenceControls />
      <Link href="/manage" className={active === 'links' ? 'nav-link active' : 'nav-link'}>{text.navLinks}</Link>
    </div>
  </nav>;
}
