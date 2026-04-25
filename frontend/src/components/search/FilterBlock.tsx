interface FilterBlockProps {
  title: string;
  hint?: string;
  children: React.ReactNode;
}

export function FilterBlock({ title, hint, children }: FilterBlockProps) {
  return (
    <div className="mb-[22px] pb-[22px] border-b border-line">
      <div className="flex justify-between items-baseline mb-3">
        <div className="font-thai text-[14px] font-medium text-forest-900">{title}</div>
        {hint && <div className="font-thai text-[11px] text-sage-500">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
