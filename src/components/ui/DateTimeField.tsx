'use client';
import { useRef, useState } from 'react';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { usePreferences } from '../PreferencesProvider';
import { visualMessages } from '@/config/visual-i18n';
const pad = (n: number) => String(n).padStart(2, '0');
const localValue = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
function TimePart({
  value,
  max,
  label,
  onCommit,
}: {
  value: number;
  max: number;
  label: string;
  onCommit: (v: string) => void;
}) {
  const [draft, setDraft] = useState(pad(value));
  return (
    <input
      aria-label={label}
      inputMode="numeric"
      type="number"
      min="0"
      max={max}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const n = Number(draft);
        if (draft !== '' && Number.isInteger(n) && n >= 0 && n <= max) {
          onCommit(draft);
          setDraft(pad(n));
        } else setDraft(pad(value));
      }}
    />
  );
}
export default function DateTimeField({
  value,
  onChange,
  label,
  invalid,
  description,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  invalid: boolean;
  description?: string;
}) {
  const { locale } = usePreferences();
  const copy = visualMessages[locale];
  const [open, setOpen] = useState(false);
  const initial =
    value && Number.isFinite(new Date(value).getTime())
      ? new Date(value)
      : new Date();
  const [view, setView] = useState(
    () => new Date(initial.getFullYear(), initial.getMonth(), 1),
  );
  const daysRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected =
    value && Number.isFinite(new Date(value).getTime())
      ? new Date(value)
      : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const fullDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  function choose(date: Date) {
    date.setHours(
      selected?.getHours() ?? 23,
      selected?.getMinutes() ?? 59,
      0,
      0,
    );
    onChange(localValue(date));
  }
  function preset(n: number) {
    const date = new Date();
    date.setDate(date.getDate() + n);
    choose(date);
    setView(new Date(date.getFullYear(), date.getMonth(), 1));
  }
  function changeTime(part: 'hour' | 'minute', raw: string) {
    if (!selected) return;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 0 || n > (part === 'hour' ? 23 : 59))
      return;
    const d = new Date(selected);
    if (part === 'hour') d.setHours(n);
    else d.setMinutes(n);
    onChange(localValue(d));
  }
  return (
    <div className="date-time-field">
      <label id="date-label">{label}</label>
      <button
        id="date"
        ref={trigger}
        type="button"
        className="date-trigger"
        aria-expanded={open}
        aria-controls="expiry-calendar"
        aria-labelledby="date-label date-value"
        data-invalid={invalid}
        aria-describedby={description}
        onClick={() => {
          if (!open)
            setView(new Date(initial.getFullYear(), initial.getMonth(), 1));
          setOpen((v) => !v);
        }}
      >
        <CalendarDaysIcon aria-hidden="true" />
        <span id="date-value">
          {selected ? fullDate.format(selected) : copy.datePlaceholder}
        </span>
        <ChevronRightIcon aria-hidden="true" />
      </button>
      {open ? (
        <section
          id="expiry-calendar"
          className="calendar-panel"
          aria-label={copy.calendar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              e.preventDefault();
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <div className="date-presets">
            {[
              [1, copy.tomorrow],
              [7, copy.week],
              [30, copy.month],
            ].map(([n, text]) => (
              <button type="button" key={n} onClick={() => preset(Number(n))}>
                {text}
              </button>
            ))}
          </div>
          <div className="calendar-heading">
            <button
              type="button"
              aria-label={copy.previousMonth}
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
              }
            >
              <ChevronLeftIcon aria-hidden="true" />
            </button>
            <strong aria-live="polite">
              {new Intl.DateTimeFormat(locale, {
                month: 'long',
                year: 'numeric',
              }).format(view)}
            </strong>
            <button
              type="button"
              aria-label={copy.nextMonth}
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
              }
            >
              <ChevronRightIcon aria-hidden="true" />
            </button>
          </div>
          <div className="calendar-week" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i}>
                {new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(
                  new Date(2026, 0, 4 + i),
                )}
              </span>
            ))}
          </div>
          <div
            className="calendar-days"
            ref={daysRef}
            role="group"
            aria-label={copy.calendar}
            onKeyDown={(e) => {
              const keys = [
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Home',
                'End',
              ];
              if (!keys.includes(e.key)) return;
              const buttons = Array.from(
                daysRef.current?.querySelectorAll<HTMLButtonElement>(
                  'button',
                ) ?? [],
              );
              const index = buttons.indexOf(
                document.activeElement as HTMLButtonElement,
              );
              if (index < 0) return;
              e.preventDefault();
              let next =
                e.key === 'Home'
                  ? 0
                  : e.key === 'End'
                    ? count - 1
                    : index +
                      ({
                        ArrowLeft: -1,
                        ArrowRight: 1,
                        ArrowUp: -7,
                        ArrowDown: 7,
                      }[e.key] ?? 0);
              next = Math.max(0, Math.min(count - 1, next));
              while (buttons[next]?.disabled && next < count - 1) next++;
              buttons[next]?.focus();
            }}
          >
            {Array.from({ length: weekStart }, (_, i) => (
              <span key={'space' + i} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const d = new Date(view.getFullYear(), view.getMonth(), i + 1);
              return (
                <button
                  type="button"
                  key={i}
                  aria-label={new Intl.DateTimeFormat(locale, {
                    dateStyle: 'full',
                  }).format(d)}
                  aria-pressed={
                    !!selected && selected.toDateString() === d.toDateString()
                  }
                  tabIndex={
                    i + 1 ===
                    (selected &&
                    selected.getMonth() === view.getMonth() &&
                    selected.getFullYear() === view.getFullYear()
                      ? selected.getDate()
                      : today.getMonth() === view.getMonth() &&
                          today.getFullYear() === view.getFullYear()
                        ? today.getDate()
                        : 1)
                      ? 0
                      : -1
                  }
                  disabled={d < today}
                  onClick={() => choose(d)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          {selected ? (
            <div className="calendar-time">
              <ClockIcon aria-hidden="true" />
              <span>{copy.time}</span>
              <label>
                <span className="sr-only">{copy.hour}</span>
                <TimePart
                  key={selected.toDateString()}
                  label={copy.hour}
                  value={selected.getHours()}
                  max={23}
                  onCommit={(v) => changeTime('hour', v)}
                />
              </label>
              <b>:</b>
              <label>
                <span className="sr-only">{copy.minute}</span>
                <TimePart
                  key={selected.toDateString()}
                  label={copy.minute}
                  value={selected.getMinutes()}
                  max={59}
                  onCommit={(v) => changeTime('minute', v)}
                />
              </label>
            </div>
          ) : null}
          {value ? (
            <button
              type="button"
              className="calendar-clear"
              onClick={() => onChange('')}
            >
              {copy.clear}
            </button>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
