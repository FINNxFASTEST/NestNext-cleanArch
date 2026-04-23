import React from "react";
import { Scene } from "@/components/common/Scene";
import { StatusPill } from "@/components/common/StatusPill";
import { StatCard } from "@/components/admin/StatCard";
import { Panel } from "@/components/admin/Panel";
import { UsersIcon, PlusIcon, HeartIcon, StarIcon } from "@/components/common/Icons";

const USERS = [
  { n: "Smith Slayer", e: "smith@example.com", lv: "Lv.1 · Traveler", trips: 3, spent: 2400, last: "2 ชม. ที่แล้ว", s: "Active", a: "forest" },
  { n: "พิมพ์ลภัส กีรติ", e: "pim@kangtent.co", lv: "Lv.4 · Superguest", trips: 18, spent: 24600, last: "วันนี้", s: "Active", a: "dusk" },
  { n: "Jeff Kosanovic", e: "jeff.k@email.com", lv: "Lv.2 · Traveler", trips: 6, spent: 5280, last: "เมื่อวาน", s: "Active", a: "meadow" },
  { n: "Mike Petersen", e: "mikep@gmail.com", lv: "Lv.1 · Traveler", trips: 1, spent: 400, last: "5 วัน", s: "Paused", a: "lake" },
  { n: "สิริพร ชินวงศ์", e: "sirip@line.me", lv: "Lv.3 · Superguest", trips: 11, spent: 14200, last: "1 สัปดาห์", s: "Active", a: "night" },
  { n: "Thanawat V.", e: "thana@outlook.com", lv: "Lv.2 · Traveler", trips: 4, spent: 3200, last: "3 วัน", s: "Active", a: "forest" },
] as const;

const FILTERS = ["ทั้งหมด", "Traveler", "Superguest", "ถูกระงับ"];

const Th = ({ children, align }: { children: React.ReactNode; align?: string }) => (
  <th className="font-medium" style={{ textAlign: (align as "left" | "right") || "left", padding: "10px 12px" }}>
    {children}
  </th>
);
const Td = ({ children, align }: { children: React.ReactNode; align?: string }) => (
  <td className="text-ink" style={{ textAlign: (align as "left" | "right") || "left", padding: "14px 12px" }}>
    {children}
  </td>
);

export function UsersView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="สมาชิกทั้งหมด" value="4,820" sub="+128 เดือนนี้" icon={UsersIcon} accent="#7C8F6F" />
        <StatCard label="สมาชิกใหม่" value="128" sub="เดือนนี้" icon={PlusIcon} accent="#C97B4A" />
        <StatCard label="ผู้กลับมาจอง" value="62%" sub="Retention rate" icon={HeartIcon} accent="#8B9A56" />
        <StatCard label="Superguest" value="14" sub="จอง > 10 ครั้ง" icon={StarIcon} accent="#D9A273" />
      </div>

      <Panel
        title="สมาชิกทั้งหมด"
        eyebrow="USERS · ผู้ใช้งาน"
        right={
          <div className="flex gap-1.5">
            {FILTERS.map((t, i) => (
              <button
                key={t}
                className="font-thai rounded-full text-xs cursor-pointer px-[14px] py-[7px]"
                style={{
                  background: i === 0 ? "#263328" : "var(--paper)",
                  color: i === 0 ? "#F7F2E7" : "var(--ink)",
                  border: `1px solid ${i === 0 ? "#263328" : "var(--line)"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        }
      >
        <table className="w-full font-thai" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="text-[11px] tracking-[0.08em] uppercase text-sage-500">
              <Th>User</Th>
              <Th>Level</Th>
              <Th>Trips</Th>
              <Th>Spent</Th>
              <Th>Last active</Th>
              <Th>Status</Th>
              <Th align="right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u, i) => (
              <tr key={i} className="border-t border-line">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden">
                      <Scene variant={u.a as "forest" | "dusk" | "meadow" | "lake" | "night"} className="w-full h-full" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium">{u.n}</div>
                      <div className="text-[11px] mt-0.5 text-sage-500">{u.e}</div>
                    </div>
                  </div>
                </Td>
                <Td><span className="font-thai text-xs text-forest-600">{u.lv}</span></Td>
                <Td><span className="font-serif font-medium">{u.trips}</span></Td>
                <Td><span className="font-serif text-sm font-medium">฿ {u.spent.toLocaleString()}</span></Td>
                <Td><span className="font-thai text-xs text-sage-500">{u.last}</span></Td>
                <Td><StatusPill status={u.s as "Active" | "Paused"} /></Td>
                <Td align="right">
                  <button className="font-thai rounded-full text-[11px] cursor-pointer px-3 py-[5px] bg-cream-100 border border-line text-ink">
                    ดูโปรไฟล์
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
