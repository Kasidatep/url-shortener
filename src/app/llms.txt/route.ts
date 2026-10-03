import { env } from '@/config/env';

export function GET() {
  const base = env.app.url.replace(/\/$/, '');
  const text = `# MemoLink

> A URL shortener and QR code tool from MemoLab. Create links without an account.

MemoLink supports custom short names, optional passwords, expiration dates, click limits, UTM parameters and aggregate visit analytics. Link management is authorized by a private recovery key stored in the creating browser. Save that key before changing browsers or clearing browser storage. Anyone with the key can manage its links.

## Public pages
- [Create a short link](${base}/): Paste a public HTTP or HTTPS URL and choose optional settings.
- [Help and frequently asked questions](${base}/faq): Creating, sharing, access controls, recovery and analytics.
- [Privacy policy](https://memolab.me/privacy)
- [Terms](https://memolab.me/terms)

## ภาษาไทย
MemoLink เป็นเครื่องมือย่อลิงก์และสร้าง QR Code ฟรีจาก MemoLab ไม่ต้องสมัครบัญชี ตั้งชื่อลิงก์ เพิ่มรหัสผ่าน กำหนดวันหมดอายุ และดูสถิติการเข้าชมแบบรวมได้ เก็บคีย์กู้คืนเป็นความลับเพื่อย้ายสิทธิ์จัดการไปยังอุปกรณ์ใหม่

## Sharing previews
Public, active links may fetch the destination title and social image for a sharing preview. Protected and expired links use generic previews. Sharing platforms can cache older previews.

## Scope
My links is a private management interface, not a public directory. Individual short-link destinations and analytics are not part of this product reference. A password protects access through a short link; it does not secure the destination website itself.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
