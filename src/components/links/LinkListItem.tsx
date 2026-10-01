'use client';
import {useEffect,useState} from 'react';
import {usePreferences} from '../PreferencesProvider';
import {getPageMessages} from '@/config/page-i18n';
import {utilityMessages} from '@/config/utility-i18n';
import {normalizeUrlInput} from '@/lib/url-input';
import LinkActionsMenu from './LinkActionsMenu';
import Button from '../ui/Button';
import QRCodeComponent from '../QRCodeComponent';
export type LinkItem={shortUrl:string;originalUrl:string;clicks:number;active:boolean;expirationType:string;maxClicks?:number;expirationDate?:string;createdAt:string;lastClickedAt?:string};
export function linkStatus(item:LinkItem){return item.expirationType==='datetime'&&item.expirationDate&&new Date(item.expirationDate).getTime()<=Date.now()||item.expirationType==='clicks'&&item.clicks>=(item.maxClicks||0)?'expired':item.active?'active':'paused';}
export default function LinkListItem({item,origin,onUpdate,onDelete,onAnalytics,onShare,children}:{item:LinkItem;origin:string;onUpdate:(patch:Record<string,unknown>)=>Promise<boolean>;onDelete:()=>void;onAnalytics:()=>void;onShare:()=>void;children:React.ReactNode}){
 const {locale,t}=usePreferences();const text=getPageMessages(locale);const copy=utilityMessages[locale];
 const [copied,setCopied]=useState(false);const [error,setError]=useState('');const [qr,setQr]=useState(false);const [editing,setEditing]=useState(false);const [destination,setDestination]=useState(item.originalUrl);const [busy,setBusy]=useState(false);
 useEffect(()=>{if(!copied)return;const timer=setTimeout(()=>setCopied(false),2000);return()=>clearTimeout(timer);},[copied]);
 useEffect(()=>{if(editing)document.getElementById('edit-'+item.shortUrl)?.focus();},[editing,item.shortUrl]);
 const status=linkStatus(item);const url=origin+'/'+item.shortUrl;
 async function update(patch:Record<string,unknown>){setBusy(true);setError('');try{if(await onUpdate(patch))setEditing(false);else setError(text.retryBody);}finally{setBusy(false);}}
 async function copyLink(){try{await navigator.clipboard.writeText(url);setCopied(true);}catch{setError(t('clipboardFailed'));}}
 return <article className="managed-link" aria-busy={busy}>
 <div className="managed-link-main"><span className={'link-status '+status}>{status==='expired'?copy.expired:status==='active'?text.live:text.paused}</span><a className="managed-url" href={'/'+item.shortUrl} target="_blank" rel="noreferrer">{origin.replace(/^https?:\/\//,'')}/{item.shortUrl}</a><p className="managed-destination" title={item.originalUrl}>{item.originalUrl}</p><div className="link-meta"><span>{item.clicks.toLocaleString(locale)} {text.clicks}</span><span>{item.lastClickedAt?text.lastVisit:text.created} {new Date(item.lastClickedAt||item.createdAt).toLocaleDateString(locale)}</span></div></div>
 <div className="managed-actions"><Button onClick={copyLink}><span aria-live="polite">{copied?'✓ '+t('copied'):text.copy}</span></Button><Button variant="ghost" onClick={onShare}>{copy.share}</Button><LinkActionsMenu label={copy.more} actions={[{label:text.analytics,action:onAnalytics},{label:copy.edit,action:()=>setEditing(v=>!v)},{label:item.active?text.pause:text.activate,action:()=>{if(!busy)void update({active:!item.active})}},{label:copy.qr,action:()=>setQr(v=>!v)},{label:text.delete,action:onDelete,danger:true}]}/></div>
 {error&&<p className="field-error" role="alert">{error}</p>}
 {editing&&<form className="link-edit" onSubmit={e=>{e.preventDefault();try{void update({originalUrl:normalizeUrlInput(destination)});}catch{setError(text.retryBody);}}}><label htmlFor={'edit-'+item.shortUrl}>{copy.edit}</label><input id={'edit-'+item.shortUrl} value={destination} onChange={e=>setDestination(e.target.value)} disabled={busy}/><Button variant="primary" type="submit" disabled={busy}>{copy.save}</Button></form>}
 {qr&&<QRCodeComponent shortUrl={url}/>}{children}
 </article>;
}
