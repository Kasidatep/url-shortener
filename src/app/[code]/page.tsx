'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PreferenceControls from '@/components/PreferenceControls';
import MemoLinkLogo from '@/components/MemoLinkLogo';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';

export default function ShortLinkPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const [state, setState] = useState<'checking'|'password'|'expired'|'missing'|'error'>('checking');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/shorten?code=' + encodeURIComponent(params.code), { cache:'no-store' })
      .then(async response => {
        const data = await response.json();
        if (response.ok) router.replace(data.redirect);
        else if (response.status === 401) setState('password');
        else if (response.status === 404) setState('missing');
        else if (response.status === 410) setState('expired');
        else setState('error');
      }).catch(() => setState('error'));
  }, [params.code,router]);

  async function unlock(event: React.FormEvent) {
    event.preventDefault(); setMessage('');
    const response = await fetch('/api/unlock',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:params.code,password})});
    const data = await response.json();
    if (response.ok) router.replace(data.redirect); else setMessage(data.message || text.unavailable);
  }

  return <main className="redirect-page">
    <header className="redirect-nav"><MemoLinkLogo/><PreferenceControls /></header>
    <div className="redirect-shell"><section className="redirect-card">
      {state === 'checking' ? <><div className="spinner"/><h1>{text.checking}</h1></> : null}
      {state === 'password' ? <><div className="lock">↗</div><h1>{text.protectedTitle}</h1><p>{text.protectedBody}</p><form onSubmit={unlock}><input type="password" autoFocus required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} placeholder={text.password}/>{message ? <p className="form-error" role="alert">{message}</p> : null}<button className="primary-button">{text.continue} →</button></form></> : null}
      {state === 'expired' ? <><h1>{text.unavailable}</h1><p>{text.unavailableBody}</p><Link href="/">{text.navCreate} →</Link></> : null}
      {state === 'missing' ? <><h1>{text.missing}</h1><p>{text.missingBody}</p><Link href="/">{text.navHome} →</Link></> : null}
      {state === 'error' ? <><h1>{text.retryTitle}</h1><p>{text.retryBody}</p><button onClick={() => location.reload()}>{text.retry}</button></> : null}
    </section></div>
  </main>;
}
