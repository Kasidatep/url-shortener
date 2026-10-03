import Link from 'next/link';
import MemoLinkMark from './MemoLinkMark';

export default function MemoLinkLogo({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link href="/" className="brand wordmark" aria-label="MemoLink">
      <MemoLinkMark className="brand-symbol" />
      {compact ? null : (
        <span>
          Memo<span className="wordmark-link">Link</span>
        </span>
      )}
    </Link>
  );
}
