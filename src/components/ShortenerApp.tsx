'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ClipboardDocumentIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline';
import QRCodeComponent from './QRCodeComponent';
import ShareKit from './ShareKit';
import PreferenceControls from './PreferenceControls';
import { usePreferences } from './PreferencesProvider';
import { getDeviceKey } from '@/lib/device';
import { getPageMessages } from '@/config/page-i18n';
import { experienceMessages } from '@/config/experience-i18n';
import MemoLinkLogo from './MemoLinkLogo';
import { useNotifications } from './NotificationTray';

type Expiration = 'none' | 'clicks' | 'datetime';
type Utm = { source: string; medium: string; campaign: string; term: string; content: string };
const EMPTY_UTM: Utm = { source: '', medium: '', campaign: '', term: '', content: '' };
const TRACKING_KEYS = ['fbclid', 'gclid', 'dclid', 'msclkid'];

function prepareUrl(raw: string, clean: boolean, utm: Utm) {
  const parsed = new URL(raw);
  if (clean) {
    Array.from(parsed.searchParams.keys()).forEach(key => {
      if (key.startsWith('utm_') || TRACKING_KEYS.includes(key)) parsed.searchParams.delete(key);
    });
  }
  Object.entries(utm).forEach(([key, value]) => {
    if (value.trim()) parsed.searchParams.set('utm_' + key, value.trim());
  });
  return parsed.toString();
}

export default function ShortenerApp() {
  const { t, locale } = usePreferences();
  const { notify } = useNotifications();
  const pageText = getPageMessages(locale);
  const experience = experienceMessages[locale];
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expirationType, setExpirationType] = useState<Expiration>('none');
  const [maxClicks, setMaxClicks] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [advanced, setAdvanced] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [cleanTracking, setCleanTracking] = useState(true);
  const [utm, setUtm] = useState<Utm>(EMPTY_UTM);
  const [shortUrl, setShortUrl] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'copied'>('idle');
  const [error, setError] = useState('');

  const aliasPreview = useMemo(() => alias ? 'short.kasidate.me/' + alias : t('customName'), [alias, t]);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(''); setStatus('loading');
    try {
      const finalUrl = prepareUrl(url, cleanTracking, utm);
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-device-key': getDeviceKey() },
        body: JSON.stringify({ url: finalUrl, customShortId: alias, password, expirationType, maxClicks, expirationDate }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create link');
      setShortUrl(window.location.origin + '/' + data.shortUrl); setShowQr(false); notify(t('ready'), 'success');
    } catch (reason) { const message = reason instanceof Error ? reason.message : 'Something went wrong'; setError(message); notify(message, 'error'); }
    finally { setStatus('idle'); }
  }

  async function paste() {
    try { setUrl(await navigator.clipboard.readText()); } catch { notify('Clipboard access was not available', 'error'); }
  }
  async function copy() { await navigator.clipboard.writeText(shortUrl); setStatus('copied'); notify(t('copied'), 'success'); window.setTimeout(() => setStatus('idle'), 1600); }
  function changeUtm(key: keyof Utm, value: string) { setUtm(current => ({ ...current, [key]: value })); }

  return <main>
    <nav className="nav">
      <MemoLinkLogo/>
      <div className="nav-actions"><Link href="/faq" className="nav-link nav-link-quiet">{pageText.navFaq}</Link><PreferenceControls /><Link href="/manage" className="nav-link">{t('myLinks')}</Link></div>
    </nav>

    <section className="hero">
      <h1>{t('heroA')} <span>{t('heroB')}</span></h1>
      <p>{t('heroDescription')}</p>

      <form className="shortener-card" onSubmit={submit}>
        <label htmlFor="url">{t('pasteLongLink')}</label>
        <div className="url-row"><input id="url" type="url" inputMode="url" autoComplete="url" placeholder="https://example.com/very-long-link" value={url} onChange={event => setUrl(event.target.value)} required /><button type="button" className="ghost-button" onClick={paste}>{t('paste')}</button></div>
        <div className="option-toggles">
          <button type="button" className="advanced-toggle" aria-expanded={advanced} onClick={() => setAdvanced(value => !value)}>{advanced ? t('hideOptions') : t('addOptions')}</button>
          <button type="button" className="advanced-toggle" aria-expanded={campaignOpen} onClick={() => setCampaignOpen(value => !value)}>+ {t('campaignTools')}</button>
        </div>

        {advanced ? <div className="advanced-grid">
          <div className="field"><label htmlFor="alias">{t('customName')}</label><input id="alias" placeholder="my-campaign" value={alias} maxLength={48} onChange={event => setAlias(event.target.value)} /><small>{aliasPreview}</small></div>
          <div className="field"><label htmlFor="password">{t('password')} <span>{t('optional')}</span></label><input id="password" type="password" autoComplete="new-password" placeholder={t('protectLink')} value={password} maxLength={128} onChange={event => setPassword(event.target.value)} /></div>
          <fieldset className="field full"><legend>{t('expiration')}</legend><div className="segments">{(['none', 'clicks', 'datetime'] as Expiration[]).map(value => <button key={value} type="button" aria-pressed={expirationType === value} onClick={() => setExpirationType(value)}>{value === 'none' ? t('never') : value === 'clicks' ? t('afterClicks') : t('dateTime')}</button>)}</div></fieldset>
          {expirationType === 'clicks' ? <div className="field full"><label htmlFor="clicks">{t('maximumClicks')}</label><input id="clicks" type="number" min="1" max="1000000" value={maxClicks} onChange={event => setMaxClicks(event.target.value)} required /></div> : null}
          {expirationType === 'datetime' ? <div className="field full"><label htmlFor="date">{t('expiresOn')}</label><input id="date" type="datetime-local" value={expirationDate} onChange={event => setExpirationDate(event.target.value)} required /><small>{t('timezone')}</small></div> : null}
        </div> : null}

        {campaignOpen ? <fieldset className="campaign-panel"><legend>{t('campaignTools')}</legend><label className="check-row"><input type="checkbox" checked={cleanTracking} onChange={event => setCleanTracking(event.target.checked)} />{t('removeTracking')}</label><div className="utm-grid">{(Object.keys(EMPTY_UTM) as Array<keyof Utm>).map(key => <div className="field" key={key}><label htmlFor={'utm-' + key}>{t(key)}</label><input id={'utm-' + key} value={utm[key]} onChange={event => changeUtm(key, event.target.value)} placeholder={key === 'source' ? 'newsletter' : key === 'medium' ? 'email' : ''} /></div>)}</div></fieldset> : null}

        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <button className="primary-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? t('loading') : t('shorten')}</button>
        <p className="trust-line">{t('trust')}</p>
      </form>

      {shortUrl ? <section className="result-card" aria-live="polite"><div><span className="success-dot">✓</span><div><small>{t('ready')}</small><a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></div></div><div className="result-actions"><button type="button" onClick={copy}><ClipboardDocumentIcon />{status === 'copied' ? t('copied') : t('copy')}</button><button type="button" onClick={() => setShareOpen(true)}><ShareIcon />{t('share')}</button><button type="button" onClick={() => setShowQr(value => !value)}><QrCodeIcon />{t('qr')}</button></div>{showQr ? <QRCodeComponent shortUrl={shortUrl} /> : null}<Link href="/manage" className="manage-link">{t('manage')}</Link></section> : null}
      <ShareKit open={shareOpen} url={shortUrl} onClose={() => setShareOpen(false)}/>
    </section>

    <section className="features" aria-labelledby="features-title"><div><p className="kicker">{t('featuresKicker')}</p><h2 id="features-title">{t('featuresTitle')}</h2></div><div className="feature-grid">{[[t('f1Title'),t('f1Body')],[t('f2Title'),t('f2Body')],[t('f3Title'),t('f3Body')],[experience.shareFeatureTitle,experience.shareFeatureBody]].map((item,index) => <article key={item[0]}><span>0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
  </main>;
}
