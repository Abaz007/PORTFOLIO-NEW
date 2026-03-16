import type { CanvasCollageBlock } from "@/lib/types";

export function CanvasCollage({ height, items }: CanvasCollageBlock) {
  return (
    <>
      {/* Desktop: absolute-positioned canvas */}
      <div
        className="relative overflow-hidden hidden md:block"
        style={{ height: `${height}px` }}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="absolute"
            style={{
              left:      `${item.x}px`,
              top:       `${item.y}px`,
              width:     `${item.width}px`,
              transform: `rotate(${item.rotate ?? 0}deg)`,
              zIndex:    item.zIndex ?? 1,
            }}
          />
        ))}
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div
        className="flex md:hidden overflow-x-auto gap-3 pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-auto block bg-ghost shrink-0"
            style={{
              width:           "85vw",
              flex:            "0 0 85vw",
              scrollSnapAlign: "start",
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
