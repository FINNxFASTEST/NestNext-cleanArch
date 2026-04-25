"use client";

import { useState } from "react";
import { PinIcon, CalendarIcon, UsersIcon, SearchIcon } from "@/components/common/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* ─── Locations ─────────────────────────────────────────────────────────────── */

const LOCATIONS = [
  "เชียงใหม่", "เชียงราย", "ตาก", "แม่ฮ่องสอน", "เลย",
  "เพชรบุรี", "กาญจนบุรี", "น่าน", "กระบี่", "เขาใหญ่",
  "ปาย", "เชียงคาน", "ภูทับเบิก", "ดอยอินทนนท์", "อุทัยธานี",
  "ราชบุรี", "นครนายก", "สุโขทัย", "ลำปาง", "พะเยา",
];

/* ─── Date helpers ───────────────────────────────────────────────────────────── */

const MONTHS_FULL = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const MONTHS_SHORT = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];
const DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isInRange(d: Date, s: Date | null, e: Date | null) {
  if (!s || !e) return false;
  const t = d.getTime(), lo = Math.min(s.getTime(), e.getTime()), hi = Math.max(s.getTime(), e.getTime());
  return t > lo && t < hi;
}
function formatShort(d: Date) {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
}
function nextMonth(y: number, m: number) {
  return m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 };
}
function prevMonthOf(y: number, m: number) {
  return m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 };
}

/* ─── Calendar month grid ────────────────────────────────────────────────────── */

function MonthGrid({
  year, month, startDate, endDate, hoverDate, today,
  onDayClick, onDayHover,
}: {
  year: number; month: number;
  startDate: Date | null; endDate: Date | null; hoverDate: Date | null;
  today: Date;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const previewEnd = endDate ?? hoverDate;

  return (
    <div className="flex-1">
      <div className="font-thai text-center text-[14px] font-semibold mb-3 text-forest-800">
        {MONTHS_FULL[month]} {year + 543}
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="font-thai text-center text-[11px] font-medium py-1 text-sage-500">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isStart = startDate ? isSameDay(date, startDate) : false;
          const isEnd = endDate ? isSameDay(date, endDate) : false;
          const inRange = isInRange(date, startDate, previewEnd);
          const isHoverEnd = hoverDate && !endDate ? isSameDay(date, hoverDate) : false;
          const isSelected = isStart || isEnd;

          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              className={cn(
                "relative font-thai text-[13px] h-9 w-full transition-colors rounded-full",
                isPast && "opacity-30 cursor-not-allowed",
                !isPast && !isSelected && "hover:bg-cream-100 cursor-pointer",
                !isSelected && inRange && "rounded-none bg-cream-50",
                isHoverEnd && !endDate && "bg-cream-100 rounded-full",
                isSelected && "bg-ember text-paper font-semibold z-10 cursor-pointer rounded-full",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Date Range Popover content ─────────────────────────────────────────────── */

function DatePickerPanel({
  startDate, endDate, onChange,
}: {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const right = nextMonth(viewYear, viewMonth);
  const canGoBack = new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  function handleDayClick(date: Date) {
    if (!startDate || endDate) {
      onChange(date, null);
    } else {
      if (date < startDate) onChange(date, null);
      else if (isSameDay(date, startDate)) onChange(null, null);
      else onChange(startDate, date);
    }
  }

  function goBack() {
    const p = prevMonthOf(viewYear, viewMonth);
    setViewYear(p.y); setViewMonth(p.m);
  }
  function goForward() {
    const n = nextMonth(viewYear, viewMonth);
    setViewYear(n.y); setViewMonth(n.m);
  }

  return (
    <div>
      {/* Nav row */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-30 border border-line"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="9,2 4,7 9,12" />
          </svg>
        </button>
        <button
          onClick={goForward}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-cream-100 border border-line"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="5,2 10,7 5,12" />
          </svg>
        </button>
      </div>

      {/* Months — single on mobile, two side-by-side on desktop */}
      <div className="flex gap-6">
        <MonthGrid
          year={viewYear} month={viewMonth}
          startDate={startDate} endDate={endDate} hoverDate={hoverDate}
          today={today} onDayClick={handleDayClick} onDayHover={setHoverDate}
        />
        {/* Desktop-only: divider + second month */}
        <div className="hidden md:block w-px bg-line shrink-0" />
        <div className="hidden md:flex flex-1">
          <MonthGrid
            year={right.y} month={right.m}
            startDate={startDate} endDate={endDate} hoverDate={hoverDate}
            today={today} onDayClick={handleDayClick} onDayHover={setHoverDate}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 flex items-center justify-between border-t border-line">
        <span className="font-thai text-[12px] text-sage-500">
          {!startDate && "เลือกวันเช็คอิน"}
          {startDate && !endDate && "เลือกวันเช็คเอาท์"}
          {startDate && endDate && `${formatShort(startDate)} → ${formatShort(endDate)}`}
        </span>
        {(startDate || endDate) && (
          <button
            onClick={() => onChange(null, null)}
            className="font-thai text-[12px] underline text-sage-500"
          >
            ล้างข้อมูล
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Guests panel ───────────────────────────────────────────────────────────── */

function GuestsPanel({
  adults, children: kids, onAdults, onChildren,
}: {
  adults: number; children: number;
  onAdults: (n: number) => void; onChildren: (n: number) => void;
}) {
  const rows = [
    { label: "ผู้ใหญ่", sub: "อายุ 13 ปีขึ้นไป", value: adults, min: 1, max: 20, onChange: onAdults },
    { label: "เด็ก", sub: "อายุต่ำกว่า 13 ปี", value: kids, min: 0, max: 10, onChange: onChildren },
  ];

  return (
    <div>
      {rows.map(({ label, sub, value, min, max, onChange }, i) => (
        <div
          key={label}
          className={cn("flex items-center justify-between py-4", i < rows.length - 1 && "border-b border-line")}
        >
          <div>
            <div className="font-thai text-[14px] font-medium text-ink">{label}</div>
            <div className="font-thai text-[12px] text-sage-500">{sub}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChange(Math.max(min, value - 1))}
              disabled={value <= min}
              className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-lg transition-colors disabled:opacity-30 border border-line-strong text-forest-700"
            >
              −
            </button>
            <span className="font-thai text-[15px] w-5 text-center text-ink">{value}</span>
            <button
              onClick={() => onChange(Math.min(max, value + 1))}
              disabled={value >= max}
              className="w-9 h-9 rounded-full flex items-center justify-center font-medium text-lg transition-colors disabled:opacity-30 border border-line-strong text-forest-700"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Divider — horizontal on mobile, vertical on desktop ───────────────────── */

function Divider() {
  return <div className="h-px w-full md:h-auto md:w-px bg-line shrink-0" />;
}

/* ─── Main SearchBar ─────────────────────────────────────────────────────────── */

export interface SearchParams {
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  adults: number;
  children: number;
}

export function SearchBar({
  className,
  defaultLocation = null,
  defaultStartDate = null,
  defaultEndDate = null,
  defaultAdults = 2,
  defaultChildren = 0,
  onSearch,
}: {
  className?: string;
  defaultLocation?: string | null;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  defaultAdults?: number;
  defaultChildren?: number;
  onSearch?: (params: SearchParams) => void;
}) {
  const [location, setLocation] = useState<string | null>(defaultLocation);
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);

  const [locOpen, setLocOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  function handleDateChange(s: Date | null, e: Date | null) {
    setStartDate(s);
    setEndDate(e);
    if (s && e) setDateOpen(false);
  }

  const dateHint = startDate && endDate
    ? `${formatShort(startDate)} — ${formatShort(endDate)}`
    : startDate ? `${formatShort(startDate)} → ...`
    : "เลือกวันเดินทาง";

  const guestHint = children > 0
    ? `${adults} ผู้ใหญ่ · ${children} เด็ก`
    : `${adults} ผู้ใหญ่`;

  const fields: {
    label: string; hint: string; Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    open: boolean; setOpen: (v: boolean) => void;
    panel: React.ReactNode; active: boolean;
    popoverWidth: string;
  }[] = [
    {
      label: "ปลายทาง",
      hint: location ?? "เลือกสถานที่ได้เลย",
      Icon: PinIcon,
      open: locOpen, setOpen: setLocOpen,
      active: !!location,
      popoverWidth: "w-[480px]",
      panel: (
        <div>
          <div className="font-thai text-[11px] tracking-[0.1em] uppercase font-medium mb-3 text-sage-500">
            จังหวัดยอดนิยม
          </div>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocation(loc); setLocOpen(false); }}
                className={cn(
                  "font-thai text-[13px] px-3.5 py-1.5 rounded-full transition-all border",
                  location === loc
                    ? "bg-forest-800 text-paper border-forest-800"
                    : "bg-cream-50 text-ink border-line-strong",
                )}
              >
                {loc}
              </button>
            ))}
          </div>
          {location && (
            <button
              onClick={() => setLocation(null)}
              className="font-thai text-[12px] underline mt-3 block text-sage-500"
            >
              ล้างข้อมูล
            </button>
          )}
        </div>
      ),
    },
    {
      label: "วันที่เดินทาง",
      hint: dateHint,
      Icon: CalendarIcon,
      open: dateOpen, setOpen: setDateOpen,
      active: !!(startDate || endDate),
      popoverWidth: "w-[580px]",
      panel: (
        <DatePickerPanel startDate={startDate} endDate={endDate} onChange={handleDateChange} />
      ),
    },
    {
      label: "ผู้พักอาศัย",
      hint: guestHint,
      Icon: UsersIcon,
      open: guestOpen, setOpen: setGuestOpen,
      active: adults !== 2 || children !== 0,
      popoverWidth: "w-[280px]",
      panel: (
        <GuestsPanel
          adults={adults} children={children}
          onAdults={setAdults} onChildren={setChildren}
        />
      ),
    },
  ];

  return (
    <div className={cn("w-full max-w-[1100px] mx-auto rounded-[18px] md:rounded-[22px] overflow-hidden flex flex-col md:flex-row md:items-stretch bg-paper border border-line shadow-[0_30px_60px_rgba(20,30,25,.25)]", className)}>
      {fields.map(({ label, hint, Icon, open, setOpen, panel, active, popoverWidth }, i) => (
        <>
          {/* Divider — horizontal on mobile between fields, vertical on desktop */}
          {i > 0 && <Divider key={`d-${i}`} />}

          <Popover key={i} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3.5 cursor-pointer px-5 py-[14px] md:px-[22px] md:py-4 transition-colors",
                  i === 0 ? "md:flex-[1.4]" : "md:flex-1",
                  open ? "bg-cream-50" : "bg-transparent",
                )}
              >
                <Icon
                  style={{ width: 18, height: 18 }}
                  className={cn("shrink-0", active ? "text-ember" : "text-sage-500")}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-thai text-[11px] tracking-[0.1em] uppercase font-medium text-sage-500">
                    {label}
                  </div>
                  <div className={cn("font-thai text-[15px] mt-0.5 truncate", active ? "text-ink" : "text-sage-300")}>
                    {hint}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={12}
              className={cn(
                "rounded-[18px] p-4 md:p-5 shadow-card max-w-[calc(100vw-32px)] bg-paper border-line",
                popoverWidth,
              )}
            >
              {panel}
            </PopoverContent>
          </Popover>
        </>
      ))}

      {/* Divider before search button */}
      <Divider />

      {/* Search button */}
      <div className="flex items-center px-3 py-3 md:py-0">
        <button
          onClick={() => onSearch?.({ location, startDate, endDate, adults, children })}
          className="inline-flex items-center justify-center gap-2 font-thai font-medium text-[15px] w-full md:w-auto px-7 py-3 rounded-full border-0 cursor-pointer transition-all hover:opacity-90 active:scale-[0.97] bg-ember text-cream-50"
        >
          <SearchIcon style={{ width: 18, height: 18 }} />
          ค้นหาแคมป์
        </button>
      </div>
    </div>
  );
}
