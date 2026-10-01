import type { MetadataRoute } from 'next';

export default function manifest():MetadataRoute.Manifest{
  return {
    name:'MemoLink — Short links with control',
    short_name:'MemoLink',
    description:'Create and manage secure short links, QR codes and privacy-friendly analytics.',
    start_url:'/',
    display:'standalone',
    background_color:'#f8f7f3',
    theme_color:'#526337',
    icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml'}],
  };
}
