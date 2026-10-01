import { ImageResponse } from 'next/og';
export const alt='MemoLink — A shorter link. Ready to share.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:80,color:'#252722',backgroundColor:'#f8f7f3'}}><div style={{display:'flex',alignItems:'center',gap:16,fontSize:30,color:'#526337',fontWeight:800}}><div style={{width:52,height:52,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#526337',color:'white',fontSize:30}}>M</div>MemoLink</div><div style={{display:'flex',fontSize:78,fontWeight:800,lineHeight:1.04,marginTop:34,maxWidth:960}}>A shorter link. Ready to share.</div><div style={{display:'flex',fontSize:27,color:'#686b61',marginTop:32}}>Short links. QR codes. No sign-up.</div></div>,size);}
