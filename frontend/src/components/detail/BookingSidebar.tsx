"use client";

import { useRouter } from "next/navigation";
import { Scene } from "@/components/common/Scene";
import { StarIcon } from "@/components/common/Icons";
import type { Campsite, Pitch } from "@/types";

interface BookingSidebarProps {
  campsite: Campsite;
  selectedPitch: Pitch | null;
  qty: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
}

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

export function BookingSidebar({
  campsite,
  selectedPitch,
  qty,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
}: BookingSidebarProps) {
  const router = useRouter();
  const nights = nightsBetween(checkIn, checkOut);
  const pricePerNight = selectedPitch?.pricePerNight ?? 0;
  const subtotal = pricePerNight * nights * qty;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + serviceFee;

  const today = new Date().toISOString().split("T")[0];

  function handleBook() {
    if (!selectedPitch || !checkIn || !checkOut || nights < 1) return;
    const params = new URLSearchParams({
      campsiteId: campsite._id,
      pitchId: selectedPitch._id ?? selectedPitch.name,
      pitchName: selectedPitch.name,
      campsiteName: campsite.name,
      location: campsite.location ?? "",
      checkIn,
      checkOut,
      guests: String(guests),
      qty: String(qty),
      pricePerNight: String(pricePerNight),
    });
    router.push(`/booking?${params.toString()}`);
  }

  const canBook = !!selectedPitch && nights > 0;

  return (
    <div className="rounded-2xl border border-line sticky top-6 p-6 shadow-card bg-paper">
      {/* Price header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="font-serif text-[30px] font-medium">
            {selectedPitch ? (
              <>฿ {selectedPitch.pricePerNight.toLocaleString()}<span className="font-thai text-sm ml-1.5 text-sage-500">/ คืน</span></>
            ) : (
              <span className="font-thai text-sm text-sage-500">เลือกลานก่อน</span>
            )}
          </div>
          {selectedPitch && (
            <div className="font-thai text-xs mt-1 text-sage-500">{selectedPitch.name}</div>
          )}
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-thai bg-[#C7D1B8] text-forest-800">
          <StarIcon style={{ width: 10, height: 10 }} />
          {campsite.name}
        </div>
      </div>

      {/* Date + guests inputs */}
      <div className="rounded-xl overflow-hidden mb-3.5 border border-line-strong">
        <div className="grid grid-cols-2 border-b border-line">
          <div className="p-3 px-4 border-r border-line">
            <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">เช็คอิน</div>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => onCheckInChange(e.target.value)}
              className="font-thai text-sm mt-1 w-full bg-transparent border-none outline-none cursor-pointer"
            />
          </div>
          <div className="p-3 px-4">
            <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">เช็คเอาท์</div>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => onCheckOutChange(e.target.value)}
              className="font-thai text-sm mt-1 w-full bg-transparent border-none outline-none cursor-pointer"
            />
          </div>
        </div>
        <div className="p-3 px-4">
          <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">ผู้พัก</div>
          <input
            type="number"
            min={1}
            max={selectedPitch?.maxGuests ?? 20}
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="font-thai text-sm mt-1 w-full bg-transparent border-none outline-none"
          />
        </div>
      </div>

      {/* CTA */}
      <button
        disabled={!canBook}
        onClick={handleBook}
        className="w-full font-thai font-medium text-[15px] py-3.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {canBook ? "จองพื้นที่กางเต็นท์" : "เลือกลานและวันที่"}
      </button>

      <div className="font-thai text-xs text-center my-3.5 text-sage-500">
        ยังไม่ตัดเงินจนกว่าเจ้าของลานจะยืนยัน
      </div>

      {/* Price breakdown */}
      {canBook && (
        <div className="grid gap-2.5 pt-4 border-t border-line">
          <div className="flex justify-between font-thai text-sm text-ink">
            <span>฿ {pricePerNight.toLocaleString()} × {nights} คืน{qty > 1 ? ` × ${qty} ที่` : ""}</span>
            <span>฿ {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-thai text-sm text-ink">
            <span>ค่าบริการ (5%)</span>
            <span>฿ {serviceFee.toLocaleString()}</span>
          </div>
          <div className="h-px bg-line" />
          <div className="flex justify-between font-thai text-sm text-ink">
            <span className="font-serif text-base">รวมทั้งหมด</span>
            <span className="font-serif text-xl font-medium">฿ {total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Host placeholder */}
      <div className="flex gap-3 items-center mt-5 pt-5 border-t border-line">
        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
          <Scene variant="dusk" className="w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="font-thai text-[13px] font-medium">เจ้าของลาน · {campsite.name}</div>
          <div className="font-thai text-[11px] mt-0.5 text-sage-500">ตอบภายใน 1 ชั่วโมง</div>
        </div>
      </div>
    </div>
  );
}
