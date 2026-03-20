import type { SubheadingBlock } from "@/lib/types";

export function Subheading({ text }: SubheadingBlock) {
  return (
    <h3 className="font-display text-[18px] text-[#d4d4d4] leading-[1.4]">
      {text}
    </h3>
  );
}
