'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, MessageKey, messages } from '@/config/i18n';

type Theme = 'light' | 'dark' | 'system';
type Preferences = { locale: Locale; setLocale: (locale: Locale) => void; theme: Theme; setTheme: (theme: Theme) => void; t: (key: MessageKey) => string };
const Context = createContext<Preferences | null>(null);
const localeSet = new Set<string>(['en', 'th', 'zh', 'ja', 'ko']);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const savedLocale = localStorage.getItem('short-locale');
    const savedTheme = localStorage.getItem('short-theme');
    if (savedLocale && localeSet.has(savedLocale)) setLocaleState(savedLocale as Locale);
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') setThemeState(savedTheme);
  }, []);

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

  function setLocale(value: Locale) { localStorage.setItem('short-locale', value); setLocaleState(value); }
  function setTheme(value: Theme) { localStorage.setItem('short-theme', value); setThemeState(value); }

  const value = useMemo(() => ({ locale, setLocale, theme, setTheme, t: (key: MessageKey) => messages[locale][key] }), [locale, theme]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePreferences() {
  const value = useContext(Context);
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider');
  return value;
}
