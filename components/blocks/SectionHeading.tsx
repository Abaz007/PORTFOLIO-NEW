import type { SectionHeadingBlock } from "@/lib/types";

export function SectionHeading({ text, anchor, symbol }: SectionHeadingBlock) {
  return (
    <h2
      id={anchor}
      className="font-display text-3xl text-ink tracking-tight scroll-mt-24 pt-6"
    >
      {symbol && (
        <span aria-hidden="true" className="text-muted mr-2">
          {symbol}
        </span>
      )}
      {text}
    </h2>
  );
}
