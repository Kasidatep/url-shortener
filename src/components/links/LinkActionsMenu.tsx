"use client";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
export default function LinkActionsMenu({
  label,
  actions,
  disabled = false,
}: {
  label: string;
  disabled?: boolean;
  actions: Array<{
    label: string;
    action: () => void;
    danger?: boolean;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  }>;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node))
        ref.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <details
      className="link-menu"
      ref={ref}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          event.currentTarget.removeAttribute("open");
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          ref.current?.removeAttribute("open");
          ref.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <summary
        aria-label={label}
        aria-disabled={disabled}
        onClick={(event) => {
          if (disabled) event.preventDefault();
        }}
      >
        <EllipsisHorizontalIcon aria-hidden="true" />
      </summary>
      <div>
        {actions.map(({ icon: Icon, ...item }) => (
          <button
            type="button"
            disabled={disabled}
            key={item.label}
            className={item.danger ? "destructive" : ""}
            onClick={() => {
              ref.current?.removeAttribute("open");
              ref.current?.querySelector("summary")?.focus();
              item.action();
            }}
          >
            {Icon ? <Icon aria-hidden="true" /> : null}
            {item.label}
          </button>
        ))}
      </div>
    </details>
  );
}
