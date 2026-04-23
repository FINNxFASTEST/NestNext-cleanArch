import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  eyebrow: string;
  children: ReactNode;
}

export function FormCard({ title, eyebrow, children }: FormCardProps) {
  return (
    <div
      className="rounded-2xl border mb-6"
      style={{ padding: 28, background: "var(--paper)", borderColor: "var(--line)" }}
    >
      <div
        className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-1.5"
        style={{ color: "#7C8F6F" }}
      >
        {eyebrow}
      </div>
      <h3
        className="font-serif m-0 mb-5"
        style={{ fontSize: 22, fontWeight: 500 }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
