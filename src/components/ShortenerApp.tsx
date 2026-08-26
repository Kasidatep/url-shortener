'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ClipboardDocumentIcon, QrCodeIcon, ShareIcon, SparklesIcon } from '@heroicons/react/24/outline';
import QRCodeComponent from './QRCodeComponent';
import { getDeviceKey } from '@/lib/device';

type Expiration = 'none' | 'clicks' | 'datetime';

export default function ShortenerApp() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expirationType, setExpirationType] = useState<Expiration>('none');
  const [maxClicks, setMaxClicks] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [advanced, setAdvanced] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'copied'>('idle');
  const [error, setError] = useState('');

  const aliasPreview = useMemo(() => alias ? 'short.kasidate.me/' + alias : 'Custom name', [alias]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-device-key': getDeviceKey() },
        body: JSON.stringify({ url, customShortId: alias, password, expirationType, maxClicks, expirationDate }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create link');
      setShortUrl(window.location.origin + '/' + data.shortUrl);
      setShowQr(false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Something went wrong');
    } finally {
      setStatus('idle');
    }
  }

  async function paste() {
    try { setUrl(await navigator.clipboard.readText()); } catch { setError('Clipboard access was not available'); }
  }

  async function copy() {
    await navigator.clipboard.writeText(shortUrl);
    setStatus('copied');
    window.setTimeout(() => setStatus('idle'), 1600);
  }

  async function share() {
    if (navigator.share) await navigator.share({ title: 'Short link', url: shortUrl });
    else await copy();
  }

  return (
    <main>
      <nav className="nav">
        <Link href="/" className="brand"><Image src="/logo.png" alt="Kasidate Short" width={116} height={44} priority /></Link>
        <Link href="/manage" className="nav-link">My links</Link>
      </nav>

      <section className="hero">
        <div className="eyebrow"><SparklesIcon /> Smart links, less friction</div>
        <h1>Short links that stay <span>under your control.</span></h1>
        <p>Create a clean link with a QR code, password, click limit or expiration date. Free and no account required.</p>

        <form className="shortener-card" onSubmit={submit}>
          <label htmlFor="url">Paste your long link</label>
          <div className="url-row">
            <input id="url" type="url" inputMode="url" autoComplete="url" placeholder="https://example.com/very-long-link" value={url} onChange={(event) => setUrl(event.target.value)} required />
            <button type="button" className="ghost-button" onClick={paste}>Paste</button>
          </div>

          <button type="button" className="advanced-toggle" aria-expanded={advanced} onClick={() => setAdvanced(value => !value)}>
            {advanced ? '− Hide smart options' : '+ Add smart options'}
          </button>

          {advanced ? (
            <div className="advanced-grid">
              <div className="field">
                <label htmlFor="alias">Custom name</label>
                <input id="alias" placeholder="my-campaign" value={alias} maxLength={48} onChange={(event) => setAlias(event.target.value)} />
                <small>{aliasPreview}</small>
              </div>
              <div className="field">
                <label htmlFor="password">Password <span>optional</span></label>
                <input id="password" type="password" autoComplete="new-password" placeholder="Protect this link" value={password} maxLength={128} onChange={(event) => setPassword(event.target.value)} />
              </div>
              <fieldset className="field full">
                <legend>Expiration</legend>
                <div className="segments">
                  {(['none', 'clicks', 'datetime'] as Expiration[]).map(value => (
                    <button key={value} type="button" aria-pressed={expirationType === value} onClick={() => setExpirationType(value)}>
                      {value === 'none' ? 'Never' : value === 'clicks' ? 'After clicks' : 'Date & time'}
                    </button>
                  ))}
                </div>
              </fieldset>
              {expirationType === 'clicks' ? <div className="field full"><label htmlFor="clicks">Maximum clicks</label><input id="clicks" type="number" min="1" max="1000000" value={maxClicks} onChange={(event) => setMaxClicks(event.target.value)} required /></div> : null}
              {expirationType === 'datetime' ? <div className="field full"><label htmlFor="date">Expires on</label><input id="date" type="datetime-local" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} required /><small>Uses your device timezone</small></div> : null}
            </div>
          ) : null}

          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="primary-button" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Creating your link…' : 'Shorten link →'}
          </button>
          <p className="trust-line">No sign-up · Managed on this device · HTTPS links only</p>
        </form>

        {shortUrl ? (
          <section className="result-card" aria-live="polite">
            <div><span className="success-dot">✓</span><div><small>Your link is ready</small><a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></div></div>
            <div className="result-actions">
              <button type="button" onClick={copy}><ClipboardDocumentIcon />{status === 'copied' ? 'Copied' : 'Copy'}</button>
              <button type="button" onClick={share}><ShareIcon />Share</button>
              <button type="button" onClick={() => setShowQr(value => !value)}><QrCodeIcon />QR code</button>
            </div>
            {showQr ? <QRCodeComponent shortUrl={shortUrl} /> : null}
            <Link href="/manage" className="manage-link">Manage this link and view clicks →</Link>
          </section>
        ) : null}
      </section>

      <section className="features" aria-labelledby="features-title">
        <div><p className="kicker">BUILT FOR REAL SHARING</p><h2 id="features-title">One short link. Every useful control.</h2></div>
        <div className="feature-grid">
          <article><span>01</span><h3>Make it recognizable</h3><p>Choose a memorable custom name that people can trust and type.</p></article>
          <article><span>02</span><h3>Share beyond screens</h3><p>Generate and download a high-quality QR code in one click.</p></article>
          <article><span>03</span><h3>Control access</h3><p>Add a password, click limit or date without creating an account.</p></article>
          <article><span>04</span><h3>Keep ownership</h3><p>Your private device key lets this browser manage every link it creates.</p></article>
        </div>
      </section>

      <section className="faq">
        <p className="kicker">FAQ</p><h2>Short answers about short links.</h2>
        <details><summary>Do I need an account?</summary><p>No. Links are owned by a private key stored on the device that created them.</p></details>
        <details><summary>Can I manage my links later?</summary><p>Yes. Open My links on the same device to edit the destination, pause a link, see clicks or delete it.</p></details>
        <details><summary>What happens if I clear browser data?</summary><p>The device key is removed. Export your recovery key from My links before clearing browser data or moving devices.</p></details>
        <details><summary>Can I protect a short link?</summary><p>Yes. Add a password, expiration date or maximum number of visits.</p></details>
      </section>
    </main>
  );
}
