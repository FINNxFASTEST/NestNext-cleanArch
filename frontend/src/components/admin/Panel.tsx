import { ReactNode } from "react";

interface PanelProps {
  title?: string;
  eyebrow?: string;
  right?: ReactNode;
  children: ReactNode;
  pad?: number;
  mb?: number;
}

export function Panel({ title, eyebrow, right, children, pad = 24, mb = 24 }: PanelProps) {
  return (
    <div
      className="rounded-2xl border border-line bg-paper"
      style={{ padding: pad, marginBottom: mb }}
    >
      {(title || right) && (
        <div className="flex justify-between items-end mb-5">
          <div>
            {eyebrow && (
              <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">
                {eyebrow}
              </div>
            )}
            {title && (
              <h3 className="font-serif m-0 text-[20px] font-medium">{title}</h3>
            )}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
