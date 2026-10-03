'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, ChevronDownIcon, ClipboardDocumentIcon, LinkIcon, LockClosedIcon, PlusIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline';
import QRCodeComponent from './QRCodeComponent';
import ShareKit from './ShareKit';
import AppHeader from './AppHeader';
import { usePreferences } from './PreferencesProvider';
import { getDeviceKey } from '@/lib/device';
import { useNotifications } from './NotificationTray';
import { createMessages } from '@/config/create-i18n';
import AdvancedLinkSettings from './AdvancedLinkSettings';
import {normalizeUrlInput} from '@/lib/url-input';
import {utilityMessages} from '@/config/utility-i18n';
import {studioMessages} from '@/config/studio-i18n';
import LinkPlayground from './LinkPlayground';
import StudioDetails from './StudioDetails';

type Expiration = 'none' | 'clicks' | 'datetime';
type Panel = 'name' | 'access' | 'campaign' | null;
type Utm = { source: string; medium: string; campaign: string; term: string; content: string };
const EMPTY_UTM: Utm = { source: '', medium: '', campaign: '', term: '', content: '' };
const TRACKING_KEYS = ['fbclid', 'gclid', 'dclid', 'msclkid'];

function prepareUrl(raw: string, clean: boolean, utm: Utm) {
  const parsed = new URL(normalizeUrlInput(raw));
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid URL');
  if (clean) Array.from(parsed.searchParams.keys()).forEach(key => {
    if (key.startsWith('utm_') || TRACKING_KEYS.includes(key)) parsed.searchParams.delete(key);
  });
  Object.entries(utm).forEach(([key, value]) => {
    if (value.trim()) parsed.searchParams.set('utm_' + key, value.trim());
  });
  return parsed.toString();
}

export default function ShortenerApp() {
  const { t, locale } = usePreferences();
  const copy = createMessages[locale];
  const { notify } = useNotifications();
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [expirationType, setExpirationType] = useState<Expiration>('none');
  const [maxClicks, setMaxClicks] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [panel, setPanel] = useState<Panel>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [cleanTracking, setCleanTracking] = useState(false);
  const [utm, setUtm] = useState<Utm>(EMPTY_UTM);
  const [result, setResult] = useState<{ shortUrl: string; destination: string } | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');
  const closeShare = useCallback(() => setShareOpen(false), []);
  const urlRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const requestPending = useRef(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOptions = !!(alias || password || expirationType !== 'none' || cleanTracking || Object.values(utm).some(value => value.trim()));
  const utility=utilityMessages[locale];
  const studio=studioMessages[locale];
  let validUrl=false; try { normalizeUrlInput(url); validUrl=true; } catch {}

  useEffect(() => { if (error && errorField) document.getElementById(errorField)?.focus(); }, [error, errorField, panel]);
  useEffect(() => { if (result) resultRef.current?.focus(); }, [result]);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  function resetOptions() {
    setAlias(''); setPassword(''); setExpirationType('none'); setMaxClicks(''); setExpirationDate('');
    setCleanTracking(false); setUtm(EMPTY_UTM); setPanel(null); setOptionsOpen(false); setError('');
  }
  function another() {
    resetOptions(); setUrl(''); setResult(null); setShowQr(false); setShareOpen(false); setCopied(false);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    requestAnimationFrame(() => urlRef.current?.focus());
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (requestPending.current) return;
    setError(''); setErrorField('');
    let finalUrl: string;
    try { finalUrl = prepareUrl(url, cleanTracking, utm); }
    catch { setErrorField('url'); setError(copy.invalidUrl); urlRef.current?.focus(); return; }
    if (alias && !/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,47}$/.test(alias)) {
      setOptionsOpen(true); setPanel('name'); setErrorField('alias'); setError(copy.invalidAlias); return;
    }
    if (expirationType === 'clicks' && (!Number.isInteger(Number(maxClicks)) || Number(maxClicks) < 1 || Number(maxClicks) > 1000000)) {
      setOptionsOpen(true); setPanel('access'); setErrorField('clicks'); setError(copy.invalidClicks); return;
    }
    if (expirationType === 'datetime' && (!expirationDate || !Number.isFinite(new Date(expirationDate).getTime()) || new Date(expirationDate).getTime() <= Date.now())) {
      setOptionsOpen(true); setPanel('access'); setErrorField('date'); setError(copy.invalidDate); return;
    }
    requestPending.current = true; setLoading(true);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-device-key': getDeviceKey() },
        body: JSON.stringify({ url: finalUrl, customShortId: alias, password, expirationType, maxClicks, expirationDate }),
      });
      if (response.status === 409) { setOptionsOpen(true); setPanel('name'); setErrorField('alias'); throw new Error(copy.aliasTaken); }
      if (response.status === 429) throw new Error(copy.rateLimit);
      if (!response.ok) throw new Error(t('createFailed'));
      const data = await response.json();
      if (typeof data.shortUrl !== 'string' || !/^[a-zA-Z0-9_-]{3,48}$/.test(data.shortUrl)) throw new Error(t('createFailed'));
      setResult({ shortUrl: window.location.origin + '/' + data.shortUrl, destination: finalUrl });
      setPassword(''); setShowQr(false); setCopied(false);
    } catch (reason) { setError(reason instanceof Error && [copy.aliasTaken,copy.rateLimit,t('createFailed')].includes(reason.message) ? reason.message : t('createFailed')); }
    finally { requestPending.current = false; setLoading(false); }
  }
  async function paste() {
    try { setUrl((await navigator.clipboard.readText()).trim()); setError(''); urlRef.current?.focus(); }
    catch { notify(t('clipboardFailed'), 'error'); urlRef.current?.focus(); }
  }
  async function copyLink() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shortUrl); setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch { notify(t('clipboardFailed'), 'error'); }
  }

  return <main className="create-page">
    <AppHeader active="home"/>
    <section id="main-content" tabIndex={-1} className="create-workspace" aria-labelledby="create-title">
      <header className="create-intro"><p className="kicker"><span className="brand-dot" aria-hidden="true"/>{studio.eyebrow}</p><h1 id="create-title">{studio.heroFirst}<em>{studio.heroSecond}</em></h1><p>{studio.heroBody}</p><ul className="hero-notes"><li>{studio.free}</li><li>{studio.noSignup}</li><li>{studio.qrIncluded}</li></ul></header>
      <div className="create-surface">
        {!result ? <form onSubmit={submit} noValidate className="link-composer" aria-busy={loading}>
          <div className="composer-heading"><span className="section-index">↗</span><div><h2>{studio.composerTitle}</h2><p>{studio.composerHint}</p></div></div>
          <fieldset disabled={loading} className="composer-fields">
            <label className="destination-label" htmlFor="url">{t('pasteLongLink')}</label>
            <div className={"destination-input"+(errorField==='url' && error ? ' invalid' : validUrl ? ' valid' : '')}><LinkIcon aria-hidden="true"/><input ref={urlRef} id="url" name="url" type="url" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="example.com/your-link" value={url} onChange={event => { setUrl(event.target.value); setError(''); }} aria-invalid={!!error && errorField==='url'} aria-describedby={error && errorField==='url' ? 'create-error' : undefined} required/><button type="button" onClick={paste}>{t('paste')}</button></div>
            {validUrl && !error ? <p className="field-success" role="status"><CheckIcon aria-hidden="true"/>{utility.valid}</p> : null}
            {error ? <p id="create-error" className="composer-error" role="alert">{error}</p> : null}
            <button className="create-submit" type="submit" disabled={loading}>{loading ? <><i className="create-spinner" aria-hidden="true"/>{t('loading')}</> : <>{t('shorten')}<ArrowRightIcon aria-hidden="true"/></>}</button>
            <div className="options-heading"><button type="button" aria-expanded={optionsOpen} aria-controls="composer-options" onClick={()=>setOptionsOpen(value=>!value)}>{copy.options}<small>{copy.optional}</small>{hasOptions ? <CheckIcon aria-hidden="true"/> : null}<ChevronDownIcon aria-hidden="true"/></button>{hasOptions ? <button type="button" onClick={resetOptions}>{copy.reset}</button> : null}</div>
            {optionsOpen ? <AdvancedLinkSettings alias={alias} setAlias={setAlias} password={password} setPassword={setPassword} expirationType={expirationType} setExpirationType={setExpirationType} maxClicks={maxClicks} setMaxClicks={setMaxClicks} expirationDate={expirationDate} setExpirationDate={setExpirationDate} cleanTracking={cleanTracking} setCleanTracking={setCleanTracking} utm={utm} setUtm={setUtm} error={error} errorField={errorField}/> : null}

          </fieldset>
          <p className="create-assurance"><LockClosedIcon aria-hidden="true"/>{copy.noAccount}</p>
        </form> : <section className="creation-result" aria-labelledby="result-title">
          <div className="result-success" aria-hidden="true"><CheckIcon/></div><h2 ref={resultRef} tabIndex={-1} id="result-title">{copy.done}</h2><p>{copy.doneHint}</p>
          <a className="created-url" href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl.replace(/^https?:\/\//,'')}<ArrowUpRightIcon aria-hidden="true"/></a>
          <div className="result-destination"><span>{copy.destination}</span><p title={result.destination}>{result.destination}</p></div>
          <button className="create-submit" type="button" onClick={copyLink}>{copied ? <CheckIcon aria-hidden="true"/> : <ClipboardDocumentIcon aria-hidden="true"/>}<span aria-live="polite">{copied ? t('copied') : t('copy')}</span></button>
          <div className="created-actions"><button type="button" onClick={()=>setShareOpen(true)}><ShareIcon aria-hidden="true"/>{t('share')}</button><button type="button" aria-expanded={showQr} aria-controls="created-qr" onClick={()=>setShowQr(value=>!value)}><QrCodeIcon aria-hidden="true"/>{t('qr')}</button></div>
          {showQr ? <div id="created-qr"><QRCodeComponent shortUrl={result.shortUrl}/></div> : null}
          <p className="recovery-reminder">{copy.recovery} <Link href="/manage">{t('myLinks')}<ArrowUpRightIcon aria-hidden="true"/></Link></p>
          <button className="create-another" type="button" onClick={another}><PlusIcon aria-hidden="true"/>{copy.another}</button>
        </section>}
      </div>
    </section>
    <LinkPlayground/>
    <StudioDetails/>
    {result ? <ShareKit open={shareOpen} url={result.shortUrl} onClose={closeShare}/> : null}
  </main>;
}
