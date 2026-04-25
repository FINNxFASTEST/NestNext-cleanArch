"use client";

import { useState } from "react";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { Scene, SceneVariant } from "@/components/common/Scene";
import {
  SearchIcon, PinIcon, StarIcon, HeartIcon, ShareIcon, ArrowRIcon,
  ChevronDIcon, ChevronRIcon, FlameIcon, MoonIcon, TentIcon, BoltIcon,
  DropletIcon, CupIcon, LeafIcon,
} from "@/components/common/Icons";

const CATEGORIES = [
  { id: "ทั้งหมด", Icon: LeafIcon, count: 124 },
  { id: "ดูดาว", Icon: MoonIcon, count: 28 },
  { id: "เดินป่า", Icon: TentIcon, count: 34 },
  { id: "ปีนเขา", Icon: BoltIcon, count: 12 },
  { id: "ตกปลา", Icon: DropletIcon, count: 18 },
  { id: "ปรุงอาหาร", Icon: FlameIcon, count: 22 },
  { id: "ครอบครัว", Icon: CupIcon, count: 10 },
];

const FEATURED = {
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

const POSTS = [
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

const UPCOMING = [
  { date: "28", month: "เม.ย", title: "ดูดาวคืนเดือนมืด", sub: "ดอยม่อนเงาะ · ฿450", left: 4 },
  { date: "02", month: "พ.ค", title: "เดินป่าหาหมอก", sub: "เขาใหญ่ · ฿250", left: 8 },
  { date: "05", month: "พ.ค", title: "คลาสอาหารรอบไฟ", sub: "ป่าสนวัดจันทร์ · ฿550", left: 2 },
];

const TAGS = ["ทะเลหมอก", "ทางช้างเผือก", "ริมน้ำ", "ฝน", "ปลาเผา", "คนเดียว", "ครอบครัว", "สุนัข", "ดอย", "หิ่งห้อย"];

const CATEGORY_CARDS = [
  { name: "ดูดาว", scene: "night" as SceneVariant, count: 28, Icon: MoonIcon },
  { name: "เดินป่า", scene: "forest" as SceneVariant, count: 34, Icon: TentIcon },
  { name: "ตกปลา", scene: "lake" as SceneVariant, count: 18, Icon: DropletIcon },
  { name: "ปรุงอาหาร", scene: "dusk" as SceneVariant, count: 22, Icon: FlameIcon },
];

function PostCard({ post }: { post: typeof POSTS[number] }) {
  return (
    <article style={{
      background: "var(--paper)", borderRadius: 20, overflow: "hidden",
      border: "1px solid var(--line)", cursor: "pointer", display: "flex", flexDirection: "column",
      transition: "transform .18s, box-shadow .18s",
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      <div style={{ position: "relative", height: 220 }}>
        <Scene variant={post.scene} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 50%, rgba(0,0,0,.4) 100%)" }} />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span className="font-thai" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: "rgba(247,242,231,.88)", color: "var(--forest-900)", backdropFilter: "blur(6px)" }}>
            {post.category}
          </span>
        </div>
        <button style={{
          position: "absolute", top: 14, right: 14,
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(247,242,231,.9)", border: "none",
          display: "grid", placeItems: "center", cursor: "pointer",
        }}>
          <HeartIcon style={{ color: "var(--forest-700)", width: 14, height: 14 }} />
        </button>
      </div>
      <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
          <span>{post.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--sage-500)", display: "inline-block" }} />
          <span>อ่าน {post.read}</span>
        </div>
        <h3 className="font-serif" style={{ fontSize: 22, lineHeight: 1.25, margin: 0, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em" }}>
          {post.title}
        </h3>
        <p className="font-thai" style={{ fontSize: 13, lineHeight: 1.6, color: "#4C5A4E", marginTop: 10, marginBottom: 0 }}>
          {post.excerpt}
        </p>

        <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", display: "flex", alignItems: "center", gap: 5, marginTop: 14 }}>
          <PinIcon style={{ width: 11, height: 11 }} /> {post.camp} · {post.location}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Scene variant="meadow" style={{ width: "100%", height: "100%" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-thai" style={{ fontSize: 12, fontWeight: 500, color: "var(--forest-900)" }}>{post.author}</div>
            <div className="font-thai" style={{ fontSize: 10, color: "var(--sage-500)" }}>เจ้าของลาน</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="font-thai" style={{ fontSize: 10, color: "var(--sage-500)" }}>เริ่ม</div>
            <div className="font-serif" style={{ fontSize: 16, fontWeight: 500, color: "var(--ember)" }}>฿{post.price}</div>
          </div>
        </div>
        <button className="font-thai" style={{
          marginTop: 12, padding: "9px 16px", borderRadius: 999, fontSize: 12,
          border: "1.5px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          อ่านต่อ & จองกิจกรรม <ArrowRIcon style={{ width: 13 }} />
        </button>
      </div>
    </article>
  );
}

export default function ActivitiesPage() {
  const [category, setCategory] = useState("ทั้งหมด");

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <Nav active="activities" variant="solid" />

      {/* Header */}
      <section style={{ background: "var(--cream-100)", padding: "48px 56px 36px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="font-sans" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 12 }}>
              JOURNAL · เรื่องเล่าจากลาน
            </div>
            <h1 className="font-serif" style={{ fontSize: 52, margin: 0, fontWeight: 400, color: "var(--forest-900)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              กิจกรรมน่าสนใจ<br />
              <em style={{ color: "var(--ember)" }}>จากเจ้าของลานทั่วไทย</em>
            </h1>
            <p className="font-thai" style={{ fontSize: 15, lineHeight: 1.7, color: "#4C5A4E", marginTop: 18, maxWidth: 520 }}>
              อ่านเรื่องเล่า ดูภาพ และจองกิจกรรมสนุกๆ ที่เจ้าของลานจัดให้เอง — เดินป่า ดูดาว ตกปลา หรือเวิร์คชอปเล็กๆ รอบกองไฟ
            </p>
          </div>

          <div style={{ flex: 1, maxWidth: 380, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--paper)", borderRadius: 999, padding: "10px 16px",
              border: "1px solid var(--line)", boxShadow: "0 2px 8px rgba(27,38,32,.06)",
            }}>
              <SearchIcon style={{ width: 18, height: 18, color: "var(--sage-500)", flexShrink: 0 }} />
              <input
                placeholder="ค้นหากิจกรรม เช่น ดูดาว, เดินป่า…"
                className="font-thai"
                style={{ flex: 1, border: "none", background: "none", fontSize: 14, outline: "none", color: "var(--ink)" }}
              />
            </div>
            <div className="font-thai" style={{ fontSize: 12, color: "var(--sage-500)", paddingLeft: 16 }}>
              ยอดฮิต:{" "}
              <span style={{ color: "var(--ember)", cursor: "pointer" }}>ทะเลหมอก</span> ·
              <span style={{ color: "var(--ember)", cursor: "pointer" }}> ดูดาว</span> ·
              <span style={{ color: "var(--ember)", cursor: "pointer" }}> ไฟแคมป์</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
          {CATEGORIES.map(({ id, Icon: I, count }) => {
            const on = category === id;
            return (
              <button key={id} onClick={() => setCategory(id)} className="font-thai" style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, fontSize: 13,
                background: on ? "var(--forest-800)" : "var(--paper)",
                color: on ? "var(--cream-50)" : "var(--ink)",
                border: `1px solid ${on ? "var(--forest-800)" : "var(--line-strong)"}`, cursor: "pointer",
              }}>
                <I style={{ width: 14, height: 14, color: on ? "#C97B4A" : "var(--sage-500)" }} />
                {id}
                <span style={{ fontSize: 11, opacity: .6 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured hero post */}
      <section style={{ padding: "48px 56px 0" }}>
        <div className="font-sans" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 16 }}>
          FEATURED · เรื่องแนะนำ
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0,
          background: "var(--paper)", borderRadius: 28, overflow: "hidden",
          border: "1px solid var(--line)", boxShadow: "0 2px 16px rgba(27,38,32,.08)", cursor: "pointer",
          transition: "transform .18s, box-shadow .18s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(27,38,32,.08)"; }}
        >
          <div style={{ position: "relative", minHeight: 440 }}>
            <Scene variant={FEATURED.scene} style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 30%, rgba(0,0,0,.5) 100%)" }} />
            <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 6 }}>
              <span className="font-thai" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "var(--ember)", color: "var(--cream-50)" }}>แนะนำ</span>
              <span className="font-thai" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, background: "rgba(247,242,231,.88)", color: "var(--forest-900)", backdropFilter: "blur(6px)" }}>{FEATURED.category}</span>
            </div>
            <div style={{ position: "absolute", bottom: 20, left: 20, color: "var(--cream-50)" }}>
              <div className="font-thai" style={{ fontSize: 12, opacity: .85, display: "flex", alignItems: "center", gap: 6 }}>
                <PinIcon style={{ width: 12, height: 12 }} /> {FEATURED.location}
              </div>
            </div>
          </div>
          <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="font-thai" style={{ fontSize: 12, color: "var(--sage-500)", display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
              <span>{FEATURED.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--sage-500)", display: "inline-block" }} />
              <span>อ่าน {FEATURED.read}</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: 34, lineHeight: 1.2, margin: 0, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em" }}>
              {FEATURED.title}
            </h2>
            <p className="font-thai" style={{ fontSize: 15, lineHeight: 1.7, color: "#4C5A4E", marginTop: 18 }}>
              {FEATURED.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <Scene variant="forest" style={{ width: "100%", height: "100%" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="font-thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{FEATURED.author}</div>
                <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{FEATURED.camp}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>จองกิจกรรมเริ่ม</span>
                <span className="font-serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--ember)" }}>฿{FEATURED.price}</span>
                <span className="font-thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>/ ท่าน · {FEATURED.duration}</span>
              </div>
              <button className="font-thai" style={{
                padding: "11px 22px", borderRadius: 999, fontSize: 14,
                background: "var(--ember)", color: "var(--cream-50)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                อ่านต่อ & จอง <ArrowRIcon style={{ width: 14 }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Post grid + sidebar */}
      <section style={{ padding: "56px 56px 0", display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "flex-start" }}>
        {/* Main feed */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 className="font-serif" style={{ fontSize: 30, margin: 0, fontWeight: 400, color: "var(--forest-900)", letterSpacing: "-0.01em" }}>
              เรื่องเล่า<em style={{ color: "var(--ember)" }}> ล่าสุด</em>
            </h2>
            <div className="font-thai" style={{ fontSize: 13, color: "var(--sage-500)" }}>
              {POSTS.length} บทความ · อัปเดตสัปดาห์นี้
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {POSTS.map((p) => <PostCard key={p.id} post={p} />)}
          </div>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button className="font-thai" style={{
              display: "flex", alignItems: "center", gap: 6, padding: "12px 28px", borderRadius: 999, fontSize: 14,
              border: "1.5px solid var(--line-strong)", background: "var(--paper)", color: "var(--ink)", cursor: "pointer",
            }}>
              โหลดเรื่องเล่าเพิ่ม <ChevronDIcon style={{ width: 14 }} />
            </button>
            <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>
              แสดง {POSTS.length} จาก 124 บทความ
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Upcoming activities */}
          <div style={{ background: "var(--paper)", borderRadius: 22, border: "1px solid var(--line)", padding: 22 }}>
            <div className="font-sans" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 4 }}>UPCOMING · เปิดจองแล้ว</div>
            <div className="font-serif" style={{ fontSize: 20, color: "var(--forest-900)", marginBottom: 16 }}>กิจกรรมที่ใกล้จะเริ่ม</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {UPCOMING.map((u, i) => (
                <div key={i} style={{ display: "flex", gap: 12, cursor: "pointer", alignItems: "center" }}>
                  <div style={{
                    width: 48, height: 56, borderRadius: 10, background: "var(--cream-100)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    border: "1px solid var(--line)",
                  }}>
                    <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--forest-900)", lineHeight: 1 }}>{u.date}</div>
                    <div className="font-thai" style={{ fontSize: 10, color: "var(--sage-500)", marginTop: 2 }}>{u.month}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{u.title}</div>
                    <div className="font-thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{u.sub}</div>
                    <div className="font-thai" style={{ fontSize: 10, color: "var(--ember)", marginTop: 3 }}>เหลืออีก {u.left} ที่</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag cloud */}
          <div style={{ background: "var(--cream-100)", borderRadius: 22, padding: 22 }}>
            <div className="font-sans" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 4 }}>TAGS · แท็กยอดฮิต</div>
            <div className="font-serif" style={{ fontSize: 18, color: "var(--forest-900)", marginBottom: 14 }}>สิ่งที่ผู้คนสนใจ</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TAGS.map((t, i) => (
                <span key={i} className="font-thai" style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 12,
                  background: "var(--paper)", border: "1px solid var(--line)", cursor: "pointer",
                  color: "var(--forest-800)",
                }}>#{t}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{
            background: "var(--forest-800)", color: "var(--cream-50)",
            borderRadius: 22, padding: 24, position: "relative", overflow: "hidden",
          }}>
            <Scene variant="night" style={{ position: "absolute", inset: 0, opacity: .35 }} />
            <div style={{ position: "relative" }}>
              <div className="font-serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 8 }}>
                รับเรื่องเล่ารอบกองไฟ
              </div>
              <p className="font-thai" style={{ fontSize: 12, opacity: .8, lineHeight: 1.6, margin: 0, marginBottom: 14 }}>
                ส่งบทความใหม่ และกิจกรรมเปิดจอง ให้อ่านทุกวันศุกร์
              </p>
              <div style={{ display: "flex", gap: 6, background: "rgba(247,242,231,.12)", borderRadius: 999, padding: 4, border: "1px solid rgba(247,242,231,.18)" }}>
                <input
                  placeholder="อีเมลของคุณ"
                  className="font-thai"
                  style={{ flex: 1, border: "none", background: "none", padding: "8px 12px", color: "var(--cream-50)", fontSize: 13, outline: "none" }}
                />
                <button className="font-thai" style={{
                  padding: "8px 16px", borderRadius: 999, background: "var(--ember)",
                  color: "var(--cream-50)", border: "none", fontSize: 13, cursor: "pointer",
                }}>สมัคร</button>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Category strip */}
      <section style={{ padding: "80px 56px 0" }}>
        <div style={{ background: "var(--cream-100)", borderRadius: 28, padding: "40px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div className="font-sans" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500, marginBottom: 10 }}>EXPLORE · ตามหมวด</div>
              <h2 className="font-serif" style={{ fontSize: 28, margin: 0, fontWeight: 400, color: "var(--forest-900)", letterSpacing: "-0.01em" }}>
                เลือกตาม<em style={{ color: "var(--ember)" }}>สไตล์ของคุณ</em>
              </h2>
            </div>
            <button className="font-thai" style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--forest-700)",
              background: "none", border: "none", cursor: "pointer",
            }}>
              ดูทุกหมวด <ChevronRIcon style={{ width: 14 }} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {CATEGORY_CARDS.map((c, i) => (
              <div key={i} style={{
                position: "relative", height: 180, borderRadius: 18, overflow: "hidden", cursor: "pointer",
                transition: "transform .18s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <Scene variant={c.scene} style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(27,38,32,.7) 100%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "var(--cream-50)" }}>
                  <c.Icon style={{ width: 20, height: 20, color: "#C97B4A", marginBottom: 6 }} />
                  <div className="font-serif" style={{ fontSize: 22, fontWeight: 500 }}>{c.name}</div>
                  <div className="font-thai" style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>{c.count} กิจกรรม</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ paddingTop: 80 }} />
      <Footer />
    </div>
  );
}
