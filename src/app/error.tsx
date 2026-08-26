'use client';

import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import { usePreferences } from '@/components/PreferencesProvider';
import { systemMessages } from '@/config/system-i18n';

export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){
  const {locale}=usePreferences();
  const text=systemMessages[locale];
  return <main><AppHeader/><section className="system-state-page"><div className="system-pulse" aria-hidden="true"><i/><i/><i/></div><p className="state-kicker">{text.errorKicker}</p><h1>{text.unexpectedTitle}</h1><p>{text.unexpectedBody}</p><div className="state-actions"><button className="primary-button" onClick={reset}>{text.reset}</button><Link href="/" className="secondary-link">{text.goHome}</Link></div></section></main>;
}
