"use client";
import MemoLinkLogo from "@/components/MemoLinkLogo";
import LinkTransitGraphic from "@/components/LinkTransitGraphic";
import { usePreferences } from "@/components/PreferencesProvider";
import { redirectJourneyMessages } from "@/config/redirect-journey-i18n";
export default function LinkLoading() {
  const { locale } = usePreferences();
  const copy = redirectJourneyMessages[locale];
  return (
    <main className="redirect-page transit-page">
      <header className="redirect-nav">
        <MemoLinkLogo />
      </header>
      <div className="redirect-shell">
        <section className="redirect-card transit-card" aria-busy="true">
          <LinkTransitGraphic />
          <div className="redirect-state">
            <p className="state-kicker">MemoLink</p>
            <h1>{copy.loading}</h1>
            <p role="status">{copy.body}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
