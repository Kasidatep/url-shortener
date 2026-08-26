const KEY = 'kasidate-short-device-key-v1';

export function getDeviceKey() {
  let key = localStorage.getItem(KEY);
  if (!key) {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    key = btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    localStorage.setItem(KEY, key);
  }
  return key;
}

export function exportDeviceKey() {
  return getDeviceKey();
}

export function importDeviceKey(key: string) {
  if (!/^[A-Za-z0-9_-]{40,100}$/.test(key)) throw new Error('Invalid recovery key');
  localStorage.setItem(KEY, key);
}
