'use client';

import Link from 'next/link';
import {ArrowUpRightIcon} from '@heroicons/react/24/outline';
import {studioMessages} from '@/config/studio-i18n';
import { usePreferences } from './PreferencesProvider';

const labels = {
  en:{help:'Help',privacy:'Privacy',terms:'Terms',product:'A MemoLab product'},
  th:{help:'ช่วยเหลือ',privacy:'ความเป็นส่วนตัว',terms:'ข้อกำหนด',product:'ผลิตภัณฑ์จาก MemoLab'},
  zh:{help:'帮助',privacy:'隐私',terms:'条款',product:'MemoLab 产品'},
  ja:{help:'ヘルプ',privacy:'プライバシー',terms:'利用規約',product:'MemoLab プロダクト'},
  ko:{help:'도움말',privacy:'개인정보',terms:'이용약관',product:'MemoLab 제품'},
  es:{help:'Ayuda',privacy:'Privacidad',terms:'Términos',product:'Un producto de MemoLab'},
};

export default function AppFooter(){
  const {locale}=usePreferences();
  const studio=studioMessages[locale];
  const text=labels[locale];
  return <footer className="site-footer"><div className="footer-identity"><div><strong>{studio.footerLine}</strong><p>{studio.footerBody}</p></div><Link href="/#url" className="ui-button secondary">{studio.footerAction}<ArrowUpRightIcon aria-hidden="true"/></Link></div><div className="footer-bottom"><span>MemoLink · {text.product}</span><nav aria-label={text.help}><Link href="/faq">{text.help}</Link><Link href="/privacy">{text.privacy}</Link><Link href="/terms">{text.terms}</Link><a href="https://memolab.me">MemoLab ↗</a></nav></div></footer>;
}
