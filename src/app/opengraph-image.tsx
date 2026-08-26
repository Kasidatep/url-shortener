import { ImageResponse } from 'next/og';

export const alt = 'Kasidate Short — links under your control';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, color: 'white', background: 'radial-gradient(circle at 80% 10%, #5146a8, transparent 38%), #070b14' }}>
      <div style={{ display: 'flex', fontSize: 24, color: '#a99dff', letterSpacing: 4 }}>KASIDATE SHORT</div>
      <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 28, maxWidth: 920 }}>Short links that stay under your control.</div>
      <div style={{ display: 'flex', fontSize: 26, color: '#9aa5bd', marginTop: 32 }}>QR codes · Passwords · Expiration · Device ownership</div>
    </div>,
    size,
  );
}
