import { Scene } from "@/components/common/Scene";

export function Gallery() {
  return (
    <>
      {/* Mobile: single main image */}
      <div className="md:hidden relative overflow-hidden rounded-[18px] h-[240px]">
        <Scene variant="forest" className="absolute inset-0" />
        <button className="absolute bottom-4 right-4 font-thai text-sm px-4 py-2 rounded-full cursor-pointer bg-paper border border-line-strong text-ink">
          ดูทั้งหมด 24 ภาพ
        </button>
      </div>

      {/* Desktop: full gallery grid */}
      <div
        className="hidden md:grid rounded-[22px] overflow-hidden"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "220px 220px",
          gap: 8,
          height: 448,
        }}
      >
        {/* Main large image */}
        <div className="relative" style={{ gridRow: "1 / 3" }}>
          <Scene variant="forest" className="absolute inset-0" />
        </div>
        <div className="relative">
          <Scene variant="dusk" className="absolute inset-0" />
        </div>
        <div className="relative">
          <Scene variant="meadow" className="absolute inset-0" />
        </div>
        <div className="relative">
          <Scene variant="night" className="absolute inset-0" />
        </div>
        <div className="relative">
          <Scene variant="lake" className="absolute inset-0" />
          <button className="absolute bottom-4 right-4 font-thai text-sm px-4 py-2 rounded-full cursor-pointer bg-paper border border-line-strong text-ink">
            ดูทั้งหมด 24 ภาพ
          </button>
        </div>
      </div>
    </>
  );
}
