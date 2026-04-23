"use client";

import Link from "next/link";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene } from "@/components/common/Scene";
import { CheckIcon, LeafIcon } from "@/components/common/Icons";

export default function ConfirmationPage() {
  return (
    <main className="bg-paper text-ink min-h-screen">
      <Nav active="none" variant="solid" />

      <section className="px-4 md:px-14 py-16 md:py-24">
        <div className="mx-auto max-w-[620px] text-center">
          {/* Illustrated banner */}
          <div className="relative rounded-3xl overflow-hidden h-[220px] mb-10">
            <Scene variant="forest" className="absolute inset-0" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(21,24,20,.55) 100%)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full grid place-items-center bg-ember text-cream-50 shadow-card">
                <CheckIcon style={{ width: 32, height: 32 }} />
              </div>
            </div>
          </div>

          <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3 text-sage-500">
            BOOKING CONFIRMED · ยืนยันการจองแล้ว
          </div>
          <h1 className="font-serif m-0 text-forest-900" style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            เตรียมตัวออกเดินทาง
            <br />
            <em className="text-ember">ได้เลย!</em>
          </h1>
          <p className="font-thai mt-4 text-[15px] leading-relaxed text-forest-600 max-w-[480px] mx-auto">
            การจองของคุณได้รับการยืนยันแล้ว เราจะส่งรายละเอียดไปยังอีเมลของคุณ
            เจ้าของลานจะติดต่อกลับเพื่อยืนยันก่อนวันเดินทาง
          </p>

          <div className="flex gap-3.5 rounded-2xl p-5 mt-8 bg-cream-100 border border-line text-left">
            <LeafIcon style={{ width: 24, height: 24 }} className="text-forest-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-serif text-base mb-1 font-medium">ยกเลิกได้ฟรีภายใน 48 ชั่วโมง</div>
              <div className="font-thai text-[13px] leading-relaxed text-forest-600">
                หากต้องการยกเลิก เข้าไปที่ "การจองของฉัน" หรือติดต่อทีมงาน Kangtent ได้ตลอด 24 ชั่วโมง
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-10 justify-center">
            <Link
              href="/"
              className="font-thai font-medium text-[15px] px-8 py-4 rounded-full no-underline bg-ember text-cream-50"
            >
              กลับหน้าแรก
            </Link>
            <Link
              href="/booking"
              className="font-thai font-medium text-[15px] px-8 py-4 rounded-full no-underline bg-transparent border border-line-strong text-ink"
            >
              การจองของฉัน
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
