import { Scene } from "@/components/common/Scene";
import { FormShell } from "./FormShell";
import { FormField, FormInput, Chip } from "./FormPrimitives";

const DISCOUNT_TYPES = [
  { l: "เปอร์เซ็นต์", s: "10, 15, 25 %", on: true },
  { l: "จำนวนบาท", s: "฿100, ฿200", on: false },
  { l: "ฟรีคืน", s: "ซื้อ 2 แถม 1", on: false },
];

const APPLICABLE = ["ทุกลาน", "ลานริมเขา", "ลานใต้ต้นสน"];

export function CreateCouponForm({ onClose }: { onClose?: () => void }) {
  return (
    <FormShell
      eyebrow="NEW PROMO · สร้างคูปอง"
      title="สร้างคูปองส่วนลด"
      subtitle="ตั้งโค้ด มูลค่าส่วนลด และช่วงเวลาที่ใช้งานได้"
      sceneVariant="dusk"
      onSubmitLabel="สร้างคูปอง"
      onClose={onClose}
    >
      <div className="grid gap-[26px]" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Left: form fields */}
        <div>
          {/* Code + display name */}
          <div className="grid grid-cols-2 gap-4 mb-[18px]">
            <FormField label="รหัสคูปอง" hint="ตัวอักษรพิมพ์ใหญ่ A-Z และตัวเลข">
              <FormInput placeholder="SUMMER26" variant="code" />
            </FormField>
            <FormField label="ชื่อที่แสดง">
              <FormInput placeholder="เช่น ลดรับหน้าร้อน" />
            </FormField>
          </div>

          {/* Discount type */}
          <FormField label="ประเภทส่วนลด">
            <div className="grid grid-cols-3 gap-2 mt-1">
              {DISCOUNT_TYPES.map((o) => (
                <div
                  key={o.l}
                  className="p-3 rounded-xl cursor-pointer text-center border"
                  style={{
                    border: `1px solid ${o.on ? "var(--forest-700)" : "var(--line)"}`,
                    background: o.on ? "#EEF1E6" : "var(--paper)",
                  }}
                >
                  <div className="font-thai text-[13px] font-medium">{o.l}</div>
                  <div className="font-thai text-[10px] text-sage-500 mt-1">{o.s}</div>
                </div>
              ))}
            </div>
          </FormField>

          {/* Value + cap */}
          <div className="grid grid-cols-2 gap-4 my-[18px]">
            <FormField label="มูลค่าส่วนลด">
              <FormInput defaultValue="25" suffix="%" />
            </FormField>
            <FormField label="ส่วนลดสูงสุด">
              <FormInput placeholder="ไม่จำกัด" prefix="฿" />
            </FormField>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="เริ่มใช้ได้">
              <FormInput defaultValue="25 เม.ย 2569" suffix="📅" />
            </FormField>
            <FormField label="สิ้นสุด">
              <FormInput defaultValue="30 มิ.ย 2569" suffix="📅" />
            </FormField>
          </div>
        </div>

        {/* Right: live preview */}
        <div>
          <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-sage-500">
            PREVIEW · ตัวอย่างคูปอง
          </div>

          <div className="rounded-xl overflow-hidden border border-line">
            <div className="relative h-[130px]">
              <Scene variant="dusk" className="absolute inset-0" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(27,38,32,.55), rgba(27,38,32,.2))" }}
              />
              <div className="absolute inset-0 p-4 text-cream-50 flex flex-col justify-between">
                <div
                  className="font-serif text-[22px] font-semibold"
                  style={{ letterSpacing: ".06em" }}
                >
                  SUMMER26
                </div>
                <div className="font-serif text-[34px] font-medium">-25%</div>
              </div>
            </div>
            <div className="p-3.5">
              <div className="font-thai text-[13px] font-medium">ลดรับหน้าร้อน</div>
              <div className="font-thai text-[11px] text-sage-500 mt-1 leading-relaxed">
                ลด 25% · ขั้นต่ำ ฿1,000
                <br />
                ใช้ได้ 25 เม.ย — 30 มิ.ย 2569
                <br />
                จำกัด 500 ครั้ง · 1 ครั้ง/คน
              </div>
            </div>
          </div>

          {/* Applicable camps */}
          <div className="mt-4 p-3.5 rounded-xl bg-cream-100">
            <div className="font-thai text-xs font-medium mb-2">ลานที่ใช้ได้</div>
            <div className="flex flex-wrap gap-1.5">
              {APPLICABLE.map((t, i) => (
                <Chip key={t} on={i === 0}>{t}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FormShell>
  );
}
