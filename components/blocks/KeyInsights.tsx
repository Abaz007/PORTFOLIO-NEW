import type { KeyInsightsBlock } from "@/lib/types";

export function KeyInsights({ items }: KeyInsightsBlock) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-6">
          <div className="h-px bg-[#171717]" />
          <div className="flex flex-col gap-1">
            <p className="font-display text-[18px] text-[#e5e5e5] leading-[1.4]">
              {item.heading}
            </p>
            <p className="font-body font-light text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.096px]">
              {item.body}
            </p>
          </div>
        </div>
      ))}
      <div className="h-px bg-[#171717]" />
    </div>
  );
}
