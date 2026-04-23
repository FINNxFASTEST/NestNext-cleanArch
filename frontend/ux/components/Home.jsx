/* global React, Nav, Footer, Scene, Icon, Stars, KangtentMark */

const Home = () => {
  const [tab, setTab] = React.useState(0);
  const tabs = ["ลาน สมใจ", "ลาน สมใจ 2", "ลาน สมใจ 3", "ลาน สมใจ 4"];
  const provinces = ["เชียงใหม่", "ตาก", "แม่ฮ่องสอน", "เลย", "เพชรบุรี", "กาญจนบุรี", "น่าน", "กระบี่"];

  return (
    <div className="screen" style={{ width: 1440 }}>
      {/* HERO */}
      <section style={{ position: "relative", height: 780 }}>
        <Scene variant="hero" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,24,20,.25) 0%, rgba(21,24,20,.05) 35%, rgba(21,24,20,.55) 100%)" }} />
        <Nav active="home" variant="overlay" />

        {/* Hero copy */}
        <div style={{ position: "absolute", left: 56, right: 56, top: 180 }}>
          <div style={{ color: "var(--cream-50)", maxWidth: 720 }}>
            <div className="eyebrow" style={{ color: "var(--clay)", marginBottom: 16 }}>A FOREST RETREAT · ไทยแลนด์</div>
            <h1 className="serif" style={{
              fontSize: 84, lineHeight: 1.02, margin: 0, fontWeight: 400,
              letterSpacing: "-0.03em", fontFamily: "var(--font-serif)"
            }}>
              Pitch a tent.
              <br /><em style={{ fontStyle: "italic", color: "var(--clay)" }}>Unfold</em> the quiet.
            </h1>
            <p className="thai" style={{ fontSize: 18, lineHeight: 1.6, marginTop: 20, opacity: .88, maxWidth: 540 }}>
              จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก<br/>
              ค้นหาแคมป์ในฝัน ดูรีวิว จองล่วงหน้า พร้อมออกเดินทางได้ทันที
            </p>
          </div>
        </div>

        {/* Search bar overlay */}
        <div style={{ position: "absolute", left: 56, right: 56, bottom: -44, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: 1100,
            background: "var(--paper)", borderRadius: 22,
            boxShadow: "0 30px 60px rgba(20,30,25,.25)",
            padding: 10, display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr auto",
            gap: 0, alignItems: "stretch",
            border: "1px solid var(--line)",
          }}>
            {[
              { label: "ปลายทาง", hint: "เลือกสถานที่ได้เลย", icon: Icon.pin },
              { label: "วันที่เดินทาง", hint: "24 เม.ย — 26 เม.ย", icon: Icon.calendar },
              { label: "ผู้พักอาศัย", hint: "2 ผู้ใหญ่ · 1 เด็ก", icon: Icon.users },
            ].map((f, i) => {
              const I = f.icon;
              return (
                <div key={i} style={{
                  padding: "16px 22px",
                  borderRight: i < 2 ? "1px solid var(--line)" : "none",
                  display: "flex", alignItems: "center", gap: 14, cursor: "pointer"
                }}>
                  <I className="icon" style={{ color: "var(--sage-500)" }} />
                  <div style={{ flex: 1 }}>
                    <div className="thai" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500 }}>{f.label}</div>
                    <div className="thai" style={{ fontSize: 15, color: "var(--ink)", marginTop: 2 }}>{f.hint}</div>
                  </div>
                </div>
              );
            })}
            <button className="btn btn--primary thai" style={{ margin: 6, padding: "0 32px", fontSize: 15 }}>
              <Icon.search className="icon" />
              ค้นหาแคมป์
            </button>
          </div>
        </div>
      </section>

      {/* Featured campsites */}
      <section style={{ padding: "120px 56px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>FEATURED · ลานน่าสนใจ</div>
            <h2 className="section-title">
              ลานกางเต็นท์
              <br /><em style={{ fontFamily: "var(--font-serif)", color: "var(--ember)" }}>ที่น่าสนใจ</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)} className="thai"
                style={{
                  padding: "10px 18px", borderRadius: 999,
                  background: tab === i ? "var(--forest-800)" : "transparent",
                  color: tab === i ? "var(--cream-50)" : "var(--ink)",
                  border: `1px solid ${tab === i ? "var(--forest-800)" : "var(--line-strong)"}`,
                  fontSize: 13, cursor: "pointer",
                }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20 }}>
          {/* Big feature card */}
          <FeatureCard big
            title="เขาใหญ่ แคมป์วิว"
            sub="ปากช่อง · นครราชสีมา"
            rating="9.8"
            price="400"
            scene="forest"
            badges={["Superhost", "Dark sky"]} />

          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 20 }}>
            <FeatureCard title="ป่าสนวัดจันทร์" sub="กัลยาณิวัฒนา · เชียงใหม่" rating="9.6" price="350" scene="dusk" />
            <FeatureCard title="ดอยม่อนเงาะ" sub="แม่แตง · เชียงใหม่" rating="9.4" price="290" scene="meadow" />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 20 }}>
            <FeatureCard title="ริมโขง แคมป์" sub="เชียงคาน · เลย" rating="9.2" price="320" scene="lake" />
            <FeatureCard title="บ้านไม้ A-Frame" sub="ปาย · แม่ฮ่องสอน" rating="9.7" price="1,250" scene="cabin" cabin />
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section style={{ padding: "120px 56px 0" }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>DESTINATIONS · ค้นหาด้วยจังหวัด</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <h2 className="section-title">
            ปลายทาง<em style={{ fontFamily: "var(--font-serif)", color: "var(--ember)" }}> ยอดฮิต</em>
          </h2>
          <a className="thai" style={{ fontSize: 14, color: "var(--forest-700)", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            ดูทั้งหมด <Icon.arrowR className="icon" />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { name: "เชียงใหม่", count: "248 ลาน", scene: "forest" },
            { name: "ตาก", count: "132 ลาน", scene: "meadow" },
            { name: "แม่ฮ่องสอน", count: "96 ลาน", scene: "dusk" },
            { name: "เลย", count: "74 ลาน", scene: "lake" },
            { name: "เพชรบุรี", count: "58 ลาน", scene: "meadow" },
            { name: "กาญจนบุรี", count: "112 ลาน", scene: "hero" },
            { name: "น่าน", count: "89 ลาน", scene: "forest" },
            { name: "กระบี่", count: "43 ลาน", scene: "dusk" },
          ].map((d, i) => (
            <div key={i} className="liftable" style={{
              position: "relative", height: 220, borderRadius: 18, overflow: "hidden", cursor: "pointer",
              boxShadow: "var(--shadow-soft)"
            }}>
              <Scene variant={d.scene} style={{ position: "absolute", inset: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(21,24,20,.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, color: "var(--cream-50)" }}>
                <div className="serif" style={{ fontSize: 26, fontWeight: 500 }}>{d.name}</div>
                <div className="thai" style={{ fontSize: 13, opacity: .8, marginTop: 2 }}>{d.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Kangtent strip */}
      <section style={{ padding: "120px 56px 0" }}>
        <div style={{
          background: "var(--cream-100)", borderRadius: 28, padding: "56px 48px",
          display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 32, alignItems: "flex-start"
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>ทำไมต้อง KANGTENT</div>
            <h2 className="section-title" style={{ fontSize: 36 }}>
              ออกเดินทาง<br />อย่าง<em style={{ color: "var(--ember)" }}>สบายใจ</em>
            </h2>
          </div>
          {[
            { icon: Icon.leaf, t: "คัดสรรด้วยมือ", d: "ทุกลานผ่านการตรวจเยี่ยม จากทีมงาน Kangtent เอง" },
            { icon: Icon.flame, t: "จองง่าย จ่ายปลอดภัย", d: "ยืนยันทันที คืนเงินได้ ภายใน 48 ชั่วโมงก่อนเดินทาง" },
            { icon: Icon.moon, t: "รีวิวจริงจากนักเดินทาง", d: "กว่า 12,000 รีวิว พร้อมภาพจากผู้พักจริง" },
          ].map((f, i) => {
            const I = f.icon;
            return (
              <div key={i}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "var(--paper)", border: "1px solid var(--line)",
                  display: "grid", placeItems: "center", marginBottom: 16, color: "var(--forest-700)"
                }}><I className="icon" style={{ width: 22, height: 22 }} /></div>
                <div className="serif" style={{ fontSize: 20, marginBottom: 8 }}>{f.t}</div>
                <div className="thai" style={{ fontSize: 14, lineHeight: 1.6, color: "#4C5A4E" }}>{f.d}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campfire stories (testimonials) */}
      <section style={{ padding: "120px 56px 0" }}>
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>CAMPFIRE STORIES · เรื่องเล่ารอบกองไฟ</div>
          <h2 className="section-title">
            เรื่องเล่าจาก
            <br /><em style={{ color: "var(--ember)" }}>นักเดินทาง</em>
          </h2>
          <p className="section-sub" style={{ margin: "16px auto 0" }}>
            ประสบการณ์จริง จากคนที่ใช้คืนสุดสัปดาห์ ออกไปหาดาว หาหมอก หาตัวเอง
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              q: "ตื่นเช้ามาเจอหมอกลอยเต็มหุบเขา เงียบมาก — แบบที่กรุงเทพฯ ให้ไม่ได้",
              name: "สิริพร ช.", place: "เขาใหญ่แคมป์วิว · มิ.ย. 2568", scene: "forest"
            },
            {
              q: "จองง่ายกว่าที่คิด เจ้าของลานใจดี ส่งแผนที่มาทางไลน์ก่อนถึง",
              name: "ณัฐพล ว.", place: "ป่าสนวัดจันทร์ · มี.ค. 2568", scene: "dusk"
            },
            {
              q: "ไปกับลูกครั้งแรก กลายเป็นกิจกรรมประจำครอบครัว จองอีกสองคืนเลย",
              name: "พิมพ์ลภัส ก.", place: "ริมโขง · ก.พ. 2568", scene: "lake"
            },
          ].map((t, i) => (
            <div key={i} className="card liftable" style={{ padding: 28, background: "var(--paper)", border: "1px solid var(--line)" }}>
              <Icon.quote style={{ width: 32, height: 32, color: "var(--ember)", opacity: .7, marginBottom: 16 }} />
              <p className="serif" style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 400, color: "var(--forest-900)", margin: 0, minHeight: 130 }}>
                "{t.q}"
              </p>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <Scene variant={t.scene} style={{ width: "100%", height: "100%" }} />
                </div>
                <div>
                  <div className="thai" style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</div>
                  <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 2 }}>{t.place}</div>
                </div>
                <div style={{ marginLeft: "auto" }}><Stars value={5} size={12} /></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: "120px 56px 96px" }}>
        <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", height: 360 }}>
          <Scene variant="night" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--cream-50)", textAlign: "center", padding: 32 }}>
            <div className="eyebrow" style={{ color: "var(--clay)", marginBottom: 16 }}>YOUR NEXT NIGHT UNDER THE STARS</div>
            <h2 className="serif" style={{ fontSize: 56, margin: 0, fontWeight: 400, letterSpacing: "-0.02em", maxWidth: 700, lineHeight: 1.1 }}>
              คืนสุดสัปดาห์นี้<br />
              <em style={{ color: "var(--clay)" }}>อยู่ใต้ดาว</em>ดีกว่าไหม
            </h2>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button className="btn btn--primary btn--lg thai">ค้นหาแคมป์ในฝัน</button>
              <button className="btn btn--lg thai" style={{ background: "rgba(247,242,231,.12)", color: "var(--cream-50)", border: "1px solid rgba(247,242,231,.3)", backdropFilter: "blur(6px)" }}>
                ลงทะเบียนเจ้าของลาน
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, sub, rating, price, scene = "forest", big, badges = [], cabin }) => (
  <div className="liftable" style={{
    position: "relative", height: big ? 520 : 250, borderRadius: 22, overflow: "hidden",
    background: "var(--forest-800)", cursor: "pointer", boxShadow: "var(--shadow-soft)"
  }}>
    <Scene variant={scene} style={{ position: "absolute", inset: 0 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.15) 0%, transparent 40%, rgba(0,0,0,.6) 100%)" }} />

    {/* top badges */}
    <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", gap: 8 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {badges.map((b, i) => <span key={i} className="badge thai">{b}</span>)}
      </div>
      <button style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(247,242,231,.9)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }}>
        <Icon.heart className="icon" style={{ color: "var(--forest-700)" }} />
      </button>
    </div>

    {/* rating pill */}
    {rating && (
      <div style={{ position: "absolute", top: big ? 70 : 60, right: 16 }}>
        <div className="badge badge--dark" style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px" }}>
          <Icon.star style={{ width: 12, height: 12, color: "var(--clay)" }} />
          {rating}
        </div>
      </div>
    )}

    {/* bottom content */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: big ? 28 : 20, color: "var(--cream-50)" }}>
      <div className="serif" style={{ fontSize: big ? 34 : 22, lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</div>
      <div className="thai" style={{ fontSize: big ? 14 : 12, opacity: .85, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
        <Icon.pin style={{ width: 12, height: 12 }} /> {sub}
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginTop: big ? 28 : 14, paddingTop: big ? 24 : 14,
        borderTop: "1px solid rgba(247,242,231,.2)"
      }}>
        <div>
          <div style={{ fontSize: big ? 13 : 11, opacity: .7, fontFamily: "var(--font-thai)" }}>{cabin ? "ราคาต่อคืน" : "ต่อที่ / คืน"}</div>
          <div className="serif" style={{ fontSize: big ? 26 : 18, fontWeight: 500 }}>฿ {price}</div>
        </div>
        {big && (
          <button className="btn btn--primary thai" style={{ padding: "10px 20px" }}>
            จองเลย <Icon.arrowR className="icon" />
          </button>
        )}
      </div>
    </div>
  </div>
);

window.Home = Home;
