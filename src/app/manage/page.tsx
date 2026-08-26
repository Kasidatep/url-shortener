'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { exportDeviceKey, getDeviceKey, importDeviceKey } from '@/lib/device';
import PreferenceControls from '@/components/PreferenceControls';

type LinkItem = {
  shortUrl: string; originalUrl: string; clicks: number; active: boolean;
  expirationType: string; maxClicks?: number; expirationDate?: string; createdAt: string; lastClickedAt?: string;
};

export default function ManagePage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    setLoading(true);
    const response = await fetch('/api/links', { headers: { 'x-device-key': getDeviceKey() }, cache: 'no-store' });
    const data = await response.json();
    setLinks(data.links || []);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function update(code: string, patch: Record<string, unknown>) {
    const response = await fetch('/api/links/' + encodeURIComponent(code), {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-device-key': getDeviceKey() }, body: JSON.stringify(patch),
    });
    if (response.ok) await load();
  }

  async function remove(code: string) {
    if (!window.confirm('Delete this short link permanently?')) return;
    const response = await fetch('/api/links/' + encodeURIComponent(code), { method: 'DELETE', headers: { 'x-device-key': getDeviceKey() } });
    if (response.ok) setLinks(items => items.filter(item => item.shortUrl !== code));
  }

  async function copyRecovery() {
    await navigator.clipboard.writeText(exportDeviceKey());
    setMessage('Recovery key copied. Keep it private.');
  }

  function restore() {
    try { importDeviceKey(recoveryKey.trim()); setRecoveryOpen(false); setMessage('Device ownership restored.'); void load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Invalid key'); }
  }

  return (
    <main className="dashboard-shell">
      <nav className="nav"><Link href="/" className="wordmark">← Kasidate Short</Link><div className="nav-actions"><PreferenceControls /><button className="nav-link button-link" onClick={() => setRecoveryOpen(value => !value)}>Recovery key</button></div></nav>
      <header className="dashboard-head"><div><p className="kicker">YOUR DEVICE · YOUR LINKS</p><h1>My links</h1><p>Manage links created on this browser. No account, no public dashboard.</p></div><Link href="/" className="primary-link">+ Create link</Link></header>

      {recoveryOpen ? <section className="recovery-card">
        <div><h2>Move or recover ownership</h2><p>Anyone with this private key can manage your links. Store it like a password.</p></div>
        <div className="recovery-actions"><button onClick={copyRecovery}>Copy my recovery key</button><input aria-label="Recovery key" placeholder="Paste a recovery key" value={recoveryKey} onChange={event => setRecoveryKey(event.target.value)} /><button onClick={restore}>Restore</button></div>
      </section> : null}
      {message ? <p className="notice" role="status">{message}</p> : null}

      {loading ? <div className="empty-state">Loading your links…</div> : links.length === 0 ? (
        <div className="empty-state"><h2>No links on this device yet.</h2><p>Create your first one. It takes about five seconds.</p><Link href="/">Create a short link →</Link></div>
      ) : (
        <div className="link-list">
          {links.map(item => <article className="link-card" key={item.shortUrl}>
            <div className="link-main">
              <div className="link-title"><span className={item.active ? 'status-live' : 'status-off'}>{item.active ? 'Live' : 'Paused'}</span><a href={'/' + item.shortUrl} target="_blank" rel="noreferrer">{location.origin}/{item.shortUrl}</a></div>
              <p title={item.originalUrl}>{item.originalUrl}</p>
              <div className="link-meta"><span>{item.clicks.toLocaleString()} clicks</span><span>Created {new Date(item.createdAt).toLocaleDateString()}</span>{item.lastClickedAt ? <span>Last visit {new Date(item.lastClickedAt).toLocaleDateString()}</span> : null}</div>
            </div>
            <div className="link-actions">
              <button onClick={() => navigator.clipboard.writeText(location.origin + '/' + item.shortUrl)}>Copy</button>
              <button onClick={() => update(item.shortUrl, { active: !item.active })}>{item.active ? 'Pause' : 'Activate'}</button>
              <button className="danger" onClick={() => remove(item.shortUrl)}>Delete</button>
            </div>
          </article>)}
        </div>
      )}
    </main>
  );
}
