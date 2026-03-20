import type { SectionHeadingBlock } from "@/lib/types";

export function SectionHeading({ text, anchor, symbol }: SectionHeadingBlock) {
  const label = anchor.replace(/-/g, " ").toUpperCase();

  return (
    <div id={anchor} className="flex flex-col gap-4 scroll-mt-24 pt-12">
      <p className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73]">
        {label}
      </p>
      <h2 className="font-display text-[36px] text-[#d4d4d4] leading-[1.4]">
        {symbol && (
          <span aria-hidden="true" className="text-[#737373] mr-2">
            {symbol}
          </span>
        )}
        {text}
      </h2>
    </div>
  );
}
