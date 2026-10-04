"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowTurnDownRightIcon,
  ChartBarIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  LinkIcon,
  PencilSquareIcon,
  PlayIcon,
  PauseIcon,
  QrCodeIcon,
  ShareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePreferences } from "../PreferencesProvider";
import { getPageMessages } from "@/config/page-i18n";
import { utilityMessages } from "@/config/utility-i18n";
import { studioMessages } from "@/config/studio-i18n";
import { manageMessages } from "@/config/manage-i18n";
import { normalizeUrlInput } from "@/lib/url-input";
import LinkActionsMenu from "./LinkActionsMenu";
import Button from "../ui/Button";
const QRCodeComponent = dynamic(() => import("../QRCodeComponent"));
export type LinkItem = {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  active: boolean;
  expirationType: string;
  maxClicks?: number;
  expirationDate?: string;
  createdAt: string;
  lastClickedAt?: string;
};
export type LinkStatus = "active" | "paused" | "expired";
export function linkStatus(item: LinkItem, now = Date.now()): LinkStatus {
  return (item.expirationType === "datetime" &&
    item.expirationDate &&
    new Date(item.expirationDate).getTime() <= now) ||
    (item.expirationType === "clicks" && item.clicks >= (item.maxClicks || 0))
    ? "expired"
    : item.active
      ? "active"
      : "paused";
}
export default function LinkListItem({
  item,
  origin,
  now,
  onUpdate,
  onDelete,
  onAnalytics,
  onCloseAnalytics,
  analyticsOpen,
  onShare,
  children,
}: {
  item: LinkItem;
  origin: string;
  now: number;
  onUpdate: (patch: Record<string, unknown>) => Promise<boolean>;
  onDelete: () => void;
  onAnalytics: () => void;
  onCloseAnalytics: () => void;
  analyticsOpen: boolean;
  onShare: () => void;
  children: React.ReactNode;
}) {
  const { locale, t } = usePreferences();
  const text = getPageMessages(locale);
  const ui = utilityMessages[locale];
  const studio = studioMessages[locale];
  const copy = manageMessages[locale];
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [panel, setPanel] = useState<"edit" | "qr" | null>(null);
  const [destination, setDestination] = useState(item.originalUrl);
  const [busy, setBusy] = useState(false);
  const editTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  useEffect(() => {
    if (panel === "edit")
      document.getElementById("edit-" + item.shortUrl)?.focus();
  }, [panel, item.shortUrl]);
  const status = linkStatus(item, now);
  const url = origin + "/" + item.shortUrl;
  const id = "link-" + item.shortUrl;
  const detailId = id + "-stats";
  function closePanel() {
    setPanel(null);
    setError("");
    requestAnimationFrame(() =>
      editTrigger.current?.focus({ preventScroll: true }),
    );
  }
  function togglePanel(next: "edit" | "qr") {
    onCloseAnalytics();
    setError("");
    if (next === "edit") setDestination(item.originalUrl);
    setPanel((value) => (value === next ? null : next));
  }
  async function update(patch: Record<string, unknown>) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (await onUpdate(patch)) {
        if (panel === "edit") closePanel();
      } else setError(text.retryBody);
    } finally {
      setBusy(false);
    }
  }
  async function copyLink() {
    setError("");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setError(t("clipboardFailed"));
    }
  }
  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const expiry =
    item.expirationType === "clicks"
      ? copy.remaining +
        " " +
        Math.max(0, (item.maxClicks || 0) - item.clicks).toLocaleString(
          locale,
        ) +
        " " +
        copy.visits
      : item.expirationType === "datetime" && item.expirationDate
        ? copy.expires +
          " " +
          new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(item.expirationDate))
        : copy.noExpiry;
  return (
    <article
      className={"managed-link manage-link-card status-" + status}
      aria-busy={busy}
      aria-labelledby={id + "-title"}
    >
      <div className="managed-link-main">
        <div className="managed-link-identity">
          <span className="managed-link-tile" aria-hidden="true">
            <LinkIcon />
          </span>
          <div>
            <div className="managed-link-title-row">
              <h3 id={id + "-title"}>
                <a
                  className="managed-url"
                  href={"/" + item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.openLink + " /" + item.shortUrl}
                >
                  /{item.shortUrl}
                  <ArrowTopRightOnSquareIcon aria-hidden="true" />
                </a>
              </h3>
              <span className={"link-status " + status}>
                <i aria-hidden="true" />
                {status === "expired"
                  ? ui.expired
                  : status === "active"
                    ? text.live
                    : text.paused}
              </span>
            </div>
            <span className="managed-origin">
              {origin.replace(/^https?:\/\//, "")}
            </span>
          </div>
        </div>
        <p className="managed-destination" title={item.originalUrl}>
          <ArrowTurnDownRightIcon aria-hidden="true" />
          <span>{item.originalUrl}</span>
        </p>
        <div className="link-meta">
          <span>
            {text.created} {date.format(new Date(item.createdAt))}
          </span>
          {item.lastClickedAt ? (
            <span>
              {text.lastVisit} {date.format(new Date(item.lastClickedAt))}
            </span>
          ) : null}
        </div>
      </div>
      <div className="managed-link-count">
        <strong>{item.clicks.toLocaleString(locale)}</strong>
        <span>{copy.visits}</span>
      </div>
      <div className="managed-actions">
        <Button
          disabled={busy}
          className="link-copy-button"
          onClick={() => void copyLink()}
        >
          {copied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <ClipboardDocumentIcon aria-hidden="true" />
          )}
          <span aria-live="polite">{copied ? t("copied") : text.copy}</span>
        </Button>
        <button
          type="button"
          className="icon-control"
          disabled={busy}
          aria-label={ui.share + " /" + item.shortUrl}
          title={ui.share}
          onClick={onShare}
        >
          <ShareIcon aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-control"
          disabled={busy}
          aria-label={copy.viewStats + " /" + item.shortUrl}
          title={copy.viewStats}
          aria-expanded={analyticsOpen}
          aria-controls={detailId}
          onClick={() => {
            setPanel(null);
            setError("");
            onAnalytics();
          }}
        >
          <ChartBarIcon aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-control"
          ref={editTrigger}
          disabled={busy}
          aria-label={copy.edit + " /" + item.shortUrl}
          title={copy.edit}
          aria-expanded={panel === "edit"}
          aria-controls={id + "-edit"}
          onClick={() => togglePanel("edit")}
        >
          <PencilSquareIcon aria-hidden="true" />
        </button>
        <LinkActionsMenu
          disabled={busy}
          label={ui.more + " /" + item.shortUrl}
          actions={[
            {
              label: item.active ? text.pause : text.activate,
              icon: item.active ? PauseIcon : PlayIcon,
              action: () => {
                void update({ active: !item.active });
              },
            },
            {
              label: copy.qr,
              icon: QrCodeIcon,
              action: () => togglePanel("qr"),
            },
            {
              label: text.delete,
              icon: TrashIcon,
              action: onDelete,
              danger: true,
            },
          ]}
        />
      </div>
      <div className="managed-expiry">
        <ClockIcon aria-hidden="true" />
        <span>{expiry}</span>
      </div>
      {error ? (
        <p className="field-error" id={id + "-error"} role="alert">
          {error}
        </p>
      ) : null}
      {panel === "edit" ? (
        <section id={id + "-edit"} className="managed-detail managed-edit">
          <header className="managed-detail-head">
            <h4>
              <PencilSquareIcon aria-hidden="true" />
              {copy.edit}
            </h4>
            <button
              type="button"
              className="icon-control"
              aria-label={copy.closePanel}
              disabled={busy}
              onClick={closePanel}
            >
              <XMarkIcon aria-hidden="true" />
            </button>
          </header>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              try {
                void update({ originalUrl: normalizeUrlInput(destination) });
              } catch {
                setError(text.retryBody);
              }
            }}
          >
            <label htmlFor={"edit-" + item.shortUrl}>{copy.destination}</label>
            <input
              id={"edit-" + item.shortUrl}
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                setError("");
              }}
              disabled={busy}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? id + "-error" : undefined}
            />
            <div className="edit-actions">
              <Button variant="primary" type="submit" disabled={busy}>
                {busy ? copy.saving : copy.save}
              </Button>
              <Button disabled={busy} onClick={closePanel}>
                {studio.cancel}
              </Button>
            </div>
          </form>
        </section>
      ) : null}
      {panel === "qr" ? (
        <section className="managed-detail managed-qr" aria-label={copy.qr}>
          <header className="managed-detail-head">
            <h4>
              <QrCodeIcon aria-hidden="true" />
              {copy.qr}
            </h4>
            <button
              type="button"
              className="icon-control"
              aria-label={copy.closePanel}
              onClick={() => setPanel(null)}
            >
              <XMarkIcon aria-hidden="true" />
            </button>
          </header>
          <QRCodeComponent shortUrl={url} />
        </section>
      ) : null}
      {children}
    </article>
  );
}
