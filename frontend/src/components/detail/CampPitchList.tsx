"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Scene, SceneVariant } from "@/components/common/Scene";
import { MinusIcon, PlusIcon } from "@/components/common/Icons";

interface Pitch {
  name: string;
  size: string;
  desc: string;
  price: number;
  left: number;
  scene: SceneVariant;
}

const PITCHES: Pitch[] = [
  { name: "ลานริมเขา", size: "2×2 เมตร", desc: "ริมหน้าผา วิวขุนเขา ปากโล่ง ดูดาวได้", price: 400, left: 2, scene: "forest" },
  { name: "ลานใต้ต้นสน", size: "3×3 เมตร", desc: "ร่มรื่น ใกล้ห้องน้ำ เหมาะครอบครัว", price: 480, left: 5, scene: "meadow" },
  { name: "ลานริมลำธาร", size: "2×2 เมตร", desc: "เสียงน้ำไหล อากาศเย็น", price: 380, left: 3, scene: "lake" },
  { name: "ลานดูดาว", size: "4×4 เมตร", desc: "เปิดโล่ง ไม่มีไฟรบกวน", price: 550, left: 1, scene: "night" },
];

export function CampPitchList() {
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="grid gap-3">
      {PITCHES.map((p, i) => {
        const isActive = selected === i;
        return (
          <div
            key={i}
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer p-[18px]",
              isActive
                ? "bg-cream-100 border-[1.5px] border-forest-700"
                : "bg-paper border border-line"
            )}
            onClick={() => setSelected(i)}
          >
            <div className="flex gap-4 items-start sm:items-center">
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden shrink-0 w-[90px] h-[70px]">
                <Scene variant={p.scene} className="absolute inset-0" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="font-serif text-[17px] sm:text-[19px] font-medium">{p.name}</div>
                  <span className="font-thai text-[11px] px-3 py-1 rounded-full bg-paper border border-line text-ink">
                    {p.size}
                  </span>
                </div>
                <div className="font-thai text-[13px] mt-1.5 text-forest-600">{p.desc}</div>
                <div className={cn("font-thai text-xs mt-2", p.left <= 2 ? "text-ember-dark" : "text-sage-500")}>
                  {p.left <= 2 ? `⏳ เหลือ ${p.left} ที่` : `เหลือ ${p.left} ที่`}
                </div>
              </div>

              {/* Price + action */}
              <div className="text-right shrink-0">
                <div className="font-serif text-xl sm:text-2xl font-medium">฿ {p.price}</div>
                <div className="font-thai text-[11px] mb-2 text-sage-500">ต่อคืน</div>
                {isActive ? (
                  <div className="inline-flex items-center gap-1 rounded-full p-1 border border-line-strong">
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer bg-paper border border-line"
                      onClick={(e) => { e.stopPropagation(); setQty(Math.max(1, qty - 1)); }}
                    >
                      <MinusIcon style={{ width: 14, height: 14 }} />
                    </button>
                    <span className="font-thai w-5 text-center text-sm">{qty}</span>
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer border-0 bg-forest-700 text-cream-50"
                      onClick={(e) => { e.stopPropagation(); setQty(qty + 1); }}
                    >
                      <PlusIcon style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="font-thai text-[13px] px-[14px] py-2 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink"
                    onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  >
                    เลือก
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
