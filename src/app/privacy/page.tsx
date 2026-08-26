import Link from 'next/link';

export default function PrivacyPage() {
  return <main className="legal"><Link href="/">← Back</Link><h1>Privacy & link ownership</h1><p>Kasidate Short stores the destination, selected controls and aggregate click count required to operate each short link.</p><h2>Device ownership</h2><p>A random recovery key is created in your browser. The server stores only a one-way hash of that key. Keep the recovery key private; anyone who has it can manage links associated with it.</p><h2>Passwords</h2><p>Link passwords are hashed before storage and are submitted in a request body, not in the URL.</p><h2>Deletion</h2><p>The creating device may permanently delete its links from My links.</p></main>;
}
