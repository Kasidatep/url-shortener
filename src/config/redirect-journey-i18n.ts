import type { Locale } from "./i18n";
type Copy = {
  loading: string;
  opening: string;
  body: string;
  openingBody: string;
  request: string;
  destination: string;
  slow: string;
  manual: string;
  loadingApp: string;
};
export const redirectJourneyMessages: Record<Locale, Copy> = {
  th: {
    loading: "อีกนิด ก็ถึงปลายทาง",
    opening: "ไปต่อกันเลย",
    body: "กำลังเปิดลิงก์ที่คุณได้รับ",
    openingBody: "พบปลายทางแล้ว กำลังพาคุณไป",
    request: "เปิดลิงก์",
    destination: "ไปปลายทาง",
    slow: "ใช้เวลานานกว่าปกติ ลองตรวจสอบการเชื่อมต่ออินเทอร์เน็ต",
    manual: "เปิดปลายทางด้วยตัวเอง",
    loadingApp: "กำลังเปิด MemoLink",
  },
  en: {
    loading: "A small link. The next stop.",
    opening: "Here we go.",
    body: "Opening the link you received.",
    openingBody: "Destination found. Taking you there.",
    request: "Open link",
    destination: "Destination",
    slow: "This is taking longer than usual. Check your internet connection.",
    manual: "Open destination",
    loadingApp: "Opening MemoLink",
  },
  zh: {
    loading: "短链接，下一站。",
    opening: "出发吧。",
    body: "正在打开你收到的链接。",
    openingBody: "已找到目标，正在前往。",
    request: "打开链接",
    destination: "目标网站",
    slow: "比平时慢一些，请检查网络连接。",
    manual: "手动打开目标",
    loadingApp: "正在打开 MemoLink",
  },
  ja: {
    loading: "短いリンク、その先へ。",
    opening: "さあ、次へ。",
    body: "受け取ったリンクを開いています。",
    openingBody: "リンク先が見つかりました。移動します。",
    request: "リンクを開く",
    destination: "リンク先へ",
    slow: "いつもより時間がかかっています。接続を確認してください。",
    manual: "リンク先を開く",
    loadingApp: "MemoLink を開いています",
  },
  ko: {
    loading: "짧은 링크, 다음 목적지.",
    opening: "이제 출발해요.",
    body: "받은 링크를 열고 있어요.",
    openingBody: "목적지를 찾았어요. 이동할게요.",
    request: "링크 열기",
    destination: "목적지",
    slow: "평소보다 오래 걸려요. 인터넷 연결을 확인하세요.",
    manual: "목적지 직접 열기",
    loadingApp: "MemoLink 여는 중",
  },
  es: {
    loading: "Un pequeño enlace. La próxima parada.",
    opening: "Vamos allá.",
    body: "Abriendo el enlace que recibiste.",
    openingBody: "Destino encontrado. Te llevamos allí.",
    request: "Abrir enlace",
    destination: "Destino",
    slow: "Está tardando más de lo habitual. Comprueba tu conexión.",
    manual: "Abrir destino",
    loadingApp: "Abriendo MemoLink",
  },
};
