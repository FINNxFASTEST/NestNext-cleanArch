import { SVGProps } from "react";
import { KangtentMark } from "@/components/common/KangtentMark";
import { Scene } from "@/components/common/Scene";
import {
  BoltIcon, TentIcon, CalendarIcon, UsersIcon,
  FlameIcon, LeafIcon,
} from "@/components/common/Icons";

type SectionId = "dashboard" | "camps" | "bookings" | "users" | "coupons" | "settings";

interface AdminSidebarProps {
  section: SectionId;
  setSection: (id: SectionId) => void;
  onClose?: () => void;
}

interface NavItem {
  id: SectionId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  { label: "ภาพรวม", items: [{ id: "dashboard", label: "แดชบอร์ด", icon: BoltIcon }] },
  {
    label: "การจัดการ",
    items: [
      { id: "camps", label: "จัดการพื้นที่แคมป์", icon: TentIcon },
      { id: "bookings", label: "ดูการจองทั้งหมด", icon: CalendarIcon },
      { id: "users", label: "จัดการผู้ใช้งาน", icon: UsersIcon },
      { id: "coupons", label: "คูปองและโปรโมชั่น", icon: FlameIcon },
    ],
  },
  { label: "อื่น ๆ", items: [{ id: "settings", label: "ตั้งค่า", icon: LeafIcon }] },
];

export function AdminSidebar({ section, setSection, onClose }: AdminSidebarProps) {
  return (
    <aside
      className="relative h-full min-h-screen"
      style={{ background: "#1B2620", color: "#F7F2E7", padding: "28px 20px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-7 px-2">
        <KangtentMark bg="#C97B4A" fg="#F7F2E7" />
        <div>
          <div className="font-serif text-lg font-semibold">Kangtent</div>
          <div
            className="font-thai text-[10px] tracking-[0.08em] uppercase"
            style={{ opacity: 0.6 }}
          >
            Host studio
          </div>
        </div>
      </div>

      {/* Camp info card */}
      <div
        className="rounded-xl p-3.5 mb-6"
        style={{
          background: "rgba(247,242,231,0.05)",
          border: "1px solid rgba(247,242,231,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <Scene variant="forest" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-thai text-[13px] font-medium">เขาใหญ่ แคมป์วิว</div>
            <div
              className="font-thai text-[10px] mt-0.5"
              style={{ opacity: 0.6 }}
            >
              Superhost · 9.8 ★
            </div>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-5">
          <div
            className="font-thai text-[10px] tracking-[0.14em] uppercase px-2.5 mb-2"
            style={{ opacity: 0.45 }}
          >
            {group.label}
          </div>
          {group.items.map(({ id, label, icon: Icon }) => {
            const isActive = section === id;
            return (
              <button
                key={id}
                onClick={() => { setSection(id); onClose?.(); }}
                className="flex items-center gap-3 w-full rounded-xl text-left mb-0.5 cursor-pointer border-0 font-thai text-[13px] transition-colors"
                style={{
                  padding: "10px 12px",
                  background: isActive ? "#C97B4A" : "transparent",
                  color: "#F7F2E7",
                  fontWeight: isActive ? 500 : 400,
                  fontFamily: "var(--font-thai)",
                }}
              >
                <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                {label}
              </button>
            );
          })}
        </div>
      ))}

      {/* Tagline */}
      <div
        className="absolute bottom-5 left-5 right-5 text-[11px] italic leading-relaxed font-thai"
        style={{ opacity: 0.4 }}
      >
        &ldquo;ทุกคืนใต้ดาว เริ่มจาก ลานเล็ก ๆ ของคุณ&rdquo;
      </div>
    </aside>
  );
}
