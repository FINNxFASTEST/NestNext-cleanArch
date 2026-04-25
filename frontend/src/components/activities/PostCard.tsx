"use client";

import { Scene, SceneVariant } from "@/components/common/Scene";
import { HeartIcon, PinIcon, ArrowRIcon } from "@/components/common/Icons";

export interface Post {
  id: number;
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

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="bg-paper rounded-[20px] overflow-hidden border border-line cursor-pointer flex flex-col transition-[transform,box-shadow] duration-[180ms]"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      <div className="relative h-[220px]">
        <Scene variant={post.scene} className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.1) 50%, rgba(0,0,0,.4) 100%)" }}
        />
        <div className="absolute top-[14px] left-[14px]">
          <span
            className="font-thai px-[10px] py-1 rounded-full text-[11px] font-medium text-forest-900"
            style={{ background: "rgba(247,242,231,.88)", backdropFilter: "blur(6px)" }}
          >
            {post.category}
          </span>
        </div>
        <button
          className="absolute top-[14px] right-[14px] w-8 h-8 rounded-full border-none grid place-items-center cursor-pointer"
          style={{ background: "rgba(247,242,231,.9)" }}
        >
          <HeartIcon style={{ color: "var(--forest-700)", width: 14, height: 14 }} />
        </button>
      </div>

      <div className="p-[22px] flex flex-col flex-1">
        <div className="font-thai text-[11px] text-sage-500 flex gap-2 items-center mb-[10px]">
          <span>{post.date}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-sage-500 inline-block" />
          <span>อ่าน {post.read}</span>
        </div>

        <h3 className="font-serif text-[22px] leading-[1.25] m-0 text-forest-900 font-medium tracking-[-0.01em]">
          {post.title}
        </h3>
        <p className="font-thai text-[13px] leading-[1.6] text-[#4C5A4E] mt-[10px] mb-0">
          {post.excerpt}
        </p>

        <div className="font-thai text-[11px] text-sage-500 flex items-center gap-[5px] mt-[14px]">
          <PinIcon style={{ width: 11, height: 11 }} /> {post.camp} · {post.location}
        </div>

        <div className="flex items-center gap-[10px] mt-auto pt-[18px] border-t border-dashed border-line">
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
            <Scene variant="meadow" className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-thai text-[12px] font-medium text-forest-900">{post.author}</div>
            <div className="font-thai text-[10px] text-sage-500">เจ้าของลาน</div>
          </div>
          <div className="text-right">
            <div className="font-thai text-[10px] text-sage-500">เริ่ม</div>
            <div className="font-serif text-[16px] font-medium text-ember">฿{post.price}</div>
          </div>
        </div>

        <button className="font-thai mt-3 py-[9px] px-4 rounded-full text-[12px] border border-line-strong bg-paper text-ink cursor-pointer flex items-center justify-center gap-1.5">
          อ่านต่อ & จองกิจกรรม <ArrowRIcon style={{ width: 13 }} />
        </button>
      </div>
    </article>
  );
}
