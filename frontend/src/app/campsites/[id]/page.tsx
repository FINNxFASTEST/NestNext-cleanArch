import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene } from "@/components/common/Scene";
import { Stars } from "@/components/common/Stars";
import { Gallery } from "@/components/detail/Gallery";
import { SeasonalCalendar } from "@/components/detail/SeasonalCalendar";
import { CampPitchList } from "@/components/detail/CampPitchList";
import { BookingSidebar } from "@/components/detail/BookingSidebar";
import {
  LeafIcon, PinIcon, ShareIcon, HeartIcon,
  BoltIcon, DropletIcon, FlameIcon, ShowerIcon,
  CarIcon, WifiIcon, CupIcon, DogIcon, MoonIcon,
  MapIcon, ArrowRIcon,
} from "@/components/common/Icons";

const AMENITIES = [
  { Icon: BoltIcon, title: "ไฟฟ้า", sub: "220V ทุกพื้นที่" },
  { Icon: DropletIcon, title: "น้ำประปา", sub: "ดื่มได้" },
  { Icon: FlameIcon, title: "ก่อไฟได้", sub: "ในจุดที่กำหนด" },
  { Icon: ShowerIcon, title: "ห้องน้ำ / ห้องอาบน้ำ", sub: "น้ำอุ่น 24 ชม." },
  { Icon: CarIcon, title: "ที่จอดรถ", sub: "ฟรี ติดลาน" },
  { Icon: WifiIcon, title: "Wi-Fi", sub: "เฉพาะโซน Lobby" },
  { Icon: CupIcon, title: "ครัวกลาง", sub: "พร้อมอุปกรณ์" },
  { Icon: DogIcon, title: "อนุญาตสัตว์เลี้ยง", sub: "สุนัขตัวเล็ก" },
  { Icon: MoonIcon, title: "Dark-sky zone", sub: "ดูดาวได้ทั้งคืน" },
];

const REVIEWS = [
  { name: "Siriporn", date: "12 มิ.ย 2568", rate: 5, text: "ลานกว้างมาก วิวสวย ห้องน้ำสะอาด เจ้าของใจดี จะกลับไปอีกแน่นอน", scene: "forest" },
  { name: "Thanawat", date: "28 พ.ค 2568", rate: 5, text: "หมอกเช้าสวยสุดๆ ไฟฟ้ามาพร้อม น้ำอุ่นเพียบ — พาลูกไปได้สบาย", scene: "dusk" },
  { name: "Kamolchanok", date: "15 พ.ค 2568", rate: 5, text: "ก่อไฟได้สบายใจ มีจุดจัดไว้ให้แล้ว กลางคืนเงียบมาก ดาวเต็มท้องฟ้า", scene: "night" },
  { name: "Jirawat", date: "02 พ.ค 2568", rate: 4, text: "ราคาคุ้ม เดินทางสะดวก ถ้าเพิ่มร้านค้าในลานได้จะเยี่ยม", scene: "meadow" },
] as const;

export default function CampsiteDetailPage() {
  return (
    <main className="bg-paper text-ink">
      <Nav active="search" variant="solid" />

      {/* Breadcrumb */}
      <div className="px-4 md:px-14 pt-5 font-thai text-[13px] text-sage-500">
        <span className="hidden sm:inline">
          หน้าแรก <span className="mx-2">›</span>
          ค้นหาลานกางเต็นท์ <span className="mx-2">›</span>
          นครราชสีมา <span className="mx-2 text-ink">›</span>
        </span>
        <span className="text-ink">เขาใหญ่ แคมป์วิว</span>
      </div>

      {/* Title block */}
      <section className="px-4 md:px-14 pt-6 pb-7">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <div className="flex gap-2 mb-3.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-xs font-thai bg-[#C7D1B8] text-forest-900">
                <LeafIcon style={{ width: 12, height: 12 }} /> Superhost
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-xs font-thai bg-cream-100 text-ink">
                ที่ 9.8 ⭐ · 248 รีวิว
              </span>
            </div>
            <h1
              className="font-serif m-0"
              style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              เขาใหญ่ <em className="text-ember">แคมป์วิว</em>
            </h1>
            <div className="font-thai flex flex-wrap items-center gap-x-4 gap-y-1 mt-3.5 text-sm text-forest-600">
              <span className="flex items-center gap-1.5">
                <PinIcon style={{ width: 14, height: 14 }} /> ปากช่อง, นครราชสีมา
              </span>
              <span className="hidden sm:inline w-[3px] h-[3px] rounded-full bg-current opacity-50" />
              <span>เปิดตลอดปี</span>
              <span className="hidden sm:inline w-[3px] h-[3px] rounded-full bg-current opacity-50" />
              <span>รองรับ 45 เต็นท์</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            <button className="inline-flex items-center gap-2 font-thai font-medium text-sm px-[22px] py-3 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink">
              <ShareIcon style={{ width: 16, height: 16 }} /> แชร์
            </button>
            <button className="inline-flex items-center gap-2 font-thai font-medium text-sm px-[22px] py-3 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink">
              <HeartIcon style={{ width: 16, height: 16 }} /> บันทึก
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 md:px-14">
        <Gallery />
      </section>

      {/* Main two-column layout */}
      <section className="px-4 md:px-14 pt-12 pb-12 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 md:gap-14">
        {/* Left: content */}
        <div>
          {/* About */}
          <div className="pb-8 border-b border-line">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
              ABOUT THE PLACE
            </div>
            <h2 className="font-serif m-0 mb-4 text-[30px] font-medium" style={{ lineHeight: 1.2 }}>
              ท่ามกลางขุนเขา และหมอกยามเช้า
            </h2>
            <p className="font-thai m-0 max-w-[680px] text-forest-600" style={{ fontSize: 16, lineHeight: 1.75 }}>
              ตั้งอยู่ท่ามกลางธรรมชาติของเขาใหญ่ ลานกางเต็นท์ &ldquo;เขาใหญ่ แคมป์วิว&rdquo; มอบประสบการณ์การพักผ่อน
              ท่ามกลางขุนเขาและหมอกยามเช้า เหมาะสำหรับทั้งครอบครัวและนักเดินทางสายแคมป์
              ที่ต้องการสัมผัสความสงบ เงียบ และอากาศบริสุทธิ์
            </p>
          </div>

          {/* Amenities */}
          <div className="py-8 border-b border-line">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
              AMENITIES · สิ่งอำนวยความสะดวก
            </div>
            <h3 className="font-serif m-0 mb-6 text-[24px] font-medium">ทุกอย่างที่คุณต้องการ</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AMENITIES.map(({ Icon, title, sub }) => (
                <div key={title} className="flex gap-3 items-start py-2">
                  <Icon style={{ width: 20, height: 20, marginTop: 2 }} className="text-forest-700 shrink-0" />
                  <div>
                    <div className="font-thai text-[14px]">{title}</div>
                    <div className="font-thai text-xs mt-0.5 text-sage-500">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal */}
          <div className="py-8 border-b border-line">
            <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
              SEASONAL · ฤดูกาลน่าไป
            </div>
            <h3 className="font-serif m-0 mb-6 text-[24px] font-medium">ไปช่วงไหนดี</h3>
            <div className="overflow-x-auto">
              <SeasonalCalendar />
            </div>
          </div>

          {/* Camp pitches */}
          <div className="py-8 border-b border-line">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-5">
              <div>
                <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
                  PITCHES · พื้นที่กางเต็นท์
                </div>
                <h3 className="font-serif m-0 text-[24px] font-medium">เลือกพื้นที่ของคุณ</h3>
              </div>
              <button className="inline-flex items-center gap-2 font-thai text-sm px-[22px] py-3 rounded-full cursor-pointer self-start sm:self-auto bg-transparent border border-line-strong text-ink">
                <MapIcon style={{ width: 16, height: 16 }} /> ดูแผนที่ลาน
              </button>
            </div>
            <CampPitchList />
          </div>

          {/* Reviews */}
          <div className="pt-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6">
              <div>
                <div className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-sage-500">
                  REVIEWS · รีวิวจากผู้พัก
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="font-serif text-[40px] font-medium">4.9</span>
                  <div>
                    <Stars value={5} size={14} />
                    <div className="font-thai text-xs mt-1 text-sage-500">จาก 248 รีวิว</div>
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 font-thai text-sm px-[22px] py-3 rounded-full cursor-pointer self-start sm:self-auto bg-transparent border border-line-strong text-ink">
                ดูทั้งหมด <ArrowRIcon style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REVIEWS.map((r) => (
                <div key={r.name} className="rounded-2xl border border-line p-5 bg-paper">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Scene variant={r.scene} className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <div className="font-thai text-sm font-medium">{r.name}</div>
                      <div className="font-thai text-[11px] mt-0.5 text-sage-500">{r.date}</div>
                    </div>
                    <Stars value={r.rate} size={12} />
                  </div>
                  <p className="font-thai text-sm m-0 text-forest-600" style={{ lineHeight: 1.65 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: booking sidebar */}
        <aside>
          <BookingSidebar />
        </aside>
      </section>

      <Footer />
    </main>
  );
}
