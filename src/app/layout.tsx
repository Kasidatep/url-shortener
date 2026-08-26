import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { env } from '@/config/env';
import { PreferencesProvider } from '@/components/PreferencesProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(env.app.url),
  title: { default: 'Kasidate Short — Smart URL Shortener', template: '%s | Kasidate Short' },
  description: 'Create short links with QR codes, passwords, click limits and expiration dates.',
  applicationName: 'Kasidate Short',
  keywords: ['URL shortener', 'short link', 'QR code generator', 'expiring link', 'password protected link'],
  openGraph: { type: 'website', siteName: 'Kasidate Short', title: 'Short links that stay under your control', description: 'Shorten, protect, expire and manage links without an account.', url: '/' },
  twitter: { card: 'summary_large_image', title: 'Kasidate Short', description: 'Smart short links without an account.' },
  icons: { icon: '/favicon.ico', apple: '/icon-192x192.jpg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7f8fc' }, { media: '(prefers-color-scheme: dark)', color: '#070b14' }], colorScheme: 'light dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning><body className={inter.className}><PreferencesProvider>{children}<footer>© {new Date().getFullYear()} Kasidate Short · <span><a href="https://memolab.me/privacy">Privacy</a><a href="https://memolab.me/terms">Terms</a><a href="https://kasidate.me">Made by Kasidate</a></span></footer></PreferencesProvider></body></html>;
}
