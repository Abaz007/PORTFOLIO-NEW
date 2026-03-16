import type { BulletListBlock } from "@/lib/types";

export function BulletList({ items }: BulletListBlock) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-ink leading-[1.75] text-base">
          <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-muted shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
