import { createHash, randomBytes } from 'crypto';

export const hashSecret = (value: string) => createHash('sha256').update(value).digest('hex');
export const createSecret = () => randomBytes(32).toString('base64url');
export const isValidDeviceKey = (value: string | null) => Boolean(value && /^[A-Za-z0-9_-]{40,100}$/.test(value));
