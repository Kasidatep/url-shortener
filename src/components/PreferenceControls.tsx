'use client';

import { usePreferences } from './PreferencesProvider';

export default function PreferenceControls() {
  const { locale, setLocale, theme, setTheme, t } = usePreferences();
  return <div className="preference-controls">
    <label><span>{t('language')}</span><select aria-label={t('language')} value={locale} onChange={event => setLocale(event.target.value as 'en' | 'th')}><option value="en">EN</option><option value="th">TH</option></select></label>
    <label><span>{t('theme')}</span><select aria-label={t('theme')} value={theme} onChange={event => setTheme(event.target.value as 'light' | 'dark' | 'system')}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></label>
  </div>;
}
