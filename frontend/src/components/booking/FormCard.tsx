import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  eyebrow: string;
  children: ReactNode;
}

export function FormCard({ title, eyebrow, children }: FormCardProps) {
  return (
    <div className="rounded-2xl border border-line p-7 mb-6 bg-paper">
      <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
        {eyebrow}
      </div>
      <h3 className="font-serif m-0 mb-5 text-[22px] font-medium">{title}</h3>
      {children}
    </div>
  );
}
