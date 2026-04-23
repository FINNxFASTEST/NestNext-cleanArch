"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardView } from "@/components/admin/views/DashboardView";
import { CampsView } from "@/components/admin/views/CampsView";
import { BookingsView } from "@/components/admin/views/BookingsView";
import { UsersView } from "@/components/admin/views/UsersView";
import { CouponsView } from "@/components/admin/views/CouponsView";
import { SettingsView } from "@/components/admin/views/SettingsView";
import { Input } from "@/components/ui/input";
import { SearchIcon, FlameIcon, PlusIcon } from "@/components/common/Icons";

type SectionId = "dashboard" | "camps" | "bookings" | "users" | "coupons" | "settings";

const META: Record<SectionId, { title: string; subtitle: string; showAddBtn?: boolean }> = {
  dashboard: { title: "สวัสดีตอนเช้า, คุณนพดล ☕", subtitle: "วันพุธ · 22 เมษายน 2569", showAddBtn: true },
  camps:     { title: "จัดการพื้นที่แคมป์",  subtitle: "CAMP SITES · ลานของคุณ" },
  bookings:  { title: "การจองทั้งหมด",        subtitle: "BOOKINGS · ปัจจุบันและในอดีต" },
  users:     { title: "จัดการผู้ใช้งาน",       subtitle: "USERS · สมาชิก Kangtent" },
  coupons:   { title: "คูปองและโปรโมชั่น",     subtitle: "PROMOS · โปรโมชั่น" },
  settings:  { title: "ตั้งค่า",              subtitle: "SETTINGS · บัญชีและการชำระเงิน" },
};

const VIEWS: Record<SectionId, React.ReactNode> = {
  dashboard: <DashboardView />,
  camps:     <CampsView />,
  bookings:  <BookingsView />,
  users:     <UsersView />,
  coupons:   <CouponsView />,
  settings:  <SettingsView />,
};

export default function AdminPage() {
  const [section, setSection] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const meta = META[section];

  function handleSetSection(id: SectionId) {
    setSection(id);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" onClick={() => setSidebarOpen(false)}>
          <div className="w-[280px] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <AdminSidebar section={section} setSection={handleSetSection} onClose={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-1 bg-black/40" />
        </div>
      )}

      {/* Desktop layout */}
      <div className="md:grid md:min-h-screen" style={{ gridTemplateColumns: "260px 1fr" }}>
        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
          <AdminSidebar section={section} setSection={setSection} />
        </div>

        {/* Main content */}
        <main className="overflow-hidden min-w-0" style={{ padding: "28px 20px 60px" }}>
          {/* Page header */}
          <div className="flex justify-between items-start md:items-center gap-3 mb-7">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden w-9 h-9 rounded-xl grid place-items-center cursor-pointer shrink-0 bg-paper border border-line text-ink"
                onClick={() => setSidebarOpen(true)}
                aria-label="เปิดเมนู"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <rect y="0" width="16" height="2" rx="1" fill="currentColor" />
                  <rect y="5" width="11" height="2" rx="1" fill="currentColor" />
                  <rect y="10" width="16" height="2" rx="1" fill="currentColor" />
                </svg>
              </button>
              <div className="min-w-0">
                <div className="font-thai text-xs truncate text-sage-500">{meta.subtitle}</div>
                <h1
                  className="font-serif m-0 mt-1 truncate font-medium"
                  style={{ fontSize: "clamp(20px, 3vw, 32px)", letterSpacing: "-0.02em" }}
                >
                  {meta.title}
                </h1>
              </div>
            </div>

            <div className="flex gap-2 items-center shrink-0">
              {/* Search — hidden on small mobile */}
              <div className="relative hidden sm:block">
                <Input
                  placeholder="ค้นหา..."
                  className="font-thai rounded-full text-[13px] pl-[38px] pr-4 py-2.5 border-line bg-paper text-ink h-auto w-[200px]"
                />
                <SearchIcon
                  className="absolute left-3 top-[11px] text-sage-500"
                  style={{ width: 16, height: 16 }}
                />
              </div>
              {/* Notification bell */}
              <button className="relative w-10 h-10 rounded-full grid place-items-center cursor-pointer bg-paper border border-line">
                <FlameIcon style={{ width: 18, height: 18 }} className="text-forest-700" />
                <span
                  className="absolute rounded-full bg-ember border-2 border-paper"
                  style={{ top: 8, right: 9, width: 8, height: 8 }}
                />
              </button>
              {/* Add button (dashboard only) */}
              {meta.showAddBtn && (
                <button className="inline-flex items-center gap-2 font-thai text-sm px-[18px] py-2.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50">
                  <PlusIcon style={{ width: 16, height: 16 }} />
                  <span className="hidden sm:inline">เพิ่มพื้นที่</span>
                </button>
              )}
            </div>
          </div>

          {/* View content */}
          {VIEWS[section]}
        </main>
      </div>
    </div>
  );
}
