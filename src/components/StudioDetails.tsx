'use client';

import Link from 'next/link';
import { ArrowUpRightIcon, PlusIcon, KeyIcon, LockClosedIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { usePreferences } from './PreferencesProvider';
import { studioMessages } from '@/config/studio-i18n';

export default function StudioDetails() {
  const { locale, t } = usePreferences();
  const copy = studioMessages[locale];
  return <div className="studio-details">
    <section className="studio-features" aria-labelledby="studio-features-title">
      <header><p className="kicker">{copy.featuresKicker}</p><h2 id="studio-features-title">{copy.featuresTitle}</h2></header>
      <div className="studio-feature-grid">
        <article className="studio-feature qr-feature"><div className="feature-sketch" aria-hidden="true"><QrCodeIcon/><span><ArrowUpRightIcon/></span></div><div><h3>{copy.qrTitle}</h3><p>{copy.qrBody}</p></div></article>
        <article className="studio-feature access-feature"><div className="feature-sketch" aria-hidden="true"><LockClosedIcon/><div className="password-dots"><i/><i/><i/><i/></div></div><div><h3>{copy.accessTitle}</h3><p>{copy.accessBody}</p></div></article>
      </div>
      <article className="manage-feature"><div><h3>{copy.manageFeatureTitle}</h3><p>{copy.manageFeatureBody}</p><Link href="/manage">{t('myLinks')} <ArrowUpRightIcon aria-hidden="true"/></Link></div><div className="mini-links" aria-hidden="true"><span><i/>/my-work <b><ArrowUpRightIcon/></b></span><span><i/>/see-you-there <b><ArrowUpRightIcon/></b></span><span><i/>/new-collection <b><ArrowUpRightIcon/></b></span></div></article>
    </section>
    <section className="studio-steps" aria-labelledby="studio-steps-title"><h2 id="studio-steps-title">{copy.stepsTitle}</h2><ol>{copy.steps.map(([title, body], index) => <li key={index}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <aside className="studio-recovery"><KeyIcon aria-hidden="true"/><div><h2>{copy.recoveryTitle}</h2><p>{copy.recoveryBody}</p></div><Link href="/manage#recovery">{copy.recoveryAction}<ArrowUpRightIcon aria-hidden="true"/></Link></aside>
    <section className="studio-answers" aria-labelledby="studio-answers-title"><header><p className="kicker">{t('faq')}</p><h2 id="studio-answers-title">{t('faqTitle')}</h2><Link href="/faq">{t('faq')} <ArrowUpRightIcon aria-hidden="true"/></Link></header><div>{(['1','2','3','4'] as const).map(n => <details key={n}><summary>{t(`faq${n}`)}<span aria-hidden="true"><PlusIcon/></span></summary><p>{t(`faq${n}a`)}</p></details>)}</div></section>
  </div>;
}
