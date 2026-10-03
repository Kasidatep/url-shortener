"use client";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  LinkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Locale } from "@/config/i18n";
import { helpJourneyMessages } from "@/config/help-journey-i18n";
import { getPageMessages } from "@/config/page-i18n";
export default function FAQItem({
  id,
  question,
  answer,
  category,
  locale,
}: {
  id: string;
  question: string;
  answer: string;
  category: number;
  locale: Locale;
}) {
  const [feedback, setFeedback] = useState<"copied" | "failed" | null>(null);
  const copy = helpJourneyMessages[locale];
  const text = getPageMessages(locale);
  async function shareAnswer() {
    const url = new URL("/faq", window.location.origin);
    url.hash = "answer-" + id;
    try {
      await navigator.clipboard.writeText(url.href);
      setFeedback("copied");
    } catch {
      setFeedback("failed");
    }
  }
  const href = category === 2 || category === 3 ? "/manage" : "/";
  const action =
    category === 2 || category === 3
      ? text.navLinks
      : category === 5
        ? null
        : text.navCreate;
  return (
    <details className="faq-item" id={"answer-" + id}>
      <summary>
        <span className="faq-question">{question}</span>
        <span className="faq-plus" aria-hidden="true">
          <PlusIcon />
        </span>
      </summary>
      <div className="faq-answer">
        <p>{answer}</p>
        <div className="faq-answer-actions">
          <button type="button" onClick={() => void shareAnswer()}>
            <LinkIcon aria-hidden="true" />
            {copy.share}
          </button>
          {action ? (
            <Link href={href}>
              {action}
              <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        <span className="faq-share-feedback" role="status">
          {feedback === "copied"
            ? copy.copied
            : feedback === "failed"
              ? copy.copyFailed
              : null}
        </span>
        {feedback === "failed" ? (
          <a className="faq-direct-link" href={"#answer-" + id}>
            {copy.readAnswer}
          </a>
        ) : null}
      </div>
    </details>
  );
}
