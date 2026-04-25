import { Scene } from "@/components/common/Scene";

export function NewsletterPanel() {
  return (
    <div className="bg-forest-800 text-cream-50 rounded-[22px] p-6 relative overflow-hidden">
      <Scene variant="night" className="absolute inset-0 opacity-35" />
      <div className="relative">
        <div className="font-serif text-[22px] font-medium tracking-[-0.01em] mb-2">
          รับเรื่องเล่ารอบกองไฟ
        </div>
        <p className="font-thai text-[12px] opacity-80 leading-relaxed m-0 mb-[14px]">
          ส่งบทความใหม่ และกิจกรรมเปิดจอง ให้อ่านทุกวันศุกร์
        </p>
        <div
          className="flex gap-1.5 rounded-full p-1 border"
          style={{
            background: "rgba(247,242,231,.12)",
            borderColor: "rgba(247,242,231,.18)",
          }}
        >
          <input
            placeholder="อีเมลของคุณ"
            className="font-thai flex-1 border-none bg-transparent py-2 px-3 text-cream-50 text-[13px] outline-none"
          />
          <button className="font-thai py-2 px-4 rounded-full bg-ember text-cream-50 border-none text-[13px] cursor-pointer">
            สมัคร
          </button>
        </div>
      </div>
    </div>
  );
}
