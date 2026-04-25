/* global React, Nav, Footer, Scene, Icon, Stars */

const Detail = () => {
  return (
    <div className="screen" style={{ width: 1440 }}>
      <Nav active="search" variant="solid" />

      {/* Breadcrumb */}
      <div style={{ padding: "20px 56px 0", fontSize: 13, color: "var(--sage-500)", fontFamily: "var(--font-thai)" }}>
        หน้าแรก <span style={{ margin: "0 8px" }}>›</span> ค้นหาลานกางเต็นท์ <span style={{ margin: "0 8px" }}>›</span> นครราชสีมา <span style={{ margin: "0 8px", color: "var(--ink)" }}>›</span> <span style={{ color: "var(--ink)" }}>เขาใหญ่ แคมป์วิว</span>
      </div>

      {/* Title block */}
      <section style={{ padding: "24px 56px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <span className="badge badge--sage thai"><Icon.leaf style={{ width: 12, height: 12 }} /> Superhost</span>
              <span className="badge thai" style={{ background: "var(--cream-100)" }}>ที่ 9.8 ⭐ · 248 รีวิว</span>
            </div>
            <h1 className="serif" style={{ fontSize: 64, margin: 0, fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1 }}>
              เขาใหญ่ <em style={{ color: "var(--ember)" }}>แคมป์วิว</em>
            </h1>
            <div className="thai" style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 16, color: "#4C5A4E", fontSize: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.pin style={{ width: 14, height: 14 }} /> ปากช่อง, นครราชสีมา
              </span>
              <span className="dot" />
              <span>เปิดตลอดปี</span>
              <span className="dot" />
              <span>รองรับ 45 เต็นท์</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--ghost thai"><Icon.share className="icon" /> แชร์</button>
            <button className="btn btn--ghost thai"><Icon.heart className="icon" /> บันทึก</button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "0 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: 8, borderRadius: 22, overflow: "hidden", height: 448 }}>
          <div style={{ gridRow: "1 / 3", position: "relative" }}>
            <Scene variant="forest" style={{ position: "absolute", inset: 0 }} />
          </div>
          <div style={{ position: "relative" }}><Scene variant="dusk" style={{ position: "absolute", inset: 0 }} /></div>
          <div style={{ position: "relative" }}><Scene variant="meadow" style={{ position: "absolute", inset: 0 }} /></div>
          <div style={{ position: "relative" }}><Scene variant="night" style={{ position: "absolute", inset: 0 }} /></div>
          <div style={{ position: "relative" }}>
            <Scene variant="lake" style={{ position: "absolute", inset: 0 }} />
            <button className="btn thai" style={{ position: "absolute", bottom: 16, right: 16, background: "var(--paper)", border: "1px solid var(--line-strong)" }}>
              ดูทั้งหมด 24 ภาพ
            </button>
          </div>
        </div>
      </section>

      {/* Main two-column */}
      <section style={{ padding: "48px 56px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 56 }}>
        <div>
          {/* Intro */}
          <div style={{ paddingBottom: 32, borderBottom: "1px solid var(--line)" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>ABOUT THE PLACE</div>
            <h2 className="serif" style={{ fontSize: 30, margin: "0 0 16px", lineHeight: 1.2, fontWeight: 500 }}>
              ท่ามกลางขุนเขา และหมอกยามเช้า
            </h2>
            <p className="thai" style={{ fontSize: 16, lineHeight: 1.75, color: "#3F4A42", margin: 0, maxWidth: 680 }}>
              ตั้งอยู่ท่ามกลางธรรมชาติของเขาใหญ่ ลานกางเต็นท์ "เขาใหญ่ แคมป์วิว" มอบประสบการณ์การพักผ่อน
              ท่ามกลางขุนเขาและหมอกยามเช้า เหมาะสำหรับทั้งครอบครัวและนักเดินทางสายแคมป์
              ที่ต้องการสัมผัสความสงบ เงียบ และอากาศบริสุทธิ์
            </p>
          </div>

          {/* Amenities */}
          <div style={{ padding: "32px 0", borderBottom: "1px solid var(--line)" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>AMENITIES · สิ่งอำนวยความสะดวก</div>
            <h3 className="serif" style={{ fontSize: 24, margin: "0 0 24px", fontWeight: 500 }}>ทุกอย่างที่คุณต้องการ</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { i: Icon.bolt, t: "ไฟฟ้า", s: "220V ทุกพื้นที่" },
                { i: Icon.droplet, t: "น้ำประปา", s: "ดื่มได้" },
                { i: Icon.flame, t: "ก่อไฟได้", s: "ในจุดที่กำหนด" },
                { i: Icon.shower, t: "ห้องน้ำ / ห้องอาบน้ำ", s: "น้ำอุ่น 24 ชม." },
                { i: Icon.car, t: "ที่จอดรถ", s: "ฟรี ติดลาน" },
                { i: Icon.wifi, t: "Wi-Fi", s: "เฉพาะโซน Lobby" },
                { i: Icon.cup, t: "ครัวกลาง", s: "พร้อมอุปกรณ์" },
                { i: Icon.dog, t: "อนุญาตสัตว์เลี้ยง", s: "สุนัขตัวเล็ก" },
                { i: Icon.moon, t: "Dark-sky zone", s: "ดูดาวได้ทั้งคืน" },
              ].map((a, i) => {
                const I = a.i;
                return (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "10px 0" }}>
                    <I className="icon" style={{ width: 22, height: 22, color: "var(--forest-700)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div className="thai" style={{ fontSize: 15, color: "var(--ink)" }}>{a.t}</div>
                      <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 2 }}>{a.s}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seasonal calendar */}
          <div style={{ padding: "32px 0", borderBottom: "1px solid var(--line)" }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>SEASONAL · ฤดูกาลน่าไป</div>
            <h3 className="serif" style={{ fontSize: 24, margin: "0 0 24px", fontWeight: 500 }}>ไปช่วงไหนดี</h3>
            <div style={{ display: "flex", gap: 4, overflow: "hidden", borderRadius: 12 }}>
              {[
                { m: "ม.ค", rate: 4, note: "หนาว" },
                { m: "ก.พ", rate: 4, note: "หมอก" },
                { m: "มี.ค", rate: 3, note: "" },
                { m: "เม.ย", rate: 2, note: "ร้อน" },
                { m: "พ.ค", rate: 2, note: "" },
                { m: "มิ.ย", rate: 3, note: "ฝน" },
                { m: "ก.ค", rate: 3, note: "" },
                { m: "ส.ค", rate: 3, note: "" },
                { m: "ก.ย", rate: 3, note: "" },
                { m: "ต.ค", rate: 4, note: "สด" },
                { m: "พ.ย", rate: 5, note: "พีค" },
                { m: "ธ.ค", rate: 5, note: "พีค" },
              ].map((m, i) => {
                const colors = ["#E7E4D8", "#D7DDCA", "#B7C5A4", "#8B9A7A", "#5B7254"];
                return (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 64, background: colors[m.rate - 1], position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 6 }}>
                      {m.note && <span className="thai" style={{ fontSize: 10, color: m.rate >= 4 ? "var(--cream-50)" : "var(--forest-800)" }}>{m.note}</span>}
                    </div>
                    <div className="thai" style={{ fontSize: 11, padding: "8px 0", color: "#4C5A4E", letterSpacing: ".03em" }}>{m.m}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 11, color: "var(--sage-500)", fontFamily: "var(--font-thai)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, background: "#E7E4D8", borderRadius: 2 }}/>เงียบ</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, background: "#8B9A7A", borderRadius: 2 }}/>ดี</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, background: "#5B7254", borderRadius: 2 }}/>พีคซีซัน</span>
            </div>
          </div>

          {/* Camp sites available */}
          <div style={{ padding: "32px 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>PITCHES · พื้นที่กางเต็นท์</div>
                <h3 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 500 }}>เลือกพื้นที่ของคุณ</h3>
              </div>
              <button className="btn btn--ghost thai"><Icon.map className="icon" /> ดูแผนที่ลาน</button>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { name: "ลานริมเขา", size: "2×2 เมตร", desc: "ริมหน้าผา วิวขุนเขา ปากโล่ง ดูดาวได้", price: 400, left: 2, active: true },
                { name: "ลานใต้ต้นสน", size: "3×3 เมตร", desc: "ร่มรื่น ใกล้ห้องน้ำ เหมาะครอบครัว", price: 480, left: 5 },
                { name: "ลานริมลำธาร", size: "2×2 เมตร", desc: "เสียงน้ำไหล อากาศเย็น", price: 380, left: 3 },
                { name: "ลานดูดาว", size: "4×4 เมตร", desc: "เปิดโล่ง ไม่มีไฟรบกวน", price: 550, left: 1 },
              ].map((p, i) => (
                <div key={i} className="card" style={{
                  padding: 18, display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 20, alignItems: "center",
                  background: p.active ? "var(--cream-100)" : "var(--paper)",
                  borderColor: p.active ? "var(--forest-700)" : "var(--line)",
                  borderWidth: p.active ? 1.5 : 1
                }}>
                  <div style={{ width: 120, height: 90, borderRadius: 12, overflow: "hidden", position: "relative" }}>
                    <Scene variant={["forest", "meadow", "lake", "night"][i]} style={{ position: "absolute", inset: 0 }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div className="serif" style={{ fontSize: 19, fontWeight: 500 }}>{p.name}</div>
                      <span className="badge thai" style={{ background: "var(--paper)", border: "1px solid var(--line)", fontSize: 11 }}>{p.size}</span>
                    </div>
                    <div className="thai" style={{ fontSize: 13, color: "#4C5A4E", marginTop: 6 }}>{p.desc}</div>
                    <div className="thai" style={{ fontSize: 12, color: p.left <= 2 ? "var(--ember-dark)" : "var(--sage-500)", marginTop: 8 }}>
                      {p.left <= 2 ? `⏳ เหลือ ${p.left} ที่` : `เหลือ ${p.left} ที่`}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="serif" style={{ fontSize: 24, fontWeight: 500 }}>฿ {p.price}</div>
                    <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginBottom: 10 }}>ต่อคืน</div>
                    {p.active ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid var(--line-strong)", borderRadius: 999, padding: "4px" }}>
                        <button style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", cursor: "pointer" }}><Icon.minus style={{ width: 14, height: 14 }}/></button>
                        <span className="thai" style={{ width: 20, textAlign: "center", fontSize: 14 }}>1</span>
                        <button style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--forest-700)", color: "var(--cream-50)", border: "none", display: "grid", placeItems: "center", cursor: "pointer" }}><Icon.plus style={{ width: 14, height: 14 }}/></button>
                      </div>
                    ) : (
                      <button className="btn btn--ghost thai" style={{ padding: "8px 18px", fontSize: 13 }}>เลือก</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div style={{ padding: "32px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>REVIEWS · รีวิวจากผู้พัก</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span className="serif" style={{ fontSize: 40, fontWeight: 500 }}>4.9</span>
                  <div>
                    <Stars value={5} size={14} />
                    <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 4 }}>จาก 248 รีวิว</div>
                  </div>
                </div>
              </div>
              <button className="btn btn--ghost thai">ดูทั้งหมด <Icon.arrowR className="icon" /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {[
                { name: "Siriporn", date: "12 มิ.ย 2568", rate: 5, text: "ลานกว้างมาก วิวสวย ห้องน้ำสะอาด เจ้าของใจดี จะกลับไปอีกแน่นอน", scene: "forest" },
                { name: "Thanawat", date: "28 พ.ค 2568", rate: 5, text: "หมอกเช้าสวยสุดๆ ไฟฟ้ามาพร้อม น้ำอุ่นเพียบ — พาลูกไปได้สบาย", scene: "dusk" },
                { name: "Kamolchanok", date: "15 พ.ค 2568", rate: 5, text: "ก่อไฟได้สบายใจ มีจุดจัดไว้ให้แล้ว กลางคืนเงียบมาก ดาวเต็มท้องฟ้า", scene: "night" },
                { name: "Jirawat", date: "02 พ.ค 2568", rate: 4, text: "ราคาคุ้ม เดินทางสะดวก ถ้าเพิ่มร้านค้าในลานได้จะเยี่ยม", scene: "meadow" },
              ].map((r, i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden" }}>
                      <Scene variant={r.scene} style={{ width: "100%", height: "100%" }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="thai" style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                      <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{r.date}</div>
                    </div>
                    <Stars value={r.rate} size={12} />
                  </div>
                  <p className="thai" style={{ fontSize: 14, lineHeight: 1.65, color: "#3F4A42", margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking sidebar */}
        <aside>
          <div className="card" style={{ padding: 24, boxShadow: "var(--shadow-card)", position: "sticky", top: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div className="serif" style={{ fontSize: 30, fontWeight: 500 }}>฿ 400<span className="thai" style={{ fontSize: 14, color: "var(--sage-500)", fontFamily: "var(--font-thai)", marginLeft: 6 }}>/ คืน</span></div>
                <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 4 }}>ลานริมเขา · เหลือ 2 ที่</div>
              </div>
              <div className="badge thai" style={{ background: "var(--moss-200)", color: "var(--forest-800)" }}>
                <Icon.star style={{ width: 10, height: 10 }}/> 9.8
              </div>
            </div>

            {/* Date + guests */}
            <div style={{ border: "1px solid var(--line-strong)", borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--line)" }}>
                <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>เช็คอิน</div>
                  <div className="thai" style={{ fontSize: 14, marginTop: 4 }}>24 เม.ย 2569</div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>เช็คเอาท์</div>
                  <div className="thai" style={{ fontSize: 14, marginTop: 4 }}>26 เม.ย 2569</div>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div className="eyebrow" style={{ fontSize: 9 }}>ผู้พัก</div>
                <div className="thai" style={{ fontSize: 14, marginTop: 4 }}>2 ผู้ใหญ่ · 1 เด็ก</div>
              </div>
            </div>

            <button className="btn btn--primary btn--block thai" style={{ padding: "14px", fontSize: 15 }}>
              จองพื้นที่กางเต็นท์
            </button>

            <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", textAlign: "center", margin: "14px 0" }}>
              ยังไม่ตัดเงินจนกว่าเจ้าของลานจะยืนยัน
            </div>

            {/* Price breakdown */}
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "grid", gap: 10, fontFamily: "var(--font-thai)", fontSize: 14 }}>
              <Row l="฿ 400 × 2 คืน" r="฿ 800" />
              <Row l="ค่าบริการ" r="฿ 50" />
              <Row l="ส่วนลดสมาชิก" r="−฿ 80" ember />
              <div style={{ height: 1, background: "var(--line)" }}/>
              <Row l={<span className="serif" style={{ fontSize: 16 }}>รวมทั้งหมด</span>} r={<span className="serif" style={{ fontSize: 20, fontWeight: 500 }}>฿ 770</span>} />
            </div>

            {/* Host */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <Scene variant="dusk" style={{ width: "100%", height: "100%" }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>คุณนพดล · เจ้าของลาน</div>
                <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>ตอบภายใน 1 ชั่วโมง</div>
              </div>
              <button className="btn btn--ghost thai" style={{ padding: "6px 12px", fontSize: 12 }}>ทักแชท</button>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
};

const Row = ({ l, r, ember }) => (
  <div style={{ display: "flex", justifyContent: "space-between", color: ember ? "var(--ember-dark)" : "var(--ink)" }}>
    <span>{l}</span><span>{r}</span>
  </div>
);

window.Detail = Detail;
