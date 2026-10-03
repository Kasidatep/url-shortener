import { env } from "@/config/env";

export function GET() {
  const base = env.app.url.replace(/\/$/, "");
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

## Creating and using links
Paste a destination, choose only the settings you need, then copy the short link or save its QR code. The optional introduction can be dismissed and reopened. Update a destination from My links without changing the short address or its QR code.

## Practical answers
- [Change a destination](${base}/faq#answer-edit-destination): The same short link and QR code continue to work after updating a destination.
- [Before printing a QR code](${base}/faq#answer-print-qr): Test the final artwork on a phone, leave a clear border and check access and expiry settings.
- [Clicks and unique visitors](${base}/faq#answer-visits-not-people): Clicks count openings, not distinct people. One person can open a link more than once.
- [Browser data and recovery](${base}/faq#answer-browser-data): Clearing browser storage may remove management access. Save the original recovery key first.
- [Choose an expiry rule](${base}/faq#answer-choose-expiry): A link uses one expiry rule: none, a date and time, or a click limit.
- [A link is slow to open](${base}/faq#answer-slow-link): Check the connection or try a regular browser. Retry after an error is reported.

## Sharing previews
Public, active links may fetch the destination title and social image for a sharing preview. Protected and expired links use generic previews. Sharing platforms can cache older previews.

## Scope
My links is a private management interface, not a public directory. Individual short-link destinations and analytics are not part of this product reference. A password protects access through a short link; it does not secure the destination website itself.
`;
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
