import type { SectionHeadingBlock } from "@/lib/types";

export function SectionHeading({ text, anchor, label: labelOverride, symbol, no_label, no_pt, label_only }: SectionHeadingBlock) {
  const label = labelOverride ?? anchor.replace(/-/g, " ").toUpperCase();

  return (
    <div id={anchor} className={`flex flex-col gap-4 scroll-mt-24 ${no_pt ? "" : "pt-12"}`}>
      {!no_label && (
        <p className="font-body font-light text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase">
          {label}
        </p>
      )}
      {!label_only && (
        <h2 className="font-display text-[36px] text-[#d4d4d4] leading-[1.4]">
          {text}
        </h2>
      )}
    </div>
  );
}
