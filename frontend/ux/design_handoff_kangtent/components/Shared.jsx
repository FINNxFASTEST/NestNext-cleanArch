/* global React */

// Lightweight stroke icons — mix of line weights matching the cozy editorial feel
const Icon = {
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9.5" cy="7" r="3.5"/><path d="M21 20v-1a4 4 0 0 0-3-3.87"/><path d="M16.5 3.5a3.5 3.5 0 0 1 0 7"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17l-6.1 3.3 1.5-6.7L2.3 9l6.8-.7L12 2Z"/></svg>,
  starLine: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="m12 3 2.6 5.6 6.2.7-4.6 4.2 1.3 6.1L12 16.5 6.5 19.6l1.3-6.1L3.2 9.3l6.2-.7L12 3Z"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.8 6.6a5 5 0 0 0-7-.2L12 8l-1.8-1.6a5 5 0 1 0-7 7.2l.3.3L12 22l8.5-8.1.3-.3a5 5 0 0 0 0-7Z"/></svg>,
  chevronL: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6"/></svg>,
  chevronR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6"/></svg>,
  chevronD: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>,
  flame: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-3-6.5 0 1.5-1 2-2 2 0-2 1-4-2-7-1 2-3 4-3 7 0 2-2 2-2 0-1 1-2 3-2 4.5a7 7 0 0 0 7 7Z"/></svg>,
  droplet: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12Z"/></svg>,
  bolt: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>,
  wifi: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 15.8a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/><path d="M2 9a15 15 0 0 1 20 0"/></svg>,
  shower: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4"/><path d="M6 9h12l-2 4H8l-2-4Z"/><path d="M9 16v2M12 15v3M15 16v2"/></svg>,
  car: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 13 7 8h10l2 5"/><rect x="3" y="13" width="18" height="5" rx="1.5"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>,
  tent: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 20 12 4l9 16"/><path d="M12 4v16"/><path d="M8 20l4-6 4 6"/></svg>,
  leaf: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 4C10 4 4 10 4 18c0 1 .2 2 .5 2.5C5 21 11 21 15 17s5-9 5-13Z"/><path d="M4 20c4-5 8-8 14-12"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5 10 18 20 6"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  share: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></svg>,
  map: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z"/><path d="M9 4v16M15 6v16"/></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  quote: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M7 7h4v4H9c0 3 0 4 2 4v2c-3 0-4-2-4-6V7Zm9 0h4v4h-2c0 3 0 4 2 4v2c-3 0-4-2-4-6V7Z"/></svg>,
  cup: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 8h14v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M18 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c.5 1 .5 2 0 3M12 3c.5 1 .5 2 0 3"/></svg>,
  dog: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12c-1-2-1-5 1-6 1 0 2 1 2 2h8c0-1 1-2 2-2 2 1 2 4 1 6l-1 2v5H6v-5l-1-2Z"/><circle cx="10" cy="13" r="0.6" fill="currentColor"/><circle cx="14" cy="13" r="0.6" fill="currentColor"/></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/></svg>,
};

window.Icon = Icon;

// Stars component
const Stars = ({ value = 5, size = 12 }) => (
  <span className="stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Icon.star key={i} style={{ width: size, height: size, opacity: i < value ? 1 : 0.25 }} />
    ))}
  </span>
);
window.Stars = Stars;

// A small Kangtent logo mark
const KangtentMark = ({ size = 34, bg = "var(--ember)", fg = "var(--cream-50)" }) => (
  <span className="brand-mark" style={{ width: size, height: size, background: bg, color: fg }}>
    <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20 12 4l9 16"/><path d="M12 4v16"/><path d="M8 20l4-6 4 6"/>
    </svg>
  </span>
);
window.KangtentMark = KangtentMark;

// Navigation component, used across screens
const Nav = ({ active = "home", variant = "overlay" }) => {
  const isOverlay = variant === "overlay";
  return (
    <nav className={`nav ${isOverlay ? "" : "nav--solid"}`}>
      <div className="brand thai">
        <KangtentMark bg={isOverlay ? "var(--ember)" : "var(--forest-700)"} />
        <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>Kangtent</span>
      </div>
      <div className="nav-links thai">
        <a className={active === "home" ? "active" : ""}>หน้าแรก</a>
        <a className={active === "search" ? "active" : ""}>ค้นหาลานกางเต็นท์</a>
        <a>กิจกรรมน่าสนใจ</a>
        <a>บริการ</a>
        <a className={active === "bookings" ? "active" : ""}>การจองของฉัน</a>
      </div>
      <div className="nav-right">
        <a style={{ color: "inherit", opacity: .9, cursor: "pointer", fontFamily: "var(--font-thai)" }}>เข้าสู่ระบบ</a>
        <button className="nav-btn thai">สมัครสมาชิก</button>
      </div>
    </nav>
  );
};
window.Nav = Nav;

// Footer
const Footer = () => (
  <footer style={{ background: "var(--forest-900)", color: "var(--cream-50)", padding: "64px 56px 32px", fontFamily: "var(--font-thai)" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(247,242,231,.12)" }}>
      <div>
        <div className="brand thai" style={{ color: "var(--cream-50)", marginBottom: 16 }}>
          <KangtentMark bg="var(--ember)" />
          <span className="serif" style={{ fontSize: 24 }}>Kangtent</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, opacity: .7, maxWidth: 320, margin: 0 }}>
          จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก ค้นหาแคมป์ในฝัน จองล่วงหน้าพร้อมดูรีวิว สะดวก ปลอดภัย
        </p>
      </div>
      {[
        { t: "สำรวจ", items: ["ค้นหาลานกางเต็นท์", "กิจกรรม", "จุดหมายยอดนิยม", "บทความท่องเที่ยว"] },
        { t: "บริการ", items: ["ช่วยเหลือ", "คำถามที่พบบ่อย", "ติดต่อเรา", "ลงทะเบียนเจ้าของลาน"] },
        { t: "บริษัท", items: ["เกี่ยวกับ Kangtent", "เงื่อนไขการใช้งาน", "นโยบายความเป็นส่วนตัว", "ร่วมงานกับเรา"] },
      ].map((g, i) => (
        <div key={i}>
          <div style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", opacity: .5, marginBottom: 16 }}>{g.t}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, fontSize: 14, opacity: .85 }}>
            {g.items.map((x, j) => <li key={j} style={{ cursor: "pointer" }}>{x}</li>)}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, fontSize: 13, opacity: .55 }}>
      <span>© 2026 Kangtent — Made with care, under the open sky.</span>
      <span>ภาษาไทย · THB</span>
    </div>
  </footer>
);
window.Footer = Footer;
