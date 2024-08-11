import dotenv from "dotenv";
import { url } from "inspector";
dotenv.config();

export const env = {
  db: {
    host: process.env.MONGO_URI || "localhost",
  },
  app: {
    name: process.env.APP_NAME || "KasP - Shortener URL",
    url: process.env.APP_URL || "http://localhost:3000",
    port: process.env.APP_PORT || 3000,
  },
};
