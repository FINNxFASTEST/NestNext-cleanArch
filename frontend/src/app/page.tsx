"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene, SceneVariant } from "@/components/common/Scene";
import { SearchBar } from "@/components/home/SearchBar";
import { FeatureCard } from "@/components/home/FeatureCard";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { DestinationCard } from "@/components/home/DestinationCard";
import { LeafIcon, FlameIcon, MoonIcon, ArrowRIcon } from "@/components/common/Icons";
import { cn } from "@/lib/utils";
import { campsitesApi } from "@/lib/api";
import type { Campsite } from "@/types";

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
  { quote: "ตื่นเช้ามาเจอหมอกลอยเต็มหุบเขา เงียบมาก — แบบที่กรุงเทพฯ ให้ไม่ได้", name: "สิริพร ช.", place: "เขาใหญ่แคมป์วิว · มิ.ย. 2568", scene: "forest" },
  { quote: "จองง่ายกว่าที่คิด เจ้าของลานใจดี ส่งแผนที่มาทางไลน์ก่อนถึง", name: "ณัฐพล ว.", place: "ป่าสนวัดจันทร์ · มี.ค. 2568", scene: "dusk" },
  { quote: "ไปกับลูกครั้งแรก กลายเป็นกิจกรรมประจำครอบครัว จองอีกสองคืนเลย", name: "พิมพ์ลภัส ก.", place: "ริมโขง · ก.พ. 2568", scene: "lake" },
] as const;

const WHY_ITEMS = [
  { Icon: LeafIcon, title: "คัดสรรด้วยมือ", desc: "ทุกลานผ่านการตรวจเยี่ยม จากทีมงาน Kangtent เอง" },
  { Icon: FlameIcon, title: "จองง่าย จ่ายปลอดภัย", desc: "ยืนยันทันที คืนเงินได้ ภายใน 48 ชั่วโมงก่อนเดินทาง" },
  { Icon: MoonIcon, title: "รีวิวจริงจากนักเดินทาง", desc: "กว่า 12,000 รีวิว พร้อมภาพจากผู้พักจริง" },
];

const PITCH_SCENES: Record<string, SceneVariant> = {
  tent: "forest",
  glamping: "dusk",
  rv: "meadow",
  cabin: "cabin",
};

function campsiteToCardProps(c: Campsite, big = false) {
  const lowestPrice = c.pitches.length > 0
    ? Math.min(...c.pitches.map((p) => p.pricePerNight))
    : 0;
  const firstPitchType = c.pitches[0]?.type ?? "tent";
  const scene = PITCH_SCENES[firstPitchType] ?? "forest";
  const sub = c.location
    ? `${c.location.district} · ${c.location.province}`
    : "ประเทศไทย";
  return {
    title: c.name,
    sub,
    price: lowestPrice.toLocaleString(),
    scene: scene as SceneVariant,
    big,
  };
}

export default function HomePage() {
  const [campsites, setCampsites] = useState<Campsite[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    campsitesApi
      .list({ status: "active" })
      .then((res) => setCampsites(res.data))
      .catch(() => {});
  }, []);

  const tabs = campsites.length > 0
    ? campsites.slice(0, 4).map((c) => c.name)
    : ["ลาน สมใจ", "ลาน สมใจ 2", "ลาน สมใจ 3", "ลาน สมใจ 4"];

  return (
    <main className="bg-paper text-ink overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[640px] md:h-[780px]">
        <Scene variant="hero" className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(21,24,20,.25) 0%, rgba(21,24,20,.05) 35%, rgba(21,24,20,.55) 100%)" }}
        />
        <Nav active="home" variant="overlay" />

        <div className="absolute left-0 right-0 px-5 md:px-14" style={{ top: "clamp(72px, 14vw, 180px)" }}>
          <div className="text-cream-50 max-w-[720px]">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-4 text-clay">
              A FOREST RETREAT · ไทยแลนด์
            </div>
            <h1
              className="font-serif m-0 font-normal"
              style={{ fontSize: "clamp(34px, 7vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            >
              Pitch a tent.
              <br />
              <em className="italic text-clay">Unfold</em>{" "}
              the quiet.
            </h1>
            <p className="font-thai mt-4 md:mt-5 max-w-[540px] hidden sm:block text-lg leading-relaxed opacity-[0.88]">
              จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก
              <br />
              ค้นหาแคมป์ในฝัน ดูรีวิว จองล่วงหน้า พร้อมออกเดินทางได้ทันที
            </p>
          </div>
        </div>

        <div className="absolute left-0 right-0 flex justify-center px-4 md:px-14 bottom-4 md:-bottom-[44px]">
          <SearchBar />
        </div>
      </section>

      {/* FEATURED CAMPSITES */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(32px, 8vw, 120px)" }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
          <div>
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3 text-sage-500">
              FEATURED · ลานน่าสนใจ
            </div>
            <h2
              className="font-serif m-0 text-forest-900"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              ลานกางเต็นท์
              <br />
              <em className="text-ember">ที่น่าสนใจ</em>
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "font-thai px-[18px] py-2.5 rounded-full text-[13px] cursor-pointer transition-all whitespace-nowrap flex-shrink-0 border",
                  activeTab === i
                    ? "bg-forest-800 text-cream-50 border-forest-800"
                    : "bg-transparent text-ink border-line-strong",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Real campsite grid */}
        {campsites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-5">
            <div className="col-span-2 md:col-span-1 md:row-span-2">
              <Link href={`/campsites/${campsites[0].id}`} className="no-underline block h-full">
                <FeatureCard {...campsiteToCardProps(campsites[0], true)} big />
              </Link>
            </div>
            {campsites.slice(1, 5).map((c) => (
              <Link key={c.id} href={`/campsites/${c.id}`} className="no-underline block">
                <FeatureCard {...campsiteToCardProps(c)} />
              </Link>
            ))}
          </div>
        ) : (
          /* Fallback static cards while DB is empty */
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-5">
            <div className="col-span-2 md:col-span-1 md:row-span-2">
              <FeatureCard big title="เขาใหญ่ แคมป์วิว" sub="ปากช่อง · นครราชสีมา" rating="9.8" price="400" scene="forest" badges={["Superhost", "Dark sky"]} />
            </div>
            <FeatureCard title="ป่าสนวัดจันทร์" sub="กัลยาณิวัฒนา · เชียงใหม่" rating="9.6" price="350" scene="dusk" />
            <FeatureCard title="ดอยม่อนเงาะ" sub="แม่แตง · เชียงใหม่" rating="9.4" price="290" scene="meadow" />
            <FeatureCard title="ริมโขง แคมป์" sub="เชียงคาน · เลย" rating="9.2" price="320" scene="lake" />
            <FeatureCard title="บ้านไม้ A-Frame" sub="ปาย · แม่ฮ่องสอน" rating="9.7" price="1,250" scene="cabin" cabin />
          </div>
        )}
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3 text-sage-500">
          DESTINATIONS · ค้นหาด้วยจังหวัด
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-9">
          <h2
            className="font-serif m-0 text-forest-900"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            ปลายทาง
            <em className="text-ember"> ยอดฮิต</em>
          </h2>
          <a className="font-thai text-sm flex items-center gap-2 cursor-pointer text-forest-700">
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
        <div className="rounded-[20px] md:rounded-[28px] p-6 md:p-14 bg-cream-100">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-8 items-start">
            <div>
              <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3 text-sage-500">ทำไมต้อง KANGTENT</div>
              <h2 className="font-serif m-0 text-forest-900" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                ออกเดินทาง
                <br />
                อย่าง<em className="text-ember">สบายใจ</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:contents gap-6 md:gap-0">
              {WHY_ITEMS.map(({ Icon, title, desc }) => (
                <div key={title}>
                  <div className="w-12 h-12 rounded-[14px] grid place-items-center mb-4 bg-paper border border-line text-forest-700">
                    <Icon style={{ width: 22, height: 22 }} />
                  </div>
                  <div className="font-serif text-xl mb-2">{title}</div>
                  <div className="font-thai text-sm leading-relaxed text-forest-600">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 md:px-14" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-3 text-sage-500">CAMPFIRE STORIES · เรื่องเล่ารอบกองไฟ</div>
          <h2 className="font-serif m-0 text-forest-900" style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            เรื่องเล่าจาก
            <br />
            <em className="text-ember">นักเดินทาง</em>
          </h2>
          <p className="font-thai text-[15px] leading-relaxed mt-4 mx-auto text-forest-600 max-w-[500px]">
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
        <div className="relative rounded-[20px] md:rounded-[28px] overflow-hidden min-h-[280px]">
          <Scene variant="night" className="absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-cream-50 text-center py-10 px-6">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-4 text-clay">
              YOUR NEXT NIGHT UNDER THE STARS
            </div>
            <h2 className="font-serif m-0 max-w-[700px] font-normal" style={{ fontSize: "clamp(28px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              คืนสุดสัปดาห์นี้
              <br />
              <em className="text-clay">อยู่ใต้ดาว</em>ดีกว่าไหม
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
              <button className="font-thai font-medium text-[15px] px-7 py-4 rounded-full border-0 cursor-pointer transition-colors bg-ember text-cream-50">
                ค้นหาแคมป์ในฝัน
              </button>
              <button className="font-thai font-medium text-[15px] px-7 py-4 rounded-full cursor-pointer transition-colors bg-cream-50/[0.12] text-cream-50 border border-cream-50/30 backdrop-blur-[6px]">
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
