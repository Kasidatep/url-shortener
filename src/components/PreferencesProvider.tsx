'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, MessageKey, messages } from '@/config/i18n';

type Theme = 'light' | 'dark' | 'system';
type Preferences = { locale: Locale; setLocale: (locale: Locale) => void; theme: Theme; setTheme: (theme: Theme) => void; t: (key: MessageKey) => string };

const Context = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const savedLocale = localStorage.getItem('short-locale');
    const savedTheme = localStorage.getItem('short-theme');
    if (savedLocale === 'th' || savedLocale === 'en') setLocaleState(savedLocale);
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.lang = locale;
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
