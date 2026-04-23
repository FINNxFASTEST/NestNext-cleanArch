import { Scene } from "@/components/common/Scene";

export function Gallery() {
  return (
    <>
      {/* Mobile: single main image */}
      <div
        className="md:hidden relative overflow-hidden"
        style={{ height: 240, borderRadius: 18 }}
      >
        <Scene variant="forest" style={{ position: "absolute", inset: 0 }} />
        <button
          className="absolute bottom-4 right-4 font-thai text-sm px-4 py-2 rounded-full cursor-pointer"
          style={{
            background: "var(--paper)",
            border: "1px solid var(--line-strong)",
            color: "var(--ink)",
          }}
        >
          ดูทั้งหมด 24 ภาพ
        </button>
      </div>

      {/* Desktop: full gallery grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "220px 220px",
          gap: 8,
          borderRadius: 22,
          overflow: "hidden",
          height: 448,
        }}
      >
        {/* Main large image */}
        <div style={{ gridRow: "1 / 3", position: "relative" }}>
          <Scene variant="forest" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ position: "relative" }}>
          <Scene variant="dusk" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ position: "relative" }}>
          <Scene variant="meadow" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ position: "relative" }}>
          <Scene variant="night" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ position: "relative" }}>
          <Scene variant="lake" style={{ position: "absolute", inset: 0 }} />
          <button
            className="absolute bottom-4 right-4 font-thai text-sm px-4 py-2 rounded-full cursor-pointer"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line-strong)",
              color: "var(--ink)",
            }}
          >
            ดูทั้งหมด 24 ภาพ
          </button>
        </div>
      </div>
    </>
  );
}
