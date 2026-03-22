import type { PullQuoteBlock } from "@/lib/types";

export function PullQuote({ text }: PullQuoteBlock) {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-px bg-[#171717]" />
      <p className="font-display font-light text-[20px] text-[#d4d4d4] leading-[1.6]">
        {text}
      </p>
      <div className="h-px bg-[#171717]" />
    </div>
  );
}
