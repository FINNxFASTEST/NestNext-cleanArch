import { Scene, SceneVariant } from "@/components/common/Scene";
import { QuoteIcon } from "@/components/common/Icons";
import { Stars } from "@/components/common/Stars";

interface TestimonialCardProps {
  quote: string;
  name: string;
  place: string;
  scene?: SceneVariant;
}

export function TestimonialCard({ quote, name, place, scene = "forest" }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-line p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-card cursor-default bg-paper">
      <QuoteIcon
        className="text-ember opacity-70 mb-4"
        style={{ width: 32, height: 32 }}
      />
      <p
        className="font-serif text-forest-900 m-0"
        style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 400, minHeight: 130 }}
      >
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Scene variant={scene} className="w-full h-full" />
        </div>
        <div>
          <div className="font-thai text-sm font-medium">{name}</div>
          <div className="font-thai text-xs mt-0.5 text-sage-500">{place}</div>
        </div>
        <div className="ml-auto">
          <Stars value={5} size={12} />
        </div>
      </div>
    </div>
  );
}
