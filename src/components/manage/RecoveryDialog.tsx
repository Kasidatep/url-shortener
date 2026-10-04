"use client";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import ProductDialog from "../ProductDialog";
import { usePreferences } from "../PreferencesProvider";
import { useNotifications } from "../NotificationTray";
import { exportDeviceKey } from "@/lib/device";
import { manageMessages } from "@/config/manage-i18n";
import { dialogMessages } from "@/config/dialog-i18n";
import { getPageMessages } from "@/config/page-i18n";
export default function RecoveryDialog({
  open,
  onClose,
  onRestore,
}: {
  open: boolean;
  onClose: () => void;
  onRestore: (key: string) => Promise<boolean>;
}) {
  const { locale } = usePreferences();
  const copy = manageMessages[locale];
  const notices = dialogMessages[locale];
  const { notify } = useNotifications();
  const [mode, setMode] = useState<"backup" | "restore">("backup");
  const [key, setKey] = useState("");
  const [imported, setImported] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<"invalid" | "unavailable" | "load" | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!open) {
      setMode("backup");
      setVisible(false);
      setImported("");
      setError(null);
      setCopied(false);
      setKey("");
      return;
    }
    try {
      setKey(exportDeviceKey());
    } catch {
      setError("unavailable");
    }
  }, [open]);
  async function copyKey() {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      notify(notices.recoveryCopied, "success");
    } catch {
      notify(notices.actionFailed, "error");
    }
  }
  async function restore(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (!/^[A-Za-z0-9_-]{40,100}$/.test(imported.trim())) {
      setError("invalid");
      document.getElementById("recovery-import")?.focus();
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const restored = await onRestore(imported.trim());
      try {
        setKey(exportDeviceKey());
      } catch {
        setKey("");
      }
      if (restored) onClose();
      else setError("load");
    } finally {
      setBusy(false);
    }
  }
  return (
    <ProductDialog
      open={open}
      onClose={onClose}
      title={copy.recovery}
      id="manage-recovery-title"
      className="manage-recovery-dialog"
      busy={busy}
      descriptionId="recovery-description"
    >
      <div className="recovery-mode" role="group" aria-label={copy.recovery}>
        <button
          type="button"
          disabled={busy}
          aria-pressed={mode === "backup"}
          onClick={() => {
            setMode("backup");
            setVisible(false);
            setError(key ? null : "unavailable");
          }}
        >
          <KeyIcon aria-hidden="true" />
          {copy.backup}
        </button>
        <button
          type="button"
          disabled={busy}
          aria-pressed={mode === "restore"}
          onClick={() => {
            setMode("restore");
            setVisible(false);
            setError(null);
          }}
        >
          <ArrowDownTrayIcon aria-hidden="true" />
          {copy.restore}
        </button>
      </div>
      <div className="recovery-content">
        <div className="recovery-key-art" aria-hidden="true">
          <KeyIcon />
        </div>
        <h3>{mode === "backup" ? copy.backupTitle : copy.restoreTitle}</h3>
        <p id="recovery-description">
          {mode === "backup" ? copy.backupBody : copy.restoreBody}
        </p>
        {mode === "backup" ? (
          <>
            <label htmlFor="recovery-backup">{copy.keyLabel}</label>
            <div className="recovery-key-field">
              <input
                id="recovery-backup"
                type={visible ? "text" : "password"}
                readOnly
                autoComplete="off"
                value={key}
              />
              <button
                type="button"
                className="icon-control"
                aria-label={visible ? copy.hideKey : copy.showKey}
                aria-pressed={visible}
                onClick={() => setVisible((value) => !value)}
              >
                {visible ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            <button
              type="button"
              className="ui-button primary recovery-copy"
              disabled={!key}
              onClick={() => void copyKey()}
            >
              {copied ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <ClipboardDocumentIcon aria-hidden="true" />
              )}
              {copy.backup}
            </button>
          </>
        ) : (
          <form onSubmit={restore}>
            <label htmlFor="recovery-import">{copy.keyLabel}</label>
            <div className="recovery-key-field">
              <input
                id="recovery-import"
                type={visible ? "text" : "password"}
                autoComplete="off"
                spellCheck={false}
                value={imported}
                disabled={busy}
                onChange={(event) => {
                  setImported(event.target.value);
                  setError(null);
                }}
                aria-invalid={error === "invalid" ? true : undefined}
                aria-describedby={
                  error ? "recovery-error recovery-note" : "recovery-note"
                }
              />
              <button
                type="button"
                className="icon-control"
                disabled={busy}
                aria-label={visible ? copy.hideKey : copy.showKey}
                aria-pressed={visible}
                onClick={() => setVisible((value) => !value)}
              >
                {visible ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            <p id="recovery-note" className="recovery-note">
              {copy.restoreNote}
            </p>
            <button
              type="submit"
              className="ui-button primary recovery-copy"
              disabled={!imported.trim() || busy}
            >
              {busy ? copy.restoring : copy.restoreAction}
              <ArrowRightIcon aria-hidden="true" />
            </button>
          </form>
        )}
        {error ? (
          <p id="recovery-error" className="field-error" role="alert">
            {error === "invalid"
              ? copy.invalidKey
              : error === "load"
                ? getPageMessages(locale).retryBody
                : copy.keyUnavailable}
          </p>
        ) : null}
      </div>
    </ProductDialog>
  );
}
