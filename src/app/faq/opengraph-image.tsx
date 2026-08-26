import { ImageResponse } from 'next/og';
export const alt='MemoLink Help Center';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:80,color:'#172033',backgroundColor:'#f7f8fc'}}><div style={{display:'flex',alignItems:'center',gap:14,fontSize:28,color:'#6457e8',fontWeight:800}}><div style={{width:48,height:48,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#6457e8',color:'white'}}>M</div>MemoLink</div><div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',fontSize:76,fontWeight:850,letterSpacing:-3}}>Answers that keep you moving.</div><div style={{display:'flex',fontSize:27,color:'#657089',marginTop:26}}>Setup · Sharing · Ownership · Analytics · Safety</div></div></div>,size);}
