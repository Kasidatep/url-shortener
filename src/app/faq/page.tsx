"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  KeyIcon,
  QrCodeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import AppHeader from "@/components/AppHeader";
import SearchInput from "@/components/ui/SearchInput";
import FAQItem from "@/components/help/FAQItem";
import HelpCategoryNav from "@/components/help/HelpCategoryNav";
import HelpStory from "@/components/help/HelpStory";
import { usePreferences } from "@/components/PreferencesProvider";
import { getPageMessages } from "@/config/page-i18n";
import { getFaqEntries } from "@/config/faq-items";
import { studioMessages } from "@/config/studio-i18n";
import { experienceMessages } from "@/config/experience-i18n";
import { utilityMessages } from "@/config/utility-i18n";
import { helpJourneyMessages } from "@/config/help-journey-i18n";
const popularIds = ["edit-destination", "print-qr", "browser-data"];
const popularIcons = [LinkIcon, QrCodeIcon, KeyIcon];
export default function FaqPage() {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const copy = experienceMessages[locale];
  const ui = utilityMessages[locale];
  const help = helpJourneyMessages[locale];
  const studio = studioMessages[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(0);
  const [requested, setRequested] = useState<{
    id: string;
    sequence: number;
  } | null>(null);
  const entries = useMemo(() => getFaqEntries(locale), [locale]);
  const normalized = query.trim().toLocaleLowerCase(locale);
  const results = entries.filter(
    (item) =>
      (category === 0 || item.category === category) &&
      (!normalized ||
        (item.question + " " + item.answer)
          .toLocaleLowerCase(locale)
          .includes(normalized)),
  );
  const counts = help.categories.map((_, index) =>
    index === 0
      ? entries.length
      : entries.filter((item) => item.category === index).length,
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: results.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const goToAnswer = useCallback((id: string) => {
    setQuery("");
    setCategory(0);
    setRequested((value) => ({ id, sequence: (value?.sequence ?? 0) + 1 }));
  }, []);
  useEffect(() => {
    function fromHash() {
      const id = window.location.hash.slice(1);
      if (id.startsWith("answer-")) goToAnswer(id.slice(7));
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [goToAnswer]);
  useEffect(() => {
    if (!requested || !entries.some((item) => item.id === requested.id)) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(
        "answer-" + requested.id,
      ) as HTMLDetailsElement | null;
      if (!target) return;
      target.open = true;
      window.history.replaceState(
        window.history.state,
        "",
        "#answer-" + requested.id,
      );
      target.querySelector("summary")?.focus({ preventScroll: true });
      target.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [requested, entries]);
  return (
    <main className="utility-page help-page help-experience">
      <AppHeader active="faq" />
      <section id="main-content" tabIndex={-1} className="help-workspace">
        <header className="page-heading help-heading">
          <div>
            <p className="kicker">{help.eyebrow}</p>
            <h1>
              {help.title}
              <em>{help.body}</em>
            </h1>
            <p>{help.intro}</p>
          </div>
          <span className="help-index" aria-hidden="true">
            ?<i>MemoLink / FAQ</i>
          </span>
        </header>
        <HelpStory locale={locale} onAnswer={goToAnswer} />
        <section className="help-popular" aria-labelledby="popular-title">
          <h2 id="popular-title">{help.popular}</h2>
          <div className="quick-help">
            {popularIds.map((id, index) => {
              const item = entries.find((entry) => entry.id === id)!;
              const Icon = popularIcons[index];
              return (
                <button key={id} type="button" onClick={() => goToAnswer(id)}>
                  <span className="quick-help-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <strong>{item.question}</strong>
                  <ArrowUpRightIcon aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </section>
        <section
          className="help-answer-library"
          aria-labelledby="answers-title"
        >
          <div className="help-library-head">
            <h2 id="answers-title">{help.answers}</h2>
            <SearchInput
              value={query}
              onChange={setQuery}
              label={ui.helpSearch}
              clearLabel={copy.clearSearch}
            />
          </div>
          <HelpCategoryNav
            categories={help.categories}
            active={category}
            onChange={setCategory}
            label={text.navFaq}
            counts={counts}
          />
          <div className="help-results-heading">
            <p className="search-count" aria-live="polite">
              {results.length} {copy.faqResults}
            </p>
            {query || category ? (
              <button
                type="button"
                className="ui-button ghost"
                onClick={() => {
                  setQuery("");
                  setCategory(0);
                }}
              >
                {studio.reset}
              </button>
            ) : null}
          </div>
          {results.length ? (
            <div className="faq-list">
              {results.map((item) => (
                <FAQItem key={item.id} {...item} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{copy.faqNoResults}</h3>
              <p>
                {
                  {
                    en: "Try a shorter search or choose another topic.",
                    th: "ลองใช้คำสั้นลง หรือเลือกหัวข้ออื่น",
                    zh: "请缩短关键词或选择其他主题。",
                    ja: "短い言葉で検索するか、別の項目を選んでください。",
                    ko: "짧은 검색어나 다른 주제를 선택하세요.",
                    es: "Prueba una búsqueda más corta u otro tema.",
                  }[locale]
                }
              </p>
              <button
                type="button"
                className="ui-button secondary"
                onClick={() => {
                  setQuery("");
                  setCategory(0);
                }}
              >
                {copy.clearSearch}
              </button>
            </div>
          )}
        </section>
        <aside className="help-contact">
          <div>
            <p className="kicker">MemoLab</p>
            <h2>{ui.contact}</h2>
          </div>
          <a className="ui-button secondary" href="https://memolab.me">
            {ui.contactAction}
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </aside>
      </section>
      <script
        id="faq-answers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
