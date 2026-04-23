import { KangtentMark } from "./KangtentMark";

const FOOTER_LINKS = [
  {
    title: "สำรวจ",
    items: ["ค้นหาลานกางเต็นท์", "กิจกรรม", "จุดหมายยอดนิยม", "บทความท่องเที่ยว"],
  },
  {
    title: "บริการ",
    items: ["ช่วยเหลือ", "คำถามที่พบบ่อย", "ติดต่อเรา", "ลงทะเบียนเจ้าของลาน"],
  },
  {
    title: "บริษัท",
    items: [
      "เกี่ยวกับ Kangtent",
      "เงื่อนไขการใช้งาน",
      "นโยบายความเป็นส่วนตัว",
      "ร่วมงานกับเรา",
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="px-4 md:px-14 pt-16 pb-8 font-thai"
      style={{ background: "#1B2620", color: "#F7F2E7" }}
    >
      <div
        className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-10"
        style={{ borderBottom: "1px solid rgba(247,242,231,0.12)" }}
      >
        {/* Brand — full width on mobile */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4" style={{ color: "#F7F2E7" }}>
            <KangtentMark bg="#C97B4A" fg="#F7F2E7" size={36} />
            <span className="font-serif text-2xl">Kangtent</span>
          </div>
          <p className="text-sm leading-7 max-w-xs m-0" style={{ opacity: 0.7 }}>
            จองลานกางเต็นท์ทั่วไทยง่ายๆ ในไม่กี่คลิก ค้นหาแคมป์ในฝัน จองล่วงหน้าพร้อมดูรีวิว สะดวก ปลอดภัย
          </p>
        </div>

        {/* Link groups */}
        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <div
              className="text-[13px] tracking-widest uppercase mb-4"
              style={{ opacity: 0.5 }}
            >
              {group.title}
            </div>
            <ul className="list-none p-0 m-0 grid gap-2.5 text-sm" style={{ opacity: 0.85 }}>
              {group.items.map((item) => (
                <li key={item} className="cursor-pointer hover:opacity-100">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row justify-between gap-2 pt-6 text-sm"
        style={{ opacity: 0.55 }}
      >
        <span>© 2026 Kangtent — Made with care, under the open sky.</span>
        <span>ภาษาไทย · THB</span>
      </div>
    </footer>
  );
}
