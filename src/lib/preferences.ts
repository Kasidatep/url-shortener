import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { locales, type Locale } from '@/config/i18n';

// Preference cookies contain display choices only, never the ownership key.
export const getServerPreferences = cache(async () => {
  const jar = await cookies();
  const language = jar.get('memolink-locale')?.value;
  const savedTheme = jar.get('memolink-theme')?.value;
  const locale: Locale = locales.includes(language as Locale) ? language as Locale : 'en';
  const theme = savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'light';
  return { locale, theme } as const;
});
