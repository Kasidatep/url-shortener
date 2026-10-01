import type { Locale } from './i18n';

const en = {
  title: 'Shorten a link.',
  description: 'Paste, shorten, share. That’s it.',
  create: 'Create', share: 'Share', urlHint: 'Use a complete address starting with https:// or http://.',
  options: 'Link settings', optional: 'Optional', autoName: 'Choose a name, or let us make one',
  access: 'Password & expiration', accessHint: 'Decide how people can open your link',
  campaignHint: 'Add campaign tags or remove tracking',
  aliasHint: '3–48 letters, numbers, hyphens or underscores. Start with a letter or number.',
  done: 'Your link is ready.', doneHint: 'Copy it into a message, post or wherever your next idea belongs.',
  destination: 'Opens', another: 'Create another link', recovery: 'Manage this link in My links. Save your recovery key there before changing devices.',
  noAccount: 'No sign-up needed', help: 'How does it work?',
  reset: 'Reset options', invalidUrl: 'That link doesn’t look right. Try example.com or https://example.com.',
  invalidAlias: 'Use 3–48 letters, numbers, hyphens or underscores. Start with a letter or number.',
  invalidClicks: 'Choose a whole number from 1 to 1,000,000.', invalidDate: 'Choose a date and time in the future.',
  aliasTaken: 'That name is already in use. Try a different one.', rateLimit: 'A few too many links at once. Wait a minute and try again.',
  qrDownload: 'Download QR code', qrHint: 'Scan to open your short link.', qrFailed: 'Could not download the QR code. Please try again.',
};
type Copy = { [K in keyof typeof en]: string };
export const createMessages: Record<Locale, Copy> = {
  en,
  th: {
    title:'ย่อลิงก์ให้สั้น แชร์ได้เลย', description:'วางลิงก์ของคุณ แล้วกดสร้างลิงก์สั้น',
    create:'สร้างลิงก์', share:'พร้อมแชร์', urlHint:'ใช้ลิงก์เต็มที่ขึ้นต้นด้วย https:// หรือ http://',
    options:'ปรับแต่งลิงก์', optional:'เลือกได้ ไม่บังคับ', autoName:'ตั้งชื่อเอง หรือให้เราสร้างให้',
    access:'รหัสผ่านและวันหมดอายุ', accessHint:'กำหนดวิธีเข้าถึงและอายุของลิงก์', campaignHint:'เพิ่มข้อมูลแคมเปญ หรือลบค่าติดตามเดิม',
    aliasHint:'ใช้ภาษาอังกฤษ ตัวเลข - หรือ _ รวม 3–48 ตัว เริ่มต้นด้วยตัวอักษรหรือตัวเลข',
    done:'ลิงก์พร้อมแล้ว', doneHint:'คัดลอกไปวางในแชต โพสต์ หรือส่งต่อได้เลย', destination:'เปิดไปยัง', another:'สร้างลิงก์ใหม่',
    recovery:'จัดการต่อได้ที่ “ลิงก์ของฉัน” อย่าลืมสำรอง Recovery key ที่หน้านั้นก่อนเปลี่ยนอุปกรณ์',
    noAccount:'ไม่ต้องสมัครบัญชี', help:'ใช้งานอย่างไร?', reset:'ล้างการตั้งค่า',
    invalidUrl:'ลิงก์นี้ยังใช้ไม่ได้ ลองใส่ example.com หรือ https://example.com', invalidAlias:'ใช้ภาษาอังกฤษ ตัวเลข - หรือ _ รวม 3–48 ตัว และเริ่มต้นด้วยตัวอักษรหรือตัวเลข',
    invalidClicks:'ใส่จำนวนเต็มตั้งแต่ 1 ถึง 1,000,000 คลิก', invalidDate:'เลือกวันและเวลาที่ยังมาไม่ถึง',
    aliasTaken:'ชื่อนี้มีคนใช้แล้ว ลองเปลี่ยนเป็นชื่ออื่นนะ', rateLimit:'สร้างลิงก์ติดกันหลายครั้งแล้ว รอสักครู่แล้วลองใหม่นะ',
    qrDownload:'ดาวน์โหลด QR Code', qrHint:'สแกนเพื่อเปิดลิงก์สั้นของคุณ', qrFailed:'ดาวน์โหลด QR Code ไม่สำเร็จ ลองอีกครั้งนะ',
  },
  zh: {
    title:'短链接，随时分享。', description:'粘贴要分享的链接，我们来缩短。', create:'创建', share:'分享', urlHint:'请输入以 https:// 或 http:// 开头的完整地址。',
    options:'按需设置', optional:'可选', autoName:'自定义名称，或由我们生成', access:'密码与有效期', accessHint:'设置链接的访问方式与有效期', campaignHint:'添加活动参数或移除跟踪参数', aliasHint:'3–48 个字母、数字、连字符或下划线，以字母或数字开头。',
    done:'链接已准备好。', doneHint:'复制到消息或帖子中，即可分享。', destination:'目标地址', another:'创建另一个链接', recovery:'在“我的链接”中管理。更换设备前，请在那里保存恢复密钥。', noAccount:'无需注册', help:'如何使用？', reset:'重置设置', invalidUrl:'请输入以 https:// 或 http:// 开头的有效地址。', invalidAlias:'使用 3–48 个字母、数字、连字符或下划线，以字母或数字开头。', invalidClicks:'请输入 1 到 1,000,000 之间的整数。', invalidDate:'请选择未来的日期和时间。', aliasTaken:'此名称已被使用，请换一个。', rateLimit:'创建链接过于频繁，请稍后重试。', qrDownload:'下载二维码', qrHint:'扫描即可打开短链接。', qrFailed:'二维码下载失败，请重试。',
  },
  ja: {
    title:'短いリンクで、すぐ共有。', description:'共有したいURLを貼り付けてください。', create:'作成', share:'共有', urlHint:'https:// または http:// で始まる完全なURLを入力してください。', options:'必要に応じて設定', optional:'任意', autoName:'名前を指定するか、自動生成', access:'パスワードと有効期限', accessHint:'リンクへのアクセス方法と期限を設定', campaignHint:'キャンペーン情報の追加や追跡パラメータの削除', aliasHint:'英数字で始まる3〜48文字。ハイフンとアンダースコアも使えます。', done:'リンクができました。', doneHint:'コピーして、メッセージや投稿で共有しましょう。', destination:'リンク先', another:'別のリンクを作成', recovery:'「マイリンク」で管理できます。端末を変える前に復旧キーを保存してください。', noAccount:'登録不要', help:'使い方', reset:'設定をリセット', invalidUrl:'https:// または http:// で始まる有効なURLを入力してください。', invalidAlias:'英数字で始まる3〜48文字を使用してください。ハイフンとアンダースコアも使えます。', invalidClicks:'1〜1,000,000の整数を入力してください。', invalidDate:'未来の日時を選んでください。', aliasTaken:'この名前は使用中です。別の名前をお試しください。', rateLimit:'作成回数が多すぎます。少し待って再試行してください。', qrDownload:'QRコードを保存', qrHint:'スキャンすると短縮リンクが開きます。', qrFailed:'QRコードを保存できませんでした。再試行してください。',
  },
  ko: {
    title:'짧은 링크로 바로 공유하세요.', description:'공유할 링크를 붙여넣으면 짧게 만들어 드려요.', create:'만들기', share:'공유', urlHint:'https:// 또는 http://로 시작하는 전체 주소를 입력하세요.', options:'내게 맞게 설정', optional:'선택 사항', autoName:'이름을 지정하거나 자동 생성하세요', access:'비밀번호 및 만료', accessHint:'접근 방법과 링크의 유효 기간을 설정하세요', campaignHint:'캠페인 태그 추가 또는 추적 매개변수 삭제', aliasHint:'영문, 숫자, 하이픈, 밑줄 3~48자. 영문이나 숫자로 시작하세요.', done:'링크가 준비됐어요.', doneHint:'복사해서 메시지나 게시물에 공유하세요.', destination:'연결 주소', another:'새 링크 만들기', recovery:'내 링크에서 관리할 수 있어요. 기기를 바꾸기 전에 복구 키를 저장하세요.', noAccount:'가입 필요 없음', help:'사용 방법', reset:'설정 초기화', invalidUrl:'https:// 또는 http://로 시작하는 올바른 주소를 입력하세요.', invalidAlias:'영문이나 숫자로 시작하는 3~48자를 사용하세요. 하이픈과 밑줄도 가능해요.', invalidClicks:'1~1,000,000 사이의 정수를 입력하세요.', invalidDate:'미래의 날짜와 시간을 선택하세요.', aliasTaken:'이미 사용 중인 이름이에요. 다른 이름을 입력하세요.', rateLimit:'링크를 너무 많이 만들었어요. 잠시 후 다시 시도하세요.', qrDownload:'QR 코드 다운로드', qrHint:'스캔해서 단축 링크를 여세요.', qrFailed:'QR 코드를 다운로드하지 못했어요. 다시 시도하세요.',
  },
  es: {
    title:'Un enlace corto. Listo para compartir.', description:'Pega tu enlace y lo acortamos por ti.', create:'Crear', share:'Compartir', urlHint:'Usa la dirección completa, empezando por https:// o http://.', options:'Hazlo tuyo', optional:'Opcional', autoName:'Elige un nombre o deja que lo generemos', access:'Contraseña y caducidad', accessHint:'Decide cómo y hasta cuándo se puede abrir', campaignHint:'Añade etiquetas de campaña o elimina el seguimiento', aliasHint:'3–48 letras, números, guiones o guiones bajos. Empieza por una letra o número.', done:'Tu enlace está listo.', doneHint:'Cópialo en un mensaje o publicación y compártelo.', destination:'Destino', another:'Crear otro enlace', recovery:'Gestiona este enlace en Mis enlaces. Guarda allí tu clave de recuperación antes de cambiar de dispositivo.', noAccount:'Sin registro', help:'¿Cómo funciona?', reset:'Restablecer ajustes', invalidUrl:'Introduce una dirección válida que empiece por https:// o http://.', invalidAlias:'Usa 3–48 letras, números, guiones o guiones bajos. Empieza por una letra o número.', invalidClicks:'Elige un número entero entre 1 y 1.000.000.', invalidDate:'Elige una fecha y hora futuras.', aliasTaken:'Ese nombre ya está en uso. Prueba otro.', rateLimit:'Demasiados enlaces seguidos. Espera un minuto y vuelve a intentarlo.', qrDownload:'Descargar código QR', qrHint:'Escanea para abrir tu enlace corto.', qrFailed:'No se pudo descargar el código QR. Inténtalo de nuevo.',
  },
};
