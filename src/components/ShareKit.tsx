'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { ArrowDownTrayIcon, ArrowUpOnSquareIcon, ClipboardDocumentIcon, EnvelopeIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePreferences } from './PreferencesProvider';
import { useNotifications } from './NotificationTray';
import { experienceMessages } from '@/config/experience-i18n';

type Target={name:string;mark:string;className:string;url:(link:string,text:string)=>string};
const targets:Target[]=[
  {name:'LINE',mark:'L',className:'line',url:link=>'https://social-plugins.line.me/lineit/share?url='+encodeURIComponent(link)},
  {name:'WhatsApp',mark:'W',className:'whatsapp',url:(link,text)=>'https://wa.me/?text='+encodeURIComponent(text+' '+link)},
  {name:'Facebook',mark:'f',className:'facebook',url:link=>'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(link)},
  {name:'X',mark:'𝕏',className:'x',url:(link,text)=>'https://twitter.com/intent/tweet?url='+encodeURIComponent(link)+'&text='+encodeURIComponent(text)},
  {name:'LinkedIn',mark:'in',className:'linkedin',url:link=>'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(link)},
  {name:'Telegram',mark:'T',className:'telegram',url:(link,text)=>'https://t.me/share/url?url='+encodeURIComponent(link)+'&text='+encodeURIComponent(text)},
];

export default function ShareKit({open,url,onClose}:{open:boolean;url:string;onClose:()=>void}){
  const {locale}=usePreferences();
  const copy=experienceMessages[locale];
  const {notify}=useNotifications();
  const shareText='MemoLink';
  const cardPath=url?new URL(url).pathname.replace(/\/$/,'')+'/opengraph-image':'/opengraph-image';

  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    document.addEventListener('keydown',close);
    document.body.classList.add('dialog-open');
    return()=>{document.removeEventListener('keydown',close);document.body.classList.remove('dialog-open');};
  },[open,onClose]);

  if(!open)return null;
  function openTarget(target:Target){const popup=window.open(target.url(url,shareText),'_blank','noopener,noreferrer');if(popup)popup.opener=null;}
  async function copyLink(){await navigator.clipboard.writeText(url);notify(copy.copied,'success');onClose();}
  async function downloadCard(blob?:Blob){
    const image=blob??await fetch(cardPath,{cache:'no-store'}).then(response=>response.blob());
    const objectUrl=URL.createObjectURL(image);
    const anchor=document.createElement('a');
    anchor.href=objectUrl;anchor.download='memolink-share-card.png';anchor.click();
    URL.revokeObjectURL(objectUrl);
  }
  async function copyCard(){
    try{
      const response=await fetch(cardPath,{cache:'no-store'});
      if(!response.ok)throw new Error('Unable to render card');
      const blob=await response.blob();
      if(navigator.clipboard.write&&typeof ClipboardItem!=='undefined'){
        await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
        notify(copy.cardCopied,'success');
      }else await downloadCard(blob);
    }catch{await downloadCard();}
  }
  async function nativeShare(){
    if(!navigator.share){await copyLink();return;}
    try{await navigator.share({title:'MemoLink',text:shareText,url});}
    catch(error){if(!(error instanceof DOMException&&error.name==='AbortError'))await copyLink();}
  }

  return <div className="dialog-backdrop share-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <section className="share-kit" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <header><div><p className="kicker">MEMOLINK SHARE KIT</p><h2 id="share-title">{copy.shareTitle}</h2><p>{copy.shareBody}</p></div><button type="button" className="share-close" onClick={onClose} aria-label={copy.close}><XMarkIcon/></button></header>
      <div className="share-platforms">{targets.map(target=><button type="button" key={target.name} onClick={()=>openTarget(target)}><span className={'share-platform-mark '+target.className}>{target.mark}</span><span>{target.name}</span></button>)}</div>
      <div className="share-utility">
        <button type="button" onClick={()=>void nativeShare()}><ArrowUpOnSquareIcon/><span>{copy.shareNative}</span></button>
        <button type="button" onClick={()=>void copyLink()}><ClipboardDocumentIcon/><span>{copy.copyLink}</span></button>
        <button type="button" onClick={()=>void copyCard()}><PhotoIcon/><span>{copy.copyCard}</span></button>
        <a href={'mailto:?subject='+encodeURIComponent('MemoLink')+'&body='+encodeURIComponent(url)}><EnvelopeIcon/><span>{copy.email}</span></a>
      </div>
      <div className="share-card-preview"><Image src={cardPath} width={600} height={315} unoptimized alt="MemoLink share card"/><div><span>{url}</span><button type="button" onClick={()=>void downloadCard()}><ArrowDownTrayIcon/>{copy.downloadCard}</button></div></div>
    </section>
  </div>;
}
