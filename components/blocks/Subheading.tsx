import type { SubheadingBlock } from "@/lib/types";

export function Subheading({ text }: SubheadingBlock) {
  return (
    <h3 className="font-display text-[18px] text-[#e5e5e5] leading-[1.4]">
      {text}
    </h3>
  );
}
