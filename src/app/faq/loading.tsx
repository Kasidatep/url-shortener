"use client";
import AppHeader from "@/components/AppHeader";
import { usePreferences } from "@/components/PreferencesProvider";
import { helpJourneyMessages } from "@/config/help-journey-i18n";
export default function HelpLoading() {
  const { locale } = usePreferences();
  const copy = helpJourneyMessages[locale];
  return (
    <main className="utility-page help-page help-experience" aria-busy="true">
      <AppHeader active="faq" />
      <section id="main-content" tabIndex={-1} className="help-workspace">
        <header className="page-heading help-heading">
          <div>
            <p className="kicker">{copy.eyebrow}</p>
            <h1>
              {copy.title}
              <em>{copy.body}</em>
            </h1>
          </div>
        </header>
        <div className="skeleton help-loading-story" />
        <div className="help-loading-answers">
          <span className="skeleton" />
          <span className="skeleton" />
          <span className="skeleton" />
        </div>
        <span role="status" className="sr-only">
          {copy.eyebrow}…
        </span>
      </section>
    </main>
  );
}
