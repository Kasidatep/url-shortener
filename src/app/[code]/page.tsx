"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import PreferenceControls from "@/components/PreferenceControls";
import MemoLinkLogo from "@/components/MemoLinkLogo";
import LinkTransitGraphic, {
  type TransitState,
} from "@/components/LinkTransitGraphic";
import { usePreferences } from "@/components/PreferencesProvider";
import { getPageMessages } from "@/config/page-i18n";
import { systemMessages } from "@/config/system-i18n";
import { redirectJourneyMessages } from "@/config/redirect-journey-i18n";

function getDestination(value: unknown) {
  if (typeof value !== "string") throw new Error("Missing destination");
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new Error("Unsupported destination");
  return url.href;
}

export default function ShortLinkPage() {
  const { code } = useParams<{ code: string }>();
  const { locale } = usePreferences();
  const text = getPageMessages(locale);
  const system = systemMessages[locale];
  const journey = redirectJourneyMessages[locale];
  const [state, setState] = useState<TransitState>("checking");
  const [destination, setDestination] = useState("");
  const [slow, setSlow] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const request = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const checkLink = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setState("checking");
    setDestination("");
    setMessage("");
    setSlow(false);
    try {
      const response = await fetch(
        "/api/shorten?code=" + encodeURIComponent(code),
        { cache: "no-store", signal: controller.signal },
      );
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (response.ok) {
        setDestination(getDestination(data.redirect));
        setState("opening");
      } else if (response.status === 401) setState("password");
      else if (response.status === 404) setState("missing");
      else if (response.status === 410) setState("expired");
      else setState("error");
    } catch {
      if (!controller.signal.aborted) setState("error");
    }
  }, [code]);
  useEffect(() => {
    void checkLink();
    return () => request.current?.abort();
  }, [checkLink]);
  useEffect(() => {
    if (state !== "checking" && !unlocking) return;
    const timer = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(timer);
  }, [state, unlocking]);
  useEffect(() => {
    if (state !== "opening" || !destination) return;
    // A short exit only: no loading-scene imports, fake progress or minimum wait.
    const timer = setTimeout(
      () => window.location.replace(destination),
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180,
    );
    return () => clearTimeout(timer);
  }, [state, destination]);
  useEffect(() => {
    if (state === "expired" || state === "missing" || state === "error")
      heading.current?.focus({ preventScroll: true });
  }, [state]);
  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    if (unlocking) return;
    setMessage("");
    setUnlocking(true);
    setSlow(false);
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, password }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (response.ok) {
        setDestination(getDestination(data.redirect));
        setState("opening");
        setPassword("");
      } else if (response.status === 410) setState("expired");
      else if (response.status === 404) setState("missing");
      else
        setMessage(
          response.status === 401 ? system.invalidPassword : text.retryBody,
        );
    } catch {
      if (!controller.signal.aborted) setMessage(text.retryBody);
    } finally {
      if (!controller.signal.aborted) setUnlocking(false);
    }
  }
  const busy = state === "checking" || state === "opening" || unlocking;
  const graphicState = unlocking ? "checking" : state;
  const title =
    state === "checking"
      ? journey.loading
      : state === "opening"
        ? journey.opening
        : state === "password"
          ? text.protectedTitle
          : state === "expired"
            ? text.unavailable
            : state === "missing"
              ? text.missing
              : text.retryTitle;
  const body =
    state === "checking"
      ? journey.body
      : state === "opening"
        ? journey.openingBody
        : state === "password"
          ? text.protectedBody
          : state === "expired"
            ? text.unavailableBody
            : state === "missing"
              ? text.missingBody
              : text.retryBody;
  return (
    <main className="redirect-page transit-page">
      <header className="redirect-nav">
        <MemoLinkLogo />
        <PreferenceControls />
      </header>
      <div className="redirect-shell">
        <section
          className={"redirect-card transit-card state-" + state}
          aria-busy={busy}
        >
          <div className="redirect-code">
            <span>{system.linkCode}</span>
            <code>/{code}</code>
          </div>
          <LinkTransitGraphic state={graphicState} />
          <div className="redirect-state" key={state}>
            <p className="state-kicker">
              {state === "password" ? system.secureLink : "MemoLink"}
            </p>
            <h1 ref={heading} tabIndex={-1}>
              {title}
            </h1>
            <p role="status">{body}</p>
            {state === "checking" || state === "opening" ? (
              <>
                <ol className="transit-steps" aria-label="MemoLink">
                  <li data-active={state === "checking"}>
                    <span aria-hidden="true">
                      {state === "opening" ? <CheckIcon /> : "1"}
                    </span>
                    {journey.request}
                  </li>
                  <li data-active={state === "opening"}>
                    <span aria-hidden="true">2</span>
                    {journey.destination}
                  </li>
                </ol>
                {state === "opening" ? (
                  <a className="transit-manual" href={destination}>
                    {journey.manual}
                    <ArrowUpRightIcon aria-hidden="true" />
                  </a>
                ) : null}
              </>
            ) : null}
            {state === "password" ? (
              <form onSubmit={unlock}>
                <label htmlFor="link-password">{text.password}</label>
                <div className="password-field">
                  <input
                    id="link-password"
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    required
                    autoComplete="current-password"
                    value={password}
                    disabled={unlocking}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={message ? true : undefined}
                    aria-describedby={
                      message ? "password-error password-note" : "password-note"
                    }
                  />
                  <button
                    type="button"
                    className="password-visibility"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? system.hidePassword : system.showPassword
                    }
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
                {message ? (
                  <p id="password-error" className="form-error" role="alert">
                    {message}
                  </p>
                ) : null}
                <button className="primary-button" disabled={unlocking}>
                  {unlocking ? system.verifying : text.continue + " →"}
                </button>
                <p className="password-note" id="password-note">
                  <LockClosedIcon aria-hidden="true" />
                  {system.passwordHint}
                </p>
              </form>
            ) : null}
            {state === "expired" || state === "missing" ? (
              <div className="state-actions">
                <Link href="/" className="primary-link">
                  {state === "expired" ? system.createNew : system.goHome}
                </Link>
                <Link
                  href={
                    state === "expired"
                      ? "/faq#answer-basics-13"
                      : "/faq#answer-slow-link"
                  }
                  className="secondary-link"
                >
                  {text.navFaq}
                </Link>
              </div>
            ) : null}
            {state === "error" ? (
              <div className="state-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => void checkLink()}
                >
                  {text.retry}
                </button>
                <Link href="/faq#answer-slow-link" className="secondary-link">
                  {text.navFaq}
                </Link>
              </div>
            ) : null}
            {slow && (state === "checking" || unlocking) ? (
              <p className="transit-slow" role="status">
                {journey.slow}
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
