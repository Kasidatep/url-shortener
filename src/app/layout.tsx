import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { env } from '@/config/env';
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

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#070B14', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={inter.className}>{children}<footer>© {new Date().getFullYear()} Kasidate Short · <LinkSet /></footer></body></html>;
}

function LinkSet() { return <span><a href="/privacy">Privacy</a><a href="https://kasidate.me">Made by Kasidate</a></span>; }
