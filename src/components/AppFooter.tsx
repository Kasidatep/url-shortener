'use client';

import Link from 'next/link';
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
  const text=labels[locale];
  return <footer><strong>MemoLink</strong><span><Link href="/faq">{text.help}</Link><a href="https://memolab.me/privacy">{text.privacy}</a><a href="https://memolab.me/terms">{text.terms}</a><a href="https://memolab.me">{text.product}</a></span></footer>;
}
