export interface UpcomingEvent {
  date: string;
  month: string;
  title: string;
  sub: string;
  left: number;
}

export function UpcomingPanel({ items }: { items: UpcomingEvent[] }) {
  return (
    <div className="bg-paper rounded-[22px] border border-line p-[22px]">
      <div className="font-sans text-[10px] tracking-[.12em] uppercase text-sage-500 font-medium mb-1">
        UPCOMING · เปิดจองแล้ว
      </div>
      <div className="font-serif text-[20px] text-forest-900 mb-4">กิจกรรมที่ใกล้จะเริ่ม</div>
      <div className="flex flex-col gap-[14px]">
        {items.map((u, i) => (
          <div key={i} className="flex gap-3 cursor-pointer items-center">
            <div className="w-12 h-14 rounded-[10px] bg-cream-100 flex flex-col items-center justify-center shrink-0 border border-line">
              <div className="font-serif text-[18px] font-semibold text-forest-900 leading-none">{u.date}</div>
              <div className="font-thai text-[10px] text-sage-500 mt-0.5">{u.month}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-thai text-[13px] font-medium text-forest-900">{u.title}</div>
              <div className="font-thai text-[11px] text-sage-500 mt-0.5">{u.sub}</div>
              <div className="font-thai text-[10px] text-ember mt-0.5">เหลืออีก {u.left} ที่</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
