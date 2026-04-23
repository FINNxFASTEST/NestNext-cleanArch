"use client";

import { useState } from "react";
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
            className="rounded-2xl border overflow-hidden cursor-pointer"
            style={{
              padding: 18,
              background: isActive ? "var(--cream-100)" : "var(--paper)",
              borderColor: isActive ? "#2F4034" : "var(--line)",
              borderWidth: isActive ? 1.5 : 1,
            }}
            onClick={() => setSelected(i)}
          >
            <div className="flex gap-4 items-start sm:items-center">
              {/* Thumbnail */}
              <div
                className="relative rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: 90, height: 70 }}
              >
                <Scene variant={p.scene} style={{ position: "absolute", inset: 0 }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="font-serif text-[17px] sm:text-[19px] font-medium">{p.name}</div>
                  <span
                    className="font-thai text-[11px] px-3 py-1 rounded-full"
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    {p.size}
                  </span>
                </div>
                <div className="font-thai text-[13px] mt-1.5" style={{ color: "#4C5A4E" }}>
                  {p.desc}
                </div>
                <div
                  className="font-thai text-xs mt-2"
                  style={{ color: p.left <= 2 ? "#A96438" : "#7C8F6F" }}
                >
                  {p.left <= 2 ? `⏳ เหลือ ${p.left} ที่` : `เหลือ ${p.left} ที่`}
                </div>
              </div>

              {/* Price + action */}
              <div className="text-right flex-shrink-0">
                <div className="font-serif text-xl sm:text-2xl font-medium">฿ {p.price}</div>
                <div className="font-thai text-[11px] mb-2" style={{ color: "#7C8F6F" }}>
                  ต่อคืน
                </div>
                {isActive ? (
                  <div
                    className="inline-flex items-center gap-1 rounded-full p-1"
                    style={{ border: "1px solid var(--line-strong)" }}
                  >
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer"
                      style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
                      onClick={(e) => { e.stopPropagation(); setQty(Math.max(1, qty - 1)); }}
                    >
                      <MinusIcon style={{ width: 14, height: 14 }} />
                    </button>
                    <span className="font-thai w-5 text-center text-sm">{qty}</span>
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer border-0"
                      style={{ background: "#2F4034", color: "#F7F2E7" }}
                      onClick={(e) => { e.stopPropagation(); setQty(qty + 1); }}
                    >
                      <PlusIcon style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="font-thai text-[13px] px-[14px] py-2 rounded-full cursor-pointer"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--line-strong)",
                      color: "var(--ink)",
                    }}
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
