'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShortLinkPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  const [state, setState] = useState<'checking' | 'password' | 'expired' | 'missing' | 'error'>('checking');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/shorten?code=' + encodeURIComponent(params.code), { cache: 'no-store' })
      .then(async response => {
        const data = await response.json();
        if (response.ok) router.replace(data.redirect);
        else if (response.status === 401) setState('password');
        else if (response.status === 404) setState('missing');
        else if (response.status === 410) { setMessage(data.message); setState('expired'); }
        else setState('error');
      })
      .catch(() => setState('error'));
  }, [params.code, router]);

  async function unlock(event: React.FormEvent) {
    event.preventDefault(); setMessage('');
    const response = await fetch('/api/unlock', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: params.code, password }) });
    const data = await response.json();
    if (response.ok) router.replace(data.redirect);
    else setMessage(data.message || 'Unable to open link');
  }

  return <main className="redirect-shell"><section className="redirect-card">
    {state === 'checking' ? <><div className="spinner" /><h1>Opening your link…</h1><p>One short moment.</p></> : null}
    {state === 'password' ? <><div className="lock">⌁</div><h1>This link is protected</h1><p>Enter the password shared by the link owner.</p><form onSubmit={unlock}><input type="password" autoFocus required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" />{message ? <p className="form-error" role="alert">{message}</p> : null}<button className="primary-button">Continue →</button></form></> : null}
    {state === 'expired' ? <><h1>This link is no longer active.</h1><p>{message || 'It may have expired or reached its click limit.'}</p><Link href="/">Create a new link →</Link></> : null}
    {state === 'missing' ? <><h1>We couldn’t find that link.</h1><p>Check the address or ask its owner for a new one.</p><Link href="/">Go home →</Link></> : null}
    {state === 'error' ? <><h1>Something interrupted the redirect.</h1><p>Please check your connection and try again.</p><button onClick={() => location.reload()}>Try again</button></> : null}
  </section></main>;
}
