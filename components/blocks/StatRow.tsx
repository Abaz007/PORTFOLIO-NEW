import type { StatRowBlock } from "@/lib/types";

const signColors = {
  positive: "text-green-700",
  negative: "text-red-600",
  neutral:  "text-ink",
};

export function StatRow({ stats }: StatRowBlock) {
  return (
    <div
      role="list"
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          role="listitem"
          className="p-5 border border-rule bg-ghost"
        >
          <p
            className={[
              "font-display font-medium leading-none mb-2",
              signColors[stat.sign ?? "neutral"],
            ].join(" ")}
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {stat.value}
          </p>
          <p className="text-sm text-muted leading-snug">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
