"use client";
import {
  ArrowPathIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { manageMessages } from "@/config/manage-i18n";
import { getPageMessages } from "@/config/page-i18n";
import type { Locale } from "@/config/i18n";
export type LinkAnalytics = {
  visits30d: number;
  daily: Record<string, number>;
  countries: Record<string, number>;
  devices: Record<string, number>;
  referrers: Record<string, number>;
};
function labelFor(value: string, locale: Locale, type: string) {
  const copy = manageMessages[locale];
  const labels: Record<string, string> = {
    Direct: copy.direct,
    Internal: copy.internal,
    Unknown: copy.unknown,
    unknown: copy.unknown,
    mobile: copy.mobile,
    desktop: copy.desktop,
    tablet: copy.tablet,
    bot: copy.bot,
  };
  if (labels[value]) return labels[value];
  if (type === "country" && /^[A-Z]{2}$/.test(value)) {
    try {
      return (
        new Intl.DisplayNames([locale], { type: "region" }).of(value) || value
      );
    } catch {
      return value;
    }
  }
  return value;
}
function Breakdown({
  title,
  values,
  locale,
  type,
}: {
  title: string;
  values: Record<string, number>;
  locale: Locale;
  type: string;
}) {
  const entries = Object.entries(values)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const max = entries[0]?.[1] || 1;
  return (
    <section className="manage-breakdown">
      <h4>{title}</h4>
      {entries.length ? (
        entries.map(([label, value]) => (
          <div className="manage-breakdown-row" key={label}>
            <span title={labelFor(label, locale, type)}>
              {labelFor(label, locale, type)}
            </span>
            <strong>{value.toLocaleString(locale)}</strong>
            <div aria-hidden="true">
              <i style={{ width: (value / max) * 100 + "%" }} />
            </div>
          </div>
        ))
      ) : (
        <p>{manageMessages[locale].unknown}</p>
      )}
    </section>
  );
}
function DailyChart({
  values,
  locale,
}: {
  values: Record<string, number>;
  locale: Locale;
}) {
  const copy = manageMessages[locale];
  const end = new Date();
  const rows = Array.from({ length: 30 }, (_, index) => {
    const day = new Date(
      Date.UTC(
        end.getUTCFullYear(),
        end.getUTCMonth(),
        end.getUTCDate() - 29 + index,
      ),
    );
    const key = day.toISOString().slice(0, 10);
    return { date: day, key, value: values[key] || 0 };
  });
  const max = Math.max(1, ...rows.map((item) => item.value));
  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return (
    <div className="manage-chart">
      <div className="manage-chart-bars" role="img" aria-label={copy.daily}>
        {rows.map((item) => (
          <div
            className="manage-chart-column"
            key={item.key}
            title={
              date.format(item.date) + ": " + item.value.toLocaleString(locale)
            }
          >
            <i
              data-empty={item.value === 0}
              style={{
                height:
                  Math.max(item.value ? 5 : 2, (item.value / max) * 100) + "%",
              }}
            />
          </div>
        ))}
      </div>
      <div className="manage-chart-axis" aria-hidden="true">
        <span>{date.format(rows[0].date)}</span>
        <span>{date.format(rows[14].date)}</span>
        <span>{date.format(rows[29].date)}</span>
      </div>
      <details className="manage-chart-table">
        <summary>{copy.dailyTable}</summary>
        <div tabIndex={0} role="region" aria-label={copy.dailyTable}>
          <table>
            <caption className="sr-only">{copy.daily}</caption>
            <thead>
              <tr>
                <th scope="col">{copy.date}</th>
                <th scope="col">{copy.count}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.key}>
                  <th scope="row">{date.format(item.date)}</th>
                  <td>{item.value.toLocaleString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
export default function LinkAnalyticsPanel({
  id,
  locale,
  data,
  loading,
  error,
  onRetry,
  onClose,
}: {
  id: string;
  locale: Locale;
  data?: LinkAnalytics;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onClose: () => void;
}) {
  const copy = manageMessages[locale];
  const text = getPageMessages(locale);
  return (
    <section
      id={id}
      className="manage-analytics managed-detail"
      aria-labelledby={id + "-title"}
      aria-busy={loading}
    >
      <header className="managed-detail-head">
        <h3 id={id + "-title"}>
          <ChartBarIcon aria-hidden="true" />
          {copy.statsTitle}
        </h3>
        <div>
          <button
            type="button"
            className="icon-control"
            disabled={loading}
            aria-label={copy.refresh}
            onClick={onRetry}
          >
            <ArrowPathIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-control"
            aria-label={copy.closePanel}
            onClick={onClose}
          >
            <XMarkIcon aria-hidden="true" />
          </button>
        </div>
      </header>
      {data ? (
        <>
          <div className="manage-analytics-top">
            <div className="manage-analytics-total">
              <p>{copy.statsBody}</p>
              <strong>{data.visits30d.toLocaleString(locale)}</strong>
              <span>{copy.visits}</span>
            </div>
            {data.visits30d ? (
              <DailyChart values={data.daily} locale={locale} />
            ) : (
              <p className="manage-analytics-empty">{copy.noStats}</p>
            )}
          </div>
          <p className="manage-analytics-note">{copy.statsNote}</p>
          {error ? (
            <p className="field-error" role="alert">
              {text.retryBody}
            </p>
          ) : null}
          <div className="manage-breakdown-grid">
            <Breakdown
              title={text.countries}
              values={data.countries}
              locale={locale}
              type="country"
            />
            <Breakdown
              title={text.devices}
              values={data.devices}
              locale={locale}
              type="device"
            />
            <Breakdown
              title={text.referrers}
              values={data.referrers}
              locale={locale}
              type="referrer"
            />
          </div>
        </>
      ) : error ? (
        <div className="manage-analytics-empty" role="alert">
          <p>{text.retryBody}</p>
          <button
            type="button"
            className="ui-button secondary"
            onClick={onRetry}
          >
            {text.retry}
          </button>
        </div>
      ) : (
        <p className="manage-analytics-empty" role="status">
          {text.loadingLinks}
        </p>
      )}
    </section>
  );
}
