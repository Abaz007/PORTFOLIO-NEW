import type { ContentBlock } from "@/lib/types";
import * as B from "@/components/blocks";

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const prev = index > 0 ? blocks[index - 1].type : null;
        switch (block.type) {
          case "section_heading": return <B.SectionHeading key={index} {...block} />;
          case "subheading":      return <B.Subheading     key={index} {...block} />;
          case "paragraph":
            if (prev === "subheading")       return <div key={index} className="!mt-4"><B.BodyParagraph {...block} /></div>;
            if (prev === "section_heading")  return <div key={index} className="!mt-5"><B.BodyParagraph {...block} /></div>;
            return <B.BodyParagraph key={index} {...block} />;
          case "blockquote":      return <B.Blockquote     key={index} {...block} />;
          case "bullet_list":     return <B.BulletList     key={index} {...block} />;
          case "stat_row":        return <B.StatRow        key={index} {...block} />;
          case "divider":         return <B.Divider        key={index} />;
          case "image":           return <B.ImageBlock     key={index} {...block} />;
          case "image_grid":      return <B.ImageGrid      key={index} {...block} />;
          case "video":           return <B.VideoBlock     key={index} {...block} />;
          case "canvas_collage":  return <B.CanvasCollage  key={index} {...block} />;
          case "callout":         return <B.Callout        key={index} {...block} />;
          case "insight_list":    return <B.InsightList    key={index} {...block} />;
          case "pull_quote":      return <B.PullQuote      key={index} {...block} />;
          case "key_insights":    return <B.KeyInsights    key={index} {...block} />;
          case "mental_models":      return <B.MentalModels      key={index} {...block} />;
          case "research_callout":   return <B.ResearchCallout   key={index} {...block} />;
          case "comparison_table":   return <B.ComparisonTable   key={index} {...block} />;
          case "persona_columns":    return <B.PersonaColumns    key={index} {...block} />;
          case "numbered_list":      return <B.NumberedList      key={index} {...block} />;
          default:
            // TypeScript exhaustiveness check
            const _exhaustive: never = block;
            return null;
        }
      })}
    </div>
  );
}
