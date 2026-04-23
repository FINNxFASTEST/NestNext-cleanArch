import { Scene, SceneVariant } from "@/components/common/Scene";
import { HeartIcon, StarIcon, PinIcon, ArrowRIcon } from "@/components/common/Icons";
import { Badge } from "@/components/common/Badge";

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
      className="relative rounded-3xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-card"
      style={{
        height: big ? 520 : 250,
        background: "#263328",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <Scene variant={scene} style={{ position: "absolute", inset: 0 }} />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.15) 0%, transparent 40%, rgba(0,0,0,.6) 100%)",
        }}
      />

      {/* Top badges + heart */}
      <div className="absolute top-4 left-4 right-4 flex justify-between gap-2">
        <div className="flex gap-1.5">
          {badges.map((b) => (
            <Badge key={b} className="font-thai">
              {b}
            </Badge>
          ))}
        </div>
        <button
          className="w-9 h-9 rounded-full grid place-items-center cursor-pointer border-0"
          style={{ background: "rgba(247,242,231,0.9)" }}
        >
          <HeartIcon style={{ width: 16, height: 16, color: "#2F4034" }} />
        </button>
      </div>

      {/* Rating pill */}
      {rating && (
        <div
          className="absolute right-4"
          style={{ top: big ? 70 : 60 }}
        >
          <Badge variant="dark" className="flex items-center gap-1.5 px-2.5 py-1.5">
            <StarIcon style={{ width: 12, height: 12, color: "#D9A273" }} />
            {rating}
          </Badge>
        </div>
      )}

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: big ? 28 : 20, color: "#F7F2E7" }}
      >
        <div
          className="font-serif leading-[1.15] font-medium"
          style={{
            fontSize: big ? 34 : 22,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          className="font-thai flex items-center gap-1.5"
          style={{ fontSize: big ? 14 : 12, opacity: 0.85, marginTop: 4 }}
        >
          <PinIcon style={{ width: 12, height: 12 }} />
          {sub}
        </div>

        {/* Price row */}
        <div
          className="flex justify-between items-end"
          style={{
            marginTop: big ? 28 : 14,
            paddingTop: big ? 24 : 14,
            borderTop: "1px solid rgba(247,242,231,0.2)",
          }}
        >
          <div>
            <div
              className="font-thai"
              style={{ fontSize: big ? 13 : 11, opacity: 0.7 }}
            >
              {cabin ? "ราคาต่อคืน" : "ต่อที่ / คืน"}
            </div>
            <div
              className="font-serif font-medium"
              style={{ fontSize: big ? 26 : 18 }}
            >
              ฿ {price}
            </div>
          </div>
          {big && (
            <button
              className="inline-flex items-center gap-2 font-thai font-medium text-sm px-5 py-[10px] rounded-full border-0 cursor-pointer transition-colors"
              style={{ background: "#C97B4A", color: "#F7F2E7" }}
            >
              จองเลย <ArrowRIcon style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
