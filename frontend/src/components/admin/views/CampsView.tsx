import { Scene, SceneVariant } from "@/components/common/Scene";
import { StatusPill } from "@/components/common/StatusPill";
import { Panel } from "@/components/admin/Panel";
import { MapIcon, PlusIcon, ChevronLIcon, ChevronRIcon } from "@/components/common/Icons";

const CAMPS = [
  { n: "ลานริมเขา", p: 400, avail: 2, total: 4, scene: "forest", s: "Active", size: "2×2" },
  { n: "ลานใต้ต้นสน", p: 480, avail: 5, total: 8, scene: "meadow", s: "Active", size: "3×3" },
  { n: "ลานริมลำธาร", p: 380, avail: 3, total: 6, scene: "lake", s: "Active", size: "2×2" },
  { n: "ลานดูดาว", p: 550, avail: 0, total: 3, scene: "night", s: "Full", size: "4×4" },
] as const;

const ROWS = ["ลานริมเขา", "ลานใต้ต้นสน", "ลานริมลำธาร", "ลานดูดาว"];
const DAYS = ["พ","พฤ","ศ","ส","อา","จ","อ","พ","พฤ","ศ","ส","อา","จ","อ"];
const CAL_COLORS = ["#C7D1B8", "#C7D1B8", "#F3DCB2", "#F3C5A8", "#2F4034"];

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

export function CampsView() {
  return (
    <>
      <Panel
        title="พื้นที่แคมป์ของคุณ"
        eyebrow="CAMP SITES · 4 ลาน"
        right={
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-2 font-thai text-sm px-[22px] py-3 rounded-full cursor-pointer"
              style={{ background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
            >
              <MapIcon style={{ width: 16, height: 16 }} /> แผนผังลาน
            </button>
            <button
              className="inline-flex items-center gap-2 font-thai text-sm px-[22px] py-3 rounded-full border-0 cursor-pointer"
              style={{ background: "#C97B4A", color: "#F7F2E7" }}
            >
              <PlusIcon style={{ width: 16, height: 16 }} /> เพิ่มพื้นที่
            </button>
          </div>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {CAMPS.map((c, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--line)" }}
            >
              <div className="relative" style={{ height: 140 }}>
                <Scene variant={c.scene as SceneVariant} style={{ position: "absolute", inset: 0 }} />
                <div className="absolute top-2.5 left-2.5">
                  <StatusPill status={c.s as "Active" | "Full"} />
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-thai"
                    style={{ background: "rgba(247,242,231,.95)", color: "#1B2620" }}
                  >
                    {c.size} ม.
                  </span>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div className="font-thai text-sm font-medium">{c.n}</div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="font-serif text-[17px] font-medium">฿ {c.p}</span>
                    <span className="font-thai text-[11px] ml-1" style={{ color: "#7C8F6F" }}>/คืน</span>
                  </div>
                  <div className="font-thai text-[11px]" style={{ color: "#7C8F6F" }}>
                    ว่าง {c.avail}/{c.total}
                  </div>
                </div>
                <div className="flex gap-1.5 mt-3">
                  <button
                    className="flex-1 font-thai text-xs py-[7px] px-2.5 rounded-full cursor-pointer"
                    style={{ background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)" }}
                  >
                    Edit
                  </button>
                  <button
                    className="font-thai text-xs py-[7px] px-2.5 rounded-full cursor-pointer"
                    style={{ background: "transparent", border: "1px solid var(--line)", color: "#A96438" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="ปฏิทินความพร้อมให้บริการ"
        eyebrow="AVAILABILITY · เมษายน 2569"
        right={
          <div className="flex gap-1.5">
            <button style={actionBtn}><ChevronLIcon style={{ width: 12, height: 12 }} /></button>
            <button style={actionBtn}><ChevronRIcon style={{ width: 12, height: 12 }} /></button>
          </div>
        }
      >
        <div
          className="font-thai text-[11px]"
          style={{ display: "grid", gridTemplateColumns: "180px repeat(14, 1fr)", gap: 2 }}
        >
          <div />
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="text-center p-1.5"
              style={{ color: i === 2 || i === 3 ? "#C97B4A" : "#7C8F6F" }}
            >
              <div className="font-medium">{22 + i}</div>
              <div className="text-[9px] opacity-60">{DAYS[i]}</div>
            </div>
          ))}
          {ROWS.map((row, r) => (
            <React.Fragment key={r}>
              <div
                className="py-2.5 px-3 font-thai text-[11px]"
                style={{ borderRight: "1px solid var(--line)", color: "var(--ink)" }}
              >
                {row}
              </div>
              {Array.from({ length: 14 }).map((_, c) => {
                const rand = (r * 13 + c * 7) % 5;
                return (
                  <div
                    key={c}
                    className="rounded-[4px]"
                    style={{ background: CAL_COLORS[rand], height: 32 }}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="flex gap-5 mt-4 font-thai text-[11px]" style={{ color: "#7C8F6F" }}>
          {[
            { color: "#C7D1B8", label: "ว่าง" },
            { color: "#F3DCB2", label: "บางส่วน" },
            { color: "#F3C5A8", label: "ใกล้เต็ม" },
            { color: "#2F4034", label: "เต็ม" },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span style={{ width: 12, height: 12, background: color, borderRadius: 3, display: "inline-block" }} />
              {label}
            </span>
          ))}
        </div>
      </Panel>
    </>
  );
}

import React from "react";
