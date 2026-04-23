"use client";

import { useState } from "react";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene } from "@/components/common/Scene";
import { SearchBar } from "@/components/home/SearchBar";
import { FeatureCard } from "@/components/home/FeatureCard";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { DestinationCard } from "@/components/home/DestinationCard";
import { LeafIcon, FlameIcon, MoonIcon, ArrowRIcon } from "@/components/common/Icons";

const TABS = ["ลาน สมใจ", "ลาน สมใจ 2", "ลาน สมใจ 3", "ลาน สมใจ 4"];

const DESTINATIONS = [
  { name: "เชียงใหม่", count: "248 ลาน", scene: "forest" },
  { name: "ตาก", count: "132 ลาน", scene: "meadow" },
  { name: "แม่ฮ่องสอน", count: "96 ลาน", scene: "dusk" },
  { name: "เลย", count: "74 ลาน", scene: "lake" },
  { name: "เพชรบุรี", count: "58 ลาน", scene: "meadow" },
  { name: "กาญจนบุรี", count: "112 ลาน", scene: "hero" },
  { name: "น่าน", count: "89 ลาน", scene: "forest" },
  { name: "กระบี่", count: "43 ลาน", scene: "dusk" },
] as const;

const TESTIMONIALS = [
  {
    quote: "ตื่นเช้ามาเจอหมอกลอยเต็มหุบเขา เงียบมาก — แบบที่กรุงเทพฯ ให้ไม่ได้",
    name: "สิริพร ช.",
    place: "เขาใหญ่แคมป์วิว · มิ.ย. 2568",
    scene: "forest",
  },
  {
    quote: "จองง่ายกว่าที่คิด เจ้าของลานใจดี ส่งแผนที่มาทางไลน์ก่อนถึง",
    name: "ณัฐพล ว.",
    place: "ป่าสนวัดจันทร์ · มี.ค. 2568",
    scene: "dusk",
  },
  {
    quote: "ไปกับลูกครั้งแรก กลายเป็นกิจกรรมประจำครอบครัว จองอีกสองคืนเลย",
    name: "พิมพ์ลภัส ก.",
    place: "ริมโขง · ก.พ. 2568",
    scene: "lake",
  },
] as const;

const WHY_ITEMS = [
  {
    Icon: LeafIcon,
    title: "คัดสรรด้วยมือ",
    desc: "ทุกลานผ่านการตรวจเยี่ยม จากทีมงาน Kangtent เอง",
  },
  {
    Icon: FlameIcon,
    title: "จองง่าย จ่ายปลอดภัย",
    desc: "ยืนยันทันที คืนเงินได้ ภายใน 48 ชั่วโมงก่อนเดินทาง",
  },
  {
    Icon: MoonIcon,
    title: "รีวิวจริงจากนักเดินทาง",
    desc: "กว่า 12,000 รีวิว พร้อมภาพจากผู้พักจริง",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "hidden" }}>

      {/* HERO */}
      <section className="relative h-[640px] md:h-[780px]">
        <Scene variant="hero" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(21,24,20,.25) 0%, rgba(21,24,20,.05) 35%, rgba(21,24,20,.55) 100%)",
          }}
        />
        <Nav active="home" variant="overlay" />

        {/* Hero copy */}
        <div
          className="absolute left-0 right-0 px-5 md:px-14"
          style={{ top: "clamp(72px, 14vw, 180px)" }}
        >
          <div style={{ color: "#F7F2E7", maxWidth: 720 }}>
            <div
              className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-4"
              style={{ color: "#D9A273" }}
            >
              A FOREST RETREAT · ไทยแลนด์
            </div>
            <h1
              className="font-serif m-0"
              style={{
                fontSize: "clamp(34px, 7vw, 84px)",
                lineHeight: 1.02,
                fontWeight: 400,
                letterSpacing: "-0.03em",
              }}
            >
              Pitch a tent.
              <br />
              <em style={{ fontStyle: "italic", color: "#D9A273" }}>Unfold</em>{" "}
              the quiet.
            </h1>
            <p
              className="font-thai mt-4 md:mt-5 max-w-[540px] hidden sm:block"
              style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.88 }}
            >
              จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก
              <br />
              ค้นหาแคมป์ในฝัน ดูรีวิว จองล่วงหน้า พร้อมออกเดินทางได้ทันที
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div
          className="absolute left-0 right-0 flex justify-center px-4 md:px-14 bottom-4 md:-bottom-[44px]"
        >
          <SearchBar />
        </div>
      </section>

      {/* FEATURED CAMPSITES */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(32px, 8vw, 120px)" }}>
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
          <div>
            <div
              className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3"
              style={{ color: "#7C8F6F" }}
            >
              FEATURED · ลานน่าสนใจ
            </div>
            <h2
              className="font-serif m-0"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1B2620" }}
            >
              ลานกางเต็นท์
              <br />
              <em style={{ color: "#C97B4A" }}>ที่น่าสนใจ</em>
            </h2>
          </div>
          {/* Tabs — scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="font-thai px-[18px] py-2.5 rounded-full text-[13px] cursor-pointer transition-all whitespace-nowrap flex-shrink-0"
                style={{
                  background: activeTab === i ? "#263328" : "transparent",
                  color: activeTab === i ? "#F7F2E7" : "var(--ink)",
                  border: `1px solid ${activeTab === i ? "#263328" : "var(--line-strong)"}`,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Feature grid — big card + 4 small cards */}
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-5">
          {/* Big card — full width on mobile, row-span-2 on desktop */}
          <div className="col-span-2 md:col-span-1 md:row-span-2">
            <FeatureCard
              big
              title="เขาใหญ่ แคมป์วิว"
              sub="ปากช่อง · นครราชสีมา"
              rating="9.8"
              price="400"
              scene="forest"
              badges={["Superhost", "Dark sky"]}
            />
          </div>
          <FeatureCard title="ป่าสนวัดจันทร์" sub="กัลยาณิวัฒนา · เชียงใหม่" rating="9.6" price="350" scene="dusk" />
          <FeatureCard title="ดอยม่อนเงาะ" sub="แม่แตง · เชียงใหม่" rating="9.4" price="290" scene="meadow" />
          <FeatureCard title="ริมโขง แคมป์" sub="เชียงคาน · เลย" rating="9.2" price="320" scene="lake" />
          <FeatureCard title="บ้านไม้ A-Frame" sub="ปาย · แม่ฮ่องสอน" rating="9.7" price="1,250" scene="cabin" cabin />
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3"
          style={{ color: "#7C8F6F" }}
        >
          DESTINATIONS · ค้นหาด้วยจังหวัด
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-9">
          <h2
            className="font-serif m-0"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1B2620" }}
          >
            ปลายทาง
            <em style={{ color: "#C97B4A" }}> ยอดฮิต</em>
          </h2>
          <a
            className="font-thai text-sm flex items-center gap-2 cursor-pointer"
            style={{ color: "#2F4034" }}
          >
            ดูทั้งหมด <ArrowRIcon style={{ width: 16, height: 16 }} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.name} name={d.name} count={d.count} scene={d.scene} />
          ))}
        </div>
      </section>

      {/* WHY KANGTENT */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div
          className="rounded-[20px] md:rounded-[28px] p-6 md:p-14"
          style={{ background: "var(--cream-100)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-8 md:gap-8 items-start">
            <div>
              <div
                className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3"
                style={{ color: "#7C8F6F" }}
              >
                ทำไมต้อง KANGTENT
              </div>
              <h2
                className="font-serif m-0"
                style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1B2620" }}
              >
                ออกเดินทาง
                <br />
                อย่าง<em style={{ color: "#C97B4A" }}>สบายใจ</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:contents gap-6 md:gap-0">
              {WHY_ITEMS.map(({ Icon, title, desc }) => (
                <div key={title}>
                  <div
                    className="w-12 h-12 rounded-[14px] grid place-items-center mb-4"
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      color: "#2F4034",
                    }}
                  >
                    <Icon style={{ width: 22, height: 22 }} />
                  </div>
                  <div className="font-serif text-xl mb-2">{title}</div>
                  <div className="font-thai text-sm leading-relaxed" style={{ color: "#4C5A4E" }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <div
            className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3"
            style={{ color: "#7C8F6F" }}
          >
            CAMPFIRE STORIES · เรื่องเล่ารอบกองไฟ
          </div>
          <h2
            className="font-serif m-0"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1B2620" }}
          >
            เรื่องเล่าจาก
            <br />
            <em style={{ color: "#C97B4A" }}>นักเดินทาง</em>
          </h2>
          <p className="font-thai text-[15px] leading-relaxed mt-4 mx-auto" style={{ color: "#4C5A4E", maxWidth: 500 }}>
            ประสบการณ์จริง จากคนที่ใช้คืนสุดสัปดาห์ ออกไปหาดาว หาหมอก หาตัวเอง
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-4 md:px-14 pb-16 md:pb-24" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div className="relative rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ minHeight: 280 }}>
          <Scene variant="night" style={{ position: "absolute", inset: 0 }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#F7F2E7",
              textAlign: "center",
              padding: "40px 24px",
            }}
          >
            <div
              className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-4"
              style={{ color: "#D9A273" }}
            >
              YOUR NEXT NIGHT UNDER THE STARS
            </div>
            <h2
              className="font-serif m-0 max-w-[700px]"
              style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              คืนสุดสัปดาห์นี้
              <br />
              <em style={{ color: "#D9A273" }}>อยู่ใต้ดาว</em>ดีกว่าไหม
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
              <button
                className="font-thai font-medium text-[15px] px-7 py-4 rounded-full border-0 cursor-pointer transition-colors"
                style={{ background: "#C97B4A", color: "#F7F2E7" }}
              >
                ค้นหาแคมป์ในฝัน
              </button>
              <button
                className="font-thai font-medium text-[15px] px-7 py-4 rounded-full cursor-pointer transition-colors"
                style={{
                  background: "rgba(247,242,231,.12)",
                  color: "#F7F2E7",
                  border: "1px solid rgba(247,242,231,.3)",
                  backdropFilter: "blur(6px)",
                }}
              >
                ลงทะเบียนเจ้าของลาน
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
