import type { Locale } from "./i18n";
type Scenario = {
  label: string;
  title: string;
  body: string;
  tags: [string, string];
  answer: string;
  action: string;
};
type HelpJourney = {
  eyebrow: string;
  intro: string;
  title: string;
  body: string;
  demo: string;
  popular: string;
  answers: string;
  share: string;
  copied: string;
  copyFailed: string;
  readAnswer: string;
  categories: string[];
  scenarios: Scenario[];
};
export const helpJourneyMessages: Record<Locale, HelpJourney> = {
  th: {
    eyebrow: "คู่มือ MemoLink",
    intro: "ตั้งแต่ลิงก์แรก ไปจนถึง QR ที่ใช้ต่อได้อีกนาน",
    title: "คำตอบดี ๆ",
    body: "ทำให้ไปต่อได้ง่ายขึ้น",
    demo: "ลองเลือกเรื่องที่คุณกำลังทำ",
    popular: "เรื่องที่ถามกันบ่อย",
    answers: "คำตอบทั้งหมด",
    share: "คัดลอกลิงก์คำตอบ",
    copied: "คัดลอกลิงก์คำตอบแล้ว",
    copyFailed: "คัดลอกไม่สำเร็จ เปิดลิงก์คำตอบแล้วคัดลอกที่อยู่ได้เลย",
    readAnswer: "อ่านคำตอบนี้",
    categories: [
      "ทั้งหมด",
      "สร้างลิงก์",
      "จัดการ",
      "สถิติ",
      "แชร์และ QR",
      "ความปลอดภัย",
    ],
    scenarios: [
      {
        label: "QR บนโปสเตอร์",
        title: "พิมพ์ครั้งเดียว เปลี่ยนปลายทางได้",
        body: "เมนูใหม่ ตารางงานใหม่ ใช้ QR เดิมได้ เพียงแก้ปลายทางในลิงก์ของฉัน",
        tags: ["QR เดิม", "ปลายทางใหม่"],
        answer: "print-qr",
        action: "เช็กก่อนพิมพ์",
      },
      {
        label: "ส่งให้คนที่เลือก",
        title: "ลิงก์พร้อม รหัสผ่านค่อยตามไป",
        body: "เพิ่มรหัสผ่านให้ลิงก์ และส่งรหัสผ่านอีกช่องทาง เมื่ออยากจำกัดคนเข้าถึง",
        tags: ["มีรหัสผ่าน", "ส่งแยกช่องทาง"],
        answer: "send-password",
        action: "แชร์อย่างไรดี",
      },
      {
        label: "ดูผลแต่ละช่องทาง",
        title: "เรื่องเดียว หลายทางไปถึง",
        body: "แยกลิงก์สำหรับอีเมล โปสเตอร์ และโซเชียล เพื่อดูว่าแต่ละทางมีคนเปิดเท่าไร",
        tags: ["แยกลิงก์", "เทียบยอดเปิด"],
        answer: "compare-campaigns",
        action: "เริ่มเทียบผล",
      },
    ],
  },
  en: {
    eyebrow: "The MemoLink field guide",
    intro: "From your first link to the QR you keep using.",
    title: "A little clarity.",
    body: "An easier next step.",
    demo: "Pick what you are working on",
    popular: "Often asked",
    answers: "All answers",
    share: "Copy answer link",
    copied: "Answer link copied",
    copyFailed: "Could not copy. Open the answer link and copy its address.",
    readAnswer: "Read this answer",
    categories: [
      "All",
      "Create",
      "Manage",
      "Analytics",
      "Sharing & QR",
      "Safety",
    ],
    scenarios: [
      {
        label: "QR on a poster",
        title: "Print once. Keep the story current.",
        body: "A new menu or schedule can use the same QR. Just update the destination in My links.",
        tags: ["Same QR", "New destination"],
        answer: "print-qr",
        action: "Before you print",
      },
      {
        label: "A private invitation",
        title: "Send the link. Share the password separately.",
        body: "Add a password and send it through another channel when access needs to be limited.",
        tags: ["Password", "Separate channel"],
        answer: "send-password",
        action: "Plan your sharing",
      },
      {
        label: "Compare your channels",
        title: "One story. Several ways to get there.",
        body: "Use separate links for email, posters and social posts to compare their opening counts.",
        tags: ["Separate links", "Compare openings"],
        answer: "compare-campaigns",
        action: "See how to compare",
      },
    ],
  },
  zh: {
    eyebrow: "MemoLink 使用指南",
    intro: "从第一个链接，到持续使用的二维码。",
    title: "找到答案。",
    body: "轻松迈出下一步。",
    demo: "选择你正在做的事情",
    popular: "常见问题",
    answers: "全部答案",
    share: "复制答案链接",
    copied: "答案链接已复制",
    copyFailed: "复制失败。请打开答案链接并复制地址。",
    readAnswer: "阅读此答案",
    categories: ["全部", "创建", "管理", "统计", "分享与 QR", "安全"],
    scenarios: [
      {
        label: "海报上的 QR",
        title: "打印一次，随时更新目标。",
        body: "新菜单或新日程仍可使用原 QR，只需在“我的链接”修改目标。",
        tags: ["原 QR", "新目标"],
        answer: "print-qr",
        action: "打印前检查",
      },
      {
        label: "私人邀请",
        title: "发送链接，另行分享密码。",
        body: "需要限制访问时添加密码，并通过另一渠道发送。",
        tags: ["密码保护", "另行发送"],
        answer: "send-password",
        action: "规划分享",
      },
      {
        label: "比较渠道",
        title: "同一个故事，多种到达方式。",
        body: "为邮件、海报和社交帖子分别使用链接，比较打开次数。",
        tags: ["单独链接", "比较打开量"],
        answer: "compare-campaigns",
        action: "了解比较方法",
      },
    ],
  },
  ja: {
    eyebrow: "MemoLink の使い方",
    intro: "最初のリンクから、長く使えるQRコードまで。",
    title: "疑問を解いて。",
    body: "次の一歩を、軽やかに。",
    demo: "今やりたいことを選びましょう",
    popular: "よくある質問",
    answers: "すべての回答",
    share: "回答リンクをコピー",
    copied: "回答リンクをコピーしました",
    copyFailed:
      "コピーできませんでした。回答リンクを開いてURLをコピーしてください。",
    readAnswer: "この回答を読む",
    categories: ["すべて", "作成", "管理", "分析", "共有・QR", "安全性"],
    scenarios: [
      {
        label: "ポスターの QR",
        title: "一度印刷して、リンク先を更新。",
        body: "新しいメニューや予定表も同じQRで。「マイリンク」でリンク先を変更します。",
        tags: ["同じ QR", "新しいリンク先"],
        answer: "print-qr",
        action: "印刷前の確認",
      },
      {
        label: "個別の招待",
        title: "リンクとパスワードは別の経路で。",
        body: "アクセスを限定したいときはパスワードを設定し、別の方法で送ります。",
        tags: ["パスワード", "別の経路"],
        answer: "send-password",
        action: "共有方法を見る",
      },
      {
        label: "共有先を比較",
        title: "一つの話を、いろいろな入口から。",
        body: "メール、ポスター、SNSに別々のリンクを使い、開かれた回数を比較します。",
        tags: ["別々のリンク", "回数を比較"],
        answer: "compare-campaigns",
        action: "比較の始め方",
      },
    ],
  },
  ko: {
    eyebrow: "MemoLink 사용 안내",
    intro: "첫 링크부터 오래 쓰는 QR 코드까지.",
    title: "궁금증을 풀고.",
    body: "다음 단계는 가볍게.",
    demo: "지금 하고 싶은 일을 골라 보세요",
    popular: "자주 묻는 질문",
    answers: "모든 답변",
    share: "답변 링크 복사",
    copied: "답변 링크를 복사했어요",
    copyFailed: "복사하지 못했어요. 답변 링크를 열고 주소를 복사하세요.",
    readAnswer: "이 답변 읽기",
    categories: ["전체", "만들기", "관리", "통계", "공유 및 QR", "보안"],
    scenarios: [
      {
        label: "포스터의 QR",
        title: "한 번 인쇄하고 목적지는 새롭게.",
        body: "새 메뉴나 일정도 같은 QR로 안내해요. 내 링크에서 목적지만 바꾸세요.",
        tags: ["같은 QR", "새 목적지"],
        answer: "print-qr",
        action: "인쇄 전 확인",
      },
      {
        label: "개인 초대",
        title: "링크를 보내고, 비밀번호는 따로.",
        body: "접근을 제한하고 싶다면 비밀번호를 설정하고 다른 경로로 보내세요.",
        tags: ["비밀번호", "다른 경로"],
        answer: "send-password",
        action: "공유 방법 보기",
      },
      {
        label: "채널별 비교",
        title: "하나의 이야기, 여러 개의 입구.",
        body: "이메일, 포스터, 소셜마다 별도 링크로 열린 횟수를 비교해 보세요.",
        tags: ["별도 링크", "열기 횟수 비교"],
        answer: "compare-campaigns",
        action: "비교 시작하기",
      },
    ],
  },
  es: {
    eyebrow: "La guía de MemoLink",
    intro: "Desde tu primer enlace hasta el QR que sigues usando.",
    title: "Un poco de claridad.",
    body: "Un siguiente paso más fácil.",
    demo: "Elige lo que estás haciendo",
    popular: "Preguntas frecuentes",
    answers: "Todas las respuestas",
    share: "Copiar enlace a la respuesta",
    copied: "Enlace copiado",
    copyFailed: "No se pudo copiar. Abre la respuesta y copia su dirección.",
    readAnswer: "Leer esta respuesta",
    categories: [
      "Todo",
      "Crear",
      "Gestionar",
      "Estadísticas",
      "Compartir y QR",
      "Seguridad",
    ],
    scenarios: [
      {
        label: "QR en un cartel",
        title: "Imprime una vez. Actualiza el destino.",
        body: "Un menú o agenda nuevos pueden usar el mismo QR. Cambia el destino en Mis enlaces.",
        tags: ["Mismo QR", "Nuevo destino"],
        answer: "print-qr",
        action: "Antes de imprimir",
      },
      {
        label: "Una invitación privada",
        title: "Envía el enlace. La contraseña, por separado.",
        body: "Añade una contraseña y compártela por otro canal si necesitas limitar el acceso.",
        tags: ["Contraseña", "Otro canal"],
        answer: "send-password",
        action: "Cómo compartir",
      },
      {
        label: "Compara canales",
        title: "Una historia. Varias formas de llegar.",
        body: "Usa enlaces distintos para correo, carteles y redes y compara sus aperturas.",
        tags: ["Enlaces distintos", "Compara aperturas"],
        answer: "compare-campaigns",
        action: "Cómo comparar",
      },
    ],
  },
};
