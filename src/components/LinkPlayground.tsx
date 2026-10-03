'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRightIcon, LinkIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { usePreferences } from './PreferencesProvider';
import { studioMessages } from '@/config/studio-i18n';

export default function LinkPlayground() {
  const { locale } = usePreferences();
  const copy = studioMessages[locale];
  const [example, setExample] = useState(0);
  const labels = [copy.portfolio, copy.event, copy.campaign];

  return <section className="link-playground" aria-labelledby="playground-title">
    <div className="playground-heading"><span className="section-index">01 /</span><h2 id="playground-title">{copy.example}</h2></div>
    <div className="example-selector" role="group" aria-label={copy.example}>
      {labels.map((label, index) => <button key={index} type="button" aria-pressed={example === index} onClick={() => setExample(index)}>{example === index ? <m.span layoutId="example-selection" className="example-selection"/> : null}<span>{label}</span></button>)}
    </div>
    <div className="link-stage">
      <div className="stage-coordinate" aria-hidden="true">MEMOLINK / LINK STUDIO</div>
      <div className="example-source"><LinkIcon aria-hidden="true"/><span>{copy.exampleDestinations[example]}</span></div>
      <svg className="link-thread" viewBox="0 0 600 160" fill="none" aria-hidden="true"><path d="M80 10C80 105 420-20 450 80S240 160 300 135" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7"/><path d="m294 128 6 8 10-4" stroke="currentColor" strokeWidth="2"/></svg>
      <m.div className="example-ticket" key={example} initial={false} animate={{ rotate: -2 }} transition={{ duration: .4, ease: 'easeOut' }}>
        <div className="example-ticket-top"><span>MemoLink</span><ArrowUpRightIcon aria-hidden="true"/></div>
        <div className="example-ticket-body"><strong>/{copy.exampleNames[example]}</strong><QRCodeSVG value={'https://example.com/' + copy.exampleNames[example]} size={64} bgColor="#fffdf7" fgColor="#202c44" marginSize={1} title={copy.example}/></div>
        <div className="example-ticket-bottom"><span>{labels[example]}</span><span>↗</span></div>
      </m.div>
      <span className="stage-sticker" aria-hidden="true">↗</span>
    </div>
    <p className="example-note">{copy.exampleNote}</p>
  </section>;
}
