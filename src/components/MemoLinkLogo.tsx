import Link from 'next/link';

export default function MemoLinkLogo({ compact=false }: { compact?: boolean }) {
  return <Link href="/" className="brand wordmark" aria-label="MemoLink"><svg className="brand-symbol" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="currentColor"/><path d="M10 27V14.5c0-2 2.4-3 3.8-1.6L20 19l6.2-6.1c1.4-1.4 3.8-.4 3.8 1.6V27" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 25l5-5 5 5" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{compact ? null : <span>MemoLink</span>}</Link>;
}
