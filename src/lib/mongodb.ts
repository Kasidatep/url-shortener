import { env } from "@/config/env";
import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(env.db.host);
    console.log("MongoDB connected");
  } else {
    console.log("MongoDB already connected");
  }
};

export default connectMongo;
