import type { Metadata } from 'next';

function cleanCode(code:string){return code.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,48)||'link';}

export function generateMetadata({params}:{params:{code:string}}):Metadata{
  const code=cleanCode(params.code);
  const title=`MemoLink /${code}`;
  const description='Open a secure short link with a destination preview protected by MemoLink.';
  return {
    title,description,
    robots:{index:false,follow:false,nocache:true},
    openGraph:{type:'website',siteName:'MemoLink',title,description,url:'/'+encodeURIComponent(code)},
    twitter:{card:'summary_large_image',title,description},
    other:{'theme-color':'#6457e8'},
  };
}
export default function ShortLinkLayout({children}:{children:React.ReactNode}){return children;}
