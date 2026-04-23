import { StarIcon } from "./Icons";

interface StarsProps {
  value?: number;
  size?: number;
}

export function Stars({ value = 5, size = 12 }: StarsProps) {
  return (
    <span className="inline-flex gap-[2px] text-ember">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          style={{ width: size, height: size, opacity: i < value ? 1 : 0.25 }}
        />
      ))}
    </span>
  );
}
