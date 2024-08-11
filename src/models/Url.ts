import { Schema, model, models } from 'mongoose';

interface IUrl {
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    metadata: {
        title: string;
        description: string;
        image: string;
    };
    date: Date;
}

const urlSchema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    metadata: {
        title: { type: String },
        description: { type: String },
        image: { type: String },
    },
    date: { type: Date, default: Date.now },
});

export const Url = models.Url || model<IUrl>('Url', urlSchema);
