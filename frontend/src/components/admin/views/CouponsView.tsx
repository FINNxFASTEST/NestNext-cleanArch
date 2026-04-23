import { Scene, SceneVariant } from "@/components/common/Scene";
import { StatusPill } from "@/components/common/StatusPill";
import { StatCard } from "@/components/admin/StatCard";
import { Panel } from "@/components/admin/Panel";
import { FlameIcon, CheckIcon, HeartIcon, PlusIcon } from "@/components/common/Icons";

const COUPONS = [
  { code: "WELCOME25", desc: "ส่วนลด 25% สมาชิกใหม่", pct: 25, flat: null, free: false, used: 128, cap: 500, s: "Active", scene: "dusk" },
  { code: "RAINY100", desc: "ลด ฿100 คืนฝนตก", pct: null, flat: 100, free: false, used: 42, cap: 200, s: "Active", scene: "lake" },
  { code: "FULLMOON", desc: "ฟรีคืนที่ 3 วันพระจันทร์เต็มดวง", pct: null, flat: null, free: true, used: 18, cap: 50, s: "Active", scene: "night" },
  { code: "SONGKRAN69", desc: "ลด 15% ช่วงสงกรานต์", pct: 15, flat: null, free: false, used: 154, cap: 154, s: "Expired", scene: "meadow" },
  { code: "FAMILY4", desc: "ครอบครัว 4 คนขึ้นไป ลด ฿200", pct: null, flat: 200, free: false, used: 0, cap: 100, s: "Draft", scene: "forest" },
  { code: "EARLYBIRD", desc: "จองล่วงหน้า 30 วัน ลด 10%", pct: 10, flat: null, free: false, used: 89, cap: 300, s: "Active", scene: "dusk" },
] as const;

export function CouponsView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="คูปองใช้งานอยู่" value="6" sub="จาก 12 ทั้งหมด" icon={FlameIcon} accent="#C97B4A" />
        <StatCard label="โค้ดถูกใช้" value="342" sub="เดือนนี้" icon={CheckIcon} accent="#7C8F6F" />
        <StatCard label="ส่วนลดที่มอบ" value="฿ 28,400" sub="ROI 4.8x" icon={HeartIcon} accent="#8B9A56" />
      </div>

      <Panel
        title="โปรโมชั่นปัจจุบัน"
        eyebrow="ACTIVE PROMOS · โปรที่กำลังเปิด"
        right={
          <button className="inline-flex items-center gap-2 font-thai text-sm px-[22px] py-3 rounded-full border-0 cursor-pointer bg-ember text-cream-50">
            <PlusIcon style={{ width: 16, height: 16 }} /> สร้างคูปอง
          </button>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {COUPONS.map((c, i) => {
            const usedPct = Math.min(100, Math.round((c.used / c.cap) * 100));
            const discountLabel = c.pct ? `-${c.pct}%` : c.flat ? `-฿${c.flat}` : "FREE";
            return (
              <div key={i} className="relative rounded-xl overflow-hidden border border-line">
                {/* Image header */}
                <div className="relative h-[90px]">
                  <Scene
                    variant={c.scene as SceneVariant}
                    className="absolute inset-0 opacity-90"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(27,38,32,.55), rgba(27,38,32,.2))" }}
                  />
                  <div className="absolute inset-0 p-3.5 text-cream-50">
                    <div className="flex justify-between items-start">
                      <div
                        className="font-serif text-[22px] font-semibold"
                        style={{ letterSpacing: "0.04em" }}
                      >
                        {c.code}
                      </div>
                      <StatusPill status={c.s as "Active" | "Expired" | "Draft"} />
                    </div>
                    <div className="absolute bottom-3.5 left-3.5 font-serif font-medium text-[28px]">
                      {discountLabel}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-[14px]">
                  <div className="font-thai text-[13px] min-h-[36px] text-forest-600">{c.desc}</div>
                  <div className="flex justify-between font-thai text-[11px] mt-2.5 mb-1 text-sage-500">
                    <span>ใช้แล้ว {c.used}/{c.cap}</span>
                    <span>{usedPct}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 rounded-full overflow-hidden bg-cream-100">
                    <div
                      className="h-full"
                      style={{
                        width: `${usedPct}%`,
                        background: c.s === "Expired" ? "var(--line-strong)" : "#2F4034",
                      }}
                    />
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    <button className="flex-1 font-thai text-xs py-[7px] px-2.5 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink">
                      Edit
                    </button>
                    <button className="font-thai text-xs py-[7px] px-3 rounded-full cursor-pointer bg-transparent border border-line text-sage-500">
                      ปิด
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}
