import { Schema, model, models } from 'mongoose';

export interface LinkAnalyticsRecord {
  shortUrl: string;
  date: string;
  country: string;
  device: 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown';
  referrer: string;
  count: number;
  expireAt: Date;
}

const LinkAnalyticsSchema = new Schema<LinkAnalyticsRecord>({
  shortUrl: { type: String, required: true, index: true },
  date: { type: String, required: true },
  country: { type: String, required: true },
  device: { type: String, required: true },
  referrer: { type: String, required: true },
  count: { type: Number, default: 0 },
  expireAt: { type: Date, required: true, expires: 0 },
}, { timestamps: true });

LinkAnalyticsSchema.index({ shortUrl: 1, date: 1, country: 1, device: 1, referrer: 1 }, { unique: true });
export default models.LinkAnalytics || model<LinkAnalyticsRecord>('LinkAnalytics', LinkAnalyticsSchema);
