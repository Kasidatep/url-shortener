import { env } from '@/config/env';

export function GET() {
  const origin = env.app.url.replace(/\/$/, '');
  const text = `# MemoLink

> A free URL shortener for creating and sharing short links without an account.

MemoLink supports custom link names, downloadable QR codes, optional passwords, date-based expiration and click limits. Campaign tools can remove existing tracking parameters and add UTM parameters.

## Public pages
- [Create a short link](${origin}/): URL shortener, product overview and common questions.
- [Help centre](${origin}/faq): Usage, link management and recovery guidance.

## Link management
Management access is tied to a private key stored in the browser. Users should save their recovery key from My links before changing devices, changing browsers or clearing site data. Importing the key restores management access. Keep recovery keys private.

## ภาษาไทย
MemoLink คือเครื่องมือย่อลิงก์ฟรี พร้อมสร้าง QR Code ตั้งชื่อลิงก์ เพิ่มรหัสผ่าน และกำหนดวันหมดอายุหรือจำนวนคลิก โดยไม่ต้องสมัครบัญชี ควรสำรอง Recovery key ก่อนเปลี่ยนอุปกรณ์หรือล้างข้อมูลเว็บไซต์
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
