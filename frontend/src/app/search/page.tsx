"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import {
  StarIcon, BoltIcon, CheckIcon, ChevronDIcon, TentIcon, MapIcon,
  ShowerIcon, CarIcon, WifiIcon, DropletIcon, FlameIcon, CupIcon, DogIcon,
} from "@/components/common/Icons";
import { SearchBar } from "@/components/home/SearchBar";
import { FilterBlock } from "@/components/search/FilterBlock";
import { FilterToggle } from "@/components/search/FilterToggle";
import { CampRow, type Camp } from "@/components/search/CampRow";
import type { SceneVariant } from "@/components/common/Scene";
import { cn } from "@/lib/utils";

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

const CAMPS: Camp[] = [
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

export default function SearchPage() {
  const params = useSearchParams();
  const defaultLocation = params.get("location");
  const defaultStartDate = params.get("checkIn") ? new Date(params.get("checkIn")!) : null;
  const defaultEndDate = params.get("checkOut") ? new Date(params.get("checkOut")!) : null;
  const defaultAdults = params.get("adults") ? Number(params.get("adults")) : 2;
  const defaultChildren = params.get("children") ? Number(params.get("children")) : 0;

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

  function clearAll() {
    setRegion("ทั้งหมด");
    setAmenities([]);
    setTentTypes([]);
    setPets(false);
    setInstant(false);
    setMinRating(0);
  }

  function removeChip(chip: string) {
    if (amenities.includes(chip)) setAmenities(amenities.filter((a) => a !== chip));
    else if (tentTypes.includes(chip)) setTentTypes(tentTypes.filter((t) => t !== chip));
    else if (chip === region) setRegion("ทั้งหมด");
    else if (chip === "จองทันที") setInstant(false);
    else if (chip === "รับสัตว์เลี้ยง") setPets(false);
  }

  return (
    <div className="bg-paper min-h-screen">
      <Nav active="search" variant="solid" />

      {/* Search context bar */}
      <section className="bg-cream-100 px-14 pt-7 pb-9 border-b border-line">
        <div className="font-sans text-[11px] tracking-[.12em] uppercase text-sage-500 font-medium mb-[10px]">
          SEARCH · ค้นหาลานกางเต็นท์
        </div>
        <h1 className="font-serif text-[40px] m-0 font-normal text-forest-900 tracking-[-0.02em]">
          ลานกางเต็นท์ <em className="text-ember">ทั่วไทย</em>
        </h1>

        <div className="mt-[22px]">
          <SearchBar
            className="max-w-full"
            defaultLocation={defaultLocation}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
            defaultAdults={defaultAdults}
            defaultChildren={defaultChildren}
          />
        </div>

        <div className="mt-5 flex gap-2 items-center flex-wrap">
          <span className="font-thai text-[12px] text-sage-500 mr-1">แนะนำ:</span>
          {["ทะเลหมอก", "ริมน้ำ", "ป่าสน", "ดูดาว", "สัตว์เลี้ยง", "เหมาะกับครอบครัว"].map((t, i) => (
            <button key={i} className="font-thai px-[14px] py-1.5 rounded-full text-[12px] bg-paper border border-line-strong cursor-pointer text-forest-800">
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section
        className="px-14 pt-8 pb-14 grid gap-8 items-start"
        style={{ gridTemplateColumns: "300px 1fr" }}
      >
        {/* Filter sidebar */}
        <aside className="bg-paper rounded-[22px] border border-line p-6 sticky top-6">
          <div className="flex justify-between items-center mb-5">
            <div className="font-serif text-[22px] text-forest-900">ตัวกรอง</div>
            <button
              className="font-thai text-[12px] text-ember bg-transparent border-none cursor-pointer underline"
              onClick={clearAll}
            >
              ล้างทั้งหมด
            </button>
          </div>

          <FilterBlock title="ช่วงราคา" hint="บาท ต่อคืน">
            <div className="flex justify-between mb-[10px]">
              <div className="font-serif text-[18px] text-forest-900">฿150</div>
              <div className="font-serif text-[18px] text-forest-900">฿1,500+</div>
            </div>
            <div className="flex items-end gap-0.5 h-9 mb-2">
              {[0.3, 0.5, 0.7, 0.9, 1, 0.85, 0.6, 0.4, 0.55, 0.3, 0.25, 0.2].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[2px]"
                  style={{
                    height: `${h * 100}%`,
                    background: i >= 1 && i <= 9 ? "var(--ember)" : "var(--cream-100)",
                    opacity: i >= 1 && i <= 9 ? 0.75 : 0.5,
                  }}
                />
              ))}
            </div>
            <div className="relative h-6">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-line rounded-[2px]" />
              <div className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-ember rounded-[2px]" style={{ left: "8%", right: "20%" }} />
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-paper border-2 border-ember cursor-grab" style={{ left: "8%" }} />
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-paper border-2 border-ember cursor-grab" style={{ left: "80%" }} />
            </div>
          </FilterBlock>

          <FilterBlock title="ภูมิภาค">
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={cn(
                    "font-thai px-3 py-[7px] rounded-full text-[12px] border cursor-pointer",
                    region === r
                      ? "bg-forest-800 text-cream-50 border-forest-800"
                      : "bg-transparent text-ink border-line-strong",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="สิ่งอำนวยความสะดวก">
            <div className="grid grid-cols-2 gap-2">
              {AMENITY_LIST.map(({ label, Icon: I }) => {
                const on = amenities.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => setAmenities(toggle(amenities, label))}
                    className={cn(
                      "font-thai flex items-center gap-2 px-[10px] py-[10px] rounded-[12px] text-[13px] cursor-pointer text-left border",
                      on
                        ? "bg-cream-100 text-forest-900 border-forest-700"
                        : "bg-paper text-ink border-line",
                    )}
                  >
                    <I style={{ width: 16, height: 16, color: on ? "var(--ember)" : "var(--sage-500)", flexShrink: 0 }} />
                    <span className="flex-1">{label}</span>
                    {on && <CheckIcon style={{ width: 14, height: 14, color: "var(--ember)" }} />}
                  </button>
                );
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="ประเภทที่พัก">
            <div className="flex flex-col gap-[10px]">
              {TENT_OPTIONS.map((t) => {
                const on = tentTypes.includes(t);
                return (
                  <label key={t} className="font-thai flex items-center gap-[10px] cursor-pointer text-[13px]">
                    <span
                      className="w-[18px] h-[18px] rounded-[5px] grid place-items-center shrink-0"
                      style={{
                        border: `1.5px solid ${on ? "var(--ember)" : "var(--line-strong)"}`,
                        background: on ? "var(--ember)" : "transparent",
                      }}
                    >
                      {on && <CheckIcon style={{ width: 11, height: 11, color: "var(--cream-50)", strokeWidth: "3" }} />}
                    </span>
                    <input type="checkbox" checked={on} onChange={() => setTentTypes(toggle(tentTypes, t))} className="hidden" />
                    {t}
                  </label>
                );
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="คะแนนรีวิว">
            <div className="flex gap-1.5">
              {[0, 7, 8, 9].map((v) => (
                <button
                  key={v}
                  onClick={() => setMinRating(v)}
                  className={cn(
                    "font-thai flex-1 py-[10px] px-1.5 rounded-[10px] text-[12px] border cursor-pointer flex items-center justify-center gap-1",
                    minRating === v
                      ? "bg-forest-800 text-cream-50 border-forest-800"
                      : "bg-paper text-ink border-line",
                  )}
                >
                  {v === 0 ? "ทั้งหมด" : <>{v}+ <StarIcon style={{ width: 11, height: 11, color: minRating === v ? "#C97B4A" : "var(--ember)" }} /></>}
                </button>
              ))}
            </div>
          </FilterBlock>

          <div className="flex flex-col gap-[14px] pt-[18px] border-t border-line">
            <FilterToggle on={instant} onChange={() => setInstant(!instant)} title="จองได้ทันที" sub="ไม่ต้องรอยืนยัน" />
            <FilterToggle on={pets} onChange={() => setPets(!pets)} title="รับสัตว์เลี้ยง" sub="พาน้องไปด้วยได้" />
          </div>

          <button className="font-thai mt-[22px] w-full py-[13px] px-4 rounded-full text-[14px] bg-ember text-cream-50 border-none cursor-pointer font-medium">
            ดูผลลัพธ์ {CAMPS.length} รายการ
          </button>
        </aside>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="font-serif text-[26px] text-forest-900">
                พบ <em className="text-ember">{CAMPS.length}</em> ลานที่เหมาะกับคุณ
              </div>
              <div className="font-thai text-[13px] text-sage-500 mt-1">
                ราคาเฉลี่ย ฿{avgPrice.toLocaleString()} / คืน · รีวิวเฉลี่ย 9.5 ★
              </div>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="font-thai appearance-none py-[10px] pr-9 pl-[14px] rounded-full border border-line-strong bg-paper text-[13px] cursor-pointer text-forest-900 outline-none"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDIcon style={{ width: 14, height: 14 }} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sage-500" />
              </div>
              <div className="flex bg-cream-100 rounded-full p-[3px]">
                {([
                  { id: "list" as const, label: "ลิสต์", Icon: TentIcon },
                  { id: "map" as const, label: "แผนที่", Icon: MapIcon },
                ] as const).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className={cn(
                      "font-thai flex items-center gap-1.5 py-[7px] px-[14px] rounded-full text-[12px] border-none cursor-pointer",
                      view === v.id
                        ? "bg-paper text-forest-900 shadow-[0_1px_3px_rgba(0,0,0,.08)]"
                        : "bg-transparent text-sage-500",
                    )}
                  >
                    <v.Icon style={{ width: 13, height: 13 }} />
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {activeChips.map((chip, i) => (
                <span
                  key={i}
                  className="font-thai py-1.5 pl-[14px] pr-[10px] rounded-full text-[12px] bg-forest-800 text-cream-50 inline-flex items-center gap-2"
                >
                  {chip}
                  <span className="cursor-pointer opacity-70 text-[14px] leading-none" onClick={() => removeChip(chip)}>×</span>
                </span>
              ))}
            </div>
          )}

          {/* Camp list */}
          <div className="flex flex-col gap-[18px]">
            {CAMPS.slice(0, visible).map((c) => <CampRow key={c.id} camp={c} />)}
          </div>

          {/* Load more / end */}
          {visible < CAMPS.length ? (
            <div className="mt-7 py-7 px-4 flex flex-col items-center gap-4">
              {loading ? (
                <div className="flex items-center gap-[10px]">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-line-strong"
                    style={{ borderTopColor: "var(--ember)", animation: "ktSpin 0.8s linear infinite" }}
                  />
                  <span className="font-thai text-[13px] text-sage-500">กำลังโหลดลานเพิ่มเติม…</span>
                </div>
              ) : (
                <>
                  <div className="font-thai text-[13px] text-sage-500">
                    แสดงแล้ว {visible} จาก {CAMPS.length} รายการ
                  </div>
                  <button
                    onClick={loadMore}
                    className="font-thai flex items-center gap-1.5 py-[10px] px-6 rounded-full text-[14px] border border-line-strong bg-paper text-ink cursor-pointer"
                  >
                    โหลดเพิ่ม <ChevronDIcon style={{ width: 14 }} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="mt-8 py-8 px-4 text-center border-t border-dashed border-line">
              <div className="w-11 h-11 rounded-full bg-cream-100 grid place-items-center mx-auto mb-3">
                <TentIcon style={{ width: 20, height: 20, color: "var(--forest-700)" }} />
              </div>
              <div className="font-serif text-[18px] text-forest-900">คุณดูครบทุกลานแล้ว</div>
              <div className="font-thai text-[13px] text-sage-500 mt-1">
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
