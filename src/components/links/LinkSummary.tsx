import {usePreferences} from '../PreferencesProvider';
import {getPageMessages} from '@/config/page-i18n';
export default function LinkSummary({count,clicks,active,pending}:{count:number;clicks:number;active:number;pending:boolean}){
 const {locale}=usePreferences();const t=getPageMessages(locale);const noun={en:'links',th:'ลิงก์',zh:'链接',ja:'リンク',ko:'링크',es:'enlaces'}[locale];
 return <section className="link-summary" aria-busy={pending}><span><strong>{pending?'—':count.toLocaleString(locale)}</strong> {noun}</span><span><strong>{pending?'—':clicks.toLocaleString(locale)}</strong> {t.clicks}</span><span><strong>{pending?'—':active.toLocaleString(locale)}</strong> {t.live}</span></section>;
}
