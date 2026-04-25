"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { KangtentMark } from "./KangtentMark";
import { useAuth } from "@/contexts/AuthContext";

type NavVariant = "overlay" | "solid";
type NavActive = "home" | "search" | "activities" | "bookings" | "none";

interface NavProps {
  active?: NavActive;
  variant?: NavVariant;
}

const LINKS = [
  { id: "home", label: "หน้าแรก", href: "/" },
  { id: "search", label: "ค้นหาลานกางเต็นท์", href: "/search" },
  { id: "activities", label: "กิจกรรมน่าสนใจ", href: "/activities" },
  { id: "services", label: "บริการ", href: "#" },
  { id: "bookings", label: "การจองของฉัน", href: "/booking" },
];

export function Nav({ active = "home", variant = "overlay" }: NavProps) {
  const isOverlay = variant === "overlay";
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
    setMobileOpen(false);
  }

  const displayName = user?.firstName ?? user?.email?.split("@")[0] ?? "บัญชีของฉัน";

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between px-5 md:px-14 py-[22px] top-0 left-0 right-0 z-10",
          isOverlay
            ? "absolute bg-transparent text-cream-50"
            : "relative bg-paper text-ink border-b border-line"
        )}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-serif text-[22px] no-underline" style={{ color: "inherit" }}>
          <KangtentMark bg={isOverlay ? "#C97B4A" : "#2F4034"} fg="#F7F2E7" />
          <span className="font-medium tracking-[-0.01em]">Kangtent</span>
        </Link>

        {/* Links — desktop only */}
        <div className="hidden lg:flex gap-8 text-sm font-thai">
          {LINKS.map(({ id, label, href }) => (
            <Link
              key={id}
              href={href}
              className="no-underline opacity-[0.92] relative cursor-pointer"
              style={{ color: "inherit" }}
            >
              {label}
              {active === id && (
                <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-ember rounded-[1px]" />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions — desktop only */}
        <div className="hidden lg:flex items-center gap-[18px] text-sm">
          {user ? (
            <>
              <span className="font-thai opacity-90">สวัสดี, {displayName}</span>
              <button
                onClick={handleLogout}
                className="font-thai font-medium text-sm px-5 py-[10px] rounded-full cursor-pointer transition-colors bg-ember text-cream-50 border-0"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-thai no-underline opacity-90 cursor-pointer" style={{ color: "inherit" }}>
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="font-thai font-medium text-sm px-5 py-[10px] rounded-full cursor-pointer transition-colors bg-ember text-cream-50 no-underline"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={cn(
            "lg:hidden w-10 h-10 rounded-full grid place-items-center cursor-pointer",
            isOverlay
              ? "bg-cream-50/15 border border-cream-50/25"
              : "bg-transparent border border-line-strong"
          )}
          onClick={() => setMobileOpen(true)}
          aria-label="เปิดเมนู"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <rect y="0" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="13" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-paper text-ink">
          <div className="flex items-center justify-between px-5 py-[22px] border-b border-line">
            <div className="flex items-center gap-2.5 font-serif text-[22px]">
              <KangtentMark bg="#2F4034" fg="#F7F2E7" />
              <span className="font-medium tracking-[-0.01em]">Kangtent</span>
            </div>
            <button
              className="w-10 h-10 rounded-full grid place-items-center cursor-pointer border border-line bg-transparent text-ink"
              onClick={() => setMobileOpen(false)}
              aria-label="ปิดเมนู"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {LINKS.map(({ id, label, href }) => (
              <Link
                key={id}
                href={href}
                className={cn(
                  "flex items-center font-thai text-base px-5 py-4 cursor-pointer border-b border-line no-underline",
                  active === id ? "text-ember" : "text-ink"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="px-5 pb-10 pt-5 flex flex-col gap-3">
            {user ? (
              <>
                <span className="font-thai text-center py-3 text-ink">สวัสดี, {displayName}</span>
                <button
                  onClick={handleLogout}
                  className="w-full font-thai font-medium text-[15px] py-4 rounded-full border-0 cursor-pointer bg-ember text-cream-50"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-thai text-center py-3 cursor-pointer text-ink no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="w-full font-thai font-medium text-[15px] py-4 rounded-full text-center bg-ember text-cream-50 no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
