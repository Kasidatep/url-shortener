import mongoose, { Schema, model, models, Document } from "mongoose";

// Define the interface for the Url schema
interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  password: string | null;
  expirationType: string | null;
  maxClicks: number | null;
  expirationDate: Date | null;
  metadata: {
    title: string;
    description: string;
    image: string;
  };
}

// Define the schema
const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    password: { type: String, default: null },
    expirationType: { type: String, default: null },
    maxClicks: { type: Number, default: null },
    expirationDate: { type: Date, default: null },
    metadata: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// Define the model with TypeScript support
const UrlService = models.UrlShortener || model<IUrl>("UrlShortener", UrlSchema);

export default UrlService;
