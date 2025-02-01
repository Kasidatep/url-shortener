import dotenv from "dotenv";
dotenv.config();

export const env = {
  db: {
    host: process.env.MONGO_URI || "localhost",
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "KasP - Shortener URL",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://short.kasidate.me",
    port: process.env.NEXT_PUBLIC_APP_PORT || 3000,
  },
  stytch: {
    publicToken: process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "test-public-token",
  },
};
