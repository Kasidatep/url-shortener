'use client';
import { useEffect, useId, useRef } from 'react';
export default function Disclosure({label,children,className='',id:externalId,defaultOpen=false}:{label:string;children:React.ReactNode;className?:string;id?:string;defaultOpen?:boolean}) {
 const id=useId();
 const ref=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{if(defaultOpen && ref.current) ref.current.open=true;},[defaultOpen]);
 return <details id={externalId} ref={ref} className={'ui-disclosure '+className}><summary aria-controls={id}>{label}<span aria-hidden="true">+</span></summary><div id={id}>{children}</div></details>;
}
