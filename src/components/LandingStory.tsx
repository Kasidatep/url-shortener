'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownIcon, ArrowUpRightIcon, KeyIcon, LockClosedIcon, QrCodeIcon, LinkIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { usePreferences } from './PreferencesProvider';
import { landingCopy } from '@/config/landing-copy';
import styles from './landing.module.css';

export function useLandingCopy() {
  const { locale } = usePreferences();
  return { copy: landingCopy[locale === 'th' ? 'th' : 'en'], lang: locale === 'th' ? 'th' : 'en' };
}

export function LandingIntro() {
  const { copy, lang } = useLandingCopy();
  return <div className={styles.intro} lang={lang}>
    <p className={styles.eyebrow}><span />{copy.eyebrow}</p>
    <h1>{copy.title}<br /><span>{copy.accent}<svg viewBox="0 0 440 22" fill="none" aria-hidden="true"><path d="M4 15C112 1 279 0 434 11M65 20C207 9 324 10 400 17" /></svg></span></h1>
    <p className={styles.lead}>{copy.intro}</p>
    <div className={styles.heroActions}><a href="#create-link" className={styles.solidLink}>{copy.create}<ArrowUpRightIcon /></a><a href="#possibilities" className={styles.textLink}>{copy.explore}<ArrowDownIcon /></a></div>
  </div>;
}

const samples = [
  { path: 'portfolio', long: 'studio.example/work/selected-projects?collection=2026', color: '#d8f093' },
  { path: 'see-you-there', long: 'events.example/calendar/community-evening/register', color: '#f6c9aa' },
  { path: 'something-good', long: 'kitchen.example/recipes/weekend/favourite-lemon-cake', color: '#d6cbff' },
];

export function LinkPlayground() {
  const { copy, lang } = useLandingCopy();
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const sample = samples[selected];
  return <div className={styles.playground} lang={lang}>
    <div className={styles.orbit} aria-hidden="true" />
    <span className={styles.note}>{copy.example}</span>
    <div className={styles.longLink}><span>{copy.long}</span><p>{sample.long}</p></div>
    <svg className={styles.connector} viewBox="0 0 90 80" fill="none" aria-hidden="true"><path d="M20 2C-8 62 90 3 59 66m-14-9 14 12 14-15" /></svg>
    <motion.div initial={false} animate={{ rotate: reduced ? 0 : selected === 1 ? 2 : -3 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }} className={styles.shortLink} style={{ background: sample.color }}>
      <div className={styles.sampleTop}><LinkIcon /><span>{copy.short}</span><ArrowUpRightIcon /></div>
      <p>memo.link<span>/{sample.path}</span></p>
      <div className={styles.sampleBottom}><span>MemoLink</span><span>↗</span></div>
    </motion.div>
    <div className={styles.storyChoices} role="group" aria-label={copy.useLabel}>{copy.examples.map((label, index) => <button type="button" key={label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}</div>
  </div>;
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  // Content is visible in server HTML; motion is progressive enhancement only.
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [18, 0], opacity: [0.6, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, ease: 'easeOut' }}>{children}</motion.div>;
}

export function LandingStory() {
  const { copy, lang } = useLandingCopy();
  return <div lang={lang}>
    <div className={styles.ribbon} aria-hidden="true">{copy.ribbon.map(item => <span key={item}>{item}<span>✳</span></span>)}</div>
    <section id="possibilities" className={styles.section} aria-labelledby="possibilities-title">
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>{copy.sectionLabel}</p><h2 id="possibilities-title">{copy.sectionTitle}</h2></div><p>{copy.sectionBody}</p></Reveal>
      <div className={styles.cards}>
        <Reveal className={`${styles.feature} ${styles.nameFeature}`}><div className={styles.nameArt} aria-hidden="true"><span>your next big thing</span><strong>/hello-world<ArrowUpRightIcon /></strong><i /></div><span className={styles.cardNumber}>01 /</span><h3>{copy.cards[0][0]}</h3><p>{copy.cards[0][1]}</p></Reveal>
        <Reveal className={`${styles.feature} ${styles.accessFeature}`}><div className={styles.lockArt} aria-hidden="true"><LockClosedIcon /><span>● ● ● ● ● ●</span></div><span className={styles.cardNumber}>02 /</span><h3>{copy.cards[1][0]}</h3><p>{copy.cards[1][1]}</p></Reveal>
        <Reveal className={`${styles.feature} ${styles.qrFeature}`}><div className={styles.qrArt} aria-hidden="true"><QRCodeSVG value="https://short.kasidate.me" size={100} level="M" marginSize={1}/><span>SCAN.<br/>MEET.<br/>REPEAT.</span></div><span className={styles.cardNumber}>03 /</span><h3>{copy.cards[2][0]}</h3><p>{copy.cards[2][1]}</p></Reveal>
      </div>
    </section>
    <section className={`${styles.section} ${styles.how}`} aria-labelledby="how-title"><Reveal><p className={styles.kicker}>{copy.howLabel}</p><h2 id="how-title">{copy.howTitle}</h2></Reveal><ol>{copy.steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div>{index === 0 ? <LinkIcon /> : index === 1 ? <LockClosedIcon /> : <QrCodeIcon />}</li>)}</ol></section>
    <section className={`${styles.section} ${styles.ownership}`} aria-labelledby="ownership-title"><div className={styles.keyArt} aria-hidden="true"><KeyIcon /><span>KEEP<br/>THIS KEY.</span></div><div><p className={styles.kicker}>{copy.ownershipLabel}</p><h2 id="ownership-title">{copy.ownershipTitle}</h2><p>{copy.ownershipBody}</p><Link className={styles.textLink} href="/manage">{copy.ownershipCta}<ArrowUpRightIcon /></Link></div></section>
    <section className={`${styles.section} ${styles.questions}`} aria-labelledby="questions-title"><div><p className={styles.kicker}>{copy.faqLabel}</p><h2 id="questions-title">{copy.faqTitle}</h2><Link href="/faq" className={styles.textLink}>{copy.faqMore}<ArrowUpRightIcon /></Link></div><div>{copy.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className={`${styles.section} ${styles.final}`} aria-labelledby="final-title"><p className={styles.kicker}>MEMOLINK / MADE FOR SHARING</p><h2 id="final-title">{copy.finalTitle}</h2><p>{copy.finalBody}</p><a href="#create-link" className={styles.solidLink}>{copy.finalCta}<ArrowUpRightIcon /></a><span className={styles.finalMark} aria-hidden="true">↗</span></section>
  </div>;
}
