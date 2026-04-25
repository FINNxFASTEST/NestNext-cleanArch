"use client";

import { Scene, SceneVariant } from "@/components/common/Scene";

export interface CategoryCardData {
  name: string;
  scene: SceneVariant;
  count: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function CategoryCard({ name, scene, count, Icon }: CategoryCardData) {
  return (
    <div
      className="relative h-[180px] rounded-[18px] overflow-hidden cursor-pointer transition-transform duration-[180ms]"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
    >
      <Scene variant={scene} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 30%, rgba(27,38,32,.7) 100%)" }}
      />
      <div className="absolute bottom-4 left-4 right-4 text-cream-50">
        <Icon style={{ width: 20, height: 20, color: "#C97B4A", marginBottom: 6 }} />
        <div className="font-serif text-[22px] font-medium">{name}</div>
        <div className="font-thai text-[12px] opacity-80 mt-0.5">{count} กิจกรรม</div>
      </div>
    </div>
  );
}
