'use client';

import { ArrowUpRightIcon, LinkIcon, LockClosedIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { usePreferences } from './PreferencesProvider';

/** Decorative illustration: never presented as a generated link or real analytics. */
export default function LinkStory() {
  const { t } = usePreferences();
  return <div className="link-story" aria-hidden="true">
    <div className="story-grid" />
    <span className="story-coordinate">01 / MemoLink</span>
    <div className="story-source"><LinkIcon/><span>example.com/your-next-big-idea</span></div>
    <div className="story-track"><i/><i/><i/></div>
    <div className="story-ticket"><div className="ticket-top"><span>MemoLink</span><ArrowUpRightIcon/></div><strong>/your-idea</strong><div className="ticket-bottom"><span>{t('ready')}</span><QrCodeIcon/></div></div>
    <span className="story-seal"><LockClosedIcon/>{t('password')}</span>
    <span className="story-caption">Less URL. More you.</span>
  </div>;
}
