// The two folded ribbons are shared by the wordmark, app icon and social cover.
export default function MemoLinkMark({
  className,
  plain = false,
}: {
  className?: string;
  plain?: boolean;
}) {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <rect
        width="64"
        height="64"
        rx="20"
        fill={plain ? 'transparent' : '#132838'}
      />
      <g
        transform="rotate(-35 32 32)"
        fill="none"
        strokeWidth="7"
        strokeLinejoin="round"
      >
        <rect
          x="10"
          y="13"
          width="27"
          height="24"
          rx="10"
          stroke="#1734a8"
          transform="translate(0 3)"
        />
        <rect
          x="27"
          y="28"
          width="27"
          height="24"
          rx="10"
          stroke="#849d3e"
          transform="translate(0 3)"
        />
        <rect x="10" y="13" width="27" height="24" rx="10" stroke="#6487ff" />
        <rect x="27" y="28" width="27" height="24" rx="10" stroke="#def198" />
        <path d="M33.5 21v6a10 10 0 0 1-10 10" stroke="#6487ff" />
        <path
          d="M14 16h9"
          stroke="#b2c5ff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M38 31h7"
          stroke="#f4ffcc"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
