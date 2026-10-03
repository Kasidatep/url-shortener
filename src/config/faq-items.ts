import type { Locale } from "./i18n";
import { getPageMessages } from "./page-i18n";
import { extraFaqSections } from "./faq-extra-i18n";
import { moreFaqSections } from "./faq-more-i18n";
import { getPracticalFaq } from "./faq-practical-i18n";

const introduction: Record<Locale, [string, string]> = {
  en: [
    "What is MemoLink?",
    "MemoLink is a free URL shortener and QR code tool from MemoLab. Paste a web address, choose optional settings and share the shorter link. You can manage it later using a private recovery key, without creating an account.",
  ],
  th: [
    "MemoLink คืออะไร?",
    "MemoLink คือเครื่องมือย่อลิงก์และสร้าง QR Code ฟรีจาก MemoLab วางที่อยู่เว็บไซต์ เลือกการตั้งค่าที่ต้องการ แล้วแชร์ลิงก์สั้นได้เลย กลับมาจัดการภายหลังด้วยคีย์กู้คืนส่วนตัวได้โดยไม่ต้องสมัครบัญชี",
  ],
  zh: [
    "MemoLink是什么？",
    "MemoLink是MemoLab的免费短链接和二维码工具。粘贴网页地址，按需设置后即可分享，无需账户，使用私人恢复密钥管理。",
  ],
  ja: [
    "MemoLinkとは？",
    "MemoLinkはMemoLabの無料URL短縮・QRコードツールです。Webアドレスを貼り付け、必要な設定を選んで共有できます。登録は不要で、復旧キーで管理します。",
  ],
  ko: [
    "MemoLink는 무엇인가요?",
    "MemoLink는 MemoLab의 무료 URL 단축 및 QR 코드 도구예요. 웹 주소를 붙여넣고 필요한 설정을 선택해 공유하세요. 가입 없이 개인 복구 키로 관리할 수 있어요.",
  ],
  es: [
    "¿Qué es MemoLink?",
    "MemoLink es un acortador de URL y generador de QR gratuito de MemoLab. Pega una dirección web, elige los ajustes y comparte. Gestiona tus enlaces con una clave privada, sin crear una cuenta.",
  ],
};

export function getFaqEntries(locale: Locale) {
  const base = getPageMessages(locale).faqSections;
  const [question, answer] = introduction[locale];
  const existing = [
    { question, answer, category: 1 },
    ...base.flatMap(([, items], i) =>
      items.map(([question, answer], j) => ({
        question,
        answer,
        category: i === 0 ? 1 : i === 1 ? 5 : j === 2 ? 3 : 2,
      })),
    ),
    ...extraFaqSections[locale].flatMap(([, items], i) =>
      items.map(([question, answer]) => ({
        question,
        answer,
        category: i === 0 ? 4 : 5,
      })),
    ),
    ...moreFaqSections[locale].flatMap(([, items], i) =>
      items.map(([question, answer]) => ({
        question,
        answer,
        category: i === 0 ? 5 : 4,
      })),
    ),
  ];
  return [
    ...existing.map((item, index) => ({ ...item, id: `basics-${index}` })),
    ...getPracticalFaq(locale),
  ];
}
