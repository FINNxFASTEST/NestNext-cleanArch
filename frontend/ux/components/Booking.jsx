/* global React, Nav, Footer, Scene, Icon, Stars */

const Booking = () => {
  const [step, setStep] = React.useState(2); // 1: dates, 2: details, 3: payment

  return (
    <div className="screen" style={{ width: 1440, minHeight: 1600 }}>
      <Nav active="bookings" variant="solid" />

      {/* Step header */}
      <section style={{ padding: "32px 56px 24px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--sage-500)", fontSize: 13, fontFamily: "var(--font-thai)", marginBottom: 20, cursor: "pointer" }}>
          <Icon.chevronL className="icon" /> กลับไปที่เขาใหญ่ แคมป์วิว
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>CHECKOUT · การจอง</div>
            <h1 className="serif" style={{ fontSize: 44, margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
              เกือบจะได้ออกเดินทางแล้ว
            </h1>
          </div>
          {/* Stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {["วันที่", "รายละเอียด", "ชำระเงิน"].map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: step >= i + 1 ? 1 : 0.4 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: step > i + 1 ? "var(--forest-700)" : step === i + 1 ? "var(--ember)" : "var(--cream-100)",
                    color: step >= i + 1 ? "var(--cream-50)" : "var(--sage-500)",
                    display: "grid", placeItems: "center", fontSize: 13, fontFamily: "var(--font-serif)"
                  }}>
                    {step > i + 1 ? <Icon.check style={{ width: 14, height: 14 }}/> : i + 1}
                  </div>
                  <span className="thai" style={{ fontSize: 14 }}>{s}</span>
                </div>
                {i < 2 && <div style={{ width: 40, height: 1, background: "var(--line-strong)", margin: "0 12px" }}/>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 56px", display: "grid", gridTemplateColumns: "1fr 460px", gap: 48 }}>
        <div>
          {/* Trip block */}
          <div className="card" style={{ padding: 24, marginBottom: 24, display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ width: 120, height: 96, borderRadius: 14, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <Scene variant="forest" style={{ position: "absolute", inset: 0 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>ทริปของคุณ</div>
              <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>เขาใหญ่ แคมป์วิว</div>
              <div className="thai" style={{ fontSize: 13, color: "#4C5A4E", marginTop: 6, display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon.calendar style={{ width: 14, height: 14 }}/> 24 — 26 เม.ย 2569</span>
                <span className="dot" />
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon.users style={{ width: 14, height: 14 }}/> 2 ผู้ใหญ่ · 1 เด็ก</span>
                <span className="dot" />
                <span>ลานริมเขา × 2</span>
              </div>
            </div>
            <button className="btn btn--ghost thai" style={{ fontSize: 13 }}>แก้ไข</button>
          </div>

          {/* Contact details */}
          <FormCard title="ข้อมูลผู้จอง" eyebrow="CONTACT · ผู้ติดต่อ">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="ชื่อ" value="กฤษณ์" />
              <Field label="นามสกุล" value="อารีวงศ์" />
              <Field label="อีเมล" value="krit@example.com" />
              <Field label="เบอร์โทรศัพท์" value="+66 89 123 4567" />
            </div>
          </FormCard>

          {/* Guests */}
          <FormCard title="รายชื่อผู้เดินทาง" eyebrow="GUESTS · ผู้พักค้างคืน">
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { role: "ผู้ใหญ่ · หัวหน้ากลุ่ม", name: "กฤษณ์ อารีวงศ์" },
                { role: "ผู้ใหญ่", name: "พิมพ์ชนก สุดใจ" },
                { role: "เด็ก (อายุ 7)", name: "น้องภูผา" },
              ].map((g, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 16px", background: "var(--cream-100)", borderRadius: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--forest-700)", color: "var(--cream-50)", display: "grid", placeItems: "center", fontSize: 12, fontFamily: "var(--font-serif)" }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="thai" style={{ fontSize: 14 }}>{g.name}</div>
                    <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{g.role}</div>
                  </div>
                  <button className="btn btn--ghost thai" style={{ padding: "6px 12px", fontSize: 12 }}>แก้ไข</button>
                </div>
              ))}
            </div>
          </FormCard>

          {/* Add-ons */}
          <FormCard title="เพิ่มความสบายให้ทริป" eyebrow="ADD-ONS · ของให้เช่า">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { n: "เต็นท์ 3 คน พร้อมติดตั้ง", p: "฿ 350 / คืน", c: true, i: Icon.tent },
                { n: "ถุงนอน (หนา -5°C)", p: "฿ 120 / คืน", c: false, i: Icon.moon },
                { n: "ชุดฟืน + ไฟฉาย", p: "฿ 180", c: true, i: Icon.flame },
                { n: "อาหารเช้าฝีมือเจ้าบ้าน", p: "฿ 150 / ท่าน", c: false, i: Icon.cup },
              ].map((a, i) => {
                const I = a.i;
                return (
                  <div key={i} style={{
                    padding: 16, border: `1.5px solid ${a.c ? "var(--forest-700)" : "var(--line)"}`,
                    background: a.c ? "var(--cream-100)" : "var(--paper)",
                    borderRadius: 14, display: "flex", gap: 14, alignItems: "center", cursor: "pointer"
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                      background: a.c ? "var(--forest-700)" : "var(--paper)",
                      border: "1.5px solid " + (a.c ? "var(--forest-700)" : "var(--line-strong)"),
                      display: "grid", placeItems: "center", color: "var(--cream-50)"
                    }}>{a.c && <Icon.check style={{ width: 12, height: 12 }}/>}</div>
                    <I className="icon" style={{ width: 22, height: 22, color: "var(--forest-700)" }} />
                    <div style={{ flex: 1 }}>
                      <div className="thai" style={{ fontSize: 14 }}>{a.n}</div>
                      <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 2 }}>{a.p}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FormCard>

          {/* Payment method */}
          <FormCard title="วิธีชำระเงิน" eyebrow="PAYMENT · ชำระเงิน">
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {["บัตรเครดิต/เดบิต", "พร้อมเพย์ QR", "โอนธนาคาร", "TrueMoney"].map((m, i) => (
                <button key={i} className="thai" style={{
                  padding: "10px 18px", borderRadius: 999,
                  background: i === 0 ? "var(--forest-800)" : "var(--paper)",
                  color: i === 0 ? "var(--cream-50)" : "var(--ink)",
                  border: `1px solid ${i === 0 ? "var(--forest-800)" : "var(--line-strong)"}`,
                  fontSize: 13, cursor: "pointer"
                }}>{m}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              <Field label="หมายเลขบัตร" value="•••• •••• •••• 4892" mono />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="วันหมดอายุ" value="09 / 27" mono />
                <Field label="CVV" value="•••" mono />
              </div>
              <Field label="ชื่อบนบัตร" value="Krit Areewong" />
            </div>
          </FormCard>

          {/* Cancellation note */}
          <div style={{
            padding: 20, background: "var(--cream-100)", borderRadius: 16,
            border: "1px dashed var(--line-strong)", display: "flex", gap: 14
          }}>
            <Icon.leaf style={{ width: 24, height: 24, color: "var(--forest-700)", flexShrink: 0 }}/>
            <div>
              <div className="serif" style={{ fontSize: 16, marginBottom: 4, fontWeight: 500 }}>ยกเลิกฟรีก่อน 22 เม.ย 23:59</div>
              <div className="thai" style={{ fontSize: 13, color: "#4C5A4E", lineHeight: 1.6 }}>
                การจองของคุณได้รับการคุ้มครองโดย Kangtent Care — หากสภาพอากาศไม่เอื้ออำนวย เรามีนโยบายเลื่อนวันให้ฟรี
              </div>
            </div>
          </div>
        </div>

        {/* Summary sidebar */}
        <aside>
          <div style={{ position: "sticky", top: 24 }}>
            <div className="card" style={{ padding: 0, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
              {/* Illustrated header */}
              <div style={{ position: "relative", height: 140 }}>
                <Scene variant="dusk" style={{ position: "absolute", inset: 0 }}/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(21,24,20,.6) 100%)" }}/>
                <div style={{ position: "absolute", bottom: 14, left: 20, right: 20, color: "var(--cream-50)" }}>
                  <div className="eyebrow" style={{ color: "var(--clay)" }}>YOUR STAY</div>
                  <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>2 คืน · เขาใหญ่</div>
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{ display: "grid", gap: 10, fontFamily: "var(--font-thai)", fontSize: 14, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                  <Row l="ลานริมเขา × 2 × 2 คืน" r="฿ 1,600" />
                  <Row l="เต็นท์ 3 คน × 2 คืน" r="฿ 700" />
                  <Row l="ชุดฟืน + ไฟฉาย" r="฿ 180" />
                  <Row l="ค่าบริการ" r="฿ 90" />
                  <Row l="ส่วนลด WELCOME25" r="−฿ 200" ember />
                </div>

                {/* Discount code */}
                <div style={{ margin: "16px 0", display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <input className="thai" placeholder="กรอกรหัสส่วนลด" style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      border: "1px solid var(--line-strong)", fontSize: 13, background: "var(--paper)",
                      fontFamily: "var(--font-thai)"
                    }}/>
                  </div>
                  <button className="btn btn--ghost thai" style={{ padding: "10px 18px", fontSize: 13 }}>ใช้โค้ด</button>
                </div>

                <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>ราคาสุทธิ</div>
                    <div className="serif" style={{ fontSize: 34, fontWeight: 500, color: "var(--forest-900)" }}>฿ 2,370</div>
                  </div>
                  <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", textAlign: "right", maxWidth: 120 }}>
                    รวมภาษี และค่าบริการแล้ว
                  </div>
                </div>

                <button className="btn btn--primary btn--block thai" style={{ padding: 16, fontSize: 15, marginTop: 20 }}>
                  ยืนยันและชำระเงิน
                </button>

                <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                  การกดยืนยัน แสดงว่าคุณยอมรับ<br/>
                  <u>เงื่อนไขการใช้งาน</u> และ <u>นโยบายยกเลิก</u>
                </div>
              </div>
            </div>

            {/* Reassurance mini-card */}
            <div style={{ marginTop: 16, padding: 16, background: "var(--moss-200)", borderRadius: 14, display: "flex", gap: 12, alignItems: "center" }}>
              <Icon.flame style={{ width: 22, height: 22, color: "var(--forest-800)", flexShrink: 0 }}/>
              <div className="thai" style={{ fontSize: 12, lineHeight: 1.5, color: "var(--forest-900)" }}>
                <b>12,480 ชาวแคมเปอร์</b> ได้ออกเดินทางกับเราในเดือนนี้
              </div>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
};

const FormCard = ({ title, eyebrow, children }) => (
  <div className="card" style={{ padding: 28, marginBottom: 24 }}>
    <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>
    <h3 className="serif" style={{ fontSize: 22, margin: "0 0 20px", fontWeight: 500 }}>{title}</h3>
    {children}
  </div>
);

const Field = ({ label, value, mono }) => (
  <label style={{ display: "block" }}>
    <div className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>{label}</div>
    <div style={{
      padding: "12px 14px", borderRadius: 10,
      border: "1px solid var(--line-strong)", fontSize: 14, background: "var(--paper)",
      fontFamily: "var(--font-thai)"
    }}>{value}</div>
  </label>
);

const Row = ({ l, r, ember }) => (
  <div style={{ display: "flex", justifyContent: "space-between", color: ember ? "var(--ember-dark)" : "var(--ink)" }}>
    <span>{l}</span><span>{r}</span>
  </div>
);

window.Booking = Booking;
