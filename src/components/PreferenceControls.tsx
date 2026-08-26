'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, ComputerDesktopIcon, LanguageIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Locale } from '@/config/i18n';
import { experienceMessages } from '@/config/experience-i18n';
import { usePreferences } from './PreferencesProvider';

type Theme='light'|'dark'|'system';
type Menu='language'|'theme'|null;
const languageOptions:Array<{value:Locale;label:string;flag:string}>=[
  {value:'en',label:'English',flag:'🇬🇧'},{value:'th',label:'ไทย',flag:'🇹🇭'},{value:'zh',label:'简体中文',flag:'🇨🇳'},
  {value:'ja',label:'日本語',flag:'🇯🇵'},{value:'ko',label:'한국어',flag:'🇰🇷'},{value:'es',label:'Español',flag:'🇪🇸'},
];

function ThemeIcon({theme}:{theme:Theme}){return theme==='light'?<SunIcon/>:theme==='dark'?<MoonIcon/>:<ComputerDesktopIcon/>;}

export default function PreferenceControls(){
  const {locale,setLocale,theme,setTheme,t}=usePreferences();
  const copy=experienceMessages[locale];
  const [open,setOpen]=useState<Menu>(null);
  const rootRef=useRef<HTMLDivElement>(null);
  const currentLanguage=languageOptions.find(option=>option.value===locale)??languageOptions[0];
  const themes:Array<{value:Theme;label:string}>=[{value:'light',label:copy.light},{value:'dark',label:copy.dark},{value:'system',label:copy.system}];

  useEffect(()=>{
    if(!open)return;
    const closeOutside=(event:PointerEvent)=>{if(!rootRef.current?.contains(event.target as Node))setOpen(null);};
    const closeEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(null);};
    document.addEventListener('pointerdown',closeOutside);
    document.addEventListener('keydown',closeEscape);
    return()=>{document.removeEventListener('pointerdown',closeOutside);document.removeEventListener('keydown',closeEscape);};
  },[open]);

  return <div className="preference-controls preference-popovers" ref={rootRef}>
    <div className="preference-menu">
      <button type="button" className="preference-trigger" aria-label={t('language')} aria-haspopup="menu" aria-expanded={open==='language'} onClick={()=>setOpen(value=>value==='language'?null:'language')}><LanguageIcon/><span className="preference-flag">{currentLanguage.flag}</span><span className="preference-value">{currentLanguage.label}</span><ChevronDownIcon/></button>
      {open==='language'?<div className="preference-popover language-popover" role="menu" aria-label={t('language')}>{languageOptions.map(option=><button type="button" role="menuitemradio" aria-checked={locale===option.value} key={option.value} onClick={()=>{setLocale(option.value);setOpen(null);}}><span className="preference-flag">{option.flag}</span><span>{option.label}</span>{locale===option.value?<CheckIcon/>:null}</button>)}</div>:null}
    </div>
    <div className="preference-menu">
      <button type="button" className="preference-trigger theme-trigger" aria-label={t('theme')} aria-haspopup="menu" aria-expanded={open==='theme'} onClick={()=>setOpen(value=>value==='theme'?null:'theme')}><ThemeIcon theme={theme}/><span className="preference-value">{themes.find(item=>item.value===theme)?.label}</span><ChevronDownIcon/></button>
      {open==='theme'?<div className="preference-popover theme-popover" role="menu" aria-label={t('theme')}>{themes.map(option=><button type="button" role="menuitemradio" aria-checked={theme===option.value} key={option.value} onClick={()=>{setTheme(option.value);setOpen(null);}}><ThemeIcon theme={option.value}/><span>{option.label}</span>{theme===option.value?<CheckIcon/>:null}</button>)}</div>:null}
    </div>
  </div>;
}
