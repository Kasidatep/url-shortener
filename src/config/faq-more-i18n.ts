import type { Locale } from '@/config/i18n';

type FaqSection=[string,Array<[string,string]>];

export const moreFaqSections:Record<Locale,FaqSection[]>={
  en:[
    ['Privacy and security',[
      ['Does MemoLink read the destination page?','No. MemoLink validates the address and blocks local or private-network destinations, but it does not crawl or copy the destination page content.'],
      ['Can a link owner identify individual visitors?','No. The dashboard shows aggregate counts by date, country, device category and referrer. Raw IP addresses and visitor profiles are not stored.'],
      ['How should I store my recovery key?','Keep one private copy in a trusted password manager or encrypted backup. Never place it inside the short link or send it to people who only need to visit the link.'],
    ]],
    ['Previews and social sharing',[
      ['Which apps can show a MemoLink preview?','Apps that support Open Graph can show it, including LINE, WhatsApp, Facebook, X, LinkedIn, Telegram and many messaging tools.'],
      ['Why does an old preview sometimes remain visible?','Sharing platforms cache link previews. The short link still works immediately, but a platform may take time to refresh its saved title or image.'],
      ['Does a protected link reveal its destination in the preview?','No. Short-link metadata and images use a generic MemoLink description and never expose the private destination or password.'],
    ]],
  ],
  th:[
    ['ความเป็นส่วนตัวและความปลอดภัย',[
      ['MemoLink อ่านเนื้อหาของเว็บไซต์ปลายทางหรือไม่?','ไม่อ่าน ระบบตรวจสอบเฉพาะรูปแบบที่อยู่และป้องกันปลายทางในเครือข่ายภายใน โดยไม่รวบรวมหรือคัดลอกเนื้อหาจากเว็บไซต์ปลายทาง'],
      ['เจ้าของลิงก์สามารถระบุตัวผู้เข้าชมแต่ละคนได้หรือไม่?','ไม่ได้ หน้าสถิติแสดงข้อมูลรวมตามวัน ประเทศ ประเภทอุปกรณ์ และแหล่งอ้างอิง โดยไม่จัดเก็บ IP ดิบหรือสร้างโปรไฟล์ผู้เข้าชม'],
      ['ควรเก็บคีย์กู้คืนอย่างไรให้ปลอดภัย?','เก็บสำเนาส่วนตัวไว้ในโปรแกรมจัดการรหัสผ่านหรือพื้นที่สำรองที่เข้ารหัส และไม่ควรใส่คีย์ไว้ในลิงก์หรือส่งให้ผู้ที่ต้องการเพียงเปิดลิงก์'],
    ]],
    ['ตัวอย่างลิงก์และการแชร์',[
      ['แอปใดรองรับตัวอย่างลิงก์ MemoLink?','แอปที่รองรับ Open Graph สามารถแสดงตัวอย่างได้ เช่น LINE, WhatsApp, Facebook, X, LinkedIn, Telegram และแอปสนทนาอื่น ๆ'],
      ['ทำไมบางครั้งยังเห็นตัวอย่างลิงก์เวอร์ชันเดิม?','แพลตฟอร์มแชร์มักบันทึกตัวอย่างไว้ในแคช ลิงก์จะเริ่มใช้งานทันที แต่ชื่อหรือภาพอาจใช้เวลาสักระยะก่อนที่แพลตฟอร์มจะอัปเดต'],
      ['ลิงก์ที่มีรหัสผ่านจะเปิดเผยปลายทางในตัวอย่างหรือไม่?','ไม่เปิดเผย Metadata และภาพตัวอย่างใช้ข้อความกลางของ MemoLink โดยไม่แสดงปลายทางส่วนตัวหรือรหัสผ่าน'],
    ]],
  ],
  zh:[
    ['隐私与安全',[
      ['MemoLink 会读取目标页面内容吗？','不会。系统只验证地址并阻止本地或私有网络目标，不会抓取或复制目标页面内容。'],
      ['链接所有者能识别单个访客吗？','不能。控制面板只显示按日期、国家、设备类别和来源汇总的数据，不保存原始 IP 或访客档案。'],
      ['如何安全保存恢复密钥？','请在可信的密码管理器或加密备份中保存私人副本，不要把密钥放入短链接，也不要发送给只需访问链接的人。'],
    ]],
    ['预览与社交分享',[
      ['哪些应用可以显示 MemoLink 预览？','支持 Open Graph 的应用均可显示，包括 LINE、WhatsApp、Facebook、X、LinkedIn、Telegram 等。'],
      ['为什么有时仍显示旧预览？','分享平台会缓存链接预览。短链接会立即生效，但平台刷新已保存的标题或图片可能需要一些时间。'],
      ['受保护链接会在预览中暴露目标地址吗？','不会。短链接元数据和图片使用通用 MemoLink 描述，不会暴露私有目标地址或密码。'],
    ]],
  ],
  ja:[
    ['プライバシーと安全性',[
      ['MemoLinkはリンク先ページを読み取りますか？','いいえ。アドレスを検証し、ローカル・プライベートネットワークを遮断しますが、リンク先の内容を収集・複製しません。'],
      ['リンク所有者は個々の訪問者を特定できますか？','できません。日付、国、端末カテゴリ、参照元の集計のみを表示し、生のIPアドレスや訪問者プロフィールは保存しません。'],
      ['復旧キーはどのように保管すべきですか？','信頼できるパスワード管理ツールまたは暗号化バックアップに個人用コピーを保管し、短縮リンク内や閲覧者へのメッセージには含めないでください。'],
    ]],
    ['プレビューと共有',[
      ['どのアプリでMemoLinkのプレビューを表示できますか？','Open Graph対応アプリで表示できます。LINE、WhatsApp、Facebook、X、LinkedIn、Telegramなどが含まれます。'],
      ['古いプレビューが残るのはなぜですか？','共有プラットフォームがプレビューをキャッシュするためです。リンクはすぐに動作しますが、保存済みのタイトルや画像の更新には時間がかかる場合があります。'],
      ['保護リンクのプレビューにリンク先が表示されますか？','表示されません。一般的なMemoLinkの説明を使用し、非公開のリンク先やパスワードは公開しません。'],
    ]],
  ],
  ko:[
    ['개인정보 및 보안',[
      ['MemoLink가 목적지 페이지를 읽나요?','아니요. 주소를 검증하고 로컬 또는 사설 네트워크 목적지를 차단하지만 페이지 내용을 수집하거나 복사하지 않습니다.'],
      ['링크 소유자가 개별 방문자를 식별할 수 있나요?','아니요. 날짜, 국가, 기기 범주, 유입 경로별 집계만 표시하며 원본 IP나 방문자 프로필을 저장하지 않습니다.'],
      ['복구 키는 어떻게 안전하게 보관하나요?','신뢰할 수 있는 비밀번호 관리자나 암호화 백업에 개인용 사본을 보관하고, 단축 링크에 넣거나 방문자에게 보내지 마세요.'],
    ]],
    ['미리보기 및 소셜 공유',[
      ['어떤 앱에서 MemoLink 미리보기를 볼 수 있나요?','Open Graph를 지원하는 LINE, WhatsApp, Facebook, X, LinkedIn, Telegram 등의 앱에서 표시할 수 있습니다.'],
      ['이전 미리보기가 남는 이유는 무엇인가요?','공유 플랫폼이 링크 미리보기를 캐시하기 때문입니다. 링크는 즉시 작동하지만 저장된 제목이나 이미지 갱신에는 시간이 걸릴 수 있습니다.'],
      ['보호된 링크의 미리보기에 목적지가 노출되나요?','아니요. 일반 MemoLink 설명과 이미지를 사용하며 비공개 목적지나 비밀번호를 노출하지 않습니다.'],
    ]],
  ],
  es:[
    ['Privacidad y seguridad',[
      ['¿MemoLink lee la página de destino?','No. Valida la dirección y bloquea destinos locales o de redes privadas, pero no rastrea ni copia el contenido de la página.'],
      ['¿El propietario puede identificar a cada visitante?','No. El panel muestra datos agregados por fecha, país, tipo de dispositivo y referencia. No guarda direcciones IP sin procesar ni perfiles personales.'],
      ['¿Cómo debo guardar mi clave de recuperación?','Guarda una copia privada en un gestor de contraseñas o respaldo cifrado. No la incluyas en el enlace ni la envíes a quien solo necesita visitarlo.'],
    ]],
    ['Vistas previas y redes sociales',[
      ['¿Qué aplicaciones muestran la vista previa de MemoLink?','Las aplicaciones compatibles con Open Graph, como LINE, WhatsApp, Facebook, X, LinkedIn, Telegram y muchas herramientas de mensajería.'],
      ['¿Por qué a veces aparece una vista previa antigua?','Las plataformas almacenan las vistas previas en caché. El enlace funciona de inmediato, pero el título o la imagen pueden tardar en actualizarse.'],
      ['¿Un enlace protegido revela su destino en la vista previa?','No. Los metadatos y la imagen usan una descripción genérica de MemoLink y nunca muestran el destino privado ni la contraseña.'],
    ]],
  ],
};
