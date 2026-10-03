'use client';
import {useMemo,useState} from 'react';
import AppHeader from '@/components/AppHeader';
import SearchInput from '@/components/ui/SearchInput';
import FAQItem from '@/components/help/FAQItem';
import HelpCategoryNav from '@/components/help/HelpCategoryNav';
import {usePreferences} from '@/components/PreferencesProvider';
import {getPageMessages} from '@/config/page-i18n';
import {getFaqEntries} from '@/config/faq-items';
import {studioMessages} from '@/config/studio-i18n';
import {experienceMessages} from '@/config/experience-i18n';
import {utilityMessages} from '@/config/utility-i18n';
const categoryNames={en:['All','Create','Manage','Analytics','Share','Safety'],th:['ทั้งหมด','สร้างลิงก์','จัดการ','สถิติ','แชร์','ความปลอดภัย'],zh:['全部','创建','管理','统计','分享','安全'],ja:['すべて','作成','管理','分析','共有','安全'],ko:['전체','만들기','관리','통계','공유','보안'],es:['Todo','Crear','Gestionar','Estadísticas','Compartir','Seguridad']};
export default function FaqPage(){
 const {locale}=usePreferences();const text=getPageMessages(locale);const copy=experienceMessages[locale];const ui=utilityMessages[locale];
 const [query,setQuery]=useState('');const [category,setCategory]=useState(0);
 const studio=studioMessages[locale];
 const entries=useMemo(()=>getFaqEntries(locale),[locale]);
 const normalized=query.trim().toLocaleLowerCase(locale);
 const results=entries.filter(item=>(category===0||item.category===category)&&(!normalized||(item.question+' '+item.answer).toLocaleLowerCase(locale).includes(normalized)));
 const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:results.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))};
 return <main className="utility-page help-page"><AppHeader active="faq"/><section id="main-content" tabIndex={-1} className="help-workspace"><header className="page-heading"><p className="kicker">{studio.faqEyebrow}</p><h1>{studio.faqTitle}</h1><p>{studio.faqBody}</p></header><SearchInput value={query} onChange={setQuery} label={ui.helpSearch} clearLabel={copy.clearSearch}/><div className="quick-help">{[entries[1],entries[8],entries[9]].map(item=><button key={item.question} type="button" onClick={()=>{setCategory(0);setQuery(item.question);}}>{item.question}<span aria-hidden="true">↗</span></button>)}</div><HelpCategoryNav categories={categoryNames[locale]} active={category} onChange={setCategory} label={text.navFaq}/><div className="help-results-heading"><p className="search-count" aria-live="polite">{results.length} {copy.faqResults}</p>{query||category?<button className="ui-button ghost" onClick={()=>{setQuery('');setCategory(0);}}>{studio.reset}</button>:null}</div>{results.length?<div className="faq-list" key={category}>{results.map(item=><FAQItem key={item.question} {...item}/>)}</div>:<div className="empty-state"><h2>{copy.faqNoResults}</h2><p>{{en:"Try a shorter search or choose another topic.",th:"ลองใช้คำสั้นลง หรือเลือกหัวข้ออื่น",zh:"请缩短关键词或选择其他主题。",ja:"短い言葉で検索するか、別の項目を選んでください。",ko:"짧은 검색어나 다른 주제를 선택하세요.",es:"Prueba una búsqueda más corta u otro tema."}[locale]}</p><button className="ui-button secondary" onClick={()=>{setQuery('');setCategory(0);}}>{copy.clearSearch}</button></div>}<aside className="help-contact"><h2>{ui.contact}</h2><a className="ui-button secondary" href="https://memolab.me">{ui.contactAction} ↗</a></aside></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></main>;
}
