"use client";

import { useState } from "react";
import Link from "next/link";
import { KangtentMark } from "./KangtentMark";

type NavVariant = "overlay" | "solid";
type NavActive = "home" | "search" | "bookings" | "none";

interface NavProps {
  active?: NavActive;
  variant?: NavVariant;
}

const LINKS = [
  { id: "home", label: "หน้าแรก", href: "/" },
  { id: "search", label: "ค้นหาลานกางเต็นท์", href: "/campsites/1" },
  { id: "activities", label: "กิจกรรมน่าสนใจ", href: "#" },
  { id: "services", label: "บริการ", href: "#" },
  { id: "bookings", label: "การจองของฉัน", href: "/booking" },
];

export function Nav({ active = "home", variant = "overlay" }: NavProps) {
  const isOverlay = variant === "overlay";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="flex items-center justify-between px-5 md:px-14 py-[22px]"
        style={{
          position: isOverlay ? "absolute" : "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          color: isOverlay ? "var(--cream-50)" : "var(--ink)",
          borderBottom: isOverlay ? "none" : "1px solid var(--line)",
          background: isOverlay ? "transparent" : "var(--paper)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 font-serif text-[22px]">
          <KangtentMark
            bg={isOverlay ? "#C97B4A" : "#2F4034"}
            fg="#F7F2E7"
          />
          <span style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
            Kangtent
          </span>
        </div>

        {/* Links — desktop only */}
        <div className="hidden lg:flex gap-8 text-sm font-thai">
          {LINKS.map(({ id, label, href }) => (
            <Link
              key={id}
              href={href}
              style={{
                color: "inherit",
                textDecoration: "none",
                opacity: 0.92,
                position: "relative",
                cursor: "pointer",
              }}
            >
              {label}
              {active === id && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -8,
                    height: 2,
                    background: "#C97B4A",
                    borderRadius: 1,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions — desktop only */}
        <div className="hidden lg:flex items-center gap-[18px] text-sm">
          <Link
            href="/login"
            style={{ color: "inherit", opacity: 0.9, cursor: "pointer", fontFamily: "var(--font-thai)" }}
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/register"
            className="font-thai font-medium text-sm px-5 py-[10px] rounded-full cursor-pointer transition-colors"
            style={{
              background: "#C97B4A",
              color: "#F7F2E7",
              border: "none",
              textDecoration: "none",
            }}
          >
            สมัครสมาชิก
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden w-10 h-10 rounded-full grid place-items-center cursor-pointer"
          style={{
            background: isOverlay ? "rgba(247,242,231,0.15)" : "transparent",
            border: `1px solid ${isOverlay ? "rgba(247,242,231,0.25)" : "var(--line-strong)"}`,
            color: "inherit",
          }}
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
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "var(--paper)", color: "var(--ink)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-[22px]"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <div className="flex items-center gap-2.5 font-serif text-[22px]">
              <KangtentMark bg="#2F4034" fg="#F7F2E7" />
              <span style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>Kangtent</span>
            </div>
            <button
              className="w-10 h-10 rounded-full grid place-items-center cursor-pointer"
              style={{ border: "1px solid var(--line)", background: "transparent", color: "var(--ink)" }}
              onClick={() => setMobileOpen(false)}
              aria-label="ปิดเมนู"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto">
            {LINKS.map(({ id, label, href }) => (
              <Link
                key={id}
                href={href}
                className="flex items-center font-thai text-base px-5 py-4 cursor-pointer"
                style={{
                  borderBottom: "1px solid var(--line)",
                  color: active === id ? "#C97B4A" : "var(--ink)",
                  textDecoration: "none",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth actions */}
          <div className="px-5 pb-10 pt-5 flex flex-col gap-3">
            <Link
              href="/login"
              className="font-thai text-center py-3 cursor-pointer"
              style={{ color: "var(--ink)" }}
              onClick={() => setMobileOpen(false)}
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/register"
              className="w-full font-thai font-medium text-[15px] py-4 rounded-full border-0 cursor-pointer"
              style={{ background: "#C97B4A", color: "#F7F2E7" }}
              onClick={() => setMobileOpen(false)}
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
