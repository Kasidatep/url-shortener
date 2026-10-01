'use client';

import Link from 'next/link';
import { ArrowUpRightIcon, ChartBarIcon, LinkIcon, LockClosedIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { usePreferences } from './PreferencesProvider';
import { experienceMessages } from '@/config/experience-i18n';

const icons = [LinkIcon, LockClosedIcon, ChartBarIcon, QrCodeIcon];
export default function LandingDetails() {
  const { t, locale } = usePreferences();
  const share = experienceMessages[locale];
  const items = [[t('f1Title'), t('f1Body')], [t('f2Title'), t('f2Body')], [t('f3Title'), t('f3Body')], [share.shareFeatureTitle, share.shareFeatureBody]];
  return <>
    <section className="features editorial-features" aria-labelledby="features-title">
      <div className="section-heading"><p className="kicker">{t('featuresKicker')}</p><h2 id="features-title">{t('featuresTitle')}</h2></div>
      <div className="feature-grid">{items.map(([title, body], index) => {
        const Icon = icons[index];
        return <article key={title}><div className="feature-top"><Icon aria-hidden="true"/><span>0{index + 1}</span></div><h3>{title}</h3><p>{body}</p></article>;
      })}</div>
    </section>
    <section className="landing-answers" aria-labelledby="answers-title">
      <div><p className="kicker">{t('faq')}</p><h2 id="answers-title">{t('faqTitle')}</h2><Link href="/faq">{t('faq')} <ArrowUpRightIcon aria-hidden="true"/></Link></div>
      <div>{[[t('faq1'),t('faq1a')],[t('faq2'),t('faq2a')],[t('faq3'),t('faq3a')],[t('faq4'),t('faq4a')]].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
