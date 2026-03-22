import type { InsightListBlock } from "@/lib/types";

export function InsightList({ items }: InsightListBlock) {
  return (
    <div className="flex flex-col gap-9 py-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2">
          <p className="font-display text-[18px] text-[#d4d4d4] leading-[1.4]">
            {item.heading}
          </p>
          <p className="font-body font-light text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.6px]">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
