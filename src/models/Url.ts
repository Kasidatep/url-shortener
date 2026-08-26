import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  password: string | null;
  expirationType: 'none' | 'clicks' | 'datetime';
  maxClicks: number | null;
  expirationDate: Date | null;
  ownerDeviceHash: string;
  active: boolean;
  lastClickedAt: Date | null;
  createdAt: Date;
}

const UrlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true, maxlength: 4096 },
  shortUrl: { type: String, required: true, unique: true, index: true },
  clicks: { type: Number, default: 0 },
  password: { type: String, default: null, select: false },
  expirationType: { type: String, enum: ['none', 'clicks', 'datetime'], default: 'none' },
  maxClicks: { type: Number, default: null },
  expirationDate: { type: Date, default: null },
  ownerDeviceHash: { type: String, required: true, index: true, select: false },
  active: { type: Boolean, default: true },
  lastClickedAt: { type: Date, default: null },
}, { timestamps: true });

UrlSchema.index({ ownerDeviceHash: 1, createdAt: -1 });
export default models.UrlShortener || model<IUrl>('UrlShortener', UrlSchema);
