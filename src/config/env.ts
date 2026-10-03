import dotenv from 'dotenv';
dotenv.config();
const configuredUrl=process.env.NEXT_PUBLIC_APP_URL||process.env.APP_URL;
const publicUrl=!configuredUrl||/^https?:\/\/short\.kasidate\.me\/?$/.test(configuredUrl)?'https://l.memolab.me':configuredUrl;
export const env={db:{host:process.env.MONGO_URI||'localhost'},app:{name:process.env.NEXT_PUBLIC_APP_NAME||'MemoLink',url:publicUrl,port:process.env.NEXT_PUBLIC_APP_PORT||3000},stytch:{publicToken:process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN||'test-public-token'}};
