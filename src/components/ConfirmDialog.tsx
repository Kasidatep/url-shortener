'use client';

import { useEffect, useRef } from 'react';

export default function ConfirmDialog({open,title,description,confirmLabel,cancelLabel,onConfirm,onCancel,danger=false,busy=false}:{open:boolean;title:string;description:string;confirmLabel:string;cancelLabel:string;onConfirm:()=>void;onCancel:()=>void;danger?:boolean;busy?:boolean}){
  const cancelRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement | null;
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')onCancel();if(event.key==='Tab'){const buttons=cancelRef.current?.parentElement?.querySelectorAll('button');if(buttons?.length){const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}}};
    document.addEventListener('keydown',onKeyDown);
    document.body.classList.add('dialog-open');
    cancelRef.current?.focus();
    return()=>{document.removeEventListener('keydown',onKeyDown);document.body.classList.remove('dialog-open');previous?.focus();};
  },[open,onCancel]);
  if(!open)return null;
  return <div className="dialog-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onCancel();}}><section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description"><div className={danger?'dialog-mark danger':'dialog-mark'} aria-hidden="true">{danger?'!':'↗'}</div><h2 id="dialog-title">{title}</h2><p id="dialog-description">{description}</p><div><button ref={cancelRef} disabled={busy} className="dialog-cancel" onClick={onCancel}>{cancelLabel}</button><button disabled={busy} className={danger?'dialog-confirm danger':'dialog-confirm'} onClick={onConfirm}>{confirmLabel}</button></div></section></div>;
}
