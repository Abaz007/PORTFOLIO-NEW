import type { KeyInsightsBlock } from "@/lib/types";

export function KeyInsights({ items }: KeyInsightsBlock) {
  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#262626]">
      {/* Header row */}
      <div className="grid grid-cols-3 border-b border-[#262626]">
        {["METRIC", "BEFORE", "AFTER REDESIGN"].map((label) => (
          <div key={label} className="px-6 py-3 h-11 flex items-center">
            <span className="font-mono font-medium text-[11px] text-[#737373] tracking-[0.6px] uppercase leading-none">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {items.map((item, i) => (
        <div
          key={i}
          className={`grid grid-cols-3 min-h-[72px]${i < items.length - 1 ? " border-b border-[#262626]" : ""}`}
        >
          <div className="px-6 py-4 flex items-center">
            <span className="font-body text-[12px] text-[#e5e5e5] leading-[1.67]">
              {item.heading}
            </span>
          </div>
          <div className="px-6 py-4 flex items-center border-l border-[#262626]">
            <span className="font-body font-normal text-[12px] text-[#a3a3a3] leading-[1.67]">
              {item.before ?? item.body}
            </span>
          </div>
          <div className="px-6 py-4 flex items-center border-l border-[#262626]">
            <span className="font-body font-normal text-[12px] text-[#a3a3a3] leading-[1.67]">
              {item.after ?? "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
