import { Scene, SceneVariant } from "@/components/common/Scene";
import { QuoteIcon } from "@/components/common/Icons";
import { Stars } from "@/components/common/Stars";

interface TestimonialCardProps {
  quote: string;
  name: string;
  place: string;
  scene?: SceneVariant;
}

export function TestimonialCard({
  quote,
  name,
  place,
  scene = "forest",
}: TestimonialCardProps) {
  return (
    <div
      className="rounded-2xl border p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-card cursor-default"
      style={{
        background: "var(--paper)",
        borderColor: "var(--line)",
      }}
    >
      <QuoteIcon
        style={{ width: 32, height: 32, color: "#C97B4A", opacity: 0.7, marginBottom: 16 }}
      />
      <p
        className="font-serif text-forest-900 m-0"
        style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 400, minHeight: 130 }}
      >
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Scene variant={scene} style={{ width: "100%", height: "100%" }} />
        </div>
        <div>
          <div className="font-thai text-sm font-medium">{name}</div>
          <div className="font-thai text-xs mt-0.5" style={{ color: "#7C8F6F" }}>
            {place}
          </div>
        </div>
        <div className="ml-auto">
          <Stars value={5} size={12} />
        </div>
      </div>
    </div>
  );
}
