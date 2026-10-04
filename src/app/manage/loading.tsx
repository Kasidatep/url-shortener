"use client";
import AppHeader from "@/components/AppHeader";
import { usePreferences } from "@/components/PreferencesProvider";
import { manageMessages } from "@/config/manage-i18n";
import ManageOverview, {
  ManageIllustration,
} from "@/components/manage/ManageOverview";
export default function ManageLoading() {
  const { locale } = usePreferences();
  const copy = manageMessages[locale];
  return (
    <main className="utility-page manage-page manage-studio" aria-busy="true">
      <AppHeader active="links" />
      <div id="main-content" tabIndex={-1} className="dashboard-shell">
        <header className="manage-heading">
          <div>
            <p className="kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
          </div>
          <ManageIllustration />
        </header>
        <ManageOverview
          locale={locale}
          count={0}
          clicks={0}
          active={0}
          other={0}
          pending
        />
        <div
          className="manage-list-skeleton"
          role="status"
          aria-label={copy.loading}
        >
          <span className="sr-only">{copy.loading}</span>
          {[0, 1, 2].map((index) => (
            <div className="manage-card-skeleton" key={index}>
              <i className="skeleton" />
              <div>
                <i className="skeleton" />
                <i className="skeleton" />
              </div>
              <i className="skeleton" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
