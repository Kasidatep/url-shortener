import { ImageResponse } from 'next/og';
export const alt = 'MemoLink — Big ideas. Short links. Free URL shortener and QR codes.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', background: '#f7f7f0', color: '#23382a', padding: 65, flexDirection: 'column' }}>
    <div style={{ display: 'flex', fontSize: 28, fontWeight: 700 }}>↗ MemoLink</div>
    <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, letterSpacing: -5, lineHeight: 1.05, marginTop: 65 }}><span>Big ideas.</span><span style={{ color: '#355943' }}>Short links.</span></div>
    <div style={{ display: 'flex', marginTop: 38, fontSize: 22, color: '#62695e' }}>Free URL shortener. QR codes. No sign-up.</div>
    <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', right: 70, top: 230, width: 370, padding: 32, borderRadius: 20, background: '#d8f093', transform: 'rotate(-7deg)' }}><span style={{ fontSize: 17 }}>SOMETHING WORTH SHARING</span><span style={{ fontSize: 42, marginTop: 28, letterSpacing: -2 }}>/your-next-idea</span><span style={{ fontSize: 22, marginTop: 34 }}>MemoLink ↗</span></div>
  </div>, size);
}
