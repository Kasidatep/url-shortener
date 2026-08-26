const KEY = 'memolink-device-key-v1';

export function getDeviceKey() {
  let key = localStorage.getItem(KEY);
  if (!key) {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    let binary = '';
    for (let index = 0; index < bytes.length; index += 1) {
      binary += String.fromCharCode(bytes[index]);
    }
    key = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
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
