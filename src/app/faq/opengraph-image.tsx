import { ImageResponse } from 'next/og';
export const alt='MemoLink Help Center';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:80,color:'#202c44',backgroundColor:'#f8f6ef'}}><div style={{display:'flex',alignItems:'center',gap:14,fontSize:28,color:'#284ec5',fontWeight:800}}><div style={{width:48,height:48,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#284ec5',color:'white'}}>M</div>MemoLink</div><div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',fontSize:76,fontWeight:850,letterSpacing:-3}}>A few questions. Clear answers.</div><div style={{display:'flex',fontSize:27,color:'#626978',marginTop:26}}>Setup · Sharing · Ownership · Analytics · Safety</div></div></div>,size);}
