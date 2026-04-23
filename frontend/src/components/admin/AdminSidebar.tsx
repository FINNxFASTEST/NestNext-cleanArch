import { SVGProps } from "react";
import { cn } from "@/lib/utils";
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
    <aside className="relative h-full min-h-screen bg-forest-900 text-cream-50 px-5 py-7">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-7 px-2">
        <KangtentMark bg="#C97B4A" fg="#F7F2E7" />
        <div>
          <div className="font-serif text-lg font-semibold">Kangtent</div>
          <div className="font-thai text-[10px] tracking-[0.08em] uppercase opacity-60">
            Host studio
          </div>
        </div>
      </div>

      {/* Camp info card */}
      <div className="rounded-xl p-3.5 mb-6 bg-cream-50/[0.05] border border-cream-50/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
            <Scene variant="forest" className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-thai text-[13px] font-medium">เขาใหญ่ แคมป์วิว</div>
            <div className="font-thai text-[10px] mt-0.5 opacity-60">Superhost · 9.8 ★</div>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-5">
          <div className="font-thai text-[10px] tracking-[0.14em] uppercase px-2.5 mb-2 opacity-[0.45]">
            {group.label}
          </div>
          {group.items.map(({ id, label, icon: Icon }) => {
            const isActive = section === id;
            return (
              <button
                key={id}
                onClick={() => { setSection(id); onClose?.(); }}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl text-left mb-0.5 cursor-pointer border-0 font-thai text-[13px] transition-colors px-3 py-[10px] text-cream-50",
                  isActive ? "bg-ember font-medium" : "bg-transparent font-normal"
                )}
              >
                <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                {label}
              </button>
            );
          })}
        </div>
      ))}

      {/* Tagline */}
      <div className="absolute bottom-5 left-5 right-5 text-[11px] italic leading-relaxed font-thai opacity-40">
        &ldquo;ทุกคืนใต้ดาว เริ่มจาก ลานเล็ก ๆ ของคุณ&rdquo;
      </div>
    </aside>
  );
}
