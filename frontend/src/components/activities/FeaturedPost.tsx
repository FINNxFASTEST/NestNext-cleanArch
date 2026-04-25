"use client";

import { Scene, SceneVariant } from "@/components/common/Scene";
import { PinIcon, ArrowRIcon } from "@/components/common/Icons";

export interface FeaturedPostData {
  title: string;
  excerpt: string;
  author: string;
  camp: string;
  location: string;
  category: string;
  date: string;
  read: string;
  price: number;
  duration: string;
  scene: SceneVariant;
}

export function FeaturedPost({ post }: { post: FeaturedPostData }) {
  return (
    <div
      className="grid rounded-[28px] overflow-hidden border border-line cursor-pointer transition-[transform,box-shadow] duration-[180ms]"
      style={{
        gridTemplateColumns: "1.2fr 1fr",
        boxShadow: "0 2px 16px rgba(27,38,32,.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(27,38,32,.08)";
      }}
    >
      {/* Scene side */}
      <div className="relative min-h-[440px]">
        <Scene variant={post.scene} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.1) 30%, rgba(0,0,0,.5) 100%)" }}
        />
        <div className="absolute top-5 left-5 flex gap-1.5">
          <span className="font-thai px-[10px] py-1 rounded-full text-[11px] font-semibold bg-ember text-cream-50">
            แนะนำ
          </span>
          <span
            className="font-thai px-[10px] py-1 rounded-full text-[11px] text-forest-900"
            style={{ background: "rgba(247,242,231,.88)", backdropFilter: "blur(6px)" }}
          >
            {post.category}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 text-cream-50">
          <div className="font-thai text-[12px] opacity-85 flex items-center gap-1.5">
            <PinIcon style={{ width: 12, height: 12 }} /> {post.location}
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="p-10 flex flex-col justify-center bg-paper">
        <div className="font-thai text-[12px] text-sage-500 flex gap-2 items-center mb-[14px]">
          <span>{post.date}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-sage-500 inline-block" />
          <span>อ่าน {post.read}</span>
        </div>

        <h2 className="font-serif text-[34px] leading-[1.2] m-0 text-forest-900 font-medium tracking-[-0.01em]">
          {post.title}
        </h2>
        <p className="font-thai text-[15px] leading-[1.7] text-[#4C5A4E] mt-[18px]">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 mt-7 pt-5 border-t border-line">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Scene variant="forest" className="w-full h-full" />
          </div>
          <div className="flex-1">
            <div className="font-thai text-[13px] font-medium text-forest-900">{post.author}</div>
            <div className="font-thai text-[11px] text-sage-500 mt-0.5">{post.camp}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 flex items-baseline gap-1.5">
            <span className="font-thai text-[11px] text-sage-500">จองกิจกรรมเริ่ม</span>
            <span className="font-serif text-[24px] font-medium text-ember">฿{post.price}</span>
            <span className="font-thai text-[12px] text-sage-500">/ ท่าน · {post.duration}</span>
          </div>
          <button className="font-thai py-[11px] px-[22px] rounded-full text-[14px] bg-ember text-cream-50 border-none cursor-pointer flex items-center gap-1.5">
            อ่านต่อ & จอง <ArrowRIcon style={{ width: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
