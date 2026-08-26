'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon, ExclamationTriangleIcon, EyeIcon, EyeSlashIcon, LinkIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import PreferenceControls from '@/components/PreferenceControls';
import MemoLinkLogo from '@/components/MemoLinkLogo';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import { systemMessages } from '@/config/system-i18n';

type LinkState='checking'|'password'|'expired'|'missing'|'error';

function StateIcon({state}:{state:Exclude<LinkState,'checking'>}){
  return <div className={'redirect-state-icon '+state} aria-hidden="true">
    {state==='password'?<LockClosedIcon/>:state==='missing'?<LinkIcon/>:state==='expired'?<ExclamationTriangleIcon/>:<ArrowPathIcon/>}
  </div>;
}

export default function ShortLinkPage({ params }: { params: { code: string } }) {
  const router=useRouter();
  const {locale}=usePreferences();
  const text=getPageMessages(locale);
  const system=systemMessages[locale];
  const [state,setState]=useState<LinkState>('checking');
  const [password,setPassword]=useState('');
  const [showPassword,setShowPassword]=useState(false);
  const [message,setMessage]=useState('');
  const [unlocking,setUnlocking]=useState(false);

  const checkLink=useCallback(async(signal?:AbortSignal)=>{
    setState('checking');
    try{
      const response=await fetch('/api/shorten?code='+encodeURIComponent(params.code),{cache:'no-store',signal});
      const data=await response.json();
      if(response.ok){router.replace(data.redirect);return;}
      if(response.status===401)setState('password');
      else if(response.status===404)setState('missing');
      else if(response.status===410)setState('expired');
      else setState('error');
    }catch{
      if(!signal?.aborted)setState('error');
    }
  },[params.code,router]);

  useEffect(()=>{
    const controller=new AbortController();
    void checkLink(controller.signal);
    return()=>controller.abort();
  },[checkLink]);

  async function unlock(event:React.FormEvent){
    event.preventDefault();
    setMessage('');
    setUnlocking(true);
    try{
      const response=await fetch('/api/unlock',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:params.code,password})});
      const data=await response.json();
      if(response.ok){router.replace(data.redirect);return;}
      setMessage(response.status===401?system.invalidPassword:(data.message||text.retryBody));
    }catch{
      setMessage(text.retryBody);
    }finally{
      setUnlocking(false);
    }
  }

  return <main className="redirect-page">
    <header className="redirect-nav"><MemoLinkLogo/><PreferenceControls/></header>
    <div className="redirect-shell">
      <section className={'redirect-card state-'+state}>
        <div className="redirect-code"><span>{system.linkCode}</span><code>/{params.code}</code></div>

        {state==='checking'?<div className="redirect-state"><div className="redirect-loader" aria-hidden="true"><span/><span/><span/></div><p className="state-kicker">MemoLink</p><h1>{text.checking}</h1><p>{text.retryBody}</p></div>:null}

        {state==='password'?<div className="redirect-state">
          <StateIcon state="password"/>
          <p className="state-kicker">{system.secureLink}</p>
          <h1>{text.protectedTitle}</h1>
          <p>{text.protectedBody}</p>
          <form onSubmit={unlock}>
            <label htmlFor="link-password">{text.password}</label>
            <div className="password-field">
              <input id="link-password" type={showPassword?'text':'password'} autoFocus required autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} aria-describedby="password-note"/>
              <button type="button" className="password-visibility" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?system.hidePassword:system.showPassword}>{showPassword?<EyeSlashIcon/>:<EyeIcon/>}</button>
            </div>
            {message?<p className="form-error" role="alert">{message}</p>:null}
            <button className="primary-button" disabled={unlocking}>{unlocking?system.verifying:text.continue+' →'}</button>
            <p className="password-note" id="password-note"><LockClosedIcon/>{system.passwordHint}</p>
          </form>
        </div>:null}

        {state==='expired'?<div className="redirect-state"><StateIcon state="expired"/><p className="state-kicker">{text.unavailable}</p><h1>{text.unavailable}</h1><p>{text.unavailableBody}</p><div className="state-actions"><Link href="/" className="primary-link">{system.createNew}</Link><Link href="/faq" className="secondary-link">{text.navFaq}</Link></div></div>:null}

        {state==='missing'?<div className="redirect-state"><StateIcon state="missing"/><p className="state-kicker">404</p><h1>{text.missing}</h1><p>{text.missingBody}</p><div className="state-actions"><Link href="/" className="primary-link">{system.goHome}</Link><Link href="/faq" className="secondary-link">{text.navFaq}</Link></div></div>:null}

        {state==='error'?<div className="redirect-state"><StateIcon state="error"/><p className="state-kicker">{system.errorKicker}</p><h1>{text.retryTitle}</h1><p>{text.retryBody}</p><div className="state-actions"><button className="primary-button" onClick={()=>void checkLink()}>{text.retry}</button><Link href="/" className="secondary-link">{system.goHome}</Link></div></div>:null}
      </section>
    </div>
  </main>;
}
