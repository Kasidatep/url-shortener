'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArrowPathIcon,
  LinkIcon,
  AdjustmentsHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import ProductDialog from './ProductDialog';
import LinkJourney3D from './LinkJourney3D';
import { visualMessages } from '@/config/visual-i18n';
import { usePreferences } from './PreferencesProvider';
import { canvasMessages } from '@/config/canvas-i18n';
export const TOUR_SESSION_KEY = 'memolink-create-tour-v1';
export default function CreateOnboarding({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale } = usePreferences();
  const copy = canvasMessages[locale];
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState(0);
  const visual = visualMessages[locale];
  const icons = [LinkIcon, AdjustmentsHorizontalIcon, PaperAirplaneIcon];
  return (
    <ProductDialog
      open={open}
      onClose={onClose}
      title={copy.tourLabel}
      id="tour-title"
      className="tour-dialog"
    >
      <div className="tour-scene" data-stage={step}>
        <div className="scene-heading">
          <span>{visual.journey}</span>
          <button
            type="button"
            className="scene-replay"
            aria-label={visual.replay}
            onClick={() => setReplay((v) => v + 1)}
          >
            <ArrowPathIcon aria-hidden="true" />
          </button>
        </div>
        {open ? <LinkJourney3D stage={step} replay={replay} /> : null}
        <div className="scene-route" aria-hidden="true">
          {[visual.from, visual.through, visual.to].map((label, i) => (
            <span key={label} data-current={step === i}>
              {i === 0 ? (
                <LinkIcon />
              ) : i === 1 ? (
                <AdjustmentsHorizontalIcon />
              ) : (
                <PaperAirplaneIcon />
              )}
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="tour-story">
        <div
          className="tour-step-picker"
          role="group"
          aria-label={copy.tourLabel}
        >
          {copy.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <button
                type="button"
                key={i}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <Icon aria-hidden="true" />
                <span>0{i + 1}</span>
                {s.label}
              </button>
            );
          })}
        </div>
        <div
          className="tour-copy"
          key={step}
          aria-live="polite"
          aria-atomic="true"
        >
          <h3>{copy.steps[step].title}</h3>
          <p>{copy.steps[step].body}</p>
        </div>
        <div className="tour-actions">
          <button
            type="button"
            className="ui-button secondary"
            disabled={step === 0}
            onClick={() => setStep((v) => v - 1)}
          >
            {copy.back}
          </button>
          <button
            type="button"
            className="ui-button primary"
            onClick={() => (step === 2 ? onClose() : setStep((v) => v + 1))}
          >
            {step === 2 ? copy.start : copy.next}
            <ArrowRightIcon aria-hidden="true" />
          </button>
        </div>
        <div className="tour-foot">
          <button type="button" onClick={onClose}>
            {copy.skip}
          </button>
          <Link href="/faq" onClick={onClose}>
            {copy.viewHelp} <ArrowUpRightIcon aria-hidden="true"/>
          </Link>
        </div>
        <p className="tour-disclaimer">{copy.tourNote}</p>
      </div>
    </ProductDialog>
  );
}
