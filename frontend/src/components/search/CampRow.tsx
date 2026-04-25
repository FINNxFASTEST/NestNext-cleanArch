"use client";

import Link from "next/link";
import { Scene, SceneVariant } from "@/components/common/Scene";
import {
  StarIcon, HeartIcon, BoltIcon, PinIcon, ArrowRIcon,
  ShowerIcon, CarIcon, WifiIcon, DropletIcon, FlameIcon, CupIcon,
} from "@/components/common/Icons";

const TAG_ICON: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "ห้องน้ำ": ShowerIcon,
  "ที่จอดรถ": CarIcon,
  "ไฟฟ้า": BoltIcon,
  "Wi-Fi": WifiIcon,
  "น้ำประปา": DropletIcon,
  "จุดก่อไฟ": FlameIcon,
  "ร้านกาแฟ": CupIcon,
};

export interface Camp {
  id: number;
  name: string;
  sub: string;
  region: string;
  rating: number;
  reviews: number;
  price: number;
  scene: SceneVariant;
  badges: string[];
  tags: string[];
  tent: string;
  instant: boolean;
  pet: boolean;
  blurb: string;
}

export function CampRow({ camp }: { camp: Camp }) {
  return (
    <div
      className="grid rounded-[22px] overflow-hidden border border-line cursor-pointer bg-paper transition-[transform,box-shadow] duration-[180ms]"
      style={{ gridTemplateColumns: "320px 1fr", boxShadow: "var(--shadow-soft)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-soft)";
      }}
    >
      {/* Scene column */}
      <div className="relative h-[260px]">
        <Scene variant={camp.scene} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.1) 0%, transparent 30%, rgba(0,0,0,.3) 100%)" }}
        />
        <div className="absolute top-[14px] left-[14px] right-[14px] flex justify-between gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {camp.badges.map((b, i) => (
              <span
                key={i}
                className="font-thai px-[10px] py-1 rounded-full text-[11px] font-medium text-forest-900"
                style={{ background: "rgba(247,242,231,.88)", backdropFilter: "blur(6px)" }}
              >
                {b}
              </span>
            ))}
          </div>
          <button
            className="w-[34px] h-[34px] rounded-full border-none grid place-items-center cursor-pointer shrink-0"
            style={{ background: "rgba(247,242,231,.9)" }}
          >
            <HeartIcon style={{ color: "var(--forest-700)", width: 15, height: 15 }} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className="font-thai px-[10px] py-1 rounded-full text-[11px] text-cream-50"
            style={{ background: "rgba(27,38,32,.75)", backdropFilter: "blur(4px)" }}
          >
            1 / 24 ภาพ
          </span>
        </div>
      </div>

      {/* Info column */}
      <div className="p-[22px] flex flex-col">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-[10px] mb-1">
              <div className="font-thai text-[11px] text-sage-500 flex items-center gap-[5px]">
                <PinIcon style={{ width: 11, height: 11 }} /> {camp.sub}
              </div>
              {camp.instant && (
                <span className="font-thai text-[10px] text-ember flex items-center gap-1 font-medium">
                  <BoltIcon style={{ width: 10, height: 10 }} /> จองทันที
                </span>
              )}
            </div>
            <div className="font-serif text-[24px] font-medium text-forest-900 mb-1.5 tracking-[-0.01em]">
              {camp.name}
            </div>
            <p className="font-thai text-[13px] leading-[1.55] text-[#4C5A4E] m-0 max-w-[520px]">
              {camp.blurb}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1.5 px-[10px] py-[5px] rounded-full bg-cream-100">
              <StarIcon style={{ width: 12, height: 12, color: "var(--ember)" }} />
              <span className="font-serif text-[15px] font-semibold text-forest-900">{camp.rating}</span>
            </div>
            <div className="font-thai text-[11px] text-sage-500 mt-1">{camp.reviews} รีวิว</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-[14px]">
          <span className="font-thai px-[10px] py-1 rounded-[6px] text-[11px] bg-cream-100 text-forest-800 font-medium">
            {camp.tent}
          </span>
          {camp.tags.map((t, i) => {
            const I = TAG_ICON[t];
            return (
              <span
                key={i}
                className="font-thai px-[10px] py-1 rounded-[6px] text-[11px] bg-paper border border-line text-[#4C5A4E] inline-flex items-center gap-[5px]"
              >
                {I && <I style={{ width: 11, height: 11 }} />} {t}
              </span>
            );
          })}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-dashed border-line">
          <div>
            <div className="font-thai text-[11px] text-sage-500">ต่อที่ / คืน</div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-[24px] font-medium text-forest-900">
                ฿{camp.price.toLocaleString()}
              </span>
              <span className="font-thai text-[12px] text-sage-500">บาท</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/campsites/${camp.id}`}
              className="font-thai no-underline inline-flex items-center gap-1.5 px-4 py-[10px] rounded-full text-[13px] border border-line-strong bg-paper text-ink cursor-pointer"
            >
              ดูรายละเอียด
            </Link>
            <Link
              href={`/campsites/${camp.id}`}
              className="font-thai no-underline inline-flex items-center gap-1.5 px-[18px] py-[10px] rounded-full text-[13px] bg-ember text-cream-50 border-none cursor-pointer"
            >
              จองเลย <ArrowRIcon style={{ width: 14 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
