import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import { env } from '@/config/env';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import AppFooter from '@/components/AppFooter';
import { NotificationProvider } from '@/components/NotificationTray';
import './globals.css';

const inter=Inter({subsets:['latin'],display:'swap',variable:'--font-inter'});
const notoThai=Noto_Sans_Thai({subsets:['thai'],display:'swap',variable:'--font-thai'});
export const metadata:Metadata={metadataBase:new URL(env.app.url),title:{default:'MemoLink — Simple, secure short links',template:'%s | MemoLink'},description:'Create secure short links, QR codes and privacy-friendly analytics without an account.',applicationName:'MemoLink',keywords:['URL shortener','short link','QR code generator','expiring link','privacy-friendly link analytics'],openGraph:{type:'website',siteName:'MemoLink',title:'Simple links. Useful control.',description:'Shorten, protect, measure and manage links without an account.',url:'/'},twitter:{card:'summary_large_image',title:'MemoLink',description:'Simple, secure short links with privacy-friendly analytics.'},icons:{icon:'/icon.svg'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:[{media:'(prefers-color-scheme: light)',color:'#f7f8fc'},{media:'(prefers-color-scheme: dark)',color:'#090c14'}],colorScheme:'light dark'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" data-theme="light" className={`${inter.variable} ${notoThai.variable}`} suppressHydrationWarning><body><PreferencesProvider><NotificationProvider>{children}<AppFooter/></NotificationProvider></PreferencesProvider></body></html>;}
