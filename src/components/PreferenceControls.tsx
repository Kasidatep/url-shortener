'use client';

import { Locale } from '@/config/i18n';
import { usePreferences } from './PreferencesProvider';

const languageOptions: Array<{ value: Locale; label: string }> = [
  { value: 'en', label: 'EN' }, { value: 'th', label: 'ไทย' }, { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' }, { value: 'ko', label: '한국어' },
];

export default function PreferenceControls() {
  const { locale, setLocale, theme, setTheme, t } = usePreferences();
  return <div className="preference-controls">
    <label><span>{t('language')}</span><select aria-label={t('language')} value={locale} onChange={event => setLocale(event.target.value as Locale)}>{languageOptions.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
    <label><span>{t('theme')}</span><select aria-label={t('theme')} value={theme} onChange={event => setTheme(event.target.value as 'light' | 'dark' | 'system')}><option value="light">Light</option><option value="dark">Dark</option><option value="system">Auto</option></select></label>
  </div>;
}
