export function TagCloudPanel({ tags }: { tags: string[] }) {
  return (
    <div className="bg-cream-100 rounded-[22px] p-[22px]">
      <div className="font-sans text-[10px] tracking-[.12em] uppercase text-sage-500 font-medium mb-1">
        TAGS · แท็กยอดฮิต
      </div>
      <div className="font-serif text-[18px] text-forest-900 mb-[14px]">สิ่งที่ผู้คนสนใจ</div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <span
            key={i}
            className="font-thai px-3 py-[5px] rounded-full text-[12px] bg-paper border border-line cursor-pointer text-forest-800"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}
