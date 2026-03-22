import type { BulletListBlock } from "@/lib/types";

export function BulletList({ items }: BulletListBlock) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 font-body font-light text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.3px]">
          <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-[#737373] shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
