export const locales = ['en', 'th', 'zh', 'ja', 'ko', 'es'] as const;
export type Locale = typeof locales[number];

const en = {
  myLinks:'My links', eyebrow:'A little link. A lot of possibility.', heroA:'Good things.', heroB:'Short links.', heroDescription:'Give your next idea a link worth sharing. Shorten a URL, make a QR code, and choose who gets through—no sign-up needed.',
  pasteLongLink:'Paste a long link', paste:'Paste', addOptions:'+ Link settings', hideOptions:'− Hide settings', customName:'Custom name', password:'Password', optional:'optional', protectLink:'Add password',
  expiration:'Expiration', never:'Never', afterClicks:'Click limit', dateTime:'Date & time', maximumClicks:'Maximum clicks', expiresOn:'Expires on', timezone:'Your local timezone',
  campaignTools:'UTM campaign', source:'Source', medium:'Medium', campaign:'Campaign', term:'Term', content:'Content', removeTracking:'Remove existing tracking first',
  loading:'Creating…', shorten:'Create short link', trust:'No account needed · Keep your recovery key to manage links later', ready:'Ready to share', copy:'Copy', copied:'Copied', share:'Share', qr:'QR code', manage:'Manage link →',
  featuresKicker:'MAKE THE LINK YOURS', featuresTitle:'A small detail. A better way to share.', f1Title:'A name that says something', f1Body:'Give your link a memorable name for your portfolio, next event or latest work.', f2Title:'Open on your terms', f2Body:'Add a password, set an expiry date or stop the link after a chosen number of visits.', f3Title:'See what gets a click', f3Body:'Check visits, countries, devices and referring websites from My links.', f4Title:'Portable', f4Body:'Move ownership with a recovery key.',
  faq:'FAQ', faqTitle:'Good to know.', faq1:'Do I need an account?', faq1a:'No. A private key on this device owns your links.', faq2:'Can I manage links later?', faq2a:'Yes. Open My links on this device.', faq3:'What if I change devices?', faq3a:'Export your recovery key before moving.', faq4:'Can links expire?', faq4a:'Yes, by date or click count.',
  clipboardFailed:'Clipboard unavailable. Please select and copy or paste the link manually.', createFailed:'We could not create your link. Check the address and try again.', theme:'Theme', language:'Language'
};

export const messages = {
  en,
  th: {
    ...en, myLinks:'ลิงก์ของฉัน', eyebrow:'เรื่องดี ๆ เริ่มที่ลิงก์เดียว', heroA:'ลิงก์สั้นลง', heroB:'ส่งต่อได้อีกเยอะ', heroDescription:'ส่งผลงาน ชวนมางาน หรือแชร์เรื่องที่อยากเล่า เปลี่ยน URL ยาวให้เป็นลิงก์จำง่าย พร้อม QR Code และตัวเลือกการเข้าถึง เริ่มได้เลย ไม่ต้องสมัคร',
    pasteLongLink:'วางลิงก์ยาว', paste:'วาง', addOptions:'+ ตั้งค่าลิงก์', hideOptions:'− ซ่อนการตั้งค่า', customName:'ชื่อที่ต้องการ', password:'รหัสผ่าน', optional:'ไม่บังคับ', protectLink:'เพิ่มรหัสผ่าน',
    expiration:'การหมดอายุ', never:'ไม่หมดอายุ', afterClicks:'จำกัดคลิก', dateTime:'วันและเวลา', maximumClicks:'จำนวนคลิกสูงสุด', expiresOn:'หมดอายุเมื่อ', timezone:'เขตเวลาของคุณ',
    campaignTools:'แคมเปญ UTM', source:'แหล่งที่มา', medium:'ช่องทาง', campaign:'แคมเปญ', term:'คำค้น', content:'คอนเทนต์', removeTracking:'ลบค่าติดตามเดิมก่อน',
    loading:'กำลังสร้าง…', shorten:'สร้างลิงก์', trust:'ไม่ต้องสมัคร · เก็บคีย์กู้คืน ไว้จัดการลิงก์ภายหลัง', ready:'พร้อมแชร์', copy:'คัดลอก', copied:'คัดลอกแล้ว', share:'แชร์', qr:'QR Code', manage:'จัดการลิงก์ →',
    featuresKicker:'ลิงก์ของคุณ ในแบบที่ต้องการ', featuresTitle:'รายละเอียดเล็ก ๆ ที่ทำให้แชร์ได้ดีขึ้น', f1Title:'เห็นชื่อ ก็รู้ว่าเรื่องอะไร', f1Body:'ตั้งชื่อลิงก์ให้เข้ากับผลงาน อีเวนต์ หรือแคมเปญ คนรับจำง่าย คุณก็หาเจอไว', f2Title:'เลือกได้ว่าจะเปิดถึงเมื่อไร', f2Body:'ใส่รหัสผ่าน ตั้งวันหมดอายุ หรือจำกัดจำนวนคลิก ให้เหมาะกับสิ่งที่คุณกำลังแชร์', f3Title:'รู้ว่าแชร์แล้วเป็นอย่างไร', f3Body:'ดูยอดเข้าชม ประเทศ อุปกรณ์ และเว็บไซต์ที่ส่งคนมา ได้จากหน้าลิงก์ของฉัน', f4Title:'ย้ายได้', f4Body:'โอนสิทธิ์ด้วยคีย์กู้คืน',
    faq:'คำถาม', faqTitle:'สิ่งที่ควรรู้', faq1:'จำเป็นต้องสมัครบัญชีก่อนใช้งานหรือไม่?', faq1a:'ไม่จำเป็น คุณสามารถสร้างลิงก์ได้ทันที โดยสิทธิ์ในการจัดการจะเชื่อมโยงกับอุปกรณ์ผ่านคีย์กู้คืน', faq2:'สามารถกลับมาแก้ไขหรือจัดการลิงก์ภายหลังได้หรือไม่?', faq2a:'ได้ เปิดเมนู “ลิงก์ของฉัน” จากอุปกรณ์ที่ใช้สร้างลิงก์ หรือกู้คืนสิทธิ์ด้วยคีย์กู้คืน', faq3:'หากเปลี่ยนอุปกรณ์ต้องดำเนินการอย่างไร?', faq3a:'ควรสำรองคีย์กู้คืน จากอุปกรณ์เดิม แล้วนำไปกู้คืนสิทธิ์บนอุปกรณ์ใหม่ โดยเก็บคีย์เป็นความลับ', faq4:'สามารถกำหนดวันหมดอายุของลิงก์ได้หรือไม่?', faq4a:'ได้ คุณสามารถกำหนดวันและเวลาหมดอายุ หรือจำกัดจำนวนการเข้าชมตามวัตถุประสงค์การใช้งาน',
    clipboardFailed:'ใช้คลิปบอร์ดไม่ได้ ลองเลือกข้อความเพื่อคัดลอกหรือวางลิงก์ด้วยตัวเอง', createFailed:'ยังสร้างลิงก์ไม่ได้ ตรวจสอบที่อยู่แล้วลองอีกครั้งนะ', theme:'ธีม', language:'ภาษา'
  },
  zh: {
    ...en, myLinks:'我的链接', eyebrow:'简单、私密、属于你', heroA:'缩短链接', heroB:'保持掌控', heroDescription:'创建安全的短链接和二维码，无需注册。',
    pasteLongLink:'粘贴长链接', paste:'粘贴', addOptions:'+ 链接设置', hideOptions:'− 隐藏设置', customName:'自定义名称', password:'密码', optional:'可选', protectLink:'添加密码',
    expiration:'有效期', never:'永久', afterClicks:'点击限制', dateTime:'日期和时间', maximumClicks:'最大点击数', expiresOn:'到期时间', timezone:'使用本地时区',
    campaignTools:'UTM 活动', source:'来源', medium:'媒介', campaign:'活动', term:'关键词', content:'内容', removeTracking:'先移除原有跟踪参数',
    loading:'正在创建…', shorten:'创建短链接', trust:'隐私优先 · 在此设备管理', ready:'可以分享了', copy:'复制', copied:'已复制', share:'分享', qr:'二维码', manage:'管理链接 →',
    featuresKicker:'刚好够用', featuresTitle:'简单易用，需要时更强大', f1Title:'自定义', f1Body:'使用易记的名称', f2Title:'安全', f2Body:'设置访问和到期限制', f3Title:'可追踪', f3Body:'在此设备查看点击量', f4Title:'可迁移', f4Body:'使用恢复密钥迁移所有权',
    faq:'常见问题', faqTitle:'你需要知道的', faq1:'需要账号吗？', faq1a:'不需要。链接归此设备的私钥所有。', faq2:'以后可以管理吗？', faq2a:'可以，在此设备打开“我的链接”。', faq3:'更换设备怎么办？', faq3a:'更换前请导出恢复密钥。', faq4:'链接可以过期吗？', faq4a:'可以按日期或点击次数设置。',
    theme:'主题', language:'语言'
  },
  ja: {
    ...en, myLinks:'マイリンク', eyebrow:'シンプル・安全・自分専用', heroA:'リンクを短く', heroB:'管理はしっかり', heroDescription:'登録なしで、安全な短縮URLとQRコードを作成。',
    pasteLongLink:'長いURLを貼り付け', paste:'貼り付け', addOptions:'+ リンク設定', hideOptions:'− 設定を閉じる', customName:'カスタム名', password:'パスワード', optional:'任意', protectLink:'パスワードを追加',
    expiration:'有効期限', never:'無期限', afterClicks:'クリック制限', dateTime:'日時', maximumClicks:'最大クリック数', expiresOn:'期限', timezone:'ローカル時間',
    campaignTools:'UTMキャンペーン', source:'ソース', medium:'メディア', campaign:'キャンペーン', term:'キーワード', content:'コンテンツ', removeTracking:'既存の計測パラメータを削除',
    loading:'作成中…', shorten:'短縮リンクを作成', trust:'プライバシー重視 · この端末で管理', ready:'共有できます', copy:'コピー', copied:'コピー済み', share:'共有', qr:'QRコード', manage:'リンクを管理 →',
    featuresKicker:'必要な機能だけ', featuresTitle:'普段はシンプル、必要な時は高機能', f1Title:'カスタム', f1Body:'覚えやすい名前を設定', f2Title:'保護', f2Body:'アクセスと期限を制御', f3Title:'計測', f3Body:'この端末でクリック数を確認', f4Title:'移行', f4Body:'復旧キーで所有権を移行',
    faq:'FAQ', faqTitle:'知っておきたいこと', faq1:'アカウントは必要？', faq1a:'不要です。この端末の秘密鍵がリンクを所有します。', faq2:'後から管理できる？', faq2a:'この端末の「マイリンク」から管理できます。', faq3:'端末を変える場合は？', faq3a:'先に復旧キーを書き出してください。', faq4:'期限を設定できる？', faq4a:'日時またはクリック数で設定できます。',
    theme:'テーマ', language:'言語'
  },
  ko: {
    ...en, myLinks:'내 링크', eyebrow:'간단하고 안전하게', heroA:'링크는 짧게', heroB:'관리는 확실하게', heroDescription:'가입 없이 안전한 단축 링크와 QR 코드를 만드세요.',
    pasteLongLink:'긴 링크 붙여넣기', paste:'붙여넣기', addOptions:'+ 링크 설정', hideOptions:'− 설정 닫기', customName:'사용자 지정 이름', password:'비밀번호', optional:'선택', protectLink:'비밀번호 추가',
    expiration:'만료', never:'없음', afterClicks:'클릭 제한', dateTime:'날짜 및 시간', maximumClicks:'최대 클릭 수', expiresOn:'만료 시간', timezone:'기기 시간대 사용',
    campaignTools:'UTM 캠페인', source:'소스', medium:'매체', campaign:'캠페인', term:'검색어', content:'콘텐츠', removeTracking:'기존 추적 매개변수 제거',
    loading:'만드는 중…', shorten:'단축 링크 만들기', trust:'개인정보 우선 · 이 기기에서 관리', ready:'공유할 준비 완료', copy:'복사', copied:'복사됨', share:'공유', qr:'QR 코드', manage:'링크 관리 →',
    featuresKicker:'필요한 기능만', featuresTitle:'평소에는 간단하게, 필요할 때 강력하게', f1Title:'맞춤 설정', f1Body:'기억하기 쉬운 이름 사용', f2Title:'보호', f2Body:'접근 및 만료 제어', f3Title:'추적', f3Body:'이 기기에서 클릭 확인', f4Title:'이동', f4Body:'복구 키로 소유권 이전',
    faq:'FAQ', faqTitle:'알아두세요', faq1:'계정이 필요한가요?', faq1a:'아니요. 이 기기의 개인 키가 링크를 소유합니다.', faq2:'나중에 관리할 수 있나요?', faq2a:'이 기기의 내 링크에서 관리할 수 있습니다.', faq3:'기기를 바꾸면?', faq3a:'먼저 복구 키를 내보내세요.', faq4:'링크를 만료할 수 있나요?', faq4a:'날짜 또는 클릭 수로 설정할 수 있습니다.',
    theme:'테마', language:'언어'
  },
  es: {
    ...en, myLinks:'Mis enlaces', eyebrow:'Simple. Privado. Tuyo.', heroA:'Acorta enlaces.', heroB:'Mantén el control.', heroDescription:'Crea enlaces cortos seguros y códigos QR sin registrarte.',
    pasteLongLink:'Pega un enlace largo', paste:'Pegar', addOptions:'+ Configurar enlace', hideOptions:'− Ocultar ajustes', customName:'Nombre personalizado', password:'Contraseña', optional:'opcional', protectLink:'Añadir contraseña',
    expiration:'Caducidad', never:'Nunca', afterClicks:'Límite de clics', dateTime:'Fecha y hora', maximumClicks:'Máximo de clics', expiresOn:'Caduca el', timezone:'Zona horaria del dispositivo',
    campaignTools:'Campaña UTM', source:'Fuente', medium:'Medio', campaign:'Campaña', term:'Término', content:'Contenido', removeTracking:'Eliminar parámetros de seguimiento existentes',
    loading:'Creando…', shorten:'Crear enlace corto', trust:'Privacidad por diseño · Gestionado en este dispositivo', ready:'Listo para compartir', copy:'Copiar', copied:'Copiado', share:'Compartir', qr:'Código QR', manage:'Gestionar enlace →',
    featuresKicker:'TODO LO NECESARIO', featuresTitle:'Simple por fuera. Potente cuando lo necesitas.', f1Title:'Personalizable', f1Body:'Usa un nombre fácil de recordar.', f2Title:'Protegido', f2Body:'Añade controles de acceso y caducidad.', f3Title:'Medible', f3Body:'Consulta clics desde este dispositivo.', f4Title:'Portable', f4Body:'Mueve la propiedad con una clave de recuperación.',
    faq:'Preguntas', faqTitle:'Información útil', faq1:'¿Necesito una cuenta?', faq1a:'No. Una clave privada de este dispositivo identifica tus enlaces.', faq2:'¿Puedo gestionarlos después?', faq2a:'Sí. Abre Mis enlaces desde este dispositivo.', faq3:'¿Qué ocurre si cambio de dispositivo?', faq3a:'Exporta antes tu clave de recuperación.', faq4:'¿Puedo hacer que el enlace caduque?', faq4a:'Sí, por fecha o por número de clics.',
    theme:'Tema', language:'Idioma'
  }

} as const;

export type MessageKey = keyof typeof en;
