import {
  ChartBarIcon,
  CheckCircleIcon,
  LinkIcon,
  PauseCircleIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import MemoLinkMark from "../MemoLinkMark";
import { manageMessages } from "@/config/manage-i18n";
import type { Locale } from "@/config/i18n";
export function ManageIllustration() {
  return (
    <div className="manage-illustration" aria-hidden="true">
      <div className="manage-orbit" />
      <div className="manage-paper paper-back">
        <i />
        <i />
      </div>
      <div className="manage-paper paper-front">
        <MemoLinkMark className="manage-mark" />
        <span>MemoLink</span>
        <div />
        <ArrowUpRightIcon />
      </div>
      <div className="manage-illustration-dot">
        <CheckCircleIcon />
      </div>
    </div>
  );
}
export default function ManageOverview({
  locale,
  count,
  clicks,
  active,
  other,
  pending,
}: {
  locale: Locale;
  count: number;
  clicks: number;
  active: number;
  other: number;
  pending: boolean;
}) {
  const copy = manageMessages[locale];
  const metrics = [
    { label: copy.total, value: count, icon: LinkIcon },
    { label: copy.openings, value: clicks, icon: ChartBarIcon },
    { label: copy.active, value: active, icon: CheckCircleIcon },
    { label: copy.other, value: other, icon: PauseCircleIcon },
  ];
  return (
    <section
      className="manage-overview"
      aria-label={copy.collection}
      aria-busy={pending}
    >
      {metrics.map(({ label, value, icon: Icon }, index) => (
        <div className={"manage-metric metric-" + index} key={label}>
          <span className="metric-icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="metric-label">{label}</span>
          <strong>{pending ? "—" : value.toLocaleString(locale)}</strong>
          {index === 2 ? (
            <div className="metric-meter" aria-hidden="true">
              <i
                style={{ width: count ? (active / count) * 100 + "%" : "0%" }}
              />
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
}
