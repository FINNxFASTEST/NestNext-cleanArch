"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Scene, SceneVariant } from "@/components/common/Scene";
import { MinusIcon, PlusIcon } from "@/components/common/Icons";
import type { Pitch } from "@/types";

const PITCH_SCENES: Record<string, SceneVariant> = {
  tent: "forest",
  glamping: "dusk",
  rv: "meadow",
  cabin: "cabin",
};

interface CampPitchListProps {
  pitches: Pitch[];
  selectedPitchId?: string;
  qty: number;
  onSelect: (pitch: Pitch, qty: number) => void;
}

export function CampPitchList({ pitches, selectedPitchId, qty, onSelect }: CampPitchListProps) {
  const [localQty, setLocalQty] = useState(qty);

  function handleSelect(p: Pitch) {
    onSelect(p, localQty);
  }

  function adjustQty(delta: number, e: React.MouseEvent, pitch: Pitch) {
    e.stopPropagation();
    const next = Math.max(1, localQty + delta);
    setLocalQty(next);
    if (selectedPitchId === (pitch._id ?? pitch.name)) {
      onSelect(pitch, next);
    }
  }

  if (pitches.length === 0) {
    return <p className="font-thai text-sm text-sage-500">ยังไม่มีลานในระบบ</p>;
  }

  return (
    <div className="grid gap-3">
      {pitches.map((p) => {
        const id = p._id ?? p.name;
        const isActive = selectedPitchId === id;
        const scene = PITCH_SCENES[p.type] ?? "forest";
        return (
          <div
            key={id}
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer p-[18px]",
              isActive
                ? "bg-cream-100 border-[1.5px] border-forest-700"
                : "bg-paper border border-line"
            )}
            onClick={() => handleSelect(p)}
          >
            <div className="flex gap-4 items-start sm:items-center">
              <div className="relative rounded-xl overflow-hidden shrink-0 w-[90px] h-[70px]">
                <Scene variant={scene} className="absolute inset-0" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="font-serif text-[17px] sm:text-[19px] font-medium">{p.name}</div>
                  <span className="font-thai text-[11px] px-3 py-1 rounded-full bg-paper border border-line text-ink capitalize">
                    {p.type}
                  </span>
                </div>
                <div className="font-thai text-[13px] mt-1.5 text-forest-600">
                  รองรับสูงสุด {p.maxGuests} ท่าน
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-serif text-xl sm:text-2xl font-medium">฿ {p.pricePerNight.toLocaleString()}</div>
                <div className="font-thai text-[11px] mb-2 text-sage-500">ต่อคืน</div>
                {isActive ? (
                  <div className="inline-flex items-center gap-1 rounded-full p-1 border border-line-strong">
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer bg-paper border border-line"
                      onClick={(e) => adjustQty(-1, e, p)}
                    >
                      <MinusIcon style={{ width: 14, height: 14 }} />
                    </button>
                    <span className="font-thai w-5 text-center text-sm">{localQty}</span>
                    <button
                      className="w-[26px] h-[26px] rounded-full grid place-items-center cursor-pointer border-0 bg-forest-700 text-cream-50"
                      onClick={(e) => adjustQty(1, e, p)}
                    >
                      <PlusIcon style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="font-thai text-[13px] px-[14px] py-2 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink"
                    onClick={(e) => { e.stopPropagation(); handleSelect(p); }}
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
