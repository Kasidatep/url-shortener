'use client';
import Link from 'next/link';
import PreferenceControls from './PreferenceControls';
import {usePreferences} from './PreferencesProvider';
import {getPageMessages} from '@/config/page-i18n';
import MemoLinkLogo from './MemoLinkLogo';
export default function AppHeader({active}:{active?:'home'|'links'|'faq'}){
 const {locale}=usePreferences(); const t=getPageMessages(locale);
 return <header className="app-header"><a className="skip-content" href="#main-content">{{en:'Skip to content',th:'ข้ามไปเนื้อหา',zh:'跳至内容',ja:'本文へ移動',ko:'본문으로 건너뛰기',es:'Ir al contenido'}[locale]}</a><div className="app-header-top"><MemoLinkLogo/><PreferenceControls/></div><nav className="primary-navigation" aria-label="MemoLink">{([{id:'home',href:'/',label:t.navCreate},{id:'links',href:'/manage',label:t.navLinks},{id:'faq',href:'/faq',label:t.navFaq}] as const).map(item=><Link key={item.id} href={item.href} aria-current={active===item.id?'page':undefined}>{item.label}</Link>)}</nav></header>;
}
