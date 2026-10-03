'use client';

import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import { usePreferences } from '@/components/PreferencesProvider';
import { systemMessages } from '@/config/system-i18n';

export default function NotFound(){
  const {locale}=usePreferences();
  const text=systemMessages[locale];
  return <main><AppHeader/><section id="main-content" tabIndex={-1} className="system-state-page"><div className="system-orbit" aria-hidden="true"><span>4</span><i>0</i><span>4</span></div><p className="state-kicker">{text.notFoundKicker}</p><h1>{text.notFoundTitle}</h1><p>{text.notFoundBody}</p><div className="state-actions"><Link href="/" className="primary-link">{text.goHome}</Link><Link href="/faq" className="secondary-link">{({en:'Help',th:'ช่วยเหลือ',zh:'帮助',ja:'ヘルプ',ko:'도움말',es:'Ayuda'})[locale]}</Link></div></section></main>;
}
