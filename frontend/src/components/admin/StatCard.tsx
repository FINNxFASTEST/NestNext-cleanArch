import { SVGProps } from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  accent: string;
}

export function StatCard({ label, value, sub, icon: Icon, accent }: StatCardProps) {
  return (
    <div
      className="rounded-2xl border flex flex-col justify-between"
      style={{
        padding: 20,
        background: "var(--paper)",
        borderColor: "var(--line)",
        minHeight: 170,
      }}
    >
      <div className="flex justify-between items-start">
        <div
          className="font-thai text-[11px] tracking-[0.08em] uppercase leading-[1.4]"
          style={{ color: "#7C8F6F" }}
        >
          {label}
        </div>
        <div
          className="w-[34px] h-[34px] rounded-[10px] grid place-items-center"
          style={{ background: accent + "22", color: accent }}
        >
          <Icon style={{ width: 16, height: 16 }} />
        </div>
      </div>
      <div>
        <div
          className="font-serif leading-none"
          style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          {value}
        </div>
        <div className="font-thai text-xs mt-1.5" style={{ color: "#7C8F6F" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}
