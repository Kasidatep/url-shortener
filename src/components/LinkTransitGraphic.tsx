import {
  ArrowUpRightIcon,
  LockClosedIcon,
  PauseIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import MemoLinkMark from "./MemoLinkMark";
export type TransitState =
  "checking" | "opening" | "password" | "expired" | "missing" | "error";
// CSS perspective paints immediately, even before JavaScript or WebGL is ready.
export default function LinkTransitGraphic({
  state = "checking",
  compact = false,
}: {
  state?: TransitState;
  compact?: boolean;
}) {
  const Icon =
    state === "password"
      ? LockClosedIcon
      : state === "expired"
        ? PauseIcon
        : state === "missing"
          ? QuestionMarkCircleIcon
          : state === "error"
            ? ArrowPathIcon
            : ArrowUpRightIcon;
  return (
    <div
      className={"link-transit" + (compact ? " compact" : "")}
      data-state={state}
      aria-hidden="true"
    >
      <div className="transit-grid" />
      <div className="transit-shadow" />
      <div className="transit-space">
        <div className="transit-ring ring-back" />
        <div className="transit-ring ring-front" />
        <div className="transit-orbit">
          <i />
          <i />
          <i />
        </div>
        <div className="transit-ticket">
          <div className="transit-ticket-top">
            <MemoLinkMark className="transit-mark" />
            <span>MemoLink</span>
          </div>
          <div className="transit-ticket-lines">
            <i />
            <i />
          </div>
          <div className="transit-ticket-bottom">
            <span>↗</span>
            <Icon />
          </div>
        </div>
        <div className="transit-destination">
          <span />
          <Icon />
        </div>
      </div>
    </div>
  );
}
