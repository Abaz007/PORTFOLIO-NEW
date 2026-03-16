import type { SubheadingBlock } from "@/lib/types";

export function Subheading({ text }: SubheadingBlock) {
  return (
    <h3 className="font-body text-[1.375rem] font-semibold text-ink leading-snug">
      {text}
    </h3>
  );
}
