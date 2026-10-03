'use client';

import Link from 'next/link';
import { KeyIcon, LinkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useNotifications } from '@/components/NotificationTray';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import { dialogMessages } from '@/config/dialog-i18n';
import { exportDeviceKey, getDeviceKey, importDeviceKey } from '@/lib/device';


import LinkSummary from '@/components/links/LinkSummary';
import LinkListItem,{LinkItem,linkStatus} from '@/components/links/LinkListItem';
import ListSkeleton from '@/components/ui/ListSkeleton';
import SearchInput from '@/components/ui/SearchInput';
import Disclosure from '@/components/ui/Disclosure';
import ShareKit from '@/components/ShareKit';
import {utilityMessages} from '@/config/utility-i18n';
import {studioMessages} from '@/config/studio-i18n';
type Analytics = { visits30d: number; daily: Record<string,number>; countries: Record<string,number>; devices: Record<string,number>; referrers: Record<string,number> };

function Breakdown({ title, values }: { title: string; values: Record<string,number> }) {
  const entries = Object.entries(values).sort((a,b) => b[1] - a[1]).slice(0,5);
  const max = entries[0]?.[1] || 1;
  return <section className="breakdown"><h4>{title}</h4>{entries.length ? entries.map(([label,value]) => <div className="breakdown-row" key={label}><span title={label}>{label}</span><div><i style={{ width: Math.max(6, value / max * 100) + '%' }} /></div><strong>{value}</strong></div>) : <p>—</p>}</section>;
}

function Trend({ values, label, empty }: { values: Record<string,number>; label:string; empty:string }) {
  const entries = Object.entries(values).sort((a,b) => a[0].localeCompare(b[0]));
  const max = Math.max(1, ...entries.map(item => item[1]));
  if(!entries.length)return <p className="analytics-empty">{empty}</p>;
  return <div className="trend" role="list" aria-label={label}>{entries.map(([date,value]) => <div className="trend-column" role="listitem" tabIndex={0} aria-label={date + ': ' + value} key={date} title={date + ': ' + value}><i style={{ height: Math.max(4, value / max * 100) + '%' }} /><span>{date.slice(5)}</span></div>)}</div>;
}

export default function ManagePage() {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const copy=utilityMessages[locale];
  const studio=studioMessages[locale];
  const [recoveryOpen,setRecoveryOpen]=useState(false);
  useEffect(()=>{
    const revealRecovery=()=>{if(window.location.hash==='#recovery')setRecoveryOpen(true);};
    revealRecovery();window.addEventListener('hashchange',revealRecovery);
    return()=>window.removeEventListener('hashchange',revealRecovery);
  },[]);
  const [query,setQuery]=useState('');const [filter,setFilter]=useState('all');const [sort,setSort]=useState('newest');const [limit,setLimit]=useState(20);
  const [shareUrl,setShareUrl]=useState('');const closeShare=useCallback(()=>setShareUrl(''),[]);
  const [analyticsErrors,setAnalyticsErrors]=useState<Record<string,boolean>>({});
  const dialog = dialogMessages[locale];
  const { notify } = useNotifications();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [origin, setOrigin] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<Record<string,Analytics>>({});
  const [analyticsLoading, setAnalyticsLoading] = useState<Record<string,boolean>>({});
  const [recoveryKey, setRecoveryKey] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deleting,setDeleting]=useState(false);const cancelDelete=useCallback(()=>{if(!deleting)setPendingDelete(null)},[deleting]);

  async function load() {
    setLoading(true); setLoadError(false);
    try {
      const response = await fetch('/api/links', { headers: { 'x-device-key': getDeviceKey() }, cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load links');
      const data = await response.json(); setLinks(data.links || []);
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }
  useEffect(() => { setOrigin(window.location.origin); void load(); }, []);

  const totals = useMemo(() => ({ clicks: links.reduce((sum,item) => sum + item.clicks,0), active: links.filter(item => linkStatus(item)==='active').length }), [links]);

  const filtered=useMemo(()=>links.filter(item=>(filter==='all'||linkStatus(item)===filter)&&(item.shortUrl+' '+item.originalUrl).toLocaleLowerCase(locale).includes(query.trim().toLocaleLowerCase(locale))).sort((a,b)=>sort==='popular'?b.clicks-a.clicks:sort==='oldest'?Date.parse(a.createdAt)-Date.parse(b.createdAt):sort==='recent'?Date.parse(b.lastClickedAt||'1970-01-01')-Date.parse(a.lastClickedAt||'1970-01-01'):Date.parse(b.createdAt)-Date.parse(a.createdAt)),[links,filter,query,sort,locale]);
  useEffect(()=>setLimit(20),[query,filter,sort]);
  async function loadAnalytics(code: string,force=false) {
    if (!force && selected === code) { setSelected(null); return; }
    setSelected(code);
    if (analytics[code]) return;
    setAnalyticsLoading(v=>({...v,[code]:true}));
    try {
      const response=await fetch('/api/links/'+encodeURIComponent(code)+'/analytics',{headers:{'x-device-key':getDeviceKey()},cache:'no-store'});
      if(!response.ok)throw new Error();const data=await response.json();setAnalytics(current=>({...current,[code]:data}));setAnalyticsErrors(current=>({...current,[code]:false}));
    } catch {setAnalyticsErrors(current=>({...current,[code]:true}));} finally {setAnalyticsLoading(v=>({...v,[code]:false}));}
  }
  async function update(code:string,patch:Record<string,unknown>){
    try{const response=await fetch('/api/links/'+encodeURIComponent(code),{method:'PATCH',headers:{'Content-Type':'application/json','x-device-key':getDeviceKey()},body:JSON.stringify(patch)});if(!response.ok)throw new Error();const data=await response.json();setLinks(items=>items.map(item=>item.shortUrl===code?{...item,...data.link}:item));return true;}catch{notify(dialog.actionFailed,'error');return false;}
  }
  async function remove(code:string){
    if(deleting)return;setDeleting(true);
    try{const response=await fetch('/api/links/'+encodeURIComponent(code),{method:'DELETE',headers:{'x-device-key':getDeviceKey()}});if(!response.ok)throw new Error();setLinks(items=>items.filter(item=>item.shortUrl!==code));setSelected(null);notify(dialog.deleted,'success');}catch{notify(dialog.actionFailed,'error');}finally{setPendingDelete(null);setDeleting(false);}
  }

  async function copyRecovery(){try{await navigator.clipboard.writeText(exportDeviceKey());notify(dialog.recoveryCopied,'success');}catch{notify(dialog.actionFailed,'error');}}
  function restore() {
    try {
      importDeviceKey(recoveryKey.trim());
      setSelected(null);setAnalytics({});setAnalyticsErrors({});setRecoveryKey('');
      notify(dialog.restored, 'success');
      void load();
    } catch {
      notify(dialog.actionFailed, 'error');
    }
  }

  return <main className="utility-page manage-page">
    <AppHeader active="links" />
    <div id="main-content" tabIndex={-1} className="dashboard-shell">
      <header className="dashboard-head"><div><p className="kicker">{studio.manageEyebrow}</p><h1>{text.dashboardTitle}</h1><p className="dashboard-tagline">{studio.manageTitle}</p><p>{studio.manageBody}</p></div><Link href="/" className="ui-button primary"><PlusIcon aria-hidden="true"/>{text.navCreate}</Link></header>
      <p className="device-notice"><KeyIcon aria-hidden="true"/>{studio.deviceNote}</p>
      <LinkSummary count={links.length} clicks={totals.clicks} active={totals.active} pending={loading||loadError}/>
      <div className="manager-tools"><SearchInput value={query} onChange={setQuery} label={copy.search} clearLabel={copy.all}/><Disclosure label={copy.filters}><label>{copy.filters}<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">{copy.all}</option><option value="active">{text.live}</option><option value="paused">{text.paused}</option><option value="expired">{copy.expired}</option></select></label><label>{copy.newest} / {copy.popular}<select value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">{copy.newest}</option><option value="oldest">{copy.oldest}</option><option value="popular">{copy.popular}</option><option value="recent">{copy.recent}</option></select></label></Disclosure></div>
      {!loading&&!loadError&&links.length>0?<div className="collection-heading"><h2>{studio.collection}</h2><span aria-live="polite">{filtered.length} {studio.results}</span></div>:null}
      {!loading&&!loadError&&links.length>=200?<p className="list-limit-note">{studio.listLimit}</p>:null}
      {loadError ? <section className="load-error" role="alert"><h2>{dialog.actionFailed}</h2><p>{text.retryBody}</p><button className="secondary-action" onClick={()=>void load()}>{text.retry}</button></section> : loading ? <ListSkeleton label={text.loadingLinks}/> : links.length === 0 ? <div className="empty-state"><LinkIcon aria-hidden="true"/><h2>{text.noLinks}</h2><p>{copy.emptyHint}</p><Link href="/">{text.createLink} →</Link></div> : <div className="link-list">
        {filtered.slice(0,limit).map(item => {
          const detail = analytics[item.shortUrl];
          return <LinkListItem key={item.shortUrl} item={item} origin={origin} onUpdate={patch=>update(item.shortUrl,patch)} onDelete={()=>setPendingDelete(item.shortUrl)} onAnalytics={()=>void loadAnalytics(item.shortUrl)} onShare={()=>setShareUrl(origin+'/'+item.shortUrl)}>
            {selected === item.shortUrl ? <section className="analytics-panel">{analyticsLoading[item.shortUrl] && !detail ? <p>{text.loadingLinks}</p> : detail ? <><div className="analytics-head"><div><span>{text.visits30d}</span><strong>{detail.visits30d.toLocaleString(locale)}</strong></div><Trend values={detail.daily} label={text.visits30d} empty={studio.emptyAnalytics}/></div><div className="breakdown-grid"><Breakdown title={text.countries} values={detail.countries}/><Breakdown title={text.devices} values={detail.devices}/><Breakdown title={text.referrers} values={detail.referrers}/></div></> : analyticsErrors[item.shortUrl] ? <div role="alert"><p>{text.retryBody}</p><button className="ui-button secondary" onClick={()=>{void loadAnalytics(item.shortUrl,true);}}>{text.retry}</button></div> : <p>{text.noAnalytics}</p>}</section> : null}
          </LinkListItem>;
        })}
      </div>}
      {!loading&&!loadError&&links.length>0&&filtered.length===0?<section className="empty-state"><h2>{copy.noResults}</h2><p>{copy.searchHint}</p><button className="ui-button secondary" onClick={()=>{setQuery('');setFilter('all');}}>{studio.reset}</button></section>:null}
      {filtered.length>limit?<button className="ui-button secondary" onClick={()=>setLimit(v=>v+20)}>{copy.moreLinks} ({filtered.length-limit})</button>:null}
      <Disclosure id="recovery" defaultOpen={recoveryOpen} className="recovery-panel" label={text.recovery}><p>{copy.recoveryHint}</p><p>{text.recoverBody}</p><div className="recovery-actions"><button onClick={copyRecovery}>{text.copyRecovery}</button><label htmlFor="recovery-key">{text.pasteRecovery}</label><input id="recovery-key" autoComplete="off" value={recoveryKey} onChange={e=>setRecoveryKey(e.target.value)}/><button onClick={restore} disabled={!recoveryKey.trim()}>{text.restore}</button></div></Disclosure>

    </div>
    {shareUrl ? <ShareKit open url={shareUrl} onClose={closeShare}/> : null}
    <ConfirmDialog
      open={pendingDelete !== null}
      title={dialog.deleteTitle}
      description={dialog.deleteBody}
      confirmLabel={text.delete}
      cancelLabel={dialog.cancel}
      danger
      onCancel={cancelDelete}
      busy={deleting}
      onConfirm={() => pendingDelete && void remove(pendingDelete)}
    />
  </main>;
}
