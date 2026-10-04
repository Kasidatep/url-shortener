"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  KeyIcon,
  LinkIcon,
  PauseCircleIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import AppHeader from "@/components/AppHeader";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useNotifications } from "@/components/NotificationTray";
import { usePreferences } from "@/components/PreferencesProvider";
import { getPageMessages } from "@/config/page-i18n";
import { dialogMessages } from "@/config/dialog-i18n";
import { utilityMessages } from "@/config/utility-i18n";
import { studioMessages } from "@/config/studio-i18n";
import { manageMessages } from "@/config/manage-i18n";
import { getDeviceKey, importDeviceKey } from "@/lib/device";
import LinkListItem, {
  type LinkItem,
  type LinkStatus,
  linkStatus,
} from "@/components/links/LinkListItem";
import SearchInput from "@/components/ui/SearchInput";
import ManageOverview, {
  ManageIllustration,
} from "@/components/manage/ManageOverview";
import SortControl, { type LinkSort } from "@/components/manage/SortControl";
import RecoveryDialog from "@/components/manage/RecoveryDialog";
import LinkAnalyticsPanel, {
  type LinkAnalytics,
} from "@/components/manage/LinkAnalyticsPanel";
const ShareKit = dynamic(() => import("@/components/ShareKit"));
type Filter = "all" | LinkStatus;
export default function ManagePage() {
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const copy = manageMessages[locale];
  const ui = utilityMessages[locale];
  const studio = studioMessages[locale];
  const dialog = dialogMessages[locale];
  const { notify } = useNotifications();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [origin, setOrigin] = useState("");
  const [now, setNow] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<LinkSort>("newest");
  const [limit, setLimit] = useState(20);
  const [shareUrl, setShareUrl] = useState("");
  const shareTrigger = useRef<HTMLElement | null>(null);
  const closeShare = useCallback(() => {
    setShareUrl("");
    requestAnimationFrame(() =>
      shareTrigger.current?.focus({ preventScroll: true }),
    );
  }, []);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const closeRecovery = useCallback(() => setRecoveryOpen(false), []);
  const [selected, setSelected] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<Record<string, LinkAnalytics>>({});
  const [analyticsLoading, setAnalyticsLoading] = useState<
    Record<string, boolean>
  >({});
  const [analyticsErrors, setAnalyticsErrors] = useState<
    Record<string, boolean>
  >({});
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const cancelDelete = useCallback(() => {
    if (!deleting) setPendingDelete(null);
  }, [deleting]);
  const listRequest = useRef<AbortController | null>(null);
  const detailRequests = useRef(new Map<string, AbortController>());
  const load = useCallback(async () => {
    listRequest.current?.abort();
    const controller = new AbortController();
    listRequest.current = controller;
    setLoading(true);
    setLoadError(false);
    try {
      const response = await fetch("/api/links", {
        headers: { "x-device-key": getDeviceKey() },
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw Error("Unable to load links");
      const data = await response.json();
      if (controller.signal.aborted) return false;
      setLinks(data.links || []);
      setNow(Date.now());
      return true;
    } catch {
      if (!controller.signal.aborted) setLoadError(true);
      return false;
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    setOrigin(window.location.origin);
    setNow(Date.now());
    void load();
    const activeDetails = detailRequests.current;
    return () => {
      listRequest.current?.abort();
      activeDetails.forEach((controller) => controller.abort());
    };
  }, [load]);
  useEffect(() => {
    const reveal = () => {
      if (window.location.hash === "#recovery") setRecoveryOpen(true);
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  useEffect(() => {
    const tick = () => {
      if (!document.hidden) setNow(Date.now());
    };
    const timer = setInterval(tick, 60000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const counts = useMemo(() => {
    const result = {
      all: links.length,
      active: 0,
      paused: 0,
      expired: 0,
      clicks: 0,
    };
    for (const item of links) {
      result[linkStatus(item, now)]++;
      result.clicks += item.clicks;
    }
    return result;
  }, [links, now]);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase(locale);
    return links
      .filter(
        (item) =>
          (filter === "all" || linkStatus(item, now) === filter) &&
          (!search ||
            (item.shortUrl + " " + item.originalUrl)
              .toLocaleLowerCase(locale)
              .includes(search)),
      )
      .sort((a, b) =>
        sort === "popular"
          ? b.clicks - a.clicks
          : sort === "oldest"
            ? Date.parse(a.createdAt) - Date.parse(b.createdAt)
            : sort === "recent"
              ? Date.parse(b.lastClickedAt || "1970-01-01") -
                Date.parse(a.lastClickedAt || "1970-01-01")
              : Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
  }, [links, now, filter, query, sort, locale]);
  async function loadAnalytics(code: string, force = false) {
    if (!force && selected === code) {
      setSelected(null);
      return;
    }
    setSelected(code);
    if ((!force && analytics[code]) || detailRequests.current.has(code)) return;
    const controller = new AbortController();
    detailRequests.current.set(code, controller);
    setAnalyticsLoading((current) => ({ ...current, [code]: true }));
    setAnalyticsErrors((current) => ({ ...current, [code]: false }));
    try {
      const response = await fetch(
        "/api/links/" + encodeURIComponent(code) + "/analytics",
        {
          headers: { "x-device-key": getDeviceKey() },
          cache: "no-store",
          signal: controller.signal,
        },
      );
      if (!response.ok) throw Error("Unable to load analytics");
      const data = await response.json();
      if (!controller.signal.aborted)
        setAnalytics((current) => ({ ...current, [code]: data }));
    } catch {
      if (!controller.signal.aborted)
        setAnalyticsErrors((current) => ({ ...current, [code]: true }));
    } finally {
      if (detailRequests.current.get(code) === controller)
        detailRequests.current.delete(code);
      if (!controller.signal.aborted)
        setAnalyticsLoading((current) => ({ ...current, [code]: false }));
    }
  }
  async function update(code: string, patch: Record<string, unknown>) {
    try {
      const response = await fetch("/api/links/" + encodeURIComponent(code), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-device-key": getDeviceKey(),
        },
        body: JSON.stringify(patch),
      });
      if (!response.ok) throw Error("Unable to update link");
      const data = await response.json();
      setLinks((items) =>
        items.map((item) =>
          item.shortUrl === code ? { ...item, ...data.link } : item,
        ),
      );
      notify(dialog.updated, "success");
      return true;
    } catch {
      notify(dialog.actionFailed, "error");
      return false;
    }
  }
  async function remove(code: string) {
    if (deleting) return;
    setDeleting(true);
    try {
      const response = await fetch("/api/links/" + encodeURIComponent(code), {
        method: "DELETE",
        headers: { "x-device-key": getDeviceKey() },
      });
      if (!response.ok) throw Error("Unable to delete link");
      detailRequests.current.get(code)?.abort();
      detailRequests.current.delete(code);
      setLinks((items) => items.filter((item) => item.shortUrl !== code));
      setSelected((value) => (value === code ? null : value));
      notify(dialog.deleted, "success");
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLInputElement>(".manage-toolbar input")
          ?.focus({ preventScroll: true }),
      );
    } catch {
      notify(dialog.actionFailed, "error");
    } finally {
      setPendingDelete(null);
      setDeleting(false);
    }
  }
  async function restore(key: string) {
    try {
      importDeviceKey(key);
      listRequest.current?.abort();
      detailRequests.current.forEach((controller) => controller.abort());
      detailRequests.current.clear();
      setLinks([]);
      setSelected(null);
      setAnalytics({});
      setAnalyticsErrors({});
      setAnalyticsLoading({});
      setQuery("");
      setFilter("all");
      setLimit(20);
      const restored = await load();
      if (restored) notify(dialog.restored, "success");
      return restored;
    } catch {
      notify(dialog.actionFailed, "error");
      return false;
    }
  }
  const filters: Array<{
    value: Filter;
    label: string;
    icon: typeof LinkIcon;
  }> = [
    { value: "all", label: ui.all, icon: Squares2X2Icon },
    { value: "active", label: text.live, icon: CheckCircleIcon },
    { value: "paused", label: text.paused, icon: PauseCircleIcon },
    { value: "expired", label: ui.expired, icon: ClockIcon },
  ];
  const sortOptions = [
    { value: "newest" as const, label: ui.newest },
    { value: "oldest" as const, label: ui.oldest },
    { value: "popular" as const, label: ui.popular },
    { value: "recent" as const, label: ui.recent },
  ];
  const pending = loading && links.length === 0;
  return (
    <main className="utility-page manage-page manage-studio">
      <AppHeader active="links" />
      <div id="main-content" tabIndex={-1} className="dashboard-shell">
        <header className="manage-heading">
          <div>
            <p className="kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
            <div className="manage-heading-actions">
              <Link href="/" className="ui-button primary">
                <PlusIcon aria-hidden="true" />
                {text.navCreate}
              </Link>
              <button
                type="button"
                className="ui-button secondary"
                onClick={() => setRecoveryOpen(true)}
              >
                <KeyIcon aria-hidden="true" />
                {copy.recovery}
              </button>
            </div>
          </div>
          <ManageIllustration />
        </header>
        <ManageOverview
          locale={locale}
          count={counts.all}
          clicks={counts.clicks}
          active={counts.active}
          other={counts.paused + counts.expired}
          pending={pending || (loadError && links.length === 0)}
        />
        <p className="manage-count-note">{copy.countNote}</p>
        <section
          className="manage-library"
          aria-labelledby="manage-collection-title"
        >
          <div className="manage-collection-head">
            <div>
              <h2 id="manage-collection-title">{copy.collection}</h2>
              <span className="manage-device-tag">
                <i aria-hidden="true" />
                {copy.device}
              </span>
            </div>
            <button
              type="button"
              className="ui-button ghost manage-refresh"
              disabled={loading}
              onClick={() => void load()}
            >
              <ArrowPathIcon aria-hidden="true" />
              {loading ? copy.refreshing : copy.refresh}
            </button>
          </div>
          <div className="manage-toolbar">
            <SearchInput
              value={query}
              onChange={(value) => {
                setQuery(value);
                setLimit(20);
              }}
              label={copy.search}
              clearLabel={copy.clear}
            />
            <SortControl
              label={copy.sort}
              value={sort}
              onChange={(value) => {
                setSort(value);
                setLimit(20);
              }}
              options={sortOptions}
            />
          </div>
          <div className="manage-filter-row">
            <div
              className="manage-status-filters"
              role="group"
              aria-label={ui.filters}
            >
              {filters.map(({ value, label, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => {
                    setFilter(value);
                    setLimit(20);
                  }}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <small>
                    {pending ? "—" : counts[value].toLocaleString(locale)}
                  </small>
                </button>
              ))}
            </div>
            <span className="manage-result-count" aria-live="polite">
              {pending
                ? copy.loading
                : filtered.length.toLocaleString(locale) + " " + copy.result}
            </span>
          </div>
          {links.length >= 200 ? (
            <p className="list-limit-note">{studio.listLimit}</p>
          ) : null}
          {loadError ? (
            <section className="manage-load-error" role="alert">
              <h3>{copy.loadError}</h3>
              <p>{text.retryBody}</p>
              <button
                type="button"
                className="ui-button secondary"
                onClick={() => void load()}
              >
                <ArrowPathIcon aria-hidden="true" />
                {text.retry}
              </button>
            </section>
          ) : null}
          {pending ? (
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
          ) : !loadError && links.length === 0 ? (
            <section className="manage-empty">
              <ManageIllustration />
              <h3>{copy.emptyTitle}</h3>
              <p>{copy.emptyBody}</p>
              <Link href="/" className="ui-button primary">
                <PlusIcon aria-hidden="true" />
                {copy.emptyAction}
              </Link>
              <button
                type="button"
                className="manage-empty-recovery"
                onClick={() => setRecoveryOpen(true)}
              >
                <KeyIcon aria-hidden="true" />
                {copy.emptyRecovery}
              </button>
            </section>
          ) : (
            <div className="link-list">
              {filtered.slice(0, limit).map((item) => (
                <LinkListItem
                  key={item.shortUrl}
                  item={item}
                  origin={origin}
                  now={now}
                  onUpdate={(patch) => update(item.shortUrl, patch)}
                  onDelete={() => setPendingDelete(item.shortUrl)}
                  onAnalytics={() => void loadAnalytics(item.shortUrl)}
                  onCloseAnalytics={() =>
                    setSelected((value) =>
                      value === item.shortUrl ? null : value,
                    )
                  }
                  analyticsOpen={selected === item.shortUrl}
                  onShare={() => {
                    shareTrigger.current =
                      document.activeElement instanceof HTMLElement
                        ? document.activeElement
                        : null;
                    setShareUrl(origin + "/" + item.shortUrl);
                  }}
                >
                  {selected === item.shortUrl ? (
                    <LinkAnalyticsPanel
                      id={"link-" + item.shortUrl + "-stats"}
                      locale={locale}
                      data={analytics[item.shortUrl]}
                      loading={Boolean(analyticsLoading[item.shortUrl])}
                      error={Boolean(analyticsErrors[item.shortUrl])}
                      onRetry={() => void loadAnalytics(item.shortUrl, true)}
                      onClose={() => {
                        setSelected(null);
                        document
                          .querySelector<HTMLButtonElement>(
                            '[aria-controls="link-' +
                              item.shortUrl +
                              '-stats"]',
                          )
                          ?.focus({ preventScroll: true });
                      }}
                    />
                  ) : null}
                </LinkListItem>
              ))}
            </div>
          )}
          {!pending && links.length > 0 && filtered.length === 0 ? (
            <section className="manage-empty manage-no-results">
              <LinkIcon aria-hidden="true" />
              <h3>{copy.noResults}</h3>
              <p>{copy.noResultsBody}</p>
              <button
                type="button"
                className="ui-button secondary"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                  setLimit(20);
                }}
              >
                {studio.reset}
              </button>
            </section>
          ) : null}
          {filtered.length > limit ? (
            <button
              type="button"
              className="ui-button secondary manage-more"
              onClick={() => setLimit((value) => value + 20)}
            >
              {ui.moreLinks}
              <span>{(filtered.length - limit).toLocaleString(locale)}</span>
            </button>
          ) : null}
        </section>
        <aside className="manage-recovery-strip">
          <KeyIcon aria-hidden="true" />
          <div>
            <strong>{copy.recovery}</strong>
            <p>{copy.deviceBody}</p>
          </div>
          <button
            type="button"
            className="ui-button ghost"
            onClick={() => setRecoveryOpen(true)}
          >
            {copy.backup}
          </button>
        </aside>
      </div>
      <RecoveryDialog
        open={recoveryOpen}
        onClose={closeRecovery}
        onRestore={restore}
      />
      {shareUrl ? <ShareKit open url={shareUrl} onClose={closeShare} /> : null}
      <ConfirmDialog
        open={pendingDelete !== null}
        title={dialog.deleteTitle}
        description={
          dialog.deleteBody + (pendingDelete ? " /" + pendingDelete : "")
        }
        confirmLabel={text.delete}
        cancelLabel={dialog.cancel}
        danger
        busy={deleting}
        onCancel={cancelDelete}
        onConfirm={() => {
          if (pendingDelete) void remove(pendingDelete);
        }}
      />
    </main>
  );
}
