import { Scene, SceneVariant } from "@/components/common/Scene";

interface DestinationCardProps {
  name: string;
  count: string;
  scene?: SceneVariant;
}

export function DestinationCard({
  name,
  count,
  scene = "forest",
}: DestinationCardProps) {
  return (
    <div
      className="relative h-[220px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-card"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <Scene variant={scene} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 40%, rgba(21,24,20,.7) 100%)",
        }}
      />
      <div
        className="absolute bottom-[18px] left-[18px] right-[18px]"
        style={{ color: "#F7F2E7" }}
      >
        <div className="font-serif text-[26px] font-medium">{name}</div>
        <div className="font-thai text-[13px] mt-0.5" style={{ opacity: 0.8 }}>
          {count}
        </div>
      </div>
    </div>
  );
}
