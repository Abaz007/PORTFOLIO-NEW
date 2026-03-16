import type { ContentBlock } from "@/lib/types";
import * as B from "@/components/blocks";

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "section_heading": return <B.SectionHeading key={index} {...block} />;
          case "subheading":      return <B.Subheading     key={index} {...block} />;
          case "paragraph":       return <B.BodyParagraph  key={index} {...block} />;
          case "blockquote":      return <B.Blockquote     key={index} {...block} />;
          case "bullet_list":     return <B.BulletList     key={index} {...block} />;
          case "stat_row":        return <B.StatRow        key={index} {...block} />;
          case "divider":         return <B.Divider        key={index} />;
          case "image":           return <B.ImageBlock     key={index} {...block} />;
          case "image_grid":      return <B.ImageGrid      key={index} {...block} />;
          case "video":           return <B.VideoBlock     key={index} {...block} />;
          case "canvas_collage":  return <B.CanvasCollage  key={index} {...block} />;
          default:
            // TypeScript exhaustiveness check
            const _exhaustive: never = block;
            return null;
        }
      })}
    </div>
  );
}
