'use client';
import ProductDialog from './ProductDialog';
export default function ConfirmDialog({open,title,description,confirmLabel,cancelLabel,onConfirm,onCancel,danger=false,busy=false}:{open:boolean;title:string;description:string;confirmLabel:string;cancelLabel:string;onConfirm:()=>void;onCancel:()=>void;danger?:boolean;busy?:boolean}){
 return <ProductDialog open={open} onClose={onCancel} title={title} id="dialog-title" className="confirm-dialog" role="alertdialog" busy={busy} descriptionId="dialog-description"><div className="confirm-content"><div className={danger?'dialog-mark danger':'dialog-mark'} aria-hidden="true">{danger?'!':'↗'}</div><p id="dialog-description">{description}</p><div className="confirm-actions"><button autoFocus disabled={busy} className="dialog-cancel" onClick={onCancel}>{cancelLabel}</button><button disabled={busy} className={danger?'dialog-confirm danger':'dialog-confirm'} onClick={onConfirm}>{confirmLabel}</button></div></div></ProductDialog>;
}
