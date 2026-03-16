import type { ParagraphBlock } from "@/lib/types";

// Parses inline **bold** and _italic_ markdown
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match **bold** or _italic_
  const regex = /(\*\*(.+?)\*\*|_(.+?)_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[0].startsWith("**")) {
      parts.push(<strong key={match.index} className="font-semibold text-ink">{match[2]}</strong>);
    } else {
      parts.push(<em key={match.index} className="italic">{match[3]}</em>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function BodyParagraph({ text }: ParagraphBlock) {
  return (
    <p className="text-ink leading-[1.75] text-base">
      {parseInline(text)}
    </p>
  );
}
