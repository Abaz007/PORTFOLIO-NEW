import type { BlockquoteBlock } from "@/lib/types";

export function Blockquote({ text, attribution }: BlockquoteBlock) {
  return (
    <blockquote className="pl-6 border-l-4 border-accent my-2">
      <p className="text-xl font-display text-ink leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite className="block mt-3 text-sm text-muted not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}
