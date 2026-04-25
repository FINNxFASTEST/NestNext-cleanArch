"use client";

import type { FC, SVGProps } from "react";
import { Scene, SceneVariant } from "@/components/common/Scene";

export interface CategoryCardData {
  name: string;
  scene: SceneVariant;
  count: number;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export function CategoryCard({ name, scene, count, Icon }: CategoryCardData) {
  return (
    <div
      className="group relative h-[224px] rounded-[20px] overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 4px 20px rgba(27,38,32,.14), 0 1px 4px rgba(27,38,32,.08)" }}
    >
      {/* Scene zooms on hover */}
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.07]">
        <Scene variant={scene} className="absolute inset-0" />
      </div>

      {/* Base atmospheric gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, rgba(27,38,32,.08) 0%, rgba(27,38,32,.72) 100%)" }}
      />

      {/* Ember wash on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "linear-gradient(155deg, rgba(201,123,74,.10) 0%, rgba(27,38,32,.42) 100%)" }}
      />

      {/* Ember accent bar slides in from left */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[320ms] ease-out"
        style={{ background: "var(--ember)" }}
      />

      {/* Count badge — frosted glass top-right */}
      <div
        className="absolute top-[14px] right-[14px] flex items-center gap-[5px] px-[10px] py-[5px] rounded-full"
        style={{
          background: "rgba(27,38,32,.44)",
          border: "1px solid rgba(255,255,255,.13)",
          backdropFilter: "blur(6px)",
        }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-[.06em] text-cream-50">{count}</span>
        <span className="font-thai text-[10px] text-cream-50 opacity-60">กิจกรรม</span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        {/* Icon lifts on hover */}
        <div className="mb-[10px] transition-transform duration-300 ease-out group-hover:-translate-y-1">
          <Icon
            style={{
              width: 22,
              height: 22,
              color: "var(--clay)",
              filter: "drop-shadow(0 0 7px rgba(201,123,74,.55))",
            }}
          />
        </div>

        <div
          className="font-serif text-[24px] font-medium text-cream-50 tracking-[-0.01em] leading-none transition-transform duration-300 group-hover:-translate-y-[3px]"
          style={{ textShadow: "0 1px 10px rgba(27,38,32,.45)" }}
        >
          {name}
        </div>

        {/* Explore CTA fades up on hover */}
        <div className="flex items-center gap-[6px] mt-[8px] opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <span className="font-sans text-[10px] font-semibold tracking-[.12em] uppercase text-ember">Explore</span>
          <span className="text-ember text-[11px]">→</span>
        </div>
      </div>
    </div>
  );
}
