"use client";
import { useState } from "react";
import {
  QrCodeIcon,
  LockClosedIcon,
  ChartBarIcon,
  ArrowUpRightIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import MemoLinkMark from "../MemoLinkMark";
import { helpJourneyMessages } from "@/config/help-journey-i18n";
import type { Locale } from "@/config/i18n";
const icons = [QrCodeIcon, LockClosedIcon, ChartBarIcon];
export default function HelpStory({
  locale,
  onAnswer,
}: {
  locale: Locale;
  onAnswer: (id: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const copy = helpJourneyMessages[locale];
  const story = copy.scenarios[selected];
  const Icon = icons[selected];
  return (
    <section className="help-story" aria-labelledby="help-story-label">
      <p id="help-story-label" className="help-story-label">
        {copy.demo}
      </p>
      <div className="help-story-choices">
        {copy.scenarios.map((item, index) => {
          const ChoiceIcon = icons[index];
          return (
            <button
              key={item.answer}
              type="button"
              aria-pressed={selected === index}
              aria-controls="help-story-content"
              onClick={() => setSelected(index)}
            >
              <ChoiceIcon aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div
        id="help-story-content"
        className="help-story-content"
        data-story={selected}
      >
        <div className="help-story-visual" aria-hidden="true">
          <div className="story-platform" />
          <div className="story-sheet sheet-back">
            <span />
            <span />
            <span />
          </div>
          <div className="story-sheet sheet-front">
            <MemoLinkMark className="story-mark" />
            <Icon />
            <div className="story-rule" />
            <small>MemoLink</small>
          </div>
          <div className="story-orb">
            <ArrowUpRightIcon />
          </div>
          <div className="story-channel channel-one">
            <EnvelopeIcon />
          </div>
          <div className="story-channel channel-two">
            <DevicePhoneMobileIcon />
          </div>
        </div>
        <div className="help-story-copy" key={selected}>
          <div className="story-tags">
            {story.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h2>{story.title}</h2>
          <p>{story.body}</p>
          <button
            className="story-answer"
            type="button"
            onClick={() => onAnswer(story.answer)}
          >
            {story.action}
            <ArrowUpRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
