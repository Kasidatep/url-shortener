import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kasidate Short — Smart URL Shortener',
    short_name: 'Kasidate Short',
    description: 'Short links with QR codes, passwords and expiration.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070B14',
    theme_color: '#6757FF',
    icons: [
      { src: '/icon-192x192.jpg', sizes: '192x192', type: 'image/jpeg' },
      { src: '/icon-512x512.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
  };
}
