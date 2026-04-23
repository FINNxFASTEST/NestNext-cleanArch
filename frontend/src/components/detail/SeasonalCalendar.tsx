import { cn } from "@/lib/utils";

const MONTHS = [
  { m: "ม.ค", rate: 4, note: "หนาว" },
  { m: "ก.พ", rate: 4, note: "หมอก" },
  { m: "มี.ค", rate: 3, note: "" },
  { m: "เม.ย", rate: 2, note: "ร้อน" },
  { m: "พ.ค", rate: 2, note: "" },
  { m: "มิ.ย", rate: 3, note: "ฝน" },
  { m: "ก.ค", rate: 3, note: "" },
  { m: "ส.ค", rate: 3, note: "" },
  { m: "ก.ย", rate: 3, note: "" },
  { m: "ต.ค", rate: 4, note: "สด" },
  { m: "พ.ย", rate: 5, note: "พีค" },
  { m: "ธ.ค", rate: 5, note: "พีค" },
];

const COLORS = ["#E7E4D8", "#D7DDCA", "#B7C5A4", "#8B9A7A", "#5B7254"];

export function SeasonalCalendar() {
  return (
    <div>
      <div className="flex gap-1 overflow-hidden rounded-xl">
        {MONTHS.map((m, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className="h-16 relative flex items-end justify-center p-1.5"
              style={{ background: COLORS[m.rate - 1] }}
            >
              {m.note && (
                <span
                  className={cn("font-thai text-[10px]", m.rate >= 4 ? "text-cream-50" : "text-forest-900")}
                >
                  {m.note}
                </span>
              )}
            </div>
            <div className="font-thai text-[11px] py-2 text-forest-600" style={{ letterSpacing: "0.03em" }}>
              {m.m}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 mt-4 text-[11px] font-thai text-sage-500">
        {[
          { color: "#E7E4D8", label: "เงียบ" },
          { color: "#8B9A7A", label: "ดี" },
          { color: "#5B7254", label: "พีคซีซัน" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-[2px]"
              style={{ width: 10, height: 10, background: color }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
