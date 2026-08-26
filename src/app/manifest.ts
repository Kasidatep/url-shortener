import type { MetadataRoute } from 'next';

export default function manifest():MetadataRoute.Manifest{
  return {
    name:'MemoLink — Short links with control',
    short_name:'MemoLink',
    description:'Create and manage secure short links, QR codes and privacy-friendly analytics.',
    start_url:'/',
    display:'standalone',
    background_color:'#f7f8fc',
    theme_color:'#6457e8',
    icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml'}],
  };
}
