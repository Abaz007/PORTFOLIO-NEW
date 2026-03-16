"use client"; // hover pause requires event listeners

import Image from "next/image";
import Link from "next/link";

type MarqueeItem = {
  image: string;
  name:  string;
  slug:  string | null;
};

type MarqueeProps = {
  row1: readonly MarqueeItem[];
  row2: readonly MarqueeItem[];
};

function MarqueeItem({ item }: { item: MarqueeItem }) {
  const content = (
    <div className="relative w-[280px] h-[190px] shrink-0 overflow-hidden bg-ghost">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover"
        sizes="280px"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-ink/70 opacity-0 hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center gap-1 p-4">
        <span className="text-white text-sm font-medium text-center leading-tight">
          {item.name}
        </span>
        {item.slug && (
          <span className="text-white/70 text-xs">View Case Study →</span>
        )}
      </div>
    </div>
  );

  if (item.slug) {
    return (
      <Link href={`/case-study/${item.slug}`} className="shrink-0">
        {content}
      </Link>
    );
  }

  return <div className="shrink-0">{content}</div>;
}

function MarqueeRow({
  items,
  direction,
}: {
  items: readonly MarqueeItem[];
  direction: "left" | "right";
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={
          direction === "left" ? "marquee-track-left" : "marquee-track-right"
        }
        style={{ display: "flex", gap: "12px", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item.slug ?? item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function Marquee({ row1, row2 }: MarqueeProps) {
  return (
    <section className="py-12 space-y-3 overflow-hidden">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
    </section>
  );
}
