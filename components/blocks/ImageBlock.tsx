import Image from "next/image";
import type { ImageBlock as ImageBlockType } from "@/lib/types";

export function ImageBlock({ src, alt, caption, width }: ImageBlockType) {
  const isFull = width === "full";

  return (
    <figure className={isFull ? "img-full" : "w-full max-w-reading"}>
      <div className="relative w-full overflow-hidden bg-ghost" style={{ aspectRatio: "auto" }}>
        {/* Use a regular img for arbitrary aspect ratios from Cloudinary */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto block"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
