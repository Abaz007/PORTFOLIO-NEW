import type { BlockquoteBlock } from "@/lib/types";

export function Blockquote({ text, attribution }: BlockquoteBlock) {
  return (
    <blockquote className="flex flex-col gap-5">
      <div className="h-px bg-[#171717]" />
      <p className="font-display font-light text-[20px] text-[#d4d4d4] leading-[1.6]">
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite className="font-body text-[13px] text-[#737373] tracking-[0.6px] not-italic">
          — {attribution}
        </cite>
      )}
      <div className="h-px bg-[#171717]" />
    </blockquote>
  );
}
