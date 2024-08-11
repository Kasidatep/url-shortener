import dotenv from "dotenv";
dotenv.config();

export const env = {
  db: {
    host: process.env.MONGO_URI || "localhost",
  },
  app: {
    name: process.env.APP_NAME || "KasP - Shortener URL",
    url: process.env.APP_URL || "https://short.kasidate.me",
    port: process.env.APP_PORT || 3000,
  },
};
