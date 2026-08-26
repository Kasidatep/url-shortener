import { ImageResponse } from 'next/og';
export const alt='MemoLink — Simple links. Useful control.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:80,color:'#172033',backgroundColor:'#f7f8fc'}}><div style={{display:'flex',alignItems:'center',fontSize:28,color:'#6457e8',fontWeight:700}}>↗ MemoLink</div><div style={{display:'flex',fontSize:78,fontWeight:800,lineHeight:1.04,marginTop:34,maxWidth:960}}>Simple links. Useful control.</div><div style={{display:'flex',fontSize:27,color:'#657089',marginTop:32}}>Protect · Share · Measure · Recover</div></div>,size);}
