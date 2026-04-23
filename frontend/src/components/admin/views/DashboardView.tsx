import { Scene } from "@/components/common/Scene";
import { StatCard } from "@/components/admin/StatCard";
import { Panel } from "@/components/admin/Panel";
import { CalendarIcon, CheckIcon, UsersIcon } from "@/components/common/Icons";

const BARS = [
  { d: "พ", b: 28 }, { d: "พฤ", b: 32 }, { d: "ศ", b: 41 },
  { d: "ส", b: 45 }, { d: "อา", b: 43 }, { d: "จ", b: 22 },
  { d: "อ", b: 30, today: true },
];

const CHECKINS = [
  { n: "John S.", t: "15:30", te: "ลานริมเขา A2", a: "forest" },
  { n: "พิมพ์ลภัส", t: "16:00", te: "ลานใต้ต้นสน", a: "dusk" },
  { n: "Jeff K.", t: "17:45", te: "ลานดูดาว", a: "night" },
] as const;

const TIME_FILTERS = ["7D", "30D", "3M", "ปี"];

export function DashboardView() {
  return (
    <>
      {/* Stat cards row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Revenue card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ padding: 24, background: "#263328", color: "#F7F2E7", minHeight: 180 }}
        >
          <Scene variant="dusk" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(27,38,32,.85) 0%, rgba(27,38,32,.4) 100%)",
            }}
          />
          <div className="relative">
            <div
              className="font-thai text-[11px] tracking-[0.1em] uppercase"
              style={{ opacity: 0.7 }}
            >
              รายได้ เดือนนี้
            </div>
            <div
              className="font-serif leading-none my-2.5"
              style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              ฿ 128,400
            </div>
            <div className="font-thai text-xs flex items-center gap-2" style={{ opacity: 0.85 }}>
              <span style={{ color: "#D9A273" }}>↑ 18.4%</span> vs เดือนที่แล้ว
            </div>
            <svg width="100%" height="40" viewBox="0 0 300 40" style={{ marginTop: 16 }}>
              <path
                d="M 0 30 L 30 25 L 60 28 L 90 20 L 120 22 L 150 15 L 180 18 L 210 10 L 240 14 L 270 6 L 300 8"
                fill="none" stroke="#D9A273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M 0 30 L 30 25 L 60 28 L 90 20 L 120 22 L 150 15 L 180 18 L 210 10 L 240 14 L 270 6 L 300 8 L 300 40 L 0 40 Z"
                fill="#D9A273" opacity="0.18"
              />
            </svg>
          </div>
        </div>

        <StatCard label="การจองทั้งหมด" value="320" sub="+24 สัปดาห์นี้" icon={CalendarIcon} accent="#7C8F6F" />
        <StatCard label="เช็คอินแล้ว" value="180" sub="56% ของทั้งหมด" icon={CheckIcon} accent="#C97B4A" />
        <StatCard label="ผู้เยี่ยมชมลาน" value="1,320" sub="ค่าเฉลี่ย 4:21 น." icon={UsersIcon} accent="#8B9A56" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 24 }}>
        <Panel
          title="7 วันที่ผ่านมา"
          eyebrow="OCCUPANCY · อัตราการจอง"
          mb={0}
          right={
            <div
              className="flex gap-1 rounded-full p-[3px]"
              style={{ background: "var(--cream-100)" }}
            >
              {TIME_FILTERS.map((t, i) => (
                <button
                  key={t}
                  className="font-thai rounded-full text-[11px] cursor-pointer border-0 transition-colors"
                  style={{
                    padding: "6px 12px",
                    background: i === 0 ? "var(--paper)" : "transparent",
                    color: "var(--ink)",
                    fontWeight: i === 0 ? 500 : 400,
                    boxShadow: i === 0 ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                    fontFamily: "var(--font-thai)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        >
          <div className="flex items-end gap-2.5 px-1" style={{ height: 180 }}>
            {BARS.map((b, i) => {
              const pct = (b.b / 45) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2.5">
                  <div className="relative w-full flex items-end" style={{ height: 150 }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-lg"
                      style={{ height: "100%", background: "var(--cream-100)" }}
                    />
                    <div
                      className="relative w-full rounded-lg flex items-start justify-center pt-2"
                      style={{
                        height: `${pct}%`,
                        background: b.today ? "#C97B4A" : "#2F4034",
                      }}
                    >
                      <span
                        className="font-thai text-[10px] font-medium"
                        style={{ color: "#F7F2E7" }}
                      >
                        {b.b}
                      </span>
                    </div>
                  </div>
                  <div
                    className="font-thai text-[11px]"
                    style={{ color: b.today ? "#C97B4A" : "#7C8F6F", fontWeight: b.today ? 600 : 400 }}
                  >
                    {b.d}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="แขกที่จะเช็คอิน"
          eyebrow="TONIGHT · คืนนี้"
          mb={0}
          right={<div className="font-thai text-xs" style={{ color: "#7C8F6F" }}>5 คน</div>}
        >
          <div className="grid gap-3">
            {CHECKINS.map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Scene variant={g.a} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-thai text-[13px] font-medium">{g.n}</div>
                  <div className="font-thai text-[11px] mt-0.5" style={{ color: "#7C8F6F" }}>{g.te}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-sm font-medium">{g.t}</div>
                  <div className="font-thai text-[10px] mt-0.5" style={{ color: "#C97B4A" }}>● รอเช็คอิน</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
