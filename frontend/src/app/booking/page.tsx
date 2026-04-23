"use client";

import { useState } from "react";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene } from "@/components/common/Scene";
import { FormCard } from "@/components/booking/FormCard";
import { Field } from "@/components/booking/Field";
import { StepHeader } from "@/components/booking/StepHeader";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ChevronLIcon, CalendarIcon, UsersIcon,
  CheckIcon, TentIcon, MoonIcon, FlameIcon, CupIcon, LeafIcon,
} from "@/components/common/Icons";

const GUESTS = [
  { role: "ผู้ใหญ่ · หัวหน้ากลุ่ม", name: "กฤษณ์ อารีวงศ์" },
  { role: "ผู้ใหญ่", name: "พิมพ์ชนก สุดใจ" },
  { role: "เด็ก (อายุ 7)", name: "น้องภูผา" },
];

const ADDONS = [
  { name: "เต็นท์ 3 คน พร้อมติดตั้ง", price: "฿ 350 / คืน", Icon: TentIcon },
  { name: "ถุงนอน (หนา -5°C)", price: "฿ 120 / คืน", Icon: MoonIcon },
  { name: "ชุดฟืน + ไฟฉาย", price: "฿ 180", Icon: FlameIcon },
  { name: "อาหารเช้าฝีมือเจ้าบ้าน", price: "฿ 150 / ท่าน", Icon: CupIcon },
];

const PAYMENT_METHODS = ["บัตรเครดิต/เดบิต", "พร้อมเพย์ QR", "โอนธนาคาร", "TrueMoney"];

function Row({ l, r, ember }: { l: React.ReactNode; r: React.ReactNode; ember?: boolean }) {
  return (
    <div className={cn("flex justify-between font-thai text-sm", ember ? "text-ember-dark" : "text-ink")}>
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}

export default function BookingPage() {
  const [step] = useState(2);
  const [payMethod, setPayMethod] = useState(0);
  const [addons, setAddons] = useState([true, false, true, false]);

  return (
    <main className="bg-paper text-ink">
      <Nav active="bookings" variant="solid" />

      {/* Step header */}
      <section className="px-4 md:px-14 pt-8 pb-6 border-b border-line">
        <div className="flex items-center gap-3 font-thai text-[13px] mb-5 cursor-pointer text-sage-500">
          <ChevronLIcon style={{ width: 16, height: 16 }} /> กลับไปที่เขาใหญ่ แคมป์วิว
        </div>
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
            <StepHeader currentStep={step} />
          </div>
        </div>
      </section>

      {/* Main layout — stacks on mobile */}
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
              <div className="font-serif text-xl font-medium mt-1">เขาใหญ่ แคมป์วิว</div>
              <div className="font-thai text-[13px] mt-1.5 flex flex-wrap gap-x-4 gap-y-1 items-center text-forest-600">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon style={{ width: 14, height: 14 }} /> 24 — 26 เม.ย 2569
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersIcon style={{ width: 14, height: 14 }} /> 2 ผู้ใหญ่ · 1 เด็ก
                </span>
                <span>ลานริมเขา × 2</span>
              </div>
            </div>
            <button className="font-thai text-[13px] px-[22px] py-3 rounded-full cursor-pointer flex-shrink-0 bg-transparent border border-line-strong text-ink">
              แก้ไข
            </button>
          </div>

          {/* Contact details */}
          <FormCard title="ข้อมูลผู้จอง" eyebrow="CONTACT · ผู้ติดต่อ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="ชื่อ" value="กฤษณ์" />
              <Field label="นามสกุล" value="อารีวงศ์" />
              <Field label="อีเมล" value="krit@example.com" />
              <Field label="เบอร์โทรศัพท์" value="+66 89 123 4567" />
            </div>
          </FormCard>

          {/* Guests */}
          <FormCard title="รายชื่อผู้เดินทาง" eyebrow="GUESTS · ผู้พักค้างคืน">
            <div className="grid gap-2.5">
              {GUESTS.map((g, i) => (
                <div key={i} className="flex gap-4 items-center rounded-xl py-3.5 px-4 bg-cream-100">
                  <div className="w-8 h-8 rounded-full grid place-items-center text-xs font-serif flex-shrink-0 bg-forest-700 text-cream-50">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-thai text-sm">{g.name}</div>
                    <div className="font-thai text-[11px] mt-0.5 text-sage-500">{g.role}</div>
                  </div>
                  <button className="font-thai text-xs px-3 py-1.5 rounded-full cursor-pointer flex-shrink-0 bg-transparent border border-line-strong text-ink">
                    แก้ไข
                  </button>
                </div>
              ))}
            </div>
          </FormCard>

          {/* Add-ons */}
          <FormCard title="เพิ่มความสบายให้ทริป" eyebrow="ADD-ONS · ของให้เช่า">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDONS.map(({ name, price, Icon }, i) => {
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
                    <div
                      className={cn(
                        "w-5 h-5 rounded-[6px] flex-shrink-0 grid place-items-center border-[1.5px]",
                        checked ? "bg-forest-700 border-forest-700 text-cream-50" : "bg-paper border-line-strong",
                      )}
                    >
                      {checked && <CheckIcon style={{ width: 12, height: 12 }} />}
                    </div>
                    <Icon style={{ width: 22, height: 22 }} className="text-forest-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-thai text-sm">{name}</div>
                      <div className="font-thai text-xs mt-0.5 text-sage-500">{price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FormCard>

          {/* Payment */}
          <FormCard title="วิธีชำระเงิน" eyebrow="PAYMENT · ชำระเงิน">
            <div className="flex gap-2 mb-5 flex-wrap">
              {PAYMENT_METHODS.map((m, i) => (
                <button
                  key={i}
                  className={cn(
                    "font-thai px-[18px] py-2.5 rounded-full text-[13px] cursor-pointer border",
                    payMethod === i
                      ? "bg-forest-800 text-cream-50 border-forest-800"
                      : "bg-paper text-ink border-line-strong",
                  )}
                  onClick={() => setPayMethod(i)}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="grid gap-4">
              <Field label="หมายเลขบัตร" value="•••• •••• •••• 4892" mono />
              <div className="grid grid-cols-2 gap-4">
                <Field label="วันหมดอายุ" value="09 / 27" mono />
                <Field label="CVV" value="•••" mono />
              </div>
              <Field label="ชื่อบนบัตร" value="Krit Areewong" />
            </div>
          </FormCard>

          {/* Cancellation note */}
          <div className="flex gap-3.5 rounded-2xl p-5 bg-cream-100 border border-dashed border-line-strong">
            <LeafIcon style={{ width: 24, height: 24 }} className="text-forest-700 shrink-0" />
            <div>
              <div className="font-serif text-base mb-1 font-medium">ยกเลิกฟรีก่อน 22 เม.ย 23:59</div>
              <div className="font-thai text-[13px] leading-relaxed text-forest-600">
                การจองของคุณได้รับการคุ้มครองโดย Kangtent Care — หากสภาพอากาศไม่เอื้ออำนวย เรามีนโยบายเลื่อนวันให้ฟรี
              </div>
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <aside>
          <div className="sticky top-6">
            {/* Summary card */}
            <div className="rounded-2xl border border-line overflow-hidden shadow-card">
              {/* Illustrated header */}
              <div className="relative h-[140px]">
                <Scene variant="dusk" className="absolute inset-0" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 0%, rgba(21,24,20,.6) 100%)" }}
                />
                <div className="absolute bottom-3.5 left-5 right-5 text-cream-50">
                  <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-clay">
                    YOUR STAY
                  </div>
                  <div className="font-serif text-2xl font-medium mt-1">2 คืน · เขาใหญ่</div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-2.5 pb-4 border-b border-line font-thai text-sm">
                  <Row l="ลานริมเขา × 2 × 2 คืน" r="฿ 1,600" />
                  <Row l="เต็นท์ 3 คน × 2 คืน" r="฿ 700" />
                  <Row l="ชุดฟืน + ไฟฉาย" r="฿ 180" />
                  <Row l="ค่าบริการ" r="฿ 90" />
                  <Row l="ส่วนลด WELCOME25" r="−฿ 200" ember />
                </div>

                {/* Discount code */}
                <div className="flex gap-2 my-4">
                  <div className="flex-1">
                    <Input
                      placeholder="กรอกรหัสส่วนลด"
                      className="rounded-xl border-line-strong bg-paper text-ink h-auto py-3 px-3.5 font-thai text-[13px]"
                    />
                  </div>
                  <button className="font-thai text-[13px] px-[18px] py-3 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink">
                    ใช้โค้ด
                  </button>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-line">
                  <div>
                    <div className="font-thai text-xs text-sage-500">ราคาสุทธิ</div>
                    <div className="font-serif text-[34px] font-medium text-forest-900">฿ 2,370</div>
                  </div>
                  <div className="font-thai text-[11px] text-right max-w-[120px] text-sage-500">
                    รวมภาษี และค่าบริการแล้ว
                  </div>
                </div>

                <button className="w-full font-thai font-medium text-[15px] py-4 rounded-full border-0 cursor-pointer mt-5 bg-ember text-cream-50">
                  ยืนยันและชำระเงิน
                </button>

                <div className="font-thai text-[11px] text-center mt-3.5 leading-relaxed text-sage-500">
                  การกดยืนยัน แสดงว่าคุณยอมรับ
                  <br />
                  <u>เงื่อนไขการใช้งาน</u> และ <u>นโยบายยกเลิก</u>
                </div>
              </div>
            </div>

            {/* Reassurance mini-card */}
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
