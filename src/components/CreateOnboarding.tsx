'use client';
import Link from 'next/link';
import {useState} from 'react';
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import ProductDialog from './ProductDialog';
import LinkSculpture from './LinkSculpture';
import {usePreferences} from './PreferencesProvider';
import {canvasMessages} from '@/config/canvas-i18n';
export const TOUR_SESSION_KEY='memolink-create-tour-v1';
export default function CreateOnboarding({open,onClose}:{open:boolean;onClose:()=>void}){
 const {locale}=usePreferences();const copy=canvasMessages[locale];const [step,setStep]=useState(0);
 return <ProductDialog open={open} onClose={onClose} title={copy.tourLabel} id="tour-title" className="tour-dialog"><div className="tour-scene"><LinkSculpture stage={step}/><span className="tour-art-note">MemoLink / 0{step+1}</span></div><div className="tour-story"><div className="tour-step-picker" role="group" aria-label={copy.tourLabel}>{copy.steps.map((s,i)=><button type="button" key={i} aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span>{s.label}</button>)}</div><div className="tour-copy" key={step} aria-live="polite" aria-atomic="true"><h3>{copy.steps[step].title}</h3><p>{copy.steps[step].body}</p></div><div className="tour-actions"><button type="button" className="ui-button secondary" disabled={step===0} onClick={()=>setStep(v=>v-1)}>{copy.back}</button><button type="button" className="ui-button primary" onClick={()=>step===2?onClose():setStep(v=>v+1)}>{step===2?copy.start:copy.next}<ArrowRightIcon aria-hidden="true"/></button></div><div className="tour-foot"><button type="button" onClick={onClose}>{copy.skip}</button><Link href="/faq" onClick={onClose}>{copy.viewHelp} ↗</Link></div><p className="tour-disclaimer">{copy.tourNote}</p></div></ProductDialog>;
}
