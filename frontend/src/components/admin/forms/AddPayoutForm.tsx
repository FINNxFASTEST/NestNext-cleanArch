import { CheckIcon } from "@/components/common/Icons";
import { FormShell } from "./FormShell";
import { FormField, FormInput, FormSelect, Chip } from "./FormPrimitives";

const PAYOUT_CHANNELS = [
  { l: "บัญชีธนาคาร", s: "โอนเข้าบัญชีไทย", on: true },
  { l: "PromptPay", s: "เบอร์โทร / เลขประจำตัว", on: false },
  { l: "กระเป๋าเงินอิเล็กทรอนิกส์", s: "TrueMoney, Rabbit Line Pay", on: false },
];

const BANKS = [
  { k: "KBK", n: "กสิกรไทย", c: "#138F3E", on: true },
  { k: "SCB", n: "ไทยพาณิชย์", c: "#4E2A84", on: false },
  { k: "BBL", n: "กรุงเทพ", c: "#1E4DA1", on: false },
  { k: "KTB", n: "กรุงไทย", c: "#00A8E1", on: false },
];

export function AddPayoutForm({ onClose }: { onClose?: () => void }) {
  return (
    <FormShell
      eyebrow="PAYOUT · ข้อมูลการโอนเงิน"
      title="เพิ่มข้อมูลโอนเงิน"
      subtitle="เลือกวิธีรับเงิน และกรอกข้อมูลบัญชีเพื่อให้ Kangtent โอนรายได้ของคุณ"
      sceneVariant="lake"
      onSubmitLabel="บันทึกบัญชี"
      footerNote="เราเข้ารหัสข้อมูลบัญชีของคุณด้วยมาตรฐาน PCI DSS"
      onClose={onClose}
    >
      {/* Channel selector */}
      <FormField label="ช่องทางรับเงิน">
        <div className="grid grid-cols-3 gap-2 mt-1">
          {PAYOUT_CHANNELS.map((o) => (
            <div
              key={o.l}
              className="p-[14px] rounded-xl cursor-pointer border"
              style={{
                border: `1px solid ${o.on ? "var(--forest-700)" : "var(--line)"}`,
                background: o.on ? "#EEF1E6" : "var(--paper)",
              }}
            >
              <div className="font-thai text-[13px] font-medium">{o.l}</div>
              <div className="font-thai text-[11px] text-sage-500 mt-1">{o.s}</div>
            </div>
          ))}
        </div>
      </FormField>

      {/* Bank details panel */}
      <div className="mt-[22px] p-[18px] rounded-xl bg-cream-50 border border-line">
        <div className="font-sans text-[10px] tracking-[0.18em] uppercase font-medium mb-3.5 text-sage-500">
          BANK DETAILS · รายละเอียดบัญชี
        </div>

        <FormField label="ธนาคาร">
          <div className="grid grid-cols-4 gap-2">
            {BANKS.map((b) => (
              <div
                key={b.k}
                className="p-2.5 rounded-xl cursor-pointer flex items-center gap-2.5 border"
                style={{
                  border: `1px solid ${b.on ? "var(--forest-700)" : "var(--line)"}`,
                  background: b.on ? "#EEF1E6" : "var(--paper)",
                }}
              >
                <div
                  className="w-[34px] h-[34px] rounded-lg grid place-items-center font-serif text-[11px] font-semibold text-white shrink-0"
                  style={{ background: b.c }}
                >
                  {b.k}
                </div>
                <div className="font-thai text-xs font-medium">{b.n}</div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Chip>ดูธนาคารอื่น ๆ →</Chip>
          </div>
        </FormField>

        <div className="grid gap-4 mt-[18px]" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
          <FormField label="เลขที่บัญชี">
            <FormInput placeholder="xxx-x-xxxxx-x" />
          </FormField>
          <FormField label="ประเภทบัญชี">
            <FormSelect value="ออมทรัพย์" />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-[18px]">
          <FormField label="ชื่อ-นามสกุล เจ้าของบัญชี" hint="ต้องตรงกับชื่อในบัตรประชาชน">
            <FormInput defaultValue="นพดล ปรีดาชัย" />
          </FormField>
          <FormField label="สาขาที่เปิดบัญชี">
            <FormSelect value="สาขาปากช่อง" />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-[18px]">
          <FormField label="ชื่อเรียกบัญชี (ภายใน)" hint="เพื่อแยกแยะหากมีหลายบัญชี">
            <FormInput placeholder="เช่น บัญชีหลัก ลานเขาใหญ่" />
          </FormField>
          <FormField label="รอบการโอน">
            <FormSelect value="ทุก 7 วัน — ทุกวันจันทร์" />
          </FormField>
        </div>
      </div>

      {/* Default account checkbox */}
      <div className="mt-[18px] p-[14px] rounded-xl border border-line flex gap-3 items-start">
        <div
          className="w-[22px] h-[22px] rounded-[6px] grid place-items-center shrink-0 mt-0.5"
          style={{ background: "var(--forest-700)", border: "1.5px solid var(--forest-700)" }}
        >
          <CheckIcon style={{ width: 14, height: 14 }} className="text-cream-50" />
        </div>
        <div>
          <div className="font-thai text-[13px] font-medium">ตั้งเป็นบัญชีหลักสำหรับรับเงิน</div>
          <div className="font-thai text-[11px] text-sage-500 mt-0.5">
            รายได้ทั้งหมดจะโอนเข้าบัญชีนี้เว้นแต่จะระบุเป็นอย่างอื่น
          </div>
        </div>
      </div>
    </FormShell>
  );
}
