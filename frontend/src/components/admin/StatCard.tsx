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
    <div className="rounded-2xl border border-line bg-paper p-5 flex flex-col justify-between min-h-[170px]">
      <div className="flex justify-between items-start">
        <div className="font-thai text-[11px] tracking-[0.08em] uppercase leading-[1.4] text-sage-500">
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
          className="font-serif leading-none font-medium"
          style={{ fontSize: 38, letterSpacing: "-0.02em" }}
        >
          {value}
        </div>
        <div className="font-thai text-xs mt-1.5 text-sage-500">{sub}</div>
      </div>
    </div>
  );
}
