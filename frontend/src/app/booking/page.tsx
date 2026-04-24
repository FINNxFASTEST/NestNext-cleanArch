"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene } from "@/components/common/Scene";
import { FormCard } from "@/components/booking/FormCard";
import { StepHeader } from "@/components/booking/StepHeader";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { bookingsApi, ApiError } from "@/services";
import {
  ChevronLIcon, CalendarIcon, UsersIcon,
  CheckIcon, TentIcon, MoonIcon, FlameIcon, CupIcon, LeafIcon,
} from "@/components/common/Icons";

const ADDONS = [
  { name: "เต็นท์ 3 คน พร้อมติดตั้ง", price: 350, priceLabel: "฿ 350 / คืน", Icon: TentIcon },
  { name: "ถุงนอน (หนา -5°C)", price: 120, priceLabel: "฿ 120 / คืน", Icon: MoonIcon },
  { name: "ชุดฟืน + ไฟฉาย", price: 180, priceLabel: "฿ 180", Icon: FlameIcon },
  { name: "อาหารเช้าฝีมือเจ้าบ้าน", price: 150, priceLabel: "฿ 150 / ท่าน", Icon: CupIcon },
];

function Row({ l, r, ember }: { l: React.ReactNode; r: React.ReactNode; ember?: boolean }) {
  return (
    <div className={cn("flex justify-between font-thai text-sm", ember ? "text-ember-dark" : "text-ink")}>
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const campsiteId = searchParams.get("campsiteId") ?? "";
  const pitchId = searchParams.get("pitchId") ?? "";
  const pitchName = searchParams.get("pitchName") ?? "";
  const campsiteName = searchParams.get("campsiteName") ?? "";
  const location = searchParams.get("location") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 2);
  const qty = Number(searchParams.get("qty") ?? 1);
  const pricePerNight = Number(searchParams.get("pricePerNight") ?? 0);

  const nights = nightsBetween(checkIn, checkOut);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [addons, setAddons] = useState([false, false, false, false]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const addonTotal = ADDONS.reduce((sum, a, i) => sum + (addons[i] ? a.price : 0), 0);
  const subtotal = pricePerNight * nights * qty;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + addonTotal + serviceFee;

  const formattedCheckIn = checkIn
    ? new Date(checkIn).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const formattedCheckOut = checkOut
    ? new Date(checkOut).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })
    : "";

  async function handleConfirm() {
    if (!firstName || !lastName || !email) {
      setError("กรุณากรอกข้อมูลผู้จองให้ครบถ้วน");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await bookingsApi.create({
        campsiteId,
        pitchId,
        guestName: `${firstName} ${lastName}`.trim(),
        guestEmail: email,
        guestPhone: phone || undefined,
        checkIn,
        checkOut,
        guests,
        addOns: ADDONS.filter((_, i) => addons[i]).map((a) => ({ name: a.name, price: a.price })),
      });
      router.push("/booking/confirmation");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่";
      setError(typeof msg === "string" ? msg : "เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-paper text-ink">
      <Nav active="bookings" variant="solid" />

      <section className="px-4 md:px-14 pt-8 pb-6 border-b border-line">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 font-thai text-[13px] mb-5 cursor-pointer text-sage-500 bg-transparent border-0 p-0"
        >
          <ChevronLIcon style={{ width: 16, height: 16 }} /> กลับไปที่{campsiteName || "ลานกางเต็นท์"}
        </button>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
              CHECKOUT · การจอง
            </div>
            <h1
              className="font-serif m-0"
              style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              เกือบจะได้ออกเดินทางแล้ว
            </h1>
          </div>
          <div className="hidden sm:block">
            <StepHeader currentStep={2} />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-14 pt-10 pb-[60px] grid grid-cols-1 md:grid-cols-[1fr_460px] gap-8 md:gap-12">
        {/* Left: forms */}
        <div>
          {/* Trip summary card */}
          <div className="rounded-2xl border border-line flex gap-4 items-center mb-6 flex-wrap sm:flex-nowrap px-5 py-4 bg-paper">
            <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: 100, height: 80 }}>
              <Scene variant="forest" className="absolute inset-0" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-thai text-xs mb-1 text-sage-500">ทริปของคุณ</div>
              <div className="font-serif text-xl font-medium mt-1">{campsiteName}</div>
              <div className="font-thai text-[13px] mt-1.5 flex flex-wrap gap-x-4 gap-y-1 items-center text-forest-600">
                {checkIn && checkOut && (
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon style={{ width: 14, height: 14 }} />
                    {formattedCheckIn} — {formattedCheckOut}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <UsersIcon style={{ width: 14, height: 14 }} /> {guests} ผู้พัก
                </span>
                {pitchName && <span>{pitchName}{qty > 1 ? ` × ${qty}` : ""}</span>}
              </div>
              {location && <div className="font-thai text-xs mt-1 text-sage-500">{location}</div>}
            </div>
          </div>

          {/* Contact details */}
          <FormCard title="ข้อมูลผู้จอง" eyebrow="CONTACT · ผู้ติดต่อ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">ชื่อ</div>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ชื่อ"
                  className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                />
              </label>
              <label className="block">
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">นามสกุล</div>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="นามสกุล"
                  className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                />
              </label>
              <label className="block">
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">อีเมล</div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                />
              </label>
              <label className="block">
                <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5 text-sage-500">เบอร์โทรศัพท์</div>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+66 89 123 4567"
                  className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai"
                />
              </label>
            </div>
          </FormCard>

          {/* Add-ons */}
          <FormCard title="เพิ่มความสบายให้ทริป" eyebrow="ADD-ONS · ของให้เช่า">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDONS.map(({ name, priceLabel, Icon }, i) => {
                const checked = addons[i];
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3.5 items-center rounded-xl cursor-pointer transition-colors p-4 border-[1.5px]",
                      checked ? "border-forest-700 bg-cream-100" : "border-line bg-paper",
                    )}
                    onClick={() => {
                      const next = [...addons];
                      next[i] = !next[i];
                      setAddons(next);
                    }}
                  >
                    <div className={cn("w-5 h-5 rounded-[6px] flex-shrink-0 grid place-items-center border-[1.5px]", checked ? "bg-forest-700 border-forest-700 text-cream-50" : "bg-paper border-line-strong")}>
                      {checked && <CheckIcon style={{ width: 12, height: 12 }} />}
                    </div>
                    <Icon style={{ width: 22, height: 22 }} className="text-forest-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-thai text-sm">{name}</div>
                      <div className="font-thai text-xs mt-0.5 text-sage-500">{priceLabel}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FormCard>

          {/* Cancellation note */}
          <div className="flex gap-3.5 rounded-2xl p-5 bg-cream-100 border border-dashed border-line-strong">
            <LeafIcon style={{ width: 24, height: 24 }} className="text-forest-700 shrink-0" />
            <div>
              <div className="font-serif text-base mb-1 font-medium">ยกเลิกฟรีก่อน 48 ชั่วโมง</div>
              <div className="font-thai text-[13px] leading-relaxed text-forest-600">
                การจองของคุณได้รับการคุ้มครองโดย Kangtent Care — หากสภาพอากาศไม่เอื้ออำนวย เรามีนโยบายเลื่อนวันให้ฟรี
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-ember/10 border border-ember/30 px-4 py-3 font-thai text-sm text-ember-dark">
              {error}
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <aside>
          <div className="sticky top-6">
            <div className="rounded-2xl border border-line overflow-hidden shadow-card">
              <div className="relative h-[140px]">
                <Scene variant="dusk" className="absolute inset-0" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(21,24,20,.6) 100%)" }} />
                <div className="absolute bottom-3.5 left-5 right-5 text-cream-50">
                  <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-clay">YOUR STAY</div>
                  <div className="font-serif text-2xl font-medium mt-1">{nights} คืน · {campsiteName || "แคมป์"}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-2.5 pb-4 border-b border-line font-thai text-sm">
                  <Row l={`${pitchName || "ลาน"} × ${qty} × ${nights} คืน`} r={`฿ ${subtotal.toLocaleString()}`} />
                  {ADDONS.map((a, i) => addons[i] && (
                    <Row key={a.name} l={a.name} r={`฿ ${a.price.toLocaleString()}`} />
                  ))}
                  <Row l="ค่าบริการ (5%)" r={`฿ ${serviceFee.toLocaleString()}`} />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-line">
                  <div>
                    <div className="font-thai text-xs text-sage-500">ราคาสุทธิ</div>
                    <div className="font-serif text-[34px] font-medium text-forest-900">฿ {total.toLocaleString()}</div>
                  </div>
                  <div className="font-thai text-[11px] text-right max-w-[120px] text-sage-500">
                    รวมภาษี และค่าบริการแล้ว
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="w-full font-thai font-medium text-[15px] py-4 rounded-full border-0 cursor-pointer mt-5 bg-ember text-cream-50 disabled:opacity-60"
                >
                  {submitting ? "กำลังยืนยัน…" : "ยืนยันและชำระเงิน"}
                </button>

                <div className="font-thai text-[11px] text-center mt-3.5 leading-relaxed text-sage-500">
                  การกดยืนยัน แสดงว่าคุณยอมรับ
                  <br />
                  <u>เงื่อนไขการใช้งาน</u> และ <u>นโยบายยกเลิก</u>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center mt-4 p-4 rounded-xl bg-[#C7D1B8]">
              <FlameIcon style={{ width: 22, height: 22 }} className="text-forest-800 shrink-0" />
              <div className="font-thai text-xs leading-relaxed text-forest-900">
                <b>12,480 ชาวแคมเปอร์</b> ได้ออกเดินทางกับเราในเดือนนี้
              </div>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="bg-paper text-ink min-h-screen flex items-center justify-center">
        <div className="font-thai text-sage-500">กำลังโหลด…</div>
      </main>
    }>
      <BookingForm />
    </Suspense>
  );
}
