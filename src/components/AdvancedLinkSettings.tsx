'use client';
import { useEffect, useState } from 'react';
import { usePreferences } from './PreferencesProvider';
import { createMessages } from '@/config/create-i18n';
import { utilityMessages } from '@/config/utility-i18n';
import Disclosure from './ui/Disclosure';
import GraphicChoices from './ui/GraphicChoices';
import DateTimeField from './ui/DateTimeField';
import { visualMessages } from '@/config/visual-i18n';
import {
  CalendarDaysIcon,
  CursorArrowRaysIcon,
  LinkIcon,
  LockClosedIcon,
  MegaphoneIcon,
  ArrowPathRoundedSquareIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
type Expiration = 'none' | 'clicks' | 'datetime';
type Utm = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};
const EMPTY_UTM: Utm = {
  source: '',
  medium: '',
  campaign: '',
  term: '',
  content: '',
};
type Props = {
  alias: string;
  password: string;
  maxClicks: string;
  expirationDate: string;
  error: string;
  errorField: string;
  expirationType: Expiration;
  cleanTracking: boolean;
  utm: Utm;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setMaxClicks: React.Dispatch<React.SetStateAction<string>>;
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
  setExpirationType: React.Dispatch<React.SetStateAction<Expiration>>;
  setCleanTracking: React.Dispatch<React.SetStateAction<boolean>>;
  setUtm: React.Dispatch<React.SetStateAction<Utm>>;
};
export default function AdvancedLinkSettings({
  alias,
  setAlias,
  password,
  setPassword,
  expirationType,
  setExpirationType,
  maxClicks,
  setMaxClicks,
  expirationDate,
  setExpirationDate,
  cleanTracking,
  setCleanTracking,
  utm,
  setUtm,
  error,
  errorField,
}: Props) {
  const { t, locale } = usePreferences();
  const copy = createMessages[locale];
  const utility = utilityMessages[locale];
  const visual = visualMessages[locale];
  const [host, setHost] = useState('');
  const [availability, setAvailability] = useState('');
  useEffect(() => {
    setHost(window.location.host);
  }, []);
  useEffect(() => {
    setAvailability('');
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,47}$/.test(alias)) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setAvailability('checking');
      try {
        const response = await fetch(
          '/api/availability?name=' + encodeURIComponent(alias),
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        setAvailability(data.available ? 'available' : 'taken');
      } catch {
        if (!controller.signal.aborted) setAvailability('unknown');
      }
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [alias]);
  return (
    <div className="composer-options" id="composer-options">
      <div className="composer-option">
        <div id="name-panel" className="option-content">
          <div className="option-visual-heading">
            <span aria-hidden="true">
              <LinkIcon />
            </span>
            <div>
              <label htmlFor="alias">{t('customName')}</label>
              <p>{visual.nameHint}</p>
            </div>
          </div>
          <div className="alias-input">
            <span aria-hidden="true">{host}/</span>
            <input
              id="alias"
              aria-invalid={!!error && errorField === 'alias'}
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              maxLength={48}
              autoCapitalize="none"
              spellCheck={false}
              placeholder="my-next-idea"
              aria-describedby={
                error && errorField === 'alias'
                  ? 'alias-format alias-hint settings-error'
                  : 'alias-format alias-hint'
              }
            />
          </div>
          <p className="composer-hint" id="alias-format">
            {copy.aliasHint}
          </p>
          <p
            id="alias-hint"
            className={
              availability === 'available' ? 'field-success' : 'composer-hint'
            }
            aria-live="polite"
          >
            {alias
              ? availability === 'checking'
                ? utility.checking
                : availability === 'available'
                  ? utility.available
                  : availability === 'taken'
                    ? copy.aliasTaken
                    : utility.unverified
              : null}
          </p>
          {availability === 'taken' ? (
            <button
              className="ui-button secondary"
              type="button"
              onClick={() => setAlias(alias.slice(0, 46) + '-2')}
            >
              {utility.suggest}: {alias.slice(0, 46)}-2
            </button>
          ) : null}
        </div>
      </div>
      <div className="composer-option">
        <div className="option-visual-heading">
          <span aria-hidden="true">
            <LockClosedIcon />
          </span>
          <div>
            <h3 className="option-section-title">{copy.access}</h3>
            <p>{visual.privacyHint}</p>
          </div>
        </div>
        <div id="access-panel" className="option-content">
          <Disclosure label={utility.passwordToggle}>
            <label htmlFor="password">
              {t('password')} <small>{t('optional')}</small>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength={128}
              placeholder={t('protectLink')}
            />
          </Disclosure>
          <GraphicChoices
            label={t('expiration')}
            value={expirationType}
            onChange={setExpirationType}
            options={[
              {
                value: 'none',
                label: t('never'),
                hint: visual.neverHint,
                icon: ArrowPathRoundedSquareIcon,
              },
              {
                value: 'clicks',
                label: t('afterClicks'),
                hint: visual.clickHint,
                icon: CursorArrowRaysIcon,
              },
              {
                value: 'datetime',
                label: t('dateTime'),
                hint: visual.dateHint,
                icon: CalendarDaysIcon,
              },
            ]}
          />
          {expirationType === 'clicks' ? (
            <>
              <label htmlFor="clicks">{t('maximumClicks')}</label>
              <input
                id="clicks"
                aria-invalid={!!error && errorField === 'clicks'}
                aria-describedby={
                  error && errorField === 'clicks'
                    ? 'settings-error'
                    : undefined
                }
                type="number"
                inputMode="numeric"
                min="1"
                max="1000000"
                value={maxClicks}
                onChange={(event) => setMaxClicks(event.target.value)}
              />
            </>
          ) : null}
          {expirationType === 'datetime' ? (
            <>
              <DateTimeField
                value={expirationDate}
                onChange={setExpirationDate}
                label={t('expiresOn')}
                invalid={!!error && errorField === 'date'}
                description={
                  error && errorField === 'date' ? 'settings-error' : undefined
                }
              />
              <p className="composer-hint">{t('timezone')}</p>
            </>
          ) : null}
        </div>
      </div>
      <div className="composer-option">
        <Disclosure
          label={utility.campaignToggle}
          className="campaign-disclosure"
        >
          <div className="option-visual-heading">
            <span aria-hidden="true">
              <MegaphoneIcon />
            </span>
            <div>
              <h3>{visual.campaign}</h3>
              <p>{visual.campaignHint}</p>
            </div>
          </div>
          <div id="campaign-panel" className="option-content">
            <label className="tracking-choice graphic-toggle">
              <input
                type="checkbox"
                checked={cleanTracking}
                onChange={(event) => setCleanTracking(event.target.checked)}
              />
              <span className="toggle-drawing" aria-hidden="true">
                <CheckIcon />
              </span>
              <span>
                <strong>{t('removeTracking')}</strong>
                <small>{visual.cleanHint}</small>
              </span>
            </label>
            <div className="campaign-fields">
              {(Object.keys(EMPTY_UTM) as Array<keyof Utm>).map((key) => (
                <div key={key}>
                  <label htmlFor={'utm-' + key}>{t(key)}</label>
                  <input
                    id={'utm-' + key}
                    value={utm[key]}
                    onChange={(event) =>
                      setUtm((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    placeholder={
                      key === 'source'
                        ? 'newsletter'
                        : key === 'medium'
                          ? 'email'
                          : key === 'campaign'
                            ? 'summer-launch'
                            : ''
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </Disclosure>
      </div>
    </div>
  );
}
