import type { Locale } from '@/config/i18n';

type DialogCopy = {
  deleteTitle: string; deleteBody: string; cancel: string; deleted: string;
  copied: string; updated: string; recoveryCopied: string; restored: string;
  actionFailed: string; notificationsLabel: string; dismiss: string;
};

export const dialogMessages: Record<Locale, DialogCopy> = {
  en: { deleteTitle: 'Delete this short link?', deleteBody: 'This removes the link and its analytics. This action cannot be undone.', cancel: 'Cancel', deleted: 'Link deleted', copied: 'Short link copied', updated: 'Link updated', recoveryCopied: 'Recovery key copied', restored: 'Links restored on this device', actionFailed: 'Something went wrong. Please try again.', notificationsLabel: 'Notifications', dismiss: 'Dismiss notification' },
  th: { deleteTitle: 'ลบลิงก์สั้นนี้หรือไม่', deleteBody: 'ลิงก์และข้อมูลวิเคราะห์จะถูกลบถาวรและไม่สามารถย้อนกลับได้', cancel: 'ยกเลิก', deleted: 'ลบลิงก์แล้ว', copied: 'คัดลอกลิงก์สั้นแล้ว', updated: 'อัปเดตลิงก์แล้ว', recoveryCopied: 'คัดลอกคีย์กู้คืนแล้ว', restored: 'กู้คืนลิงก์บนอุปกรณ์นี้แล้ว', actionFailed: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', notificationsLabel: 'การแจ้งเตือน', dismiss: 'ปิดการแจ้งเตือน' },
  zh: { deleteTitle: '删除此短链接？', deleteBody: '链接及其分析数据将被永久删除，且无法撤销。', cancel: '取消', deleted: '链接已删除', copied: '短链接已复制', updated: '链接已更新', recoveryCopied: '恢复密钥已复制', restored: '已在此设备恢复链接', actionFailed: '出现问题，请重试。', notificationsLabel: '通知', dismiss: '关闭通知' },
  ja: { deleteTitle: 'この短縮リンクを削除しますか？', deleteBody: 'リンクと分析データは完全に削除され、元に戻せません。', cancel: 'キャンセル', deleted: 'リンクを削除しました', copied: '短縮リンクをコピーしました', updated: 'リンクを更新しました', recoveryCopied: '復旧キーをコピーしました', restored: 'この端末にリンクを復元しました', actionFailed: '問題が発生しました。もう一度お試しください。', notificationsLabel: '通知', dismiss: '通知を閉じる' },
  ko: { deleteTitle: '이 단축 링크를 삭제할까요?', deleteBody: '링크와 분석 데이터가 영구 삭제되며 되돌릴 수 없습니다.', cancel: '취소', deleted: '링크를 삭제했습니다', copied: '단축 링크를 복사했습니다', updated: '링크를 업데이트했습니다', recoveryCopied: '복구 키를 복사했습니다', restored: '이 기기에 링크를 복원했습니다', actionFailed: '문제가 발생했습니다. 다시 시도해 주세요.', notificationsLabel: '알림', dismiss: '알림 닫기' },,
  es:{deleteTitle:'¿Eliminar este enlace corto?',deleteBody:'Se eliminarán el enlace y sus análisis de forma permanente. Esta acción no se puede deshacer.',cancel:'Cancelar',deleted:'Enlace eliminado',copied:'Enlace corto copiado',updated:'Enlace actualizado',recoveryCopied:'Clave de recuperación copiada',restored:'Enlaces restaurados en este dispositivo',actionFailed:'Algo salió mal. Inténtalo de nuevo.',notificationsLabel:'Notificaciones',dismiss:'Cerrar notificación'}

};
