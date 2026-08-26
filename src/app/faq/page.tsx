'use client';

import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AppHeader from '@/components/AppHeader';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import { extraFaqSections } from '@/config/faq-extra-i18n';
import { moreFaqSections } from '@/config/faq-more-i18n';
import { experienceMessages } from '@/config/experience-i18n';

export default function FaqPage(){
  const {locale}=usePreferences();
  const text=getPageMessages(locale);
  const copy=experienceMessages[locale];
  const [query,setQuery]=useState('');
  const [activeCategory,setActiveCategory]=useState<string|null>(null);
  const sections=useMemo(()=>[...text.faqSections,...extraFaqSections[locale],...moreFaqSections[locale]],[locale,text.faqSections]);
  const normalized=query.trim().toLocaleLowerCase(locale);
  const visibleSections=useMemo(()=>sections
    .filter(([title])=>!activeCategory||title===activeCategory)
    .map(([title,items])=>[title,normalized?items.filter(([question,answer])=>(question+' '+answer).toLocaleLowerCase(locale).includes(normalized)):items] as typeof sections[number])
    .filter(([,items])=>items.length>0),[activeCategory,locale,normalized,sections]);
  const resultCount=visibleSections.reduce((total,[,items])=>total+items.length,0);

  return <main>
    <AppHeader active="faq"/>
    <section className="help-hero"><p className="kicker">MEMOLINK SUPPORT</p><h1>{text.faqTitle}</h1><p>{text.faqDescription}</p>
      <div className="faq-search" role="search"><MagnifyingGlassIcon aria-hidden="true"/><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder={copy.faqSearch} aria-label={copy.faqSearch}/>{query?<button type="button" onClick={()=>setQuery('')} aria-label={copy.clearSearch}><XMarkIcon/></button>:null}</div>
      <div className="faq-filter" aria-label={copy.faqAll}><button type="button" className={activeCategory===null?'active':''} onClick={()=>setActiveCategory(null)}>{copy.faqAll}</button>{sections.map(([title])=><button type="button" className={activeCategory===title?'active':''} key={title} onClick={()=>setActiveCategory(title)}>{title}</button>)}</div>
      <p className="faq-result-count" aria-live="polite">{resultCount} {copy.faqResults}</p>
    </section>
    {visibleSections.length?<section className="help-sections">
      {visibleSections.map(([title,items])=><section className="help-section" key={title}><h2>{title}</h2><div>{items.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>)}
    </section>:<section className="faq-empty"><MagnifyingGlassIcon/><h2>{copy.faqNoResults}</h2><button type="button" onClick={()=>{setQuery('');setActiveCategory(null);}}>{copy.clearSearch}</button></section>}
  </main>;
}
