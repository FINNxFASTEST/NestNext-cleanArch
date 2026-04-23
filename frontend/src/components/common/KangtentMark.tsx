interface KangtentMarkProps {
  size?: number;
  bg?: string;
  fg?: string;
}

export function KangtentMark({
  size = 34,
  bg = "#C97B4A",
  fg = "#F7F2E7",
}: KangtentMarkProps) {
  return (
    <span
      className="grid place-items-center rounded-full shrink-0"
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 20 12 4l9 16" />
        <path d="M12 4v16" />
        <path d="M8 20l4-6 4 6" />
      </svg>
    </span>
  );
}
