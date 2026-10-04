"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowsUpDownIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
export type LinkSort = "newest" | "oldest" | "popular" | "recent";
export default function SortControl({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: LinkSort;
  onChange: (value: LinkSort) => void;
  options: Array<{ value: LinkSort; label: string }>;
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
      className="manage-sort"
      ref={ref}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          ref.current?.removeAttribute("open");
          ref.current?.querySelector("summary")?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          ref.current?.removeAttribute("open");
      }}
    >
      <summary>
        <ArrowsUpDownIcon aria-hidden="true" />
        <span>{options.find((item) => item.value === value)?.label}</span>
        <ChevronDownIcon aria-hidden="true" />
      </summary>
      <fieldset>
        <legend>{label}</legend>
        {options.map((item) => (
          <label key={item.value}>
            <input
              type="radio"
              name="manage-sort"
              value={item.value}
              checked={value === item.value}
              onChange={() => onChange(item.value)}
            />
            <span>
              {item.label}
              <CheckIcon aria-hidden="true" />
            </span>
          </label>
        ))}
      </fieldset>
    </details>
  );
}
