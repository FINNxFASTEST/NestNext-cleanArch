"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene, SceneVariant } from "@/components/common/Scene";
import {
  SearchIcon, PinIcon, CalendarIcon, UsersIcon, StarIcon, HeartIcon,
  BoltIcon, FlameIcon, DropletIcon, WifiIcon, ShowerIcon, CarIcon,
  CupIcon, DogIcon, TentIcon, MapIcon, ArrowRIcon, CheckIcon, ChevronDIcon,
} from "@/components/common/Icons";

const REGIONS = ["ทั้งหมด", "ภาคเหนือ", "ภาคอีสาน", "ภาคกลาง", "ภาคตะวันออก", "ภาคใต้"];
const TENT_OPTIONS = ["เต็นท์ส่วนตัว", "กลามปิ้ง", "บ้านพัก / A-Frame", "ลานเต็นท์รวม", "รถบ้าน / RV"];
const SORT_OPTIONS = ["แนะนำ", "ราคา: ต่ำไปสูง", "ราคา: สูงไปต่ำ", "รีวิวดีที่สุด", "ใหม่ล่าสุด"];
const AMENITY_LIST = [
  { label: "ห้องน้ำ", Icon: ShowerIcon },
  { label: "ที่จอดรถ", Icon: CarIcon },
  { label: "ไฟฟ้า", Icon: BoltIcon },
  { label: "Wi-Fi", Icon: WifiIcon },
  { label: "น้ำประปา", Icon: DropletIcon },
  { label: "จุดก่อไฟ", Icon: FlameIcon },
  { label: "ร้านกาแฟ", Icon: CupIcon },
  { label: "สัตว์เลี้ยง", Icon: DogIcon },
];
const TAG_ICON: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "ห้องน้ำ": ShowerIcon, "ที่จอดรถ": CarIcon, "ไฟฟ้า": BoltIcon, "Wi-Fi": WifiIcon,
  "น้ำประปา": DropletIcon, "จุดก่อไฟ": FlameIcon, "ร้านกาแฟ": CupIcon, "สัตว์เลี้ยง": DogIcon,
};

const CAMPS = [
  {
    id: 1, name: "เขาใหญ่ แคมป์วิว", sub: "ปากช่อง · นครราชสีมา", region: "ภาคอีสาน",
    rating: 9.8, reviews: 482, price: 400, scene: "forest" as SceneVariant,
    badges: ["Superhost", "วิวหมอก"], tags: ["ห้องน้ำ", "ที่จอดรถ", "ไฟฟ้า", "จุดก่อไฟ"],
    tent: "เต็นท์ส่วนตัว", instant: true, pet: true,
    blurb: "ลานกว้างใต้ป่าสน เห็นทะเลหมอกทุกเช้า เจ้าของลานใจดี มีร้านกาแฟเล็กๆ ในลาน",
  },
  {
    id: 2, name: "ป่าสนวัดจันทร์", sub: "กัลยาณิวัฒนา · เชียงใหม่", region: "ภาคเหนือ",
    rating: 9.6, reviews: 318, price: 350, scene: "dusk" as SceneVariant,
    badges: ["Dark sky"], tags: ["ห้องน้ำ", "ที่จอดรถ", "จุดก่อไฟ"],
    tent: "เต็นท์ส่วนตัว", instant: true, pet: false,
    blurb: "ป่าสน 3 ใบ อากาศเย็นตลอดปี เหมาะกับการดูดาวเพราะแทบไม่มีแสงรบกวน",
  },
  {
    id: 3, name: "ดอยม่อนเงาะ", sub: "แม่แตง · เชียงใหม่", region: "ภาคเหนือ",
    rating: 9.4, reviews: 256, price: 290, scene: "meadow" as SceneVariant,
    badges: ["ใหม่"], tags: ["ห้องน้ำ", "ที่จอดรถ", "Wi-Fi"],
    tent: "กลามปิ้ง", instant: false, pet: true,
    blurb: "ทุ่งหญ้ากว้างบนดอย พระอาทิตย์ขึ้นแบบ 360 องศา มีบริการจัดเต็นท์ให้พร้อม",
  },
  {
    id: 4, name: "ริมโขง แคมป์", sub: "เชียงคาน · เลย", region: "ภาคอีสาน",
    rating: 9.2, reviews: 194, price: 320, scene: "lake" as SceneVariant,
    badges: ["ริมน้ำ"], tags: ["ห้องน้ำ", "ที่จอดรถ", "ร้านกาแฟ"],
    tent: "เต็นท์ส่วนตัว", instant: true, pet: true,
    blurb: "กางเต็นท์ริมแม่น้ำโขง ตื่นเช้าเห็นตะวันขึ้นจากฝั่งลาว เดินไปถนนคนเดินได้",
  },
  {
    id: 5, name: "บ้านไม้ A-Frame ปาย", sub: "ปาย · แม่ฮ่องสอน", region: "ภาคเหนือ",
    rating: 9.7, reviews: 127, price: 1250, scene: "cabin" as SceneVariant,
    badges: ["A-Frame", "เหมาหลัง"], tags: ["ห้องน้ำ", "ที่จอดรถ", "Wi-Fi", "ไฟฟ้า"],
    tent: "บ้านพัก / A-Frame", instant: true, pet: false,
    blurb: "บ้านไม้กระจกใสมองเห็นทุ่งนา พักได้ 4 ท่าน มีครัวเล็กและเตียงนุ่มๆ",
  },
  {
    id: 6, name: "หาดบ่อแก้ว", sub: "บางสะพาน · ประจวบฯ", region: "ภาคใต้",
    rating: 9.1, reviews: 89, price: 280, scene: "lake" as SceneVariant,
    badges: ["ริมทะเล"], tags: ["ห้องน้ำ", "ที่จอดรถ", "น้ำประปา"],
    tent: "ลานเต็นท์รวม", instant: true, pet: true,
    blurb: "หาดทรายขาวคนน้อย เหมาะพักผ่อนกับครอบครัว มีจุดให้ก่อกองไฟริมทะเล",
  },
];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function FilterBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <div className="font-thai" style={{ fontSize: 14, fontWeight: 500, color: "var(--forest-900)" }}>{title}</div>
        {hint && <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function FilterToggle({ on, onChange, title, sub }: { on: boolean; onChange: () => void; title: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={onChange}>
      <div>
        <div className="font-thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{title}</div>
        <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ width: 38, height: 22, borderRadius: 999, position: "relative", background: on ? "var(--ember)" : "var(--line-strong)", transition: "background .15s" }}>
        <div style={{
          position: "absolute", top: 2, left: on ? 18 : 2,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left .15s", boxShadow: "0 1px 2px rgba(0,0,0,.15)",
        }} />
      </div>
    </div>
  );
}

function CampRow({ camp }: { camp: typeof CAMPS[number] }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "320px 1fr", gap: 0,
      background: "var(--paper)", borderRadius: 22, overflow: "hidden",
      border: "1px solid var(--line)", cursor: "pointer",
      boxShadow: "var(--shadow-soft)",
      transition: "transform .18s, box-shadow .18s",
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-soft)"; }}
    >
      <div style={{ position: "relative", height: 260 }}>
        <Scene variant={camp.scene} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 0%, transparent 30%, rgba(0,0,0,.3) 100%)" }} />
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {camp.badges.map((b, i) => (
              <span key={i} className="font-thai" style={{
                padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                background: "rgba(247,242,231,.88)", color: "var(--forest-900)", backdropFilter: "blur(6px)",
              }}>{b}</span>
            ))}
          </div>
          <button style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(247,242,231,.9)", border: "none", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <HeartIcon style={{ color: "var(--forest-700)", width: 15, height: 15 }} />
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <span className="font-thai" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, background: "rgba(27,38,32,.75)", color: "var(--cream-50)", backdropFilter: "blur(4px)" }}>1 / 24 ภาพ</span>
        </div>
      </div>

      <div style={{ padding: 22, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", display: "flex", alignItems: "center", gap: 5 }}>
                <PinIcon style={{ width: 11, height: 11 }} /> {camp.sub}
              </div>
              {camp.instant && (
                <span className="font-thai" style={{ fontSize: 10, color: "var(--ember)", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
                  <BoltIcon style={{ width: 10, height: 10 }} /> จองทันที
                </span>
              )}
            </div>
            <div className="font-serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--forest-900)", letterSpacing: "-0.01em", marginBottom: 6 }}>
              {camp.name}
            </div>
            <p className="font-thai" style={{ fontSize: 13, lineHeight: 1.55, color: "#4C5A4E", margin: 0, maxWidth: 520 }}>
              {camp.blurb}
            </p>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 999, background: "var(--cream-100)" }}>
              <StarIcon style={{ width: 12, height: 12, color: "var(--ember)" }} />
              <span className="font-serif" style={{ fontSize: 15, fontWeight: 600, color: "var(--forest-900)" }}>{camp.rating}</span>
            </div>
            <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 4 }}>{camp.reviews} รีวิว</div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
          <span className="font-thai" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "var(--cream-100)", color: "var(--forest-800)", fontWeight: 500 }}>
            {camp.tent}
          </span>
          {camp.tags.map((t, i) => {
            const I = TAG_ICON[t];
            return (
              <span key={i} className="font-thai" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "var(--paper)", border: "1px solid var(--line)", color: "#4C5A4E", display: "inline-flex", alignItems: "center", gap: 5 }}>
                {I && <I style={{ width: 11, height: 11 }} />} {t}
              </span>
            );
          })}
        </div>

        <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderTop: "1px dashed var(--line)" }}>
          <div>
            <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>ต่อที่ / คืน</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span className="font-serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--forest-900)" }}>฿{camp.price.toLocaleString()}</span>
              <span className="font-thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>บาท</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href={`/campsites/${camp.id}`} className="font-thai no-underline" style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 999, fontSize: 13,
              border: "1.5px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", cursor: "pointer",
            }}>
              ดูรายละเอียด
            </Link>
            <Link href={`/campsites/${camp.id}`} className="font-thai no-underline" style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 999, fontSize: 13,
              background: "var(--ember)", color: "var(--cream-50)", border: "none", cursor: "pointer",
            }}>
              จองเลย <ArrowRIcon style={{ width: 14 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [region, setRegion] = useState("ทั้งหมด");
  const [amenities, setAmenities] = useState(["ห้องน้ำ", "ที่จอดรถ"]);
  const [tentTypes, setTentTypes] = useState(["เต็นท์ส่วนตัว"]);
  const [pets, setPets] = useState(false);
  const [instant, setInstant] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("แนะนำ");
  const [view, setView] = useState<"list" | "map">("list");
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(false);

  const activeChips = [
    ...amenities,
    ...tentTypes,
    region !== "ทั้งหมด" ? region : null,
    instant ? "จองทันที" : null,
    pets ? "รับสัตว์เลี้ยง" : null,
  ].filter(Boolean) as string[];

  const avgPrice = Math.round(CAMPS.reduce((s, c) => s + c.price, 0) / CAMPS.length);

  function loadMore() {
    setLoading(true);
    setTimeout(() => {
      setVisible((v) => Math.min(v + 2, CAMPS.length));
      setLoading(false);
    }, 600);
  }

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Nav active="search" variant="solid" />

      {/* Search context bar */}
      <section style={{ background: "var(--cream-100)", padding: "28px 56px 36px", borderBottom: "1px solid var(--line)" }}>
        <div className="font-sans" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 10 }}>
          SEARCH · ค้นหาลานกางเต็นท์
        </div>
        <h1 className="font-serif" style={{ fontSize: 40, margin: 0, fontWeight: 400, color: "var(--forest-900)", letterSpacing: "-0.02em" }}>
          ลานกางเต็นท์ <em style={{ color: "var(--ember)" }}>ทั่วไทย</em>
        </h1>

        {/* Search row */}
        <div style={{
          marginTop: 22, background: "var(--paper)", borderRadius: 20, padding: 8,
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 0,
          border: "1px solid var(--line)", boxShadow: "0 2px 12px rgba(27,38,32,.06)",
        }}>
          {[
            { label: "ปลายทาง", hint: "ค้นหาจังหวัด หรือชื่อลาน", Icon: PinIcon },
            { label: "วันที่เดินทาง", hint: "24 เม.ย — 26 เม.ย", Icon: CalendarIcon },
            { label: "ผู้พักอาศัย", hint: "2 ผู้ใหญ่ · 1 เด็ก", Icon: UsersIcon },
          ].map((f, i) => (
            <div key={i} style={{
              padding: "14px 20px", borderRight: i < 2 ? "1px solid var(--line)" : "none",
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            }}>
              <f.Icon style={{ width: 20, height: 20, color: "var(--sage-500)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="font-thai" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500 }}>{f.label}</div>
                <div className="font-thai" style={{ fontSize: 15, color: "var(--ink)", marginTop: 2 }}>{f.hint}</div>
              </div>
            </div>
          ))}
          <button className="font-thai" style={{
            margin: 4, padding: "0 32px", fontSize: 15, borderRadius: 999,
            background: "var(--ember)", color: "var(--cream-50)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <SearchIcon style={{ width: 18, height: 18 }} /> ค้นหา
          </button>
        </div>

        {/* Quick chips */}
        <div style={{ marginTop: 20, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className="font-thai" style={{ fontSize: 12, color: "var(--sage-500)", marginRight: 4 }}>แนะนำ:</span>
          {["ทะเลหมอก", "ริมน้ำ", "ป่าสน", "ดูดาว", "สัตว์เลี้ยง", "เหมาะกับครอบครัว"].map((t, i) => (
            <button key={i} className="font-thai" style={{
              padding: "6px 14px", borderRadius: 999, fontSize: 12,
              background: "var(--paper)", border: "1px solid var(--line-strong)",
              cursor: "pointer", color: "var(--forest-800)",
            }}>{t}</button>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "32px 56px 56px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 32, alignItems: "flex-start" }}>

        {/* Filter sidebar */}
        <aside style={{
          background: "var(--paper)", borderRadius: 22,
          border: "1px solid var(--line)", padding: 24,
          position: "sticky", top: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div className="font-serif" style={{ fontSize: 22, color: "var(--forest-900)" }}>ตัวกรอง</div>
            <button className="font-thai" style={{
              fontSize: 12, color: "var(--ember)", background: "none",
              border: "none", cursor: "pointer", textDecoration: "underline",
            }} onClick={() => { setRegion("ทั้งหมด"); setAmenities([]); setTentTypes([]); setPets(false); setInstant(false); setMinRating(0); }}>
              ล้างทั้งหมด
            </button>
          </div>

          <FilterBlock title="ช่วงราคา" hint="บาท ต่อคืน">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="font-serif" style={{ fontSize: 18, color: "var(--forest-900)" }}>฿150</div>
              <div className="font-serif" style={{ fontSize: 18, color: "var(--forest-900)" }}>฿1,500+</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 36, marginBottom: 8 }}>
              {[0.3, 0.5, 0.7, 0.9, 1, 0.85, 0.6, 0.4, 0.55, 0.3, 0.25, 0.2].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h * 100}%`, borderRadius: 2,
                  background: i >= 1 && i <= 9 ? "var(--ember)" : "var(--cream-100)",
                  opacity: i >= 1 && i <= 9 ? 0.75 : 0.5,
                }} />
              ))}
            </div>
            <div style={{ position: "relative", height: 24 }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 3, background: "var(--line)", borderRadius: 2, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "8%", right: "20%", top: "50%", transform: "translateY(-50%)", height: 3, background: "var(--ember)", borderRadius: 2 }} />
              <div style={{ position: "absolute", left: "8%", top: "50%", transform: "translate(-50%,-50%)", width: 16, height: 16, background: "var(--paper)", border: "2px solid var(--ember)", borderRadius: "50%", cursor: "grab" }} />
              <div style={{ position: "absolute", left: "80%", top: "50%", transform: "translate(-50%,-50%)", width: 16, height: 16, background: "var(--paper)", border: "2px solid var(--ember)", borderRadius: "50%", cursor: "grab" }} />
            </div>
          </FilterBlock>

          <FilterBlock title="ภูมิภาค">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {REGIONS.map((r) => (
                <button key={r} onClick={() => setRegion(r)} className="font-thai" style={{
                  padding: "7px 12px", borderRadius: 999, fontSize: 12,
                  background: region === r ? "var(--forest-800)" : "transparent",
                  color: region === r ? "var(--cream-50)" : "var(--ink)",
                  border: `1px solid ${region === r ? "var(--forest-800)" : "var(--line-strong)"}`,
                  cursor: "pointer",
                }}>{r}</button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="สิ่งอำนวยความสะดวก">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {AMENITY_LIST.map(({ label, Icon: I }) => {
                const on = amenities.includes(label);
                return (
                  <button key={label} onClick={() => setAmenities(toggle(amenities, label))} className="font-thai" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 10px", borderRadius: 12, fontSize: 13,
                    background: on ? "var(--cream-100)" : "var(--paper)",
                    color: on ? "var(--forest-900)" : "var(--ink)",
                    border: `1px solid ${on ? "var(--forest-700)" : "var(--line)"}`,
                    cursor: "pointer", textAlign: "left",
                  }}>
                    <I style={{ width: 16, height: 16, color: on ? "var(--ember)" : "var(--sage-500)", flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{label}</span>
                    {on && <CheckIcon style={{ width: 14, height: 14, color: "var(--ember)" }} />}
                  </button>
                );
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="ประเภทที่พัก">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TENT_OPTIONS.map((t) => {
                const on = tentTypes.includes(t);
                return (
                  <label key={t} className="font-thai" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 5,
                      border: `1.5px solid ${on ? "var(--ember)" : "var(--line-strong)"}`,
                      background: on ? "var(--ember)" : "transparent",
                      display: "grid", placeItems: "center", flexShrink: 0,
                    }}>
                      {on && <CheckIcon style={{ width: 11, height: 11, color: "var(--cream-50)", strokeWidth: "3" }} />}
                    </span>
                    <input type="checkbox" checked={on} onChange={() => setTentTypes(toggle(tentTypes, t))} style={{ display: "none" }} />
                    {t}
                  </label>
                );
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="คะแนนรีวิว">
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 7, 8, 9].map((v) => (
                <button key={v} onClick={() => setMinRating(v)} className="font-thai" style={{
                  flex: 1, padding: "10px 6px", borderRadius: 10, fontSize: 12,
                  background: minRating === v ? "var(--forest-800)" : "var(--paper)",
                  color: minRating === v ? "var(--cream-50)" : "var(--ink)",
                  border: `1px solid ${minRating === v ? "var(--forest-800)" : "var(--line)"}`,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}>
                  {v === 0 ? "ทั้งหมด" : <>{v}+ <StarIcon style={{ width: 11, height: 11, color: minRating === v ? "#C97B4A" : "var(--ember)" }} /></>}
                </button>
              ))}
            </div>
          </FilterBlock>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
            <FilterToggle on={instant} onChange={() => setInstant(!instant)} title="จองได้ทันที" sub="ไม่ต้องรอยืนยัน" />
            <FilterToggle on={pets} onChange={() => setPets(!pets)} title="รับสัตว์เลี้ยง" sub="พาน้องไปด้วยได้" />
          </div>

          <button className="font-thai" style={{
            marginTop: 22, width: "100%", padding: "13px 16px", borderRadius: 999, fontSize: 14,
            background: "var(--ember)", color: "var(--cream-50)", border: "none", cursor: "pointer", fontWeight: 500,
          }}>
            ดูผลลัพธ์ {CAMPS.length} รายการ
          </button>
        </aside>

        {/* Results */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div className="font-serif" style={{ fontSize: 26, color: "var(--forest-900)" }}>
                พบ <em style={{ color: "var(--ember)" }}>{CAMPS.length}</em> ลานที่เหมาะกับคุณ
              </div>
              <div className="font-thai" style={{ fontSize: 13, color: "var(--sage-500)", marginTop: 4 }}>
                ราคาเฉลี่ย ฿{avgPrice.toLocaleString()} / คืน · รีวิวเฉลี่ย 9.5 ★
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="font-thai" style={{
                  appearance: "none", padding: "10px 36px 10px 14px", borderRadius: 999,
                  border: "1px solid var(--line-strong)", background: "var(--paper)",
                  fontSize: 13, cursor: "pointer", color: "var(--forest-900)",
                }}>
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDIcon style={{ width: 14, height: 14, position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--sage-500)" }} />
              </div>
              <div style={{ display: "flex", background: "var(--cream-100)", borderRadius: 999, padding: 3 }}>
                {[
                  { id: "list" as const, label: "ลิสต์", Icon: TentIcon },
                  { id: "map" as const, label: "แผนที่", Icon: MapIcon },
                ].map((v) => (
                  <button key={v.id} onClick={() => setView(v.id)} className="font-thai" style={{
                    padding: "7px 14px", borderRadius: 999, fontSize: 12,
                    background: view === v.id ? "var(--paper)" : "transparent",
                    color: view === v.id ? "var(--forest-900)" : "var(--sage-500)",
                    border: "none", cursor: "pointer",
                    boxShadow: view === v.id ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <v.Icon style={{ width: 13, height: 13 }} />
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {activeChips.map((chip, i) => (
                <span key={i} className="font-thai" style={{
                  padding: "6px 10px 6px 14px", borderRadius: 999, fontSize: 12,
                  background: "var(--forest-800)", color: "var(--cream-50)",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}>
                  {chip}
                  <span style={{ cursor: "pointer", opacity: .7, fontSize: 14, lineHeight: 1 }}>×</span>
                </span>
              ))}
            </div>
          )}

          {/* Camp list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {CAMPS.slice(0, visible).map((c) => <CampRow key={c.id} camp={c} />)}
          </div>

          {/* Load more / end */}
          {visible < CAMPS.length ? (
            <div style={{ marginTop: 28, padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    border: "2px solid var(--line-strong)", borderTopColor: "var(--ember)",
                    animation: "ktSpin 0.8s linear infinite",
                  }} />
                  <span className="font-thai" style={{ fontSize: 13, color: "var(--sage-500)" }}>กำลังโหลดลานเพิ่มเติม…</span>
                </div>
              ) : (
                <>
                  <div className="font-thai" style={{ fontSize: 13, color: "var(--sage-500)" }}>
                    แสดงแล้ว {visible} จาก {CAMPS.length} รายการ
                  </div>
                  <button onClick={loadMore} className="font-thai" style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", borderRadius: 999, fontSize: 14,
                    border: "1.5px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", cursor: "pointer",
                  }}>
                    โหลดเพิ่ม <ChevronDIcon style={{ width: 14 }} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div style={{ marginTop: 32, padding: "32px 16px", textAlign: "center", borderTop: "1px dashed var(--line)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--cream-100)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
                <TentIcon style={{ width: 20, height: 20, color: "var(--forest-700)" }} />
              </div>
              <div className="font-serif" style={{ fontSize: 18, color: "var(--forest-900)" }}>คุณดูครบทุกลานแล้ว</div>
              <div className="font-thai" style={{ fontSize: 13, color: "var(--sage-500)", marginTop: 4 }}>
                ลองปรับตัวกรอง หรือค้นหาปลายทางอื่นเพื่อดูลานอื่นๆ
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes ktSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
