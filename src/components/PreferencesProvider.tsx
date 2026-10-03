'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, MessageKey, locales, messages } from '@/config/i18n';

type Theme = 'light' | 'dark' | 'system';
type Preferences = { locale: Locale; setLocale: (locale: Locale) => void; theme: Theme; setTheme: (theme: Theme) => void; t: (key: MessageKey) => string };
const Context = createContext<Preferences | null>(null);
const localeSet = new Set<string>(locales);

export function PreferencesProvider({ children, initialLocale='en', initialTheme='light' }: { children: React.ReactNode; initialLocale?:Locale; initialTheme?:Theme }) {
  const router=useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('memolink-locale');
      const savedTheme = localStorage.getItem('memolink-theme');
      if (!document.cookie.includes('memolink-locale=') && savedLocale && localeSet.has(savedLocale)) {
        setLocaleState(savedLocale as Locale);
        document.cookie=`memolink-locale=${savedLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
        router.refresh();
      }
      if (!document.cookie.includes('memolink-theme=') && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setThemeState(savedTheme);
        document.cookie=`memolink-theme=${savedTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }
    } catch { /* Display preferences still work when browser storage is unavailable. */ }
  }, [router]);

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches);
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
    };
    apply();
    if (theme === 'system') media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [locale, theme]);

  function setLocale(value: Locale) {
    try { localStorage.setItem('memolink-locale', value); } catch {}
    document.cookie=`memolink-locale=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setLocaleState(value); router.refresh();
  }
  function setTheme(value: Theme) {
    try { localStorage.setItem('memolink-theme', value); } catch {}
    document.cookie=`memolink-theme=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setThemeState(value);
  }

  const value = useMemo(() => ({ locale, setLocale, theme, setTheme, t: (key: MessageKey) => messages[locale][key] }), [locale, theme]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePreferences() {
  const value = useContext(Context);
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider');
  return value;
}
