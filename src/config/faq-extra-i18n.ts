import type { Locale } from '@/config/i18n';

type FaqSection = [string, Array<[string, string]>];

export const extraFaqSections: Record<Locale, FaqSection[]> = {
  en: [
    ['Sharing and campaigns', [
      ['Can I use the same QR code after changing a destination?', 'Yes. The QR code points to your MemoLink address, so changing the destination keeps printed and shared QR codes working.'],
      ['How should I use UTM parameters?', 'Open Smart options, add your campaign, source and medium, then create the link. MemoLink appends them safely to the destination URL.'],
      ['Can I share a link from my phone?', 'Yes. Copy the short link, download its QR code or use your device share sheet when available.'],
    ]],
    ['Troubleshooting and safety', [
      ['Why does a link say it is unavailable?', 'The owner may have paused it, its expiration rule may have been reached, or the link may have been removed.'],
      ['Why is my custom name unavailable?', 'Custom names are unique. Try a clear variation, add a campaign name or let MemoLink generate one automatically.'],
      ['What happens if I lose my recovery key?', 'MemoLink cannot recreate it. Existing links still redirect, but management access cannot be restored without the original key.'],
    ]],
  ],
  th: [
    ['การแชร์และแคมเปญ', [
      ['เมื่อเปลี่ยนลิงก์ปลายทางแล้ว ยังสามารถใช้ QR Code เดิมได้หรือไม่?', 'ได้ เนื่องจาก QR Code เชื่อมโยงกับที่อยู่ MemoLink เดิม เมื่อแก้ไขลิงก์ปลายทาง QR Code ที่พิมพ์หรือเผยแพร่ไว้ก่อนหน้าจึงยังคงใช้งานได้ตามปกติ'],
      ['ควรตั้งค่าแคมเปญ UTM อย่างไร?', 'เปิดเมนู “แคมเปญ UTM” แล้วระบุชื่อแคมเปญ แหล่งที่มา และช่องทางให้สอดคล้องกับแผนการสื่อสาร MemoLink จะเพิ่มข้อมูลดังกล่าวในลิงก์ปลายทางโดยอัตโนมัติ เพื่อให้สามารถวิเคราะห์ผลของแต่ละช่องทางได้อย่างเป็นระบบ'],
      ['สามารถแชร์ลิงก์จากโทรศัพท์มือถือได้หรือไม่?', 'ได้ คุณสามารถคัดลอกลิงก์ ดาวน์โหลด QR Code หรือใช้เมนูแชร์ของอุปกรณ์ได้ ทั้งนี้ ตัวเลือกที่แสดงอาจแตกต่างกันตามระบบปฏิบัติการและเบราว์เซอร์'],
    ]],
    ['การแก้ปัญหาและความปลอดภัย', [
      ['เหตุใดจึงไม่สามารถเปิดลิงก์ได้?', 'ลิงก์อาจถูกหยุดใช้งาน ถูกลบ หมดอายุตามวันและเวลาที่กำหนด หรือมีจำนวนการเข้าชมครบตามเงื่อนไขแล้ว หากจำเป็น กรุณาติดต่อผู้ส่งลิงก์เพื่อขอลิงก์ใหม่'],
      ['เหตุใดจึงไม่สามารถใช้ชื่อลิงก์ที่กำหนดเองได้?', 'ชื่อลิงก์ต้องไม่ซ้ำกับชื่อที่มีอยู่และต้องเป็นไปตามรูปแบบที่ระบบรองรับ กรุณาปรับชื่อให้แตกต่าง เพิ่มคำที่เกี่ยวข้องกับแคมเปญ หรือเลือกใช้ชื่อที่ระบบสร้างให้อัตโนมัติ'],
      ['จะเกิดอะไรขึ้นหาก Recovery key สูญหาย?', 'MemoLink ไม่สามารถออก Recovery key เดิมทดแทนได้ ลิงก์ที่สร้างไว้จะยังนำผู้เข้าชมไปยังปลายทางได้ตามปกติ แต่จะไม่สามารถกู้คืนสิทธิ์ในการแก้ไขหรือจัดการลิงก์ได้ จึงควรสำรองคีย์ไว้ในที่ปลอดภัย'],
    ]],
  ],
  zh: [
    ['分享与推广活动', [
      ['更改目标地址后还能使用原来的二维码吗？', '可以。二维码指向同一个 MemoLink 地址，因此已打印或分享的二维码仍然有效。'],
      ['如何使用 UTM 参数？', '打开智能选项，填写活动、来源和媒介，然后创建链接。MemoLink 会安全地将参数附加到目标网址。'],
      ['可以用手机分享链接吗？', '可以。你可以复制短链接、下载二维码，或在支持时使用设备分享菜单。'],
    ]],
    ['故障排除与安全', [
      ['为什么链接显示不可用？', '链接可能被所有者暂停、已达到到期条件，或已被删除。'],
      ['为什么自定义名称不可用？', '自定义名称必须唯一。请尝试清晰的变体、添加活动名称，或让 MemoLink 自动生成。'],
      ['丢失恢复密钥会怎样？', 'MemoLink 无法重新创建密钥。链接仍可跳转，但没有原密钥就无法恢复管理权限。'],
    ]],
  ],
  ja: [
    ['共有とキャンペーン', [
      ['リンク先を変更しても同じQRコードを使えますか？', 'はい。QRコードは同じMemoLinkアドレスを指すため、印刷・共有済みのQRコードも引き続き使えます。'],
      ['UTMパラメータはどう使いますか？', 'スマートオプションを開き、キャンペーン・参照元・メディアを入力してリンクを作成します。MemoLinkが安全にURLへ追加します。'],
      ['スマートフォンから共有できますか？', 'はい。短縮リンクのコピー、QRコードのダウンロード、対応端末の共有メニューを利用できます。'],
    ]],
    ['トラブルシューティングと安全性', [
      ['リンクが利用できないのはなぜですか？', '所有者が一時停止した、期限条件に達した、またはリンクが削除された可能性があります。'],
      ['カスタム名が使えないのはなぜですか？', 'カスタム名は重複できません。別の表現やキャンペーン名を加えるか、自動生成をお試しください。'],
      ['復旧キーを失うとどうなりますか？', 'MemoLinkは復旧キーを再発行できません。転送は続きますが、元のキーがなければ管理権限を復元できません。'],
    ]],
  ],
  ko: [
    ['공유 및 캠페인', [
      ['목적지를 바꾼 뒤에도 같은 QR 코드를 쓸 수 있나요?', '네. QR 코드는 같은 MemoLink 주소를 가리키므로 이미 인쇄하거나 공유한 QR 코드도 계속 작동합니다.'],
      ['UTM 매개변수는 어떻게 사용하나요?', '스마트 옵션을 열고 캠페인, 소스, 매체를 입력한 뒤 링크를 만드세요. MemoLink가 목적지 URL에 안전하게 추가합니다.'],
      ['휴대폰에서 링크를 공유할 수 있나요?', '네. 단축 링크를 복사하거나 QR 코드를 내려받고, 지원되는 경우 기기 공유 메뉴를 사용할 수 있습니다.'],
    ]],
    ['문제 해결 및 안전', [
      ['링크가 사용할 수 없다고 표시되는 이유는 무엇인가요?', '소유자가 일시 중지했거나 만료 조건에 도달했거나 링크가 삭제되었을 수 있습니다.'],
      ['사용자 지정 이름을 사용할 수 없는 이유는 무엇인가요?', '사용자 지정 이름은 고유해야 합니다. 다른 표현이나 캠페인 이름을 추가하거나 자동 생성을 사용해 보세요.'],
      ['복구 키를 잃어버리면 어떻게 되나요?', 'MemoLink는 복구 키를 다시 만들 수 없습니다. 리디렉션은 계속되지만 원래 키 없이는 관리 권한을 복원할 수 없습니다.'],
    ]],
  ],,
  es:[
    ['Compartir y campañas',[
      ['¿Puedo usar el mismo código QR después de cambiar el destino?','Sí. El QR apunta a la misma dirección MemoLink, por lo que los códigos impresos o compartidos continúan funcionando.'],
      ['¿Cómo debo usar los parámetros UTM?','Abre las opciones de campaña, añade campaña, fuente y medio, y crea el enlace. MemoLink los incorpora de forma segura.'],
      ['¿Puedo compartir desde el teléfono?','Sí. Puedes copiar el enlace, descargar el QR o usar el menú para compartir del dispositivo.'],
    ]],
    ['Solución de problemas y seguridad',[
      ['¿Por qué aparece como no disponible?','El propietario puede haberlo pausado, puede haber caducado o alcanzado su límite, o haber sido eliminado.'],
      ['¿Por qué no está disponible mi nombre personalizado?','Los nombres son únicos. Prueba una variación clara, añade el nombre de la campaña o usa uno generado automáticamente.'],
      ['¿Qué pasa si pierdo la clave de recuperación?','MemoLink no puede recrearla. Los enlaces continúan funcionando, pero no podrás recuperar su gestión sin la clave original.'],
    ]],
  ]

};
