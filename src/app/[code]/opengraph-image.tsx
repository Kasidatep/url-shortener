import { ImageResponse } from 'next/og';
import { getLinkPreview } from '@/lib/link-preview';

export const alt='MemoLink destination preview';
export const size={width:1200,height:630};
export const contentType='image/png';
function cleanCode(code:string){return code.replace(/[^a-zA-Z0-9_-]/g,'').slice(0,48)||'link';}

export default async function Image({params}:{params:{code:string}}){
  const code=cleanCode(params.code);
  const preview=await getLinkPreview(code);
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',color:'white',backgroundColor:'#11172a'}}>
    {preview.imageDataUrl?<img src={preview.imageDataUrl} width="1200" height="630" alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>:null}
    <div style={{position:'absolute',inset:0,display:'flex',backgroundImage:'linear-gradient(90deg, rgba(7,11,20,.96) 0%, rgba(7,11,20,.82) 52%, rgba(7,11,20,.28) 100%)'}}/>
    <div style={{position:'relative',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:68}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,fontSize:28,fontWeight:800}}><div style={{width:50,height:50,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#7568ef',color:'white',fontSize:28}}>M</div>MemoLink</div>
        <div style={{display:'flex',padding:'10px 16px',borderRadius:999,border:'1px solid rgba(255,255,255,.28)',backgroundColor:'rgba(7,11,20,.4)',fontSize:19}}>{preview.protected?'PASSWORD PROTECTED':'SMART LINK PREVIEW'}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',maxWidth:850}}>
        <div style={{display:'flex',fontSize:24,color:'#c7ccda',marginBottom:13}}>{preview.hostname}</div>
        <div style={{display:'flex',fontSize:64,fontWeight:850,lineHeight:1.05,letterSpacing:-2}}>{preview.title}</div>
        <div style={{display:'flex',alignItems:'center',gap:12,marginTop:28,fontSize:21,color:'#d8dbea'}}><div style={{display:'flex',padding:'8px 12px',borderRadius:10,backgroundColor:'rgba(117,104,239,.9)'}}>/{code}</div><span>Open with MemoLink</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10,fontSize:18,color:'#c7ccda'}}><div style={{width:10,height:10,borderRadius:999,backgroundColor:'#45d09d'}}/>Destination preview secured by MemoLink</div>
    </div>
  </div>,size);
}
