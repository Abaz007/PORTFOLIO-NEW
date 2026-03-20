import type { ImageGridBlock } from "@/lib/types";

export function ImageGrid({ columns, images }: ImageGridBlock) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {images.map((img, i) => (
        <figure key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="w-full h-auto block bg-[#1a1a1a] rounded-sm"
          />
          {img.caption && (
            <figcaption className="mt-2 font-body text-[13px] text-[#737373] tracking-[0.3px] text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
