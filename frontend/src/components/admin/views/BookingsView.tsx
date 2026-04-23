import { Scene } from "@/components/common/Scene";
import { StatusPill } from "@/components/common/StatusPill";
import { StatCard } from "@/components/admin/StatCard";
import { Panel } from "@/components/admin/Panel";
import { CalendarIcon, CheckIcon, TentIcon, MinusIcon } from "@/components/common/Icons";

const BOOKINGS = [
  { id: "#KT-1042", n: "John S.", p: "095-433-2323", t: "ลานริมเขา A2", d: "24 เม.ย · 2 คืน", to: 800, s: "Paid" },
  { id: "#KT-1041", n: "Jeff K.", p: "092-309-0765", t: "ลานใต้ต้นสน", d: "24 เม.ย · 1 คืน", to: 480, s: "Pending" },
  { id: "#KT-1040", n: "Mike P.", p: "094-543-3543", t: "ลานดูดาว", d: "23 เม.ย · 3 คืน", to: 1650, s: "Cancel" },
  { id: "#KT-1039", n: "Jeds R.", p: "095-433-2543", t: "ลานริมลำธาร", d: "22 เม.ย · 2 คืน", to: 760, s: "Paid" },
  { id: "#KT-1038", n: "พิมพ์ลภัส ก.", p: "081-778-1209", t: "ลานริมเขา A1", d: "22 เม.ย · 2 คืน", to: 800, s: "Paid" },
  { id: "#KT-1037", n: "กฤษณ์ อ.", p: "089-123-4567", t: "ลานใต้ต้นสน", d: "21 เม.ย · 3 คืน", to: 1440, s: "Paid" },
  { id: "#KT-1036", n: "Thanawat V.", p: "083-990-4412", t: "ลานดูดาว", d: "20 เม.ย · 1 คืน", to: 550, s: "Pending" },
] as const;

const SCENES = ["forest", "dusk", "meadow", "lake", "night"] as const;
const FILTERS = ["ทั้งหมด", "รอชำระ", "ยืนยันแล้ว", "เช็คอิน", "ยกเลิก"];

const actionBtn: React.CSSProperties = {
  padding: "5px 12px",
  fontSize: 11,
  borderRadius: 999,
  background: "var(--cream-100)",
  border: "1px solid var(--line)",
  cursor: "pointer",
  color: "var(--ink)",
  fontFamily: "var(--font-thai)",
};

const Th = ({ children, align }: { children: React.ReactNode; align?: string }) => (
  <th style={{ textAlign: (align as "left" | "right") || "left", padding: "10px 12px", fontWeight: 500 }}>
    {children}
  </th>
);
const Td = ({ children, align }: { children: React.ReactNode; align?: string }) => (
  <td style={{ textAlign: (align as "left" | "right") || "left", padding: "14px 12px", color: "var(--ink)" }}>
    {children}
  </td>
);

export function BookingsView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="รอชำระ" value="12" sub="รวม ฿ 8,400" icon={CalendarIcon} accent="#C97B4A" />
        <StatCard label="ยืนยันแล้ว" value="148" sub="สัปดาห์นี้" icon={CheckIcon} accent="#7C8F6F" />
        <StatCard label="เช็คอินวันนี้" value="5" sub="3 รอดำเนินการ" icon={TentIcon} accent="#8B9A56" />
        <StatCard label="ยกเลิก" value="7" sub="2% ของทั้งหมด" icon={MinusIcon} accent="#A96438" />
      </div>

      <Panel
        title="การจองล่าสุด"
        eyebrow="ALL BOOKINGS · 320 รายการ"
        right={
          <div className="flex gap-1.5">
            {FILTERS.map((t, i) => (
              <button
                key={t}
                className="font-thai rounded-full text-xs cursor-pointer"
                style={{
                  padding: "7px 14px",
                  background: i === 0 ? "#263328" : "var(--paper)",
                  color: i === 0 ? "#F7F2E7" : "var(--ink)",
                  border: `1px solid ${i === 0 ? "#263328" : "var(--line)"}`,
                  fontFamily: "var(--font-thai)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <table
          className="w-full font-thai"
          style={{ borderCollapse: "collapse", fontFamily: "var(--font-thai)" }}
        >
          <thead>
            <tr
              className="text-[11px] tracking-[0.08em] uppercase"
              style={{ color: "#7C8F6F" }}
            >
              <Th>Booking #</Th>
              <Th>Guest</Th>
              <Th>Phone</Th>
              <Th>ลาน</Th>
              <Th>Check-in</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                <Td>
                  <span className="font-serif font-medium">{r.id}</span>
                </Td>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <Scene variant={SCENES[i % 5]} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <span className="text-[13px]">{r.n}</span>
                  </div>
                </Td>
                <Td><span className="text-[13px]">{r.p}</span></Td>
                <Td><span className="text-[13px]">{r.t}</span></Td>
                <Td><span className="text-[13px]" style={{ color: "#4C5A4E" }}>{r.d}</span></Td>
                <Td>
                  <span className="font-serif text-sm font-medium">฿ {r.to.toLocaleString()}</span>
                </Td>
                <Td>
                  <StatusPill status={r.s as "Paid" | "Pending" | "Cancel"} />
                </Td>
                <Td align="right">
                  <div className="inline-flex gap-1">
                    <button style={actionBtn}>Edit</button>
                    <button style={{ ...actionBtn, color: "#A96438" }}>Cancel</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

import React from "react";
