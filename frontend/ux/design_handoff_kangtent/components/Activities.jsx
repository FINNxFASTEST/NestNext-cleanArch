/* global React, Nav, Footer, Scene, Icon, Stars */

// ============================================================
// ACTIVITIES LIST — blog-style feed of bookable campsite activities
// ============================================================

const Activities = () => {
  const [category, setCategory] = React.useState("ทั้งหมด");
  const categories = [
    { id: "ทั้งหมด", icon: Icon.leaf, count: 124 },
    { id: "ดูดาว", icon: Icon.moon, count: 28 },
    { id: "เดินป่า", icon: Icon.tent, count: 34 },
    { id: "ปีนเขา", icon: Icon.bolt, count: 12 },
    { id: "ตกปลา", icon: Icon.droplet, count: 18 },
    { id: "ปรุงอาหาร", icon: Icon.flame, count: 22 },
    { id: "ครอบครัว", icon: Icon.cup, count: 10 },
  ];

  const featured = {
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
    scene: "night"
  };

  const posts = [
    {
      id: 1, title: "เดินป่าเช้าตรู่ หาหมอกที่เขาใหญ่",
      excerpt: "เส้นทางเดินป่า 3 กม. ไปยังจุดชมทะเลหมอก เริ่มตี 5 ก่อนพระอาทิตย์ขึ้น มีไกด์ท้องถิ่นนำทาง",
      author: "ลุงหนุ่ม", camp: "เขาใหญ่ แคมป์วิว", location: "ปากช่อง · นครราชสีมา",
      category: "เดินป่า", date: "18 เม.ย 2569", read: "4 นาที",
      price: 250, duration: "4 ชม.", scene: "forest"
    },
    {
      id: 2, title: "ตกปลาริมแม่น้ำโขง กับคุณลุงเจ้าถิ่น",
      excerpt: "ยืมเบ็ด ยืมเรือ ฟังเรื่องเล่าของแม่น้ำ กลับมาทำปลาเผากินรอบกองไฟ เหมาะกับนักตกปลามือใหม่",
      author: "ลุงมา", camp: "ริมโขง แคมป์", location: "เชียงคาน · เลย",
      category: "ตกปลา", date: "15 เม.ย 2569", read: "5 นาที",
      price: 180, duration: "ทั้งเช้า", scene: "lake"
    },
    {
      id: 3, title: "คลาสทำอาหารรอบกองไฟ สไตล์ภาคเหนือ",
      excerpt: "เรียนทำข้าวหลาม แกงอ่อม ปิ้งปลา กับเชฟท้องถิ่น วัตถุดิบสดจากตลาดเช้า กินด้วยกันในมื้อเย็น",
      author: "เชฟน้อย", camp: "ป่าสนวัดจันทร์", location: "กัลยาณิวัฒนา · เชียงใหม่",
      category: "ปรุงอาหาร", date: "12 เม.ย 2569", read: "7 นาที",
      price: 550, duration: "5 ชม.", scene: "dusk"
    },
    {
      id: 4, title: "โยคะเช้าท่ามกลางทุ่งหญ้า",
      excerpt: "ครูโยคะพื้นถิ่นนำสมาธิ 60 นาที บนทุ่งหญ้ากว้าง เสียงนก เสียงลม เป็นเพลงพื้นหลัง",
      author: "ครูเมย์", camp: "ดอยม่อนเงาะ แคมป์", location: "แม่แตง · เชียงใหม่",
      category: "ครอบครัว", date: "10 เม.ย 2569", read: "3 นาที",
      price: 200, duration: "1 ชม.", scene: "meadow"
    },
    {
      id: 5, title: "ปีนผาน้อยที่ปาย — ทริปมือใหม่",
      excerpt: "คอร์สสอนปีนผาเบื้องต้น อุปกรณ์ครบ ไกด์มีใบรับรอง เหมาะกับคนที่ไม่เคยปีน",
      author: "พี่ปอ", camp: "ผาปายแคมป์", location: "ปาย · แม่ฮ่องสอน",
      category: "ปีนเขา", date: "8 เม.ย 2569", read: "6 นาที",
      price: 890, duration: "ครึ่งวัน", scene: "hero"
    },
    {
      id: 6, title: "เวิร์คชอปก่อไฟแบบชาวเขา",
      excerpt: "เรียนก่อไฟไม่ใช้ไฟแช็ก แบบที่ใช้กันมาตั้งแต่โบราณ พร้อมทำชาไฟร้อน ๆ กินรอบกองไฟ",
      author: "ลุงดำ", camp: "บ้านไม้ A-Frame", location: "ปาย · แม่ฮ่องสอน",
      category: "ครอบครัว", date: "5 เม.ย 2569", read: "4 นาที",
      price: 150, duration: "2 ชม.", scene: "cabin"
    },
  ];

  return (
    <div className="screen" style={{ width: 1440 }}>
      <Nav active="activities" variant="solid" />

      {/* HEADER */}
      <section style={{ background: "var(--cream-100)", padding: "48px 56px 36px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>JOURNAL · เรื่องเล่าจากลาน</div>
            <h1 className="serif" style={{ fontSize: 52, margin: 0, fontWeight: 400, color: "var(--forest-900)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              กิจกรรมน่าสนใจ<br/>
              <em style={{ color: "var(--ember)" }}>จากเจ้าของลานทั่วไทย</em>
            </h1>
            <p className="thai" style={{ fontSize: 15, lineHeight: 1.7, color: "#4C5A4E", marginTop: 18, maxWidth: 520 }}>
              อ่านเรื่องเล่า ดูภาพ และจองกิจกรรมสนุกๆ ที่เจ้าของลานจัดให้เอง — เดินป่า ดูดาว ตกปลา หรือเวิร์คชอปเล็กๆ รอบกองไฟ
            </p>
          </div>

          {/* search pill */}
          <div style={{ flex: 1, maxWidth: 380, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--paper)", borderRadius: 999, padding: "10px 16px",
              border: "1px solid var(--line)", boxShadow: "var(--shadow-soft)"
            }}>
              <Icon.search className="icon" style={{ color: "var(--sage-500)" }} />
              <input placeholder="ค้นหากิจกรรม เช่น ดูดาว, เดินป่า…" className="thai"
                style={{ flex: 1, border: "none", background: "none", fontSize: 14, fontFamily: "var(--font-thai)", outline: "none", color: "var(--ink)" }} />
            </div>
            <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", paddingLeft: 16 }}>
              ยอดฮิต: <span style={{ color: "var(--ember)", cursor: "pointer" }}>ทะเลหมอก</span> ·
              <span style={{ color: "var(--ember)", cursor: "pointer" }}> ดูดาว</span> ·
              <span style={{ color: "var(--ember)", cursor: "pointer" }}> ไฟแคมป์</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
          {categories.map(c => {
            const I = c.icon;
            const on = category === c.id;
            return (
              <button key={c.id} onClick={() => setCategory(c.id)} className="thai" style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, fontSize: 13,
                background: on ? "var(--forest-800)" : "var(--paper)",
                color: on ? "var(--cream-50)" : "var(--ink)",
                border: `1px solid ${on ? "var(--forest-800)" : "var(--line-strong)"}`, cursor: "pointer"
              }}>
                <I className="icon" style={{ width: 14, height: 14, color: on ? "var(--clay)" : "var(--sage-500)" }} />
                {c.id}
                <span style={{ fontSize: 11, opacity: .6 }}>{c.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED HERO POST */}
      <section style={{ padding: "48px 56px 0" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>FEATURED · เรื่องแนะนำ</div>
        <div className="liftable" style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0,
          background: "var(--paper)", borderRadius: 28, overflow: "hidden",
          border: "1px solid var(--line)", boxShadow: "var(--shadow-soft)", cursor: "pointer"
        }}>
          <div style={{ position: "relative", minHeight: 440 }}>
            <Scene variant={featured.scene} style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 30%, rgba(0,0,0,.5) 100%)" }}/>
            <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: 6 }}>
              <span className="badge thai" style={{ background: "var(--ember)", color: "var(--cream-50)" }}>แนะนำ</span>
              <span className="badge thai">{featured.category}</span>
            </div>
            <div style={{ position: "absolute", bottom: 20, left: 20, color: "var(--cream-50)" }}>
              <div className="thai" style={{ fontSize: 12, opacity: .85, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.pin style={{ width: 12, height: 12 }}/> {featured.location}
              </div>
            </div>
          </div>
          <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
              <span>{featured.date}</span><span className="dot"/><span>อ่าน {featured.read}</span>
            </div>
            <h2 className="serif" style={{ fontSize: 34, lineHeight: 1.2, margin: 0, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em" }}>
              {featured.title}
            </h2>
            <p className="thai" style={{ fontSize: 15, lineHeight: 1.7, color: "#4C5A4E", marginTop: 18 }}>
              {featured.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden" }}>
                <Scene variant="forest" style={{ width: "100%", height: "100%" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{featured.author}</div>
                <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{featured.camp}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>จองกิจกรรมเริ่ม</span>
                <span className="serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--ember)" }}>฿{featured.price}</span>
                <span className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>/ ท่าน · {featured.duration}</span>
              </div>
              <button className="btn btn--primary thai" style={{ padding: "11px 22px" }}>
                อ่านต่อ & จอง <Icon.arrowR className="icon" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POST GRID + SIDEBAR */}
      <section style={{ padding: "56px 56px 0", display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "flex-start" }}>
        {/* Main feed */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 className="section-title" style={{ fontSize: 30 }}>
              เรื่องเล่า<em style={{ color: "var(--ember)" }}> ล่าสุด</em>
            </h2>
            <div className="thai" style={{ fontSize: 13, color: "var(--sage-500)" }}>
              {posts.length} บทความ · อัปเดตสัปดาห์นี้
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>

          {/* Load more */}
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button className="btn btn--ghost thai" style={{ padding: "12px 28px" }}>
              โหลดเรื่องเล่าเพิ่ม <Icon.chevronD className="icon" style={{ width: 14 }}/>
            </button>
            <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>
              แสดง 6 จาก 124 บทความ
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Upcoming activities */}
          <div style={{ background: "var(--paper)", borderRadius: 22, border: "1px solid var(--line)", padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>UPCOMING · เปิดจองแล้ว</div>
            <div className="serif" style={{ fontSize: 20, color: "var(--forest-900)", marginBottom: 16 }}>กิจกรรมที่ใกล้จะเริ่ม</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { date: "28", month: "เม.ย", title: "ดูดาวคืนเดือนมืด", sub: "ดอยม่อนเงาะ · ฿450", left: 4 },
                { date: "02", month: "พ.ค", title: "เดินป่าหาหมอก", sub: "เขาใหญ่ · ฿250", left: 8 },
                { date: "05", month: "พ.ค", title: "คลาสอาหารรอบไฟ", sub: "ป่าสนวัดจันทร์ · ฿550", left: 2 },
              ].map((u, i) => (
                <div key={i} style={{ display: "flex", gap: 12, cursor: "pointer", alignItems: "center" }}>
                  <div style={{
                    width: 48, height: 56, borderRadius: 10, background: "var(--cream-100)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    border: "1px solid var(--line)"
                  }}>
                    <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--forest-900)", lineHeight: 1 }}>{u.date}</div>
                    <div className="thai" style={{ fontSize: 10, color: "var(--sage-500)", marginTop: 2 }}>{u.month}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{u.title}</div>
                    <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{u.sub}</div>
                    <div className="thai" style={{ fontSize: 10, color: "var(--ember)", marginTop: 3 }}>
                      เหลืออีก {u.left} ที่
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag cloud */}
          <div style={{ background: "var(--cream-100)", borderRadius: 22, padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>TAGS · แท็กยอดฮิต</div>
            <div className="serif" style={{ fontSize: 18, color: "var(--forest-900)", marginBottom: 14 }}>สิ่งที่ผู้คนสนใจ</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["ทะเลหมอก", "ทางช้างเผือก", "ริมน้ำ", "ฝน", "ปลาเผา", "คนเดียว", "ครอบครัว", "สุนัข", "ดอย", "หิ่งห้อย"].map((t, i) => (
                <span key={i} className="thai" style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 12,
                  background: "var(--paper)", border: "1px solid var(--line)", cursor: "pointer",
                  color: "var(--forest-800)"
                }}>#{t}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{
            background: "var(--forest-800)", color: "var(--cream-50)",
            borderRadius: 22, padding: 24, position: "relative", overflow: "hidden"
          }}>
            <Scene variant="night" style={{ position: "absolute", inset: 0, opacity: .35 }} />
            <div style={{ position: "relative" }}>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 8 }}>
                รับเรื่องเล่ารอบกองไฟ
              </div>
              <p className="thai" style={{ fontSize: 12, opacity: .8, lineHeight: 1.6, margin: 0, marginBottom: 14 }}>
                ส่งบทความใหม่ และกิจกรรมเปิดจอง ให้อ่านทุกวันศุกร์
              </p>
              <div style={{ display: "flex", gap: 6, background: "rgba(247,242,231,.12)", borderRadius: 999, padding: 4, border: "1px solid rgba(247,242,231,.18)" }}>
                <input placeholder="อีเมลของคุณ" className="thai" style={{
                  flex: 1, border: "none", background: "none", padding: "8px 12px",
                  color: "var(--cream-50)", fontSize: 13, fontFamily: "var(--font-thai)", outline: "none"
                }}/>
                <button className="thai" style={{
                  padding: "8px 16px", borderRadius: 999, background: "var(--ember)",
                  color: "var(--cream-50)", border: "none", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-thai)"
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
              <div className="eyebrow" style={{ marginBottom: 10 }}>EXPLORE · ตามหมวด</div>
              <h2 className="section-title" style={{ fontSize: 28 }}>เลือกตาม<em style={{ color: "var(--ember)" }}>สไตล์ของคุณ</em></h2>
            </div>
            <a className="thai" style={{ fontSize: 13, color: "var(--forest-700)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              ดูทุกหมวด <Icon.arrowR className="icon" />
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "ดูดาว", scene: "night", count: 28, icon: Icon.moon },
              { name: "เดินป่า", scene: "forest", count: 34, icon: Icon.tent },
              { name: "ตกปลา", scene: "lake", count: 18, icon: Icon.droplet },
              { name: "ปรุงอาหาร", scene: "dusk", count: 22, icon: Icon.flame },
            ].map((c, i) => {
              const I = c.icon;
              return (
                <div key={i} className="liftable" style={{
                  position: "relative", height: 180, borderRadius: 18, overflow: "hidden", cursor: "pointer"
                }}>
                  <Scene variant={c.scene} style={{ position: "absolute", inset: 0 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(27,38,32,.7) 100%)" }}/>
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "var(--cream-50)" }}>
                    <I className="icon" style={{ width: 20, height: 20, color: "var(--clay)", marginBottom: 6 }} />
                    <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{c.name}</div>
                    <div className="thai" style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>{c.count} กิจกรรม</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div style={{ padding: "80px 56px 0" }}/>
      <Footer />
    </div>
  );
};

// ============================================================
// POST CARD
// ============================================================

const PostCard = ({ post }) => (
  <article className="liftable" style={{
    background: "var(--paper)", borderRadius: 20, overflow: "hidden",
    border: "1px solid var(--line)", cursor: "pointer", display: "flex", flexDirection: "column"
  }}>
    <div style={{ position: "relative", height: 220 }}>
      <Scene variant={post.scene} style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 50%, rgba(0,0,0,.4) 100%)" }}/>
      <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6 }}>
        <span className="badge thai">{post.category}</span>
      </div>
      <div style={{ position: "absolute", top: 14, right: 14 }}>
        <button style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(247,242,231,.9)", border: "none",
          display: "grid", placeItems: "center", cursor: "pointer"
        }}>
          <Icon.heart className="icon" style={{ color: "var(--forest-700)", width: 14, height: 14 }} />
        </button>
      </div>
    </div>
    <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <span>{post.date}</span><span className="dot"/><span>อ่าน {post.read}</span>
      </div>
      <h3 className="serif" style={{ fontSize: 22, lineHeight: 1.25, margin: 0, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em" }}>
        {post.title}
      </h3>
      <p className="thai" style={{ fontSize: 13, lineHeight: 1.6, color: "#4C5A4E", marginTop: 10, marginBottom: 0 }}>
        {post.excerpt}
      </p>

      <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", display: "flex", alignItems: "center", gap: 5, marginTop: 14 }}>
        <Icon.pin style={{ width: 11, height: 11 }}/> {post.camp} · {post.location}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Scene variant="meadow" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="thai" style={{ fontSize: 12, fontWeight: 500, color: "var(--forest-900)" }}>{post.author}</div>
          <div className="thai" style={{ fontSize: 10, color: "var(--sage-500)" }}>เจ้าของลาน</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="thai" style={{ fontSize: 10, color: "var(--sage-500)" }}>เริ่ม</div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500, color: "var(--ember)" }}>฿{post.price}</div>
        </div>
      </div>
      <button className="btn btn--ghost thai" style={{ marginTop: 12, padding: "9px 16px", fontSize: 12 }}>
        อ่านต่อ & จองกิจกรรม <Icon.arrowR className="icon" style={{ width: 13 }}/>
      </button>
    </div>
  </article>
);

// ============================================================
// ACTIVITY DETAIL PAGE
// ============================================================

const ActivityDetail = () => {
  const post = {
    title: "นอนดูดาวที่ดอยม่อนเงาะ คืนที่ท้องฟ้าไม่มีเมฆ",
    category: "ดูดาว",
    author: "พี่เบิร์ด",
    role: "เจ้าของลาน ดอยม่อนเงาะแคมป์",
    date: "21 เม.ย 2569",
    read: "6 นาที",
    camp: "ดอยม่อนเงาะ แคมป์",
    location: "แม่แตง · เชียงใหม่",
    price: 450,
    duration: "3 ชม.",
    groupSize: "4–10 ท่าน",
    difficulty: "สบาย ๆ",
    rating: 4.9,
    reviews: 58,
  };

  return (
    <div className="screen" style={{ width: 1440 }}>
      <Nav active="activities" variant="solid" />

      {/* breadcrumb */}
      <div style={{ padding: "18px 56px", borderBottom: "1px solid var(--line)" }}>
        <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", display: "flex", gap: 8, alignItems: "center" }}>
          <a style={{ cursor: "pointer" }}>กิจกรรม</a>
          <Icon.chevronR style={{ width: 10, height: 10 }}/>
          <a style={{ cursor: "pointer" }}>ดูดาว</a>
          <Icon.chevronR style={{ width: 10, height: 10 }}/>
          <span style={{ color: "var(--forest-800)" }}>{post.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", height: 520 }}>
        <Scene variant="night" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,24,20,.25) 0%, rgba(21,24,20,.15) 40%, rgba(21,24,20,.75) 100%)" }}/>
        <div style={{ position: "absolute", bottom: 48, left: 56, right: 56, color: "var(--cream-50)", maxWidth: 820 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span className="badge thai" style={{ background: "var(--ember)", color: "var(--cream-50)" }}>{post.category}</span>
            <span className="badge thai"><Icon.star style={{ width: 11, height: 11, color: "var(--ember)" }}/> {post.rating} · {post.reviews} รีวิว</span>
          </div>
          <h1 className="serif" style={{ fontSize: 56, margin: 0, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {post.title}
          </h1>
          <div className="thai" style={{ fontSize: 14, marginTop: 16, opacity: .85, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon.pin style={{ width: 12, height: 12 }}/> {post.camp} · {post.location}</span>
            <span className="dot"/><span>{post.date}</span>
            <span className="dot"/><span>อ่าน {post.read}</span>
          </div>
        </div>
      </section>

      {/* BODY + BOOKING CARD */}
      <section style={{ padding: "56px 56px 0", display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, alignItems: "flex-start" }}>
        {/* article body */}
        <article style={{ maxWidth: 720 }}>
          {/* author row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden" }}>
              <Scene variant="forest" style={{ width: "100%", height: "100%" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="thai" style={{ fontSize: 15, fontWeight: 500, color: "var(--forest-900)" }}>{post.author}</div>
              <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 2 }}>{post.role}</div>
            </div>
            <button className="btn btn--ghost thai" style={{ padding: "8px 16px", fontSize: 12 }}>ติดตาม</button>
            <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line-strong)", background: "var(--paper)", display: "grid", placeItems: "center", cursor: "pointer" }}>
              <Icon.share className="icon" style={{ width: 14, height: 14, color: "var(--forest-800)" }}/>
            </button>
          </div>

          {/* lede */}
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.55, color: "var(--forest-900)", marginTop: 32, marginBottom: 28, fontStyle: "italic", fontWeight: 400 }}>
            "กล้องส่องดาวพร้อมแล้ว ผ้าห่มพร้อมแล้ว ชาร้อนๆ ก็พร้อม เหลือแค่คุณกับท้องฟ้าในคืนเดือนมืด"
          </p>

          <p className="thai" style={{ fontSize: 16, lineHeight: 1.85, color: "#2C3A2E", margin: "0 0 20px" }}>
            ดอยม่อนเงาะเป็นหนึ่งในจุดที่ท้องฟ้ามืดที่สุดของภาคเหนือ เรามีลานกางเต็นท์เล็กๆ บนสันเขา สูงจากระดับน้ำทะเลประมาณ 1,400 เมตร ในคืนเดือนมืด เราจะพาผู้พักขึ้นไปยังจุดชมดาว พร้อมกล้องโทรทรรศน์และแผนที่ทางช้างเผือก
          </p>
          <p className="thai" style={{ fontSize: 16, lineHeight: 1.85, color: "#2C3A2E", margin: "0 0 24px" }}>
            กิจกรรมเริ่มประมาณสองทุ่ม ใช้เวลา 3 ชั่วโมง ไม่ต้องนำอุปกรณ์มาเอง เราเตรียมไว้ให้ครบ ทั้งเสื่อปู ผ้าห่ม เครื่องดื่มอุ่น ๆ และของว่างพื้นถิ่น
          </p>

          <h2 className="serif" style={{ fontSize: 28, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em", marginTop: 36, marginBottom: 14 }}>
            สิ่งที่คุณจะได้
          </h2>
          <ul className="thai" style={{ fontSize: 15, lineHeight: 1.9, color: "#2C3A2E", paddingLeft: 22, margin: 0 }}>
            <li>ไกด์ดูดาวพื้นถิ่น ที่ชี้กลุ่มดาวให้ได้ 12 กลุ่มหลัก</li>
            <li>กล้องโทรทรรศน์ขนาด 8 นิ้ว ส่องดวงจันทร์และดาวเสาร์</li>
            <li>เสื่อปู ผ้าห่มอุ่น และเครื่องดื่มร้อนไม่อั้น</li>
            <li>ของว่างพื้นถิ่น — ข้าวแคบ แคบหมู แกล้มชา</li>
            <li>ภาพถ่ายทางช้างเผือก ที่เราถ่ายให้ฟรีในคืนที่เห็นชัด</li>
          </ul>

          {/* image break */}
          <div style={{ position: "relative", height: 300, borderRadius: 18, overflow: "hidden", margin: "36px 0" }}>
            <Scene variant="dusk" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
              <span className="badge badge--dark thai" style={{ fontSize: 11 }}>พระอาทิตย์ตก ก่อนเริ่มกิจกรรม · 18:30 น.</span>
            </div>
          </div>

          <h2 className="serif" style={{ fontSize: 28, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 14 }}>
            สำหรับใคร
          </h2>
          <p className="thai" style={{ fontSize: 16, lineHeight: 1.85, color: "#2C3A2E", margin: "0 0 20px" }}>
            เหมาะกับทุกวัย ไม่จำเป็นต้องมีประสบการณ์ดูดาวมาก่อน เรามีเก้าอี้พับสำหรับคุณลุงคุณป้า และเด็กเล็กสามารถร่วมกิจกรรมได้ ฟรีสำหรับเด็กอายุต่ำกว่า 6 ขวบ
          </p>

          {/* quick facts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, margin: "32px 0", padding: 24, background: "var(--cream-100)", borderRadius: 18 }}>
            {[
              { l: "ระยะเวลา", v: post.duration },
              { l: "กลุ่ม", v: post.groupSize },
              { l: "ระดับ", v: post.difficulty },
              { l: "ภาษา", v: "ไทย · EN" },
            ].map((f, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? "1px solid var(--line)" : "none", paddingLeft: i > 0 ? 16 : 0 }}>
                <div className="thai" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500 }}>{f.l}</div>
                <div className="serif" style={{ fontSize: 18, color: "var(--forest-900)", marginTop: 4 }}>{f.v}</div>
              </div>
            ))}
          </div>

          <h2 className="serif" style={{ fontSize: 28, color: "var(--forest-900)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 14 }}>
            รีวิวจากผู้ร่วมกิจกรรม
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { name: "ปภาวดี ส.", date: "มี.ค 2569", q: "ตื่นเต้นมาก เห็นทางช้างเผือกด้วยตาเปล่าครั้งแรก พี่เบิร์ดใจดีมาก ชงชาให้ตลอดคืน" },
              { name: "ณภัทร อ.", date: "ก.พ 2569", q: "ลูกสาวอายุ 8 ขวบชอบมาก วันรุ่งขึ้นยังพูดถึงเลย คุ้มค่ากว่าราคา" },
            ].map((r, i) => (
              <div key={i} style={{ padding: 20, background: "var(--paper)", borderRadius: 14, border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden" }}>
                    <Scene variant="meadow" style={{ width: "100%", height: "100%" }}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                    <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>{r.date}</div>
                  </div>
                  <Stars value={5} size={11}/>
                </div>
                <p className="thai" style={{ fontSize: 14, lineHeight: 1.65, color: "#2C3A2E", margin: 0 }}>
                  "{r.q}"
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* sticky booking card */}
        <aside style={{ position: "sticky", top: 24 }}>
          <div style={{ background: "var(--paper)", borderRadius: 22, border: "1px solid var(--line)", padding: 24, boxShadow: "var(--shadow-card)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
              <span className="serif" style={{ fontSize: 32, fontWeight: 500, color: "var(--forest-900)" }}>฿{post.price}</span>
              <span className="thai" style={{ fontSize: 13, color: "var(--sage-500)" }}>/ ท่าน · {post.duration}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, padding: "8px 12px", background: "var(--cream-100)", borderRadius: 10, fontSize: 12 }}>
              <Icon.star style={{ width: 12, height: 12, color: "var(--ember)" }}/>
              <span className="thai" style={{ fontWeight: 500 }}>{post.rating}</span>
              <span className="thai" style={{ color: "var(--sage-500)" }}>· {post.reviews} รีวิว</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line-strong)" }}>
                <div className="thai" style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500 }}>วันที่</div>
                <div className="thai" style={{ fontSize: 14, color: "var(--forest-900)", marginTop: 3 }}>28 เม.ย 2569 · 20:00 น.</div>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line-strong)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="thai" style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sage-500)", fontWeight: 500 }}>ผู้ร่วมกิจกรรม</div>
                  <div className="thai" style={{ fontSize: 14, color: "var(--forest-900)", marginTop: 3 }}>2 ท่าน</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={qBtn}><Icon.minus className="icon" style={{ width: 12 }}/></button>
                  <button style={qBtn}><Icon.plus className="icon" style={{ width: 12 }}/></button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, padding: "14px 0", borderTop: "1px dashed var(--line)", borderBottom: "1px dashed var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
              <Row label="฿450 × 2 ท่าน" value="฿900"/>
              <Row label="ค่าดูแลและอุปกรณ์" value="฿50"/>
              <Row label="รวม" value="฿950" bold/>
            </div>

            <button className="btn btn--primary btn--block thai" style={{ marginTop: 18, padding: "14px" }}>
              จองกิจกรรมนี้
            </button>
            <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", textAlign: "center", marginTop: 10 }}>
              ยกเลิกฟรี ภายใน 24 ชั่วโมงก่อนเริ่ม
            </div>

            <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 3, justifyContent: "center" }}>
              <Icon.flame style={{ width: 13, height: 13, color: "var(--ember)" }}/>
              <span className="thai" style={{ fontSize: 11, color: "var(--ember)" }}>เหลืออีก 4 ที่ คืนนี้เท่านั้น</span>
            </div>
          </div>

          {/* related */}
          <div style={{ marginTop: 20, background: "var(--cream-100)", borderRadius: 18, padding: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>RELATED · ลานใกล้เคียง</div>
            {[
              { n: "ป่าสนวัดจันทร์", p: "฿350", r: 9.6 },
              { n: "ห้วยน้ำดัง", p: "฿280", r: 9.3 },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: i < 1 ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden" }}>
                  <Scene variant="forest" style={{ width: "100%", height: "100%" }}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="thai" style={{ fontSize: 13, fontWeight: 500, color: "var(--forest-900)" }}>{r.n}</div>
                  <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>
                    <Icon.star style={{ width: 10, height: 10, color: "var(--ember)", display: "inline" }}/> {r.r} · {r.p}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div style={{ padding: "80px 56px 0" }}/>
      <Footer />
    </div>
  );
};

const qBtn = {
  width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--line-strong)",
  background: "var(--paper)", display: "grid", placeItems: "center", cursor: "pointer"
};

const Row = ({ label, value, bold }) => (
  <div className="thai" style={{ display: "flex", justifyContent: "space-between", fontSize: bold ? 15 : 13, fontWeight: bold ? 600 : 400, color: bold ? "var(--forest-900)" : "#4C5A4E" }}>
    <span>{label}</span><span>{value}</span>
  </div>
);

window.Activities = Activities;
window.ActivityDetail = ActivityDetail;
