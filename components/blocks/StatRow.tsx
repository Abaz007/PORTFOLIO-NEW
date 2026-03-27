import type { StatRowBlock } from "@/lib/types";

const signColors = {
  positive: "text-green-400",
  negative: "text-red-400",
  neutral:  "text-[#d4d4d4]",
};

export function StatRow({ stats }: StatRowBlock) {
  return (
    <div
      role="list"
      className="grid gap-4 grid-cols-2"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(140px, 1fr))` }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          role="listitem"
          className="p-5 bg-[#171717]"
        >
          <p
            className={[
              "font-display font-medium leading-none mb-2",
              signColors[stat.sign ?? "neutral"],
            ].join(" ")}
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            {stat.value}
          </p>
          <p className="font-body text-[13px] text-[#737373] leading-snug tracking-[0.3px]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
