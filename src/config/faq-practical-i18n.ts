import type { Locale } from "./i18n";

// Stable IDs keep shared answers readable after changing language.
const topics = [
  ["edit-destination", 2],
  ["print-qr", 4],
  ["send-password", 5],
  ["trusted-destination", 5],
  ["visits-not-people", 3],
  ["browser-data", 2],
  ["wrong-destination", 2],
  ["slow-link", 5],
  ["in-app-browser", 4],
  ["compare-campaigns", 3],
  ["choose-expiry", 1],
  ["reduce-motion", 5],
] as const;

const answers: Record<Locale, Array<[string, string]>> = {
  th: [
    [
      "แก้ปลายทางได้ไหม โดยไม่ต้องส่งลิงก์ใหม่?",
      "ได้ เปิด “ลิงก์ของฉัน” เลือกลิงก์ แล้วแก้ไขปลายทางและบันทึก ที่อยู่ลิงก์สั้นและ QR Code เดิมยังใช้ได้ ลองเปิดอีกครั้งหลังบันทึก เพื่อให้แน่ใจว่าไปยังหน้าที่ต้องการ",
    ],
    [
      "ก่อนพิมพ์ QR Code ลงโปสเตอร์ ควรเช็กอะไรบ้าง?",
      "ลองสแกนไฟล์ที่จะพิมพ์ด้วยโทรศัพท์จริง ให้มีขอบว่างรอบ QR และใช้สีที่ตัดกันชัด ตรวจว่าลิงก์ยังเปิดอยู่ ไม่มีวันหมดอายุหรือจำนวนคลิกที่สั้นเกินงาน และเก็บคีย์กู้คืนไว้สำหรับเปลี่ยนปลายทางภายหลัง",
    ],
    [
      "ส่งรหัสผ่านไปพร้อมลิงก์ได้ไหม?",
      "ผู้รับต้องมีทั้งลิงก์และรหัสผ่าน ถ้าต้องการจำกัดการเข้าถึง ควรส่งรหัสผ่านผ่านอีกช่องทางหนึ่ง เช่น ส่งลิงก์ทางอีเมลแล้วแจ้งรหัสผ่านทางข้อความ หลีกเลี่ยงใส่รหัสผ่านไว้ในชื่อลิงก์หรือข้อความสาธารณะ",
    ],
    [
      "เห็นชื่อ MemoLink แล้วเชื่อถือปลายทางได้เลยไหม?",
      "ควรตรวจสอบผู้ส่งและเว็บไซต์ปลายทางด้วย MemoLink ย่อที่อยู่และตั้งเงื่อนไขการเข้าถึงได้ แต่ไม่ได้รับรองเนื้อหาทุกเว็บไซต์ หากพบหน้าที่ขอข้อมูลส่วนตัวหรือชำระเงินโดยไม่คาดคิด ให้หยุดและตรวจสอบกับผู้ส่งก่อน",
    ],
    [
      "จำนวนคลิกเท่ากับจำนวนคนหรือเปล่า?",
      "ไม่เท่ากัน คนเดียวอาจเปิดลิงก์หลายครั้ง และระบบไม่สร้างโปรไฟล์เพื่อแยกผู้เข้าชมแต่ละคน ใช้ยอดคลิกดูแนวโน้มการเปิดลิงก์ แทนการตีความว่าเป็นจำนวนคนที่ไม่ซ้ำกัน",
    ],
    [
      "ล้างข้อมูลเบราว์เซอร์หรือใช้โหมดส่วนตัวแล้ว ลิงก์จะหายไหม?",
      "ลิงก์ที่ยังใช้งานได้ยังอยู่บนระบบ แต่คีย์ที่ให้สิทธิ์จัดการอาจหายจากเบราว์เซอร์ สำรองคีย์จาก “ลิงก์ของฉัน” ก่อนล้างข้อมูลหรือปิดโหมดส่วนตัว แล้วใช้คีย์เดิมกู้คืนบนเบราว์เซอร์ที่ต้องการ",
    ],
    [
      "เปิดแล้วไปผิดหน้า ควรแก้ตรงไหน?",
      "ตรวจที่อยู่ปลายทางใน “ลิงก์ของฉัน” ว่าเป็นหน้าที่ต้องการ รวมถึงค่าหลังเครื่องหมาย ? และ # แก้ไขแล้วบันทึก จากนั้นลองเปิดลิงก์สั้นอีกครั้ง หากคุณเป็นผู้รับลิงก์ ให้แจ้งเจ้าของลิงก์เพื่อแก้ปลายทาง",
    ],
    [
      "ลิงก์ค้างที่หน้ากำลังเปิด ควรทำอย่างไร?",
      "เช็กการเชื่อมต่ออินเทอร์เน็ตก่อน หากเปิดจากแอปแชต ลองเปิดด้วยเบราว์เซอร์ปกติ เมื่อระบบแจ้งว่าเปิดไม่สำเร็จ ให้กด “ลองอีกครั้ง” ถ้ายังติดอยู่ ให้ส่งที่อยู่ลิงก์สั้นให้เจ้าของตรวจสอบ โดยไม่ส่งรหัสผ่านหรือคีย์กู้คืน",
    ],
    [
      "เปิดจาก LINE หรือแอปแชตแล้วใช้งานต่างจากเบราว์เซอร์ไหม?",
      "บางแอปเปิดเว็บในเบราว์เซอร์ของตัวเอง จึงอาจมีข้อจำกัดเรื่องดาวน์โหลด แชร์ หรือข้อมูลที่เก็บในเบราว์เซอร์ หากติดขัด ให้เลือกเปิดใน Safari, Chrome หรือเบราว์เซอร์ที่คุณใช้ประจำ โดยเฉพาะเมื่อต้องกลับมาจัดการลิงก์",
    ],
    [
      "อยากเทียบผลแต่ละช่องทาง ควรสร้างลิงก์อย่างไร?",
      "สร้างลิงก์แยกสำหรับแต่ละช่องทาง เช่น โปสเตอร์ อีเมล และโซเชียล แล้วตั้งชื่อให้แยกได้ คุณจะเทียบยอดเปิดใน MemoLink ได้ง่ายขึ้น ถ้าเว็บไซต์ปลายทางมีระบบวิเคราะห์ที่รองรับ UTM ให้เพิ่ม source, medium และ campaign สำหรับอ่านผลที่ปลายทางด้วย",
    ],
    [
      "ควรเลือกหมดอายุตามวัน หรือจำนวนคลิก?",
      "เลือกวันและเวลาสำหรับงานที่มีวันสิ้นสุดแน่นอน หรือเลือกจำนวนคลิกเมื่อต้องการจำกัดจำนวนการเปิด MemoLink ใช้เงื่อนไขหมดอายุแบบเดียวต่อหนึ่งลิงก์ การจำกัดคลิกไม่ใช่การจำกัดจำนวนคน เพราะคนเดิมเปิดซ้ำได้",
    ],
    [
      "ไม่อยากเห็นภาพเคลื่อนไหว ตั้งค่าได้ไหม?",
      "ได้ เปิดการตั้งค่าลดการเคลื่อนไหวของอุปกรณ์หรือระบบปฏิบัติการ MemoLink จะลดหรือหยุดแอนิเมชัน 3D โดยยังแสดงขั้นตอนและให้ใช้งานทุกส่วนได้ตามปกติ",
    ],
  ],
  en: [
    [
      "Can I change the destination without sending a new link?",
      "Yes. In My links, edit the destination and save. The short address and its QR code stay the same. Open the link again after saving to check that it reaches the page you intended.",
    ],
    [
      "What should I check before printing a QR code?",
      "Scan the actual artwork with a phone. Leave clear space around the QR and use strong contrast. Check that the link is active and that its date or visit limit suits the event. Keep your recovery key so you can update the destination later.",
    ],
    [
      "Should I send the password with the link?",
      "The recipient needs both. For more controlled access, send the password through a separate channel, such as a message after emailing the link. Keep passwords out of custom link names and public posts.",
    ],
    [
      "Does the MemoLink name mean the destination is trustworthy?",
      "Check the sender and destination too. MemoLink shortens addresses and applies access settings; it does not endorse every destination. If a page unexpectedly requests personal details or payment, stop and confirm it with the sender.",
    ],
    [
      "Are clicks the same as unique visitors?",
      "No. One person can open a link more than once, and MemoLink does not build individual visitor profiles. Read the count as a trend in link openings, rather than a count of different people.",
    ],
    [
      "What happens after clearing browser data or using private browsing?",
      "Active links remain on the service, but your browser may lose the key needed to manage them. Save the recovery key from My links before clearing data or closing a private session, then restore it in your preferred browser.",
    ],
    [
      "The link opens the wrong page. What should I check?",
      "Check the destination in My links, including anything after ? and #. Edit it, save and open the short link again. If you received the link from someone else, ask its owner to update the destination.",
    ],
    [
      "What if a link gets stuck while opening?",
      "Check your internet connection. If you opened it inside a chat app, try a regular browser. Use Retry when MemoLink reports a failure. If it still fails, send the short address to its owner, without sharing passwords or recovery keys.",
    ],
    [
      "Do chat apps work differently from a regular browser?",
      "Some apps open pages in their own browser, which can limit downloads, sharing or saved browser data. Try Safari, Chrome or your usual browser if something fails, especially when you need to manage the link again later.",
    ],
    [
      "How can I compare different sharing channels?",
      "Create a separate link for each channel, such as a poster, email and social post, with names you can tell apart. Compare their opening counts in MemoLink. If your destination analytics supports UTM, add source, medium and campaign there too.",
    ],
    [
      "Should I choose an expiry date or a visit limit?",
      "Use a date and time for a fixed deadline, or a click limit to cap link openings. MemoLink uses one expiry rule per link. A click limit is not a people limit, because the same person can open a link again.",
    ],
    [
      "Can I reduce the animations?",
      "Yes. Enable Reduce Motion in your device or operating system settings. MemoLink reduces or stops its 3D animation while keeping the steps and all controls usable.",
    ],
  ],
  zh: [
    [
      "可以更改目标地址而不用重新发送链接吗？",
      "可以。在“我的链接”中修改目标并保存，短地址和二维码保持不变。保存后再次打开，确认进入正确页面。",
    ],
    [
      "打印二维码前要检查什么？",
      "用手机扫描实际印刷文件，在二维码周围留白并使用明显的色彩对比。确认链接处于启用状态，到期时间或访问上限适合活动，并保存恢复密钥以便以后修改目标。",
    ],
    [
      "密码应该和链接一起发送吗？",
      "接收者需要两者。若要限制访问，建议通过另一渠道发送密码，例如发出链接邮件后用消息通知密码。不要将密码放入自定义名称或公开帖子。",
    ],
    [
      "MemoLink 的名称代表目标网站可信吗？",
      "还应核实发送者和目标网站。MemoLink 缩短地址并应用访问设置，不为所有目标内容背书。如果页面意外要求个人信息或付款，请先向发送者确认。",
    ],
    [
      "点击量等于独立访客人数吗？",
      "不等于。同一个人可以多次打开，MemoLink 不建立个人访客档案。请将点击量理解为打开链接的趋势，而不是不同访客的人数。",
    ],
    [
      "清除浏览器数据或使用隐私模式会怎样？",
      "有效链接仍保留在服务上，但浏览器可能丢失管理密钥。在清除数据或关闭隐私会话前从“我的链接”保存恢复密钥，然后在常用浏览器中恢复。",
    ],
    [
      "链接进入了错误页面，该检查什么？",
      "在“我的链接”中核对目标地址，包括 ? 和 # 后的部分。修改保存后再次打开短链接。如果链接来自别人，请让所有者修改目标。",
    ],
    [
      "链接一直停在打开页面怎么办？",
      "先检查网络。若从聊天应用内打开，请尝试普通浏览器。系统提示失败后再点重试。如果仍失败，将短地址发给所有者，不要发送密码或恢复密钥。",
    ],
    [
      "聊天应用的浏览器有何不同？",
      "某些应用使用自己的浏览器，可能限制下载、分享或浏览器存储。遇到问题时尝试 Safari、Chrome 或常用浏览器，尤其是以后需要管理链接时。",
    ],
    [
      "如何比较不同分享渠道？",
      "为海报、邮件和社交帖子分别创建链接，并使用易区分的名称。在 MemoLink 比较打开量；若目标网站的分析工具支持 UTM，再添加 source、medium 和 campaign。",
    ],
    [
      "应该选到期日期还是点击上限？",
      "固定截止时间使用日期和时间，限制打开次数则使用点击上限。每个链接只能使用一种到期规则。点击上限不是人数上限，同一个人可以重复打开。",
    ],
    [
      "可以减少动画吗？",
      "可以。在设备或操作系统中开启“减少动态效果”。MemoLink 会减少或停止 3D 动画，步骤说明和所有控件仍可使用。",
    ],
  ],
  ja: [
    [
      "新しいリンクを送らずにリンク先を変更できますか？",
      "はい。「マイリンク」でリンク先を編集して保存します。短縮URLとQRコードは変わりません。保存後に再度開き、目的のページに移動するか確認してください。",
    ],
    [
      "QRコードを印刷する前に何を確認しますか？",
      "実際の印刷データをスマートフォンで読み取ってください。周囲に余白を取り、色のコントラストを確保します。リンクの有効状態と期限・回数がイベントに適しているか確認し、後で変更できるよう復旧キーを保存しましょう。",
    ],
    [
      "パスワードをリンクと一緒に送るべきですか？",
      "受信者には両方が必要です。アクセスを限定したい場合は、リンクをメール、パスワードをメッセージなど別の経路で送ります。カスタム名や公開投稿にパスワードを含めないでください。",
    ],
    [
      "MemoLinkの名前があればリンク先を信頼できますか？",
      "送信者とリンク先も確認してください。MemoLinkはURLを短縮しアクセス設定を適用しますが、すべてのサイト内容を保証しません。予期せず個人情報や支払いを求められたら、送信者に確認しましょう。",
    ],
    [
      "クリック数は訪問者数と同じですか？",
      "いいえ。同じ人が何度も開くことがあり、MemoLinkは個人の訪問者プロフィールを作成しません。異なる人数ではなく、リンクが開かれた傾向として確認してください。",
    ],
    [
      "ブラウザーのデータ削除やプライベートモードではどうなりますか？",
      "有効なリンクはサービスに残りますが、ブラウザーの管理キーが失われる場合があります。データ削除やプライベートモード終了前に「マイリンク」で復旧キーを保存し、通常のブラウザーで復元してください。",
    ],
    [
      "違うページが開くときは何を確認しますか？",
      "「マイリンク」でリンク先を確認し、? と # 以降の内容も見てください。編集・保存後に短縮URLを再度開きます。他の人から受け取ったリンクなら、所有者に変更を依頼してください。",
    ],
    [
      "リンクを開いている画面で止まったら？",
      "接続を確認してください。チャットアプリ内なら通常のブラウザーで試します。失敗と表示されたら再試行してください。改善しない場合は短縮URLを所有者に知らせ、パスワードや復旧キーは送らないでください。",
    ],
    [
      "チャットアプリ内と通常のブラウザーは違いますか？",
      "独自のブラウザーを使うアプリでは、ダウンロード、共有、保存データに制限がある場合があります。困ったらSafari、Chrome、普段のブラウザーで試してください。後で管理する場合も同様です。",
    ],
    [
      "共有先ごとの効果を比較するには？",
      "ポスター、メール、SNSごとに別のリンクを作り、区別できる名前を付けます。MemoLinkで開かれた回数を比較できます。リンク先の分析ツールがUTM対応ならsource、medium、campaignも設定してください。",
    ],
    [
      "期限日時とクリック上限、どちらを選びますか？",
      "締切が決まっている場合は日時、開く回数を制限したい場合はクリック上限を選びます。1つのリンクには1つの期限ルールを適用します。同じ人も繰り返し開けるため、クリック上限は人数の上限ではありません。",
    ],
    [
      "アニメーションを減らせますか？",
      "はい。端末やOSで「視差効果を減らす」などの設定を有効にします。MemoLinkは3Dアニメーションを減らすか停止し、説明と操作はそのまま利用できます。",
    ],
  ],
  ko: [
    [
      "새 링크를 보내지 않고 목적지를 바꿀 수 있나요?",
      "네. 내 링크에서 목적지를 수정하고 저장하세요. 단축 주소와 QR 코드는 그대로예요. 저장 후 다시 열어 원하는 페이지로 이동하는지 확인하세요.",
    ],
    [
      "QR 코드를 인쇄하기 전에 무엇을 확인하나요?",
      "실제 인쇄 파일을 휴대폰으로 스캔하세요. QR 주위에 여백을 두고 색상 대비를 충분히 확보하세요. 링크가 활성 상태인지, 만료일이나 클릭 제한이 행사에 맞는지 확인하고 나중에 수정할 복구 키를 보관하세요.",
    ],
    [
      "비밀번호를 링크와 함께 보내도 되나요?",
      "받는 사람은 둘 다 필요해요. 접근을 제한하려면 이메일로 링크를 보낸 뒤 메시지로 비밀번호를 알리는 등 다른 경로를 사용하세요. 사용자 지정 이름이나 공개 글에 비밀번호를 넣지 마세요.",
    ],
    [
      "MemoLink 이름이 있으면 목적지를 믿어도 되나요?",
      "보낸 사람과 목적지도 확인하세요. MemoLink는 주소를 줄이고 접근 설정을 적용하지만 모든 사이트 내용을 보증하지 않아요. 예상치 못한 개인정보나 결제 요청이 나오면 멈추고 보낸 사람에게 확인하세요.",
    ],
    [
      "클릭 수가 고유 방문자 수인가요?",
      "아니요. 한 사람이 여러 번 열 수 있으며 MemoLink는 개별 방문자 프로필을 만들지 않아요. 서로 다른 사람 수가 아니라 링크를 연 추세로 읽어 주세요.",
    ],
    [
      "브라우저 데이터를 지우거나 비공개 모드를 쓰면 어떻게 되나요?",
      "활성 링크는 서비스에 남지만 관리 키가 브라우저에서 사라질 수 있어요. 데이터 삭제나 비공개 세션 종료 전에 내 링크에서 복구 키를 저장하고 원하는 브라우저에서 복원하세요.",
    ],
    [
      "잘못된 페이지가 열리면 어디를 확인하나요?",
      "내 링크에서 목적지 주소와 ? 및 # 뒤의 내용을 확인하세요. 수정하고 저장한 뒤 단축 링크를 다시 열어 보세요. 받은 링크라면 소유자에게 목적지를 바꿔 달라고 요청하세요.",
    ],
    [
      "링크 여는 화면에서 멈추면 어떻게 하나요?",
      "인터넷 연결을 확인하세요. 채팅 앱 안이라면 일반 브라우저로 시도하세요. 실패 안내가 뜨면 다시 시도하세요. 계속 실패하면 단축 주소를 소유자에게 알리되 비밀번호나 복구 키는 보내지 마세요.",
    ],
    [
      "채팅 앱과 일반 브라우저는 다른가요?",
      "자체 브라우저를 쓰는 앱에서는 다운로드, 공유, 브라우저 저장 데이터가 제한될 수 있어요. 문제가 생기면 Safari, Chrome 또는 평소 브라우저를 사용하세요. 나중에 링크를 관리할 때도 유용해요.",
    ],
    [
      "공유 채널별 결과를 비교하려면 어떻게 하나요?",
      "포스터, 이메일, 소셜 게시물마다 별도 링크를 만들고 구분 가능한 이름을 정하세요. MemoLink에서 열린 횟수를 비교할 수 있어요. 목적지 분석 도구가 UTM을 지원하면 source, medium, campaign도 추가하세요.",
    ],
    [
      "만료일과 클릭 제한 중 무엇을 고르나요?",
      "정해진 마감에는 날짜와 시간을, 열기 횟수를 제한하려면 클릭 수를 선택하세요. 링크당 하나의 만료 규칙을 사용해요. 같은 사람도 다시 열 수 있으므로 클릭 제한은 사람 수 제한이 아니에요.",
    ],
    [
      "애니메이션을 줄일 수 있나요?",
      "네. 기기나 운영체제에서 동작 줄이기를 켜세요. MemoLink는 3D 애니메이션을 줄이거나 멈추며 단계 설명과 모든 기능은 그대로 사용할 수 있어요.",
    ],
  ],
  es: [
    [
      "¿Puedo cambiar el destino sin enviar otro enlace?",
      "Sí. Edita el destino en Mis enlaces y guarda. La dirección corta y el QR no cambian. Abre el enlace después para comprobar que lleva a la página correcta.",
    ],
    [
      "¿Qué reviso antes de imprimir un QR?",
      "Escanea el diseño real con un teléfono. Deja espacio alrededor del QR y usa un contraste claro. Comprueba que el enlace esté activo y que la fecha o el límite sirvan para el evento. Guarda la clave de recuperación para cambiar el destino después.",
    ],
    [
      "¿Envío la contraseña junto al enlace?",
      "La persona necesita ambos. Para limitar el acceso, envía la contraseña por otro canal, por ejemplo un mensaje después de enviar el enlace por correo. No la pongas en el nombre personalizado ni en publicaciones públicas.",
    ],
    [
      "¿El nombre MemoLink garantiza un destino fiable?",
      "Comprueba también quién lo envía y el destino. MemoLink acorta direcciones y aplica ajustes de acceso; no avala todos los sitios. Si una página pide datos personales o un pago inesperado, confirma con quien la envió.",
    ],
    [
      "¿Los clics equivalen a visitantes únicos?",
      "No. Una persona puede abrir el enlace varias veces y MemoLink no crea perfiles individuales. Interpreta los clics como una tendencia de aperturas, no como un número de personas distintas.",
    ],
    [
      "¿Qué ocurre si borro datos o uso navegación privada?",
      "Los enlaces activos permanecen en el servicio, pero el navegador puede perder la clave de gestión. Guarda la clave de recuperación desde Mis enlaces antes de borrar datos o cerrar la sesión privada, y restáurala en tu navegador habitual.",
    ],
    [
      "El enlace abre otra página. ¿Qué reviso?",
      "Revisa el destino en Mis enlaces, incluido lo que sigue a ? y #. Edítalo, guarda y abre el enlace corto otra vez. Si lo recibiste de otra persona, pide al propietario que actualice el destino.",
    ],
    [
      "¿Qué hago si el enlace se queda abriendo?",
      "Comprueba la conexión. Si lo abriste dentro de un chat, prueba un navegador normal. Usa Reintentar cuando se indique un error. Si sigue fallando, envía la dirección corta al propietario, sin contraseñas ni claves de recuperación.",
    ],
    [
      "¿Los chats funcionan distinto de un navegador normal?",
      "Algunas aplicaciones usan su propio navegador y pueden limitar descargas, compartir o guardar datos. Prueba Safari, Chrome o tu navegador habitual si algo falla, especialmente para volver a gestionar enlaces.",
    ],
    [
      "¿Cómo comparo canales de difusión?",
      "Crea un enlace distinto para cada canal, como cartel, correo y redes, con nombres fáciles de reconocer. Compara las aperturas en MemoLink. Si la analítica del destino admite UTM, añade source, medium y campaign también.",
    ],
    [
      "¿Elijo una fecha de caducidad o un límite de clics?",
      "Usa fecha y hora para un plazo fijo, o un límite para restringir aperturas. MemoLink aplica una sola regla de caducidad por enlace. El límite de clics no limita personas: alguien puede abrirlo varias veces.",
    ],
    [
      "¿Puedo reducir las animaciones?",
      "Sí. Activa Reducir movimiento en el dispositivo o sistema operativo. MemoLink reduce o detiene la animación 3D y mantiene los pasos y todos los controles disponibles.",
    ],
  ],
};

export function getPracticalFaq(locale: Locale) {
  return topics.map(([id, category], index) => ({
    id,
    category,
    question: answers[locale][index][0],
    answer: answers[locale][index][1],
  }));
}
