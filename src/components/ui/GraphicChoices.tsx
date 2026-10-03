'use client';
import { useId } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';
export type GraphicChoice<T extends string> = {
  value: T;
  label: string;
  hint?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
export default function GraphicChoices<T extends string>({
  label,
  value,
  onChange,
  options,
  compact = false,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: GraphicChoice<T>[];
  compact?: boolean;
}) {
  const name = useId();
  return (
    <fieldset className={'graphic-choices' + (compact ? ' compact' : '')}>
      <legend>{label}</legend>
      <div className="graphic-choice-grid">
        {options.map(({ value: option, label: caption, hint, icon: Icon }) => (
          <label className="graphic-choice" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={option === value}
              onChange={() => onChange(option)}
            />
            <span className="choice-face">
              <span className="choice-illustration" aria-hidden="true">
                <Icon />
              </span>
              <span className="choice-text">
                <strong>{caption}</strong>
                {hint ? <small>{hint}</small> : null}
              </span>
              <CheckIcon className="choice-check" aria-hidden="true" />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
