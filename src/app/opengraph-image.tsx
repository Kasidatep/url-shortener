import { ImageResponse } from 'next/og';
export const alt='MemoLink — Long story. Short link.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:80,color:'#202c44',backgroundColor:'#f8f6ef'}}><div style={{display:'flex',alignItems:'center',gap:16,fontSize:30,color:'#284ec5',fontWeight:800}}><div style={{width:52,height:52,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#284ec5',color:'white',fontSize:30}}>M</div>MemoLink</div><div style={{display:'flex',fontSize:78,fontWeight:800,lineHeight:1.04,marginTop:34,maxWidth:960}}>Long story. Short link.</div><div style={{display:'flex',fontSize:27,color:'#626978',marginTop:32}}>Short links. QR codes. No sign-up.</div></div>,size);}
