import type { Locale } from "./i18n";
type Copy = {
  eyebrow: string;
  title: string;
  body: string;
  collection: string;
  total: string;
  openings: string;
  active: string;
  other: string;
  countNote: string;
  device: string;
  deviceBody: string;
  refresh: string;
  refreshing: string;
  sort: string;
  search: string;
  clear: string;
  recovery: string;
  backup: string;
  restore: string;
  backupTitle: string;
  backupBody: string;
  restoreTitle: string;
  restoreBody: string;
  restoreNote: string;
  showKey: string;
  hideKey: string;
  keyLabel: string;
  invalidKey: string;
  keyUnavailable: string;
  restoreAction: string;
  restoring: string;
  closePanel: string;
  openLink: string;
  destination: string;
  visits: string;
  viewStats: string;
  edit: string;
  save: string;
  saving: string;
  qr: string;
  remaining: string;
  expires: string;
  noExpiry: string;
  loading: string;
  emptyTitle: string;
  emptyBody: string;
  emptyAction: string;
  emptyRecovery: string;
  noResults: string;
  noResultsBody: string;
  result: string;
  loadError: string;
  statsTitle: string;
  statsBody: string;
  statsNote: string;
  daily: string;
  dailyTable: string;
  date: string;
  count: string;
  noStats: string;
  direct: string;
  internal: string;
  unknown: string;
  mobile: string;
  desktop: string;
  tablet: string;
  bot: string;
};
export const manageMessages: Record<Locale, Copy> = {
  th: {
    eyebrow: "พื้นที่ของลิงก์ที่คุณสร้าง",
    title: "แชร์ไปแล้ว ดูแลต่อได้",
    body: "ค้นหา เปลี่ยนปลายทาง หรือดูยอดเปิด กลับมาทำต่อได้จากตรงนี้",
    collection: "ลิงก์ของคุณ",
    total: "ลิงก์ในรายการ",
    openings: "ยอดเปิดทั้งหมด",
    active: "พร้อมใช้งาน",
    other: "พักหรือหมดอายุ",
    countNote: "ยอดเปิดนับเป็นครั้ง คนเดิมเปิดซ้ำได้ สรุปเฉพาะลิงก์ในรายการนี้",
    device: "เบราว์เซอร์นี้",
    deviceBody:
      "ย้ายเครื่องหรือเปลี่ยนเบราว์เซอร์ ใช้คีย์กู้คืนเพื่อกลับมาจัดการลิงก์เดิม",
    refresh: "อัปเดตรายการ",
    refreshing: "กำลังอัปเดต",
    sort: "เรียงตาม",
    search: "ค้นหาชื่อลิงก์หรือปลายทาง",
    clear: "ล้างคำค้น",
    recovery: "คีย์กู้คืน",
    backup: "สำรองคีย์",
    restore: "ย้ายมาที่นี่",
    backupTitle: "คีย์เดียว กลับมาดูแลลิงก์เดิมได้",
    backupBody:
      "เก็บคีย์นี้ไว้ในที่ส่วนตัวก่อนเปลี่ยนเครื่องหรือล้างข้อมูลเบราว์เซอร์ ผู้ที่มีคีย์สามารถจัดการลิงก์ชุดนี้ได้",
    restoreTitle: "นำลิงก์เดิมมาจัดการที่นี่",
    restoreBody:
      "วางคีย์ที่สำรองจากเบราว์เซอร์เดิม ลิงก์ที่ผูกกับคีย์นั้นจะปรากฏในหน้านี้",
    restoreNote:
      "เบราว์เซอร์นี้จะเปลี่ยนมาใช้คีย์ที่นำเข้า สำรองคีย์ปัจจุบันไว้ก่อนหากยังต้องใช้",
    showKey: "แสดงคีย์",
    hideKey: "ซ่อนคีย์",
    keyLabel: "คีย์กู้คืนส่วนตัว",
    invalidKey: "คีย์นี้มีรูปแบบไม่ครบ ลองคัดลอกคีย์เดิมทั้งชุดอีกครั้ง",
    keyUnavailable:
      "อ่านคีย์ไม่ได้ ลองอนุญาตให้เบราว์เซอร์เก็บข้อมูลของเว็บไซต์นี้แล้วเปิดใหม่",
    restoreAction: "นำลิงก์กลับมา",
    restoring: "กำลังเรียกลิงก์กลับมา",
    closePanel: "ปิดรายละเอียด",
    openLink: "เปิดลิงก์ในแท็บใหม่",
    destination: "ปลายทาง",
    visits: "ครั้ง",
    viewStats: "ดูสถิติ",
    edit: "แก้ปลายทาง",
    save: "บันทึกปลายทาง",
    saving: "กำลังบันทึก",
    qr: "ดู QR Code",
    remaining: "เปิดได้อีก",
    expires: "ใช้ได้ถึง",
    noExpiry: "ไม่กำหนดหมดอายุ",
    loading: "กำลังเรียกลิงก์ของคุณ",
    emptyTitle: "ที่ว่างสำหรับลิงก์แรกของคุณ",
    emptyBody:
      "สร้างลิงก์ไว้แชร์ หรือใช้คีย์กู้คืนเพื่อนำลิงก์จากเบราว์เซอร์เดิมกลับมา",
    emptyAction: "สร้างลิงก์แรก",
    emptyRecovery: "มีลิงก์อยู่แล้ว?",
    noResults: "ยังไม่เจอลิงก์ที่ตรง",
    noResultsBody: "ลองค้นหาด้วยคำสั้นลง หรือเปลี่ยนสถานะที่เลือก",
    result: "ลิงก์",
    loadError: "เรียกลิงก์ไม่สำเร็จ",
    statsTitle: "ลิงก์นี้ ไปถึงไหนแล้ว",
    statsBody: "ยอดเปิดใน 30 วันล่าสุด",
    statsNote: "นับการเปิด ไม่ใช่จำนวนคน วันที่รายวันอิง UTC",
    daily: "ยอดเปิดรายวัน",
    dailyTable: "ดูตัวเลขรายวัน",
    date: "วันที่",
    count: "ยอดเปิด",
    noStats: "ยังไม่มียอดเปิดในช่วงนี้ แชร์ลิงก์แล้วกลับมาดูได้",
    direct: "เปิดโดยตรง",
    internal: "จาก MemoLink",
    unknown: "ไม่ระบุ",
    mobile: "มือถือ",
    desktop: "คอมพิวเตอร์",
    tablet: "แท็บเล็ต",
    bot: "ระบบอัตโนมัติ",
  },
  en: {
    eyebrow: "Your shared corner",
    title: "Shared, and still in your hands.",
    body: "Find a link, change its destination or see how often it opens.",
    collection: "Your links",
    total: "Links in this list",
    openings: "Total openings",
    active: "Ready to open",
    other: "Paused or expired",
    countNote:
      "Openings count visits, including repeat visits. Totals cover this list.",
    device: "This browser",
    deviceBody:
      "Use your recovery key to manage the same links from another browser or device.",
    refresh: "Refresh links",
    refreshing: "Refreshing",
    sort: "Sort by",
    search: "Search a name or destination",
    clear: "Clear search",
    recovery: "Recovery key",
    backup: "Save key",
    restore: "Bring links here",
    backupTitle: "One key. The same links, wherever you go.",
    backupBody:
      "Keep a private copy before changing devices or clearing browser data. Anyone with this key can manage these links.",
    restoreTitle: "Bring your existing links here.",
    restoreBody:
      "Paste the key saved in your previous browser. Links owned by that key will appear here.",
    restoreNote:
      "This browser will use the imported key. Save the current key first if you still need it.",
    showKey: "Show key",
    hideKey: "Hide key",
    keyLabel: "Private recovery key",
    invalidKey:
      "This key looks incomplete. Copy the entire original key and try again.",
    keyUnavailable:
      "Cannot read the key. Allow this browser to store site data and reopen the dialog.",
    restoreAction: "Restore my links",
    restoring: "Restoring links",
    closePanel: "Close details",
    openLink: "Open link in a new tab",
    destination: "Destination",
    visits: "openings",
    viewStats: "View stats",
    edit: "Edit destination",
    save: "Save destination",
    saving: "Saving",
    qr: "Show QR code",
    remaining: "Openings left",
    expires: "Available until",
    noExpiry: "No expiry set",
    loading: "Getting your links",
    emptyTitle: "A place for your first link.",
    emptyBody:
      "Create something to share, or use a recovery key to bring links from your previous browser.",
    emptyAction: "Create your first link",
    emptyRecovery: "Already have links?",
    noResults: "No matching links yet.",
    noResultsBody: "Try a shorter search or a different status.",
    result: "links",
    loadError: "Could not load your links",
    statsTitle: "Where this link has been.",
    statsBody: "Openings in the last 30 days",
    statsNote: "Openings, not unique people. Daily dates use UTC.",
    daily: "Daily openings",
    dailyTable: "View daily numbers",
    date: "Date",
    count: "Openings",
    noStats: "No openings in this period yet. Share your link and come back.",
    direct: "Direct",
    internal: "From MemoLink",
    unknown: "Unknown",
    mobile: "Mobile",
    desktop: "Desktop",
    tablet: "Tablet",
    bot: "Automated",
  },
  zh: {
    eyebrow: "你分享的空间",
    title: "分享之后，继续掌握。",
    body: "查找链接、修改目标，或了解打开次数。",
    collection: "你的链接",
    total: "列表中的链接",
    openings: "总打开次数",
    active: "可使用",
    other: "暂停或已到期",
    countNote: "打开次数包含重复访问，汇总仅针对本列表。",
    device: "此浏览器",
    deviceBody: "使用恢复密钥，在其他浏览器或设备管理原来的链接。",
    refresh: "刷新列表",
    refreshing: "正在刷新",
    sort: "排序方式",
    search: "搜索名称或目标",
    clear: "清除搜索",
    recovery: "恢复密钥",
    backup: "保存密钥",
    restore: "带到这里",
    backupTitle: "一个密钥，随时管理原来的链接。",
    backupBody:
      "换设备或清除数据前保存私人副本。持有此密钥的人可以管理这些链接。",
    restoreTitle: "将原来的链接带到这里。",
    restoreBody: "粘贴在旧浏览器保存的密钥，对应链接会出现在这里。",
    restoreNote: "此浏览器将使用导入的密钥。若仍需旧密钥，请先保存。",
    showKey: "显示密钥",
    hideKey: "隐藏密钥",
    keyLabel: "私人恢复密钥",
    invalidKey: "密钥似乎不完整，请重新复制整个原密钥。",
    keyUnavailable: "无法读取密钥。请允许浏览器保存网站数据后重新打开。",
    restoreAction: "恢复我的链接",
    restoring: "正在恢复链接",
    closePanel: "关闭详情",
    openLink: "在新标签页打开",
    destination: "目标地址",
    visits: "次打开",
    viewStats: "查看统计",
    edit: "修改目标",
    save: "保存目标",
    saving: "正在保存",
    qr: "查看二维码",
    remaining: "剩余打开次数",
    expires: "有效期至",
    noExpiry: "未设到期时间",
    loading: "正在获取你的链接",
    emptyTitle: "给第一个链接留个位置。",
    emptyBody: "创建要分享的链接，或用恢复密钥找回旧浏览器中的链接。",
    emptyAction: "创建第一个链接",
    emptyRecovery: "已有链接？",
    noResults: "没有匹配的链接。",
    noResultsBody: "请缩短关键词或选择其他状态。",
    result: "个链接",
    loadError: "无法获取链接",
    statsTitle: "这个链接到达了哪里。",
    statsBody: "最近 30 天打开量",
    statsNote: "统计打开次数，不是独立人数。日期使用 UTC。",
    daily: "每日打开量",
    dailyTable: "查看每日数字",
    date: "日期",
    count: "打开量",
    noStats: "此期间暂无打开记录，分享后再回来查看。",
    direct: "直接打开",
    internal: "来自 MemoLink",
    unknown: "未知",
    mobile: "手机",
    desktop: "电脑",
    tablet: "平板",
    bot: "自动程序",
  },
  ja: {
    eyebrow: "共有したリンクの居場所",
    title: "共有した後も、手元に。",
    body: "リンクを探し、リンク先を変更し、開かれた回数を確認。",
    collection: "あなたのリンク",
    total: "この一覧のリンク",
    openings: "開かれた合計",
    active: "利用可能",
    other: "停止中・期限切れ",
    countNote: "繰り返しのアクセスも含む回数です。この一覧のみを集計します。",
    device: "このブラウザー",
    deviceBody:
      "復旧キーを使うと別の端末やブラウザーでも同じリンクを管理できます。",
    refresh: "一覧を更新",
    refreshing: "更新中",
    sort: "並び順",
    search: "名前やリンク先で検索",
    clear: "検索をクリア",
    recovery: "復旧キー",
    backup: "キーを保存",
    restore: "ここへ移す",
    backupTitle: "一つのキーで、同じリンクを管理。",
    backupBody:
      "端末の変更やデータ削除前に個人用コピーを保存してください。このキーを持つ人はリンクを管理できます。",
    restoreTitle: "以前のリンクをここへ。",
    restoreBody:
      "元のブラウザーで保存したキーを貼り付けると、そのリンクが表示されます。",
    restoreNote:
      "このブラウザーは取り込んだキーを使用します。現在のキーが必要なら先に保存してください。",
    showKey: "キーを表示",
    hideKey: "キーを隠す",
    keyLabel: "個人用復旧キー",
    invalidKey: "キーが不完全なようです。元のキー全体をコピーしてください。",
    keyUnavailable:
      "キーを読めません。サイトデータの保存を許可して開き直してください。",
    restoreAction: "リンクを復元",
    restoring: "リンクを復元中",
    closePanel: "詳細を閉じる",
    openLink: "新しいタブで開く",
    destination: "リンク先",
    visits: "回",
    viewStats: "訪問数を見る",
    edit: "リンク先を編集",
    save: "リンク先を保存",
    saving: "保存中",
    qr: "QRコードを見る",
    remaining: "残りの回数",
    expires: "利用期限",
    noExpiry: "期限なし",
    loading: "リンクを読み込み中",
    emptyTitle: "最初のリンクのための場所。",
    emptyBody:
      "共有用リンクを作るか、復旧キーで以前のブラウザーから取り戻しましょう。",
    emptyAction: "最初のリンクを作る",
    emptyRecovery: "すでにリンクがありますか？",
    noResults: "一致するリンクがありません。",
    noResultsBody: "短い言葉や別の状態で試してください。",
    result: "件",
    loadError: "リンクを読み込めませんでした",
    statsTitle: "このリンクが届いた場所。",
    statsBody: "直近30日間の回数",
    statsNote: "人数ではなく回数です。日付はUTC基準です。",
    daily: "日別の回数",
    dailyTable: "日別データを見る",
    date: "日付",
    count: "回数",
    noStats: "この期間の記録はまだありません。共有後に確認できます。",
    direct: "直接",
    internal: "MemoLinkから",
    unknown: "不明",
    mobile: "スマートフォン",
    desktop: "パソコン",
    tablet: "タブレット",
    bot: "自動アクセス",
  },
  ko: {
    eyebrow: "공유한 링크의 공간",
    title: "공유한 뒤에도, 내 손안에.",
    body: "링크를 찾고 목적지를 바꾸거나 열린 횟수를 확인하세요.",
    collection: "내 링크",
    total: "목록의 링크",
    openings: "전체 열기 횟수",
    active: "사용 가능",
    other: "중지 또는 만료",
    countNote: "반복 방문을 포함한 열기 횟수예요. 이 목록만 집계합니다.",
    device: "이 브라우저",
    deviceBody: "복구 키로 다른 기기나 브라우저에서 같은 링크를 관리하세요.",
    refresh: "목록 새로고침",
    refreshing: "새로고침 중",
    sort: "정렬 기준",
    search: "이름 또는 목적지 검색",
    clear: "검색 지우기",
    recovery: "복구 키",
    backup: "키 저장",
    restore: "여기로 가져오기",
    backupTitle: "키 하나로, 같은 링크를 어디서나.",
    backupBody:
      "기기 변경이나 데이터 삭제 전에 개인 사본을 저장하세요. 이 키를 가진 사람은 링크를 관리할 수 있어요.",
    restoreTitle: "기존 링크를 여기로 가져와요.",
    restoreBody:
      "이전 브라우저에서 저장한 키를 붙여넣으면 연결된 링크가 나타나요.",
    restoreNote:
      "이 브라우저는 가져온 키를 사용해요. 현재 키가 필요하면 먼저 저장하세요.",
    showKey: "키 표시",
    hideKey: "키 숨기기",
    keyLabel: "개인 복구 키",
    invalidKey: "키가 완전하지 않은 것 같아요. 원래 키 전체를 다시 복사하세요.",
    keyUnavailable:
      "키를 읽을 수 없어요. 사이트 데이터 저장을 허용하고 다시 여세요.",
    restoreAction: "내 링크 복원",
    restoring: "링크 복원 중",
    closePanel: "상세 닫기",
    openLink: "새 탭에서 링크 열기",
    destination: "목적지",
    visits: "회",
    viewStats: "통계 보기",
    edit: "목적지 수정",
    save: "목적지 저장",
    saving: "저장 중",
    qr: "QR 코드 보기",
    remaining: "남은 열기 횟수",
    expires: "사용 기한",
    noExpiry: "만료 설정 없음",
    loading: "내 링크 가져오는 중",
    emptyTitle: "첫 링크를 위한 자리.",
    emptyBody:
      "공유할 링크를 만들거나 복구 키로 이전 브라우저의 링크를 가져오세요.",
    emptyAction: "첫 링크 만들기",
    emptyRecovery: "이미 링크가 있나요?",
    noResults: "일치하는 링크가 없어요.",
    noResultsBody: "더 짧은 검색어나 다른 상태로 찾아보세요.",
    result: "개 링크",
    loadError: "링크를 가져오지 못했어요",
    statsTitle: "이 링크가 닿은 곳.",
    statsBody: "최근 30일 열기 횟수",
    statsNote: "고유 인원이 아닌 열기 횟수예요. 일별 날짜는 UTC 기준입니다.",
    daily: "일별 열기 횟수",
    dailyTable: "일별 숫자 보기",
    date: "날짜",
    count: "열기 횟수",
    noStats: "이 기간에는 기록이 없어요. 공유한 뒤 다시 확인하세요.",
    direct: "직접 열기",
    internal: "MemoLink에서",
    unknown: "알 수 없음",
    mobile: "휴대폰",
    desktop: "컴퓨터",
    tablet: "태블릿",
    bot: "자동 접근",
  },
  es: {
    eyebrow: "El espacio de lo que compartes",
    title: "Compartidos. Y aún en tus manos.",
    body: "Encuentra un enlace, cambia su destino o consulta sus aperturas.",
    collection: "Tus enlaces",
    total: "Enlaces de esta lista",
    openings: "Aperturas totales",
    active: "Disponibles",
    other: "Pausados o caducados",
    countNote:
      "Las aperturas incluyen visitas repetidas. Los totales corresponden a esta lista.",
    device: "Este navegador",
    deviceBody:
      "Usa tu clave de recuperación para gestionar los mismos enlaces en otro navegador o dispositivo.",
    refresh: "Actualizar enlaces",
    refreshing: "Actualizando",
    sort: "Ordenar por",
    search: "Buscar nombre o destino",
    clear: "Borrar búsqueda",
    recovery: "Clave de recuperación",
    backup: "Guardar clave",
    restore: "Traer enlaces",
    backupTitle: "Una clave. Los mismos enlaces donde vayas.",
    backupBody:
      "Guarda una copia privada antes de cambiar de equipo o borrar datos. Quien tenga la clave puede gestionar estos enlaces.",
    restoreTitle: "Trae tus enlaces anteriores.",
    restoreBody:
      "Pega la clave guardada en tu navegador anterior. Aquí aparecerán sus enlaces.",
    restoreNote:
      "Este navegador usará la clave importada. Guarda la actual primero si aún la necesitas.",
    showKey: "Mostrar clave",
    hideKey: "Ocultar clave",
    keyLabel: "Clave privada de recuperación",
    invalidKey:
      "La clave parece incompleta. Copia la clave original entera y prueba de nuevo.",
    keyUnavailable:
      "No se puede leer la clave. Permite guardar datos del sitio y vuelve a abrir.",
    restoreAction: "Recuperar mis enlaces",
    restoring: "Recuperando enlaces",
    closePanel: "Cerrar detalles",
    openLink: "Abrir en una pestaña nueva",
    destination: "Destino",
    visits: "aperturas",
    viewStats: "Ver estadísticas",
    edit: "Editar destino",
    save: "Guardar destino",
    saving: "Guardando",
    qr: "Ver QR",
    remaining: "Aperturas restantes",
    expires: "Disponible hasta",
    noExpiry: "Sin caducidad",
    loading: "Buscando tus enlaces",
    emptyTitle: "Un lugar para tu primer enlace.",
    emptyBody:
      "Crea algo que compartir o usa tu clave para traer enlaces de otro navegador.",
    emptyAction: "Crear mi primer enlace",
    emptyRecovery: "¿Ya tienes enlaces?",
    noResults: "Sin enlaces coincidentes.",
    noResultsBody: "Prueba una búsqueda más corta u otro estado.",
    result: "enlaces",
    loadError: "No se pudieron cargar los enlaces",
    statsTitle: "Hasta dónde ha llegado este enlace.",
    statsBody: "Aperturas en los últimos 30 días",
    statsNote: "Aperturas, no personas únicas. Las fechas diarias usan UTC.",
    daily: "Aperturas diarias",
    dailyTable: "Ver cifras diarias",
    date: "Fecha",
    count: "Aperturas",
    noStats:
      "Aún no hay aperturas en este periodo. Comparte el enlace y vuelve.",
    direct: "Directo",
    internal: "Desde MemoLink",
    unknown: "Desconocido",
    mobile: "Móvil",
    desktop: "Ordenador",
    tablet: "Tableta",
    bot: "Automático",
  },
};
