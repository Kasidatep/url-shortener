import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getServerPreferences } from './preferences';
import MemoLinkMark from '@/components/MemoLinkMark';
export const coverFonts = Promise.all([
  readFile(
    join(process.cwd(), 'public/fonts/ibm-plex-sans-thai-thai-500.woff'),
  ),
  readFile(
    join(process.cwd(), 'public/fonts/ibm-plex-sans-thai-latin-500.woff'),
  ),
]);
export async function productCover(help = false) {
  const { locale } = await getServerPreferences();
  const thai = locale === 'th';
  const [thaiFont, latinFont] = await coverFonts;
  const first = help
    ? thai
      ? 'มีเรื่องสงสัย?'
      : 'A small question?'
    : thai
      ? 'ย่อลิงก์ให้สั้น'
      : 'A little link.';
  const second = help
    ? thai
      ? 'ค่อย ๆ คลายทีละข้อ'
      : 'Let’s untangle it.'
    : thai
      ? 'ส่งต่อให้ง่าย'
      : 'A lot to share.';
  const caption = help
    ? thai
      ? 'สร้าง แชร์ จัดการ — หาคำตอบได้ที่นี่'
      : 'Create, share, manage. Find your next step.'
    : thai
      ? 'ลิงก์สั้น · QR Code · ไม่ต้องสมัครบัญชี'
      : 'Short links · QR codes · No sign-up';
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#132838',
        color: '#fffdf6',
        padding: 60,
        fontFamily: 'MemoThai',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: -150,
          top: -100,
          width: 710,
          height: 710,
          borderRadius: 355,
          border: '1px solid #355063',
        }}
      />
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: -90,
          top: -40,
          width: 590,
          height: 590,
          borderRadius: 295,
          border: '1px solid #355063',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 720,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <MemoLinkMark />
          <span style={{ fontSize: 34 }}>MemoLink</span>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 2,
              color: '#b9cad6',
              marginLeft: 20,
            }}
          >
            {help ? 'THE LITTLE GUIDE' : 'A LITTLE LESS LINK'}
          </span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: thai ? 68 : 82,
              lineHeight: 1.25,
              letterSpacing: -2,
            }}
          >
            {first}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: thai ? 68 : 82,
              lineHeight: 1.3,
              letterSpacing: -2,
              color: '#def198',
            }}
          >
            {second}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 23,
              color: '#c2d0da',
              marginTop: 24,
              maxWidth: 630,
            }}
          >
            {caption}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            fontSize: 18,
            color: '#c2d0da',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: 4,
              background: '#def198',
            }}
          />
          l.memolab.me{help ? '/faq' : ''}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 30,
          top: 80,
          width: 435,
          height: 400,
        }}
      >
        <svg width="435" height="400" viewBox="0 0 435 400">
          <g
            transform="translate(58 8) rotate(-32 160 185)"
            fill="none"
            strokeWidth="46"
          >
            <rect
              x="18"
              y="52"
              width="204"
              height="152"
              rx="62"
              stroke="#071925"
              transform="translate(0 25)"
            />
            <rect
              x="152"
              y="170"
              width="204"
              height="152"
              rx="62"
              stroke="#071925"
              transform="translate(0 25)"
            />
            <rect
              x="18"
              y="52"
              width="204"
              height="152"
              rx="62"
              stroke="#2545ae"
              transform="translate(0 13)"
            />
            <rect
              x="152"
              y="170"
              width="204"
              height="152"
              rx="62"
              stroke="#809843"
              transform="translate(0 13)"
            />
            <rect
              x="18"
              y="52"
              width="204"
              height="152"
              rx="62"
              stroke="#6487ff"
            />
            <rect
              x="152"
              y="170"
              width="204"
              height="152"
              rx="62"
              stroke="#def198"
            />
            <path d="M222 110v32a62 62 0 0 1-62 62" stroke="#6487ff" />
            <path
              d="M82 57h70"
              stroke="#b7caff"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M213 175h79"
              stroke="#f4ffcc"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 45,
          bottom: 68,
          width: 370,
          height: 98,
          borderRadius: 18,
          background: '#fffdf6',
          color: '#172b3a',
          transform: 'rotate(-5deg)',
          boxShadow: '7px 10px 0 #071925',
          padding: 22,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', fontSize: 14, color: '#526373' }}>
          {thai
            ? 'จากลิงก์ยาว ๆ สู่คนถัดไป'
            : 'From a long address to the next person'}
        </div>
        <div style={{ display: 'flex', fontSize: 24 }}>
          l.memolab.me/hello{' '}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            style={{ marginLeft: 22 }}
          >
            <path
              d="M5 23 23 5M6 5h17v17"
              fill="none"
              stroke="#244bd8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'MemoThai', data: thaiFont, weight: 500 },
        { name: 'MemoThai', data: latinFont, weight: 500 },
      ],
    },
  );
}
