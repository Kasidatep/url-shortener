'use client';
import { useId } from 'react';
export default function Disclosure({label,children,className=''}:{label:string;children:React.ReactNode;className?:string}) {
 const id=useId();
 return <details className={'ui-disclosure '+className}><summary aria-controls={id}>{label}<span aria-hidden="true">+</span></summary><div id={id}>{children}</div></details>;
}
