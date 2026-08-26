'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import { exportDeviceKey, getDeviceKey, importDeviceKey } from '@/lib/device';

type LinkItem = {
  shortUrl: string; originalUrl: string; clicks: number; active: boolean;
  expirationType: string; maxClicks?: number; expirationDate?: string; createdAt: string; lastClickedAt?: string;
};
type Analytics = { visits30d: number; daily: Record<string,number>; countries: Record<string,number>; devices: Record<string,number>; referrers: Record<string,number> };

function Breakdown({ title, values }: { title: string; values: Record<string,number> }) {
  const entries = Object.entries(values).sort((a,b) => b[1] - a[1]).slice(0,5);
  const max = entries[0]?.[1] || 1;
  return <section className="breakdown"><h4>{title}</h4>{entries.length ? entries.map(([label,value]) => <div className="breakdown-row" key={label}><span title={label}>{label}</span><div><i style={{ width: Math.max(6, value / max * 100) + '%' }} /></div><strong>{value}</strong></div>) : <p>—</p>}</section>;
}

function Trend({ values }: { values: Record<string,number> }) {
  const entries = Object.entries(values).sort((a,b) => a[0].localeCompare(b[0]));
  const max = Math.max(1, ...entries.map(item => item[1]));
  return <div className="trend" aria-label="Visit trend">{entries.map(([date,value]) => <div className="trend-column" key={date} title={date + ': ' + value}><i style={{ height: Math.max(4, value / max * 100) + '%' }} /><span>{date.slice(5)}</span></div>)}</div>;
}

export default function ManagePage() {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<Record<string,Analytics>>({});
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    setLoading(true);
    const response = await fetch('/api/links', { headers: { 'x-device-key': getDeviceKey() }, cache: 'no-store' });
    const data = await response.json(); setLinks(data.links || []); setLoading(false);
  }
  useEffect(() => { setOrigin(window.location.origin); void load(); }, []);

  const totals = useMemo(() => ({ clicks: links.reduce((sum,item) => sum + item.clicks,0), active: links.filter(item => item.active).length }), [links]);

  async function loadAnalytics(code: string) {
    if (selected === code) { setSelected(null); return; }
    setSelected(code);
    if (analytics[code]) return;
    setAnalyticsLoading(true);
    const response = await fetch('/api/links/' + encodeURIComponent(code) + '/analytics', { headers: { 'x-device-key': getDeviceKey() }, cache: 'no-store' });
    if (response.ok) { const data = await response.json(); setAnalytics(current => ({ ...current, [code]: data })); }
    setAnalyticsLoading(false);
  }
  async function update(code: string, patch: Record<string,unknown>) {
    const response = await fetch('/api/links/' + encodeURIComponent(code), { method:'PATCH', headers:{ 'Content-Type':'application/json','x-device-key':getDeviceKey() }, body:JSON.stringify(patch) });
    if (response.ok) await load();
  }
  async function remove(code: string) {
    if (!window.confirm(text.delete + '?')) return;
    const response = await fetch('/api/links/' + encodeURIComponent(code), { method:'DELETE', headers:{ 'x-device-key':getDeviceKey() } });
    if (response.ok) { setLinks(items => items.filter(item => item.shortUrl !== code)); setSelected(null); }
  }
  async function copyRecovery() { await navigator.clipboard.writeText(exportDeviceKey()); setMessage(text.copyRecovery); }
  function restore() {
    try { importDeviceKey(recoveryKey.trim()); setRecoveryOpen(false); setMessage(text.restore); void load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Invalid key'); }
  }

  return <main>
    <AppHeader active="links" />
    <div className="dashboard-shell">
      <header className="dashboard-head"><div><p className="kicker">{text.dashboardEyebrow}</p><h1>{text.dashboardTitle}</h1><p>{text.dashboardDescription}</p></div><div className="dashboard-actions"><button className="secondary-action" onClick={() => setRecoveryOpen(value => !value)}>{text.recovery}</button><Link href="/" className="primary-link">{text.createLink}</Link></div></header>

      <section className="summary-grid"><article><span>{text.navLinks}</span><strong>{links.length}</strong></article><article><span>{text.clicks}</span><strong>{totals.clicks.toLocaleString(locale)}</strong></article><article><span>{text.live}</span><strong>{totals.active}</strong></article></section>

      {recoveryOpen ? <section className="recovery-card"><div><h2>{text.recoverTitle}</h2><p>{text.recoverBody}</p></div><div className="recovery-actions"><button onClick={copyRecovery}>{text.copyRecovery}</button><input aria-label={text.pasteRecovery} placeholder={text.pasteRecovery} value={recoveryKey} onChange={event => setRecoveryKey(event.target.value)} /><button onClick={restore}>{text.restore}</button></div></section> : null}
      {message ? <p className="notice" role="status">{message}</p> : null}

      {loading ? <div className="empty-state">{text.loadingLinks}</div> : links.length === 0 ? <div className="empty-state"><h2>{text.noLinks}</h2><p>{text.noLinksBody}</p><Link href="/">{text.createLink} →</Link></div> : <div className="link-list">
        {links.map(item => {
          const detail = analytics[item.shortUrl];
          return <article className={selected === item.shortUrl ? 'link-card expanded' : 'link-card'} key={item.shortUrl}>
            <div className="link-card-row"><div className="link-main"><div className="link-title"><span className={item.active ? 'status-live' : 'status-off'}>{item.active ? text.live : text.paused}</span><a href={'/' + item.shortUrl} target="_blank" rel="noreferrer">{origin}/{item.shortUrl}</a></div><p title={item.originalUrl}>{item.originalUrl}</p><div className="link-meta"><span><strong>{item.clicks.toLocaleString(locale)}</strong> {text.clicks}</span><span>{text.created} {new Date(item.createdAt).toLocaleDateString(locale)}</span>{item.lastClickedAt ? <span>{text.lastVisit} {new Date(item.lastClickedAt).toLocaleDateString(locale)}</span> : null}</div></div>
            <div className="link-actions"><button onClick={() => navigator.clipboard.writeText(origin + '/' + item.shortUrl)}>{text.copy}</button><button onClick={() => loadAnalytics(item.shortUrl)}>{text.analytics}</button><button onClick={() => update(item.shortUrl,{active:!item.active})}>{item.active ? text.pause : text.activate}</button><button className="danger" onClick={() => remove(item.shortUrl)}>{text.delete}</button></div></div>
            {selected === item.shortUrl ? <section className="analytics-panel">{analyticsLoading && !detail ? <p>{text.loadingLinks}</p> : detail ? <><div className="analytics-head"><div><span>{text.visits30d}</span><strong>{detail.visits30d.toLocaleString(locale)}</strong></div><Trend values={detail.daily} /></div><div className="breakdown-grid"><Breakdown title={text.countries} values={detail.countries}/><Breakdown title={text.devices} values={detail.devices}/><Breakdown title={text.referrers} values={detail.referrers}/></div></> : <p>{text.noAnalytics}</p>}</section> : null}
          </article>;
        })}
      </div>}
    </div>
  </main>;
}
