/* global React, Scene, Icon, Stars, KangtentMark */

// ============ SHARED SHELL ============
const AdminShell = ({ section, setSection, title, subtitle, right, children }) => (
  <div className="screen" style={{ width: 1440, minHeight: 1100, background: "var(--cream-50)", display: "grid", gridTemplateColumns: "260px 1fr" }}>
    <AdminSidebar section={section} setSection={setSection}/>
    <main style={{ padding: "28px 40px 60px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>{subtitle}</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 32, margin: "4px 0 0", fontWeight: 500, letterSpacing: "-0.02em" }}>{title}</h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input placeholder="ค้นหา..." className="thai" style={{ padding: "10px 16px 10px 38px", borderRadius: 999, border: "1px solid var(--line)", background: "var(--paper)", width: 220, fontSize: 13, fontFamily: "var(--font-thai)" }}/>
            <Icon.search style={{ position: "absolute", left: 12, top: 11, width: 16, height: 16, color: "var(--sage-500)" }}/>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", cursor: "pointer", position: "relative" }}>
            <Icon.flame style={{ width: 18, height: 18, color: "var(--forest-700)" }}/>
            <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, background: "var(--ember)", borderRadius: "50%", border: "2px solid var(--paper)" }}/>
          </button>
          {right}
        </div>
      </div>
      {children}
    </main>
  </div>
);

const AdminSidebar = ({ section, setSection }) => (
  <aside style={{ background: "var(--forest-900)", color: "var(--cream-50)", padding: "28px 20px", position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "0 8px" }}>
      <KangtentMark bg="var(--ember)" />
      <div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600 }}>Kangtent</div>
        <div className="thai" style={{ fontSize: 10, opacity: .6, letterSpacing: ".08em", textTransform: "uppercase" }}>Host studio</div>
      </div>
    </div>
    <div style={{ background: "rgba(247,242,231,.05)", borderRadius: 14, padding: 14, marginBottom: 24, border: "1px solid rgba(247,242,231,.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <Scene variant="forest" style={{ width: "100%", height: "100%" }}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>เขาใหญ่ แคมป์วิว</div>
          <div className="thai" style={{ fontSize: 10, opacity: .6, marginTop: 2 }}>Superhost · 9.8 ★</div>
        </div>
      </div>
    </div>
    <NavGroup label="ภาพรวม" active={section} onClick={setSection}
      items={[{ id: "dashboard", label: "แดชบอร์ด", icon: Icon.bolt }]} />
    <NavGroup label="การจัดการ" active={section} onClick={setSection}
      items={[
        { id: "camps", label: "จัดการพื้นที่แคมป์", icon: Icon.tent },
        { id: "bookings", label: "ดูการจองทั้งหมด", icon: Icon.calendar },
        { id: "users", label: "จัดการผู้ใช้งาน", icon: Icon.users },
        { id: "coupons", label: "คูปองและโปรโมชั่น", icon: Icon.flame },
      ]} />
    <NavGroup label="อื่น ๆ" active={section} onClick={setSection}
      items={[{ id: "settings", label: "ตั้งค่า", icon: Icon.leaf }]} />
    <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, fontSize: 11, fontStyle: "italic", opacity: .4, lineHeight: 1.6, fontFamily: "var(--font-thai)" }}>
      "ทุกคืนใต้ดาว เริ่มจาก ลานเล็ก ๆ ของคุณ"
    </div>
  </aside>
);

const NavGroup = ({ label, items, active, onClick }) => (
  <div style={{ marginBottom: 20 }}>
    <div className="thai" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", opacity: .45, padding: "0 10px", marginBottom: 8 }}>{label}</div>
    {items.map(it => {
      const I = it.icon;
      const isActive = active === it.id;
      return (
        <button key={it.id} onClick={() => onClick(it.id)} className="thai"
          style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%",
            padding: "10px 12px", borderRadius: 10,
            background: isActive ? "var(--ember)" : "transparent",
            color: "var(--cream-50)", border: "none", cursor: "pointer",
            fontSize: 13, textAlign: "left", marginBottom: 2,
            fontFamily: "var(--font-thai)", fontWeight: isActive ? 500 : 400,
          }}>
          <I style={{ width: 18, height: 18, flexShrink: 0 }}/>
          {it.label}
        </button>
      );
    })}
  </div>
);

const Panel = ({ title, eyebrow, right, children, pad = 24, mb = 24 }) => (
  <div style={{ background: "var(--paper)", borderRadius: 18, padding: pad, border: "1px solid var(--line)", marginBottom: mb }}>
    {(title || right) && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
        <div>
          {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
          {title && <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, margin: 0, fontWeight: 500 }}>{title}</h3>}
        </div>
        {right}
      </div>
    )}
    {children}
  </div>
);

const StatCard = ({ label, value, sub, icon: I, accent }) => (
  <div style={{ background: "var(--paper)", borderRadius: 18, padding: 20, border: "1px solid var(--line)", minHeight: 170, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div className="thai" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--sage-500)", lineHeight: 1.4 }}>{label}</div>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: accent + "22", display: "grid", placeItems: "center", color: accent }}>
        <I style={{ width: 16, height: 16 }}/>
      </div>
    </div>
    <div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 38, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 6 }}>{sub}</div>
    </div>
  </div>
);

const StatusPill = ({ status }) => {
  const map = {
    Paid: { bg: "#C7D1B8", c: "#2F4034", t: "Paid" },
    Pending: { bg: "#F3DCB2", c: "#8B5A2A", t: "Pending" },
    Cancel: { bg: "#EADBD3", c: "#A96438", t: "Cancelled" },
    Active: { bg: "#C7D1B8", c: "#2F4034", t: "● Active" },
    Paused: { bg: "#E7E4D8", c: "#4C5A4E", t: "Paused" },
    Full: { bg: "#F3C5A8", c: "#8B3E1A", t: "Full" },
    Draft: { bg: "#E7E4D8", c: "#4C5A4E", t: "Draft" },
    Expired: { bg: "#EADBD3", c: "#A96438", t: "Expired" },
  };
  const m = map[status] || map.Paused;
  return (
    <span className="thai" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 999, fontSize: 11,
      background: m.bg, color: m.c, fontWeight: 500
    }}>{m.t}</span>
  );
};

const Th = ({ children, align }) => <th style={{ textAlign: align || "left", padding: "10px 12px", fontWeight: 500 }}>{children}</th>;
const Td = ({ children, align }) => <td style={{ textAlign: align || "left", padding: "14px 12px", color: "var(--ink)" }}>{children}</td>;
const actionBtn = { padding: "5px 12px", fontSize: 11, borderRadius: 999, background: "var(--cream-100)", border: "1px solid var(--line)", cursor: "pointer", color: "var(--ink)", fontFamily: "var(--font-thai)" };

// ============ 01 · DASHBOARD ============
const DashboardView = () => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
      <div style={{ position: "relative", borderRadius: 18, padding: 24, background: "var(--forest-800)", color: "var(--cream-50)", overflow: "hidden", minHeight: 180 }}>
        <Scene variant="dusk" style={{ position: "absolute", inset: 0, opacity: .35 }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(27,38,32,.85) 0%, rgba(27,38,32,.4) 100%)" }}/>
        <div style={{ position: "relative" }}>
          <div className="thai" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", opacity: .7 }}>รายได้ เดือนนี้</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 48, fontWeight: 500, lineHeight: 1, margin: "10px 0 6px", letterSpacing: "-0.02em" }}>฿ 128,400</div>
          <div className="thai" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 8, opacity: .85 }}>
            <span style={{ color: "var(--clay)" }}>↑ 18.4%</span> vs เดือนที่แล้ว
          </div>
          <svg width="100%" height="40" viewBox="0 0 300 40" style={{ marginTop: 16 }}>
            <path d="M 0 30 L 30 25 L 60 28 L 90 20 L 120 22 L 150 15 L 180 18 L 210 10 L 240 14 L 270 6 L 300 8" fill="none" stroke="var(--clay)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 0 30 L 30 25 L 60 28 L 90 20 L 120 22 L 150 15 L 180 18 L 210 10 L 240 14 L 270 6 L 300 8 L 300 40 L 0 40 Z" fill="var(--clay)" opacity="0.18"/>
          </svg>
        </div>
      </div>
      <StatCard label="การจองทั้งหมด" value="320" sub="+24 สัปดาห์นี้" icon={Icon.calendar} accent="#7C8F6F"/>
      <StatCard label="เช็คอินแล้ว" value="180" sub="56% ของทั้งหมด" icon={Icon.check} accent="#C97B4A"/>
      <StatCard label="ผู้เยี่ยมชมลาน" value="1,320" sub="ค่าเฉลี่ย 4:21 น." icon={Icon.users} accent="#8B9A56"/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 24 }}>
      <Panel title="7 วันที่ผ่านมา" eyebrow="OCCUPANCY · อัตราการจอง" mb={0}
        right={<div style={{ display: "flex", gap: 4, background: "var(--cream-100)", padding: 3, borderRadius: 999 }}>
          {["7D", "30D", "3M", "ปี"].map((t, i) => (
            <button key={t} className="thai" style={{ padding: "6px 12px", borderRadius: 999, fontSize: 11, background: i === 0 ? "var(--paper)" : "transparent", border: "none", color: "var(--ink)", fontWeight: i === 0 ? 500 : 400, cursor: "pointer", boxShadow: i === 0 ? "0 1px 3px rgba(0,0,0,.08)" : "none" }}>{t}</button>
          ))}
        </div>}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 180, padding: "0 4px" }}>
          {[{d:"พ",b:28},{d:"พฤ",b:32},{d:"ศ",b:41},{d:"ส",b:45},{d:"อา",b:43},{d:"จ",b:22},{d:"อ",b:30,today:true}].map((b,i)=>{
            const pct = (b.b/45)*100;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative", width: "100%", height: 150, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", background: "var(--cream-100)", borderRadius: 8 }}/>
                  <div style={{ position: "relative", width: "100%", height: `${pct}%`, background: b.today ? "var(--ember)" : "var(--forest-700)", borderRadius: 8, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8 }}>
                    <span className="thai" style={{ fontSize: 10, color: "var(--cream-50)", fontWeight: 500 }}>{b.b}</span>
                  </div>
                </div>
                <div className="thai" style={{ fontSize: 11, color: b.today ? "var(--ember)" : "var(--sage-500)", fontWeight: b.today ? 600 : 400 }}>{b.d}</div>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title="แขกที่จะเช็คอิน" eyebrow="TONIGHT · คืนนี้" mb={0}
        right={<div className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>5 คน</div>}>
        <div style={{ display: "grid", gap: 12 }}>
          {[{n:"John S.",t:"15:30",te:"ลานริมเขา A2",a:"forest"},{n:"พิมพ์ลภัส",t:"16:00",te:"ลานใต้ต้นสน",a:"dusk"},{n:"Jeff K.",t:"17:45",te:"ลานดูดาว",a:"night"}].map((g,i)=>(
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <Scene variant={g.a} style={{ width: "100%", height: "100%" }}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>{g.n}</div>
                <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{g.te}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 500 }}>{g.t}</div>
                <div className="thai" style={{ fontSize: 10, color: "var(--ember)", marginTop: 2 }}>● รอเช็คอิน</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  </>
);

// ============ 02 · CAMPS ============
const CampsView = () => (
  <>
    <Panel title="พื้นที่แคมป์ของคุณ" eyebrow="CAMP SITES · 4 ลาน"
      right={<div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn--ghost thai"><Icon.map className="icon"/> แผนผังลาน</button>
        <button className="btn btn--primary thai"><Icon.plus className="icon"/> เพิ่มพื้นที่</button>
      </div>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { n: "ลานริมเขา", p: 400, avail: 2, total: 4, scene: "forest", s: "Active", size: "2×2" },
          { n: "ลานใต้ต้นสน", p: 480, avail: 5, total: 8, scene: "meadow", s: "Active", size: "3×3" },
          { n: "ลานริมลำธาร", p: 380, avail: 3, total: 6, scene: "lake", s: "Active", size: "2×2" },
          { n: "ลานดูดาว", p: 550, avail: 0, total: 3, scene: "night", s: "Full", size: "4×4" },
        ].map((c, i) => (
          <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 140 }}>
              <Scene variant={c.scene} style={{ position: "absolute", inset: 0 }}/>
              <div style={{ position: "absolute", top: 10, left: 10 }}><StatusPill status={c.s}/></div>
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <span className="badge thai" style={{ background: "rgba(247,242,231,.95)", fontSize: 10 }}>{c.size} ม.</span>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div className="thai" style={{ fontSize: 14, fontWeight: 500 }}>{c.n}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 500 }}>฿ {c.p}<span className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginLeft: 4, fontFamily: "var(--font-thai)" }}>/คืน</span></div>
                <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)" }}>ว่าง {c.avail}/{c.total}</div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <button className="btn btn--ghost thai" style={{ flex: 1, padding: "7px 10px", fontSize: 12 }}>Edit</button>
                <button className="thai" style={{ padding: "7px 10px", fontSize: 12, background: "transparent", border: "1px solid var(--line)", borderRadius: 999, color: "var(--ember-dark)", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>

    <Panel title="ปฏิทินความพร้อมให้บริการ" eyebrow="AVAILABILITY · เมษายน 2569"
      right={<div style={{ display: "flex", gap: 6 }}>
        <button style={actionBtn}><Icon.chevronL style={{ width: 12, height: 12 }}/></button>
        <button style={actionBtn}><Icon.chevronR style={{ width: 12, height: 12 }}/></button>
      </div>}>
      <div style={{ display: "grid", gridTemplateColumns: "180px repeat(14, 1fr)", gap: 2, fontFamily: "var(--font-thai)", fontSize: 11 }}>
        <div/>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ textAlign: "center", padding: 6, color: (i===2||i===3) ? "var(--ember)" : "var(--sage-500)" }}>
            <div style={{ fontWeight: 500 }}>{22+i}</div>
            <div style={{ fontSize: 9, opacity: .6 }}>{["พ","พฤ","ศ","ส","อา","จ","อ","พ","พฤ","ศ","ส","อา","จ","อ"][i]}</div>
          </div>
        ))}
        {["ลานริมเขา", "ลานใต้ต้นสน", "ลานริมลำธาร", "ลานดูดาว"].map((row, r) => (
          <React.Fragment key={r}>
            <div style={{ padding: "10px 12px", borderRight: "1px solid var(--line)" }}>{row}</div>
            {Array.from({ length: 14 }).map((_, c) => {
              const rand = (r*13 + c*7) % 5;
              const colors = ["#C7D1B8", "#C7D1B8", "#F3DCB2", "#F3C5A8", "#2F4034"];
              return <div key={c} style={{ background: colors[rand], borderRadius: 4, height: 32 }}/>;
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 11, color: "var(--sage-500)", fontFamily: "var(--font-thai)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, background: "#C7D1B8", borderRadius: 3 }}/>ว่าง</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, background: "#F3DCB2", borderRadius: 3 }}/>บางส่วน</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, background: "#F3C5A8", borderRadius: 3 }}/>ใกล้เต็ม</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, background: "#2F4034", borderRadius: 3 }}/>เต็ม</span>
      </div>
    </Panel>
  </>
);

// ============ 03 · BOOKINGS ============
const BookingsView = () => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
      <StatCard label="รอชำระ" value="12" sub="รวม ฿ 8,400" icon={Icon.calendar} accent="#C97B4A"/>
      <StatCard label="ยืนยันแล้ว" value="148" sub="สัปดาห์นี้" icon={Icon.check} accent="#7C8F6F"/>
      <StatCard label="เช็คอินวันนี้" value="5" sub="3 รอดำเนินการ" icon={Icon.tent} accent="#8B9A56"/>
      <StatCard label="ยกเลิก" value="7" sub="2% ของทั้งหมด" icon={Icon.minus} accent="#A96438"/>
    </div>
    <Panel title="การจองล่าสุด" eyebrow="ALL BOOKINGS · 320 รายการ"
      right={<div style={{ display: "flex", gap: 6 }}>
        {["ทั้งหมด", "รอชำระ", "ยืนยันแล้ว", "เช็คอิน", "ยกเลิก"].map((t, i) => (
          <button key={t} className="thai" style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12, background: i === 0 ? "var(--forest-800)" : "var(--paper)", color: i === 0 ? "var(--cream-50)" : "var(--ink)", border: "1px solid " + (i === 0 ? "var(--forest-800)" : "var(--line)"), cursor: "pointer" }}>{t}</button>
        ))}
      </div>}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-thai)" }}>
        <thead>
          <tr style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--sage-500)" }}>
            <Th>Booking #</Th><Th>Guest</Th><Th>Phone</Th><Th>ลาน</Th><Th>Check-in</Th><Th>Total</Th><Th>Status</Th><Th align="right">Action</Th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#KT-1042", n: "John S.", p: "095-433-2323", t: "ลานริมเขา A2", d: "24 เม.ย · 2 คืน", to: 800, s: "Paid" },
            { id: "#KT-1041", n: "Jeff K.", p: "092-309-0765", t: "ลานใต้ต้นสน", d: "24 เม.ย · 1 คืน", to: 480, s: "Pending" },
            { id: "#KT-1040", n: "Mike P.", p: "094-543-3543", t: "ลานดูดาว", d: "23 เม.ย · 3 คืน", to: 1650, s: "Cancel" },
            { id: "#KT-1039", n: "Jeds R.", p: "095-433-2543", t: "ลานริมลำธาร", d: "22 เม.ย · 2 คืน", to: 760, s: "Paid" },
            { id: "#KT-1038", n: "พิมพ์ลภัส ก.", p: "081-778-1209", t: "ลานริมเขา A1", d: "22 เม.ย · 2 คืน", to: 800, s: "Paid" },
            { id: "#KT-1037", n: "กฤษณ์ อ.", p: "089-123-4567", t: "ลานใต้ต้นสน", d: "21 เม.ย · 3 คืน", to: 1440, s: "Paid" },
            { id: "#KT-1036", n: "Thanawat V.", p: "083-990-4412", t: "ลานดูดาว", d: "20 เม.ย · 1 คืน", to: 550, s: "Pending" },
          ].map((r, i) => (
            <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
              <Td><span style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>{r.id}</span></Td>
              <Td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden" }}>
                    <Scene variant={["forest","dusk","meadow","lake","night"][i % 5]} style={{ width: "100%", height: "100%" }}/>
                  </div>
                  <span style={{ fontSize: 13 }}>{r.n}</span>
                </div>
              </Td>
              <Td><span style={{ fontSize: 13 }}>{r.p}</span></Td>
              <Td><span style={{ fontSize: 13 }}>{r.t}</span></Td>
              <Td><span style={{ fontSize: 13, color: "#4C5A4E" }}>{r.d}</span></Td>
              <Td><span style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 500 }}>฿ {r.to.toLocaleString()}</span></Td>
              <Td><StatusPill status={r.s}/></Td>
              <Td align="right">
                <div style={{ display: "inline-flex", gap: 4 }}>
                  <button className="thai" style={actionBtn}>Edit</button>
                  <button className="thai" style={{...actionBtn, color: "var(--ember-dark)"}}>Cancel</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  </>
);

// ============ 04 · USERS ============
const UsersView = () => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
      <StatCard label="สมาชิกทั้งหมด" value="4,820" sub="+128 เดือนนี้" icon={Icon.users} accent="#7C8F6F"/>
      <StatCard label="สมาชิกใหม่" value="128" sub="เดือนนี้" icon={Icon.plus} accent="#C97B4A"/>
      <StatCard label="ผู้กลับมาจอง" value="62%" sub="Retention rate" icon={Icon.heart} accent="#8B9A56"/>
      <StatCard label="Superguest" value="14" sub="จอง > 10 ครั้ง" icon={Icon.star} accent="#D9A273"/>
    </div>
    <Panel title="สมาชิกทั้งหมด" eyebrow="USERS · ผู้ใช้งาน"
      right={<div style={{ display: "flex", gap: 6 }}>
        {["ทั้งหมด", "Traveler", "Superguest", "ถูกระงับ"].map((t, i) => (
          <button key={t} className="thai" style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12, background: i === 0 ? "var(--forest-800)" : "var(--paper)", color: i === 0 ? "var(--cream-50)" : "var(--ink)", border: "1px solid " + (i === 0 ? "var(--forest-800)" : "var(--line)"), cursor: "pointer" }}>{t}</button>
        ))}
      </div>}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-thai)" }}>
        <thead>
          <tr style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--sage-500)" }}>
            <Th>User</Th><Th>Level</Th><Th>Trips</Th><Th>Spent</Th><Th>Last active</Th><Th>Status</Th><Th align="right">Action</Th>
          </tr>
        </thead>
        <tbody>
          {[
            { n: "Smith Slayer", e: "smith@example.com", lv: "Lv.1 · Traveler", trips: 3, spent: 2400, last: "2 ชม. ที่แล้ว", s: "Active", a: "forest" },
            { n: "พิมพ์ลภัส กีรติ", e: "pim@kangtent.co", lv: "Lv.4 · Superguest", trips: 18, spent: 24600, last: "วันนี้", s: "Active", a: "dusk" },
            { n: "Jeff Kosanovic", e: "jeff.k@email.com", lv: "Lv.2 · Traveler", trips: 6, spent: 5280, last: "เมื่อวาน", s: "Active", a: "meadow" },
            { n: "Mike Petersen", e: "mikep@gmail.com", lv: "Lv.1 · Traveler", trips: 1, spent: 400, last: "5 วัน", s: "Paused", a: "lake" },
            { n: "สิริพร ชินวงศ์", e: "sirip@line.me", lv: "Lv.3 · Superguest", trips: 11, spent: 14200, last: "1 สัปดาห์", s: "Active", a: "night" },
            { n: "Thanawat V.", e: "thana@outlook.com", lv: "Lv.2 · Traveler", trips: 4, spent: 3200, last: "3 วัน", s: "Active", a: "forest" },
          ].map((u, i) => (
            <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
              <Td>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden" }}>
                    <Scene variant={u.a} style={{ width: "100%", height: "100%" }}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{u.n}</div>
                    <div style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{u.e}</div>
                  </div>
                </div>
              </Td>
              <Td><span className="thai" style={{ fontSize: 12, color: "#4C5A4E" }}>{u.lv}</span></Td>
              <Td><span style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>{u.trips}</span></Td>
              <Td><span style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 500 }}>฿ {u.spent.toLocaleString()}</span></Td>
              <Td><span className="thai" style={{ fontSize: 12, color: "var(--sage-500)" }}>{u.last}</span></Td>
              <Td><StatusPill status={u.s}/></Td>
              <Td align="right"><button className="thai" style={actionBtn}>ดูโปรไฟล์</button></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  </>
);

// ============ 05 · COUPONS ============
const CouponsView = () => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
      <StatCard label="คูปองใช้งานอยู่" value="6" sub="จาก 12 ทั้งหมด" icon={Icon.flame} accent="#C97B4A"/>
      <StatCard label="โค้ดถูกใช้" value="342" sub="เดือนนี้" icon={Icon.check} accent="#7C8F6F"/>
      <StatCard label="ส่วนลดที่มอบ" value="฿ 28,400" sub="ROI 4.8x" icon={Icon.heart} accent="#8B9A56"/>
    </div>
    <Panel title="โปรโมชั่นปัจจุบัน" eyebrow="ACTIVE PROMOS · โปรที่กำลังเปิด"
      right={<button className="btn btn--primary thai"><Icon.plus className="icon"/> สร้างคูปอง</button>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { code: "WELCOME25", desc: "ส่วนลด 25% สมาชิกใหม่", pct: 25, used: 128, cap: 500, s: "Active", scene: "dusk" },
          { code: "RAINY100", desc: "ลด ฿100 คืนฝนตก", pct: null, flat: 100, used: 42, cap: 200, s: "Active", scene: "lake" },
          { code: "FULLMOON", desc: "ฟรีคืนที่ 3 วันพระจันทร์เต็มดวง", pct: null, free: true, used: 18, cap: 50, s: "Active", scene: "night" },
          { code: "SONGKRAN69", desc: "ลด 15% ช่วงสงกรานต์", pct: 15, used: 154, cap: 154, s: "Expired", scene: "meadow" },
          { code: "FAMILY4", desc: "ครอบครัว 4 คนขึ้นไป ลด ฿200", pct: null, flat: 200, used: 0, cap: 100, s: "Draft", scene: "forest" },
          { code: "EARLYBIRD", desc: "จองล่วงหน้า 30 วัน ลด 10%", pct: 10, used: 89, cap: 300, s: "Active", scene: "dusk" },
        ].map((c, i) => (
          <div key={i} style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)" }}>
            <div style={{ position: "relative", height: 90 }}>
              <Scene variant={c.scene} style={{ position: "absolute", inset: 0, opacity: .9 }}/>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(27,38,32,.55), rgba(27,38,32,.2))" }}/>
              <div style={{ position: "absolute", inset: 0, padding: 14, color: "var(--cream-50)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, letterSpacing: ".04em" }}>{c.code}</div>
                  <StatusPill status={c.s}/>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 14, fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 500 }}>
                  {c.pct ? `-${c.pct}%` : c.flat ? `-฿${c.flat}` : "FREE"}
                </div>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div className="thai" style={{ fontSize: 13, color: "#3F4A42", minHeight: 36 }}>{c.desc}</div>
              <div style={{ marginTop: 10, marginBottom: 4, display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--font-thai)", color: "var(--sage-500)" }}>
                <span>ใช้แล้ว {c.used}/{c.cap}</span>
                <span>{Math.round((c.used/c.cap)*100)}%</span>
              </div>
              <div style={{ height: 4, background: "var(--cream-100)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (c.used/c.cap)*100)}%`, height: "100%", background: c.s === "Expired" ? "var(--line-strong)" : "var(--forest-700)" }}/>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <button className="btn btn--ghost thai" style={{ flex: 1, padding: "7px 10px", fontSize: 12 }}>Edit</button>
                <button className="thai" style={{ padding: "7px 12px", fontSize: 12, background: "transparent", border: "1px solid var(--line)", borderRadius: 999, color: "var(--sage-500)", cursor: "pointer" }}>ปิด</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  </>
);

// ============ 06 · SETTINGS ============
const SettingsView = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <Panel title="ข้อมูลเจ้าของลาน" eyebrow="PROFILE · โปรไฟล์">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden" }}>
          <Scene variant="dusk" style={{ width: "100%", height: "100%" }}/>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 500 }}>คุณนพดล ปรีดาชัย</div>
          <div className="thai" style={{ fontSize: 12, color: "var(--sage-500)", marginTop: 4 }}>เจ้าของลาน · เขาใหญ่ แคมป์วิว</div>
          <button className="btn btn--ghost thai" style={{ marginTop: 10, padding: "6px 14px", fontSize: 12 }}>เปลี่ยนรูป</button>
        </div>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        <Field label="ชื่อ-นามสกุล" value="นพดล ปรีดาชัย"/>
        <Field label="อีเมล" value="nopadol@kangtent.co"/>
        <Field label="เบอร์โทรศัพท์" value="089 445 2378"/>
        <Field label="ชื่อลาน" value="เขาใหญ่ แคมป์วิว"/>
      </div>
    </Panel>

    <Panel title="การชำระเงิน" eyebrow="PAYOUTS · การโอนเงิน">
      <div style={{ padding: 16, background: "var(--cream-100)", borderRadius: 12, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--forest-700)", color: "var(--cream-50)", display: "grid", placeItems: "center", fontFamily: "var(--font-serif)", fontSize: 13, fontWeight: 600 }}>KBK</div>
        <div style={{ flex: 1 }}>
          <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>ธนาคารกสิกรไทย</div>
          <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>•••• •••• •••• 4782 · นพดล ป.</div>
        </div>
        <button className="btn btn--ghost thai" style={{ padding: "6px 14px", fontSize: 12 }}>เปลี่ยน</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <Row l="รายได้สะสม" r="฿ 824,000"/>
        <Row l="โอนครั้งล่าสุด" r="18 เม.ย 2569"/>
        <Row l="รอโอน" r="฿ 28,400" ember/>
        <Row l="กำหนดการถัดไป" r="25 เม.ย 2569"/>
      </div>
      <button className="btn btn--primary btn--block thai" style={{ marginTop: 16 }}>โอนทันที</button>
    </Panel>

    <Panel title="การแจ้งเตือน" eyebrow="NOTIFICATIONS · แจ้งเตือน">
      <div style={{ display: "grid", gap: 2 }}>
        {[
          { t: "การจองใหม่", d: "แจ้งทุกครั้งเมื่อมีการจองใหม่", on: true },
          { t: "ยกเลิกการจอง", d: "เมื่อผู้พักยกเลิก", on: true },
          { t: "รีวิวใหม่", d: "เมื่อมีรีวิวจากผู้พัก", on: true },
          { t: "การชำระเงิน", d: "เมื่อเงินถูกโอนเข้าบัญชี", on: false },
          { t: "ข่าวสารจาก Kangtent", d: "โปรโมชั่นและอัปเดต", on: false },
        ].map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--line)" : "none" }}>
            <div style={{ flex: 1 }}>
              <div className="thai" style={{ fontSize: 13, fontWeight: 500 }}>{n.t}</div>
              <div className="thai" style={{ fontSize: 11, color: "var(--sage-500)", marginTop: 2 }}>{n.d}</div>
            </div>
            <Toggle on={n.on}/>
          </div>
        ))}
      </div>
    </Panel>

    <Panel title="ภาษาและสกุลเงิน" eyebrow="PREFERENCES · การตั้งค่า">
      <div style={{ display: "grid", gap: 14 }}>
        <Field label="ภาษา" value="ภาษาไทย · English" select/>
        <Field label="สกุลเงิน" value="฿ THB — บาทไทย" select/>
        <Field label="โซนเวลา" value="(GMT+7) กรุงเทพฯ" select/>
        <Field label="รูปแบบวันที่" value="DD / MM / YYYY" select/>
      </div>
      <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>DANGER ZONE · เขตอันตราย</div>
        <button className="thai" style={{ padding: "10px 18px", borderRadius: 999, background: "transparent", border: "1px solid var(--ember)", color: "var(--ember-dark)", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-thai)" }}>
          ระงับบัญชีเจ้าของลาน
        </button>
      </div>
    </Panel>
  </div>
);

const Field = ({ label, value, select }) => (
  <label>
    <div className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>{label}</div>
    <div style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--line-strong)", fontSize: 14, background: "var(--paper)", fontFamily: "var(--font-thai)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{value}</span>
      {select && <Icon.chevronD style={{ width: 16, height: 16, color: "var(--sage-500)" }}/>}
    </div>
  </label>
);

const Row = ({ l, r, ember }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-thai)", fontSize: 14, color: ember ? "var(--ember-dark)" : "var(--ink)" }}>
    <span>{l}</span><span style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>{r}</span>
  </div>
);

const Toggle = ({ on }) => (
  <div style={{ width: 38, height: 22, borderRadius: 999, background: on ? "var(--forest-700)" : "var(--line-strong)", position: "relative", cursor: "pointer", transition: "background .15s" }}>
    <div style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", transition: "left .15s" }}/>
  </div>
);

// ============ ROOT ============
const Admin = ({ initial = "dashboard" }) => {
  const [section, setSection] = React.useState(initial);
  const meta = {
    dashboard: { t: "สวัสดีตอนเช้า, คุณนพดล ☕", s: "วันพุธ · 22 เมษายน 2569",
      r: <button className="btn btn--primary thai" style={{ padding: "10px 18px" }}><Icon.plus className="icon"/> เพิ่มพื้นที่</button> },
    camps:     { t: "จัดการพื้นที่แคมป์", s: "CAMP SITES · ลานของคุณ" },
    bookings:  { t: "การจองทั้งหมด", s: "BOOKINGS · ปัจจุบันและในอดีต" },
    users:     { t: "จัดการผู้ใช้งาน", s: "USERS · สมาชิก Kangtent" },
    coupons:   { t: "คูปองและโปรโมชั่น", s: "PROMOS · โปรโมชั่น" },
    settings:  { t: "ตั้งค่า", s: "SETTINGS · บัญชีและการชำระเงิน" },
  }[section];
  const views = {
    dashboard: <DashboardView/>, camps: <CampsView/>, bookings: <BookingsView/>,
    users: <UsersView/>, coupons: <CouponsView/>, settings: <SettingsView/>
  };
  return (
    <AdminShell section={section} setSection={setSection} title={meta.t} subtitle={meta.s} right={meta.r}>
      {views[section]}
    </AdminShell>
  );
};

window.Admin = Admin;
