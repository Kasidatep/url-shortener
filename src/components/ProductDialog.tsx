'use client';
import {useEffect,useRef} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {usePreferences} from './PreferencesProvider';
import {canvasMessages} from '@/config/canvas-i18n';
export default function ProductDialog({open,onClose,title,id,children,className='',busy=false,role='dialog',descriptionId}:{open:boolean;onClose:()=>void;title:string;id:string;children:React.ReactNode;className?:string;busy?:boolean;role?:'dialog'|'alertdialog';descriptionId?:string}){
 const ref=useRef<HTMLDialogElement>(null);const {locale}=usePreferences();
 useEffect(()=>{const dialog=ref.current;if(!dialog||!open)return;const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;dialog.showModal();document.body.classList.add('dialog-open');return()=>{dialog.close();document.body.classList.remove('dialog-open');previous?.focus({preventScroll:true});};},[open]);
 return <dialog ref={ref} className={'product-dialog '+className} aria-labelledby={id} aria-describedby={descriptionId} role={role} onCancel={e=>{e.preventDefault();if(!busy)onClose();}} onClick={e=>{if(busy||e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}><header className="product-dialog-head"><h2 id={id}>{title}</h2><button type="button" className="dialog-x" disabled={busy} aria-label={canvasMessages[locale].close} onClick={onClose}><XMarkIcon aria-hidden="true"/></button></header>{children}</dialog>;
}
