'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { usePreferences } from './PreferencesProvider';
import { dialogMessages } from '@/config/dialog-i18n';

type Tone='success'|'error'|'info';
type Notice={id:number;message:string;tone:Tone};
type TrayContext={notify:(message:string,tone?:Tone)=>void};
const Context=createContext<TrayContext|null>(null);

export function NotificationProvider({children}:{children:React.ReactNode}){
  const {locale}=usePreferences();
  const labels=dialogMessages[locale];
  const [notices,setNotices]=useState<Notice[]>([]);
  const id=useRef(0);
  const dismiss=useCallback((noticeId:number)=>setNotices(items=>items.filter(item=>item.id!==noticeId)),[]);
  const notify=useCallback((message:string,tone:Tone='info')=>{
    const notice={id:++id.current,message,tone};
    setNotices(items=>[...items.slice(-2),notice]);
    window.setTimeout(()=>dismiss(notice.id),3600);
  },[dismiss]);
  const value=useMemo(()=>({notify}),[notify]);
  return <Context.Provider value={value}>{children}<aside className="notification-tray" aria-live="polite" aria-label={labels.notificationsLabel}>{notices.map(notice=><div className={'notice-toast '+notice.tone} key={notice.id}><span className="notice-icon" aria-hidden="true">{notice.tone==='success'?'✓':notice.tone==='error'?'!':'↗'}</span><p>{notice.message}</p><button aria-label={labels.dismiss} onClick={()=>dismiss(notice.id)}>×</button><i/></div>)}</aside></Context.Provider>;
}

export function useNotifications(){const value=useContext(Context);if(!value)throw new Error('useNotifications must be inside NotificationProvider');return value;}
