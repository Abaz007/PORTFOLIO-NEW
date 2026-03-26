import type { NumberedListBlock } from "@/lib/types";

export function NumberedList({ label, items }: NumberedListBlock) {
  return (
    <div className="w-full flex flex-col gap-1">
      {/* Optional label cell */}
      {label && (
        <div className="border border-[#262626] px-6 py-4">
          <span className="font-mono font-extralight text-[12px] text-[#a3a3a3] uppercase leading-5">
            {label}
          </span>
        </div>
      )}
      {/* Items cell */}
      <div className="border border-[#262626] px-6 py-4 flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-1 items-start">
            {/* Numbered bubble */}
            <div className="bg-[#262626] flex items-center justify-center rounded-full shrink-0 w-5 h-5">
              <span className="font-mono font-extralight text-[10px] text-[#a3a3a3] text-center uppercase leading-5">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {/* Text */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="font-mono font-light text-[12px] text-[#d4d4d4] leading-5">
                {item.heading}
              </p>
              {item.body && (
                <p className="font-body font-light text-[12px] text-[#a3a3a3] leading-5">
                  {item.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
