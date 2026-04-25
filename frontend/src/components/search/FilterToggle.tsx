interface FilterToggleProps {
  on: boolean;
  onChange: () => void;
  title: string;
  sub: string;
}

export function FilterToggle({ on, onChange, title, sub }: FilterToggleProps) {
  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={onChange}>
      <div>
        <div className="font-thai text-[13px] font-medium text-forest-900">{title}</div>
        <div className="font-thai text-[11px] text-sage-500 mt-0.5">{sub}</div>
      </div>
      <div
        className="w-[38px] h-[22px] rounded-full relative shrink-0 transition-colors duration-150"
        style={{ background: on ? "var(--ember)" : "var(--line-strong)" }}
      >
        <div
          className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-150"
          style={{ left: on ? 18 : 2, boxShadow: "0 1px 2px rgba(0,0,0,.15)" }}
        />
      </div>
    </div>
  );
}
