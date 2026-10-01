'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { usePreferences } from './PreferencesProvider';
import { useNotifications } from './NotificationTray';
import { createMessages } from '@/config/create-i18n';

export default function QRCodeComponent({ shortUrl }: { shortUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { locale } = usePreferences();
  const { notify } = useNotifications();
  const copy = createMessages[locale];
  function download() {
    try {
      if (!canvasRef.current) throw new Error('QR unavailable');
      const anchor = document.createElement('a');
      anchor.href = canvasRef.current.toDataURL('image/png');
      anchor.download = 'memolink-qr.png';
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
    } catch { notify(copy.qrFailed, 'error'); }
  }
  return <div className="qr-download-panel">
    <QRCodeCanvas value={shortUrl} size={220} level="H" marginSize={4} ref={canvasRef} title={copy.qrHint}/>
    <p>{copy.qrHint}</p>
    <button type="button" onClick={download}><ArrowDownTrayIcon aria-hidden="true"/>{copy.qrDownload}</button>
  </div>;
}
