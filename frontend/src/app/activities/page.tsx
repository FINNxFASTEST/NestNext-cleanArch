"use client";

import { useState } from "react";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import {
  SearchIcon, ChevronDIcon, ChevronRIcon,
  FlameIcon, MoonIcon, TentIcon, BoltIcon, DropletIcon, CupIcon, LeafIcon,
} from "@/components/common/Icons";
import { PostCard, type Post } from "@/components/activities/PostCard";
import { FeaturedPost, type FeaturedPostData } from "@/components/activities/FeaturedPost";
import { UpcomingPanel, type UpcomingEvent } from "@/components/activities/UpcomingPanel";
import { TagCloudPanel } from "@/components/activities/TagCloudPanel";
import { NewsletterPanel } from "@/components/activities/NewsletterPanel";
import { CategoryCard, type CategoryCardData } from "@/components/activities/CategoryCard";
import { cn } from "@/lib/utils";
import type { SceneVariant } from "@/components/common/Scene";

const CATEGORIES = [
  { id: "ทั้งหมด", Icon: LeafIcon, count: 124 },
  { id: "ดูดาว", Icon: MoonIcon, count: 28 },
  { id: "เดินป่า", Icon: TentIcon, count: 34 },
  { id: "ปีนเขา", Icon: BoltIcon, count: 12 },
  { id: "ตกปลา", Icon: DropletIcon, count: 18 },
  { id: "ปรุงอาหาร", Icon: FlameIcon, count: 22 },
  { id: "ครอบครัว", Icon: CupIcon, count: 10 },
];

const FEATURED: FeaturedPostData = {
  title: "นอนดูดาวที่ดอยม่อนเงาะ คืนที่ท้องฟ้าไม่มีเมฆ",
  excerpt: "เจ้าของลานพาขึ้นไปยังจุดดูดาวใกล้ที่สุดในภาคเหนือ พร้อมกล้องส่องดาว และแผนที่ทางช้างเผือก สำหรับคืนเดือนมืดเท่านั้น",
  author: "พี่เบิร์ด · เจ้าของลาน",
  camp: "ดอยม่อนเงาะ แคมป์",
  location: "แม่แตง · เชียงใหม่",
  category: "ดูดาว",
  date: "21 เม.ย 2569",
  read: "6 นาที",
  price: 450,
  duration: "3 ชม.",
  scene: "night" as SceneVariant,
};

const POSTS: Post[] = [
  {
    id: 1, title: "เดินป่าเช้าตรู่ หาหมอกที่เขาใหญ่",
    excerpt: "เส้นทางเดินป่า 3 กม. ไปยังจุดชมทะเลหมอก เริ่มตี 5 ก่อนพระอาทิตย์ขึ้น มีไกด์ท้องถิ่นนำทาง",
    author: "ลุงหนุ่ม", camp: "เขาใหญ่ แคมป์วิว", location: "ปากช่อง · นครราชสีมา",
    category: "เดินป่า", date: "18 เม.ย 2569", read: "4 นาที",
    price: 250, duration: "4 ชม.", scene: "forest" as SceneVariant,
  },
  {
    id: 2, title: "ตกปลาริมแม่น้ำโขง กับคุณลุงเจ้าถิ่น",
    excerpt: "ยืมเบ็ด ยืมเรือ ฟังเรื่องเล่าของแม่น้ำ กลับมาทำปลาเผากินรอบกองไฟ เหมาะกับนักตกปลามือใหม่",
    author: "ลุงมา", camp: "ริมโขง แคมป์", location: "เชียงคาน · เลย",
    category: "ตกปลา", date: "15 เม.ย 2569", read: "5 นาที",
    price: 180, duration: "ทั้งเช้า", scene: "lake" as SceneVariant,
  },
  {
    id: 3, title: "คลาสทำอาหารรอบกองไฟ สไตล์ภาคเหนือ",
    excerpt: "เรียนทำข้าวหลาม แกงอ่อม ปิ้งปลา กับเชฟท้องถิ่น วัตถุดิบสดจากตลาดเช้า กินด้วยกันในมื้อเย็น",
    author: "เชฟน้อย", camp: "ป่าสนวัดจันทร์", location: "กัลยาณิวัฒนา · เชียงใหม่",
    category: "ปรุงอาหาร", date: "12 เม.ย 2569", read: "7 นาที",
    price: 550, duration: "5 ชม.", scene: "dusk" as SceneVariant,
  },
  {
    id: 4, title: "โยคะเช้าท่ามกลางทุ่งหญ้า",
    excerpt: "ครูโยคะพื้นถิ่นนำสมาธิ 60 นาที บนทุ่งหญ้ากว้าง เสียงนก เสียงลม เป็นเพลงพื้นหลัง",
    author: "ครูเมย์", camp: "ดอยม่อนเงาะ แคมป์", location: "แม่แตง · เชียงใหม่",
    category: "ครอบครัว", date: "10 เม.ย 2569", read: "3 นาที",
    price: 200, duration: "1 ชม.", scene: "meadow" as SceneVariant,
  },
  {
    id: 5, title: "ปีนผาน้อยที่ปาย — ทริปมือใหม่",
    excerpt: "คอร์สสอนปีนผาเบื้องต้น อุปกรณ์ครบ ไกด์มีใบรับรอง เหมาะกับคนที่ไม่เคยปีน",
    author: "พี่ปอ", camp: "ผาปายแคมป์", location: "ปาย · แม่ฮ่องสอน",
    category: "ปีนเขา", date: "8 เม.ย 2569", read: "6 นาที",
    price: 890, duration: "ครึ่งวัน", scene: "hero" as SceneVariant,
  },
  {
    id: 6, title: "เวิร์คชอปก่อไฟแบบชาวเขา",
    excerpt: "เรียนก่อไฟไม่ใช้ไฟแช็ก แบบที่ใช้กันมาตั้งแต่โบราณ พร้อมทำชาไฟร้อน ๆ กินรอบกองไฟ",
    author: "ลุงดำ", camp: "บ้านไม้ A-Frame", location: "ปาย · แม่ฮ่องสอน",
    category: "ครอบครัว", date: "5 เม.ย 2569", read: "4 นาที",
    price: 150, duration: "2 ชม.", scene: "cabin" as SceneVariant,
  },
];

const UPCOMING: UpcomingEvent[] = [
  { date: "28", month: "เม.ย", title: "ดูดาวคืนเดือนมืด", sub: "ดอยม่อนเงาะ · ฿450", left: 4 },
  { date: "02", month: "พ.ค", title: "เดินป่าหาหมอก", sub: "เขาใหญ่ · ฿250", left: 8 },
  { date: "05", month: "พ.ค", title: "คลาสอาหารรอบไฟ", sub: "ป่าสนวัดจันทร์ · ฿550", left: 2 },
];

const TAGS = ["ทะเลหมอก", "ทางช้างเผือก", "ริมน้ำ", "ฝน", "ปลาเผา", "คนเดียว", "ครอบครัว", "สุนัข", "ดอย", "หิ่งห้อย"];

const CATEGORY_CARDS: CategoryCardData[] = [
  { name: "ดูดาว", scene: "night" as SceneVariant, count: 28, Icon: MoonIcon },
  { name: "เดินป่า", scene: "forest" as SceneVariant, count: 34, Icon: TentIcon },
  { name: "ตกปลา", scene: "lake" as SceneVariant, count: 18, Icon: DropletIcon },
  { name: "ปรุงอาหาร", scene: "dusk" as SceneVariant, count: 22, Icon: FlameIcon },
];

export default function ActivitiesPage() {
  const [category, setCategory] = useState("ทั้งหมด");
  const filteredPosts = category === "ทั้งหมด"
    ? POSTS
    : POSTS.filter((p) => p.category === category);

  return (
    <div className="bg-paper min-h-screen">
      <Nav active="activities" variant="solid" />

      {/* Header */}
      <section className="bg-cream-100 px-14 pt-12 pb-9 border-b border-line">
        <div className="flex justify-between items-end gap-10">
          <div className="max-w-[640px]">
            <div className="font-sans text-[11px] tracking-[.12em] uppercase text-sage-500 font-medium mb-3">
              JOURNAL · เรื่องเล่าจากลาน
            </div>
            <h1 className="font-serif text-[52px] m-0 font-normal text-forest-900 tracking-[-0.02em] leading-[1.05]">
              กิจกรรมน่าสนใจ<br />
              <em className="text-ember">จากเจ้าของลานทั่วไทย</em>
            </h1>
            <p className="font-thai text-[15px] leading-[1.7] text-[#4C5A4E] mt-[18px] max-w-[520px]">
              อ่านเรื่องเล่า ดูภาพ และจองกิจกรรมสนุกๆ ที่เจ้าของลานจัดให้เอง — เดินป่า ดูดาว ตกปลา หรือเวิร์คชอปเล็กๆ รอบกองไฟ
            </p>
          </div>

          <div className="flex-1 max-w-[380px] flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] bg-paper rounded-full px-4 py-[10px] border border-line" style={{ boxShadow: "0 2px 8px rgba(27,38,32,.06)" }}>
              <SearchIcon style={{ width: 18, height: 18, color: "var(--sage-500)", flexShrink: 0 }} />
              <input
                placeholder="ค้นหากิจกรรม เช่น ดูดาว, เดินป่า…"
                className="font-thai flex-1 border-none bg-transparent text-[14px] outline-none text-ink"
              />
            </div>
            <div className="font-thai text-[12px] text-sage-500 pl-4">
              ยอดฮิต:{" "}
              <span className="text-ember cursor-pointer">ทะเลหมอก</span> ·
              <span className="text-ember cursor-pointer"> ดูดาว</span> ·
              <span className="text-ember cursor-pointer"> ไฟแคมป์</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mt-7 flex-wrap">
          {CATEGORIES.map(({ id, Icon: I, count }) => {
            const on = category === id;
            return (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={cn(
                  "font-thai flex items-center gap-2 px-4 py-[10px] rounded-full text-[13px] border cursor-pointer",
                  on
                    ? "bg-forest-800 text-cream-50 border-forest-800"
                    : "bg-paper text-ink border-line-strong",
                )}
              >
                <I style={{ width: 14, height: 14, color: on ? "#C97B4A" : "var(--sage-500)" }} />
                {id}
                <span className="text-[11px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured hero post */}
      <section className="px-14 pt-12">
        <div className="font-sans text-[11px] tracking-[.12em] uppercase text-sage-500 font-medium mb-4">
          FEATURED · เรื่องแนะนำ
        </div>
        <FeaturedPost post={FEATURED} />
      </section>

      {/* Post grid + sidebar */}
      <section className="px-14 pt-14 grid gap-10 items-start" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Main feed */}
        <div>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-[30px] m-0 font-normal text-forest-900 tracking-[-0.01em]">
              เรื่องเล่า<em className="text-ember"> ล่าสุด</em>
            </h2>
            <div className="font-thai text-[13px] text-sage-500">
              {POSTS.length} บทความ · อัปเดตสัปดาห์นี้
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {filteredPosts.length === 0 ? (
              <div className="col-span-2 font-thai text-center text-sage-400 py-14">
                ไม่พบบทความในหมวด &ldquo;{category}&rdquo;
              </div>
            ) : (
              filteredPosts.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>

          {filteredPosts.length > 0 && (
            <div className="mt-10 flex flex-col items-center gap-[10px]">
              <button className="font-thai flex items-center gap-1.5 py-3 px-7 rounded-full text-[14px] border border-line-strong bg-paper text-ink cursor-pointer">
                โหลดเรื่องเล่าเพิ่ม <ChevronDIcon style={{ width: 14 }} />
              </button>
              <div className="font-thai text-[11px] text-sage-500">
                แสดง {filteredPosts.length} จาก 124 บทความ
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sticky top-6 flex flex-col gap-6">
          <UpcomingPanel items={UPCOMING} />
          <TagCloudPanel tags={TAGS} />
          <NewsletterPanel />
        </aside>
      </section>

      {/* Category strip */}
      <section className="px-14 pt-20">
        <div className="bg-cream-100 rounded-[28px] px-8 py-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="font-sans text-[10px] tracking-[.12em] uppercase text-sage-500 font-medium mb-[10px]">
                EXPLORE · ตามหมวด
              </div>
              <h2 className="font-serif text-[28px] m-0 font-normal text-forest-900 tracking-[-0.01em]">
                เลือกตาม<em className="text-ember">สไตล์ของคุณ</em>
              </h2>
            </div>
            <button className="font-thai flex items-center gap-1.5 text-[13px] text-forest-700 bg-transparent border-none cursor-pointer">
              ดูทุกหมวด <ChevronRIcon style={{ width: 14 }} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CATEGORY_CARDS.map((c, i) => (
              <CategoryCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20" />
      <Footer />
    </div>
  );
}
