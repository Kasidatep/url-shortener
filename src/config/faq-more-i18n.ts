import type { Locale } from '@/config/i18n';

type FaqSection=[string,Array<[string,string]>];

export const moreFaqSections:Record<Locale,FaqSection[]>={
  en:[
    ['Privacy and security',[
      ['Does MemoLink read the destination page?','For public, active links, MemoLink may read the page title and social image to build a sharing preview. Password-protected and expired links use a generic preview. The preview fetcher blocks local and private-network addresses.'],
      ['Can a link owner identify individual visitors?','No. The dashboard shows aggregate counts by date, country, device category and referrer. Raw IP addresses and visitor profiles are not stored.'],
      ['How should I store my recovery key?','Keep one private copy in a trusted password manager or encrypted backup. Never place it inside the short link or send it to people who only need to visit the link.'],
    ]],
    ['Previews and social sharing',[
      ['Which apps can show a MemoLink preview?','Apps that support Open Graph can show it, including LINE, WhatsApp, Facebook, X, LinkedIn, Telegram and many messaging tools.'],
      ['Why does an old preview sometimes remain visible?','Sharing platforms cache link previews. The short link still works immediately, but a platform may take time to refresh its saved title or image.'],
      ['Does a protected link reveal its destination in the preview?','New previews for password-protected links use generic MemoLink information without the destination or password. Sharing apps may keep a previously cached preview.'],
    ]],
  ],
  th:[
    ['ความเป็นส่วนตัวและความปลอดภัย',[
      ['MemoLink อ่านเนื้อหาของเว็บไซต์ปลายทางหรือไม่?','สำหรับลิงก์สาธารณะที่ยังใช้งานได้ ระบบอาจอ่านชื่อหน้าและภาพสำหรับแชร์ เพื่อสร้างพรีวิว ส่วนลิงก์ที่มีรหัสผ่านหรือหมดอายุจะใช้พรีวิวกลาง โดยระบบดึงพรีวิวจะไม่เข้าถึงที่อยู่ภายในอุปกรณ์หรือเครือข่ายส่วนตัว'],
      ['เจ้าของลิงก์สามารถระบุตัวผู้เข้าชมแต่ละคนได้หรือไม่?','ไม่ได้ หน้าสถิติแสดงข้อมูลรวมตามวัน ประเทศ ประเภทอุปกรณ์ และแหล่งอ้างอิง โดยไม่จัดเก็บ IP ดิบหรือสร้างโปรไฟล์ผู้เข้าชม'],
      ['ควรเก็บคีย์กู้คืนอย่างไรให้ปลอดภัย?','เก็บสำเนาส่วนตัวไว้ในโปรแกรมจัดการรหัสผ่านหรือพื้นที่สำรองที่เข้ารหัส และไม่ควรใส่คีย์ไว้ในลิงก์หรือส่งให้ผู้ที่ต้องการเพียงเปิดลิงก์'],
    ]],
    ['ตัวอย่างลิงก์และการแชร์',[
      ['แอปใดรองรับตัวอย่างลิงก์ MemoLink?','แอปที่รองรับ Open Graph สามารถแสดงตัวอย่างได้ เช่น LINE, WhatsApp, Facebook, X, LinkedIn, Telegram และแอปสนทนาอื่น ๆ'],
      ['ทำไมบางครั้งยังเห็นตัวอย่างลิงก์เวอร์ชันเดิม?','แพลตฟอร์มแชร์มักบันทึกตัวอย่างไว้ในแคช ลิงก์จะเริ่มใช้งานทันที แต่ชื่อหรือภาพอาจใช้เวลาสักระยะก่อนที่แพลตฟอร์มจะอัปเดต'],
      ['ลิงก์ที่มีรหัสผ่านจะเปิดเผยปลายทางในตัวอย่างหรือไม่?','พรีวิวใหม่ของลิงก์ที่มีรหัสผ่านจะใช้ข้อมูลกลางของ MemoLink โดยไม่แสดงปลายทางหรือรหัสผ่าน แต่แอปที่ใช้แชร์อาจยังเก็บพรีวิวเก่าไว้ในแคช'],
    ]],
  ],
  zh:[
    ['隐私与安全',[
      ['MemoLink 会读取目标页面内容吗？','公开且有效的链接可能会读取页面标题和分享图片来生成预览。密码保护或过期链接使用通用预览，预览抓取会阻止本地及私有网络地址。'],
      ['链接所有者能识别单个访客吗？','不能。控制面板只显示按日期、国家、设备类别和来源汇总的数据，不保存原始 IP 或访客档案。'],
      ['如何安全保存恢复密钥？','请在可信的密码管理器或加密备份中保存私人副本，不要把密钥放入短链接，也不要发送给只需访问链接的人。'],
    ]],
    ['预览与社交分享',[
      ['哪些应用可以显示 MemoLink 预览？','支持 Open Graph 的应用均可显示，包括 LINE、WhatsApp、Facebook、X、LinkedIn、Telegram 等。'],
      ['为什么有时仍显示旧预览？','分享平台会缓存链接预览。短链接会立即生效，但平台刷新已保存的标题或图片可能需要一些时间。'],
      ['受保护链接会在预览中暴露目标地址吗？','密码保护链接的新预览使用通用信息，不显示目标或密码。分享应用可能保留以前缓存的预览。'],
    ]],
  ],
  ja:[
    ['プライバシーと安全性',[
      ['MemoLinkはリンク先ページを読み取りますか？','有効な公開リンクでは、共有プレビュー用にページのタイトルや画像を取得する場合があります。パスワード保護・期限切れリンクは一般的なプレビューを使用し、取得処理はローカル・プライベートアドレスを拒否します。'],
      ['リンク所有者は個々の訪問者を特定できますか？','できません。日付、国、端末カテゴリ、参照元の集計のみを表示し、生のIPアドレスや訪問者プロフィールは保存しません。'],
      ['復旧キーはどのように保管すべきですか？','信頼できるパスワード管理ツールまたは暗号化バックアップに個人用コピーを保管し、短縮リンク内や閲覧者へのメッセージには含めないでください。'],
    ]],
    ['プレビューと共有',[
      ['どのアプリでMemoLinkのプレビューを表示できますか？','Open Graph対応アプリで表示できます。LINE、WhatsApp、Facebook、X、LinkedIn、Telegramなどが含まれます。'],
      ['古いプレビューが残るのはなぜですか？','共有プラットフォームがプレビューをキャッシュするためです。リンクはすぐに動作しますが、保存済みのタイトルや画像の更新には時間がかかる場合があります。'],
      ['保護リンクのプレビューにリンク先が表示されますか？','パスワード保護リンクの新しいプレビューは一般的な情報を使用し、リンク先やパスワードを表示しません。共有アプリに以前のプレビューが残る場合があります。'],
    ]],
  ],
  ko:[
    ['개인정보 및 보안',[
      ['MemoLink가 목적지 페이지를 읽나요?','활성 공개 링크는 공유 미리보기를 위해 페이지 제목과 이미지를 읽을 수 있어요. 비밀번호 보호 또는 만료된 링크에는 일반 미리보기를 쓰며 미리보기 요청은 로컬 및 사설 네트워크 주소를 차단해요.'],
      ['링크 소유자가 개별 방문자를 식별할 수 있나요?','아니요. 날짜, 국가, 기기 범주, 유입 경로별 집계만 표시하며 원본 IP나 방문자 프로필을 저장하지 않습니다.'],
      ['복구 키는 어떻게 안전하게 보관하나요?','신뢰할 수 있는 비밀번호 관리자나 암호화 백업에 개인용 사본을 보관하고, 단축 링크에 넣거나 방문자에게 보내지 마세요.'],
    ]],
    ['미리보기 및 소셜 공유',[
      ['어떤 앱에서 MemoLink 미리보기를 볼 수 있나요?','Open Graph를 지원하는 LINE, WhatsApp, Facebook, X, LinkedIn, Telegram 등의 앱에서 표시할 수 있습니다.'],
      ['이전 미리보기가 남는 이유는 무엇인가요?','공유 플랫폼이 링크 미리보기를 캐시하기 때문입니다. 링크는 즉시 작동하지만 저장된 제목이나 이미지 갱신에는 시간이 걸릴 수 있습니다.'],
      ['보호된 링크의 미리보기에 목적지가 노출되나요?','비밀번호 보호 링크의 새 미리보기에는 일반 정보만 표시해요. 공유 앱이 이전 미리보기를 캐시에 보관할 수 있어요.'],
    ]],
  ],
  es:[
    ['Privacidad y seguridad',[
      ['¿MemoLink lee la página de destino?','Para enlaces públicos activos, puede leer el título y la imagen social para crear una vista previa. Los enlaces protegidos o caducados usan una vista genérica. El proceso de vista previa bloquea direcciones locales y privadas.'],
      ['¿El propietario puede identificar a cada visitante?','No. El panel muestra datos agregados por fecha, país, tipo de dispositivo y referencia. No guarda direcciones IP sin procesar ni perfiles personales.'],
      ['¿Cómo debo guardar mi clave de recuperación?','Guarda una copia privada en un gestor de contraseñas o respaldo cifrado. No la incluyas en el enlace ni la envíes a quien solo necesita visitarlo.'],
    ]],
    ['Vistas previas y redes sociales',[
      ['¿Qué aplicaciones muestran la vista previa de MemoLink?','Las aplicaciones compatibles con Open Graph, como LINE, WhatsApp, Facebook, X, LinkedIn, Telegram y muchas herramientas de mensajería.'],
      ['¿Por qué a veces aparece una vista previa antigua?','Las plataformas almacenan las vistas previas en caché. El enlace funciona de inmediato, pero el título o la imagen pueden tardar en actualizarse.'],
      ['¿Un enlace protegido revela su destino en la vista previa?','Las nuevas vistas previas de enlaces protegidos no muestran el destino ni la contraseña. Las aplicaciones pueden conservar una vista previa anterior en caché.'],
    ]],
  ],
};
