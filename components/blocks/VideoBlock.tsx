import type { VideoBlock as VideoBlockType } from "@/lib/types";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export function VideoBlock({
  src,
  provider,
  autoplay,
  loop,
  muted,
  caption,
}: VideoBlockType) {
  return (
    <figure>
      {provider === "cloudinary" && (
        <video
          src={src}
          autoPlay={autoplay}
          loop={loop}
          muted={muted ?? autoplay} // muted required for autoplay
          controls={!autoplay}
          playsInline
          className="w-full h-auto block bg-ghost"
        />
      )}

      {provider === "youtube" && (() => {
        const id = getYouTubeId(src);
        return id ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : null;
      })()}

      {provider === "vimeo" && (() => {
        const id = getVimeoId(src);
        return id ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://player.vimeo.com/video/${id}`}
              title="Vimeo video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : null;
      })()}

      {caption && (
        <figcaption className="mt-3 text-sm text-muted text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
