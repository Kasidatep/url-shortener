'use client';
import {useEffect,useRef,useState} from 'react';
import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline';
export default function LinkActionsMenu({label,actions}:{label:string;actions:Array<{label:string;action:()=>void;danger?:boolean}>}){
 const ref=useRef<HTMLDetailsElement>(null);const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const close=(event:PointerEvent)=>{if(!ref.current?.contains(event.target as Node))ref.current?.removeAttribute('open');};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);},[open]);
 return <details className="link-menu" ref={ref} onToggle={e=>setOpen(e.currentTarget.open)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))e.currentTarget.removeAttribute('open');}} onKeyDown={e=>{if(e.key==='Escape'){ref.current?.removeAttribute('open');ref.current?.querySelector('summary')?.focus();}}}><summary aria-label={label}><EllipsisHorizontalIcon aria-hidden="true"/></summary><div>{actions.map(item=><button type="button" key={item.label} className={item.danger?'destructive':''} onClick={()=>{ref.current?.removeAttribute('open');ref.current?.querySelector('summary')?.focus();item.action();}}>{item.label}</button>)}</div></details>;
}
