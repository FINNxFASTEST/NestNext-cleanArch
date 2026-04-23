import { Scene, SceneVariant } from "@/components/common/Scene";
import { HeartIcon, StarIcon, PinIcon, ArrowRIcon } from "@/components/common/Icons";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  sub: string;
  rating?: string;
  price: string;
  scene?: SceneVariant;
  big?: boolean;
  badges?: string[];
  cabin?: boolean;
}

export function FeatureCard({
  title,
  sub,
  rating,
  price,
  scene = "forest",
  big = false,
  badges = [],
  cabin = false,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-card bg-forest-800 shadow-soft",
        big ? "h-[520px]" : "h-[250px]"
      )}
    >
      <Scene variant={scene} className="absolute inset-0" />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,.15) 0%, transparent 40%, rgba(0,0,0,.6) 100%)" }}
      />

      {/* Top badges + heart */}
      <div className="absolute top-4 left-4 right-4 flex justify-between gap-2">
        <div className="flex gap-1.5">
          {badges.map((b) => (
            <Badge key={b} className="font-thai">{b}</Badge>
          ))}
        </div>
        <button className="w-9 h-9 rounded-full grid place-items-center cursor-pointer border-0 bg-cream-50/90">
          <HeartIcon style={{ width: 16, height: 16 }} className="text-forest-700" />
        </button>
      </div>

      {/* Rating pill */}
      {rating && (
        <div className="absolute right-4" style={{ top: big ? 70 : 60 }}>
          <Badge variant="dark" className="flex items-center gap-1.5 px-2.5 py-1.5">
            <StarIcon style={{ width: 12, height: 12 }} className="text-clay" />
            {rating}
          </Badge>
        </div>
      )}

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 text-cream-50"
        style={{ padding: big ? 28 : 20 }}
      >
        <div
          className="font-serif leading-[1.15] font-medium"
          style={{ fontSize: big ? 34 : 22, letterSpacing: "-0.01em" }}
        >
          {title}
        </div>
        <div
          className="font-thai flex items-center gap-1.5 mt-1"
          style={{ fontSize: big ? 14 : 12, opacity: 0.85 }}
        >
          <PinIcon style={{ width: 12, height: 12 }} />
          {sub}
        </div>

        {/* Price row */}
        <div
          className="flex justify-between items-end border-t border-cream-50/20"
          style={{ marginTop: big ? 28 : 14, paddingTop: big ? 24 : 14 }}
        >
          <div>
            <div className="font-thai opacity-70" style={{ fontSize: big ? 13 : 11 }}>
              {cabin ? "ราคาต่อคืน" : "ต่อที่ / คืน"}
            </div>
            <div className="font-serif font-medium" style={{ fontSize: big ? 26 : 18 }}>
              ฿ {price}
            </div>
          </div>
          {big && (
            <button className="inline-flex items-center gap-2 font-thai font-medium text-sm px-5 py-[10px] rounded-full border-0 cursor-pointer transition-colors bg-ember text-cream-50">
              จองเลย <ArrowRIcon style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
