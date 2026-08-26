'use client';

import AppHeader from '@/components/AppHeader';
import { usePreferences } from '@/components/PreferencesProvider';
import { getPageMessages } from '@/config/page-i18n';
import { extraFaqSections } from '@/config/faq-extra-i18n';

export default function FaqPage() {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const sections = [...text.faqSections, ...extraFaqSections[locale]];
  return <main>
    <AppHeader active="faq" />
    <section className="help-hero"><p className="kicker">MEMOLINK SUPPORT</p><h1>{text.faqTitle}</h1><p>{text.faqDescription}</p></section>
    <section className="help-sections">
      {sections.map(([title, items]) => <section className="help-section" key={title}><h2>{title}</h2><div>{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>)}
    </section>
  </main>;
}
