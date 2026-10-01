'use client';
import {useMemo,useState} from 'react';
import AppHeader from '@/components/AppHeader';
import SearchInput from '@/components/ui/SearchInput';
import FAQItem from '@/components/help/FAQItem';
import HelpCategoryNav from '@/components/help/HelpCategoryNav';
import {usePreferences} from '@/components/PreferencesProvider';
import {getPageMessages} from '@/config/page-i18n';
import {extraFaqSections} from '@/config/faq-extra-i18n';
import {moreFaqSections} from '@/config/faq-more-i18n';
import {experienceMessages} from '@/config/experience-i18n';
import {utilityMessages} from '@/config/utility-i18n';
const categoryNames={en:['All','Create','Manage','Analytics','Share','Safety'],th:['ทั้งหมด','สร้างลิงก์','จัดการ','สถิติ','แชร์','ความปลอดภัย'],zh:['全部','创建','管理','统计','分享','安全'],ja:['すべて','作成','管理','分析','共有','安全'],ko:['전체','만들기','관리','통계','공유','보안'],es:['Todo','Crear','Gestionar','Estadísticas','Compartir','Seguridad']};
export default function FaqPage(){
 const {locale}=usePreferences();const text=getPageMessages(locale);const copy=experienceMessages[locale];const ui=utilityMessages[locale];
 const [query,setQuery]=useState('');const [category,setCategory]=useState(0);
 const entries=useMemo(()=>{
  const base=text.faqSections;const extra=extraFaqSections[locale];const more=moreFaqSections[locale];
  return [...base.flatMap(([,items],i)=>items.map(([question,answer],j)=>({question,answer,category:i===0?1:i===1?5:j===2?3:2}))),...extra.flatMap(([,items],i)=>items.map(([question,answer])=>({question,answer,category:i===0?4:5}))),...more.flatMap(([,items],i)=>items.map(([question,answer])=>({question,answer,category:i===0?5:4})))];
 },[locale,text.faqSections]);
 const normalized=query.trim().toLocaleLowerCase(locale);
 const results=entries.filter(item=>(category===0||item.category===category)&&(!normalized||(item.question+' '+item.answer).toLocaleLowerCase(locale).includes(normalized)));
 const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:entries.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))};
 return <main className="utility-page help-page"><AppHeader active="faq"/><section id="main-content" tabIndex={-1} className="help-workspace"><header className="page-heading"><h1>{text.navFaq}</h1><p>{text.faqDescription}</p></header><SearchInput value={query} onChange={setQuery} label={ui.helpSearch} clearLabel={copy.clearSearch}/><HelpCategoryNav categories={categoryNames[locale]} active={category} onChange={setCategory} label={text.navFaq}/><p className="search-count" aria-live="polite">{results.length} {copy.faqResults}</p>{results.length?<div className="faq-list">{results.map(item=><FAQItem key={item.question} {...item}/>)}</div>:<div className="empty-state"><h2>{copy.faqNoResults}</h2><p>{{en:"Try a shorter search or choose another topic.",th:"ลองใช้คำสั้นลง หรือเลือกหัวข้ออื่น",zh:"请缩短关键词或选择其他主题。",ja:"短い言葉で検索するか、別の項目を選んでください。",ko:"짧은 검색어나 다른 주제를 선택하세요.",es:"Prueba una búsqueda más corta u otro tema."}[locale]}</p><button className="ui-button secondary" onClick={()=>{setQuery('');setCategory(0);}}>{copy.clearSearch}</button></div>}<aside className="help-contact"><h2>{ui.contact}</h2><a className="ui-button secondary" href="https://memolab.me">{ui.contactAction} ↗</a></aside></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></main>;
}
