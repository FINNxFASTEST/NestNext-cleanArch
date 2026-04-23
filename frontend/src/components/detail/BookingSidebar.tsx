import { Scene } from "@/components/common/Scene";
import { StarIcon } from "@/components/common/Icons";

function Row({ l, r, ember }: { l: React.ReactNode; r: React.ReactNode; ember?: boolean }) {
  return (
    <div className={`flex justify-between font-thai text-sm ${ember ? "text-ember-dark" : "text-ink"}`}>
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}

export function BookingSidebar() {
  return (
    <div className="rounded-2xl border border-line sticky top-6 p-6 shadow-card bg-paper">
      {/* Price header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="font-serif text-[30px] font-medium">
            ฿ 400
            <span className="font-thai text-sm ml-1.5 text-sage-500">/ คืน</span>
          </div>
          <div className="font-thai text-xs mt-1 text-sage-500">ลานริมเขา · เหลือ 2 ที่</div>
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-thai bg-[#C7D1B8] text-forest-800">
          <StarIcon style={{ width: 10, height: 10 }} /> 9.8
        </div>
      </div>

      {/* Date + guests */}
      <div className="rounded-xl overflow-hidden mb-3.5 border border-line-strong">
        <div className="grid grid-cols-2 border-b border-line">
          <div className="p-3 px-4 border-r border-line">
            <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">เช็คอิน</div>
            <div className="font-thai text-sm mt-1">24 เม.ย 2569</div>
          </div>
          <div className="p-3 px-4">
            <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">เช็คเอาท์</div>
            <div className="font-thai text-sm mt-1">26 เม.ย 2569</div>
          </div>
        </div>
        <div className="p-3 px-4">
          <div className="font-sans text-[9px] tracking-[0.18em] uppercase text-sage-500">ผู้พัก</div>
          <div className="font-thai text-sm mt-1">2 ผู้ใหญ่ · 1 เด็ก</div>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full font-thai font-medium text-[15px] py-3.5 rounded-full border-0 cursor-pointer bg-ember text-cream-50">
        จองพื้นที่กางเต็นท์
      </button>

      <div className="font-thai text-xs text-center my-3.5 text-sage-500">
        ยังไม่ตัดเงินจนกว่าเจ้าของลานจะยืนยัน
      </div>

      {/* Price breakdown */}
      <div className="grid gap-2.5 pt-4 border-t border-line">
        <Row l="฿ 400 × 2 คืน" r="฿ 800" />
        <Row l="ค่าบริการ" r="฿ 50" />
        <Row l="ส่วนลดสมาชิก" r="−฿ 80" ember />
        <div className="h-px bg-line" />
        <Row
          l={<span className="font-serif text-base">รวมทั้งหมด</span>}
          r={<span className="font-serif text-xl font-medium">฿ 770</span>}
        />
      </div>

      {/* Host */}
      <div className="flex gap-3 items-center mt-5 pt-5 border-t border-line">
        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
          <Scene variant="dusk" className="w-full h-full" />
        </div>
        <div className="flex-1">
          <div className="font-thai text-[13px] font-medium">คุณนพดล · เจ้าของลาน</div>
          <div className="font-thai text-[11px] mt-0.5 text-sage-500">ตอบภายใน 1 ชั่วโมง</div>
        </div>
        <button className="font-thai text-xs px-3 py-1.5 rounded-full cursor-pointer bg-transparent border border-line-strong text-ink">
          ทักแชท
        </button>
      </div>
    </div>
  );
}
