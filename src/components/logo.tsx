export function OqivioMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="M24 14 L30 28 L24 25 L18 28 Z"
        fill="currentColor"
      />
    </svg>
  );
}
