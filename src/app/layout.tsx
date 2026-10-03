import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import { env } from '@/config/env';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import AppFooter from '@/components/AppFooter';
import { NotificationProvider } from '@/components/NotificationTray';
import MotionProvider from '@/components/MotionProvider';
import { getServerPreferences } from '@/lib/preferences';
import { seoMessages } from '@/config/seo';
import './globals.css';
import './experience.css';
import './utility.css';
import '@/components/shortener.css';
import './studio.css';
import './canvas.css';
import './visual.css';
import './help-transit.css';

const inter=Inter({subsets:['latin'],display:'swap',variable:'--font-inter'});
const notoThai=Noto_Sans_Thai({subsets:['thai'],display:'swap',variable:'--font-thai'});
export async function generateMetadata():Promise<Metadata>{
  const {locale}=await getServerPreferences();
  const copy=seoMessages[locale];
  return {metadataBase:new URL(env.app.url),title:{default:copy.title,template:'%s | MemoLink'},description:copy.description,applicationName:'MemoLink',openGraph:{type:'website',siteName:'MemoLink',title:copy.title,description:copy.description,url:'/',locale:locale==='th'?'th_TH':locale==='en'?'en_US':locale},twitter:{card:'summary_large_image',title:copy.title,description:copy.description},icons:{icon:'/icon.svg'}};
}
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:[{media:'(prefers-color-scheme: light)',color:'#f8f6ef'},{media:'(prefers-color-scheme: dark)',color:'#111722'}],colorScheme:'light dark'};
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const {locale,theme}=await getServerPreferences();
  const bootTheme="try{if(document.documentElement.dataset.theme==='system'){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}}catch(e){}";
  return <html lang={locale==='zh'?'zh-CN':locale} data-theme={theme} className={`${inter.variable} ${notoThai.variable}`} suppressHydrationWarning><head><script id="theme-boot" dangerouslySetInnerHTML={{__html:bootTheme}}/></head><body><PreferencesProvider initialLocale={locale} initialTheme={theme}><MotionProvider><NotificationProvider>{children}<AppFooter/></NotificationProvider></MotionProvider></PreferencesProvider></body></html>;
}
