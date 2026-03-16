// lib/cloudinary.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type ResourceType = "image" | "video" | "raw";

// Build a Cloudinary URL with optional transformation string.
// transformations: Cloudinary transformation chain. e.g. "w_800,q_auto,f_auto"
// filePath: folder path within your Cloudinary account. e.g. "portfolio/root/hero.png"
export function cloudinaryUrl(
  filePath: string,
  resourceType: ResourceType = "image",
  transformations: string = "q_auto,f_auto"
): string {
  if (!CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set.");
  }
  const t = transformations ? `${transformations}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${t}v1/${filePath}`;
}

// Preset helpers for common contexts
export const cld = {
  hero:      (filePath: string) => cloudinaryUrl(filePath, "image", "w_1400,q_auto,f_auto"),
  cover:     (filePath: string) => cloudinaryUrl(filePath, "image", "w_600,q_auto,f_auto"),
  marquee:   (filePath: string) => cloudinaryUrl(filePath, "image", "w_400,q_auto,f_auto"),
  full:      (filePath: string) => cloudinaryUrl(filePath, "image", "w_1000,q_auto,f_auto"),
  contained: (filePath: string) => cloudinaryUrl(filePath, "image", "w_720,q_auto,f_auto"),
  grid:      (filePath: string) => cloudinaryUrl(filePath, "image", "w_500,q_auto,f_auto"),
  collage:   (filePath: string) => cloudinaryUrl(filePath, "image", "w_600,q_auto,f_auto"),
  video:     (filePath: string) => cloudinaryUrl(filePath, "video", ""),
  pdf:       (filePath: string) => cloudinaryUrl(filePath, "raw", ""),
};
